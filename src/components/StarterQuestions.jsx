import { Sparkles } from "lucide-react";

const STARTER_QUESTIONS = [
  "What did you learn from your EROAD internship?",
  "What are you building as Product Owner at AUSS?",
  "Walk me through your capstone project.",
  "What's your tech stack and how did you pick it?",
  "Tell me about a hard production incident you've handled.",
  "What's your experience and education background?",
];

export const StarterQuestions = ({ onPick, disabled }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles size={14} className="text-primary" />
        <span>Try one of these to get started</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {STARTER_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            disabled={disabled}
            onClick={() => onPick(q)}
            className="text-left px-4 py-2 rounded-full text-sm border-2 dark:border-border/50 border-primary/20 bg-card/60 hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
