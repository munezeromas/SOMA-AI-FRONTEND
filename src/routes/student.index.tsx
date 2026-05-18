import { createFileRoute, Link } from "@tanstack/react-router";
import { STUDENT, QUOTES, MASTERY } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "My World — Soma AI" }] }),
  component: Dashboard,
});

const ISLANDS = [
  {
    id: "math",
    to: "/student/videos?filter=Math",
    label: "Math",
    img: "/island-math.png",
    color: "#4A90D9",
    shadow: "rgba(74,144,217,0.4)",
    badge: "P1–P6",
    badgeColor: "#4A90D9",
    emoji: "🧮",
  },
  {
    id: "reading",
    to: "/student/library",
    label: "Reading & Writing",
    img: "/island-reading.png",
    color: "#2ECC71",
    shadow: "rgba(46,204,113,0.4)",
    badge: "P1–P6",
    badgeColor: "#2ECC71",
    emoji: "📚",
  },
  {
    id: "ai",
    to: "/student/tutor",
    label: "AI Tutor",
    img: "/island-ai.png",
    color: "#FF9500",
    shadow: "rgba(255,149,0,0.4)",
    badge: "All Grades",
    badgeColor: "#FF9500",
    emoji: "🤖",
  },
  {
    id: "speak",
    to: "/student/speak",
    label: "Speak & Listen",
    img: "/island-speak.png",
    color: "#9B59B6",
    shadow: "rgba(155,89,182,0.4)",
    badge: "Languages",
    badgeColor: "#9B59B6",
    emoji: "🗣️",
  },
];

