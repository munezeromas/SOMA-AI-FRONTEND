import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Book, CheckCircle2, Clock, PlayCircle, Trophy, Star, ArrowRight, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/homework")({
  head: () => ({ meta: [{ title: "Homework — Soma AI" }] }),
  component: Homework,
});

const HOMEWORK: any[] = [];

function Homework() {
  const [filter, setFilter] = useState("all");

  const filtered = HOMEWORK.filter(h => filter === "all" || h.status === filter);

  return (
    <div className="space-y-8 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Your <span className="text-primary">Homework</span></h1>
          <p className="text-muted-foreground font-medium">Complete assignments to earn XP and unlock badges!</p>
        </div>
        
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-card border border-white/5">
          {["all", "assigned", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-glow' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.length > 0 ? filtered.map((h) => (
           <div key={h.id} className="group relative rounded-[32px] glass bg-card/40 border border-white/5 p-8 hover:bg-card/60 transition-all duration-500 overflow-hidden">
             {/* ... existing card code ... */}
           </div>
         )) : (
           <div className="col-span-full py-20 text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                 <Book className="h-10 w-10 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white/60">No pending homework</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto font-medium">When your teacher assigns your next exercise, it will appear right here!</p>
           </div>
         )}
      </div>
      
      {/* Featured Exercise Section */}
      <div className="mt-12 rounded-[40px] bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border border-white/5 p-10 relative overflow-hidden group">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid md:grid-cols-[1fr_300px] gap-10 items-center">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/20">
                 <Zap className="h-3 w-3 text-primary animate-pulse" />
                 <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Exercise of the week</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight">Interactive <br /> Science Lab</h2>
              <p className="text-muted-foreground max-w-md font-medium leading-relaxed">
                Step into our virtual lab to explore the human digestive system. 
                Complete all experiments to unlock the "Master Scientist" badge!
              </p>
              <div className="pt-4">
                 <Button className="h-14 px-8 rounded-2xl text-base font-black shadow-glow">
                   Enter Lab <PlayCircle className="h-5 w-5 ml-2" />
                 </Button>
              </div>
           </div>
           
           <div className="hidden md:flex flex-col gap-4">
              {[
                { label: "Completion Rate", val: "85%", icon: Trophy },
                { label: "Active Students", val: "1.2k", icon: Users },
                { label: "Avg. Duration", val: "15 min", icon: Clock },
              ].map((stat, i) => (
                <div key={i} className="glass bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:translate-x-2 transition-transform duration-500">
                   <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <stat.icon className="h-5 w-5" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                      <p className="text-lg font-black text-white">{stat.val}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
