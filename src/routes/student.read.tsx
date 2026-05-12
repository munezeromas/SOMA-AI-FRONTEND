
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight,
  Volume2, 
  Brain, 
  Settings, 
  Type, 
  Maximize2, 
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Pause,
  Play
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { cohereSimplify } from "@/lib/cohere-server";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

const searchSchema = z.object({
  file: z.string(),
  title: z.string(),
});

export const Route = createFileRoute("/student/read")({
  validateSearch: (search) => searchSchema.parse(search),
  component: Reader,
});

function Reader() {
  const { file, title } = Route.useSearch();
  const [isReading, setIsReading] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [isDyslexicMode, setIsDyslexicMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default for prominence
  const [page, setPage] = useState(1);
  const [isSimplifying, setIsSimplifying] = useState(false);

  // Real Cohere Simplification via Server Function
  const simplifyText = async () => {
    if (!selectedText) {
      alert("Please select some text in the book first!");
      return;
    }
    
    setIsSimplifying(true);
    setIsSidebarOpen(true);
    
    try {
      const grade = title.split(' ')[0] || "1";
      const subject = title.split(' ')[1] || "Mathematics";
      
      const text = await cohereSimplify({ 
        data: { text: selectedText, grade, subject } 
      });
      
      setSimplifiedText(text || "I couldn't simplify that right now. Try another sentence!");
    } catch (error) {
      console.error("Cohere Error:", error);
      setSimplifiedText("Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment!");
    } finally {
      setIsSimplifying(false);
    }
  };

  // Text Selection Handler
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.trim().length > 0) {
        setSelectedText(selection);
      }
    };
    document.addEventListener("mouseup", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Speech API
  const speak = (text: string) => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support text-to-speech.");
      return;
    }
    
    // Cancel and reset
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Ensure voices are loaded
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Premium') || v.name.includes('Google'))) || 
                        voices.find(v => v.lang.startsWith('en')) || 
                        voices[0];
    
    if (englishVoice) utterance.voice = englishVoice;
    utterance.pitch = 1.05;
    utterance.rate = 0.98;
    
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = (e) => {
      console.error("SpeechSynthesis Error:", e);
      setIsReading(false);
    };

    // Chrome/Safari Fix: Speech synthesis sometimes needs a tiny "kickstart"
    // to work if the engine was idle.
    const kickstart = new SpeechSynthesisUtterance("");
    kickstart.volume = 0;
    window.speechSynthesis.speak(kickstart);

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const toggleSpeech = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const textToRead = selectedText || (simplifiedText ? `Here is the simplified version: ${simplifiedText}` : `You are on page ${page} of ${title}. Please highlight any word or sentence you find difficult, and I will read it and explain it for you in a very simple way.`);
      speak(textToRead);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-[#080C14] flex flex-col transition-all duration-500 ${isDyslexicMode ? 'font-dyslexic' : ''}`}>
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A1020]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link to="/student/library" className="p-2 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
            <ChevronLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-tight truncate max-w-[200px]">{title}</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Soma AI Reader</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Page Navigation */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><ChevronLeft className="h-4 w-4 text-white" /></button>
            <div className="flex items-center gap-1.5 px-2">
              <span className="text-[10px] font-black text-white/40 uppercase">Page</span>
              <input 
                type="number" 
                value={page} 
                onChange={(e) => setPage(Number(e.target.value))}
                className="w-10 bg-transparent text-center text-sm font-black text-white focus:outline-none"
              />
            </div>
            <button onClick={() => setPage(p => p + 1)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight className="h-4 w-4 text-white" /></button>
          </div>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex items-center gap-2">
            <button onClick={() => setFontSize(s => Math.min(s + 2, 32))} className="p-2 rounded-xl border border-white/5 hover:bg-white/5 text-white/60 hover:text-white transition-all"><ZoomIn className="h-4 w-4" /></button>
            <button onClick={() => setFontSize(s => Math.max(s - 2, 12))} className="p-2 rounded-xl border border-white/5 hover:bg-white/5 text-white/60 hover:text-white transition-all"><ZoomOut className="h-4 w-4" /></button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button 
              onClick={() => setIsDyslexicMode(!isDyslexicMode)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isDyslexicMode ? 'bg-primary text-white shadow-glow' : 'border border-white/5 text-white/60 hover:text-white'}`}>
              Dyslexic Mode
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 rounded-xl border border-white/5 hover:bg-white/5 transition-all ${isSidebarOpen ? 'bg-primary/20 text-primary border-primary/20' : 'text-white/60'}`}><Brain className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center custom-scrollbar">
          <div className="max-w-5xl w-full bg-[#0E1524] rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden h-full">
            <iframe 
              key={`${file}-${page}`}
              src={`${file}#page=${page}&toolbar=0&navpanes=0&scrollbar=0`} 
              className="w-full h-full bg-white"
              title={title}
            />
            
            {/* Prominent floating tools */}
            <div className="absolute top-6 right-6 flex flex-col gap-3">
               <button onClick={simplifyText} className="h-12 w-12 rounded-2xl bg-primary text-white shadow-glow flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative">
                 <Sparkles className="h-5 w-5" />
                 <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#0A1020] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Make it easier</span>
               </button>
               <button onClick={toggleSpeech} className="h-12 w-12 rounded-2xl bg-[#0A1020] text-primary border border-primary/20 shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative">
                 <Volume2 className="h-5 w-5" />
                 <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#0A1020] border border-white/10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Read aloud</span>
               </button>
            </div>
          </div>
        </div>


        {/* AI Sidebar */}
        {isSidebarOpen && (
          <aside className="w-96 border-l border-white/5 bg-[#0A1020]/50 backdrop-blur-xl p-8 overflow-y-auto animate-in slide-in-from-right duration-500">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Soma AI Assistant
            </h3>
            
            {simplifiedText ? (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 relative group overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 h-24 w-24 opacity-20 group-hover:scale-125 transition-transform">
                     <RiveAnimation src="/riv-animations/17629-33045-strawberry-studying-mascot.riv" className="w-full h-full" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Simplified Explanation</p>
                  <p className="text-sm font-medium leading-relaxed text-white/80 relative z-10">{simplifiedText}</p>
                </div>
                
                <div className="space-y-3">
                  <button onClick={() => speak(simplifiedText)} className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                    <Volume2 className="h-4 w-4 text-primary" />
                    Read Explanation
                  </button>
                  <button onClick={() => setSimplifiedText(null)} className="w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Clear Assistant</button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-white/20" />
                </div>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                  Select any text in the book <br /> to get an AI-powered <br /> simplified version.
                </p>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
