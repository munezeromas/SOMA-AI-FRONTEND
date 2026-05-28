import { createFileRoute, Link } from "@tanstack/react-router";
import { CLASS_STUDENTS, ASSIGNMENTS, CLASSES, STAFF_MEMBERS } from "@/lib/mock-data";
import { LIBRARY_BOOKS } from "@/lib/library-data";
import { useTheme } from "@/lib/theme-context";
import {
  Users, AlertTriangle, TrendingUp, Activity,
  BookOpen, Download, Sparkles, Star, Target, ShieldAlert,
  FileText, Briefcase, GraduationCap, Clock
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — Soma AI" }] }),
  component: TeacherDash,
});

const ACTIVITY = [
  { icon: "📘", text: "Amani completed 'Fractions' lesson", time: "2m ago", risk: false },
  { icon: "🎮", text: "Hope earned 3 stars on Math Bubble Pop", time: "15m ago", risk: false },
  { icon: "⚠️", text: "Bosco hasn't logged in for 2 days", time: "6h ago", risk: true },
  { icon: "✅", text: "Claudine submitted reading log", time: "1d ago", risk: false },
];

function TeacherDash() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textPrimary = isDark ? "#F8FAFC" : "#0F172A";
  const textMuted   = isDark ? "#94A3B8" : "#64748B";
  const cardBorder  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const avg     = Math.round(CLASS_STUDENTS.reduce((s, x) => s + x.mastery, 0) / CLASS_STUDENTS.length);
  const atRisk  = CLASS_STUDENTS.filter(s => s.risk !== "low").length;
  const activeToday = 19;
  const chartData = CLASS_STUDENTS.map(s => ({ name: s.name.split(" ")[0], mastery: s.mastery }));
  const teachersGuides = LIBRARY_BOOKS.filter(b => b.type === "TG");

  // Top-performing students for the "podium" cards
  const topStudents = [...CLASS_STUDENTS]
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 3)
    .map((s, i) => ({
      ...s,
      rank: ["1st", "2nd", "3rd"][i],
      color: ["from-[#10B981] to-[#059669]", "from-[#6366F1] to-[#4F46E5]", "from-[#F59E0B] to-[#D97706]"][i],
    }));

  const STATS = [
    { label: "Students",    value: CLASS_STUDENTS.length, icon: Users,          color: "#3B82F6", bg: "rgba(59,130,246,0.15)",  to: "/teacher/students" },
    { label: "Avg Mastery", value: `${avg}%`,             icon: TrendingUp,     color: "#10B981", bg: "rgba(16,185,129,0.15)",  to: "/teacher/reports" },
    { label: "At-Risk",     value: atRisk,                icon: ShieldAlert,    color: "#EF4444", bg: "rgba(239,68,68,0.15)", to: "/teacher/alerts" },
    { label: "Active Today",value: activeToday,           icon: Activity,       color: "#F59E0B", bg: "rgba(245,158,11,0.15)",  to: "/teacher/students" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in main-content-padding">

      {/* ── HERO BANNER ── */}
      <div
        className="relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 shadow-xl hover-glow"
        style={{
          background: "linear-gradient(135deg, #059669, #10B981, #34D399)",
          minHeight: "220px"
        }}
      >
        <div className="absolute inset-0 bg-[url('/images/student-hero.png')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/20 rounded-full filter blur-[80px] animate-pulse-glow" />
        
        <div className="relative z-10 flex-1 space-y-3">
          <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2">
            <Target className="w-4 h-4" /> Class Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Good morning, <br /> <span className="text-yellow-300">Mrs. Mukamana 👋</span>
          </h1>
          <p className="text-white/90 font-bold text-sm bg-black/20 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10 mt-2">
            P6 — {CLASS_STUDENTS.length} students · Term 2 Active
          </p>
        </div>
      </div>

      {/* ── TOP STATS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              to={s.to}
              className="pro-card pro-card-hover glass-panel relative overflow-hidden flex flex-col hover-glow group"
              style={{ padding: "1.5rem", textDecoration: "none", animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                  style={{ background: s.bg, border: `1px solid ${s.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70" style={{ color: textMuted }}>{s.label}</p>
                  <p className="text-3xl font-black" style={{ color: textPrimary }}>{s.value}</p>
                </div>
              </div>
              <div 
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full filter blur-[30px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: s.color }}
              />
            </Link>
          );
        })}
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="rounded-[2rem] bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full filter blur-[60px]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2 drop-shadow-md">
            <Sparkles className="w-6 h-6" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/teacher/assignments-management"
              className="rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 transition-all hover:shadow-lg text-center cursor-pointer border border-white/20 group hover:-translate-y-1 no-underline"
            >
              <FileText className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <p className="font-bold text-sm">Create Assignment</p>
              <p className="text-xs opacity-75 mt-1">{ASSIGNMENTS.length} active</p>
            </Link>
            <Link
              to="/teacher/classes-management"
              className="rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 transition-all hover:shadow-lg text-center cursor-pointer border border-white/20 group hover:-translate-y-1 no-underline"
            >
              <GraduationCap className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <p className="font-bold text-sm">Manage Classes</p>
              <p className="text-xs opacity-75 mt-1">{CLASSES.length} sections</p>
            </Link>
            <Link
              to="/teacher/staff"
              className="rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 transition-all hover:shadow-lg text-center cursor-pointer border border-white/20 group hover:-translate-y-1 no-underline"
            >
              <Briefcase className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <p className="font-bold text-sm">Staff Management</p>
              <p className="text-xs opacity-75 mt-1">{STAFF_MEMBERS.length} members</p>
            </Link>
            <Link
              to="/teacher/students"
              className="rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 transition-all hover:shadow-lg text-center cursor-pointer border border-white/20 group hover:-translate-y-1 no-underline"
            >
              <Users className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 transition-transform" />
              <p className="font-bold text-sm">View Students</p>
              <p className="text-xs opacity-75 mt-1">{CLASS_STUDENTS.length} enrolled</p>
            </Link>
          </div>
        </div>
      </div>

      {/* ── MIDDLE ROW ── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Mastery Chart */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-[50px]" />
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Mastery by Student
            </h2>
            <span className="text-[9px] font-black uppercase tracking-widest opacity-60" style={{ color: textMuted }}>% Score</span>
          </div>
          <div className="h-64 relative z-10">
            <ResponsiveContainer>
              <BarChart data={chartData} barSize={24} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.08} vertical={false} />
                <XAxis dataKey="name" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} tick={{ fill: textMuted }} />
                <YAxis fontSize={10} fontWeight={800} axisLine={false} tickLine={false} tick={{ fill: textMuted }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: isDark ? "rgba(10,11,30,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", border: `1px solid ${cardBorder}`, borderRadius: "14px", fontSize: "12px", fontWeight: 700 }}
                  cursor={{ fill: "rgba(16,185,129,0.05)" }}
                />
                <Bar dataKey="mastery" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="rgba(16,185,129,0.2)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden flex flex-col">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-[40px]" />
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" /> Recent Activity
            </h2>
            <Link to="/teacher/students" className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors" style={{ border: "1px solid rgba(16,185,129,0.4)", color: "#10B981", textDecoration: "none" }}>
              View All
            </Link>
          </div>
          <div className="space-y-3 relative z-10 flex-1 overflow-y-auto pr-1">
            {ACTIVITY.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: isDark ? "rgba(255,255,255,0.03)" : "#FFFFFF", border: `1px solid ${cardBorder}`, boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl bg-black/5 dark:bg-white/5">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-sm truncate ${act.risk ? "text-red-500" : ""}`} style={act.risk ? {} : { color: textPrimary }}>{act.text}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-70" style={{ color: textMuted }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Top Students Podium */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" /> Top Students
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 relative z-10">
            {topStudents.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 flex flex-col items-center text-center text-white bg-gradient-to-br ${s.color} relative overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group`}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500 delay-75" />
                
                <div className="w-12 h-12 rounded-full bg-white/20 mb-3 flex items-center justify-center font-black text-xl border border-white/30 relative z-10 shadow-sm backdrop-blur-md">
                  {s.name.charAt(0)}
                </div>
                <p className="font-black text-sm leading-tight mb-1 relative z-10 truncate w-full text-center">{s.name.split(" ")[0]}</p>
                
                <p className="font-black text-2xl relative z-10 my-2 drop-shadow-sm">{s.mastery}%</p>
                <p className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full relative z-10 backdrop-blur-sm border border-white/10">{s.rank}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher's Guides + AI Insights */}
        <div className="flex flex-col gap-6">
          
          {/* AI Insights */}
          <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 p-6 text-white relative overflow-hidden group shadow-xl hover-glow flex-1 flex flex-col justify-center">
            <div className="absolute top-[-20%] right-[-10%] w-[180px] h-[180px] bg-white/15 rounded-full filter blur-[40px] animate-pulse-glow" />
            <Sparkles className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-xl font-black mb-3 relative z-10 flex items-center gap-2 drop-shadow-md">
              <Sparkles className="h-6 w-6" /> Soma AI Insights
            </h3>
            <p className="text-sm font-semibold opacity-90 leading-relaxed mb-6 relative z-10">
              Your class excels in <strong className="text-yellow-300">Mathematics</strong> but struggles with <strong className="text-red-300">English comprehension</strong>. Soma AI suggests focusing on descriptive adjectives this week.
            </p>
            <button className="w-full py-3.5 rounded-xl bg-white text-indigo-700 text-xs font-black uppercase tracking-widest shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all relative z-10">
              Generate Lesson Plan
            </button>
          </div>

          {/* Teacher's Guides */}
          <div className="pro-card glass-panel hover-glow p-6 flex-1 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-[30px]" />
            <div className="section-header mb-4 relative z-10">
              <h2 className="section-title flex items-center gap-2">
                 <BookOpen className="w-4 h-4 text-amber-500" /> Teaching Resources
              </h2>
            </div>
            <div className="space-y-3 relative z-10">
              {teachersGuides.slice(0, 2).map(guide => (
                <a
                  key={guide.id}
                  href={guide.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl transition-all hover:scale-[1.02] group"
                  style={{ background: isDark ? "rgba(255,255,255,0.03)" : "#FFFFFF", border: `1px solid ${cardBorder}`, textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <BookOpen className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate group-hover:text-amber-500 transition-colors" style={{ color: textPrimary }}>{guide.title}</p>
                    <p className="text-[10px] font-bold uppercase mt-1 opacity-70" style={{ color: textMuted }}>{guide.grade} · {guide.subject}</p>
                  </div>
                  <Download className="h-5 w-5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-amber-500 transition-all" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}