#!/usr/bin/env node
// Build the worker/knowledge-base.json file by chunking the site's personal
// content and embedding each chunk with Voyage AI.
//
// Run with:  npm run embed
// Required env: VOYAGE_API_KEY  (read from the shell, or from .env / .env.local)

import { readFile, writeFile, rm } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(REPO_ROOT, "worker/knowledge-base.json");

// Minimal .env loader so `npm run embed` picks up keys from the repo's env
// files without requiring a dotenv dependency or a manual `export`.
function loadEnvFiles() {
  for (const file of [".env", ".env.local"]) {
    const path = resolve(REPO_ROOT, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      // Strip surrounding quotes if present.
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}
loadEnvFiles();

const VOYAGE_MODEL = "voyage-3";
const VOYAGE_ENDPOINT = "https://api.voyageai.com/v1/embeddings";
const CHUNK_TARGET_CHARS = 1200; // ~250-300 tokens
const CHUNK_OVERLAP_CHARS = 200;
const BATCH_SIZE = 8; // Voyage allows up to 128, but small batches keep error blast radius low

// Static personal content that isn't in blog posts.
// Pulled from src/components/AboutSection.jsx and the hero/contact copy.
const STATIC_SOURCES = [
  {
    source: "About",
    title: "Who I am",
    text: `I'm Johnson Zhang (Runjia Zhang), a passionate software developer based in New Zealand. I specialise in front-end development and have experience working with various modern frameworks and libraries. I love creating dynamic, user-friendly web applications and care about writing clean, maintainable code while continuously improving my skills.

Areas I focus on:
- Front-End Development: building responsive, interactive UIs with React, Vue, and Angular.
- Back-End Development: RESTful APIs and databases with Node.js, Express, and MongoDB.
- Full-Stack Development: gluing front-end and back-end together into seamless web applications.
- UI/UX Design: user-centred designs through research, wireframing, and prototyping.

You can find me on GitHub (ZingZing001), LinkedIn (runjiazhangnz), and Instagram (zingzing.d). The Contact section on this site is the best way to reach me for project enquiries.`,
  },
  {
    source: "Projects",
    title: "Featured projects",
    text: `Selected projects I've built:

- Portfolio Website (this site) — React 19 + Vite + Tailwind v4, with snap-scroll sections, a blog, dark/light themes, and a cosmic visual style with star and meteor effects. Deployed to GitHub Pages.
- Plateful — a MERN-stack food/recipe app exploring full-stack patterns end-to-end.
- Watermark Removal Tool — a Python + PyQt5 + OpenCV desktop tool for batch-removing watermarks from images.
- Guess Who's the Thief — a Java + JavaFX game integrating the OpenAI API to drive interactive detective-style gameplay.`,
  },
];

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|li|ul|ol|div|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&rsquo;|&apos;/gi, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/gi, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Convert the sanitized Reactive-Resume export (src/data/resume.json) into
// plain-text RAG documents. Respects the CV's own `hidden` flags at both the
// section and item level, so anything the user hid on their CV is skipped.
// (Phone number and the References section are already removed from the file.)
function loadResumeDocuments() {
  const path = resolve(REPO_ROOT, "src/data/resume.json");
  if (!existsSync(path)) return [];
  const cv = JSON.parse(readFileSync(path, "utf8"));
  const S = cv.sections || {};
  const visible = (item) => item && item.hidden !== true;
  const shown = (section) =>
    section && !section.hidden ? (section.items || []).filter(visible) : [];
  const docs = [];

  const b = cv.basics || {};
  docs.push({
    source: "CV",
    title: "Profile summary",
    text: [
      `${b.name}${b.headline ? " — " + b.headline : ""}.`,
      b.location ? `Based in ${b.location}.` : "",
      b.email ? `Contact email: ${b.email}.` : "",
      b.website?.url ? `Portfolio: ${b.website.url}.` : "",
      stripHtml(cv.summary?.content),
    ]
      .filter(Boolean)
      .join("\n"),
  });

  const profiles = shown(S.profiles).map(
    (p) => `${p.network}: ${p.username}${p.website?.url ? " (" + p.website.url + ")" : ""}`,
  );
  if (profiles.length)
    docs.push({ source: "CV", title: "Online profiles", text: `Online profiles:\n- ${profiles.join("\n- ")}` });

  for (const job of shown(S.experience)) {
    const parts = [
      `${job.position} at ${job.company}${job.location ? ", " + job.location : ""} (${job.period}).`,
      stripHtml(job.description),
    ];
    for (const r of (job.roles || []).filter(visible)) {
      const rdesc = stripHtml(r.description);
      if (rdesc) parts.push(`${r.position} (${r.period}):\n${rdesc}`);
    }
    docs.push({
      source: "CV — Experience",
      title: `${job.position} at ${job.company}`,
      text: parts.filter(Boolean).join("\n"),
    });
  }

  const edu = shown(S.education).map(
    (e) =>
      `${e.degree}${e.area ? ", " + e.area : ""} — ${e.school} (${e.period})${e.grade ? ". " + e.grade : ""}`,
  );
  if (edu.length)
    docs.push({ source: "CV — Education", title: "Education", text: `Education:\n- ${edu.join("\n- ")}` });

  for (const p of shown(S.projects)) {
    docs.push({
      source: "CV — Projects",
      title: p.name,
      text: `Project: ${p.name}${p.period ? " (" + p.period + ")" : ""}.\n${stripHtml(p.description)}${p.website?.url ? "\nLink: " + p.website.url : ""}`,
    });
  }

  const skills = shown(S.skills).map(
    (s) => `${s.name}${s.proficiency ? " (" + s.proficiency + ")" : ""}: ${(s.keywords || []).join(", ")}`,
  );
  if (skills.length)
    docs.push({ source: "CV — Skills", title: "Technical skills", text: `Skills:\n- ${skills.join("\n- ")}` });

  const awards = shown(S.awards).map(
    (a) => `${a.title}${a.awarder ? " — " + a.awarder : ""}${a.date ? " (" + a.date + ")" : ""}`,
  );
  if (awards.length)
    docs.push({ source: "CV — Awards", title: "Awards & achievements", text: `Awards and achievements:\n- ${awards.join("\n- ")}` });

  const langs = shown(S.languages).map((l) => `${l.language} (${l.fluency})`);
  if (langs.length)
    docs.push({ source: "CV", title: "Languages spoken", text: `Languages: ${langs.join(", ")}.` });

  const volunteer = shown(S.volunteer).map(
    (v) => `${v.organization}${v.location ? ", " + v.location : ""} (${v.period}):\n${stripHtml(v.description)}`,
  );
  if (volunteer.length)
    docs.push({ source: "CV — Volunteering", title: "Volunteering", text: `Volunteering:\n${volunteer.join("\n\n")}` });

  const interests = shown(S.interests).map(
    (i) => (i.keywords?.length ? `${i.name} (${i.keywords.join(", ")})` : i.name),
  );
  if (interests.length)
    docs.push({ source: "CV", title: "Interests", text: `Interests: ${interests.join(", ")}.` });

  return docs;
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → label
    .replace(/^[#>\-*]\s+/gm, "") // leading markdown markers
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function chunkText(text) {
  const clean = text.trim();
  if (clean.length <= CHUNK_TARGET_CHARS) return [clean];
  const chunks = [];
  let i = 0;
  while (i < clean.length) {
    let end = Math.min(i + CHUNK_TARGET_CHARS, clean.length);
    if (end < clean.length) {
      // Try to break at a paragraph or sentence boundary nearby
      const candidates = [
        clean.lastIndexOf("\n\n", end),
        clean.lastIndexOf(". ", end),
        clean.lastIndexOf("\n", end),
      ].filter((p) => p > i + CHUNK_TARGET_CHARS / 2);
      if (candidates.length > 0) end = Math.max(...candidates) + 1;
    }
    chunks.push(clean.slice(i, end).trim());
    if (end >= clean.length) break;
    i = Math.max(end - CHUNK_OVERLAP_CHARS, i + 1);
  }
  return chunks.filter((c) => c.length > 40);
}

async function loadBlogPosts() {
  // The blog posts module references `import.meta.env.BASE_URL`, which Vite
  // injects but Node does not. Stub it before importing.
  const blogPath = resolve(REPO_ROOT, "src/data/blogPosts.js");
  const raw = await readFile(blogPath, "utf8");
  const patched = raw.replace(
    /import\.meta\.env\.BASE_URL/g,
    JSON.stringify("/"),
  );
  const tmpPath = resolve(REPO_ROOT, "scripts/.blogPosts.tmp.mjs");
  await writeFile(tmpPath, patched);
  try {
    const mod = await import(pathToFileURL(tmpPath).href);
    return mod.blogPosts;
  } finally {
    await rm(tmpPath, { force: true });
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Voyage's free tier (no payment method on file) allows only 3 requests/min.
// Pace requests just under that and retry on 429 so the embed completes.
const REQUEST_SPACING_MS = 21_000;
const MAX_RETRIES = 5;

async function embedBatch(inputs, apiKey, attempt = 1) {
  const res = await fetch(VOYAGE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: inputs,
      model: VOYAGE_MODEL,
      input_type: "document",
    }),
  });
  if (res.status === 429 && attempt <= MAX_RETRIES) {
    const wait = REQUEST_SPACING_MS * attempt;
    console.log(`  rate limited (429); waiting ${wait / 1000}s, retry ${attempt}/${MAX_RETRIES}…`);
    await sleep(wait);
    return embedBatch(inputs, apiKey, attempt + 1);
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Voyage embed failed: ${res.status} ${body}`);
  }
  const data = await res.json();
  return data.data.map((d) => d.embedding);
}

async function main() {
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) {
    console.error(
      "VOYAGE_API_KEY is not set. Export it before running: `export VOYAGE_API_KEY=...`",
    );
    process.exit(1);
  }

  console.log("Loading blog posts…");
  const posts = await loadBlogPosts();
  console.log(`  found ${posts.length} posts`);

  const rawChunks = [];

  for (const post of posts) {
    const cleaned = stripMarkdown(post.content);
    const parts = chunkText(cleaned);
    parts.forEach((text, idx) => {
      rawChunks.push({
        id: `blog:${post.slug}:${idx}`,
        source: "Blog post",
        title: post.title,
        text,
      });
    });
  }

  const resumeDocs = loadResumeDocuments();
  console.log(`  loaded ${resumeDocs.length} CV documents`);

  const extraSources = [...STATIC_SOURCES, ...resumeDocs];
  extraSources.forEach((s, di) => {
    const parts = chunkText(s.text);
    parts.forEach((text, idx) => {
      rawChunks.push({
        id: `${s.source.toLowerCase().replace(/[^a-z0-9]+/g, "-")}:${di}:${idx}`,
        source: s.source,
        title: s.title,
        text,
      });
    });
  });

  console.log(`Prepared ${rawChunks.length} chunks. Embedding with ${VOYAGE_MODEL}…`);

  const enriched = [];
  for (let i = 0; i < rawChunks.length; i += BATCH_SIZE) {
    if (i > 0) await sleep(REQUEST_SPACING_MS); // stay under the free-tier 3 RPM
    const batch = rawChunks.slice(i, i + BATCH_SIZE);
    const embeddings = await embedBatch(
      batch.map((c) => c.text),
      apiKey,
    );
    batch.forEach((chunk, j) => {
      enriched.push({ ...chunk, embedding: embeddings[j] });
    });
    console.log(
      `  embedded ${Math.min(i + BATCH_SIZE, rawChunks.length)}/${rawChunks.length}`,
    );
  }

  const dimensions = enriched[0]?.embedding.length ?? 0;
  const kb = {
    model: VOYAGE_MODEL,
    dimensions,
    generatedAt: new Date().toISOString(),
    chunks: enriched,
  };

  await writeFile(OUT_PATH, JSON.stringify(kb, null, 2));
  console.log(`\nWrote ${OUT_PATH}`);
  console.log(`  ${enriched.length} chunks · ${dimensions}-dim vectors`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
