import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/soma/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import authBg from "../kps.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Account Portal — Soma AI" }] }),
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

  const filteredSchools = RWANDAN_SCHOOLS.filter(s => s.toLowerCase().includes(school.toLowerCase()));

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#00C36B]/30">
      {/* Navigation */}
      <header className="py-6 px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-colors">
          <span className="text-sm">←</span> Home
        </Link>
        <Logo size={80} />
        <div className="w-16" /> {/* Spacer */}
      </header>

      {/* Main Content Area - Compact and Centered */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-[720px] w-full bg-[#F8FAFC] rounded-[40px] overflow-hidden flex flex-col md:flex-row border border-gray-100 group shadow-none">
          
          {/* Left Side Visual - Integrated Asset */}
          <div className="md:w-5/12 bg-[#F1F5F9] relative overflow-hidden hidden md:block">
            <img 
               src={authBg} 
               alt="Soma Learning" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.85]"
            />
            {/* User-requested Integrated Fade */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F8FAFC]/20" />
            
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Account Portal</p>
              <h2 className="text-xl font-black text-white leading-tight">Welcome home, <br/> Scholar.</h2>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-8 lg:p-12 space-y-8 relative z-10 bg-[#F8FAFC]">
            <div className="space-y-1 text-center md:text-left">
              <h1 className="text-2xl font-black tracking-tighter text-[#0F172A]">Identify Yourselves</h1>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Connect to your personal study hub</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Student ID</label>
                <input 
                  type="text" 
                  placeholder="SOMA-XXXX-XXXX"
                  className="w-full h-12 bg-white rounded-2xl px-6 border border-transparent focus:border-[#2563EB] text-sm font-bold placeholder:text-[#94A3B8] transition-all outline-none"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Your School</label>
                <input 
                  type="text" 
                  placeholder="Search your school..."
                  className="w-full h-12 bg-white rounded-2xl px-6 border border-transparent focus:border-[#2563EB] text-sm font-bold placeholder:text-[#94A3B8] transition-all outline-none"
                  value={school}
                  onFocus={() => setShowSchools(true)}
                  onChange={(e) => {
                    setSchool(e.target.value);
                    setShowSchools(true);
                  }}
                />
                
                {showSchools && filteredSchools.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 overflow-hidden z-50 shadow-none">
                    <div className="max-h-40 overflow-y-auto">
                      {filteredSchools.map(s => (
                        <button 
                          key={s}
                          className="w-full px-6 py-3 text-left text-xs font-bold hover:bg-[#F1F5F9] transition-colors text-[#64748B] hover:text-[#2563EB]"
                          onClick={() => {
                            setSchool(s);
                            setShowSchools(false);
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-12 bg-white rounded-2xl px-6 border border-transparent focus:border-[#2563EB] text-sm font-bold placeholder:text-[#94A3B8] transition-all outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <div className="flex p-1 bg-white rounded-xl w-full border border-gray-100">
                  <button 
                    onClick={() => setRole("student")}
                    className={`flex-1 h-9 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${role === "student" ? "bg-[#2563EB] text-white" : "text-[#64748B] hover:text-[#0F172A]"}`}
                  >
                    Student
                  </button>
                  <button 
                    onClick={() => setRole("teacher")}
                    className={`flex-1 h-9 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${role === "teacher" ? "bg-[#2563EB] text-white" : "text-[#64748B] hover:text-[#0F172A]"}`}
                  >
                    Teacher
                  </button>
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl bg-[#00C36B] hover:bg-[#00B060] text-white font-black text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95" asChild>
                <Link to={role === "student" ? "/student" : "/teacher"}>Initiate Access</Link>
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase text-[#94A3B8] font-bold bg-[#F8FAFC] px-2 tracking-widest">
                  Or Quick Demo
                </div>
              </div>

              <div className="flex gap-4">
                 <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2563EB] border-[#2563EB]/30 hover:bg-[#2563EB]/5 bg-white" asChild>
                    <Link to="/student">Demo Student</Link>
                 </Button>
                 <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0F172A] border-[#0F172A]/30 hover:bg-gray-100 bg-white" asChild>
                    <Link to="/teacher">Demo Teacher</Link>
                 </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8">
        <p className="text-[10px] font-bold text-center text-[#94A3B8] uppercase tracking-widest transition-all hover:text-[#64748B]">© 2026 Soma AI · Authentic African Education</p>
      </footer>
    </div>
  );
}