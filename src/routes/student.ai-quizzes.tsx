import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Brain, ArrowRight, CheckCircle2, RotateCcw, Send, Mic, MicOff, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cohereSimplify } from "@/lib/cohere-server";
import { TalkingChatbot } from "@/components/soma/TalkingChatbot";

export const Route = createFileRoute("/student/ai-quizzes")({
  head: () => ({ meta: [{ title: "AI Quizzes — Soma AI" }] }),
  component: AIQuizzes,
});

const SUGGESTED_TOPICS = [
  { id: "photosynthesis", label: "Photosynthesis", emoji: "🌱", color: "text-success bg-success/10" },
  { id: "multiplication", label: "Multiplication", emoji: "🔢", color: "text-primary bg-primary/10" },
  { id: "planets", label: "Solar System", emoji: "🪐", color: "text-amber-400 bg-amber-400/10" },
  { id: "coding", label: "How Coding Works", emoji: "💻", color: "text-blue-400 bg-blue-400/10" },
];

function AIQuizzes() {
  const [step, setStep] = useState<"topic" | "quiz" | "result">("topic");
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [lastSpeech, setLastSpeech] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const startQuiz = async (selectedTopic: string) => {
    setTopic(selectedTopic);
    setStep("quiz");
    setLoading(true);
    setMessages([]);

    try {
      const firstPrompt = `You are a friendly teacher. I want a 3-question quiz about "${selectedTopic}" for a primary school student. Ask the FIRST question now. Don't say anything else, just the first question.`;
      const res = await (cohereSimplify as any)({ data: { text: firstPrompt, grade: "5", subject: selectedTopic } });
      const q = res || `Let's start! What do you know about ${selectedTopic}?`;
      setMessages([{ role: "ai", text: q }]);
      setLastSpeech(q);
    } catch (e) {
       console.error(e);
       setMessages([{ role: "ai", text: "Oops, my quiz brain is a bit fuzzy. Can we try another topic?" }]);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentInput.trim() || loading) return;
    const ans = currentInput.trim();
    setCurrentInput("");
    setMessages(prev => [...prev, { role: "user", text: ans }]);
    setLoading(true);
    setLastSpeech("");

    try {
      const chatHistory = messages.map(m => `Role: ${m.role}, Text: ${m.text}`).join("\n");
      
      let nextPrompt = "";
      if (messages.length >= 5) {
         // This was the 3rd answer (AI Question 1, User 1, AI 2, User 2, AI 3, User 3)
         nextPrompt = `The student answered: "${ans}". This was the LAST question. Evaluate all their answers. Tell them their score out of 3 and give a very encouraging summary. Start with "QUIZ COMPLETE: "`;
      } else {
         nextPrompt = `The student answered: "${ans}". Tell them if they got it right or wrong briefly and encouragingly, then ask the NEXT question for our quiz on "${topic}".`;
      }

      const res = await (cohereSimplify as any)({ data: { text: nextPrompt, grade: "5", subject: topic } });
      const reply = res || "Interesting! Let's move to the next part.";
      
      if (reply.includes("QUIZ COMPLETE")) {
         setStep("result");
         // Crude score extraction
         const scoreMatch = reply.match(/(\d)\/3/);
         if (scoreMatch) setQuizScore(parseInt(scoreMatch[1]));
      }

      setMessages(prev => [...prev, { role: "ai", text: reply }]);
      setLastSpeech(reply);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleListen = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCurrentInput(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      {step === "topic" && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in-95 duration-700">
           <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                 <Sparkles className="h-5 w-5 animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-widest text-foreground">AI Intelligence Core</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter">What shall we <br /><span className="text-primary">explore</span> today?</h1>
              <p className="text-muted-foreground font-medium text-lg">Pick a topic and I'll create a special quiz just for you!</p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {SUGGESTED_TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => startQuiz(t.label)}
                  className="group relative h-48 rounded-[40px] glass bg-card/40 border border-white/5 p-8 flex flex-col items-center justify-center gap-4 hover:bg-primary/10 hover:border-primary/20 transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{t.emoji}</span>
                  <span className="text-sm font-black uppercase tracking-widest">{t.label}</span>
                </button>
              ))}
           </div>

           <div className="w-full max-w-xl relative group">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startQuiz(topic)}
                placeholder="Or type any topic here (e.g. Dinosaurs)..."
                className="w-full h-18 rounded-full bg-card/80 border border-white/10 px-8 pr-32 text-lg font-bold placeholder:text-muted-foreground/30 focus:ring-4 ring-primary/20 transition-all"
              />
              <button 
                onClick={() => startQuiz(topic)}
                disabled={!topic.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-primary text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:shadow-glow disabled:opacity-50 transition-all"
              >
                Start <ArrowRight className="h-4 w-4" />
              </button>
           </div>
        </div>
      )}

      {step === "quiz" && (
        <div className="flex-1 grid lg:grid-cols-[400px_1fr] gap-10 overflow-hidden animate-in slide-in-from-right duration-700">
           <div className="bg-card/40 rounded-[40px] border border-white/10 p-8 flex flex-col items-center">
              <div className="w-full aspect-square rounded-[32px] overflow-hidden bg-black/20 border border-white/5 relative mb-8">
                 <TalkingChatbot textToSpeak={lastSpeech} />
                 <div className="absolute top-4 left-4 flex gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                       <div key={i} className={`h-2 w-8 rounded-full border border-white/10 transition-all duration-500 ${i < messages.filter(m => m.role === 'user').length ? 'bg-primary shadow-glow' : 'bg-white/5'}`} />
                    ))}
                 </div>
              </div>
              
              <div className="text-center space-y-2 mt-auto">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Target Topic</p>
                 <h2 className="text-3xl font-black tracking-tight">{topic}</h2>
                 <p className="text-xs font-bold text-muted-foreground">Question {messages.filter(m => m.role === 'ai').length} of 3</p>
              </div>
           </div>

           <div className="bg-card/20 rounded-[40px] border border-white/5 flex flex-col overflow-hidden relative">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                 {messages.map((m, i) => (
                   <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-6 rounded-[32px] font-bold leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-primary text-white rounded-br-sm' : 'glass bg-card/80 border border-white/10 rounded-bl-sm'}`}>
                         {m.text}
                      </div>
                   </div>
                 ))}
                 {loading && (
                    <div className="flex justify-start">
                       <div className="glass bg-card/80 p-6 rounded-[32px] rounded-bl-sm flex gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                       </div>
                    </div>
                 )}
              </div>

              <div className="p-8 bg-black/20 border-t border-white/5">
                 <div className="relative flex items-center gap-4">
                    <button onClick={toggleListen} className={`h-16 w-16 rounded-full shrink-0 flex items-center justify-center transition-all ${isListening ? 'bg-error text-white animate-pulse' : 'bg-white/5 text-primary hover:bg-white/10'}`}>
                       {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </button>
                    <input 
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                      placeholder="Type your answer here..."
                      className="flex-1 h-16 rounded-full bg-white/5 border border-white/10 px-8 text-lg font-bold focus:ring-4 ring-primary/20 transition-all disabled:opacity-50"
                      disabled={loading}
                    />
                    <button 
                      onClick={submitAnswer}
                      disabled={!currentInput.trim() || loading}
                      className="h-16 w-16 rounded-full bg-primary text-white shadow-glow flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                       <Send className="h-6 w-6 ml-1" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {step === "result" && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-90 duration-700">
           <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative h-64 w-64 rounded-full border-8 border-primary/20 flex flex-col items-center justify-center bg-card/40 backdrop-blur-3xl shadow-2xl">
                 <Trophy className="h-20 w-20 text-primary mb-2 drop-shadow-glow" />
                 <span className="text-5xl font-black tracking-tighter">{quizScore ?? 0}/3</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">Mastery Score</span>
              </div>
           </div>

           <div className="text-center space-y-6 max-w-xl">
              <h2 className="text-4xl font-black tracking-tight">Level Up! <span className="text-primary">+{ (quizScore ?? 0) * 50 } XP</span></h2>
              <p className="text-muted-foreground font-semibold text-lg leading-relaxed">
                 {messages[messages.length - 1].text.replace("QUIZ COMPLETE: ", "")}
              </p>
           </div>

           <div className="flex gap-4">
              <Button onClick={() => setStep("topic")} className="h-14 px-8 rounded-2xl text-base font-black shadow-glow">
                 Another Topic <Sparkles className="h-5 w-5 ml-2" />
              </Button>
              <Button onClick={() => setStep("topic")} variant="outline" className="h-14 px-8 rounded-2xl text-base font-black border-white/10 hover:bg-white/5">
                 Back to Hub <RotateCcw className="h-5 w-5 ml-2" />
              </Button>
           </div>
        </div>
      )}
    </div>
  );
}
