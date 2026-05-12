import { createFileRoute, Link } from "@tanstack/react-router";
import { CLASS_STUDENTS } from "@/lib/mock-data";
import { LIBRARY_BOOKS } from "@/lib/library-data";
import { Users, AlertTriangle, TrendingUp, Activity, BookOpen, Download, Sparkles } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — Soma AI" }] }),
  component: TeacherDash,
});

function TeacherDash() {
  const avg = Math.round(CLASS_STUDENTS.reduce((s, x) => s + x.mastery, 0) / CLASS_STUDENTS.length);
  const atRisk = CLASS_STUDENTS.filter(s => s.risk !== "low").length;
  const data = CLASS_STUDENTS.map(s => ({ name: s.name.split(" ")[0], mastery: s.mastery }));
  
  const teachersGuides = LIBRARY_BOOKS.filter(b => b.type === "TG");

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Class Overview</h1>
          <p className="text-muted-foreground">P6 — 28 students</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-black flex items-center gap-2">
            <Activity className="h-4 w-4" /> Term 2 Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Students", value: CLASS_STUDENTS.length },
          { icon: TrendingUp, label: "Avg mastery", value: `${avg}%` },
          { icon: AlertTriangle, label: "At-risk", value: atRisk },
          { icon: Activity, label: "Active today", value: 19 },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-4">
            <s.icon className="h-5 w-5 text-primary" />
            <div className="text-2xl font-bold mt-2">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-black">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-black text-sm uppercase tracking-widest mb-6 opacity-60">Mastery by student</h2>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <XAxis dataKey="name" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: '#0A1020', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                    itemStyle={{ color: '#00C36B', fontWeight: 900 }}
                  />
                  <Bar dataKey="mastery" fill="#00C36B" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-black text-sm uppercase tracking-widest mb-4 opacity-60">Recent activity</h2>
            <ul className="text-sm space-y-3">
              {[
                { icon: "📘", text: "Amani completed 'Fractions' lesson", time: "2m ago" },
                { icon: "🎮", text: "Hope earned 3 stars on Math Bubble Pop", time: "15m ago" },
                { icon: "⚠️", text: "Bosco hasn't logged in for 2 days", time: "6h ago", risk: true },
                { icon: "✅", text: "Claudine submitted reading log", time: "1d ago" },
              ].map((act, i) => (
                <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                  <span className="text-xl">{act.icon}</span>
                  <div className="flex-1">
                    <p className={`font-semibold ${act.risk ? 'text-red-400' : 'text-white'}`}>{act.text}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">{act.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/teacher/students" className="mt-4 flex items-center justify-center w-full py-3 rounded-xl bg-white/5 text-xs text-primary font-black uppercase tracking-widest hover:bg-white/10 transition-colors">View all students →</Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-black text-sm uppercase tracking-widest mb-4 opacity-60">Teacher's Guides</h2>
            <div className="space-y-3">
              {teachersGuides.map(guide => (
                <a key={guide.id} href={guide.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-white truncate uppercase">{guide.title}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">{guide.grade} · {guide.subject}</p>
                  </div>
                  <Download className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white overflow-hidden relative group">
             <Sparkles className="absolute top-2 right-2 h-20 w-20 text-white/10 -rotate-12 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-black mb-2 relative z-10">AI Insights</h3>
             <p className="text-xs font-medium opacity-90 leading-relaxed mb-4 relative z-10">
               Your class is excelling in Mathematics but struggling with English comprehension. Soma AI suggests focusing on descriptive adjectives this week.
             </p>
             <button className="w-full py-3 rounded-xl bg-white text-primary text-xs font-black uppercase tracking-widest hover:shadow-lg transition-all relative z-10">
               Generate Report
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}