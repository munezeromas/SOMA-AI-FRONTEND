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
  { to: "/student/speak",      label: "Language",             emoji: "🗣️" },
  { to: "/student/games",      label: "Games",                emoji: "🎮" },
  { to: "/student/library",    label: "Library",              emoji: "📚" },
  { to: "/student/planner",    label: "Planner",              emoji: "📅" },
  { to: "/student/progress",   label: "Progress",             emoji: "📈" },
  { to: "/student/career",     label: "Pathways",             emoji: "🧭", riv: "/riv-animations/21389-40164-mapley.riv" },
  { to: "/student/community",  label: "Community",            emoji: "👥" },
];

const ONBOARDING_SLIDES = [
  {
    title: "Welcome to Soma AI! 🏝️✨",
    emoji: "🏝️",
    bg: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,142,83,0.08))",
    border: "rgba(255,107,107,0.3)",
    accent: "#FF6B6B",
    description: "Welcome to your magical study island! Soma AI is an interactive space built just for kids, making learning feel like an epic adventure!",
    tips: [
      "🏝️ Explore different subject worlds like Math or Reading.",
      "🎮 Play learning games to earn points.",
      "📈 Level up as you master topics!"
    ]
  },
  {
    title: "Meet Soma, Your AI Friend! 🤖💬",
    emoji: "🤖",
    bg: "linear-gradient(135deg, rgba(74,144,217,0.08), rgba(91,200,245,0.08))",
    border: "rgba(74,144,217,0.3)",
    accent: "#4A90D9",
    description: "Soma is your smart study buddy. Tap the 'Soma AI' island to start a conversation. She can explain anything in simple terms!",
    tips: [
      "🎤 Tap the microphone to talk with your voice natively!",
      "🔊 Tap the 'Tap to Activate Audio' overlay to hear her speak out loud.",
      "📝 Ask her to simplify any hard paragraph from your textbooks!"
    ]
  },
  {
    title: "Dyslexia & Reading Help! 📝👓",
    emoji: "👓",
    bg: "linear-gradient(135deg, rgba(46,204,113,0.08), rgba(39,174,96,0.08))",
    border: "rgba(46,204,113,0.3)",
    accent: "#2ECC71",
    description: "We believe every kid is a genius. If you find reading difficult, Soma has built-in helper tools to make things simple and stress-free!",
    tips: [
      "🔍 Turn on 'Dyslexia Mode' for easy-to-read kid-friendly fonts.",
      "🗣️ Tap the read-aloud buttons to listen to pages out loud.",
      "✏️ Switch between Day Mode ☀️ and Cozy Night Mode 🌙 anytime."
    ]
  },
  {
    title: "Unlock XP & Cool Badges! 🪙🏆",
    emoji: "🏆",
    bg: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,165,0,0.08))",
    border: "rgba(255,215,0,0.3)",
    accent: "#FFA500",
    description: "Turn studying into play! Complete homework, finish daily quizzes, and unlock unique high-level badges to show off your knowledge!",
    tips: [
      "🪙 Earn gold XP coins for every correct answer.",
      "🔥 Keep your streak alive by visiting every day.",
      "👑 Collect all Master Badges and show them to your friends!"
    ]
  }
];

const XP_NEXT_LEVEL = 2500;

