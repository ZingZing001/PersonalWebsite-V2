import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import pfp from "@/assets/Profile_Pic.jpg";

export const ChatMessage = ({ role, content, isStreaming = false }) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} animate-fade-in`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/40 shadow-md">
            <img
              src={pfp}
              alt="Virtual Johnson"
              className="w-full h-full object-cover"
              style={{ transform: "scale(1.7)", transformOrigin: "50% 18%" }}
            />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-left ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card/90 border-2 dark:border-border/50 border-primary/20 text-foreground rounded-tl-sm shadow-lg dark:shadow-primary/5"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            {content}
          </p>
        ) : (
          <div
            className="prose prose-sm md:prose-base dark:prose-invert max-w-none
              prose-p:my-2 prose-p:leading-relaxed
              prose-ul:my-2 prose-ol:my-2 prose-li:my-1
              prose-headings:mt-3 prose-headings:mb-2
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
          >
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <Bot className="w-4 h-4 animate-pulse" />
                Thinking…
              </span>
            )}
            {isStreaming && content && (
              <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
