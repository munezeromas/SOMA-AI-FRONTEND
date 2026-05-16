import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import { Home, Users, AlertTriangle, ClipboardList, BarChart3, LogOut } from "lucide-react";

const NAV = [
  { to: "/teacher", label: "Overview", icon: Home, exact: true, emoji: "🏠" },
  { to: "/teacher/students", label: "Students", icon: Users, emoji: "👧" },
  { to: "/teacher/alerts", label: "Alerts", icon: AlertTriangle, emoji: "🔔" },
  { to: "/teacher/assignments", label: "Assignments", icon: ClipboardList, emoji: "📋" },
  { to: "/teacher/reports", label: "Reports", icon: BarChart3, emoji: "📊" },
];

export function TeacherLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "linear-gradient(180deg, #5BC8F5 0%, #87CEEB 40%, #B8E4F9 100%)",
        backgroundAttachment: "fixed",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside className="w-60 flex flex-col p-4 sticky top-0 h-screen shrink-0 sidebar-kids">
        <Link to="/" className="mb-6 block">
          <Logo size={36} />
        </Link>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`sidebar-nav-item ${active ? "active" : ""}`}
              >
                <span className="text-lg">{n.emoji}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>
        {/* Teacher card */}
        <div className="rounded-2xl p-4 mt-4" style={{ background: "rgba(74,144,217,0.1)", border: "2px solid rgba(255,255,255,0.7)" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style={{ background: "linear-gradient(135deg, #4A90D9, #2D6DB5)" }}>
              M
            </div>
            <div>
              <div className="font-black text-sm text-[#1A3A5C]">Mrs. Mukamana</div>
              <div className="text-xs font-semibold text-[#4A6A8A]">P6 · 28 students</div>
            </div>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-2 text-xs font-bold text-[#4A6A8A] hover:text-[#4A90D9] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Switch role
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
        <Outlet />
      </main>
      <AccessibilityBar />
    </div>
  );
}