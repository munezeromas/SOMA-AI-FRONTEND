import { createFileRoute, Link } from "@tanstack/react-router";
import { STUDENT, QUOTES, MASTERY } from "@/lib/mock-data";
import {
  Zap, TrendingUp, Brain, BookOpen, ArrowRight,
  MessageCircle, Youtube, Gamepad2, Calendar, Sparkles, Star
} from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";
import girlsLearning from "../37 Powerful Images of Girls Learning Around the World.jpg";
import kpsImage from "../kps.jpg";

export const Route = createFileRoute("/student/")(  {
  head: () => ({ meta: [{ title: "Dashboard — Soma AI" }] }),
  component: Dashboard,
});

const QUICK_LINKS = [
  { to: "/student/tutor",   label: "AI Tutor",    icon: MessageCircle, color: "#00C36B", glow: "rgba(0,195,107,0.3)" },
  { to: "/student/videos",  label: "Videos",      icon: Youtube,       color: "#6366F1", glow: "rgba(99,102,241,0.3)" },
  { to: "/student/games",   label: "Games",       icon: Gamepad2,      color: "#F97316", glow: "rgba(249,115,22,0.3)" },
  { to: "/student/planner", label: "Planner",     icon: Calendar,      color: "#FACC15", glow: "rgba(234,179,8,0.3)" },
];

function Dashboard() {
  const quote = QUOTES[new Date().getDay() % QUOTES.length];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl">

      {/* ── HERO GREETING ──────────────────────────────────── */}
      <div className="relative rounded-[40px] overflow-hidden p-10 min-h-[280px] flex flex-col justify-center group"
           style={{ background: "linear-gradient(135deg, #0D1424 0%, #080C14 100%)", border: "1px solid rgba(255,255,255,0.05)" }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <RiveAnimation src="/riv-animations/413-3213-chill-study-time.riv" className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full pointer-events-none opacity-20 blur-[100px] animate-pulse"
             style={{ background: "radial-gradient(circle, #00C36B 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full pointer-events-none opacity-10 blur-[80px]"
             style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }} />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
               <Sparkles className="h-3 w-3 text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">Personalized Mentor Active</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
               Good day, <br />
               <span className="text-primary italic">{STUDENT.name}</span>
            </h1>
            <p className="text-lg text-white/50 font-medium leading-relaxed max-w-sm italic">
               "{quote}"
            </p>
          </div>

          <div className="relative flex justify-center items-center">
             <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                {[
                  { label: "Day Streak", value: STUDENT.streak, unit: "Days", icon: Zap, color: "#FACC15" },
                  { label: "Mastery", value: "92%", unit: "Avg", icon: Star, color: "#00C36B" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-[32px] glass space-y-4 hover:scale-105 transition-all duration-500 border-white/5 bg-[#0A1020]/40 backdrop-blur-md">
                    <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white/40">
                      <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white leading-none">{stat.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* ── QUICK LAUNCH ───────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {QUICK_LINKS.map(l => (
          <Link key={l.to} to={l.to}
            className="group flex flex-col items-center gap-4 p-6 rounded-[32px] transition-all hover:-translate-y-2 relative overflow-hidden bg-[#0A1020] border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center relative transition-transform group-hover:scale-110"
                 style={{ background: `${l.glow}20`, border: `1px solid ${l.glow}40` }}>
              <l.icon className="h-7 w-7" style={{ color: l.color }} />
              <div className="absolute inset-0 blur-xl opacity-50 transition-opacity group-hover:opacity-100" style={{ background: l.color }} />
            </div>
            <span className="text-sm font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">{l.label}</span>
          </Link>
        ))}
      </div>


      {/* ── MAIN GRID ──────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left: Course cards + Mastery */}
        <div className="lg:col-span-2 space-y-6">

          {/* Course cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { img: kpsImage,       icon: Brain,     title: "Mathematical Patterns",  desc: "Algebraic fractions and geometric logic", link: "/student/videos?filter=Math" },
              { img: girlsLearning,  icon: BookOpen,  title: "Linguistic Logic",        desc: "Advanced narrative structures and syntax", link: "/student/videos?filter=English" },
            ].map(card => (
              <Link to={card.link} key={card.title}
                className="relative rounded-3xl overflow-hidden h-64 flex flex-col hover:-translate-y-1 transition-all duration-500 group"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <img src={card.img} className="absolute inset-0 h-full w-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-60 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-3/4" style={{ background: "linear-gradient(to top, rgba(8,12,20,0.95) 0%, transparent 100%)" }} />
                <div className="relative z-10 flex-1 flex flex-col justify-end p-6 space-y-2">
                  <div className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">{card.title}</h3>
                  <p className="text-xs text-white/60 font-medium">{card.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest" style={{ color: "#00C36B" }}>
                    Start <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mastery bars */}
          <div className="rounded-3xl p-6 space-y-5" style={{ background: "#0E1524", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: "#7B8DB0" }}>Subject Mastery</h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {MASTERY.map(m => (
                <div key={m.subject} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-white">{m.subject}</span>
                    <span style={{ color: m.value > 80 ? "#00C36B" : "#818CF8" }}>{m.value}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${m.value}%`,
                        background: m.value > 80
                          ? "linear-gradient(90deg, #00C36B, #00FF94)"
                          : "linear-gradient(90deg, #6366F1, #818CF8)",
                        boxShadow: m.value > 80 ? "0 0 8px rgba(0,195,107,0.5)" : "0 0 8px rgba(99,102,241,0.5)"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Tutor CTA + Badges */}
        <div className="space-y-6">
          {/* Tutor CTA */}
          <div className="rounded-3xl p-6 relative overflow-hidden"
               style={{ background: "linear-gradient(135deg, #00C36B15 0%, #00956E08 100%)", border: "1px solid rgba(0,195,107,0.2)" }}>
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full"
                 style={{ background: "radial-gradient(circle, rgba(0,195,107,0.12) 0%, transparent 70%)" }} />
            <div className="relative z-10 space-y-3">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center"
                   style={{ background: "rgba(0,195,107,0.15)", border: "1px solid rgba(0,195,107,0.3)" }}>
                <MessageCircle className="h-6 w-6" style={{ color: "#00C36B" }} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Chat with <br />Soma AI</h3>
              <p className="text-xs font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Get instant help with any subject, grammar tips, and personalized explanations.
              </p>
              <Link to="/student/tutor"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-black text-white transition-all hover:scale-[1.02] active:scale-95 mt-2"
                style={{ background: "linear-gradient(135deg, #00C36B, #00956E)", boxShadow: "0 0 20px rgba(0,195,107,0.25)" }}>
                Start Session <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-3xl p-6 space-y-4" style={{ background: "#0E1524", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: "#7B8DB0" }}>Your Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {STUDENT.badges.map((b, i) => {
                const colors = ["#00C36B","#6366F1","#F97316","#FACC15"];
                const c = colors[i % colors.length];
                return (
                  <div key={b} className="rounded-2xl p-3 text-center space-y-1"
                       style={{ background: `${c}10`, border: `1px solid ${c}25` }}>
                    <div className="text-xl">⭐</div>
                    <p className="text-[10px] font-black text-white leading-tight">{b}</p>
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