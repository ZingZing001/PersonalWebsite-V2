# Ask Johnson — Cloudflare Worker

Backend for the **/ask-me** page on the personal site. Exposes a single endpoint:

- `POST /chat` — accepts `{ messages: [{ role, content }, ...] }`, retrieves relevant excerpts from `knowledge-base.json`, and streams a response from Claude Haiku 4.5 back as Server-Sent Events.

## One-time setup

```bash
cd worker
npm install

# 1. Log in to Cloudflare
npx wrangler login

# 2. Create the KV namespace for rate limiting
npx wrangler kv:namespace create RATE_LIMIT
# Copy the returned `id` into wrangler.toml (replace REPLACE_WITH_KV_NAMESPACE_ID)

# 3. Set secrets
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put VOYAGE_API_KEY
```

For local dev, create `worker/.dev.vars`:

```
ANTHROPIC_API_KEY=sk-ant-...
VOYAGE_API_KEY=pa-...
```

## Generate the knowledge base

From the **repo root** (not this directory):

```bash
npm run embed
```

That script reads `src/data/blogPosts.js` and the About section, chunks the text, calls Voyage to embed each chunk, and writes `worker/knowledge-base.json`. Re-run after editing blog posts.

## Run locally

```bash
cd worker
npm run dev   # http://localhost:8787
```

Then in the site repo, set `VITE_CHAT_API_URL=http://localhost:8787/chat` and run `npm run dev`.

## Deploy

```bash
cd worker
npm run deploy
```

Note the deployed URL (e.g. `https://ask-johnson.<your-subdomain>.workers.dev`) and put it in the site's `.env.production` as `VITE_CHAT_API_URL`.
