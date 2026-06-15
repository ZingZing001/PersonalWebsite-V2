// Streams a chat completion from the Cloudflare Worker.
// Calls onToken(text) for each text delta. Resolves when the stream ends.
// Throws on HTTP errors (rate limits, network, etc).

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL;

export class ChatError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ChatError";
    this.code = code;
  }
}

export async function streamChat(messages, { onToken, signal } = {}) {
  if (!CHAT_API_URL) {
    throw new ChatError(
      "Chat is not configured. Set VITE_CHAT_API_URL in your env.",
      "not_configured",
    );
  }

  const res = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body.error ?? "";
    } catch {
      /* ignore */
    }
    if (res.status === 429) {
      throw new ChatError(
        "You're sending messages a bit too quickly — give it a minute.",
        "rate_limited",
      );
    }
    throw new ChatError(
      `Chat request failed (${res.status}${detail ? `: ${detail}` : ""})`,
      "http_error",
    );
  }

  if (!res.body) {
    throw new ChatError("No response body", "empty_body");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

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
        if (evt.type === "text" && typeof evt.text === "string") {
          onToken?.(evt.text);
        } else if (evt.type === "error") {
          throw new ChatError(evt.message ?? "Stream error", "stream_error");
        } else if (evt.type === "done") {
          return;
        }
      } catch (err) {
        if (err instanceof ChatError) throw err;
        // ignore JSON parse errors on keepalives
      }
    }
  }
}
