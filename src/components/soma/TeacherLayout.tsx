import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { AccessibilityBar } from "./AccessibilityBar";
import { Home, Users, AlertTriangle, ClipboardList, BarChart3, LogOut, Menu } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { Drawer } from "vaul";

const NAV = [
  { to: "/teacher", label: "Overview", icon: Home, exact: true, emoji: "🏠" },
  { to: "/teacher/students", label: "Students", icon: Users, emoji: "👧" },
  { to: "/teacher/alerts", label: "Alerts", icon: AlertTriangle, emoji: "🔔" },
  { to: "/teacher/assignments", label: "Tasks", icon: ClipboardList, emoji: "📋" },
  { to: "/teacher/reports", label: "Reports", icon: BarChart3, emoji: "📊" },
];

export function TeacherLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: theme === "dark" 
          ? "linear-gradient(180deg, #060D1A 0%, #0A1628 40%, #0D2044 100%)"
          : "linear-gradient(180deg, #5BC8F5 0%, #87CEEB 40%, #B8E4F9 100%)",
        backgroundAttachment: "fixed",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* ── TOP NAV BAR (MOBILE & DESKTOP) ── */}
      <header className="nav-top sticky top-0 z-50 px-4 py-3 flex items-center justify-between relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <Link to="/">
            <Logo size={34} lightBg={theme === "light"} />
          </Link>
          <span className="hidden md:block text-xs font-black text-[#1A3A5C] opacity-70 dark:text-[#7BB8F0]">
            Teacher Portal
          </span>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className={`theme-toggle-btn ${theme}`}
          >
            <div className="theme-toggle-knob" />
            <span
              className="absolute inset-0 flex items-center justify-center text-[10px] pointer-events-none select-none"
              style={{ paddingLeft: theme === "light" ? "18px" : "4px" }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </span>
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black bg-gradient-to-tr from-[#4A90D9] to-[#2D6DB5] shadow-sm">
            M
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar (Desktop Only) */}
        <aside className="hidden lg:flex flex-col w-64 p-4 sticky top-[62px] h-[calc(100vh-62px)] shrink-0 sidebar-kids">
          <nav className="flex-1 space-y-1 mt-4">
            {NAV.map((n) => {
              const active = n.exact ? path === n.to : path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`sidebar-nav-item ${active ? "active" : ""}`}
                >
                  <span className="text-xl">{n.emoji}</span>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          {/* Teacher card */}
          <div className="rounded-3xl p-4 mt-4 shadow-clay-puffy-sm" style={{ background: theme === 'dark' ? "rgba(74,144,217,0.05)" : "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-inner" style={{ background: "linear-gradient(135deg, #4A90D9, #2D6DB5)" }}>
                M
              </div>
              <div>
                <div className="font-black text-sm dark:text-white text-[#1A3A5C]">Mrs. Mukamana</div>
                <div className="text-[10px] font-bold text-[#4A6A8A]">P6 · 28 students</div>
              </div>
            </div>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 mt-4 py-2 rounded-2xl text-xs font-bold text-[#E74C3C] hover:bg-[#E74C3C]/10 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Switch role
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden pb-28 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <div className="lg:hidden glass-nav-mobile fixed bottom-0 left-0 right-0 z-50 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around px-2 py-3">
          {NAV.slice(0, 4).map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-300 ${active ? '-translate-y-2' : ''}`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-2xl transition-all shadow-sm ${active ? 'bg-[#4A90D9] text-white shadow-clay-puffy' : 'bg-transparent filter grayscale opacity-60'}`}>
                  {n.emoji}
                </div>
                <span className={`text-[10px] font-black ${active ? 'text-[#4A90D9] opacity-100' : 'text-muted-foreground opacity-60'}`}>{n.label}</span>
              </Link>
            );
          })}

          {/* "More" Drawer Trigger */}
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <button className="flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl text-2xl bg-transparent filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0">
                  🍔
                </div>
                <span className="text-[10px] font-black text-muted-foreground opacity-60">More</span>
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
              <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] max-h-[85vh] flex flex-col rounded-t-[2.5rem] bg-card outline-none shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
                <div className="p-4 flex-1 overflow-y-auto rounded-t-[2.5rem]">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/30 mb-8" />
                  <Drawer.Title className="font-black text-2xl mb-6 text-center">🎒 More Tools</Drawer.Title>
                  <div className="grid grid-cols-4 gap-4 px-2 pb-8">
                    {NAV.slice(4).map((n) => (
                      <Drawer.Close asChild key={n.to}>
                        <Link to={n.to} className="flex flex-col items-center gap-2 group">
                          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-3xl shadow-clay-puffy-sm group-hover:scale-110 transition-transform">
                            {n.emoji}
                          </div>
                          <span className="text-[10px] font-black text-center leading-tight">{n.label}</span>
                        </Link>
                      </Drawer.Close>
                    ))}
                    {/* Logout */}
                    <Drawer.Close asChild>
                      <Link to="/login" className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shadow-clay-puffy-sm group-hover:scale-110 transition-transform">
                          <LogOut className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black text-destructive text-center leading-tight">Switch</span>
                      </Link>
                    </Drawer.Close>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>

      <AccessibilityBar />
    </div>
  );
}