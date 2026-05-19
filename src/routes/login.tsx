import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";
import login from "@/assets/login.jpg";
import logo2 from "@/assets/logo2.png";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Soma AI" }] }),
  component: Login,
});

const RWANDAN_SCHOOLS = [
  "Riviera High School",
  "Gashora Girls Academy of Science and Technology",
  "Green Hills Academy",
  "FAWE Girls' School",
  "Lycée de Kigali",
  "Agahozo-Shalom Youth Village",
  "White Dove Global School",
  "Nu-Vision High School",
  "Wellspring Academy",
  "King David Academy",
  "ES Caf Muhese",
  "Groupe Scolaire Officiel de Butare",
  "Groupe Scolaire Sainte Bernadette de Save",
  "Collège du Christ-Roi",
  "Petit Séminaire Virgo Fidelis",
  "École des Sciences Byimana",
  "Stella Matutina",
  "Sonrise High School",
  "Hope Haven Rwanda",
  "Kigali International Community School",
];

function Login() {
  const [mode, setMode]           = useState<"login" | "register">("login");
  const [role, setRole]           = useState<"student" | "teacher">("student");
  const [studentId, setStudentId] = useState("");
  const [school, setSchool]       = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [name, setName]           = useState("");
  const [showSchools, setShowSchools] = useState(false);

  const filteredSchools = RWANDAN_SCHOOLS.filter(s =>
    s.toLowerCase().includes(school.toLowerCase())
  );

  return (
    /* ── Page shell: striped lavender bg matching hero ── */
    <div
      className="min-h-screen flex flex-col font-sans selection:bg-[#00C36B]/30"
      style={{
        background: "#f5f0f5",
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(150,130,180,0.10) 0px, rgba(150,130,180,0.10) 1px, transparent 1px, transparent 48px)",
      }}
    >
      {/* ── Minimal top bar ── */}
      <header className="py-4 px-8 flex items-center justify-between">
       
        <Link
          to="/"
          className="text-xm font-bold text-black hover:text-[#0F172A] transition-colors flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </header>

      {/* ── Card ── */}
      <main className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-5xl bg-white rounded-[36px] overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100">

          {/* ── LEFT: image panel ── */}
          <div className="hidden md:block md:w-/12 relative overflow-hidden bg-[#e8e0f0] brightness-80">
            <img
              src={login}
              alt="Student learning"
              className="w- h-full object-cover object-top"
            />
            {/* bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2563EB]/80 to-transparent" />
            {/* caption */}
            <div className="absolute bottom-8 left-7 right-7 z-10">
              <p className="text-[20px] font-black text-white/90 uppercase tracking-widest mb-1">
                Soma AI
              </p>
              <h2 className="text-l  font-black text-white leading-snug">
                Welcome Back!<br />
              </h2>
            </div>
          </div>

          {/* ── RIGHT: form panel ── */}
          <div className="w-full md:w-7/12 p-8 lg:p-10 flex flex-col gap-1 bg-white">

            {/* Logo icon + heading */}
            <div className="flex flex-col items-center gap- text-center">
              
                <img src={logo2} alt="" className="h-20 w-auto object-contain " />
              
              <div>
                <h1 className="text-2xl font-black text-[#0F172A]">
                  {mode === "login" ? "Welcome back!" : "Create account"}
                </h1>
                <p className="text-xs text-[#94A3B8] font-semibold mt-0.5">
                  {mode === "login"
                    ? "Sign in to your study hub"
                    : "Join thousands of Rwandan students"}
                </p>
              </div>
            </div>

            {/* Role toggle */}
            <div className="flex p-1 bg-[#F8FAFC] rounded-xl border border-gray-100">
              {(["student", "teacher"] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 h-9 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                    role === r
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-[#94A3B8] hover:text-[#475569]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>

              {/* Name — register only */}
              {mode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="h-12 rounded-2xl border border-gray-200 bg-[#F8FAFC] px-5 text-sm font-semibold placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>
              )}

              {/* Student ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">
                  Student ID
                </label>
                <input
                  type="text"
                  placeholder="SOMA-XXXX-XXXX"
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 bg-[#F8FAFC] px-5 text-sm font-semibold placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
              </div>

              {/* School — register only */}
              {mode === "register" && (
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">
                    Your School
                  </label>
                  <input
                    type="text"
                    placeholder="Search your school..."
                    value={school}
                    onFocus={() => setShowSchools(true)}
                    onChange={e => { setSchool(e.target.value); setShowSchools(true); }}
                    className="h-12 rounded-2xl border border-gray-200 bg-[#F8FAFC] px-5 text-sm font-semibold placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                  {showSchools && filteredSchools.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl border border-gray-100 shadow-lg z-50 overflow-hidden">
                      <div className="max-h-40 overflow-y-auto">
                        {filteredSchools.map(s => (
                          <button
                            key={s}
                            type="button"
                            className="w-full px-5 py-2.5 text-left text-xs font-semibold text-[#475569] hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors"
                            onClick={() => { setSchool(s); setShowSchools(false); }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 bg-[#F8FAFC] px-5 text-sm font-semibold placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
              </div>

              {/* Confirm password — register only */}
              {mode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    className="h-12 rounded-2xl border border-gray-200 bg-[#F8FAFC] px-5 text-sm font-semibold placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                  />
                </div>
              )}

              {/* Forgot password — login only */}
              {mode === "login" && (
                <div className="text-right -mt-1">
                  <button type="button" className="text-xs font-bold text-[#94A3B8] hover:text-[#2563EB] transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <Button
                className="w-full h-12 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm transition-all hover:scale-[1.02] active:scale-95 mt-1"
                asChild
              >
                <Link to={role === "student" ? "/student" : "/teacher"}>
                  {mode === "login" ? "Login" : "Create Account"}
                </Link>
              </Button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[10px] font-bold text-[#CBD5E1] uppercase tracking-widest shrink-0">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Quick demo buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2563EB] border-[#2563EB]/30 hover:bg-[#EFF6FF] bg-white" asChild>
                  <Link to="/student">Demo Student</Link>
                </Button>
                <Button variant="outline" className="h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#475569] border-gray-200 hover:bg-gray-50 bg-white" asChild>
                  <Link to="/teacher">Demo Teacher</Link>
                </Button>
              </div>
            </form>

            {/* Switch mode */}
            <p className="text-center text-xs text-[#94A3B8] font-semibold">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-[#2563EB] font-black hover:underline"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#2563EB] font-black hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
          © 2026 Soma AI Education · Authentic African Impact
        </p>
      </footer>
    </div>
  );
}

function CloudShape({ width = 120, opacity = 0.9 }: { width?: number; opacity?: number }) {
  const h = width * 0.55;
  return (
    <svg width={width} height={h} viewBox="0 0 120 66" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <ellipse cx="60" cy="46" rx="55" ry="20" fill="white" />
      <circle cx="38" cy="38" r="20" fill="white" />
      <circle cx="62" cy="28" r="26" fill="white" />
      <circle cx="85" cy="38" r="18" fill="white" />
    </svg>
  );
}