import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, PlayCircle, Trophy, Users, Zap } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/homework")({
  head: () => ({ meta: [{ title: "Homework — Soma AI" }] }),
  component: Homework,
});

const HOMEWORK: any[] = [];

function Homework() {
  const [filter, setFilter] = useState("all");
  const filtered = HOMEWORK.filter(h => filter === "all" || h.status === filter);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header with students-tools Rive icon */}
      <div className="card-cloud p-5 flex items-center gap-4 animate-pop-in">
        <div className="w-14 h-14 shrink-0">
          <RiveAnimation src="/riv-animations/21441-40283-students-tools-notebook-pencil.riv" className="w-full h-full" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-[#1A3A5C]">Your Homework</h1>
          <p className="text-sm font-bold text-[#4A6A8A]">Complete assignments to earn XP and unlock badges!</p>
        </div>
        {/* Filter pills */}
        <div className="flex items-center gap-1 p-1 rounded-2xl" style={{ background: "rgba(74,144,217,0.1)" }}>
          {["all", "assigned", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-black capitalize transition-all"
              style={{
                background: filter === f ? "#4A90D9" : "transparent",
                color: filter === f ? "white" : "#4A6A8A",
                boxShadow: filter === f ? "0 3px 8px rgba(74,144,217,0.4)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Homework list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length > 0 ? filtered.map((h) => (
          <div key={h.id} className="card-cloud p-6">
            <h3 className="font-black text-[#1A3A5C]">{h.title}</h3>
          </div>
        )) : (
          /* Empty state — bluey-idle-animation */
          <div className="col-span-full py-12 text-center space-y-3">
            <div className="w-48 h-48 mx-auto">
              <RiveAnimation src="/riv-animations/3352-7042-bluey-idle-animation.riv" className="w-full h-full" />
            </div>
            <h3 className="text-lg font-black text-[#1A3A5C]">All clear! 🎉</h3>
            <p className="text-sm font-semibold text-[#4A6A8A] max-w-xs mx-auto">
              No pending homework. When your teacher assigns work, it'll appear here!
            </p>
          </div>
        )}
      </div>

      {/* Featured Exercise */}
      <div
        className="card-cloud p-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(74,144,217,0.1), rgba(46,204,113,0.06))" }}
      >
        {/* title-animation Rive for section heading */}
        <div className="absolute top-0 left-0 w-full h-12 pointer-events-none opacity-30">
          <RiveAnimation src="/riv-animations/26380-49366-title-animation.riv" className="w-full h-full" />
        </div>

        <div className="relative z-10 grid md:grid-cols-[1fr_280px] gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-black"
              style={{ background: "rgba(74,144,217,0.15)", color: "#4A90D9", border: "2px solid rgba(74,144,217,0.3)" }}>
              <Zap className="h-3 w-3 animate-pulse" /> Exercise of the Week
            </div>
            <h2 className="text-2xl font-black text-[#1A3A5C]">Interactive Science Lab</h2>
            <p className="text-sm font-semibold text-[#4A6A8A] leading-relaxed max-w-md">
              Step into our virtual lab to explore the human digestive system.
              Complete all experiments to unlock the "Master Scientist" badge!
            </p>
            <button className="btn-play btn-play-green px-8 py-3 text-sm font-black flex items-center gap-2">
              Enter Lab <PlayCircle className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden md:flex flex-col gap-3">
            {[
              { label: "Completion Rate", val: "85%", icon: Trophy, color: "#FFD700" },
              { label: "Active Students", val: "1.2k", icon: Users, color: "#4A90D9" },
              { label: "Avg. Duration", val: "15 min", icon: Clock, color: "#2ECC71" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="card-cloud px-4 py-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                  <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#4A6A8A] uppercase tracking-wide">{stat.label}</p>
                  <p className="text-base font-black text-[#1A3A5C]">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
