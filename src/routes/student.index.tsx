import { createFileRoute, Link } from "@tanstack/react-router";
import { STUDENT } from "@/lib/mock-data";
import {
  ClipboardList, Users, Flame, Trophy,
  ChevronLeft, ChevronRight, CheckCircle2,
  Bot, BookOpen, Star, Sparkles
} from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useState } from "react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Dashboard — Soma AI" }] }),
  component: Dashboard,
});

const STATS = [
  {
    id: "assignments",
    label: "Assignments",
    value: "12",
    icon: ClipboardList,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
    to: "/student/homework"
  },
  {
    id: "xp",
    label: "Total XP",
    value: "24,542",
    icon: Users,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.15)",
    to: "/student/progress"
  },
  {
    id: "streak",
    label: "Day Streak",
    value: "5",
    icon: Flame,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.15)",
    to: "/student/games"
  },
  {
    id: "badges",
    label: "Badges",
    value: "10",
    icon: Trophy,
    color: "#10B981",
    bg: "rgba(16,185,129,0.15)",
    to: "/student/progress"
  },
];

const PERFORMANCE = [
  { label: "Math", value: 85, color: "#3B82F6" },
  { label: "Reading", value: 65, color: "#F59E0B" },
  { label: "Science", value: 75, color: "#10B981" },
];

const NOTIFICATIONS = [
  {
    title: "Math Assignment Due",
    date: "Complete by Today",
    desc: "Complete the fractions worksheet and submit it before the end of the day.",
    to: "/student/homework"
  },
  {
    title: "Science Fair Project",
    date: "Upcoming Event",
    desc: "We are planning the school science fair. Make sure to choose your project topic.",
    to: "/student/planner"
  }
];

const TOP_SCORES = [
  { name: "Mathematics", score: "99.90%", rank: "1st", color: "from-[#4ADE80] to-[#22C55E]" },
  { name: "Science", score: "99.76%", rank: "2nd", color: "from-[#60A5FA] to-[#2563EB]" },
  { name: "Reading", score: "99.50%", rank: "3rd", color: "from-[#FCD34D] to-[#F59E0B]" },
];

// Dynamically generate calendar based on provided date
function generateCalendar(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const todayDate = today.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

  const days = [];
  
  // Previous month trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = 0; i < startingDay; i++) {
    days.unshift({ day: prevMonthLastDay - i, currentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    let event = null;
    
    if (isCurrentMonth) {
      if (i === todayDate) event = "today";
      else if (i === todayDate + 2) event = "green-circle";
      else if (i >= todayDate - 4 && i <= todayDate - 2) {
        if (i === todayDate - 4) event = "range-start";
        else if (i === todayDate - 2) event = "range-end";
        else event = "range-mid";
      }
    } else {
      // Add random events for other months
      if (i === 10 || i === 22) event = "green-circle";
    }

    days.push({ day: i, currentMonth: true, event });
  }

  // Next month leading days
  const remainingCells = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: i, currentMonth: false });
  }

  const monthName = date.toLocaleString('default', { month: 'long' });
  return { days, monthName, year };
}

