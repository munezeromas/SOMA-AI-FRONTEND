import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { PROGRESS_DATA, MASTERY } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/reports")({
  head: () => ({ meta: [{ title: "Reports — Soma AI" }] }),
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Class Reports</h1><p className="text-muted-foreground">Performance overview by subject.</p></div>
        <Button variant="outline" onClick={() => alert("Demo: PDF export coming soon")}><Download className="h-4 w-4 mr-1" /> Export</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3">Subject mastery</h2>
          <div className="h-64"><ResponsiveContainer><BarChart data={MASTERY}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="subject" /><YAxis /><Tooltip /><Bar dataKey="value" fill="hsl(215 80% 50%)" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3">Class progress over time</h2>
          <div className="h-64"><ResponsiveContainer><LineChart data={PROGRESS_DATA}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="week" /><YAxis /><Tooltip /><Line type="monotone" dataKey="math" stroke="hsl(215 80% 50%)" strokeWidth={3} /><Line type="monotone" dataKey="english" stroke="hsl(85 60% 50%)" strokeWidth={3} /><Line type="monotone" dataKey="science" stroke="hsl(30 90% 60%)" strokeWidth={3} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}
