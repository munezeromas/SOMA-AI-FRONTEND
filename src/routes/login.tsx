import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/soma/Logo";
import { useState } from "react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Soma AI" }] }),
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
  "Kigali International Community School"
];

function Login() {
  const [studentId, setStudentId] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [showSchools, setShowSchools] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");

  const filteredSchools = RWANDAN_SCHOOLS.filter(s =>
    s.toLowerCase().includes(school.toLowerCase())
  );

  return (
    <div className="sky-bg min-h-screen flex flex-col font-['Nunito'] relative overflow-hidden">
      {/* Animated background clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[3%] animate-cloud-drift" style={{ animationDuration: "7s" }}>
          <CloudShape width={120} opacity={0.8} />
        </div>
        <div className="absolute top-[10%] right-[6%] animate-cloud-drift delay-500" style={{ animationDuration: "9s" }}>
          <CloudShape width={95} opacity={0.75} />
        </div>
        <div className="absolute bottom-[15%] left-[8%] animate-cloud-drift delay-1000" style={{ animationDuration: "8s" }}>
          <CloudShape width={110} opacity={0.7} />
        </div>
        <div className="absolute bottom-[20%] right-[4%] animate-cloud-drift delay-200" style={{ animationDuration: "6s" }}>
          <CloudShape width={130} opacity={0.8} />
        </div>
        {/* Stars */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute text-yellow-300 animate-star-twinkle" style={{
            left: `${8 + i * 15}%`, top: `${3 + (i % 2) * 6}%`,
            fontSize: `${10 + (i % 3) * 5}px`, animationDelay: `${i * 0.5}s`
          }}>✦</div>
        ))}
      </div>



      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-[#1A3A5C] font-black text-sm flex items-center gap-1 hover:opacity-70 transition-opacity">
          ← Back
        </Link>
        <Logo size={40} />
        <div className="w-16" />
      </header>

      {/* Main login card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        
        {/* Floating Mascot in the middle, upward */}
        <div className="flex items-end justify-center mb-[-2rem] relative z-20 pointer-events-none">
          <div className="h-40 w-40 animate-float-slow" style={{ animationDuration: "5s" }}>
            <RiveAnimation src="/riv-animations/5573-10970-login2.riv" className="w-full h-full drop-shadow-2xl" />
          </div>
        </div>

        <div className="card-cloud w-full max-w-sm p-8 animate-slide-up relative z-10">
          {/* Title */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">👋</div>
            <h1 className="text-2xl font-black text-[#1A3A5C]">Welcome back!</h1>
            <p className="text-sm font-semibold text-[#4A6A8A] mt-1">Sign in to continue your adventure</p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1 rounded-2xl mb-6" style={{ background: "rgba(74,144,217,0.1)" }}>
            <button
              id="role-student"
              onClick={() => setRole("student")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${
                role === "student"
                  ? "bg-white text-[#4A90D9] shadow-md"
                  : "text-[#4A6A8A]"
              }`}
            >
              🎒 Student
            </button>
            <button
              id="role-teacher"
              onClick={() => setRole("teacher")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${
                role === "teacher"
                  ? "bg-white text-[#4A90D9] shadow-md"
                  : "text-[#4A6A8A]"
              }`}
            >
              👩‍🏫 Teacher
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Student ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                Student ID
              </label>
              <input
                id="input-student-id"
                type="text"
                placeholder="SOMA-XXXX-XXXX"
                className="w-full h-12 rounded-2xl px-5 text-sm font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
                style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>

            {/* School */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                Your School
              </label>
              <input
                id="input-school"
                type="text"
                placeholder="Search your school..."
                className="w-full h-12 rounded-2xl px-5 text-sm font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
                style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                value={school}
                onFocus={() => setShowSchools(true)}
                onChange={(e) => { setSchool(e.target.value); setShowSchools(true); }}
              />
              {showSchools && filteredSchools.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#E8F0FF] overflow-hidden z-50 shadow-lg">
                  <div className="max-h-36 overflow-y-auto">
                    {filteredSchools.map(s => (
                      <button
                        key={s}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold hover:bg-[#F0F8FF] transition-colors text-[#4A6A8A] hover:text-[#4A90D9]"
                        onClick={() => { setSchool(s); setShowSchools(false); }}
                      >
                        🏫 {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                Password
              </label>
              <input
                id="input-password"
                type="password"
                placeholder="••••••••"
                className="w-full h-12 rounded-2xl px-5 text-sm font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
                style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign In Button */}
            <Link
              to={role === "student" ? "/student" : "/teacher"}
              id="btn-login-submit"
              className="btn-play btn-play-primary w-full py-4 text-base font-black block text-center mt-2"
            >
              Let's Go! 🚀
            </Link>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(74,144,217,0.15)" }} />
            <span className="text-xs font-bold text-[#4A6A8A]">or try a demo</span>
            <div className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(74,144,217,0.15)" }} />
          </div>

          {/* Demo Buttons */}
          <div className="flex gap-3">
            <Link
              to="/student"
              id="btn-demo-student"
              className="btn-play btn-play-secondary flex-1 py-3 text-xs font-black"
            >
              🎒 Demo Student
            </Link>
            <Link
              to="/teacher"
              id="btn-demo-teacher"
              className="btn-play btn-play-secondary flex-1 py-3 text-xs font-black"
            >
              👩‍🏫 Demo Teacher
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center">
        <p className="text-xs font-bold text-[#1A3A5C] opacity-60">© 2026 Soma AI · Authentic African Education 🌍</p>
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