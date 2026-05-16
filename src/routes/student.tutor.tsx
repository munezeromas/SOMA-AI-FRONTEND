import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { TalkingChatbot } from "@/components/soma/TalkingChatbot";
import { TUTOR_REPLIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Send, Cpu, Sparkles, Network, Mic, MicOff, Volume2 } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";
import { memo as reactMemo } from "react";

const MemoizedTalkingChatbot = reactMemo(TalkingChatbot);

export const Route = createFileRoute("/student/tutor")({
  head: () => ({ meta: [{ title: "Soma AI — Your Personal Tutor" }] }),
  component: Tutor,
  errorComponent: ({ error }) => (
    <div className="p-10 bg-red-950 text-red-400 font-mono text-xs rounded-3xl m-10">
      <h2 className="text-xl font-bold mb-4">Runtime Error</h2>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <pre className="whitespace-pre-wrap mt-4 opacity-50">{error.stack}</pre>
    </div>
  )
});

const SUGGESTIONS = ["Explain the water cycle", "What is an algorithm?", "Help me practice French", "How do Black Holes work?"];
type Msg = { role: "user" | "ai"; text: string };

// Persist chat history across navigations
let globalChatHistory: Msg[] = [
  { role: "ai", text: "Neural synchronization complete. I am Soma, designed to help you learn and improve your grammar! What shall we explore today?" }
];

