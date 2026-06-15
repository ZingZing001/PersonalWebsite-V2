export interface Chunk {
  id: string;
  source: string;
  title: string;
  text: string;
  embedding: number[];
}

export interface KnowledgeBase {
  model: string;
  dimensions: number;
  generatedAt: string;
  chunks: Chunk[];
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export function topK(query: number[], kb: KnowledgeBase, k: number): Chunk[] {
  const scored = kb.chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(query, chunk.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map((s) => s.chunk);
}

export function formatContext(chunks: Chunk[]): string {
  if (chunks.length === 0) return "(no relevant excerpts found)";
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] Source: ${c.source} — "${c.title}"\n${c.text.trim()}`,
    )
    .join("\n\n---\n\n");
}

const VOYAGE_ENDPOINT = "https://api.voyageai.com/v1/embeddings";

export async function embedQuery(
  query: string,
  model: string,
  apiKey: string,
): Promise<number[]> {
  const res = await fetch(VOYAGE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: [query],
      model,
      input_type: "query",
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Voyage embed failed: ${res.status} ${body}`);
  }
  const data = (await res.json()) as { data: { embedding: number[] }[] };
  return data.data[0].embedding;
}
