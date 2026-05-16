/**
 * StudentLayout.tsx
 *
 * Changes from original:
 *  1. Wrapped the entire layout in <AvatarMuteProvider> so the AccessibilityBar
 *     "AI Voice" toggle propagates to TalkingChatbot without prop-drilling.
 *  2. TalkingChatbot is NOT rendered here — it lives inside each page that
 *     needs it (e.g. TutorPage). This keeps the avatar visible only when
 *     a conversation is active, rather than on every page.
 *
 * If you want the avatar to appear on EVERY student page (always visible),
 * uncomment the <TalkingChatbot> block in the sidebar section below and
 * remove it from individual pages.
 *
 * Place this file at:  src/components/StudentLayout.tsx
 */

import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { AccessibilityBar, AvatarMuteProvider } from "./AccessibilityBar";
import { RiveAnimation } from "./RiveAnimation";
import {
  LogOut,
  ChevronDown,
} from "lucide-react";
import { STUDENT } from "@/lib/mock-data";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { to: "/student",            label: "Home",     exact: true, emoji: "🏠" },
  { to: "/student/tutor",      label: "Soma AI",              emoji: "🤖" },
  { to: "/student/ai-quizzes", label: "AI Quiz",              emoji: "✨" },
  { to: "/student/simplify",   label: "Simplify",             emoji: "📝", riv: "/riv-animations/21441-40283-students-tools-notebook-pencil.riv" },
  { to: "/student/homework",   label: "Homework",             emoji: "📋", riv: "/riv-animations/21441-40283-students-tools-notebook-pencil.riv" },
  { to: "/student/quizzes",    label: "Quizzes",              emoji: "⚡" },
  { to: "/student/videos",     label: "Videos",               emoji: "📺" },
  { to: "/student/games",      label: "Games",                emoji: "🎮" },
  { to: "/student/library",    label: "Library",              emoji: "📚" },
  { to: "/student/planner",    label: "Planner",              emoji: "📅" },
  { to: "/student/progress",   label: "Progress",             emoji: "📈" },
  { to: "/student/career",     label: "Pathways",             emoji: "🧭", riv: "/riv-animations/21389-40164-mapley.riv" },
  { to: "/student/community",  label: "Community",            emoji: "👥" },
];

const XP_NEXT_LEVEL = 2500;

