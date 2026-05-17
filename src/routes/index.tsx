// TEST CHANGE
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import {
  ChevronDown,
  Brain,
  BookOpen,
  Star,
  BarChart2,
  Languages,
  Briefcase,
  Upload,
  Sparkles,
  Trophy,
  Check,
  Phone,
  Mail,
  Menu,
  X,
  User,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soma AI — Learn Smarter with your AI study mentor" },
      {
        name: "description",
        content: "AI-powered, inclusive learning platform for African students.",
      },
    ],
  }),
  component: Index,
});

/* ─────────────── DATA ─────────────── */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "For Schools", href: "#schools" },
  { label: "Pricing", href: "#pricing" },
];

const STATS = [
  { value: "150k+", label: "Notes Simplified" },
  { value: "50+", label: "African Languages" },
  { value: "92%", label: "Exam Pass Rate" },
  { value: "12ms", label: "Response Time" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "Dyslexia Mode",
    desc: "Switch to high-contrast themes and accessible fonts like OpenDyslexic with one click.",
    color: "#2563EB",
  },
  {
    icon: BookOpen,
    title: "Simplify Notes",
    desc: "Paste any textbook paragraph and let Soma AI rewrite it in simpler language or bullet points.",
    color: "#00C36B",
  },
  {
    icon: Star,
    title: "AI Quizzes",
    desc: "Instantly generate practice tests from your study materials to reinforce learning.",
    color: "#F59E0B",
  },
  {
    icon: Languages,
    title: "Multi-lingual",
    desc: "Learn in Swahili, Yoruba, Zulu or French. Soma speaks your language.",
    color: "#8B5CF6",
  },
  {
    icon: BarChart2,
    title: "Smart Tracking",
    desc: "Visual dashboards show exactly where you excel and where you need more focus.",
    color: "#EC4899",
  },
  {
    icon: Briefcase,
    title: "Career Paths",
    desc: "AI career coach connects your academic strengths to real-world job opportunities.",
    color: "#14B8A6",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Upload Materials",
    desc: "Snap a photo of your textbook or upload a PDF syllabus.",
    icon: Upload,
  },
  {
    num: "2",
    title: "AI Transforms",
    desc: "Our AI adapts the content to your reading style and language preference.",
    icon: Sparkles,
  },
  {
    num: "3",
    title: "Ace Your Exams",
    desc: "Practice with quizzes and follow your custom study roadmap.",
    icon: Trophy,
  },
];

const TESTIMONIALS = [
  {
    initials: 'AK',
    name: 'Amina Kamanzi',
    role: 'S4 Student, Kigali',
    color: 'bg-primary text-white',
    quote: 'I used to struggle with biology notes. Soma AI made everything clear and even quizzed me. My grade went from C to A in one term.',
  },
  {
    initials: 'MN',
    name: 'Mr. Nshimiyimana',
    role: 'Teacher, FAWE Girls School',
    color: 'bg-accent text-white',
    quote: 'I can finally understand which students are struggling. The dashboard shows me exactly who needs help before it is too late.',
  },
  {
    initials: 'EM',
    name: 'Eric Manzi',
    role: 'S5 Student, Musanze',
    color: 'bg-warm text-white',
    quote: 'The dyslexia mode changed everything for me. I no longer get lost in the text. I actually enjoy studying now.',
  },
]
const PLANS = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    color: "#E2E8F0",
    textColor: "#0F172A",
    highlight: false,
    features: [
      "5 note simplifications/day",
      "10 AI quiz questions/day",
      "Basic dyslexia mode",
      "1 language",
      "Community support",
    ],
  },
  {
    name: "Student",
    price: "2,500",
    period: "RWF / month",
    color: "#ffffff",
    textColor: "#0F172A",
    highlight: true,
    features: [
      "Unlimited note simplifications",
      "Unlimited AI quizzes",
      "Full dyslexia & accessibility suite",
      "5+ African languages",
      "Smart progress tracking",
      "Priority support",
    ],
  },
  {
    name: "School",
    price: "Custom",
    period: "per institution",
    color: "#0F172A",
    textColor: "#0F172A",
    highlight: false,
    features: [
      "Everything in Student",
      "Teacher dashboard",
      "Class analytics",
      "Curriculum alignment",
      "Dedicated account manager",
      "LMS integration",
    ],
  },
];

/* ─────────────── COMPONENT ─────────────── */

const LANGUAGES = [
  { code: "rw", flag: "🇷🇼", label: "Kinyarwanda" },
  { code: "us", flag: "🇺🇸", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "French" },
  { code: "ke", flag: "🇰🇪", label: "Kiswahili" },
];

