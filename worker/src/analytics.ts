// Visitor-question analytics backed by Cloudflare D1.
// Privacy: only the question text is stored — never IP or anything that
// identifies a visitor.

export interface QuestionRow {
  question: string;
  lang: string;
  category: string;
  numSources: number;
  topSource: string;
  status: string;
}

const MAX_QUESTION_CHARS = 500;

// Fixed, at-a-glance buckets for the admin dashboard.
export const CATEGORIES = [
  "Experience & roles",
  "Projects",
  "Tech & skills",
  "Education",
  "Background & personal",
  "About this site/agent",
  "Other",
] as const;

// Classify a question into one CATEGORY via the same OpenRouter entry point.
// Strict, tiny, temperature 0; validates the model's answer against the list
// and falls back to "Other". Best-effort — never throws.
export async function classifyQuestion(
  question: string,
  apiKey: string,
  model: string,
): Promise<string> {
  try {
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 16,
          temperature: 0,
          messages: [
            {
              role: "system",
              content: `You label questions a visitor asks an AI version of a software engineer (Johnson). Pick the SINGLE best category. Guide:
- Experience & roles — jobs/internships/responsibilities (e.g. "what did you do at EROAD?", "your role at AUSS")
- Projects — a specific thing he built (e.g. "tell me about EVolocity", "what projects have you built?")
- Tech & skills — languages/frameworks/tools (e.g. "what's your tech stack?", "do you know React?")
- Education — study/degree/grades (e.g. "what's your GPA?", "where did you study?")
- Background & personal — origin story/hobbies/interests (e.g. "how did you get into coding?", "your hobbies?")
- About this site/agent — the chatbot/site itself (e.g. "how does this chatbot work?", "are you really Johnson?")
- Other — anything that fits none of the above
Reply with ONLY the exact category text, nothing else.`,
            },
            { role: "user", content: question.slice(0, 300) },
          ],
        }),
      },
    );
    if (!res.ok) return "Other";
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = (data.choices?.[0]?.message?.content ?? "").trim().toLowerCase();
    return (
      CATEGORIES.find((c) => raw.includes(c.toLowerCase())) ??
      CATEGORIES.find((c) => c.toLowerCase().includes(raw)) ??
      "Other"
    );
  } catch {
    return "Other";
  }
}

// Best-effort insert. Designed to be called via ctx.waitUntil so it never
// blocks (or breaks) the chat response. Swallows its own errors.
export async function logQuestion(
  db: D1Database | undefined,
  row: QuestionRow,
): Promise<void> {
  if (!db) return;
  const question = row.question.trim().slice(0, MAX_QUESTION_CHARS);
  if (!question) return;
  try {
    await db
      .prepare(
        `INSERT INTO questions (created_at, question, lang, category, num_sources, top_source, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        new Date().toISOString(),
        question,
        row.lang,
        row.category,
        row.numSources,
        row.topSource,
        row.status,
      )
      .run();
  } catch (err) {
    console.error("logQuestion failed:", err);
  }
}

export interface Stats {
  total: number;
  recent: {
    created_at: string;
    question: string;
    lang: string;
    category: string;
    status: string;
  }[];
  byCategory: { category: string; count: number }[];
  byLang: { lang: string; count: number }[];
  byDay: { day: string; count: number }[];
}

export async function getStats(db: D1Database): Promise<Stats> {
  const [total, recent, byCategory, byLang, byDay] = await Promise.all([
    db.prepare(`SELECT COUNT(*) AS c FROM questions`).first<{ c: number }>(),
    db
      .prepare(
        `SELECT created_at, question, lang, category, status FROM questions ORDER BY id DESC LIMIT 50`,
      )
      .all(),
    db
      .prepare(
        `SELECT COALESCE(category, 'Other') AS category, COUNT(*) AS count FROM questions
         GROUP BY category ORDER BY count DESC`,
      )
      .all(),
    db
      .prepare(
        `SELECT COALESCE(lang, '?') AS lang, COUNT(*) AS count FROM questions
         GROUP BY lang ORDER BY count DESC`,
      )
      .all(),
    db
      .prepare(
        `SELECT substr(created_at, 1, 10) AS day, COUNT(*) AS count FROM questions
         GROUP BY day ORDER BY day DESC LIMIT 14`,
      )
      .all(),
  ]);

  return {
    total: total?.c ?? 0,
    recent: (recent.results ?? []) as Stats["recent"],
    byCategory: (byCategory.results ?? []) as Stats["byCategory"],
    byLang: (byLang.results ?? []) as Stats["byLang"],
    byDay: (byDay.results ?? []) as Stats["byDay"],
  };
}
