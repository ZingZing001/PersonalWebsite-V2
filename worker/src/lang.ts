// Lightweight, dependency-free language hint for the response guardrail.
//
// Free LLMs frequently mix languages within a single reply. We can't fully
// fix that with a model alone, but a confident, explicit "respond in X"
// instruction helps a lot. This detects the dominant script of the user's
// message and returns a human-readable language name when the script is
// unambiguous; otherwise null (Latin scripts can't be told apart by script,
// so we defer to "the same language as the user's message").

export function detectLanguage(text: string): string | null {
  if (!text) return null;
  // Order matters: Japanese kana and Korean Hangul take precedence over the
  // shared CJK ideograph range.
  if (/[가-힯]/.test(text)) return "Korean";
  if (/[぀-ゟ゠-ヿ]/.test(text)) return "Japanese";
  if (/[一-鿿]/.test(text)) return "Chinese";
  if (/[Ѐ-ӿ]/.test(text)) return "Russian";
  if (/[؀-ۿ]/.test(text)) return "Arabic";
  if (/[֐-׿]/.test(text)) return "Hebrew";
  if (/[฀-๿]/.test(text)) return "Thai";
  if (/[ऀ-ॿ]/.test(text)) return "Hindi";
  return null;
}

// The instruction appended to the system prompt for this turn. Confident when
// a script was detected, generic otherwise — both forbid language mixing.
export function languageInstruction(text: string): string {
  const lang = detectLanguage(text);
  return lang
    ? `The user's latest message is written in ${lang}. Write your ENTIRE reply in ${lang}. Do not mix in English or any other language (keep proper nouns — names, technologies, company names — as written).`
    : `Write your ENTIRE reply in the same language as the user's latest message. Do not mix languages within the reply (keep proper nouns as written).`;
}

// A short, stable label for analytics (the detected script-language, or
// "latin" when undetermined). Not shown to users.
export function languageLabel(text: string): string {
  return detectLanguage(text)?.toLowerCase() ?? "latin";
}