function Index() {
  const [dyslexia, setDyslexia] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[1]);

  return (
    <div
      className={`min-h-screen bg-white text-[#0F172A] font-sans selection:bg-[#00C36B]/30 ${dyslexia ? "dyslexia-mode" : ""}`}
      style={
        dyslexia
          ? ({ fontFamily: "OpenDyslexic, Arial, sans-serif", fontSize: "1.05em", lineHeight: "1.8" } as React.CSSProperties)
          : {}
      }
    >
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-25 flex items-center justify-between gap-6">
          {/* Logo */}
          <img src={logo} alt="Soma AI" className="h-25 w-auto object-contain" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-[#475569] border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-300 transition-colors bg-white">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">{selectedLang.code}</span>
                <span className="text-base">{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown panel */}
              {langOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 py-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                        selectedLang.code === lang.code
                          ? "bg-[#EFF6FF] text-[#2563EB] font-bold"
                          : "text-[#374151] hover:bg-gray-50 font-semibold"
                      }`}
                    >
                      <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider w-5">{lang.code}</span>
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {selectedLang.code === lang.code && (
                        <span className="text-[#2563EB]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dyslexia Toggle */}
            <button
              onClick={() => setDyslexia(!dyslexia)}
              className={`flex items-center gap-2 text-sm font-semibold border rounded-full px-3 py-1.5 transition-all ${
                dyslexia
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "text-[#475569] border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`w-8 h-4 rounded-full relative transition-all ${dyslexia ? "bg-white/30" : "bg-gray-200"}`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${dyslexia ? "left-4" : "left-0.5"}`}
                />
              </span>
              Aa Dyslexia mode
            </button>

            <Link
              to="/island"
              className="text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              🏝️ Soma Island
            </Link>
            <Link
              to="/login"
              className="text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors"
            >
              Login
            </Link>
            <Button
              className="h-9 px-5 text-sm font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl"
              asChild
            >
              <Link to="/login">Get started</Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#475569]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-sm font-semibold text-[#475569] hover:text-[#0F172A]"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/island" className="text-sm font-bold text-[#2563EB] flex items-center gap-1.5" onClick={() => setMobileOpen(false)}>
                🏝️ Explore Soma Island
              </Link>
              <div className="flex gap-3">
                <Link to="/login" className="text-sm font-bold text-[#0F172A]" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Button
                  className="h-9 px-5 text-sm font-bold bg-[#2563EB] text-white rounded-xl"
                  asChild
                >
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Get started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-16 pb-20 overflow-hidden" style={{
        background: "#f5f0f5",
      }}>
        {/* Decorative blobs */}
        <div aria-hidden="true" className="absolute top-[-80px] right-[10%] w-[340px] h-[340px] rounded-full z-0" style={{ background: "rgba(37,99,235,0.07)" }} />
        <div aria-hidden="true" className="absolute bottom-[-50px] left-[5%] w-[220px] h-[220px] rounded-full z-0" style={{ background: "rgba(0,195,107,0.08)" }} />

        {/* Bottom wave / scallop */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx={i * 120 + 60} cy={60} r={62} fill="white" />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#BFDBFE] backdrop-blur-sm">
              <SparkleIcon />
              <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest">
                AI study mentor for Africa
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#0F172A]">
              Learn smarter with your AI{" "}
              <span className="text-[#2563EB]">study buddy</span>
            </h1>
            <p className="text-base text-[#4B5563] max-w-md leading-relaxed font-medium">
              Soma AI simplifies your notes, builds personal study plans, and
              quizzes you so every student can succeed, even with dyslexia or
              reading challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 px-7 text-sm font-bold bg-[#22C55E] hover:bg-[#1D4ED8] text-white rounded-2xl"
                asChild
              >
                <Link to="/login">Get started for free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-sm font-bold border-2 border-gray-300 rounded-2xl text-[#0F172A] hover:bg-black hover:border-white hover:text-white bg-white/60"
                asChild
              >
                <a href="#demo">Watch Demo</a>
              </Button>
              <Button
                size="lg"
                className="h-12 px-7 text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl border-none transition-transform hover:scale-105 shadow-[0_4px_12px_rgba(245,158,11,0.2)] flex items-center gap-1.5"
                asChild
              >
                <Link to="/island">🏝️ Explore Soma Island</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">
                1000 rate from different schools
              </span>
            </div>
          </div>

          {/* Right – Hero Image with ring + floating avatars */}
          <div className="relative flex justify-center items-center py-10">
            {/* Outer ring */}
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                width: 550,
                height: 520,
                borderRadius: "50%",
                border: "6px solid rgba(100,120,220,0.25)",
              }}
            />
            {/* Inner ring */}
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                width: 500,
                height: 480,
                borderRadius: "50%",
                border: "4px solid rgba(100,120,220,0.15)",
              }}
            />

            {/* Floating avatar – top center */}
            <div
              className="absolute z-20"
              style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
                <img src={img2} alt="Student" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Floating avatar – left middle */}
            <div
              className="absolute z-20"
              style={{ top: "50%", left: -10, transform: "translateY(-50%)" }}
            >
              <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
                <img src={img2} alt="Student" className="w-full h-full object-cover object-top" />
              </div>
            </div>

            {/* Floating avatar – right middle */}
            <div
              className="absolute z-20"
              style={{ top: "50%", right: -10, transform: "translateY(-50%)" }}
            >
              <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
                <img src={img2} alt="Student" className="w-full h-full object-cover object-bottom" />
              </div>
            </div>

            {/* Main image – clipped circle bottom */}
            <div
              className="relative z-10 overflow-hidden"
              style={{
                width: 400,
                height: 500,
                borderRadius: "160px 160px 0 0",
                background: "rgba(180,160,200,0.25)",
              }}
            >
              <img
                src={img1}
                alt="Student learning with Soma AI"
                className="w-full h-full object-cover object-top"
              />

              
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-white border-y border-white py-10 mt-">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-[#2563EB]">{s.value}</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
       <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-black tracking-tight">
              Tools for Every Learner
            </h2>
            <p className="text-sm text-[#64748B] font-semibold">
              Designed to remove barriers and spark curiosity
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
              >
                {/* Image banner with colour overlay */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={i % 2 === 0 ? img1 : img2}
                    alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: i === 2 ? "center 30%" : i === 4 ? "center 60%" : "top center" }}
                  />
                  {/* tinted colour overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, ${f.color}22, ${f.color}88)` }}
                  />
                  {/* icon badge */}
                  <div
                    className="absolute top-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: "rgba(255,255,255,0.95)" }}
                  >
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  {/* bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: f.color }} />
                </div>
                {/* Text */}
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-black">{f.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO / EXPERIENCE ── */}
      <section
        id="demo"
        className="py-28 bg-[#F8FAFC] border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#2563EB] mb-3">
              Experience Soma
            </p>
            <h2 className="text-4xl font-black tracking-tight mb-8">
              See how it works
            </h2>
            <div className="space-y-3">
              <div className="bg-[#2563EB] text-white rounded-2xl px-5 py-4 flex items-center gap-4">
                <BookOpen className="h-5 w-5 shrink-0" />
                <div>
                  <div className="text-sm font-black">Note Simplifier</div>
                  <div className="text-xs opacity-80">Textbook to easy read</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4">
                <Star className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                <div>
                  <div className="text-sm font-black">Quick Quiz</div>
                  <div className="text-xs text-[#64748B]">Test Your Knowledge</div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-5">
            <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">
              Paste your text below
            </p>
            <div className="text-sm text-[#475569] leading-relaxed bg-[#F8FAFC] rounded-xl p-4 border border-gray-100">
              "Photosynthesis is a process used by plants and other organisms to
              convert light energy into chemical energy that, through cellular
              respiration, can later be released to fuel the organism's
              activities."
            </div>
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Textbook complexity: High</span>
              <button className="bg-[#2563EB] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1D4ED8] transition-colors">
                Simplify Now
              </button>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#2563EB]">
                  Soma Simplified
                </span>
                <span className="text-xs text-[#94A3B8] font-semibold">
                  🔊 Read Aloud
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#0F172A]">
                <Check className="h-4 w-4 text-[#00C36B] shrink-0 mt-0.5" />
                Plants take sunlight and turn it into food.
              </div>
              <div className="flex items-start gap-2 text-sm text-[#0F172A]">
                <Check className="h-4 w-4 text-[#00C36B] shrink-0 mt-0.5" />
                This food gives plants energy to grow.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight">
              Three Steps to Success
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((s, i) => (
              <div key={s.num} className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xl font-black mx-auto">
                  {s.num}
                </div>
                <h3 className="text-lg font-black">{s.title}</h3>
                <p className="text-sm text-[#64748B] font-medium leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
       <section className="bg-primary  py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label text-white/60 block mb-3">
            Student stories
          </span>
          <h2 className="font-display font-bold text-[36px] text-white">
            Loved by students and teachers
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name}
                 className="bg-white rounded-[20px] p-6 flex flex-col gap-4 shadow-float">

              {/* Stars */}
              <div className="flex gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <i key={i} className="ti ti-star-filled text-warm text-[16px]"
                     aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-textMid text-[14px] leading-relaxed flex-1 italic">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center
                                 justify-center font-display font-bold text-[13px]
                                 flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-[14px] text-textDark">
                    {t.name}
                  </p>
                  <p className="font-body text-[12px] text-textMuted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-black tracking-tight">
              Simple, fair pricing
            </h2>
            <p className="text-sm text-[#64748B] font-semibold max-w-md mx-auto">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 flex flex-col gap-6 ${
                  plan.highlight
                    ? "ring-4 ring-[#2563EB] ring-offset-2 scale-105 shadow-xl"
                    : "border border-gray-100"
                }`}
                style={{ background: plan.highlight ? "#abb8e7" : "#F8FAFC" }}
              >
                {plan.highlight && (
                  <div className="text-[10px] font-black uppercase tracking-widest text-black text-center">
                    Most Popular
                  </div>
                )}
                <div>
                  <div
                    className="text-lg font-black"
                    style={{ color: plan.textColor }}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    {plan.price !== "Custom" && (
                      <span
                        className="text-3xl font-black"
                        style={{ color: plan.textColor }}
                      >
                        {plan.price === "0" ? "Free" : plan.price}
                      </span>
                    )}
                    {plan.price === "Custom" && (
                      <span
                        className="text-3xl font-black"
                        style={{ color: plan.textColor }}
                      >
                        Custom
                      </span>
                    )}
                    {plan.price !== "0" && plan.price !== "Custom" && (
                      <span
                        className="text-xs font-bold opacity-70"
                        style={{ color: plan.textColor }}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm font-medium"
                      style={{ color: plan.textColor }}
                    >
                      <Check
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: plan.highlight ? "#86EFAC" : "#00C36B" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full h-11 rounded-2xl text-sm font-black transition-transform hover:scale-105 ${
                    plan.highlight
                      ? "bg-white text-[#2563EB] hover:bg-[#F1F5F9]"
                      : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                  }`}
                  asChild
                >
                  <Link to="/login">
                    {plan.price === "Custom"
                      ? "Contact Us"
                      : plan.price === "0"
                        ? "Get started free"
                        : "Get Student Plan"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="schools" className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative rounded-[48px] bg-[#0F172A] overflow-hidden p-14 lg:p-20 flex flex-col lg:flex-row items-center gap-14">
          <div className="relative z-10 text-white space-y-6 lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Start Your Learning Journey Today
            </h2>
            <p className="text-base opacity-80 font-medium leading-relaxed">
              Join thousands of students across Rwanda using Soma AI to achieve
              higher grades and clearer understanding.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-12 px-8 rounded-2xl font-black text-sm transition-transform hover:scale-105"
                asChild
              >
                <Link to="/login">Create Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-black hover:bg-white/10 h-12 px-8 rounded-2xl font-black text-sm"
                asChild
              >
                <a href="#schools">For Schools</a>
              </Button>
            </div>
          </div>
          <div className="relative lg:w-1/2 flex justify-center">
            <div className="w-full max-w-xs aspect-square rounded-[40px] overflow-hidden ring-8 ring-white/10">
              <img
                src={img2}
                alt="Student with Soma AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F172A] text-gray-500 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-16">
            <div className="space-y-5 md:col-span-2">
              <img src={logo} alt="Soma AI" className="h-10 w-auto brightness-0 invert" />
              <p className="text-xs leading-relaxed max-w-xs font-medium">
                The smart mentor for the modern African student. Making education
                accessible, personalised, and engaging through AI.
              </p>
            </div>
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">
                Products
              </h3>
              <ul className="space-y-3 text-xs font-semibold">
                <li>
                  <Link to="/student" className="hover:text-[#00C36B] transition-colors">
                    AI Notes
                  </Link>
                </li>
                <li>
                  <Link to="/student" className="hover:text-[#00C36B] transition-colors">
                    Quiz Bank
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00C36B] transition-colors">
                    Study Planner
                  </a>
                </li>
                <li>
                  <a href="#schools" className="hover:text-[#00C36B] transition-colors">
                    For Schools
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">
                Support
              </h3>
              <ul className="space-y-3 text-xs font-semibold">
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#00C36B]" />
                  +250 785 0XX XXX
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#00C36B]" />
                  somaai1@gmail.com
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest">
              © 2026 Soma AI Education. All rights reserved.
            </p>
            <div className="flex gap-4">
              {["𝕏", "in", "f"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full border border-white/10 text-xs flex items-center justify-center hover:border-[#00C36B] hover:text-[#00C36B] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#2563EB]"
    >
      <path
        d="M12 3L14.5 9L21 12L14.5 15L12 21L9.5 15L3 12L9.5 9L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}