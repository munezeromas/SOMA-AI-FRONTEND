import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CLASS_STUDENTS } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/teacher/students")({
  head: () => ({ meta: [{ title: "Students — Soma AI" }] }),
  component: Students,
});

function Students() {
  const [q, setQ] = useState("");
  const list = CLASS_STUDENTS.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6 max-w-6xl">
      <div><h1 className="text-3xl font-bold">Students</h1><p className="text-muted-foreground">Search and review individual progress.</p></div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-3 py-2 rounded-full border" />
      </div>
      <div className="rounded-2xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="p-3">Name</th><th className="p-3">Mastery</th><th className="p-3">Dyslexia</th><th className="p-3">Last active</th><th className="p-3">Risk</th></tr></thead>
          <tbody>
            {list.map(s => (
              <tr key={s.id} className="border-t hover:bg-muted/30">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3"><div className="flex items-center gap-2"><div className="w-24 h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width:`${s.mastery}%`}} /></div><span>{s.mastery}%</span></div></td>
                <td className="p-3">{s.dyslexia ? "✓" : "—"}</td>
                <td className="p-3 text-muted-foreground">{s.lastActive}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.risk==="high"?"bg-destructive/10 text-destructive":s.risk==="medium"?"bg-accent/30 text-accent-foreground":"bg-success/10 text-success"}`}>{s.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
