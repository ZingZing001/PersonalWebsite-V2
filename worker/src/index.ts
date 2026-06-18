import knowledgeBase from "../knowledge-base.json";
import { SYSTEM_PROMPT } from "./system-prompt";
import { languageInstruction, languageLabel } from "./lang";
import { logQuestion, getStats, classifyQuestion } from "./analytics";
import {
  embedQuery,
  formatContext,
  topK,
  type KnowledgeBase,
} from "./rag";

interface Env {
  OPENROUTER_API_KEY: string;
  VOYAGE_API_KEY: string;
  ALLOWED_ORIGINS: string;
  // Optional: override the model and the headers OpenRouter uses for analytics.
  OPENROUTER_MODEL?: string;
  SITE_URL?: string;
  SITE_TITLE?: string;
  RATE_LIMIT: KVNamespace;
  // Visitor-question analytics + the token guarding the /admin/stats endpoint.
  DB?: D1Database;
  ADMIN_TOKEN?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

const KB = knowledgeBase as unknown as KnowledgeBase;

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
// Curated free-model fallback chain. OpenRouter tries these in order and skips
// rate-limited ones. Deliberately excludes moderation models (e.g.
// nvidia/*content-safety) that the random "openrouter/free" router would
// otherwise pick — those reply with "safe"/"unsafe" instead of chatting.
// OpenRouter caps the models[] array at 3.
const DEFAULT_MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "openai/gpt-oss-120b:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];

// Resolve the model list from config (comma-separated OPENROUTER_MODEL) or the
// default chain. Capped at 3 (OpenRouter's models[] limit).
function resolveModels(env: Env): string[] {
  const configured = (env.OPENROUTER_MODEL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return (configured.length ? configured : DEFAULT_MODELS).slice(0, 3);
}

// OpenRouter request field: a single model, or a fallback array.
export function modelBody(models: string[]): Record<string, unknown> {
  return models.length > 1 ? { models } : { model: models[0] };
}

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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

async function streamLLMResponse(
  env: Env,
  messages: ChatMessage[],
  contextBlock: string,
  langInstruction: string,
  models: string[],
): Promise<Response> {
  const systemWithContext = `${SYSTEM_PROMPT}\n\n---\n\nCONTEXT (excerpts retrieved for this turn):\n\n${contextBlock}\n\n---\n\nLANGUAGE FOR THIS REPLY: ${langInstruction}`;

  // OpenRouter is OpenAI-compatible: the system prompt is the first message.
  const openAiMessages = [
    { role: "system", content: systemWithContext },
    ...messages,
  ];

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
  };
  // Optional headers OpenRouter uses for dashboard analytics / rankings.
  if (env.SITE_URL) headers["HTTP-Referer"] = env.SITE_URL;
  if (env.SITE_TITLE) headers["X-Title"] = env.SITE_TITLE;

  const upstream = await fetch(OPENROUTER_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...modelBody(models),
      max_tokens: 800,
      messages: openAiMessages,
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errBody = await upstream.text();
    throw new Error(`OpenRouter upstream ${upstream.status}: ${errBody}`);
  }

  // Translate OpenRouter's OpenAI-style SSE deltas into the simple
  // `data: {"type":"text","text":"..."}` events the frontend consumes.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      const emitDone = () =>
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`),
        );
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            // OpenRouter sends `: ...` comment lines as keepalives.
            if (!trimmed || trimmed.startsWith(":")) continue;
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload) continue;
            if (payload === "[DONE]") {
              emitDone();
              continue;
            }
            try {
              const evt = JSON.parse(payload);
              const delta = evt.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "text", text: delta })}\n\n`,
                  ),
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
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const allowOrigin = resolveAllowedOrigin(env, origin);
    const cors = corsHeaders(allowOrigin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Private analytics endpoint — token-guarded, read-only.
    if (url.pathname === "/admin/stats") {
      if (request.method !== "GET") {
        return jsonResponse({ error: "method_not_allowed" }, 405, cors);
      }
      const token = (request.headers.get("Authorization") ?? "").replace(
        /^Bearer\s+/i,
        "",
      );
      if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
        return jsonResponse({ error: "unauthorized" }, 401, cors);
      }
      if (!env.DB) {
        return jsonResponse({ error: "analytics_unavailable" }, 503, cors);
      }
      try {
        const stats = await getStats(env.DB);
        return jsonResponse(stats, 200, cors);
      } catch (err) {
        return jsonResponse(
          { error: "stats_failed", message: String(err) },
          500,
          cors,
        );
      }
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

      const models = resolveModels(env);

      // Log the question for analytics without blocking the stream (privacy:
      // question text only — no IP, no identity). Classify it via the same
      // OpenRouter entry point so the admin sees question *types* at a glance.
      ctx.waitUntil(
        (async () => {
          const category = await classifyQuestion(
            lastUser.content,
            env.OPENROUTER_API_KEY,
            models,
          );
          await logQuestion(env.DB, {
            question: lastUser.content,
            lang: languageLabel(lastUser.content),
            category,
            numSources: chunks.length,
            topSource: chunks[0]?.title ?? "",
            status: "ok",
          });
        })(),
      );

      const sseResponse = await streamLLMResponse(
        env,
        body.messages,
        contextBlock,
        languageInstruction(lastUser.content),
        models,
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
