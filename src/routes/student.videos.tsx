import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { VIDEOS, SUBJECTS } from "@/lib/mock-data";
import { Play, X, Star, Search } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/videos")({
  head: () => ({ meta: [{ title: "Videos — Soma AI" }] }),
  component: Videos,
});

const LEVELS = ["All", "P1", "P2", "P3", "P4", "P5", "P6"];

function Videos() {
  const [filter, setFilter] = useState<string>("All");
  const [level, setLevel] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<string | null>(null);

  const list = VIDEOS.filter((v) => {
    const subjectMatch = filter === "All" || v.subject === filter;
    const levelMatch = level === "All" || (v as any).level === level;
    const searchMatch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.subject.toLowerCase().includes(search.toLowerCase());
    return subjectMatch && levelMatch && searchMatch;
  });

  return (
    <div className="space-y-8 max-w-7xl animate-fade-in pb-20 relative">
      <div className="absolute right-0 -top-20 h-80 w-80 hidden lg:block opacity-30 pointer-events-none z-0">
          <RiveAnimation src="/riv-animations/24331-45439-solar-system.riv" className="w-full h-full" />
      </div>

      <div className="space-y-1 relative z-10">
        <h1 className="text-5xl font-black tracking-tight text-white">Global <span style={{ color: "#00C36B" }}>Library</span></h1>
        <p className="text-xs font-black uppercase tracking-widest opacity-60 text-white">Curated Educational Video Modules</p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#7B8DB0" }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search videos, subjects..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-semibold text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#00C36B] transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...SUBJECTS].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300"
            style={{
              background: filter === s ? "#00C36B" : "rgba(255,255,255,0.05)",
              color: filter === s ? "#fff" : "rgba(255,255,255,0.5)",
              border: `1px solid ${filter === s ? "#00C36B" : "rgba(255,255,255,0.08)"}`
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-black uppercase tracking-widest mr-1" style={{ color: "#7B8DB0" }}>Grade:</span>
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className="px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all duration-300"
            style={{
              background: level === l ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
              color: level === l ? "#fff" : "rgba(255,255,255,0.4)",
              border: `1px solid ${level === l ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`
            }}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {list.map((v) => {
          const meta = v as any;
          return (
            <button key={v.id} onClick={() => setOpen(v.id)} className="text-left rounded-3xl overflow-hidden bg-white hover:bg-gray-50 transition-all duration-500 hover:-translate-y-2 group border border-gray-100 shadow-sm">
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-2 border-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Subject tag */}
                <div className="absolute top-3 left-3"><div className="px-3 py-1 rounded-lg bg-black/30 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white">{v.subject}</div></div>
                {/* Duration */}
                {meta.duration && <div className="absolute bottom-3 right-3"><div className="px-2 py-1 rounded bg-black/60 text-[10px] font-bold text-white">{meta.duration}</div></div>}
                {/* Teacher Recommended Badge */}
                {meta.teacherRecommended && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400/90 backdrop-blur-md shadow-md">
                      <Star className="h-3 w-3 text-white fill-white" />
                      <span className="text-[9px] font-black text-white uppercase tracking-wide">Teacher Pick</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {meta.level && <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wide">{meta.level}</span>}
                </div>
                <div className="font-black text-lg leading-tight text-[#0F172A] group-hover:text-primary transition-colors">{v.title}</div>
                <p className="text-[10px] text-[#64748B] mt-2 font-bold uppercase tracking-wider opacity-60">{v.subject} · {meta.duration || "12m"}</p>
              </div>
            </button>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button className="absolute top-4 right-4 text-white" aria-label="Close"><X className="h-8 w-8" /></button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://www.youtube.com/embed/${open}?autoplay=1`} className="w-full h-full rounded-2xl" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
