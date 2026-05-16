import { createFileRoute } from "@tanstack/react-router";
import { Zap, Trophy, Star, TrendingUp, BarChart3, Award } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes — Soma AI" }] }),
  component: Quizzes,
});

const QUIZ_STATS = [
  { label: "Quizzes Taken", val: "24", icon: Star, color: "#4A90D9" },
  { label: "Avg. Score", val: "88%", icon: TrendingUp, color: "#2ECC71" },
  { label: "Badges", val: "12", icon: Award, color: "#FF9500" },
];

const AVAILABLE_QUIZZES: any[] = [];

const MASTERY_SKILLS = [
  { label: "Logic", val: 92, color: "#4A90D9" },
  { label: "Memory", val: 78, color: "#9B59B6" },
  { label: "Speed", val: 84, color: "#FF9500" },
  { label: "Accuracy", val: 96, color: "#2ECC71" },
];

function Quizzes() {
  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <div className="card-cloud p-5 flex items-center gap-4 animate-pop-in">
        <div className="w-12 h-12 shrink-0">
          <RiveAnimation src="/riv-animations/12132-34408-introvert-rock-star.riv" className="w-full h-full" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-[#1A3A5C]">Challenge Zone</h1>
          <p className="text-sm font-bold text-[#4A6A8A]">Test your knowledge and climb the leaderboard!</p>
        </div>
        {/* Stat chips */}
        <div className="hidden md:flex items-center gap-2">
          {QUIZ_STATS.map((s) => (
            <div
              key={s.label}
              className="card-cloud px-4 py-2 flex flex-col items-center"
              style={{ minWidth: 80 }}
            >
              <s.icon className="h-3.5 w-3.5 mb-1" style={{ color: s.color }} />
              <span className="text-lg font-black text-[#1A3A5C]">{s.val}</span>
              <span className="text-[9px] font-black text-[#4A6A8A] uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero challenge card */}
      <div
        className="card-cloud p-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(74,144,217,0.12), rgba(155,89,182,0.08))" }}
      >
        {/* star-game ambient Rive background */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
          <RiveAnimation src="/riv-animations/4731-9566-star-game-beta.riv" className="w-full h-full" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Trophy Rive animation */}
          <div className="w-36 h-36 shrink-0">
            <RiveAnimation src="/riv-animations/27237-51432-click-to-level-up.riv" className="w-full h-full" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-black"
              style={{ background: "rgba(46,204,113,0.15)", color: "#2ECC71", border: "2px solid rgba(46,204,113,0.3)" }}>
              🏆 Next Milestone
            </div>
            <h2 className="text-2xl font-black text-[#1A3A5C]">Weekly Champion Challenge</h2>
            <p className="text-sm font-semibold text-[#4A6A8A] max-w-xl leading-relaxed">
              Compete with students across the country in this week's Biology & Tech fusion quiz.
              Top 10 finishers receive the <strong>Neon Spark</strong> exclusive badge!
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="btn-play btn-play-primary px-8 py-3 text-sm font-black flex items-center gap-2">
                Begin Challenge <Zap className="h-4 w-4" />
              </button>
              <button className="btn-play btn-play-secondary px-6 py-3 text-sm font-black">
                View Rules
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Quiz list */}
        <div className="space-y-4">
          <h3 className="text-base font-black text-[#1A3A5C] flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#4A90D9]" /> Available Assessments
          </h3>

          {AVAILABLE_QUIZZES.length > 0 ? AVAILABLE_QUIZZES.map((q) => (
            <div key={q.id} className="card-cloud p-5">
              <p className="font-black text-[#1A3A5C]">{q.title}</p>
            </div>
          )) : (
            /* loading-books empty state */
            <div className="py-10 text-center rounded-3xl" style={{ background: "rgba(255,255,255,0.6)", border: "2px solid rgba(255,255,255,0.8)" }}>
              <div className="w-44 h-36 mx-auto">
                <RiveAnimation src="/riv-animations/27328-51630-loading-books.riv" className="w-full h-full" />
              </div>
              <h3 className="text-base font-black text-[#1A3A5C]">No quizzes assigned yet</h3>
              <p className="text-sm font-semibold text-[#4A6A8A] max-w-xs mx-auto mt-1">
                Your teacher will assign quizzes when they're ready. Keep studying!
              </p>
            </div>
          )}
        </div>

        {/* Mastery sidebar */}
        <div className="space-y-5">
          <div className="card-cloud p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#1A3A5C]">Your Mastery</h3>
              <BarChart3 className="h-4 w-4 text-[#4A90D9] opacity-60" />
            </div>
            <div className="space-y-3">
              {MASTERY_SKILLS.map((m) => (
                <div key={m.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-[#1A3A5C]">{m.label}</span>
                    <span style={{ color: m.color }}>{m.val}%</span>
                  </div>
                  <div className="progress-bar-track h-4">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${m.val}%`,
                        background: `linear-gradient(90deg, ${m.color}, ${m.color}AA)`,
                        boxShadow: `0 0 8px ${m.color}66`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t-2 border-[#4A90D9]/10 text-center">
              <p className="text-xs font-bold text-[#4A6A8A]">
                You're in the <span className="text-[#4A90D9] font-black">Top 5%</span> in Rwanda this month! 🎉
              </p>
            </div>
          </div>

          {/* Next milestone card */}
          <div className="card-cloud p-5 relative overflow-hidden" style={{ background: "rgba(46,204,113,0.08)" }}>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 opacity-10">
              <RiveAnimation src="/riv-animations/22180-41567-level-up-badges-animation.riv" className="w-full h-full" />
            </div>
            <h4 className="text-xs font-black text-[#2ECC71] uppercase tracking-wide mb-2">Next Milestone</h4>
            <p className="text-sm font-bold text-[#1A3A5C] mb-3">
              Unlock "Grand Master" by completing 3 hard science quizzes.
            </p>
            <div className="progress-bar-track h-4">
              <div className="progress-bar-fill" style={{ width: "66%", background: "linear-gradient(90deg, #2ECC71, #27AE60)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
