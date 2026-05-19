import { createFileRoute, Link } from "@tanstack/react-router";
import { STUDENT, QUOTES, MASTERY } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";
import { useTheme } from "@/lib/theme-context";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "My World — Soma AI" }] }),
  component: Dashboard,
});

const ISLANDS = [
  {
    id: "math",
    to: "/student/videos?filter=Math",
    label: "Math",
    img: "/island-math.png",
    color: "#4A90D9",
    shadow: "rgba(74,144,217,0.4)",
    badge: "P1–P6",
    badgeColor: "#4A90D9",
    emoji: "🧮",
  },
  {
    id: "reading",
    to: "/student/library",
    label: "Reading & Writing",
    img: "/island-reading.png",
    color: "#2ECC71",
    shadow: "rgba(46,204,113,0.4)",
    badge: "P1–P6",
    badgeColor: "#2ECC71",
    emoji: "📚",
  },
  {
    id: "ai",
    to: "/student/tutor",
    label: "AI Tutor",
    img: "/island-ai.png",
    color: "#FF9500",
    shadow: "rgba(255,149,0,0.4)",
    badge: "All Grades",
    badgeColor: "#FF9500",
    emoji: "🤖",
  },
  {
    id: "speak",
    to: "/student/speak",
    label: "Speak & Listen",
    img: "/island-speak.png",
    color: "#9B59B6",
    shadow: "rgba(155,89,182,0.4)",
    badge: "Languages",
    badgeColor: "#9B59B6",
    emoji: "🗣️",
  },
];