export function StudentLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const prevPath = useRef(path);
  const xpPercent = Math.round((STUDENT.xp / XP_NEXT_LEVEL) * 100);
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  const [fellaWalking, setFellaWalking] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger little-fella walk on navigation
  useEffect(() => {
    if (path !== prevPath.current) {
      prevPath.current = path;
      setFellaWalking(true);
      const t = setTimeout(() => setFellaWalking(false), 1500);
      return () => clearTimeout(t);
    }
  }, [path]);

  // Audio unlock — fires a custom event that TalkingChatbot listens to
  useEffect(() => {
    if (typeof window === "undefined") return;
    const unlock = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const silent = new SpeechSynthesisUtterance("");
        silent.volume = 0;
        window.speechSynthesis.speak(silent);
        window.speechSynthesis.getVoices();
      }
      window.dispatchEvent(new CustomEvent("soma-audio-unlocked"));
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return (
    // ── AvatarMuteProvider wraps everything so AccessibilityBar can talk
    // to TalkingChatbot (wherever it is rendered inside <Outlet />) through
    // context, with zero prop drilling.
    <AvatarMuteProvider>
      <div
        className={`min-h-screen flex flex-col ${!mounted ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
        style={{
          background:
            mounted && theme === "dark"
              ? "linear-gradient(180deg, #060D1A 0%, #0A1628 40%, #0D2044 100%)"
              : "linear-gradient(180deg, #5BC8F5 0%, #87CEEB 40%, #B8E4F9 100%)",
          backgroundAttachment: "fixed",
          transition: "background 0.6s ease, opacity 0.3s ease",
        }}
      >
        {/* Night stars layer */}
        {mounted && theme === "dark" && <div className="dark-stars" />}

        {/* ── TOP NAV BAR ── */}
        <header className="nav-top sticky top-0 z-50 px-4 py-3 flex items-center justify-between relative overflow-hidden">
          {/* Ambient background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: mounted && theme === "dark" ? 0.06 : 0.12 }}
          >
            <RiveAnimation
              src="/riv-animations/413-3213-chill-study-time.riv"
              className="w-full h-full"
            />
          </div>

          {/* Left: Hamburger + Logo + weather */}
          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              id="btn-open-sidebar"
              aria-label="Open sidebar"
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "rgba(74,144,217,0.15)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4A90D9"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <Link to="/">
              <Logo size={34} />
            </Link>
            <div className="w-8 h-8 hidden md:block" title="Weather">
              <RiveAnimation
                src="/riv-animations/181-339-weather-icon.riv"
                className="w-full h-full"
              />
            </div>
            <span
              className="hidden md:block text-xs font-black"
              style={{
                color: theme === "dark" ? "#7BB8F0" : "#1A3A5C",
                opacity: 0.7,
              }}
            >
              Good day, {STUDENT.name.split(" ")[0]}!
            </span>
          </div>

          {/* Right: Stats + Theme toggle + Avatar */}
          <div className="flex items-center gap-2 relative z-10">
            {/* XP coin */}
            <div className="coin-counter group relative" title="Your XP coins">
              <div className="coin-icon">🪙</div>
              <span className="font-black text-sm">{STUDENT.xp}</span>
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <RiveAnimation
                  src="/riv-animations/10770-20625-animated-calculator-buttons.riv"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Trophy */}
            <div
              className="coin-counter"
              style={{ borderColor: "rgba(255,165,0,0.4)" }}
            >
              <div className="trophy-icon">🏆</div>
              <span className="font-black text-sm">{STUDENT.badges.length}</span>
            </div>

            {/* Streak */}
            <div
              className="coin-counter hidden sm:flex"
              style={{ borderColor: "rgba(255,200,0,0.4)" }}
            >
              <span className="text-base">🔥</span>
              <span className="font-black text-sm">{STUDENT.streak}</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              id="btn-theme-toggle"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={theme === "light" ? "Switch to Night Mode 🌙" : "Switch to Day Mode ☀️"}
              className={`theme-toggle-btn ${theme}`}
            >
              <div className="theme-toggle-knob" />
              <span
                className="absolute inset-0 flex items-center justify-center text-[10px] pointer-events-none select-none"
                style={{ paddingLeft: theme === "light" ? "18px" : "4px" }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </span>
            </button>

            {/* Avatar button */}
            <button
              className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full font-black text-sm transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4A90D9, #2D6DB5)",
                color: "white",
                boxShadow: "0 4px 12px rgba(74,144,217,0.4)",
              }}
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-black">
                {STUDENT.name[0]}
              </div>
              <span className="hidden sm:inline">{STUDENT.name.split(" ")[0]}</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>
          </div>
        </header>

        <div className="flex flex-1 relative">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ── SIDEBAR ── */}
          <aside
            className={`fixed top-0 left-0 h-full z-50 w-72 flex flex-col transition-all duration-500 ease-in-out sidebar-kids lg:sticky lg:top-[62px] lg:h-[calc(100vh-62px)] lg:z-auto ${
              sidebarOpen ? "translate-x-0 lg:ml-0" : "-translate-x-full lg:-ml-72"
            }`}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 lg:hidden border-b-2 border-[#4A90D9]/10">
              <Logo size={32} />
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
                style={{ background: "rgba(74,144,217,0.1)" }}
              >
                ✕
              </button>
            </div>

            {/* Mascot - no clipping, transparent bg */}
            <div className="mx-auto mt-3 w-24 h-24">
              <RiveAnimation
                src="/riv-animations/17629-33045-strawberry-studying-mascot.riv"
                className="w-full h-full"
              />
            </div>

            {/* Student profile + XP bar */}
            <div
              className="mx-3 mt-2 p-3 rounded-2xl"
              style={{
                background: "rgba(74,144,217,0.1)",
                border: "2px solid rgba(255,255,255,0.5)",
              }}
            >
              <div className="text-center mb-2">
                <p className="font-black text-sm leading-none text-[#1A3A5C]">
                  {STUDENT.name}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className="w-5 h-5">
                    <RiveAnimation
                      src="/riv-animations/22180-41567-level-up-badges-animation.riv"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-xs font-bold text-[#4A90D9]">
                    Level {STUDENT.level}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-black text-[#4A6A8A]">
                  <span>XP Progress</span>
                  <span className="text-[#4A90D9]">
                    {STUDENT.xp}/{XP_NEXT_LEVEL}
                  </span>
                </div>
                <div
                  className="h-10 w-full rounded-2xl overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,0.4)",
                    border: "2px solid rgba(255,255,255,0.7)",
                  }}
                >
                  <RiveAnimation
                    src="/riv-animations/715-6730-water-bar-demo.riv"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
              {NAV_ITEMS.map((n) => {
                const active = n.exact
                  ? path === n.to
                  : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`sidebar-nav-item group ${active ? "active" : ""}`}
                  >
                    {n.riv ? (
                      <div className="w-5 h-5 shrink-0">
                        <RiveAnimation src={n.riv} className="w-full h-full" />
                      </div>
                    ) : (
                      <span className="text-base">{n.emoji}</span>
                    )}
                    <span>{n.label}</span>
                    {active && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Little-fella companion — no border, no bg, just the character */}
            <div
              className="h-24 mx-auto w-24 transition-transform duration-300"
              style={{
                transform: fellaWalking
                  ? "translateX(8px) scaleX(-1)"
                  : "translateX(0) scaleX(1)",
              }}
              title="Your study buddy! 🐾"
            >
              <RiveAnimation
                src="/riv-animations/17633-33058-little-fella.riv"
                className="w-full h-full"
              />
            </div>

            {/* Logout */}
            <div className="p-3">
              <Link to="/login" className="sidebar-nav-item w-full">
                <LogOut className="h-4 w-4" />
                <span>Switch Account</span>
              </Link>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 relative">
            {/* Road ambient background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: 0.05 }}
            >
              <RiveAnimation
                src="/riv-animations/2266-4480-road.riv"
                className="w-full h-full"
              />
            </div>
            <div className="relative">
              {/* Outlet renders the current page.
                  Pages that use TalkingChatbot (e.g. TutorPage) import
                  useAvatarMuted() to get isMuted from context. */}
              <Outlet />
            </div>
          </main>
        </div>

        <AccessibilityBar />
      </div>
    </AvatarMuteProvider>
  );
}