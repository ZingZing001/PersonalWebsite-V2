import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2, Info } from "lucide-react";
import toast from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarBackground } from "@/components/StarBackground";
import { ChatMessage } from "@/components/ChatMessage";
import { StarterQuestions } from "@/components/StarterQuestions";
import { VirtualAvatar } from "@/components/VirtualAvatar";
import { streamChat, ChatError } from "@/lib/chatClient";

const STORAGE_KEY = "ask-me:transcript";

export const AskMe = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  // Restore prior in-tab session (sessionStorage, not localStorage — fresh tab = fresh chat)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamingContent]);

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
  }, [input]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    let accumulated = "";
    try {
      await streamChat(nextMessages, {
        onToken: (token) => {
          accumulated += token;
          setStreamingContent(accumulated);
        },
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: accumulated },
      ]);
    } catch (err) {
      const message =
        err instanceof ChatError
          ? err.message
          : "Something went wrong reaching the agent. Try again in a moment.";
      // Keep the user's message on screen (don't wipe the conversation — that
      // looked like a refresh) and surface the failure as a toast instead.
      toast.error(message);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setStreamingContent("");
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const isEmpty = messages.length === 0 && !isStreaming;

  // Drive the avatar from existing chat state: waiting for the first token →
  // "thinking"; tokens arriving → "speaking"; otherwise "idle".
  const avatarState = !isStreaming
    ? "idle"
    : streamingContent
      ? "speaking"
      : "thinking";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <StarBackground />
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <VirtualAvatar state={avatarState} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-4">
              <Sparkles size={12} />
              <span>Experimental · powered by OpenRouter</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Chat with <span className="text-primary">Virtual Johnson</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              An AI agent trained on my CV, blog posts, and projects. Ask about my experience, my tech stack, the projects I've built, or anything else.
            </p>
          </header>

          {/* Chat panel */}
          <div className="bg-card/80 border-2 dark:border-border/50 border-primary/20 rounded-2xl shadow-2xl dark:shadow-primary/5 shadow-xl overflow-hidden flex flex-col h-[60vh] min-h-[420px]">
            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-6 space-y-4"
            >
              {isEmpty ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-6 px-2">
                  <p className="text-muted-foreground max-w-md text-sm md:text-base">
                    Hey — I'm an AI version of Johnson. I've read all his blog posts and know about his work. What would you like to know?
                  </p>
                  <StarterQuestions onPick={sendMessage} disabled={isStreaming} />
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <ChatMessage key={i} role={m.role} content={m.content} />
                  ))}
                  {isStreaming && (
                    <ChatMessage
                      role="assistant"
                      content={streamingContent}
                      isStreaming
                    />
                  )}
                </>
              )}
            </div>

            {/* Input bar */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border/50 bg-background/50 px-3 md:px-4 py-3"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything — in any language…"
                  rows={1}
                  disabled={isStreaming}
                  className="flex-1 resize-none custom-scrollbar bg-background/80 border dark:border-border/50 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 transition-all disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  aria-label="Send message"
                  className="cosmic-button h-11 w-11 !p-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {isStreaming ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer row */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Info size={12} className="text-primary" />
              <span>
                Responses are AI-generated and may be imperfect. For anything important, use the{" "}
                <a
                  href={`${import.meta.env.BASE_URL}#contact`}
                  className="text-primary hover:underline"
                >
                  Contact section
                </a>
                .
              </span>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors self-start sm:self-auto"
              >
                <Trash2 size={12} />
                Clear conversation
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
