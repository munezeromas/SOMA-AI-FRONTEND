import { createFileRoute } from "@tanstack/react-router";
import { CLASS_STUDENTS } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/alerts")({
  head: () => ({ meta: [{ title: "Alerts — Soma AI" }] }),
  component: Alerts,
});

function Alerts() {
  const at = CLASS_STUDENTS.filter(s => s.risk !== "low");
  return (
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="text-3xl font-bold">Struggling Learner Alerts</h1><p className="text-muted-foreground">Students who may need extra support.</p></div>
      <div className="space-y-3">
        {at.map(s => (
          <div key={s.id} className={`rounded-2xl border-l-4 ${s.risk==="high"?"border-destructive bg-destructive/5":"border-accent bg-accent/5"} p-4 flex items-center justify-between gap-3`}>
            <div className="flex gap-3 items-start">
              <AlertTriangle className={`h-5 w-5 ${s.risk==="high"?"text-destructive":"text-accent-foreground"}`} />
              <div>
                <div className="font-bold">{s.name}</div>
                <div className="text-sm text-muted-foreground">Mastery {s.mastery}% · Last active {s.lastActive}</div>
                <div className="text-sm mt-1">Suggested: {s.dyslexia ? "Dyslexia-friendly notes + 1:1 reading" : "Extra practice + motivational chat"}</div>
              </div>
            </div>
            <Button size="sm">Reach out</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
