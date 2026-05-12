import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import { Home, Users, AlertTriangle, ClipboardList, BarChart3, LogOut } from "lucide-react";

const NAV = [
  { to: "/teacher", label: "Overview", icon: Home, exact: true },
  { to: "/teacher/students", label: "Students", icon: Users },
  { to: "/teacher/alerts", label: "Alerts", icon: AlertTriangle },
  { to: "/teacher/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/teacher/reports", label: "Reports", icon: BarChart3 },
];

export function TeacherLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-64 bg-sidebar border-r flex flex-col p-4 sticky top-0 h-screen">
        <Link to="/"><Logo /></Link>
        <nav className="mt-6 space-y-1 flex-1">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-sidebar-accent text-sidebar-foreground"}`}>
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-xl bg-card border p-3 text-sm">
          <div className="font-semibold">Mrs. Mukamana</div>
          <div className="text-xs text-muted-foreground">P6 Teacher · 28 students</div>
          <Link to="/login" className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><LogOut className="h-3 w-3" /> Switch role</Link>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
        <Outlet />
      </main>
      <AccessibilityBar />
    </div>
  );
}