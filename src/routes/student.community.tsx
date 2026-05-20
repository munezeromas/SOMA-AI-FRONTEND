import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { COMMUNITY_POSTS } from "@/lib/mock-data";
import { Heart, Send, Smile, Star, Users } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export const Route = createFileRoute("/student/community")({
  head: () => ({ meta: [{ title: "Community — Soma AI" }] }),
  component: Community,
});

const AVATAR_COLORS = [
  "linear-gradient(135deg, #4A90D9, #2D6DB5)",
  "linear-gradient(135deg, #2ECC71, #27AE60)",
  "linear-gradient(135deg, #FF9500, #E07800)",
  "linear-gradient(135deg, #9B59B6, #7D3C98)",
  "linear-gradient(135deg, #FF6B6B, #C0392B)",
];

const REACTION_EMOJIS = ["❤️", "🌟", "🔥", "👏", "🎉"];

function Community() {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [text, setText] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const post = () => {
    if (!text.trim()) return;
    setPosts([{ user: "You", msg: text, likes: 0 }, ...posts]);
    setText("");
  };

  const like = (i: number) =>
    setPosts(posts.map((p, idx) => (idx === i ? { ...p, likes: p.likes + 1 } : p)));

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 font-['Nunito']">

      {/* ── HEADER ── */}
      <div
        className="card-cloud p-6 flex items-center gap-5 animate-pop-in relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0F2027, #203A43)"
            : "linear-gradient(135deg, #E8F5FF, #C8E8FF)",
        }}
      >
        <div
          className="w-14 h-14 shrink-0 rounded-[20px] flex items-center justify-center text-3xl shadow-md"
          style={{ background: "linear-gradient(135deg, #4A90D9, #2D6DB5)" }}
        >
          👥
        </div>
        <div className="flex-1">
          <h1 className={`text-2xl font-black ${isDark ? "text-white" : "text-[#1A3A5C]"}`}>
            Motivation Wall
          </h1>
          <p className={`text-sm font-bold mt-0.5 ${isDark ? "text-[#7BB8F0]" : "text-[#4A6A8A]"}`}>
            Share encouragement with your classmates! 🌟
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm"
          style={{ background: "rgba(74,144,217,0.15)", color: "#4A90D9" }}>
          <Users className="h-4 w-4" />
          {posts.length} posts
        </div>
      </div>

      {/* ── COMPOSE BOX ── */}
      <div
        className="card-cloud p-5 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className={`flex items-center gap-3 mb-3`}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg shadow-md shrink-0"
            style={{ background: "linear-gradient(135deg, #4A90D9, #2D6DB5)" }}
          >
            Y
          </div>
          <span className={`font-black text-sm ${isDark ? "text-white" : "text-[#1A3A5C]"}`}>
            You
          </span>
        </div>
        <div className="flex gap-3 items-end">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                post();
              }
            }}
            placeholder="Say something kind or motivating... 😊"
            rows={2}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold resize-none outline-none transition-all border-2 border-transparent focus:border-[#4A90D9] ${
              isDark
                ? "bg-[#1A2F50] text-white placeholder:text-white/30"
                : "bg-[#F0F8FF] text-[#1A3A5C] placeholder:text-[#4A6A8A]/50"
            }`}
          />
          <button
            onClick={post}
            disabled={!text.trim()}
            className="btn-play btn-play-primary h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: text.trim() ? undefined : "none" }}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── POSTS FEED ── */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="card-cloud p-12 text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className={`text-xl font-black mb-2 ${isDark ? "text-white" : "text-[#1A3A5C]"}`}>
              Be the first to post!
            </h3>
            <p className={`text-sm font-bold ${isDark ? "text-[#7BB8F0]" : "text-[#4A6A8A]"}`}>
              Share something encouraging to start the wall!
            </p>
          </div>
        ) : (
          posts.map((p, i) => {
            const avatarGrad = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <div
                key={i}
                className="card-cloud p-5 animate-slide-up group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base shadow-md shrink-0 border-2 border-white"
                    style={{ background: avatarGrad }}
                  >
                    {p.user[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name + time */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-black text-sm ${isDark ? "text-white" : "text-[#1A3A5C]"}`}>
                        {p.user}
                      </span>
                      <span className={`text-xs font-bold ${isDark ? "text-white/30" : "text-[#4A6A8A]/50"}`}>
                        • just now
                      </span>
                    </div>

                    {/* Message */}
                    <p className={`text-sm font-semibold leading-relaxed ${isDark ? "text-[#C8E0F9]" : "text-[#2A4A6C]"}`}>
                      {p.msg}
                    </p>

                    {/* Reaction row */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => like(i)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 ${
                          p.likes > 0
                            ? "bg-red-100 text-red-500 border-2 border-red-200"
                            : isDark
                            ? "bg-white/5 text-white/40 border-2 border-white/10 hover:bg-red-500/20 hover:text-red-400"
                            : "bg-gray-100 text-gray-400 border-2 border-gray-200 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${p.likes > 0 ? "fill-red-500" : ""}`}
                        />
                        {p.likes > 0 ? p.likes : "Like"}
                      </button>

                      {/* Quick emoji reactions */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {REACTION_EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => like(i)}
                            className="text-base hover:scale-125 transition-transform active:scale-95"
                            title={`React with ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── BOTTOM TIPS ── */}
      <div
        className="card-cloud p-5 flex items-center gap-4 animate-slide-up"
        style={{
          animationDelay: "0.3s",
          background: isDark
            ? "linear-gradient(135deg, rgba(74,144,217,0.1), rgba(46,204,113,0.05))"
            : "linear-gradient(135deg, rgba(74,144,217,0.06), rgba(46,204,113,0.04))",
        }}
      >
        <div className="text-3xl">💡</div>
        <p className={`text-xs font-bold leading-relaxed ${isDark ? "text-[#7BB8F0]" : "text-[#4A6A8A]"}`}>
          <span className={`font-black ${isDark ? "text-white" : "text-[#1A3A5C]"}`}>
            Kindness Challenge:{" "}
          </span>
          Post one encouraging message every day to keep your classmates motivated! You'll earn the{" "}
          <span className="text-[#FF9500] font-black">⭐ Kindness Badge</span> after 7 days.
        </p>
      </div>
    </div>
  );
}