function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0";
  const textPrimary = isDark ? "#F8FAFC" : "#0F172A";
  const textMuted = isDark ? "#94A3B8" : "#64748B";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }
  function prevMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  const { days: calendarDays, monthName, year } = generateCalendar(currentDate);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in main-content-padding">
      
      {/* ── HERO BANNER ── */}
      <div className="relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 shadow-xl hover-glow"
        style={{
          background: "linear-gradient(135deg, #4F46E5, #3B82F6, #06b6d4)",
          minHeight: "200px"
        }}
      >
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/classroom.png.png')] bg-cover bg-right bg-no-repeat opacity-40 mix-blend-overlay" />
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/20 rounded-full filter blur-[80px] animate-pulse-glow" />
        
        <div className="relative z-10 flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black backdrop-blur-md">
            <Sparkles className="w-4 h-4" /> Welcome back, {STUDENT.name.split(' ')[0]}!
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Ready for your next <br /> <span className="text-yellow-300">learning adventure?</span>
          </h1>
          <p className="text-white/80 font-medium text-sm max-w-md">
            You have 2 pending assignments and your math streak is at 5 days. Keep up the great work!
          </p>
        </div>
        
        {/* Call to action button on hero */}
        <div className="relative z-10 mt-6 md:mt-0 flex flex-col items-center md:items-end gap-2.5 shrink-0">
          {/* Large floating SOMA AI bot mascot */}
          <div className="w-36 h-36 -mb-6 pointer-events-none animate-bounce" style={{ animationDuration: "3.5s" }}>
            <RiveAnimation src="/riv-animations/22673-42423-for-education-purpose.riv" className="w-full h-full drop-shadow-2xl" />
          </div>
          {/* Premium glassmorphic button */}
          <Link to="/student/tutor" className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white/20 border border-white/30 text-white rounded-2xl font-black shadow-lg backdrop-blur-md hover:bg-white/30 hover:scale-105 transition-all duration-300 group">
            <Sparkles className="w-4 h-4 text-yellow-300 group-hover:animate-pulse" />
            <span className="text-base">Start Learning</span>
          </Link>
        </div>
      </div>

      {/* ── TOP STATS ROW ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
              <Link
                key={s.id}
                to={s.to}
                className="pro-card pro-card-hover glass-panel relative overflow-hidden flex flex-col hover-glow group"
                style={{ padding: "1.25rem", textDecoration: "none" }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-1" 
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} 
                />
                <div className="flex items-center gap-4 mt-2 relative z-10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: s.bg, boxShadow: `0 0 15px ${s.bg}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70" style={{ color: textMuted }}>
                      {s.label}
                    </p>
                    <p className="text-3xl font-black" style={{ color: textPrimary, textShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                      {s.value}
                    </p>
                  </div>
                </div>
                {/* Decorative background glow on hover */}
                <div 
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full filter blur-[30px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: s.color }}
                />
              </Link>
          );
        })}
      </div>

      {/* ── MIDDLE ROW ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Calendar & Tasks */}
        <div className="pro-card glass-panel hover-glow p-6 flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full filter blur-[40px] animate-pulse-glow" />
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title">Calendar & Tasks</h2>
          </div>
          
          <div className="flex items-center justify-between mb-4 px-2 relative z-10">
             <button onClick={prevMonth} className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors cursor-pointer">
               <ChevronLeft className="w-4 h-4" />
             </button>
             <span className="font-black text-sm" style={{ color: textPrimary }}>
               {monthName}, {year}
             </span>
             <button onClick={nextMonth} className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors cursor-pointer">
               <ChevronRight className="w-4 h-4" />
             </button>
          </div>

          <div className="flex-1 relative z-10">
             <div className="grid grid-cols-7 gap-1 text-center mb-2">
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                 <div key={d} className="text-[10px] font-black uppercase tracking-wider opacity-60" style={{ color: textMuted }}>{d}</div>
               ))}
             </div>
             <div className="grid grid-cols-7 gap-y-2 gap-x-0">
               {calendarDays.map((d, i) => {
                 let className = "calendar-day ";
                 if (!d.currentMonth) className += "opacity-30 ";
                 
                 if (d.event === "green-circle") className += "event-green ";
                 else if (d.event === "today") className += "today ";
                 else if (d.event === "range-start") className += "range-green range-start ";
                 else if (d.event === "range-mid") className += "range-green range-mid ";
                 else if (d.event === "range-end") className += "range-green range-end ";

                 if (d.currentMonth && d.day === selectedDay) className += "active ring-2 ring-blue-500 ";

                 return (
                   <div key={i} className="flex justify-center">
                     <div 
                       className={className} 
                       style={{ width: "100%", height: "32px", maxWidth: "36px" }}
                       onClick={() => d.currentMonth && setSelectedDay(d.day)}
                     >
                       {d.day}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
          

        </div>

        {/* Performance Chart */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full filter blur-[50px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title">Subject Performance</h2>
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-60" style={{ color: textMuted }}>% Score</span>
          </div>

          <div className="flex items-end justify-around h-48 mb-8 relative pb-2 mt-8 z-10 border-b border-[var(--border)]">
             <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-black opacity-40" style={{ color: textMuted }}>
               <span>100</span>
               <span>75</span>
               <span>50</span>
               <span>25</span>
               <span>0</span>
             </div>

             {PERFORMANCE.map((p, i) => (
               <div key={i} className="flex flex-col items-center gap-2 relative h-full justify-end ml-6 w-1/4 group cursor-pointer">
                 <div 
                   className="w-16 rounded-t-2xl relative flex items-end justify-center animate-fade-in transition-all duration-300 group-hover:scale-105" 
                   style={{ 
                     height: `${p.value}%`, 
                     background: `linear-gradient(180deg, ${p.color}, transparent)`,
                     animationDuration: "1s",
                     animationDelay: `${i * 0.15}s`,
                     boxShadow: `0 -4px 20px -5px ${p.color}80`
                   }}
                 >
                   <div className="absolute -top-8 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                     {p.value}%
                   </div>
                 </div>
               </div>
             ))}
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            {PERFORMANCE.map(p => (
              <div key={p.label} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full shadow-sm" style={{ background: p.color }} />
                 <span className="text-xs font-black" style={{ color: textPrimary }}>{p.label}</span>
                 <div className="flex-1 h-[1px] border-b border-dashed border-[var(--border)] mx-2" />
                 <span className="text-[10px] font-bold opacity-70" style={{ color: textMuted }}>{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Activities Notification */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title">Activities Notification</h2>
            <button className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors" style={{ border: `1px solid #10B981`, color: "#10B981" }}>
              View All
            </button>
          </div>

          <div className="space-y-4 relative z-10">
            {NOTIFICATIONS.map((n, i) => (
              <Link 
                to={n.to} 
                key={i} 
                className="group block p-4 rounded-2xl transition-all duration-300" 
                style={{ background: "var(--muted)", textDecoration: "none" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-sm group-hover:text-blue-500 transition-colors" style={{ color: textPrimary }}>{n.title}</h3>
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: textMuted }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: textMuted }}>{n.date}</p>
                <p className="text-xs font-medium leading-relaxed opacity-80" style={{ color: textMuted }}>
                  {n.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Scores */}
        <div className="pro-card glass-panel hover-glow p-6 relative overflow-hidden">
          <div className="section-header mb-6 relative z-10">
            <h2 className="section-title">Top Scores</h2>
            <select className="text-[10px] font-black uppercase tracking-widest bg-transparent border-none outline-none cursor-pointer opacity-70" style={{ color: textPrimary }}>
              <option>2026-2027</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4 relative z-10">
            {TOP_SCORES.map((score, i) => (
              <div 
                key={i} 
                className={`rounded-2xl p-4 flex flex-col items-center text-center text-white bg-gradient-to-br ${score.color} relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500 delay-75" />

                <div className="w-10 h-10 rounded-full bg-white/20 mb-3 flex items-center justify-center font-black text-lg backdrop-blur-md relative z-10 border border-white/20 shadow-sm">
                  {i + 1}
                </div>
                
                <p className="font-black text-xs leading-tight mb-1 relative z-10">{score.name}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-3 relative z-10">Subject</p>
                
                <p className="font-black text-xl mb-3 relative z-10 drop-shadow-sm">{score.score}</p>
                
                <div className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md relative z-10 border border-white/10 mt-auto">
                  {score.rank} Rank
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}