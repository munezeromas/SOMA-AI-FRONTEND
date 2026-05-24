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
          <div key={s.label} className="clay-card shadow-clay-puffy p-4 rounded-3xl border-transparent">
            <s.icon className="h-6 w-6 text-[#4A90D9]" />
            <div className="text-3xl font-black mt-2">{s.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="clay-card shadow-clay-puffy p-6 rounded-[2rem] border-transparent">
            <h2 className="font-black text-xs uppercase tracking-widest mb-6 text-muted-foreground">Mastery by student</h2>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <XAxis dataKey="name" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '16px' }}
                    itemStyle={{ color: '#2ECC71', fontWeight: 900 }}
                  />
                  <Bar dataKey="mastery" fill="#2ECC71" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="clay-card shadow-clay-puffy p-6 rounded-[2rem] border-transparent">
            <h2 className="font-black text-sm uppercase tracking-widest mb-4 opacity-60">Recent activity</h2>
            <ul className="text-sm space-y-3">
              {[
                { icon: "📘", text: "Amani completed 'Fractions' lesson", time: "2m ago" },
                { icon: "🎮", text: "Hope earned 3 stars on Math Bubble Pop", time: "15m ago" },
                { icon: "⚠️", text: "Bosco hasn't logged in for 2 days", time: "6h ago", risk: true },
                { icon: "✅", text: "Claudine submitted reading log", time: "1d ago" },
              ].map((act, i) => (
                <li key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-[#4A90D9]/20 hover:bg-muted/50 transition-all shadow-sm">
                  <span className="text-2xl">{act.icon}</span>
                  <div className="flex-1">
                    <p className={`font-black text-sm ${act.risk ? 'text-[#E74C3C]' : ''}`}>{act.text}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black">{act.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/teacher/students" className="mt-4 flex items-center justify-center w-full py-3 rounded-2xl bg-muted/30 text-xs text-[#4A90D9] font-black uppercase tracking-widest hover:bg-muted/50 transition-colors">View all students →</Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="clay-card shadow-clay-puffy p-6 rounded-[2rem] border-transparent">
            <h2 className="font-black text-xs uppercase tracking-widest mb-4 text-muted-foreground">Teacher's Guides</h2>
            <div className="space-y-3">
              {teachersGuides.map(guide => (
                <a key={guide.id} href={guide.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-[#4A90D9]/20 transition-all group shadow-sm">
                  <div className="h-12 w-12 rounded-xl bg-[#4A90D9]/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-[#4A90D9]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black truncate">{guide.title}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">{guide.grade} · {guide.subject}</p>
                  </div>
                  <Download className="h-5 w-5 text-muted-foreground/40 group-hover:text-[#4A90D9] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#4A90D9] to-[#2D6DB5] p-8 text-white overflow-hidden relative group shadow-clay-puffy">
             <Sparkles className="absolute -top-4 -right-4 h-32 w-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-black mb-3 relative z-10 flex items-center gap-2"><Sparkles className="h-6 w-6"/> AI Insights</h3>
             <p className="text-sm font-medium opacity-90 leading-relaxed mb-6 relative z-10">
               Your class is excelling in Mathematics but struggling with English comprehension. Soma AI suggests focusing on descriptive adjectives this week.
             </p>
             <button className="w-full py-4 rounded-2xl bg-white text-[#4A90D9] text-xs font-black uppercase tracking-widest shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all relative z-10">
               Generate Report
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}