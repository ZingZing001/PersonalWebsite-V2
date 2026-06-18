-- Analytics: what visitors ask the chat agent.
-- Privacy: stores only the question text the visitor typed — no IP, no identity.
CREATE TABLE IF NOT EXISTS questions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL,      -- ISO timestamp
  question    TEXT NOT NULL,      -- capped to 500 chars in the worker
  lang        TEXT,              -- detected language label (e.g. chinese, latin)
  num_sources INTEGER,           -- retrieved chunk count
  top_source  TEXT,              -- title of the top retrieved chunk
  status      TEXT               -- ok | error
);

CREATE INDEX IF NOT EXISTS idx_questions_created ON questions(created_at);
