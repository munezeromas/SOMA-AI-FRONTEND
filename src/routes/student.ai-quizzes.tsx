import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Sparkles, Brain, ArrowRight, RotateCcw, Send, Mic, MicOff,
  Trophy, CheckCircle2, XCircle, ChevronRight, Volume2
} from "lucide-react";
import { cohereSimplify } from "@/lib/cohere-server";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/ai-quizzes")({
  head: () => ({ meta: [{ title: "AI Quizzes — Soma AI" }] }),
  component: AIQuizzes,
});

const SUBJECTS = [
  { label: "Mathematics", emoji: "🔢", color: "bg-blue-500" },
  { label: "English", emoji: "📖", color: "bg-purple-500" },
  { label: "Science", emoji: "🔬", color: "bg-green-500" },
  { label: "Social Studies", emoji: "🌍", color: "bg-amber-500" },
  { label: "ICT", emoji: "💻", color: "bg-indigo-500" },
  { label: "Art", emoji: "🎨", color: "bg-pink-500" },
];

const GRADES = ["P1", "P2", "P3", "P4", "P5", "P6"];
const QUESTION_TYPES = ["multiple_choice", "open", "speaking", "multiple_choice", "open"];

interface QuizQuestion {
  type: "multiple_choice" | "open" | "speaking";
  question: string;
  options?: string[];  // A) ... B) ... C) ... D) ...
  correct?: string;    // "A", "B", "C", or "D"
}

function parseQuestion(raw: string, type: string): QuizQuestion {
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

  if (type === "multiple_choice") {
    const questionLine = lines.find(l => l.toUpperCase().startsWith("QUESTION:"))?.replace(/^QUESTION:\s*/i, "") ?? raw;
    const options = lines.filter(l => /^[A-D][)\.:]/.test(l));
    const correctLine = lines.find(l => l.toUpperCase().startsWith("CORRECT:") || l.toUpperCase().startsWith("ANSWER:"));
    const correct = correctLine?.match(/[A-D]/)?.[0] ?? undefined;

    if (options.length >= 2) {
      return { type: "multiple_choice", question: questionLine, options, correct };
    }
  }

  // Fallback — treat as open question
  const questionText = lines.find(l => l.toUpperCase().startsWith("QUESTION:"))?.replace(/^QUESTION:\s*/i, "") ?? raw;
  return { type: type as any, question: questionText };
}

