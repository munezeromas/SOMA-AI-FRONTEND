export const STUDENT = {
  name: "Amani",
  grade: "P6",
  streak: 12,
  xp: 1840,
  level: 8,
  weakSubject: "Mathematics",
  badges: ["Reader Star", "Math Brave", "7-Day Streak", "Game Master"],
};

export const SUBJECTS = ["Math", "English", "Science", "Kinyarwanda", "Social"];

export const PROGRESS_DATA = [
  { week: "W1", math: 40, english: 60, science: 55 },
  { week: "W2", math: 48, english: 65, science: 58 },
  { week: "W3", math: 52, english: 72, science: 64 },
  { week: "W4", math: 60, english: 78, science: 70 },
  { week: "W5", math: 68, english: 82, science: 75 },
  { week: "W6", math: 74, english: 86, science: 80 },
];

export const MASTERY = [
  { subject: "Math", value: 62 },
  { subject: "English", value: 84 },
  { subject: "Science", value: 76 },
  { subject: "Kinyarwanda", value: 90 },
  { subject: "Social", value: 70 },
];

export const STUDY_PLAN = [
  { day: "Mon", time: "16:00", subject: "Math", topic: "Fractions", done: true },
  { day: "Mon", time: "17:30", subject: "English", topic: "Reading practice", done: true },
  { day: "Tue", time: "16:00", subject: "Science", topic: "Plants", done: false },
  { day: "Wed", time: "16:00", subject: "Math", topic: "Word problems", done: false },
  { day: "Thu", time: "16:00", subject: "Kinyarwanda", topic: "Igisakuzo", done: false },
  { day: "Fri", time: "16:00", subject: "English", topic: "Vocabulary game", done: false },
  { day: "Sat", time: "10:00", subject: "Review", topic: "Weekly quiz", done: false },
];

