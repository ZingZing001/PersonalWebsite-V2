// Visitor-question analytics backed by Cloudflare D1.
// Privacy: only the question text is stored — never IP or anything that
// identifies a visitor.

export interface QuestionRow {
  question: string;
  lang: string;
  numSources: number;
  topSource: string;
  status: string;
}

const MAX_QUESTION_CHARS = 500;

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
        `INSERT INTO questions (created_at, question, lang, num_sources, top_source, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        new Date().toISOString(),
        question,
        row.lang,
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
  recent: { created_at: string; question: string; lang: string; status: string }[];
  topQuestions: { question: string; count: number }[];
  byLang: { lang: string; count: number }[];
  byDay: { day: string; count: number }[];
}

export async function getStats(db: D1Database): Promise<Stats> {
  const [total, recent, top, byLang, byDay] = await Promise.all([
    db.prepare(`SELECT COUNT(*) AS c FROM questions`).first<{ c: number }>(),
    db
      .prepare(
        `SELECT created_at, question, lang, status FROM questions ORDER BY id DESC LIMIT 50`,
      )
      .all(),
    db
      .prepare(
        `SELECT question, COUNT(*) AS count FROM questions
         GROUP BY question ORDER BY count DESC, MAX(id) DESC LIMIT 15`,
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
    topQuestions: (top.results ?? []) as Stats["topQuestions"],
    byLang: (byLang.results ?? []) as Stats["byLang"],
    byDay: (byDay.results ?? []) as Stats["byDay"],
  };
}
