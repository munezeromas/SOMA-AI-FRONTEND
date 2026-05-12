import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/soma/Logo";
import { Button } from "@/components/ui/button";
import africaTeaching from "../Outdoor teaching in africa_ browse and download images — Yandex Images.jpg";
import girlsLearning from "../37 Powerful Images of Girls Learning Around the World.jpg";
import { 
  ChevronDown, 
  Brain, 
  BookOpen, 
  Star, 
  TrendingUp, 
  ArrowRight,
  User
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soma AI — Learn Smarter with your AI study mentor" },
      { name: "description", content: "AI-powered, inclusive learning platform for African students." },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { 
    title: "Made for every learner", 
    desc: "Dyslexia-friendly mode, large text, and read-aloud support.", 
    icon: Brain, 
    color: "bg-[#2563EB]",
    img: girlsLearning
  },
  { 
    title: "Simplify any note", 
    desc: "Upload PDFs, photos or text and get an easier version with a glossary.", 
    icon: BookOpen, 
    color: "bg-[#00C36B]",
    img: africaTeaching
  },
  { 
    title: "AI quizzes from your notes", 
    desc: "Practice with smart questions and get instant feedback.", 
    icon: Star, 
    color: "bg-[#F59E0B]",
    img: girlsLearning
  }
];

function Index() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-[#00C36B]/30">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Logo size={100} />
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
              English <ChevronDown className="h-4 w-4" />
            </button>
            <Link to="/login" className="text-sm font-bold text-[#00C36B] hover:text-[#00B060] transition-colors">
              Login
            </Link>
            <Button className="btn-soma-primary h-11 px-6 text-sm" asChild>
              <Link to="/login">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 relative z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
               <SparkleIcon />
               <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">AI study mentor for Africa</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[1.1] text-[#0F172A]">
              Learn smarter with your AI <br />
              <span className="text-[#2563EB]">study mentor</span>
            </h1>
            <p className="text-lg text-[#64748B] max-w-lg leading-relaxed font-medium">
              Soma AI simplifies your notes, builds personal study plans, and quizzes you so every student can succeed, even with dyslexia or reading challenges.
            </p>
            <Button size="lg" className="btn-soma-primary h-14 px-8 text-base" asChild>
              <Link to="/login">Get started for free</Link>
            </Button>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="p-4 rounded-xl border border-gray-100 bg-[#F8FAFC]">
                <div className="text-xl font-black">1000+</div>
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Total User</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-[#F8FAFC]">
                <div className="text-xl font-black">100+</div>
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Teachers</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-[#F8FAFC]">
                <div className="text-xl font-black">95%</div>
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-700">
            {/* Integrated Mosaic of Authentic Assets */}
            <div className="grid grid-cols-12 grid-rows-12 gap-1 h-[600px] rounded-[48px] overflow-hidden border border-gray-100 bg-[#F8FAFC]">
              {/* Main Image - Integrated */}
              <div className="col-span-8 row-span-7 relative group overflow-hidden bg-gray-100">
                <img 
                  src={africaTeaching} 
                  alt="Student Learning" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Integration Overlays (User-requested) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
                
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/40 text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                  Authentic Access
                </div>
              </div>

              {/* Secondary Asset - Integrated */}
              <div className="col-span-4 row-span-5 relative group overflow-hidden bg-gray-200">
                <img 
                  src={girlsLearning} 
                  alt="Inclusive Education" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Accent profiles/stats - Integrated */}
              <div className="col-span-4 row-span-4 bg-[#2563EB] text-white p-8 flex flex-col justify-center">
                <div className="text-4xl font-black">95%</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight">Mastery Rating</div>
              </div>

              {/* Third Asset - Integrated */}
              <div className="col-span-12 md:col-span-12 lg:col-span-5 row-span-5 relative group overflow-hidden bg-gray-100">
                 <img 
                  src={africaTeaching} 
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Fourth Asset - Strategy */}
              <div className="col-span-7 row-span-3 bg-[#0F172A] flex flex-col justify-end p-8">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Precision Hub</p>
                <h4 className="text-xl font-black tracking-tighter text-white leading-tight">Authentic Learning <br/> Platform.</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                 <User className="h-5 w-5 text-slate-400" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">10,000+ Students connected nationwide</span>
        </div>
      </div>

      {/* Features Grid Section */}
      <section className="py-32 bg-[#F8FAFC] border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 space-y-4">
            <h2 className="text-5xl font-black tracking-tight text-[#0F172A]">Designed for your success</h2>
            <p className="text-[#64748B] font-bold text-[10px] uppercase tracking-[0.2em] leading-none">Inclusive · Accessible · Authentic · Shadow-Free</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col shadow-none">
              <div className={`h-2 ${f.color}`} />
              <div className="p-8 space-y-4 flex-1">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-50">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </div>
                <h3 className="text-xl font-black tracking-tight">{f.title}</h3>
                <p className="text-sm font-medium text-[#64748B] leading-relaxed uppercase tracking-tight">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="relative rounded-[56px] bg-[#2563EB] overflow-hidden p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-16 shadow-none">
          <div className="relative z-10 text-white space-y-8 lg:w-1/2">
            <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg opacity-90 font-medium leading-relaxed">
              Join thousands of students across Rwanda using Soma AI to achieve excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2563EB] hover:bg-[#F1F5F9] h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-transform hover:scale-105" asChild>
                <Link to="/login">Create Account</Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:w-1/2 flex justify-center">
             <div className="relative w-full max-w-sm aspect-square rounded-[48px] overflow-hidden ring-8 ring-white/10 group shadow-none">
                <img 
                  src={girlsLearning} 
                  alt="Inclusive Study" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#2563EB] to-transparent opacity-80" />
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-gray-500 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 border-b border-white/5 pb-20">
            <div className="space-y-8">
              <Logo size={48} />
              <p className="text-xs leading-relaxed max-w-xs font-medium">
                The smart mentor for the modern student.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">Products</h3>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-wider">
                <li><Link to="/student" className="hover:text-[#00C36B] transition-colors">AI Notes</Link></li>
                <li><Link to="/student" className="hover:text-[#00C36B] transition-colors">Quiz Bank</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">Support</h3>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-wider">
                <li>Phone: +250 785 0XX XXX</li>
                <li>Email: somaai1@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[10px] font-bold uppercase tracking-widest transition-all hover:text-white">© 2026 Soma AI Education · Authentic African Impact</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#2563EB]">
      <path d="M12 3L14.5 9L21 12L14.5 15L12 21L9.5 15L3 12L9.5 9L12 3Z" fill="currentColor"/>
    </svg>
  );
}
