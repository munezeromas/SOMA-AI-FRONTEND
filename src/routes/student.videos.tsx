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
    <div className="space-y-6 max-w-7xl pb-20">
      <div className="card-cloud p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pop-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 shrink-0">
            <RiveAnimation src="/riv-animations/24657-46067-medura-an-interactive-anatomy-experience.riv" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1A3A5C]">Video Library</h1>
            <p className="text-sm font-bold text-[#4A6A8A]">Curated educational video lessons</p>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A6A8A]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search videos, subjects..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
          style={{ background: "rgba(255,255,255,0.9)", color: "#1A3A5C" }}
        />
      </div>

      {/* Subject filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...SUBJECTS].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-4 py-2 rounded-2xl text-xs font-black transition-all duration-200"
            style={{
              background: filter === s ? "#4A90D9" : "rgba(255,255,255,0.85)",
              color: filter === s ? "#fff" : "#4A6A8A",
              boxShadow: filter === s ? "0 4px 12px rgba(74,144,217,0.4)" : "none",
              border: "2px solid " + (filter === s ? "#4A90D9" : "rgba(255,255,255,0.8)"),
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-black text-[#4A6A8A]">Grade:</span>
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className="px-3 py-1.5 rounded-xl text-xs font-black transition-all duration-200"
            style={{
              background: level === l ? "rgba(74,144,217,0.15)" : "rgba(255,255,255,0.7)",
              color: level === l ? "#4A90D9" : "#4A6A8A",
              border: "2px solid " + (level === l ? "rgba(74,144,217,0.4)" : "rgba(255,255,255,0.6)"),
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
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 z-[110] glass bg-white/10 hover:bg-red-500/80 p-3 rounded-full text-white shadow-2xl transition-all flex items-center gap-2 border border-white/20" aria-label="Close">
            <span className="font-black px-2 uppercase tracking-wider text-xs hidden sm:block">Close Video</span> <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-5xl aspect-video relative z-[105]" onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://www.youtube.com/embed/${open}?autoplay=1`} className="w-full h-full rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
