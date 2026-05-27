import { createFileRoute, Link } from "@tanstack/react-router";
import { LIBRARY_BOOKS } from "@/lib/library-data";
import { BookCover } from "@/components/soma/BookCover";
import { Search, BookOpen, Sparkles, Grid3X3, List } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme-context";

export const Route = createFileRoute("/student/library")({
  head: () => ({ meta: [{ title: "Digital Library — Soma AI" }] }),
  component: Library,
});

const GRADES = ["All", "P1", "P2", "P3", "P4", "P5", "P6"];

function Library() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textPrimary = isDark ? "#F8FAFC" : "#0F172A";
  const textMuted = isDark ? "#94A3B8" : "#64748B";

  const books = LIBRARY_BOOKS.filter(b =>
    (filter === "All" || b.grade === filter) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in main-content-padding">

      {/* ── HEADER ── */}
      <div className="pro-card glass-panel p-6 relative overflow-hidden hover-glow">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full filter blur-[60px] animate-pulse-glow" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-emerald-500/10 rounded-full filter blur-[40px]" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>Learning Resources</span>
            </div>
            <h1 className="text-3xl font-black" style={{ color: textPrimary }}>
              Digital <span style={{ color: "var(--primary)" }}>Library</span>
            </h1>
            <p className="text-sm font-medium mt-1" style={{ color: textMuted }}>
              {books.length} curated books for your cognitive growth
            </p>
          </div>

          {/* Search + view toggle */}
          <div className="flex items-center gap-3">
            <div className="header-search" style={{ maxWidth: 300 }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: textMuted }} />
              <input
                type="text"
                placeholder="Search books or subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="library-search"
              />
            </div>
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-2 rounded-lg transition-all"
                style={{ background: viewMode === "grid" ? "var(--card)" : "transparent", color: viewMode === "grid" ? "var(--primary)" : textMuted }}
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="p-2 rounded-lg transition-all"
                style={{ background: viewMode === "list" ? "var(--card)" : "transparent", color: viewMode === "list" ? "var(--primary)" : textMuted }}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRADE FILTER PILLS ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-widest mr-1" style={{ color: textMuted }}>Grade:</span>
        {GRADES.map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className="px-4 py-2 rounded-full text-xs font-black transition-all duration-200"
            style={{
              background: filter === g
                ? "linear-gradient(135deg, var(--primary), #6366F1)"
                : "var(--card)",
              color: filter === g ? "#fff" : textMuted,
              border: `1px solid ${filter === g ? "transparent" : "var(--border)"}`,
              boxShadow: filter === g ? "0 4px 12px rgba(79,70,229,0.3)" : "none",
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* ── BOOK GRID ── */}
      {books.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {books.map((b) => (
              <Link
                key={b.id}
                to="/student/read"
                search={{ file: b.file, title: b.title }}
                className="group space-y-3 hover:-translate-y-2 transition-all duration-500"
                style={{ textDecoration: "none" }}
              >
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-500">
                  <BookCover title={b.title} file={b.file} subject={b.subject} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-black" style={{ background: "var(--primary)", boxShadow: "0 2px 8px rgba(79,70,229,0.5)" }}>
                      <BookOpen className="w-3 h-3" /> Read Now
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black leading-tight truncate uppercase tracking-tight transition-colors group-hover:text-[var(--primary)]" style={{ color: textPrimary }}>
                    {b.title}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: textMuted }}>
                    {b.grade} · {b.subject}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {books.map((b) => (
              <Link
                key={b.id}
                to="/student/read"
                search={{ file: b.file, title: b.title }}
                className="pro-card pro-card-hover flex items-center gap-4 p-4"
                style={{ textDecoration: "none" }}
              >
                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm">
                  <BookCover title={b.title} file={b.file} subject={b.subject} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm truncate uppercase" style={{ color: textPrimary }}>{b.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: textMuted }}>{b.grade} · {b.subject}</p>
                </div>
                <div className="pro-badge shrink-0" style={{ background: "rgba(79,70,229,0.1)", color: "var(--primary)" }}>
                  <BookOpen className="w-3 h-3" /> Read
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="pro-card glass-panel p-16 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-black mb-2" style={{ color: textPrimary }}>No books found</h3>
          <p className="text-sm font-medium" style={{ color: textMuted }}>
            Try adjusting your search or filter to find more books.
          </p>
        </div>
      )}
    </div>
  );
}