export const VIDEOS = [
  // ── MATH ──────────────────────────────────────────────────────────────────
  { id: "JAFig332MYg", title: "Fractions for Beginners", subject: "Math", level: "P3", duration: "9m", teacherRecommended: true },
  { id: "IcmcpNdWiEM", title: "Multiplication Tables 1–10", subject: "Math", level: "P2", duration: "10m", teacherRecommended: true },
  { id: "n0FZhQ_GkKw", title: "What Are Fractions? (Math Antics)", subject: "Math", level: "P4", duration: "10m", teacherRecommended: true },
  { id: "mvOkMYCygps", title: "Basic Multiplication (Math Antics)", subject: "Math", level: "P3", duration: "11m", teacherRecommended: false },
  { id: "LGqBQrUYua4", title: "Long Division (Math Antics)", subject: "Math", level: "P5", duration: "11m", teacherRecommended: true },
  { id: "NybHckSEQBI", title: "Intro to Algebra (Math Antics)", subject: "Math", level: "P6", duration: "12m", teacherRecommended: true },
  { id: "JeVSmq1Nrpw", title: "What Are Percentages? (Math Antics)", subject: "Math", level: "P5", duration: "10m", teacherRecommended: false },
  { id: "ViAmQivKif0", title: "Counting to 100 (Numberblocks)", subject: "Math", level: "P1", duration: "7m", teacherRecommended: true },
  { id: "bFMpOBuXqhU", title: "Addition & Subtraction for Kids", subject: "Math", level: "P2", duration: "8m", teacherRecommended: false },

  // ── SCIENCE ───────────────────────────────────────────────────────────────
  { id: "eo4M3fSJsKA", title: "Photosynthesis Explained (SciShow Kids)", subject: "Science", level: "P4", duration: "5m", teacherRecommended: true },
  { id: "ncORPosDrjI", title: "The Water Cycle (SciShow Kids)", subject: "Science", level: "P3", duration: "5m", teacherRecommended: true },
  { id: "VEy_tVB3RDg", title: "The Solar System (Crash Course Kids)", subject: "Science", level: "P5", duration: "8m", teacherRecommended: true },
  { id: "D77HbwMXAkc", title: "Food Chains Explained (SciShow Kids)", subject: "Science", level: "P4", duration: "5m", teacherRecommended: false },
  { id: "jwVhsol6oNE", title: "Electricity for Kids (FreeSchool)", subject: "Science", level: "P5", duration: "9m", teacherRecommended: true },
  { id: "ZMSbDwpIyF4", title: "States of Matter for Kids", subject: "Science", level: "P3", duration: "6m", teacherRecommended: false },
  { id: "vvSoXAUOrLs", title: "Human Body Systems (SciShow Kids)", subject: "Science", level: "P5", duration: "6m", teacherRecommended: true },
  { id: "Bj7fblVDKHI", title: "Why Do We Have Seasons? (TED-Ed)", subject: "Science", level: "P4", duration: "5m", teacherRecommended: true },

  // ── ENGLISH ───────────────────────────────────────────────────────────────
  { id: "hq3yfQnllfQ", title: "Alphablocks – Learn to Read (P1)", subject: "English", level: "P1", duration: "24m", teacherRecommended: true },
  { id: "75p-N9YKqNo", title: "Nouns, Verbs & Adjectives (Schoolhouse Rock)", subject: "English", level: "P3", duration: "10m", teacherRecommended: true },
  { id: "rRgSCGb7hjg", title: "Punctuation Song for Kids", subject: "English", level: "P3", duration: "4m", teacherRecommended: false },
  { id: "3v8TTiobAnI", title: "Short Stories for Kids – Storyline Online", subject: "English", level: "P2", duration: "18m", teacherRecommended: true },
  { id: "OWJCflt6CYA", title: "English Vocabulary – British Council Kids", subject: "English", level: "P4", duration: "7m", teacherRecommended: true },
  { id: "fNk_qlbiznU", title: "Parts of Speech Explained", subject: "English", level: "P5", duration: "8m", teacherRecommended: false },

  // ── KINYARWANDA ───────────────────────────────────────────────────────────
  { id: "YFzwirfeEiI", title: "Kinyarwanda Language Basics", subject: "Kinyarwanda", level: "P2", duration: "10m", teacherRecommended: true },
  { id: "D3-MkKBhFWA", title: "Ubongo Kids – Swahili & Rwanda Stories", subject: "Kinyarwanda", level: "P1", duration: "12m", teacherRecommended: true },
  { id: "aekTVaRhAD4", title: "Akili and Me – African Education (P1–P3)", subject: "Kinyarwanda", level: "P1", duration: "15m", teacherRecommended: true },
  { id: "9Yf9nGWqyDs", title: "Imigani – Rwandan Proverbs & Stories", subject: "Kinyarwanda", level: "P4", duration: "8m", teacherRecommended: false },

  // ── SOCIAL STUDIES ────────────────────────────────────────────────────────
  { id: "Yocja_N5s2I", title: "History of Rwanda (Overview)", subject: "Social", level: "P6", duration: "14m", teacherRecommended: true },
  { id: "m0gzbDROUF8", title: "Geography of Africa for Kids", subject: "Social", level: "P5", duration: "10m", teacherRecommended: true },
  { id: "5pjgTkHmzJM", title: "How Governments Work – Simple", subject: "Social", level: "P6", duration: "9m", teacherRecommended: false },
  { id: "mOJlg8g8_yw", title: "Geopolitics of East Africa", subject: "Social", level: "P6", duration: "12m", teacherRecommended: true },
  { id: "P_vS5WshvS0", title: "Ancient Civilizations for Students", subject: "Social", level: "P5", duration: "11m", teacherRecommended: false },
];

export const GAMES = [
  { id: "math", title: "Calculation Engine", category: "Mathematics", desc: "Precision-based numerical validation." },
  { id: "memory", title: "Pattern Relay", category: "Cognitive", desc: "Sequence retention and visual synthesis." },
  { id: "spell", title: "Signal Transcription", category: "Linguistics", desc: "Phonological audit and verification." },
  { id: "word", title: "Semantic Mapping", category: "Linguistics", desc: "Synonym identification and linguistic pairing." },
  { id: "logic", title: "Logic Matrix", category: "Cognitive", desc: "Deductive reasoning and Boolean validation." },
  { id: "physics", title: "Physics Playground", category: "Applied Science", desc: "Simulate laws of motion and force." },
];

