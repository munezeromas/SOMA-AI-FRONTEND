import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/soma/Logo";
import { useState } from "react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";
import { 
  GraduationCap, 
  Presentation, 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  Eye,
  EyeOff
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Soma AI" }] }),
  component: Login,
});

function Login() {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      {/* Absolute positioned Header to avoid pushing layout down */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-2">
        <Link to="/" className="text-[#1A3A5C] font-black text-sm flex items-center gap-1 hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <Logo size={36} />
        <div className="w-16" />
      </header>

      {/* Main login card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-14 pb-4">
        <div 
          className="w-full max-w-2xl p-8 animate-slide-up relative z-10 flex flex-col md:flex-row items-stretch gap-8 clay-card shadow-clay-puffy"
        >
          {/* Left Part: Mascot Rive Animation & Welcome Message */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-[180px] border-b md:border-b-0 md:border-r border-[#4A90D9]/15 pb-4 md:pb-0 md:pr-8">
            <div className="h-32 w-32 animate-float-slow" style={{ animationDuration: "5s" }}>
              <RiveAnimation src="/riv-animations/5573-10970-login2.riv" className="w-full h-full drop-shadow-sm" />
            </div>
            <div className="text-center mt-2 flex flex-col items-center">
              {isRegister ? (
                <>
                  <h1 className="text-base font-black text-[#1A3A5C]">Join the Adventure!</h1>
                  <p className="text-[10px] font-semibold text-[#4A6A8A] mt-0.5">Create an account to start learning</p>
                </>
              ) : (
                <>
                  <h1 className="text-base font-black text-[#1A3A5C]">Welcome back!</h1>
                  <p className="text-[10px] font-semibold text-[#4A6A8A] mt-0.5">Sign in to continue your adventure</p>
                </>
              )}
            </div>
          </div>

          {/* Right Part: Login Form */}
          <div className="flex-1 w-full max-w-xs flex flex-col justify-center">
            {/* Role Toggle */}
            <div className="flex p-0.5 rounded-lg mb-3" style={{ background: "rgba(74,144,217,0.1)" }}>
              <button
                id="role-student"
                onClick={() => setRole("student")}
                className={`flex-1 py-1.5 rounded text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                  role === "student"
                    ? "bg-white text-[#4A90D9]"
                    : "text-[#4A6A8A] hover:text-[#4A90D9]"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" /> Student
              </button>
              <button
                id="role-teacher"
                onClick={() => setRole("teacher")}
                className={`flex-1 py-1.5 rounded text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                  role === "teacher"
                    ? "bg-white text-[#4A90D9]"
                    : "text-[#4A6A8A] hover:text-[#4A90D9]"
                }`}
              >
                <Presentation className="w-3.5 h-3.5" /> Teacher
              </button>
            </div>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name (Registration only) */}
              {isRegister && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                    Full Name
                  </label>
                  <input
                    id="input-full-name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-9 rounded-lg px-4 text-xs font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
                    style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}

              {/* ID */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                  {role === "student" ? "Student ID" : "Teacher ID"}
                </label>
                <input
                  id="input-student-id"
                  type="text"
                  placeholder={role === "student" ? "SOMA-SANMARCO-011" : "TCH-XXXX-XXXX"}
                  className="w-full h-9 rounded-lg px-4 text-xs font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
                  style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="input-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-9 rounded-lg px-4 pr-10 text-xs font-bold outline-none transition-all border-2 border-transparent focus:border-[#4A90D9]"
                    style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6A8A] hover:text-[#4A90D9] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password — registration only */}
              {isRegister && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#1A3A5C] uppercase tracking-wide ml-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="input-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full h-9 rounded-lg px-4 pr-10 text-xs font-bold outline-none transition-all border-2 ${
                        confirmPassword && confirmPassword !== password
                          ? "border-red-400"
                          : confirmPassword && confirmPassword === password
                          ? "border-green-400"
                          : "border-transparent focus:border-[#4A90D9]"
                      }`}
                      style={{ background: "rgba(74,144,217,0.08)", color: "#1A3A5C" }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6A8A] hover:text-[#4A90D9] transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">Passwords don't match</p>
                  )}
                </div>
              )}

              {/* Action Button */}
              <Link
                to={role === "student" ? "/student" : "/teacher"}
                id="btn-login-submit"
                className="clay-btn w-full py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 mt-4 text-white"
                style={{ background: "linear-gradient(135deg, #4A90D9, #2D6DB5)" }}
              >
                {isRegister ? "Start Adventure!" : "Let's Go!"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </form>

            {/* Toggle Sign In / Register Mode */}
            <div className="text-center mt-3.5">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-[10px] font-black text-[#4A90D9] hover:underline"
              >
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-2 text-center flex items-center justify-center gap-1">
        <p className="text-[10px] font-bold text-[#1A3A5C] opacity-60">
          © 2026 Soma AI · Authentic African Education
        </p>
        <Globe className="w-3 h-3 text-[#1A3A5C] opacity-60" />
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
