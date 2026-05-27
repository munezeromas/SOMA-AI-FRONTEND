import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/soma/Logo";
import { useState } from "react";
import {
  GraduationCap, Presentation, Eye, EyeOff, Github,
  ArrowLeft, Mail, CheckCircle,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Soma AI" }] }),
  component: Login,
});

type Screen = "login" | "register" | "forgot" | "forgot-success";

/* ─── Background decoration ─── */
function BgShapes() {
  return (
    <>
      {/* ring top-left */}
      <div className="absolute w-24 h-24 rounded-full border-[16px] border-blue-500 top-[12%] left-[8%] rotate-45 opacity-80 drop-shadow-[0_10px_20px_rgba(37,99,235,0.5)]" />
      {/* zigzag top-left */}
      <div className="absolute top-[32%] left-[5%] flex flex-col gap-1 opacity-90">
        <div className="w-14 h-5 bg-blue-200 rounded-full -rotate-45" />
        <div className="w-14 h-5 bg-blue-300 rounded-full rotate-45 ml-5" />
        <div className="w-14 h-5 bg-blue-400 rounded-full -rotate-45 ml-10" />
      </div>
      {/* wavy svg right */}
      <div className="absolute top-[10%] right-[5%] opacity-75">
        <svg viewBox="0 0 220 200" className="w-64 h-64 drop-shadow-[0_15px_15px_rgba(37,99,235,0.4)]">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <path d="M 10,50 Q 55,-20 100,50 T 190,50" fill="none" stroke="url(#g1)" strokeWidth="18" strokeLinecap="round" />
          <path d="M 30,130 Q 75,55 120,130 T 210,130" fill="none" stroke="url(#g2)" strokeWidth="18" strokeLinecap="round" />
        </svg>
      </div>
      {/* swirl bottom-left */}
      <div className="absolute w-44 h-44 rounded-full border-[20px] border-transparent border-t-blue-400 border-l-blue-500 border-b-blue-600 bottom-[18%] left-[6%] -rotate-12 opacity-75 blur-[1px]" />
      {/* blob bottom-right */}
      <div className="absolute bottom-[6%] right-[8%] w-56 h-14 bg-gradient-to-r from-blue-400 to-blue-600 opacity-90" style={{ borderRadius: "50px 20px 80px 30px" }} />
      {/* squiggles bottom-right */}
      <div className="absolute bottom-[28%] right-[22%] flex flex-col gap-2 opacity-90">
        <div className="w-12 h-3 bg-blue-300 rounded-full -rotate-12" />
        <div className="w-12 h-3 bg-blue-400 rounded-full rotate-12 ml-4" />
      </div>
      {/* glowing orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
    </>
  );
}

/* ─── Social buttons ─── */
function SocialButtons() {
  return (
    <div className="mt-7 text-center">
      <p className="text-[11px] text-white/60 mb-4 tracking-wider uppercase">or continue with</p>
      <div className="flex gap-4">
        <button className="flex-1 py-3 bg-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-md transition-all font-semibold text-sm text-gray-700">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
        <button className="flex-1 py-3 bg-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-md transition-all font-semibold text-sm text-gray-700">
          <Github className="w-5 h-5 text-gray-900" />
          GitHub
        </button>
      </div>
    </div>
  );
}

/* ─── Input helper ─── */
function Field({ id, label, type = "text", placeholder, value, onChange, right }: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; right?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/90 mb-2" htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          id={id} type={type} placeholder={placeholder}
          className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-300/40 font-medium transition-all"
          style={{ paddingRight: right ? "2.75rem" : undefined }}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("login");
  const [role, setRole] = useState<"student" | "teacher">("student");

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  // Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegConf, setShowRegConf] = useState(false);

  // Forgot
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: role === "student" ? "/student" : "/teacher" });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: role === "student" ? "/student" : "/teacher" });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen("forgot-success");
  };

  const pwMatch = regConfirm && regConfirm === regPassword;
  const pwNoMatch = regConfirm && regConfirm !== regPassword;

  /* ── Role Switcher (shared) ── */
  const RoleSwitcher = () => (
    <div className="flex bg-white/8 rounded-full p-1 mb-7 border border-white/10">
      {(["student", "teacher"] as const).map(r => (
        <button
          key={r}
          type="button"
          onClick={() => setRole(r)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold transition-all duration-300
            ${role === r ? "bg-white/25 text-white shadow-lg" : "text-white/55 hover:text-white"}`}
        >
          {r === "student" ? <GraduationCap className="w-4 h-4" /> : <Presentation className="w-4 h-4" />}
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "linear-gradient(135deg, #02488a 0%, #00224a 50%, #001535 100%)" }}
    >
      <BgShapes />

      <div className="w-full max-w-[430px] relative z-10 px-4 py-10 flex flex-col items-center">
        {/* Card */}
        <div className="w-full rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.55)] border border-white/15 backdrop-blur-2xl bg-white/10 overflow-hidden">
          
          {/* ════════════════ LOGIN ════════════════ */}
          {screen === "login" && (
            <div className="p-10">
              <div className="flex justify-center mb-8">
                <Link to="/" className="hover:scale-105 transition-transform">
                  <Logo size={44} lightBg={false} />
                </Link>
              </div>

              <h2 className="text-[1.8rem] font-bold text-white mb-1 tracking-tight">Welcome back</h2>
              <p className="text-white/50 text-sm mb-7">Sign in to continue your journey.</p>

              <RoleSwitcher />

              <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <Field id="login-email" label="Email" placeholder="username@gmail.com" value={email} onChange={setEmail} />
                <Field
                  id="login-pw" label="Password" type={showPw ? "text" : "password"}
                  placeholder="••••••••" value={password} onChange={setPassword}
                  right={
                    <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-700 transition-colors" tabIndex={-1}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                <div className="text-right -mt-2">
                  <button type="button" onClick={() => setScreen("forgot")} className="text-[11px] text-blue-300 hover:text-white font-semibold transition-colors">
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm transition-all shadow-xl tracking-wide">
                  Sign In
                </button>
              </form>

              <SocialButtons />

              <p className="text-center text-[11px] text-white/55 mt-6">
                Don't have an account?{" "}
                <button onClick={() => setScreen("register")} className="text-white font-bold hover:underline">
                  Register for free
                </button>
              </p>
            </div>
          )}

          {/* ════════════════ REGISTER ════════════════ */}
          {screen === "register" && (
            <div className="p-10">
              <button
                onClick={() => setScreen("login")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold mb-7 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>

              <div className="flex justify-center mb-6">
                <Logo size={38} lightBg={false} />
              </div>

              <h2 className="text-[1.6rem] font-bold text-white mb-1 tracking-tight">Create account</h2>
              <p className="text-white/50 text-sm mb-7">Start your learning journey today.</p>

              <RoleSwitcher />

              <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <Field id="reg-name" label="Full Name" placeholder="e.g. Amara Diallo" value={regName} onChange={setRegName} />
                <Field id="reg-email" label="Email" type="email" placeholder="username@gmail.com" value={regEmail} onChange={setRegEmail} />
                <Field
                  id="reg-pw" label="Password" type={showRegPw ? "text" : "password"}
                  placeholder="Create a strong password" value={regPassword} onChange={setRegPassword}
                  right={
                    <button type="button" onClick={() => setShowRegPw(!showRegPw)} className="text-gray-400 hover:text-gray-700 transition-colors" tabIndex={-1}>
                      {showRegPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                <div>
                  <Field
                    id="reg-conf" label="Confirm Password" type={showRegConf ? "text" : "password"}
                    placeholder="Repeat your password" value={regConfirm} onChange={setRegConfirm}
                    right={
                      <button type="button" onClick={() => setShowRegConf(!showRegConf)} className="text-gray-400 hover:text-gray-700 transition-colors" tabIndex={-1}>
                        {showRegConf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                  {pwNoMatch && <p className="text-red-400 text-[11px] mt-1.5 font-semibold">Passwords don't match</p>}
                  {pwMatch && <p className="text-green-400 text-[11px] mt-1.5 font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Passwords match</p>}
                </div>

                <button
                  type="submit"
                  disabled={!!pwNoMatch}
                  className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl font-bold text-sm transition-all shadow-xl tracking-wide mt-1"
                >
                  Create Account
                </button>
              </form>

              <SocialButtons />

              <p className="text-center text-[11px] text-white/55 mt-6">
                Already have an account?{" "}
                <button onClick={() => setScreen("login")} className="text-white font-bold hover:underline">Sign In</button>
              </p>
            </div>
          )}

          {/* ════════════════ FORGOT PASSWORD ════════════════ */}
          {screen === "forgot" && (
            <div className="p-10">
              <button
                onClick={() => setScreen("login")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold mb-7 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>

              <div className="flex justify-center mb-7">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-blue-300" />
                </div>
              </div>

              <h2 className="text-[1.6rem] font-bold text-white mb-2 tracking-tight">Forgot Password?</h2>
              <p className="text-white/55 text-sm mb-8 leading-relaxed">
                No worries! Enter your email and we'll send you a link to reset your password.
              </p>

              <form className="flex flex-col gap-5" onSubmit={handleForgot}>
                <Field id="forgot-email" label="Email Address" type="email" placeholder="username@gmail.com" value={forgotEmail} onChange={setForgotEmail} />

                <button type="submit" className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm transition-all shadow-xl tracking-wide">
                  Send Reset Link
                </button>
              </form>
            </div>
          )}

          {/* ════════════════ FORGOT SUCCESS ════════════════ */}
          {screen === "forgot-success" && (
            <div className="p-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400/30 flex items-center justify-center mb-6 animate-fade-in">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>

              <h2 className="text-[1.6rem] font-bold text-white mb-3 tracking-tight">Check Your Email</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                We sent a password reset link to <span className="text-white font-semibold">{forgotEmail || "your email"}</span>.
                Check your inbox and follow the instructions.
              </p>

              <button
                onClick={() => { setScreen("login"); setForgotEmail(""); }}
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm transition-all shadow-xl tracking-wide"
              >
                Back to Login
              </button>

              <p className="text-[11px] text-white/40 mt-5">
                Didn't receive it? Check your spam folder or{" "}
                <button onClick={() => setScreen("forgot")} className="text-blue-300 hover:underline font-semibold">try again</button>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}