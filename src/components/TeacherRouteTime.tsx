import React, { useEffect, useState } from "react";
import { getTotals, formatHours, clearTotals } from "@/lib/routeTime";

type Props = {
  routes?: string[]; // route keys (e.g. '/student/homework' or 'homework')
};

export function TeacherRouteTime({ routes = ["homework", "games"] }: Props) {
  const [totals, setTotals] = useState<Record<string, number>>(getTotals());

  useEffect(() => {
    const id = setInterval(() => setTotals(getTotals()), 3000);
    return () => clearInterval(id);
  }, []);

  const handleClear = () => {
    clearTotals();
    setTotals({});
  };

  return (
    <div className="p-3 bg-white/6 rounded-lg border border-white/10 text-white text-sm">
      <div className="flex items-center justify-between mb-2">
        <strong>Teacher — Time Spent</strong>
        <button onClick={handleClear} className="text-xs text-blue-200 hover:text-white">Clear</button>
      </div>
      <div className="flex flex-col gap-1">
        {routes.map(r => (
          <div key={r} className="flex items-center justify-between">
            <span className="capitalize">{r.replace(/^\//, "")}</span>
            <span className="font-mono">{formatHours(totals[r] || 0)} h</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherRouteTime;
