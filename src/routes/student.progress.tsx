import { createFileRoute } from "@tanstack/react-router";
import { PROGRESS_DATA, MASTERY, STUDENT } from "@/lib/mock-data";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, CartesianGrid
} from "recharts";
import { Trophy, Flame, Zap, Star, TrendingUp, Award, Target } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export const Route = createFileRoute("/student/progress")({
  head: () => ({ meta: [{ title: "Progress — Soma AI" }] }),
  component: Progress,
});

const XP_DATA = [
  { d: "Mon", xp: 120 },
  { d: "Tue", xp: 200 },
  { d: "Wed", xp: 80 },
  { d: "Thu", xp: 240 },
  { d: "Fri", xp: 300 },
  { d: "Sat", xp: 180 },
  { d: "Sun", xp: 140 },
];

const BADGES = [
  { emoji: "🏆", name: "Top Scorer", color: "#F59E0B" },
  { emoji: "🔥", name: "7-Day Streak", color: "#EF4444" },
  { emoji: "⚡", name: "Speed Reader", color: "#8B5CF6" },
  { emoji: "🌟", name: "Quiz Master", color: "#10B981" },
  { emoji: "🎯", name: "Bullseye", color: "#3B82F6" },
  { emoji: "🚀", name: "Rocket Start", color: "#F97316" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="pro-card p-3 text-xs font-bold shadow-lg" style={{ minWidth: 120 }}>
        <p className="mb-1 font-extrabold" style={{ color: "var(--foreground)" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-black">{p.value}{typeof p.value === "number" && p.name === "xp" ? " XP" : "%"}</span></p>
        ))}
      </div>
    );
  }
  return null;
}

function Progress() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textPrimary = isDark ? "#F8FAFC" : "#0F172A";
  const textMuted = isDark ? "#94A3B8" : "#64748B";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  const xpPercent = Math.round((STUDENT.xp / 2000) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in main-content-padding">

      {/* ── PAGE HEADER ── */}
      <div className="pro-card glass-panel p-6 relative overflow-hidden hover-glow">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-[50px] animate-pulse-glow" />
        <div className="absolute -bottom-8 left-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-[40px]" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" style={{ color: "var(--primary)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>Your Journey</span>
            </div>
            <h1 className="text-3xl font-black" style={{ color: textPrimary }}>Learning Progress</h1>
            <p className="text-sm font-medium mt-1" style={{ color: textMuted }}>Look how far you've come — keep going! 🚀</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="pro-badge text-xs" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>
              <Star className="w-3 h-3" /> Level 5 Scholar
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Streak */}
        <div className="pro-card glass-panel hover-glow p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, transparent, #EF4444, transparent)" }} />
          <div className="flex items-center gap-4 mt-1">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-float-gentle" style={{ background: "rgba(239,68,68,0.15)", boxShadow: "0 0 15px rgba(239,68,68,0.2)" }}>
              <Flame className="w-6 h-6" style={{ color: "#EF4444" }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: textMuted }}>Day Streak</p>
              <p className="text-3xl font-black" style={{ color: textPrimary }}>{STUDENT.streak}</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="pro-card glass-panel hover-glow p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, transparent, #10B981, transparent)" }} />
          <div className="flex items-center gap-4 mt-1">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-float-gentle" style={{ background: "rgba(16,185,129,0.15)", boxShadow: "0 0 15px rgba(16,185,129,0.2)", animationDelay: "0.5s" }}>
              <Trophy className="w-6 h-6" style={{ color: "#10B981" }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: textMuted }}>Badges Earned</p>
              <p className="text-3xl font-black" style={{ color: textPrimary }}>{STUDENT.badges.length}</p>
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="pro-card glass-panel hover-glow p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)" }} />
          <div className="flex items-center gap-4 mt-1">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-float-gentle" style={{ background: "rgba(139,92,246,0.15)", boxShadow: "0 0 15px rgba(139,92,246,0.2)", animationDelay: "1s" }}>
              <Zap className="w-6 h-6" style={{ color: "#8B5CF6" }} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: textMuted }}>XP to Next Level</p>
              <p className="text-2xl font-black" style={{ color: textPrimary }}>{STUDENT.xp}<span className="text-sm font-bold" style={{ color: textMuted }}>/2000</span></p>
              <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${xpPercent}%`, background: "linear-gradient(90deg, #8B5CF6, #6366F1)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly improvement */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-[40px]" />
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: "var(--primary)" }} />
              Weekly Improvement
            </h2>
          </div>
          <div className="h-56 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="week" tick={{ fontSize: 10, fontWeight: 700, fill: textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: textMuted }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="math" stroke="#6366F1" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="english" stroke="#10B981" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="science" stroke="#F59E0B" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 justify-center relative z-10">
            {[{ label: "Math", color: "#6366F1" }, { label: "English", color: "#10B981" }, { label: "Science", color: "#F59E0B" }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="text-xs font-bold" style={{ color: textMuted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject mastery */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-[40px]" />
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title flex items-center gap-2">
              <Target className="w-4 h-4" style={{ color: "#10B981" }} />
              Subject Mastery
            </h2>
          </div>
          <div className="h-56 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={MASTERY}>
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: textMuted }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: textMuted }} />
                <Radar dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── XP BAR CHART ── */}
      <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
        <div className="absolute -top-10 right-20 w-40 h-40 bg-violet-500/10 rounded-full filter blur-[50px]" />
        <div className="section-header mb-6 relative z-10">
          <h2 className="section-title flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: "#8B5CF6" }} />
            XP Earned This Week
          </h2>
          <div className="pro-badge" style={{ background: "rgba(139,92,246,0.15)", color: "#8B5CF6" }}>
            +1,260 XP total
          </div>
        </div>
        <div className="h-52 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={XP_DATA} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 11, fontWeight: 700, fill: textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: textMuted }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="xp" name="xp" fill="url(#xpGrad)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── BADGES ── */}
      <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
        <div className="section-header mb-6">
          <h2 className="section-title flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: "#F59E0B" }} />
            Your Badges
          </h2>
          <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{BADGES.length} earned</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {BADGES.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ background: `${b.color}12`, border: `1px solid ${b.color}25` }}
            >
              <span className="text-3xl animate-float-gentle" style={{ animationDelay: `${i * 0.2}s` }}>{b.emoji}</span>
              <span className="text-[10px] font-black text-center leading-tight" style={{ color: b.color }}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}