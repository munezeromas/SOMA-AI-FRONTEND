import { createFileRoute, Link } from "@tanstack/react-router";
import { LIBRARY_BOOKS } from "@/lib/library-data";
import { BookCover } from "@/components/soma/BookCover";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/library")({
  head: () => ({ meta: [{ title: "Digital Library — Soma AI" }] }),
  component: Library,
});

function Library() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const books = LIBRARY_BOOKS.filter(b => b.type === "PB" && 
    (filter === "All" || b.grade === filter) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-10 max-w-7xl animate-fade-in pb-20 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <h1 className="text-huge">Digital <span className="text-primary">Library</span></h1>
          <p className="text-xl text-muted-foreground font-medium">Access your curated cognitive growth resources.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search books..." 
              className="pl-10 pr-4 py-2.5 rounded-xl bg-card border border-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-white/5">
            {["All", "P1", "P2", "P3", "P4", "P5", "P6"].map(g => (
              <button 
                key={g} 
                onClick={() => setFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${filter === g ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {books.map((b) => (
          <Link 
            key={b.id} 
            to="/student/read" 
            search={{ file: b.file, title: b.title }}
            className="group space-y-4 hover:-translate-y-2 transition-all duration-500"
          >
            <div className="aspect-[3/4] relative">
              <BookCover title={b.title} file={b.file} subject={b.subject} />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-2xl" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white group-hover:text-primary transition-colors truncate uppercase tracking-tight">{b.title}</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-0.5">{b.grade} · {b.subject}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {books.length === 0 && (
        <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-white/10">
          <p className="text-muted-foreground font-medium">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
}