function AIQuizzes() {
  const [step, setStep] = useState<"setup" | "quiz" | "result">("setup");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("P3");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openAnswer, setOpenAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const recognitionRef = useRef<any>(null);

  const startQuiz = async () => {
    if (!subject.trim()) return;
    setStep("quiz");
    setLoading(true);
    setCurrentQ(0);
    setAnswers([]);
    setFeedback(null);
    setQuestions([]);

    // Generate all questions upfront
    const generated: QuizQuestion[] = [];
    for (let i = 0; i < numQuestions; i++) {
      const type = QUESTION_TYPES[i % QUESTION_TYPES.length];
      try {
        const prompt =
          type === "multiple_choice"
            ? `Generate a UNIQUE multiple choice question (Question ${i + 1} of ${numQuestions}) for a ${grade} student about ${subject} based on the Rwandan curriculum. Format EXACTLY:\nQUESTION: [question]\nA) [option]\nB) [option]\nC) [option]\nD) [option]\nCORRECT: [letter]`
            : `Generate a UNIQUE ${type === "speaking" ? "open verbal" : "open-ended short answer"} question (Question ${i + 1} of ${numQuestions}) for a ${grade} student about ${subject} based on the Rwandan curriculum. Format: QUESTION: [question]`;

        const raw = await cohereSimplify({ data: { text: prompt, grade, subject, promptType: "quiz-start" } });
        generated.push(parseQuestion(raw ?? "", type));
      } catch {
        generated.push({ type: "open", question: `Tell me one thing you know about ${subject}.` });
      }
    }
    setQuestions(generated);
    setLoading(false);
  };

  const submitAnswer = async (ans: string) => {
    if (!ans.trim() || loading) return;
    setLoading(true);
    const q = questions[currentQ];

    const evalPrompt = `A ${grade} student answered the question: "${q.question}"\nTheir answer: "${ans}"${q.correct ? `\nThe correct answer was: ${q.correct}` : ""}\nCarefully check if their answer is correct. Give very short, encouraging feedback (1-2 sentences). You MUST explicitly tell them the real correct answer and explain why if they got it wrong. Start with whether they were right or wrong.`;

    try {
      const fb = await cohereSimplify({ data: { text: evalPrompt, grade, subject, promptType: "quiz-answer" } });
      setFeedback(fb ?? "Great effort!");
      // Check if correct for MC
      if (q.type === "multiple_choice" && q.correct) {
        const isRight = ans.toUpperCase().startsWith(q.correct);
        if (isRight) setScore(s => s + 1);
      } else {
        // Open/speaking — always give partial credit
        setScore(s => s + 0.5);
      }
    } catch {
      setFeedback("Great effort! Keep going!");
    }

    setAnswers(prev => [...prev, ans]);
    setOpenAnswer("");
    setTranscript("");
    setLoading(false);
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQ + 1 >= questions.length) {
      setStep("result");
    } else {
      setCurrentQ(q => q + 1);
    }
  };

  const toggleMic = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Microphone not supported in this browser."); return; }

    try {
      const rec = new SR();
      rec.lang = "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onerror = (e: any) => {
        console.warn("Quiz Speech Error:", e.error);
        if (e.error === 'not-allowed') alert("Microphone access is blocked by Windows or your browser! Please check Windows Privacy Settings -> Microphone.");
        else if (e.error === 'audio-capture') alert("No microphone detected. Please plug in a microphone.");
        else if (e.error === 'network') alert("Network error. Speech recognition requires an internet connection.");
        if (e.error !== 'no-speech') setIsListening(false);
      };
      rec.onresult = (e: any) => {
        let full = "";
        for (let i = 0; i < e.results.length; ++i) {
          full += e.results[i][0].transcript;
        }
        setTranscript(full);
      };
      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const resetQuiz = () => {
    setStep("setup");
    setQuestions([]);
    setAnswers([]);
    setFeedback(null);
    setScore(0);
    setCurrentQ(0);
    setOpenAnswer("");
    setTranscript("");
  };

  const q = questions[currentQ];
  const starScore = Math.round((score / numQuestions) * 5);

  // ── SETUP SCREEN ──────────────────────────────────────────────────
  if (step === "setup") {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-10 animate-in fade-in duration-500">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">Soma AI Quiz</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            Let's test your <span className="text-primary">knowledge!</span>
          </h1>
          <p className="text-muted-foreground font-semibold text-lg max-w-xl mx-auto">
            Pick a subject, choose your grade, and Soma AI will quiz you with different types of questions!
          </p>
        </div>

        {/* Subject chips */}
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">📚 Pick a subject</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUBJECTS.map((s) => (
              <button
                key={s.label}
                onClick={() => setSubject(s.label)}
                className={`h-20 rounded-2xl flex flex-col items-center justify-center gap-1 font-black transition-all hover:scale-105 active:scale-95 border-2 ${
                  subject === s.label
                    ? "border-primary bg-primary/10 text-primary scale-105"
                    : "border-white/10 bg-card/40 text-foreground hover:border-white/30"
                }`}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-xs uppercase tracking-widest">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Custom subject input */}
          <div className="relative mt-3">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Or type any subject… (e.g. Dinosaurs, Cooking, Space)"
              className="w-full h-14 rounded-2xl bg-card/60 border border-white/10 px-6 text-base font-bold placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 ring-primary/30"
            />
          </div>
        </div>

        {/* Grade */}
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">🎓 Your grade</p>
          <div className="flex flex-wrap gap-3">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`h-12 px-6 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 border-2 ${
                  grade === g
                    ? "border-primary bg-primary text-white scale-105"
                    : "border-white/10 bg-card/40 text-foreground hover:border-white/30"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Number of questions */}
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
            🎯 Number of questions: <span className="text-primary">{numQuestions}</span>
          </p>
          <div className="flex gap-3">
            {[3, 5, 10].map((n) => (
              <button
                key={n}
                onClick={() => setNumQuestions(n)}
                className={`h-12 px-6 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 border-2 ${
                  numQuestions === n
                    ? "border-primary bg-primary text-white"
                    : "border-white/10 bg-card/40 text-foreground hover:border-white/30"
                }`}
              >
                {n} questions
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={startQuiz}
          disabled={!subject.trim()}
          className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_8px_30px_rgba(74,144,217,0.4)]"
        >
          <Sparkles className="h-5 w-5" />
          Start Quiz — {subject || "pick a subject above"}
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Mascot */}
        <div className="flex justify-center">
          <div className="h-32 w-32">
            <RiveAnimation src="/riv-animations/17629-33045-strawberry-studying-mascot.riv" className="w-full h-full" />
          </div>
        </div>
      </div>
    );
  }

  // ── LOADING / GENERATING QUESTIONS ───────────────────────────────
  if (step === "quiz" && (loading && questions.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
        <div className="h-40 w-40">
          <RiveAnimation src="/riv-animations/27328-51630-loading-books.riv" className="w-full h-full" />
        </div>
        <p className="text-xl font-black text-foreground/60 uppercase tracking-widest animate-pulse">
          Preparing your quiz…
        </p>
      </div>
    );
  }

  // ── QUIZ SCREEN ───────────────────────────────────────────────────
  if (step === "quiz" && q) {
    const typeLabel = q.type === "multiple_choice" ? "🔤 Multiple Choice"
      : q.type === "speaking" ? "🎤 Speaking Question"
      : "✏️ Open Question";

    return (
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6 animate-in fade-in duration-400">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
            <span>Question {currentQ + 1} of {numQuestions}</span>
            <span className="text-primary">{subject} · {grade}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((currentQ) / numQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="rounded-3xl bg-card/60 border border-white/10 p-8 space-y-6">
          {/* Question type badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
            {typeLabel}
          </span>

          {/* Question text */}
          <p className="text-2xl font-black leading-snug">{q.question}</p>

          {/* ── MULTIPLE CHOICE ── */}
          {q.type === "multiple_choice" && !feedback && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options?.map((opt, i) => {
                const letter = opt.match(/^([A-D])/)?.[1] ?? String.fromCharCode(65 + i);
                return (
                  <button
                    key={i}
                    onClick={() => submitAnswer(letter)}
                    disabled={loading}
                    className="h-16 rounded-2xl bg-white/5 border-2 border-white/10 hover:border-primary hover:bg-primary/10 font-bold text-left px-5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-sm"
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── OPEN QUESTION ── */}
          {q.type === "open" && !feedback && (
            <div className="space-y-3">
              <textarea
                value={openAnswer}
                onChange={(e) => setOpenAnswer(e.target.value)}
                placeholder="Type your answer here…"
                rows={4}
                className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-base font-semibold focus:outline-none focus:ring-2 ring-primary/30 resize-none placeholder:text-muted-foreground/40"
              />
              <button
                onClick={() => submitAnswer(openAnswer)}
                disabled={!openAnswer.trim() || loading}
                className="w-full h-14 rounded-2xl bg-primary text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                Submit Answer
              </button>
            </div>
          )}

          {/* ── SPEAKING QUESTION ── */}
          {q.type === "speaking" && !feedback && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-semibold">
                🎤 Click the microphone button and speak your answer clearly!
              </p>
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={toggleMic}
                  className={`h-24 w-24 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse scale-110"
                      : "bg-primary/10 border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105"
                  }`}
                >
                  {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
                </button>
                {isListening && (
                  <p className="text-sm font-bold text-red-400 animate-pulse uppercase tracking-widest">
                    Listening… speak now!
                  </p>
                )}
                {transcript && (
                  <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">You said:</p>
                    <p className="text-base font-semibold">{transcript}</p>
                  </div>
                )}
                {transcript && (
                  <button
                    onClick={() => submitAnswer(transcript)}
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-primary text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-40"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Submit This Answer
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── FEEDBACK ── */}
          {feedback && (
            <div className="space-y-4 animate-in fade-in duration-400">
              <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
                <p className="text-xs font-black uppercase tracking-widest text-green-400 mb-2">Soma AI says:</p>
                <p className="text-base font-semibold leading-relaxed">{feedback}</p>
              </div>
              <button
                onClick={nextQuestion}
                className="w-full h-14 rounded-2xl bg-primary text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                {currentQ + 1 >= numQuestions ? (
                  <><Trophy className="h-4 w-4" /> See My Results</>
                ) : (
                  <><ChevronRight className="h-4 w-4" /> Next Question</>
                )}
              </button>
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center gap-2 py-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col items-center gap-8 animate-in zoom-in-90 duration-500">
      <div className="h-40 w-40">
        <RiveAnimation src="/riv-animations/22180-41567-level-up-badges-animation.riv" className="w-full h-full" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Quiz Complete!</p>
        <h2 className="text-6xl font-black tracking-tighter">
          {Math.round(score)}<span className="text-primary">/{numQuestions}</span>
        </h2>
        <div className="flex justify-center gap-1 py-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-2xl ${i < starScore ? "opacity-100" : "opacity-20"}`}>⭐</span>
          ))}
        </div>
        <p className="text-muted-foreground font-semibold text-lg">
          {score / numQuestions >= 0.8
            ? "Amazing work! You're a star! 🌟"
            : score / numQuestions >= 0.5
            ? "Great effort! Keep practicing! 💪"
            : "Good try! Every mistake is a lesson! 📚"}
        </p>
        <p className="text-sm font-bold text-muted-foreground">
          Subject: <span className="text-foreground">{subject}</span> · Grade: <span className="text-foreground">{grade}</span>
        </p>
      </div>

      <div className="flex gap-4 w-full">
        <button
          onClick={() => { setStep("quiz"); setCurrentQ(0); setAnswers([]); setFeedback(null); setScore(0); startQuiz(); }}
          className="flex-1 h-14 rounded-2xl bg-primary text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
        <button
          onClick={resetQuiz}
          className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 font-black text-sm hover:bg-white/10 transition-all"
        >
          New Subject
        </button>
      </div>
    </div>
  );
}