export const CAREERS = [
  { name: "Medical Doctor", desc: "Lead healthcare innovation and patient care.", subjects: ["Science", "Math"], skills: ["Empathy", "Focus"] },
  { name: "Software Engineer", desc: "Architect the digital infrastructure of tomorrow.", subjects: ["Math", "Science"], skills: ["Problem solving"] },
  { name: "Educational Lead", desc: "Scale knowledge and inspire future pioneers.", subjects: ["English", "Social"], skills: ["Patience"] },
  { name: "Experience Architect", desc: "Design high-fidelity digital ecosystems.", subjects: ["Art", "English"], skills: ["Creativity"] },
  { name: "Venture Strategist", desc: "Forge scalable enterprises and global markets.", subjects: ["Math", "Social"], skills: ["Leadership"] },
  { name: "Research Scientist", desc: "Decode the fundamental laws of our universe.", subjects: ["Science", "Math"], skills: ["Curiosity"] },
];

export const QUOTES = [
  "Continuous iteration leads to mastery.",
  "Analytical rigor is the foundation of innovation.",
  "Cognitive growth thrives at the edge of challenge.",
  "Consistency is the catalyst for exponential learning.",
];

export const COMMUNITY_POSTS = [
  { user: "Aline", msg: "Achieved full comprehension of algebraic fractions today.", likes: 14 },
  { user: "Yvette", msg: "The synthesis tool successfully optimized my research efficiency.", likes: 22 },
  { user: "Jean", msg: "Seeking collaborative partners for the Science mastery track.", likes: 6 },
  { user: "Grace", msg: "Maintained a 10-day execution streak in advanced linguistics.", likes: 31 },
];

export const CLASS_STUDENTS = [
  { id: 1, name: "Amani K.", grade: "P6", mastery: 74, dyslexia: true, lastActive: "2h ago", risk: "low" },
  { id: 2, name: "Bosco M.", grade: "P6", mastery: 42, dyslexia: false, lastActive: "1d ago", risk: "high" },
  { id: 3, name: "Claudine U.", grade: "P6", mastery: 88, dyslexia: false, lastActive: "30m ago", risk: "low" },
  { id: 4, name: "Diane I.", grade: "P6", mastery: 55, dyslexia: true, lastActive: "5h ago", risk: "medium" },
  { id: 5, name: "Eric N.", grade: "P6", mastery: 38, dyslexia: false, lastActive: "3d ago", risk: "high" },
  { id: 6, name: "Faith M.", grade: "P6", mastery: 71, dyslexia: false, lastActive: "1h ago", risk: "low" },
  { id: 7, name: "Gilbert R.", grade: "P6", mastery: 60, dyslexia: true, lastActive: "4h ago", risk: "medium" },
  { id: 8, name: "Hope T.", grade: "P6", mastery: 92, dyslexia: false, lastActive: "10m ago", risk: "low" },
];

export const TUTOR_REPLIES = [
  "Excellent inquiry. Let's analyze the core architecture of this problem.",
  "Conceptualize fractions as precision-engineered partitions of a whole system.",
  "Your trajectory is optimal. Maintain this focus during complex modules.",
  "Try visual modeling to simulate the underlying logic of the equation.",
  "Mastery is a progressive sequence. Continue your current momentum.",
  "Let's isolate a smaller variable first to establish a baseline.",
];

export function simplifyText(text: string): string {
  if (!text.trim()) return "";
  // Mock simplification: shorten sentences, replace complex words
  const replacements: Record<string, string> = {
    utilize: "use", commence: "start", terminate: "end", endeavor: "try",
    subsequently: "then", additionally: "also", approximately: "about",
    demonstrate: "show", facilitate: "help", consequently: "so",
    photosynthesis: "how plants make food", precipitation: "rain",
  };
  let out = text;
  Object.entries(replacements).forEach(([k, v]) => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
  });
  // Split long sentences
  out = out.replace(/([.!?])\s+/g, "$1\n\n");
  return out;
}