const QUICK_ACTIONS = [
  { to: "/student/ai-quizzes", label: "AI Quiz", emoji: "✨", color: "#9B59B6", bg: "rgba(155,89,182,0.12)" },
  { to: "/student/games", label: "Games", emoji: "🎮", color: "#FF6B6B", bg: "rgba(255,107,107,0.12)" },
  { to: "/student/simplify", label: "Simplify", emoji: "📝", color: "#4A90D9", bg: "rgba(74,144,217,0.12)" },
  { to: "/student/planner", label: "Planner", emoji: "📅", color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  { to: "/student/videos", label: "Videos", emoji: "📺", color: "#E74C3C", bg: "rgba(231,76,60,0.12)" },
  { to: "/student/progress", label: "Progress", emoji: "📈", color: "#FF9500", bg: "rgba(255,149,0,0.12)" },
];

function Dashboard() {
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto px-2">

      {/* ── GREETING BANNER ── */}
      <div
        className="card-cloud p-6 flex items-center justify-between gap-4 animate-pop-in"
      >
        <div>
          <p className="text-sm font-bold text-[#4A6A8A] mb-0.5">Welcome back! 👋</p>
          <h1 className="text-2xl font-black text-[#1A3A5C]">
            Hey, <span style={{ color: "#4A90D9" }}>{STUDENT.name.split(" ")[0]}!</span>
          </h1>
          <p className="text-sm font-semibold text-[#4A6A8A] mt-1 italic max-w-xs leading-relaxed">
            "{quote}"
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm"
            style={{ background: "rgba(255,200,0,0.15)", color: "#CC8800", border: "2px solid rgba(255,200,0,0.3)" }}
          >
            🔥 {STUDENT.streak} day streak
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm"
            style={{ background: "rgba(74,144,217,0.12)", color: "#4A90D9", border: "2px solid rgba(74,144,217,0.2)" }}
          >
            ⭐ Level {STUDENT.level}
          </div>
        </div>
      </div>

      {/* ── SUBJECT ISLANDS ── */}
      <div>
        <h2 className="text-lg font-black text-[#1A3A5C] mb-4 flex items-center gap-2">
          🏝️ Choose Your World
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ISLANDS.map((island, i) => (
            <Link
              key={island.id}
              to={island.to}
              id={`island-${island.id}`}
              className="card-island flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-2 hover:shadow-2xl animate-pop-in"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Island Image */}
              <div className="relative w-full mb-5">
                <div
                  className="w-full h-56 rounded-[2rem] overflow-hidden flex items-center justify-center animate-float-island"
                  style={{
                    animationDelay: `${i * 0.8}s`,
                    background: `linear-gradient(135deg, ${island.color}18, ${island.color}32)`,
                  }}
                >
                  <img
                    src={island.img}
                    alt={island.label}
                    className="w-full h-full object-cover drop-shadow-lg"
                    onError={(e) => {
                      // Fallback to emoji if image fails
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `<span style="font-size:80px;filter:drop-shadow(0 8px 16px rgba(0,0,0,0.15))">${island.emoji}</span>`;
                    }}
                  />
                </div>
              </div>

              {/* Island label */}
              <h3
                className="text-2xl font-black tracking-wide mb-2"
                style={{
                  color: island.color,
                  textShadow: `0 2px 8px ${island.shadow}`,
                }}
              >
                {island.label}
              </h3>
              {/* Grade badge */}
              <span
                className="pill-badge text-white text-sm mt-1 px-4 py-1.5"
                style={{ background: island.color, boxShadow: `0 4px 10px ${island.shadow}` }}
              >
                {island.badge}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div>
        <h2 className="text-lg font-black text-[#1A3A5C] mb-3 flex items-center gap-2">
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((a, i) => (
            <Link
              key={a.to}
              to={a.to}
              className="card-cloud flex flex-col items-center gap-3 p-6 text-center group animate-pop-in hover:scale-105 transition-transform"
              style={{ animationDelay: `${0.3 + i * 0.07}s` }}
            >
              <div
                className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-4xl transition-transform group-hover:-translate-y-1"
                style={{ background: a.bg, border: `2px solid ${a.color}30` }}
              >
                {a.emoji}
              </div>
              <span className="text-sm font-black tracking-wide" style={{ color: a.color }}>{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID: Mastery + AI Tutor ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Mastery bars */}
        <div className="lg:col-span-2 card-cloud p-8 space-y-6">
          <h2 className="font-black text-[#1A3A5C] flex items-center gap-2 text-xl">
            📊 Subject Mastery
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {MASTERY.map((m) => (
              <div key={m.subject} className="space-y-2">
                <div className="flex justify-between text-sm font-black">
                  <span className="text-[#1A3A5C]">{m.subject}</span>
                  <span style={{ color: m.value > 80 ? "#2ECC71" : "#4A90D9" }}>{m.value}%</span>
                </div>
                <div className="progress-bar-track h-5 relative">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${m.value}%`,
                      background: m.value > 80
                        ? "linear-gradient(90deg, #2ECC71, #27AE60)"
                        : "linear-gradient(90deg, #4A90D9, #2D6DB5)",
                      boxShadow: m.value > 80
                        ? "0 0 8px rgba(46,204,113,0.5)"
                        : "0 0 8px rgba(74,144,217,0.5)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutor CTA */}
        <div className="space-y-6">
          <div
            className="card-cloud p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(74,144,217,0.12), rgba(46,204,113,0.08))" }}
          >
            {/* designer-in-space ambient background */}
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1 }}>
              <RiveAnimation src="/riv-animations/11058-21184-designer-in-space.riv" className="w-full h-full" />
            </div>
            {/* Bot mascot for AI Tutor */}
            <div className="relative z-10 h-32 w-32 mx-auto mb-3">
              <RiveAnimation src="/riv-animations/22673-42423-for-education-purpose.riv" className="w-full h-full" />
            </div>
            <h3 className="relative z-10 text-2xl font-black text-[#1A3A5C] mb-2">Chat with Soma AI</h3>
            <p className="relative z-10 text-sm font-semibold text-[#4A6A8A] mb-5 leading-relaxed">
              Ask anything! Get instant help with any subject.
            </p>
            <Link
              to="/student/tutor"
              id="btn-start-tutor"
              className="btn-play btn-play-primary w-full py-4 text-base font-black flex items-center justify-center gap-2 relative z-10"
            >
              Start Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Badges */}
          <div className="card-cloud p-6 space-y-4">
            <h3 className="text-base font-black text-[#1A3A5C]">🏆 Your Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {STUDENT.badges.map((b, i) => {
                const colors = ["#4A90D9", "#2ECC71", "#FF9500", "#FF6B6B", "#9B59B6"];
                const c = colors[i % colors.length];
                return (
                  <div
                    key={b}
                    className="rounded-2xl p-4 text-center space-y-2"
                    style={{ background: `${c}15`, border: `2px solid ${c}30` }}
                  >
                    <div className="text-3xl">⭐</div>
                    <p className="text-xs font-black text-[#1A3A5C] leading-tight">{b}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}