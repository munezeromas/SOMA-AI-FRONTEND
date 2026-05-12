import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export const Route = createFileRoute("/teacher/assignments")({
  head: () => ({ meta: [{ title: "Assignments — Soma AI" }] }),
  component: Assignments,
});

function Assignments() {
  const [items, setItems] = useState([
    { title: "Fractions Practice", subject: "Math", due: "Fri", count: 28 },
    { title: "Reading Log", subject: "English", due: "Sun", count: 28 },
    { title: "Plant Quiz", subject: "Science", due: "Wed", count: 14 },
  ]);
  const [title, setTitle] = useState("");
  const add = () => { if (!title.trim()) return; setItems([{title, subject:"Math", due:"Mon", count:28}, ...items]); setTitle(""); };
  return (
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="text-3xl font-bold">Assignments</h1><p className="text-muted-foreground">Create and assign work to your class.</p></div>
      <div className="rounded-2xl border bg-card p-4 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New assignment title..." className="flex-1 rounded-full border px-4 py-2 text-sm" />
        <Button onClick={add}><Plus className="h-4 w-4 mr-1" />Create</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((a, i) => (
          <div key={i} className="rounded-2xl border bg-card p-4">
            <FileText className="h-5 w-5 text-primary" />
            <div className="font-bold mt-2">{a.title}</div>
            <div className="text-xs text-muted-foreground">{a.subject} · Due {a.due}</div>
            <div className="text-sm mt-2">Assigned to {a.count} students</div>
          </div>
        ))}
      </div>
    </div>
  );
}
