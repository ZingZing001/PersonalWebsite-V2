import { useCallback, useEffect, useState } from "react";
import {
  Lock,
  MessageSquare,
  Tags,
  Globe,
  CalendarDays,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarBackground } from "@/components/StarBackground";

const ADMIN_URL =
  (import.meta.env.VITE_CHAT_API_URL || "").replace(/\/chat\/?$/, "") +
  "/admin/stats";
const TOKEN_KEY = "ask-me:admin-token";

const Bar = ({ label, count, max, title }) => (
  <div className="flex items-center gap-3 text-sm">
    <span
      className="w-32 shrink-0 truncate text-muted-foreground"
      title={title ?? label}
    >
      {label}
    </span>
    <div className="flex-1 h-2.5 rounded-full bg-primary/10 overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${max ? (count / max) * 100 : 0}%` }}
      />
    </div>
    <span className="w-8 text-right tabular-nums text-foreground/80">
      {count}
    </span>
  </div>
);

const Card = ({ icon: Icon, title, children }) => (
  <div className="bg-card/80 border-2 dark:border-border/50 border-primary/20 rounded-2xl p-5 shadow-lg dark:shadow-primary/5">
    <div className="flex items-center gap-2 mb-4 text-primary">
      <Icon size={18} />
      <h2 className="font-semibold text-foreground">{title}</h2>
    </div>
    {children}
  </div>
);

export const Admin = () => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem(TOKEN_KEY) || "",
  );
  const [input, setInput] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (t) => {
    if (!t) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ADMIN_URL, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        setError("Invalid token.");
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setStats(null);
        return;
      }
      if (!res.ok) {
        setError(`Request failed (${res.status}).`);
        return;
      }
      const data = await res.json();
      setStats(data);
      sessionStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch {
      setError("Couldn't reach the analytics endpoint.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const handleLogin = (e) => {
    e.preventDefault();
    load(input.trim());
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setStats(null);
    setInput("");
  };

  const maxCat = Math.max(1, ...(stats?.byCategory || []).map((q) => q.count));
  const maxLang = Math.max(1, ...(stats?.byLang || []).map((q) => q.count));
  const maxDay = Math.max(1, ...(stats?.byDay || []).map((q) => q.count));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <StarBackground />
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {!stats ? (
            // Gated login screen
            <div className="max-w-sm mx-auto mt-10 bg-card/80 border-2 dark:border-border/50 border-primary/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Lock size={18} />
                <h1 className="font-semibold text-foreground">Analytics login</h1>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Enter the admin token to view what visitors are asking Virtual
                Johnson.
              </p>
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Admin token"
                  autoFocus
                  className="w-full bg-background/80 border dark:border-border/50 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none rounded-xl px-4 py-2.5 text-foreground placeholder:text-foreground/40"
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="cosmic-button w-full !py-2.5 disabled:opacity-50"
                >
                  {loading ? "Checking…" : "View analytics"}
                </button>
              </form>
            </div>
          ) : (
            // Dashboard
            <>
              <header className="flex items-start justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                    Chat <span className="text-primary">Analytics</span>
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    {stats.total} question{stats.total === 1 ? "" : "s"} asked ·
                    anonymous (no IPs stored)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => load(token)}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors"
                  >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    Refresh
                  </button>
                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors"
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="lg:col-span-2">
                  <Card icon={MessageSquare} title="Recent questions">
                    <div className="max-h-80 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                      {stats.recent.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No questions yet.
                        </p>
                      )}
                      {stats.recent.map((q, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-3 text-sm border-b border-border/30 pb-2"
                        >
                          <span className="text-foreground/90">{q.question}</span>
                          <span className="shrink-0 flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {q.category || "Other"}
                            </span>
                            {new Date(q.created_at).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <Card icon={Tags} title="Question categories">
                  <div className="space-y-2.5">
                    {stats.byCategory.map((q, i) => (
                      <Bar
                        key={i}
                        label={q.category}
                        count={q.count}
                        max={maxCat}
                      />
                    ))}
                  </div>
                </Card>

                <div className="grid grid-rows-2 gap-5">
                  <Card icon={Globe} title="Languages">
                    <div className="space-y-2.5">
                      {stats.byLang.map((q, i) => (
                        <Bar key={i} label={q.lang} count={q.count} max={maxLang} />
                      ))}
                    </div>
                  </Card>
                  <Card icon={CalendarDays} title="By day">
                    <div className="space-y-2.5">
                      {stats.byDay.map((q, i) => (
                        <Bar key={i} label={q.day} count={q.count} max={maxDay} />
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
