import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Trophy, Timer, Star, TrendingUp, BarChart3, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/student/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes — Soma AI" }] }),
  component: Quizzes,
});

const QUIZ_STATS = [
  { label: "Quizzes Taken", val: "24", icon: Star },
  { label: "Avg. Score", val: "88%", icon: TrendingUp },
  { label: "Unlocked Badges", val: "12", icon: Award },
];

const AVAILABLE_QUIZZES: any[] = [];

function Quizzes() {
  return (
    <div className="space-y-10 max-w-6xl animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Challenge <span className="text-primary">Zone</span></h1>
          <p className="text-muted-foreground font-medium mt-1">Test your knowledge and climb the national leaderboard!</p>
        </div>
        
        <div className="flex items-center gap-4">
           {QUIZ_STATS.map((stat, i) => (
             <div key={i} className="flex flex-col items-center px-6 py-3 rounded-2xl bg-card border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                   <stat.icon className="h-3 w-3 text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</span>
                </div>
                <span className="text-lg font-black text-white">{stat.val}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Recommended Hero Quiz */}
      <div className="group relative rounded-[48px] bg-[#111827] border border-white/5 overflow-hidden p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl transition-all duration-500 hover:border-primary/20">
         <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
         
         <div className="h-48 w-48 rounded-[40px] bg-primary/10 flex items-center justify-center relative shrink-0">
            <Trophy className="h-24 w-24 text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)] group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 border-[16px] border-white/5 rounded-[40px]" />
         </div>

         <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-success/20 border border-success/10 text-[10px] font-black text-success uppercase tracking-widest uppercase">
               Next Milestone
            </div>
            <h2 className="text-3xl font-black tracking-tight">Weekly Champion Challenge</h2>
            <p className="text-muted-foreground font-medium leading-relaxed max-w-xl">
               Compete with students across the country in this week's special Biology & Tech fusion quiz. 
               Top 10 finishers receive the **Neon Spark** exclusive profile aura!
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <Button className="h-14 px-10 rounded-2xl text-base font-black shadow-glow">
                  Begin Challenge <Zap className="h-5 w-5 ml-2" />
               </Button>
               <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs">
                  View Rules
               </Button>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-10">
         {/* Quiz List */}
         <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
               <Zap className="h-5 w-5 text-primary" />
               Available Assessments
            </h3>
            <div className="space-y-4">
               {AVAILABLE_QUIZZES.length > 0 ? AVAILABLE_QUIZZES.map((q) => (
                  <div key={q.id} className="group relative rounded-3xl glass bg-card/40 border border-white/5 p-6 hover:bg-card/60 transition-all duration-300 flex items-center justify-between">
                     {/* ... existing quiz card ... */}
                  </div>
               )) : (
                  <div className="py-20 text-center space-y-4 rounded-[40px] border border-white/5 bg-white/20">
                     <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                        <Zap className="h-10 w-10 text-white/20" />
                     </div>
                     <h3 className="text-xl font-bold text-white/60">No quizzes assigned yet</h3>
                     <p className="text-sm text-muted-foreground max-w-xs mx-auto font-medium">Your teacher will assign quizzes when they are ready. Keep studying!</p>
                  </div>
               )}
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-8">
             <div className="rounded-[32px] glass bg-gradient-to-b from-primary/10 to-transparent border border-white/5 p-8 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-black tracking-tight">Your Mastery</h3>
                   <BarChart3 className="h-5 w-5 text-primary opacity-50" />
                </div>
                
                <div className="space-y-4">
                   {[
                     { label: "Logic", val: 92 },
                     { label: "Memory", val: 78 },
                     { label: "Speed", val: 84 },
                     { label: "Accuracy", val: 96 },
                   ].map((m, i) => (
                     <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                           <span className="text-white/60">{m.label}</span>
                           <span className="text-primary">{m.val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                           <div className="h-full bg-primary rounded-full" style={{ width: `${m.val}%` }} />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                   <p className="text-[10px] text-center font-medium text-muted-foreground">You are in the **Top 5%** of student achievers in Rwanda this month! Keep it up!</p>
                </div>
             </div>

             <div className="rounded-[32px] border border-white/5 p-8 relative overflow-hidden bg-success/5 group">
                <Star className="absolute -right-6 -bottom-6 h-32 w-32 text-success opacity-10 group-hover:rotate-45 transition-transform duration-700" />
                <h4 className="text-sm font-black uppercase tracking-widest text-success mb-2">Next Milestone</h4>
                <p className="text-sm font-bold text-white mb-4">Unlock the "Grand Master" badge by completing 3 hard science quizzes.</p>
                <div className="h-1 rounded-full bg-success/20 overflow-hidden">
                   <div className="h-full bg-success w-2/3" />
                </div>
             </div>
         </div>
      </div>
    </div>
  );
}
