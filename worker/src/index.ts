import knowledgeBase from "../knowledge-base.json";
import { SYSTEM_PROMPT } from "./system-prompt";
import {
  embedQuery,
  formatContext,
  topK,
  type KnowledgeBase,
} from "./rag";

interface Env {
  ANTHROPIC_API_KEY: string;
  VOYAGE_API_KEY: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMIT: KVNamespace;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

const KB = knowledgeBase as unknown as KnowledgeBase;

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MODEL = "claude-haiku-4-5-20251001";

const RATE_LIMIT_REQUESTS = 20;
const RATE_LIMIT_WINDOW_SECONDS = 5 * 60;

const LOCAL_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function resolveAllowedOrigin(env: Env, origin: string | null): string | null {
  if (!origin) return null;
  if (LOCAL_ORIGINS.has(origin)) return origin;
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  return allowed.includes(origin) ? origin : null;
}

function corsHeaders(allowOrigin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (allowOrigin) headers["Access-Control-Allow-Origin"] = allowOrigin;
  return headers;
}

function jsonResponse(
  body: unknown,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const key = `rl:${ip}`;
  const current = await env.RATE_LIMIT.get(key);
  const count = current ? parseInt(current, 10) : 0;
  if (count >= RATE_LIMIT_REQUESTS) return false;
  await env.RATE_LIMIT.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return true;
}

function validateMessages(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > 30) return false;
  return messages.every((m) => {
    if (typeof m !== "object" || m === null) return false;
    const msg = m as Record<string, unknown>;
    if (msg.role !== "user" && msg.role !== "assistant") return false;
    if (typeof msg.content !== "string") return false;
    if (msg.content.length === 0 || msg.content.length > 4000) return false;
    return true;
  });
}

async function streamAnthropicResponse(
  env: Env,
  messages: ChatMessage[],
  contextBlock: string,
): Promise<Response> {
  const systemWithContext = `${SYSTEM_PROMPT}\n\n---\n\nCONTEXT (excerpts retrieved for this turn):\n\n${contextBlock}`;

  const upstream = await fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 800,
      system: systemWithContext,
      messages,
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errBody = await upstream.text();
    throw new Error(`Anthropic upstream ${upstream.status}: ${errBody}`);
  }

  // Pass through the SSE stream, re-emitting only the text deltas as simple
  // `data: {"type":"text","text":"..."}` events for the frontend to consume.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const evt = JSON.parse(payload);
              if (
                evt.type === "content_block_delta" &&
                evt.delta?.type === "text_delta" &&
                typeof evt.delta.text === "string"
              ) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "text", text: evt.delta.text })}\n\n`,
                  ),
                );
              } else if (evt.type === "message_stop") {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`),
                );
              }
            } catch {
              // ignore non-JSON keepalives
            }
          }
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", message: String(err) })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const allowOrigin = resolveAllowedOrigin(env, origin);
    const cors = corsHeaders(allowOrigin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== "/chat") {
      return jsonResponse({ error: "not_found" }, 404, cors);
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "method_not_allowed" }, 405, cors);
    }

    if (origin && !allowOrigin) {
      return jsonResponse({ error: "origin_not_allowed" }, 403, cors);
    }

    const ip =
      request.headers.get("CF-Connecting-IP") ??
      request.headers.get("X-Forwarded-For") ??
      "unknown";
    const allowed = await checkRateLimit(env, ip);
    if (!allowed) {
      return jsonResponse(
        { error: "rate_limited", retryAfterSeconds: RATE_LIMIT_WINDOW_SECONDS },
        429,
        cors,
      );
    }

    let body: ChatRequest;
    try {
      body = (await request.json()) as ChatRequest;
    } catch {
      return jsonResponse({ error: "invalid_json" }, 400, cors);
    }

    if (!validateMessages(body.messages)) {
      return jsonResponse({ error: "invalid_messages" }, 400, cors);
    }

    const lastUser = [...body.messages]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUser) {
      return jsonResponse({ error: "no_user_message" }, 400, cors);
    }

    try {
      const queryEmbedding = await embedQuery(
        lastUser.content,
        KB.model,
        env.VOYAGE_API_KEY,
      );
      const chunks = topK(queryEmbedding, KB, 3);
      const contextBlock = formatContext(chunks);
      const sseResponse = await streamAnthropicResponse(
        env,
        body.messages,
        contextBlock,
      );
      const headers = new Headers(sseResponse.headers);
      for (const [k, v] of Object.entries(cors)) headers.set(k, v);
      return new Response(sseResponse.body, {
        status: sseResponse.status,
        headers,
      });
    } catch (err) {
      return jsonResponse(
        { error: "upstream_failure", message: String(err) },
        502,
        cors,
      );
    }
  },
};