export function StudentLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const prevPath = useRef(path);
  const xpPercent = Math.round((STUDENT.xp / XP_NEXT_LEVEL) * 100);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fellaWalking, setFellaWalking] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingSlide, setOnboardingSlide] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const completed = localStorage.getItem("soma_onboarding_completed");
      if (!completed) {
        setShowOnboarding(true);
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
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
          backgroundImage:
            mounted && theme === "dark"
              ? "linear-gradient(180deg, #060D1A 0%, #0A1628 40%, #0D2044 100%)"
              : "linear-gradient(180deg, #5BC8F5 0%, #87CEEB 40%, #B8E4F9 100%)",
          backgroundAttachment: "fixed",
          transition: "background-image 0.6s ease, opacity 0.3s ease",
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
              <Logo size={34} lightBg={theme === "light"} />
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
              className="coin-counter hidden sm:flex"
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
          {mounted && sidebarOpen && (
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
            <div className="hidden lg:block pt-4"></div>

            <div className="flex items-center justify-between p-4 lg:hidden border-b-2 border-[#4A90D9]/10">
              <Logo size={32} lightBg={theme === "light"} />
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
                style={{ background: "rgba(74,144,217,0.1)" }}
              >
                ✕
              </button>
            </div>

            {/* Student profile + XP bar */}
            <div className="mx-4 mt-4 mb-6">
              <div 
                className="p-4 rounded-3xl"
                style={{
                  background: "rgba(74,144,217,0.05)",
                  border: "1px solid rgba(74,144,217,0.2)",
                  boxShadow: "inset 0 2px 10px rgba(74,144,217,0.05)"
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#4A90D9] to-[#87CEFA] flex items-center justify-center text-white font-black shadow-md border-2 border-white">
                    {STUDENT.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-[15px] leading-tight text-[#1A3A5C]">
                      {STUDENT.name.split(" ")[0]}
                    </p>
                    <p className="text-xs font-bold text-[#4A90D9] flex items-center gap-1">
                      ⭐ Level {STUDENT.level}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-black text-[#4A6A8A]">
                    <span>XP</span>
                    <span className="text-[#4A90D9]">{STUDENT.xp} / {XP_NEXT_LEVEL}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#4A90D9] to-[#87CEFA]" 
                      style={{ width: Math.max(5, xpPercent) + '%' }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((n) => {
                const active = n.exact
                  ? path === n.to
                  : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-[15px] transition-all group ${
                      active 
                        ? "bg-[#4A90D9] text-white shadow-[0_4px_12px_rgba(74,144,217,0.3)]" 
                        : "text-[#4A6A8A] hover:bg-[#4A90D9]/10 hover:text-[#1A3A5C]"
                    }`}
                  >
                    <span className={`text-xl transition-transform group-hover:scale-110 ${active ? "drop-shadow-sm" : ""}`}>{n.emoji}</span>
                    <span>{n.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 mt-auto">
              <Link 
                to="/login" 
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-black text-[#E74C3C] bg-[#E74C3C]/10 hover:bg-[#E74C3C]/20 transition-all group"
              >
                <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
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

        {/* ── ONBOARDING WELCOME MODAL FOR KIDS ── */}
        {showOnboarding && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div 
              className="w-full max-w-lg rounded-[36px] border shadow-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-center text-center animate-in zoom-in-95 duration-500"
              style={{
                background: theme === "dark" 
                  ? "linear-gradient(135deg, #0B132B 0%, #1C2541 100%)" 
                  : "linear-gradient(135deg, #FFFFFF 0%, #F5F9FD 100%)",
                borderColor: ONBOARDING_SLIDES[onboardingSlide].border,
              }}
            >
              {/* Confetti & stars effects */}
              <div className="absolute top-[-50px] right-[-50px] w-36 h-36 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-[-50px] left-[-50px] w-36 h-36 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => {
                  localStorage.setItem("soma_onboarding_completed", "true");
                  setShowOnboarding(false);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center font-bold transition-transform hover:scale-110"
              >
                ✕
              </button>

              {/* Kid-friendly Giant Pop-out Emoji */}
              <div 
                className="w-24 h-24 rounded-[32px] flex items-center justify-center text-5xl mb-6 shadow-inner relative animate-bounce"
                style={{
                  background: ONBOARDING_SLIDES[onboardingSlide].bg,
                  border: `2px solid ${ONBOARDING_SLIDES[onboardingSlide].border}`,
                }}
              >
                {ONBOARDING_SLIDES[onboardingSlide].emoji}
              </div>

              {/* Slide Title */}
              <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3 tracking-tight">
                {ONBOARDING_SLIDES[onboardingSlide].title}
              </h2>

              {/* Slide Description */}
              <p className="text-sm font-semibold text-muted-foreground mb-6 leading-relaxed max-w-sm">
                {ONBOARDING_SLIDES[onboardingSlide].description}
              </p>

              {/* Kid friendly Quick Tips Checklist */}
              <div className="w-full text-left space-y-2 mb-8 max-w-sm">
                {ONBOARDING_SLIDES[onboardingSlide].tips.map((tip, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl border text-xs sm:text-sm font-black flex items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(128,128,128,0.08)"
                    }}
                  >
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Progress Dots */}
              <div className="flex gap-2 mb-6">
                {ONBOARDING_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setOnboardingSlide(idx)}
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      width: onboardingSlide === idx ? "24px" : "12px",
                      background: onboardingSlide === idx ? ONBOARDING_SLIDES[onboardingSlide].accent : "rgba(128,128,128,0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex gap-3 w-full max-w-sm">
                {onboardingSlide > 0 && (
                  <button
                    onClick={() => setOnboardingSlide(prev => prev - 1)}
                    className="flex-1 py-4 text-sm font-black rounded-2xl border bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                )}
                
                {onboardingSlide < ONBOARDING_SLIDES.length - 1 ? (
                  <button
                    onClick={() => setOnboardingSlide(prev => prev + 1)}
                    className="flex-1 py-4 text-sm font-black rounded-2xl text-white shadow-lg transition-transform hover:scale-[1.02]"
                    style={{
                      background: ONBOARDING_SLIDES[onboardingSlide].accent,
                      boxShadow: `0 4px 14px ${ONBOARDING_SLIDES[onboardingSlide].accent}50`,
                    }}
                  >
                    Next Slide ➜
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.setItem("soma_onboarding_completed", "true");
                      setShowOnboarding(false);
                    }}
                    className="flex-1 py-4 text-sm font-black rounded-2xl text-white shadow-lg transition-transform hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #2ECC71, #27AE60)",
                      boxShadow: "0 4px 14px rgba(46,204,113,0.5)",
                    }}
                  >
                    Let's Explore! 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AvatarMuteProvider>
  );
}