import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, PlayCircle, Trophy, Users, Zap, CheckCircle2 } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";
import { useTheme } from "@/lib/theme-context";

export const Route = createFileRoute("/student/homework")({
  head: () => ({ meta: [{ title: "Homework — Soma AI" }] }),
  component: Homework,
});

const HOMEWORK: any[] = [];

function Homework() {
  const [filter, setFilter] = useState("all");
  const filtered = HOMEWORK.filter(h => filter === "all" || h.status === filter);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textPrimary = isDark ? "#F8FAFC" : "#0F172A";
  const textMuted   = isDark ? "#94A3B8" : "#64748B";

  return (
    <div className="space-y-6 max-w-7xl animate-fade-in main-content-padding pb-20">
      
      {/* ── HERO HEADER ── */}
      <div className="pro-card glass-panel hover-glow p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-amber-500/20 rounded-full filter blur-[80px] animate-pulse-glow" />
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(251,191,36,0.1))", border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)" }}>
            <RiveAnimation src="/riv-animations/21441-40283-students-tools-notebook-pencil.riv" className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-black mb-1" style={{ color: textPrimary }}>Your Homework</h1>
            <p className="text-sm font-bold opacity-70" style={{ color: textMuted }}>Complete assignments to earn XP and unlock badges!</p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl relative z-10 shrink-0" style={{ background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)", border: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)" }}>
          {["all", "assigned", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
              style={{
                background: filter === f ? "#F59E0B" : "transparent",
                color: filter === f ? "white" : textMuted,
                boxShadow: filter === f ? "0 4px 12px rgba(245,158,11,0.4)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── HOMEWORK LIST ── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filtered.length > 0 ? filtered.map((h) => (
          <div key={h.id} className="pro-card glass-panel hover-glow p-6">
            <h3 className="font-black text-lg" style={{ color: textPrimary }}>{h.title}</h3>
          </div>
        )) : (
          /* Empty state */
          <div className="col-span-full py-16 text-center space-y-4 pro-card glass-panel flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-40 h-40">
              <RiveAnimation src="/riv-animations/3352-7042-bluey-idle-animation.riv" className="w-full h-full opacity-80" />
            </div>
            <h3 className="text-2xl font-black" style={{ color: textPrimary }}>All clear! 🎉</h3>
            <p className="text-sm font-bold max-w-sm mx-auto opacity-70 leading-relaxed" style={{ color: textMuted }}>
              You have no pending homework. When your teacher assigns work, it'll appear right here!
            </p>
          </div>
        )}
      </div>

      {/* ── FEATURED EXERCISE ── */}
      <div
        className="pro-card glass-panel hover-glow p-8 md:p-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('/images/island-math.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full filter blur-[80px]" />
        
        {/* title-animation Rive */}
        <div className="absolute top-0 left-0 w-full h-12 pointer-events-none opacity-20 hidden md:block">
          <RiveAnimation src="/riv-animations/26380-49366-title-animation.riv" className="w-full h-full" />
        </div>

        <div className="relative z-10 grid md:grid-cols-[1fr_300px] gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
              style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}>
              <Zap className="h-3 w-3 animate-pulse" /> Exercise of the Week
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: textPrimary }}>Interactive Science Lab</h2>
            
            <p className="text-sm md:text-base font-medium leading-relaxed max-w-lg opacity-80" style={{ color: textPrimary }}>
              Step into our virtual laboratory to explore the human digestive system.
              Complete all experiments this week to unlock the exclusive <strong className="text-emerald-500">Master Scientist</strong> badge!
            </p>
            
            <div className="pt-2">
              <button className="pro-btn group" style={{ background: "#10B981", color: "#FFF", borderRadius: "999px", padding: "12px 32px" }}>
                Enter Lab <PlayCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-4">
            {[
              { label: "Completion Rate", val: "85%", icon: Trophy, color: "#F59E0B" },
              { label: "Active Students", val: "1.2k", icon: Users, color: "#3B82F6" },
              { label: "Avg. Duration", val: "15 min", icon: Clock, color: "#10B981" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-4 flex items-center gap-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{ background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.7)", border: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                  <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-0.5" style={{ color: textMuted }}>{stat.label}</p>
                  <p className="text-lg font-black" style={{ color: textPrimary }}>{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
