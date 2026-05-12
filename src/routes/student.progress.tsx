import { createFileRoute } from "@tanstack/react-router";
import { PROGRESS_DATA, MASTERY, STUDENT } from "@/lib/mock-data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, CartesianGrid } from "recharts";
import { Trophy, Flame } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/progress")({
  head: () => ({ meta: [{ title: "Progress — Soma AI" }] }),
  component: Progress,
});

function Progress() {
  return (
    <div className="space-y-6 max-w-6xl relative">
      <div className="absolute right-0 -top-10 h-64 w-64 hidden lg:block opacity-30 pointer-events-none z-0">
          <RiveAnimation src="/riv-animations/4192-8705-lifespan-timeline.riv" className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">Look how far you've come!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-5">
          <Flame className="h-5 w-5 text-warm" />
          <div className="text-3xl font-bold mt-2">{STUDENT.streak}</div>
          <div className="text-sm text-muted-foreground">Day streak</div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <Trophy className="h-5 w-5 text-accent-foreground" />
          <div className="text-3xl font-bold mt-2">{STUDENT.badges.length}</div>
          <div className="text-sm text-muted-foreground">Badges earned</div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <div className="text-xs text-muted-foreground">XP to next level</div>
          <div className="text-3xl font-bold mt-1">{STUDENT.xp}/2000</div>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${(STUDENT.xp/2000)*100}%` }} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3">Weekly improvement</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={PROGRESS_DATA}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="math" stroke="hsl(215 80% 50%)" strokeWidth={3} />
                <Line type="monotone" dataKey="english" stroke="hsl(85 60% 50%)" strokeWidth={3} />
                <Line type="monotone" dataKey="science" stroke="hsl(30 90% 60%)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="font-bold mb-3">Subject mastery</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={MASTERY}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar dataKey="value" stroke="hsl(215 80% 50%)" fill="hsl(215 80% 50%)" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <h2 className="font-bold mb-3">XP this week</h2>
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={[{d:"Mon",xp:120},{d:"Tue",xp:200},{d:"Wed",xp:80},{d:"Thu",xp:240},{d:"Fri",xp:300},{d:"Sat",xp:180},{d:"Sun",xp:140}]}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="d" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="xp" fill="hsl(215 80% 50%)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}