const QUICK_ACTIONS = [
  { to: "/student/ai-quizzes", label: "AI Quiz", emoji: "✨", color: "#9B59B6", bg: "rgba(155,89,182,0.12)" },
  { to: "/student/games", label: "Games", emoji: "🎮", color: "#FF6B6B", bg: "rgba(255,107,107,0.12)" },
  { to: "/student/simplify", label: "Simplify", emoji: "📝", color: "#4A90D9", bg: "rgba(74,144,217,0.12)" },
  { to: "/student/planner", label: "Planner", emoji: "📅", color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
  { to: "/student/videos", label: "Videos", emoji: "📺", color: "#E74C3C", bg: "rgba(231,76,60,0.12)" },
  { to: "/student/progress", label: "Progress", emoji: "📈", color: "#FF9500", bg: "rgba(255,149,0,0.12)" },
];

function Dashboard() {
  const quote = QUOTES[new Date().getDay() % QUOTES.length];
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-10 max-w-screen-2xl mx-auto px-4 pb-16 font-['Nunito']">
      
      {/* ── GREETING BANNER ── */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl animate-pop-in"
        style={{ 
          background: isDark ? "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)" : "linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)",
          boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.5)" : "0 20px 40px rgba(41,128,185,0.3)"
        }}
      >
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none w-full h-full overflow-hidden">
          {/* Cloud decorations */}
          <svg className="absolute -top-10 -right-10 w-64 h-64 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.759-1.549V8a3.618 3.618 0 116.72 2.012 4.5 4.5 0 11-2.022 8.526A3.5 3.5 0 015.5 16z"/></svg>
        </div>
        
        <div className="relative z-10 text-white text-center md:text-left flex-1">
          <p className="text-xl md:text-2xl font-black mb-2 opacity-90 drop-shadow-md text-[#FFE066]">
            Welcome to your adventure! 🌟
          </p>
          <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg mb-4">
            Hey, {STUDENT.name.split(" ")[0]}!
          </h1>
          <p className="text-lg md:text-xl font-bold bg-white/20 inline-block px-5 py-2 rounded-full backdrop-blur-sm border border-white/30">
            "{quote}"
          </p>
        </div>
        
        <div className="relative z-10 flex flex-wrap justify-center gap-4 shrink-0">
          <div className={`px-6 py-4 rounded-[2rem] font-black text-xl flex flex-col items-center gap-1 transform rotate-2 hover:scale-110 hover:-rotate-2 transition-all cursor-pointer text-[#FF9500] border-4 border-[#FFE066] ${isDark ? 'bg-[#112240]' : 'bg-white shadow-[0_8px_0_#FFE066]'}`}>
            <span className="text-3xl">🔥</span>
            <span>{STUDENT.streak} Days</span>
          </div>
          <div className={`px-6 py-4 rounded-[2rem] font-black text-xl flex flex-col items-center gap-1 transform -rotate-2 hover:scale-110 hover:rotate-2 transition-all cursor-pointer text-[#2ECC71] border-4 border-[#A8E6CF] ${isDark ? 'bg-[#112240]' : 'bg-white shadow-[0_8px_0_#A8E6CF]'}`}>
            <span className="text-3xl">⭐</span>
            <span>Level {STUDENT.level}</span>
          </div>
        </div>
      </div>

      {/* ── EXPLORE ISLANDS ── */}
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className={`text-3xl font-black flex items-center gap-3 ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`}>
            🗺️ Explore Your Worlds
          </h2>
          <span className="bg-[#E74C3C] text-white text-sm font-black px-4 py-2 rounded-full animate-bounce shadow-lg border-2 border-white">
            Pick an Island to start!
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ISLANDS.map((island, i) => (
            <Link
              key={island.id}
              to={island.to}
              className={`group relative rounded-[2.5rem] text-center transition-all duration-300 hover:-translate-y-4 animate-pop-in border-4 border-transparent overflow-hidden flex flex-col ${isDark ? 'bg-[#112240]' : 'bg-white'}`}
              style={{ 
                animationDelay: `${i * 0.15}s`, 
                boxShadow: isDark ? `0 8px 30px rgba(0,0,0,0.5)` : `0 12px 0 ${island.color}30, 0 20px 25px -5px rgba(0,0,0,0.1)`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = island.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div 
                className="w-full aspect-square flex items-center justify-center relative shadow-inner"
                style={{ background: `linear-gradient(180deg, ${island.color}${isDark ? '20' : '15'}, ${island.color}${isDark ? '40' : '30'})` }}
              >
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay rounded-full blur-3xl transform scale-150 group-hover:scale-100 transition-transform duration-700" />
                <img 
                  src={island.img} 
                  alt={island.label}
                  className="w-[95%] h-[95%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 relative z-10"
                  style={{ animationDelay: `${i * 0.8}s` }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = `<span style="font-size:100px;filter:drop-shadow(0 10px 20px rgba(0,0,0,0.2))">${island.emoji}</span>`;
                  }}
                />
              </div>
              
              <div className={`p-6 flex-1 flex flex-col justify-center items-center relative z-20 ${isDark ? 'bg-[#112240]' : 'bg-white'}`}>
                <h3 className={`text-2xl font-black tracking-wide mb-3 group-hover:text-opacity-80 transition-colors leading-tight ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`}>
                  {island.label}
                </h3>
                <div 
                  className="inline-block text-white text-sm font-black px-6 py-2 rounded-full shadow-md mt-auto"
                  style={{ background: island.color }}
                >
                  {island.badge}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* ── MAGIC TOOLS (Quick Actions) ── */}
        <div className={`lg:col-span-7 rounded-[2.5rem] p-8 shadow-xl border-4 relative overflow-hidden ${isDark ? 'bg-[#112240] border-[#4A90D9]/30' : 'bg-white border-[#4A90D9]/20'}`}>
          <div className={`absolute -top-10 -right-10 ${isDark ? 'text-white/5' : 'text-[#4A90D9]/5'}`}>
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
          </div>
          
          <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 relative z-10 ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`}>
            🎒 My Magic Backpack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 relative z-10">
            {QUICK_ACTIONS.map((a, i) => (
              <Link
                key={a.to}
                to={a.to}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-3xl transition-all hover:scale-105 group ${isDark ? 'bg-[#1A2F50]' : 'bg-white'}`}
                style={{ 
                  border: `3px solid ${a.bg}`,
                  boxShadow: isDark ? 'none' : `0 6px 0 ${a.bg}, 0 10px 15px -3px rgba(0,0,0,0.05)`
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-sm transition-transform group-hover:-translate-y-2 group-hover:rotate-[15deg]"
                  style={{ background: a.bg }}
                >
                  {a.emoji}
                </div>
                <span className={`text-base font-black ${isDark ? 'text-white' : ''}`} style={isDark ? {} : { color: a.color }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── TREASURE ROOM & AI ── */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* AI Tutor Card */}
          <Link
            to="/student/tutor"
            className="group block bg-[#FF9500] rounded-[2.5rem] p-1 shadow-[0_12px_0_#CC7700] hover:-translate-y-2 transition-transform cursor-pointer relative overflow-hidden"
          >
            <div className={`rounded-[2.25rem] p-6 h-full border-4 border-[#FF9500] flex items-center gap-4 ${isDark ? 'bg-[#2A1C0A]' : 'bg-[#FFF4E5]'}`}>
              <div className={`w-24 h-24 shrink-0 rounded-full p-2 shadow-inner border-4 border-[#FFD699] group-hover:border-[#FF9500] transition-colors relative ${isDark ? 'bg-[#3A2810]' : 'bg-white'}`}>
                <RiveAnimation src="/riv-animations/22673-42423-for-education-purpose.riv" className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#FF9500] mb-1">Ask Soma AI!</h3>
                <p className={`text-sm font-bold ${isDark ? 'text-[#FFD699]' : 'text-[#A66100]'}`}>Got a question? Let's figure it out together! 🤖💬</p>
              </div>
            </div>
          </Link>

          {/* Treasure Room (Badges) */}
          <div className={`flex-1 rounded-[2.5rem] p-6 shadow-xl border-4 flex flex-col relative overflow-hidden ${isDark ? 'bg-[#112240] border-[#2ECC71]/30' : 'bg-white border-[#2ECC71]/20'}`}>
             <div className={`absolute -bottom-10 -left-10 ${isDark ? 'text-[#2ECC71]/10' : 'text-[#2ECC71]/5'}`}>
              <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            
            <h2 className={`text-xl font-black mb-4 flex items-center justify-between relative z-10 ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`}>
              <span className="flex items-center gap-2">👑 Treasure Room</span>
              <span className="text-xs font-black text-white bg-[#2ECC71] px-3 py-1.5 rounded-full shadow-md">
                {STUDENT.badges.length} Treasures
              </span>
            </h2>
            
            <div className={`flex-1 flex items-center justify-center rounded-3xl p-4 border-2 border-dashed relative z-10 min-h-[140px] ${isDark ? 'bg-[#0B162C]/50 border-gray-700' : 'bg-gray-50/50 border-gray-200'}`}>
              {STUDENT.badges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 w-full">
                  {STUDENT.badges.map((b, i) => {
                    const colors = ["#4A90D9", "#2ECC71", "#FF9500", "#FF6B6B", "#9B59B6"];
                    const c = colors[i % colors.length];
                    return (
                      <div 
                        key={b} 
                        className={`rounded-2xl p-3 text-center transform transition-transform hover:scale-105 ${isDark ? 'bg-[#1A2F50]' : 'bg-white'}`}
                        style={{ border: `3px solid ${c}30`, boxShadow: isDark ? 'none' : `0 4px 0 ${c}15` }}
                      >
                        <div className="text-2xl mb-1 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>⭐</div>
                        <p className={`text-[11px] font-black leading-tight ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`}>{b}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center w-full px-2">
                  <div className="text-4xl mb-2 opacity-50 filter grayscale">🏆</div>
                  <h3 className={`text-base font-black mb-1 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>No Treasures Yet!</h3>
                  <p className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Play games to earn your first shiny badge!</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}