function Tutor() {
  const [messages, setMessages] = useState<Msg[]>(globalChatHistory);

  // Sync to global history whenever messages update
  useEffect(() => {
    globalChatHistory = messages;
  }, [messages]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lastSpeech, setLastSpeech] = useState("Neural synchronization complete. I am Soma, designed to help you learn and improve your grammar. What shall we explore today?");
  const [isMuted, setIsMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const toggleListen = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition isn't supported in your browser. Please try Chrome.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (interimTranscript) {
         setInput(prev => {
            // To prevent appending multiple times during interim results, 
            // we'd theoretically need more complex state. For now, just overriding it 
            // gives the live feedback they asked for without spamming text loops!
            return interimTranscript;
         });
      }
      
      if (finalTranscript.trim()) {
        setInput(finalTranscript);
        send(finalTranscript);
      }
    };
    
    recognitionRef.current = recognition;
    recognition.start();
  };

  const send = async (t?: string) => {
    const txt = (t ?? input).trim();
    if (!txt) return;
    setInput("");
    setLastSpeech(""); // Stop current speech immediately
    setMessages((m) => [...m, { role: "user", text: txt }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_COHERE_API_KEY;
      const apiUrl = import.meta.env.VITE_COHERE_API_URL || "https://api.cohere.com/v1/chat";
      if (!apiKey) {
        throw new Error("Missing Cohere API Key.");
      }
      
      const systemPrompt = `You are Soma AI, an encouraging and patient school teacher. Your job is to answer student questions, provide clear helpful examples, and help kids have good grammar—especially those with dyslexia. Always positively and gently correct the student's grammar as your first sentence, then answer their question warmly with clear examples. Be supportive, empathetic, and keep your answers educational but concise.`;

      // Build conversational memory map, filtering out any empty states
      const chatHistory = messages
        .filter(m => m.text && m.text.trim().length > 0)
        .map(m => ({
          role: m.role === "user" ? "USER" : "CHATBOT",
          message: m.text
        }));

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({
          message: txt,
          chat_history: chatHistory,
          preamble: systemPrompt,
          stream: true
        })
      });

      if (!res.body) throw new Error("Network stream unavailable.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let replyTokenBuffer = "";
      let spokenCursor = 0;
      
      // Inject placeholder
      setMessages((m) => [...m, { role: "ai", text: "" }]);
      // Keep loading true while streaming to show the frying pan animation

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());
        
        let chunkCount = 0;
        for (const line of lines) {
           try {
              const data = JSON.parse(line);
              if (data.event_type === "text-generation" && data.text) {
                 replyTokenBuffer += data.text;
                 chunkCount++;
                 
                 // Look for sentence boundaries to stream speech
                 const match = replyTokenBuffer.substring(spokenCursor).match(/([.!?]+[\s\n]+)/);
                 if (match) {
                    const boundary = match.index! + match[0].length;
                    const sentence = replyTokenBuffer.substring(spokenCursor, spokenCursor + boundary).trim();
                    if (sentence) {
                      window.dispatchEvent(new CustomEvent("soma-speak", { detail: { text: sentence, queue: true } }));
                    }
                    spokenCursor += boundary;
                 }

                 // Update the chat state periodically to prevent freezing (throttle)
                 if (chunkCount % 4 === 0) {
                   setMessages((m) => {
                      const newM = [...m];
                      newM[newM.length - 1] = { role: "ai", text: replyTokenBuffer };
                      return newM;
                   });
                 }
              } else if (data.message && data.event_type === undefined) {
                 replyTokenBuffer = data.message;
                 setMessages((m) => {
                    const newM = [...m];
                    newM[newM.length - 1] = { role: "ai", text: replyTokenBuffer };
                    return newM;
                 });
              }
           } catch(e) {}
        }
      }

      // Final update
      setMessages((m) => {
         const newM = [...m];
         newM[newM.length - 1] = { role: "ai", text: replyTokenBuffer };
         return newM;
      });

      // Speak any remaining text that didn't end with a punctuation mark
      const remaining = replyTokenBuffer.substring(spokenCursor).trim();
      if (remaining) {
        window.dispatchEvent(new CustomEvent("soma-speak", { detail: { text: remaining, queue: true } }));
      }

      console.log("Final Reply Buffer:", replyTokenBuffer);
      if (!replyTokenBuffer) {
        setLastSpeech("Diagnostic failed. Neural path not found.");
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Chat Error:", err);
      const reply = `I am currently forced into offline diagnostic mode. Error: [${err.message}]. Please ensure your VITE_COHERE_API_KEY is active and restart your terminal.`;
      setMessages((m) => [...m, { role: "ai", text: reply }]);
      setLastSpeech(reply);
      setLoading(false);
    }
  };

  return (
    <div className="grid xl:grid-cols-[500px_1fr] gap-8 max-w-[1600px] w-full mx-auto animate-in fade-in zoom-in-95 duration-700 h-[calc(100vh-7rem)] pb-6 px-4">
      
      {/* 3D AVATAR MODULE */}
      <div className="relative rounded-[40px] bg-gradient-to-b from-card/80 to-background/50 border border-white/10 shadow-[0_0_80px_rgba(var(--primary),0.05)] overflow-hidden flex flex-col items-center">
        
        {/* Dynamic backdrop glow */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

        <div className="w-full shrink-0 relative mt-8 px-8">
           <div className="rounded-[32px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative bg-black/10 border border-white/5 ring-1 ring-black/20">
             <MemoizedTalkingChatbot textToSpeak={lastSpeech} isMuted={isMuted} />
             <div className="absolute top-4 left-4 glass bg-black/40 rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/10 shadow-sm backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_10px_rgba(var(--success),0.8)]" />
                <span className="text-[9px] font-black tracking-widest text-white/90 uppercase mt-0.5">Core Active</span>
             </div>
             <button 
               onClick={() => setIsMuted(!isMuted)}
               className="absolute top-4 right-4 glass bg-black/40 hover:bg-black/60 rounded-full p-2 border border-white/10 shadow-sm backdrop-blur-md text-white transition-colors"
               title={isMuted ? "Unmute Avatar" : "Mute Avatar"}
             >
               {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
             </button>
           </div>
        </div>

        <div className="text-center mt-10 mb-8 z-10 px-8 flex-1 flex flex-col justify-end w-full">
           <h2 className="text-4xl font-black tracking-tighter mb-2">Soma <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">AI</span></h2>
           <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-80">Embodied AI Link</p>
           
           <div className="mt-8 space-y-3 w-full">
             {SUGGESTIONS.map((s) => (
               <button key={s} onClick={() => send(s)} disabled={loading} className="w-full text-xs font-bold tracking-wide rounded-2xl glass bg-card/60 hover:bg-primary/10 hover:border-primary/30 px-6 py-4 text-left transition-all duration-300 border border-white/5 disabled:opacity-50 flex items-center justify-between group text-foreground shadow-sm">
                 {s} 
                 <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all scale-75 group-hover:scale-100" />
               </button>
             ))}
           </div>
        </div>
      </div>

      {/* INTELLIGENT CHAT INTERFACE */}
      <div className="rounded-[40px] glass bg-card/40 border border-white/5 shadow-2xl flex flex-col h-full overflow-hidden relative">
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        
        {/* Header */}
        <div className="p-8 pb-5 flex items-center gap-4 relative z-10 border-b border-white/5 bg-background/20 backdrop-blur-sm">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
            <RiveAnimation src="/riv-animations/22673-42423-for-education-purpose.riv" className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Soma AI Portal</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 mt-1"><Sparkles className="h-3 w-3" /> Always here to listen</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
              <div className={`max-w-[85%] rounded-[28px] px-8 py-5 text-[15px] font-medium leading-relaxed shadow-md backdrop-blur-md whitespace-pre-wrap relative group ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm bg-gradient-to-br from-primary to-primary/80" : "glass bg-card/80 border border-white/10 rounded-bl-sm text-foreground"}`}>
                 {m.text}
                 {m.role === "ai" && m.text && (
                   <button 
                     onClick={() => setLastSpeech(m.text + " ")} 
                     className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full glass bg-white/10 hover:bg-primary/20 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                     title="Read Aloud"
                   >
                     <Volume2 className="h-4 w-4" />
                   </button>
                 )}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start animate-in fade-in">
               <div className="rounded-[28px] rounded-bl-sm px-4 py-3 flex flex-col items-start gap-1 shadow-sm" style={{ background: "rgba(74,144,217,0.15)", border: "1px solid rgba(74,144,217,0.2)" }}>
                 <div className="w-32 h-24 bg-white rounded-2xl shadow-sm mb-2 overflow-hidden flex items-center justify-center">
                   <RiveAnimation src="/riv-animations/1137-2229-cooking-animation.riv" className="w-[120%] h-[120%]" stateMachines="State Machine 1" />
                 </div>
                 <p className="text-xs font-black text-[#4A90D9] italic">Soma is cooking... 🍳</p>
               </div>
             </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 pt-2 relative z-10 bg-gradient-to-t from-background/80 to-transparent">
          <div className="relative flex items-center gap-3">
             <Button size="icon" variant={isListening ? "default" : "outline"} onClick={toggleListen} className={`h-16 w-16 shrink-0 rounded-full transition-all border-white/10 ${isListening ? "animate-pulse shadow-[0_0_20px_rgba(var(--primary),0.6)] bg-primary text-white" : "glass bg-background/50 hover:bg-background/80"}`}>
                {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6 text-primary" />}
             </Button>
             <input value={input} disabled={loading || isListening} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={isListening ? "Listening natively..." : "Transmit inquiry to Core..."} className="flex-1 rounded-full glass bg-background/80 focus:ring-4 ring-primary/20 placeholder:text-muted-foreground/40 px-8 py-6 text-base font-semibold border border-white/10 shadow-inner transition-all disabled:opacity-50" />
             <Button size="icon" disabled={loading || isListening || !input.trim()} onClick={() => send()} className="h-16 w-16 shrink-0 rounded-full shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] disabled:shadow-none hover:scale-105 transition-all text-white">
                <Send className="h-6 w-6 ml-1" />
             </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
