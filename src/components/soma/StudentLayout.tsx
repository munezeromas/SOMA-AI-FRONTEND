import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import {
  Home, Calendar, BookOpen, MessageCircle, Youtube,
  Gamepad2, TrendingUp, Compass, Users, LogOut, Library,
  Zap, Star, Sparkles
} from "lucide-react";
import { STUDENT } from "@/lib/mock-data";
import { useEffect } from "react";

const NAV_GROUPS = [
  {
    label: "Learn",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, exact: true },
      { to: "/student/tutor", label: "Soma AI", icon: MessageCircle },
      { to: "/student/ai-quizzes", label: "AI Quiz", icon: Sparkles },
      { to: "/student/simplify", label: "Text Simplifier", icon: BookOpen },
      { to: "/student/homework", label: "Homework", icon: Calendar },
      { to: "/student/quizzes", label: "Quizzes", icon: Zap },
    ]
  },
  {
    label: "Explore",
    items: [
      { to: "/student/videos", label: "Videos", icon: Youtube },
      { to: "/student/games", label: "Play Zone", icon: Gamepad2 },
      { to: "/student/library", label: "Library", icon: Library },
    ]
  },
  {
    label: "Track",
    items: [
      { to: "/student/planner", label: "Planner", icon: Calendar },
      { to: "/student/progress", label: "Progress", icon: TrendingUp },
      { to: "/student/career", label: "Pathways", icon: Compass },
      { to: "/student/community", label: "Community", icon: Users },
    ]
  }
];

const XP_NEXT_LEVEL = 2500;

export function StudentLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const xpPercent = Math.round((STUDENT.xp / XP_NEXT_LEVEL) * 100);

  useEffect(() => {
    // Robust Global Audio Context & Speech API Initialization
    const initAudio = async () => {
      if (typeof window === "undefined") return;

      const unlock = () => {
        // 1. Warm up Web Speech API
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const silent = new SpeechSynthesisUtterance("");
          silent.volume = 0;
          window.speechSynthesis.speak(silent);
          // Pre-load voices
          window.speechSynthesis.getVoices();
        }

        // 2. Global AudioContext fallback
        // We'll also dispatch a custom event that components can listen to
        window.dispatchEvent(new CustomEvent('soma-audio-unlocked'));
        
        console.log("Soma Audio System: Initialized & Unlocked");
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
      };

      window.addEventListener('click', unlock);
      window.addEventListener('keydown', unlock);
      
      // Also try to get voices immediately as some browsers need a head start
      if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }
      }
    };

    initAudio();
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside
        className="w-64 flex flex-col sticky top-0 h-screen overflow-y-auto shrink-0"
        style={{
          background: "linear-gradient(180deg, #080C14 0%, #0A1020 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-6">
          <Link to="/"><Logo size={38} /></Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-6">
          {NAV_GROUPS.map((group) => {
            const isGroupActive = group.items.some(n =>
              n.exact ? path === n.to : path.startsWith(n.to)
            );
            return (
              <div key={group.label}>
                <p className="px-3 mb-2 text-[9px] font-black uppercase tracking-[0.25em]"
                   style={{ color: "rgba(255,255,255,0.25)" }}>
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((n) => {
                    const active = n.exact ? path === n.to : path.startsWith(n.to);
                    return (
                      <Link
                        key={n.to}
                        to={n.to}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative group"
                        style={{
                          background: active ? "rgba(0,195,107,0.12)" : "transparent",
                          color: active ? "#00C36B" : "rgba(255,255,255,0.55)",
                        }}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#00C36B]" />
                        )}
                        <n.icon
                          className="h-4 w-4 shrink-0 transition-all"
                          style={{ opacity: active ? 1 : 0.5 }}
                        />
                        {n.label}
                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#00C36B] shadow-[0_0_8px_rgba(0,195,107,0.8)]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Student Profile Card */}
        <div className="m-4 rounded-3xl p-5 relative overflow-hidden group/card" 
             style={{ 
               background: "rgba(255,255,255,0.03)", 
               border: "1px solid rgba(255,255,255,0.06)",
               backdropFilter: "blur(10px)"
             }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#00C36B] to-[#00956E] flex items-center justify-center text-white text-sm font-black shadow-[0_0_15px_rgba(0,195,107,0.4)] transform group-hover/card:scale-110 transition-transform duration-500">
              {STUDENT.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-white truncate leading-tight">{STUDENT.name}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-0.5" style={{ color: "#00C36B" }}>
                Level {STUDENT.level}
              </p>
            </div>
          </div>

          {/* XP Bar */}
          <div className="relative z-10 space-y-2 mb-4">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
              <span>Progress</span>
              <span className="text-primary">{STUDENT.xp} / {XP_NEXT_LEVEL} XP</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-white/5 border border-white/5">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${xpPercent}%`,
                  background: "linear-gradient(90deg, #00C36B, #00FF94)",
                  boxShadow: "0 0 12px rgba(0,195,107,0.4)"
                }}
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex -space-x-1">
              {STUDENT.badges.slice(0, 3).map((b, i) => (
                <div key={i} className="h-6 w-6 rounded-lg bg-[#0A1020] border border-white/10 flex items-center justify-center shadow-lg" title={b}>
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                </div>
              ))}
            </div>
            <Link to="/login" className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">
              <LogOut className="h-3 w-3" /> Switch
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <main className="flex-1 overflow-x-hidden" style={{ background: "var(--background)" }}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 px-8 py-3 flex items-center justify-between" style={{
          background: "rgba(8,12,20,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-black text-white">{STUDENT.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(0,195,107,0.08)", border: "1px solid rgba(0,195,107,0.2)" }}>
              <Star className="h-4 w-4 text-[#00C36B]" />
              <span className="text-sm font-black text-[#00C36B]">{STUDENT.xp} XP</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>

      <AccessibilityBar />
    </div>
  );
}