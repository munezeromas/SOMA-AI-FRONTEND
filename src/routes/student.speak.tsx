import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, Mic, Volume2, Edit3, BookOpen, Loader2, Play, XCircle } from "lucide-react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";
import { STUDENT } from "@/lib/mock-data";
import { cohereSimplify } from "@/lib/cohere-server";
import { useTheme } from "@/lib/theme-context";
import { toast } from "sonner";

export const Route = createFileRoute("/student/speak")({
  head: () => ({ meta: [{ title: "Language Playground — Soma AI" }] }),
  component: SpeakListenDashboard,
});

type ModeId = "read-speak" | "listen-write" | "listen-repeat";

const MODES = [
  {
    id: "read-speak",
    title: "Read & Speak",
    desc: "Read the story out loud and AI will listen!",
    emoji: "📖🗣️",
    color: "#4A90D9",
    bg: "rgba(74,144,217,0.1)",
    skill: "reading and speaking",
  },
  {
    id: "listen-write",
    title: "Listen & Write",
    desc: "Listen to the words and write what you hear!",
    emoji: "👂📝",
    color: "#2ECC71",
    bg: "rgba(46,204,113,0.1)",
    skill: "listening and spelling",
  },
  {
    id: "listen-repeat",
    title: "Listen & Repeat",
    desc: "Listen to the pronunciation and repeat after it!",
    emoji: "👂🦜",
    color: "#FF9500",
    bg: "rgba(255,149,0,0.1)",
    skill: "listening and pronunciation",
  },
];

const getFriendlyMicError = (errorCode: string): { message: string, suggestion: string } => {
  switch (errorCode) {
    case 'not-allowed':
      return {
        message: "Microphone access is blocked!",
        suggestion: "Please click the lock icon 🔒 in your browser's address bar (top-left) and set Microphone to 'Allow'. If you are on Windows, also check Windows Settings -> Privacy -> Microphone and turn on 'Allow apps to access your microphone'."
      };
    case 'audio-capture':
      return {
        message: "No microphone detected!",
        suggestion: "Please make sure a microphone or headset is plugged in, powered on, and selected as the default input device in your computer settings."
      };
    case 'network':
      return {
        message: "Internet connection issue!",
        suggestion: "Speech translation requires a stable internet connection in your browser. Please check your Wi-Fi or Ethernet connection and try again."
      };
    case 'service-not-allowed':
      return {
        message: "Speech service not allowed!",
        suggestion: "Your browser or device has restricted access to the speech recognition service. Try using official Google Chrome or check system permissions."
      };
    case 'no-speech':
      return {
        message: "We didn't hear anything!",
        suggestion: "Please speak a bit louder or check if your microphone is muted. Click the microphone button to try speaking again!"
      };
    default:
      return {
        message: `Microphone issue detected: ${errorCode}`,
        suggestion: "Please try refreshing the page, replugging your microphone, or opening this page in a secure browser like Google Chrome."
      };
  }
};

function SpeakListenDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeMode, setActiveMode] = useState<ModeId | null>(null);
  const [practiceText, setPracticeText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string, isSuccess: boolean } | null>(null);
  const [userInput, setUserInput] = useState("");
  const [micError, setMicError] = useState<{ message: string, suggestion: string } | null>(null);
  const recognitionRef = useRef<any>(null);
  const practiceTextRef = useRef(practiceText);
  
  useEffect(() => {
     practiceTextRef.current = practiceText;
  }, [practiceText]);

  useEffect(() => {
    return () => {
      shouldBeRecordingRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopDSPStream();
    };
  }, []);

  const fetchNewPractice = async (modeId: string) => {
    const mode = MODES.find((m) => m.id === modeId);
    if (!mode) return;
    
    setLoading(true);
    setPracticeText("");
    setTranscript("");
    setFeedback(null);
    setUserInput("");
    setMicError(null);

    try {
      const result = await cohereSimplify({
        data: {
          promptType: "language-practice",
          grade: STUDENT.level,
          skill: mode.skill,
        }
      });
      // clean up any potential quotes or prefixes from the AI
      const cleanText = result.replace(/^["']|["']$/g, '').replace(/Here is a sentence:|Sentence:/i, '').trim();
      setPracticeText(cleanText);
    } catch (err) {
      console.error(err);
      setPracticeText("The quick brown fox jumps over the lazy dog."); // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleStartMode = (modeId: ModeId) => {
    setActiveMode(modeId);
    fetchNewPractice(modeId);
  };

  const playTTS = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slower, clearer for kids
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const transcriptRef = useRef("");
  const evaluatedRef = useRef(false);
  const hasSpokenRef = useRef(false);
  const shouldBeRecordingRef = useRef(false);
  const accumulatedTranscriptRef = useRef("");
  const dspStreamRef = useRef<MediaStream | null>(null);
  const retryCountRef = useRef(0);

  const startDSPStream = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        dspStreamRef.current = stream;
        console.log("[DSP] Pre-warmed audio pipeline with Auto-Gain Control.");
      }
    } catch (e) {
      console.warn("[DSP] Could not warm up hardware audio pipeline:", e);
    }
  };

  const stopDSPStream = () => {
    if (dspStreamRef.current) {
      dspStreamRef.current.getTracks().forEach((track) => track.stop());
      dspStreamRef.current = null;
      console.log("[DSP] Released audio pipeline.");
    }
  };

  const toggleRecording = async () => {
    if (isRecording && recognitionRef.current) {
      shouldBeRecordingRef.current = false;
      recognitionRef.current.stop();
      stopDSPStream();
      setIsRecording(false);
      return;
    }

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error("Your browser does not support speech recognition. Please try Chrome!", { id: "speech-support" });
      return;
    }
    
    shouldBeRecordingRef.current = true;
    accumulatedTranscriptRef.current = "";
    retryCountRef.current = 0;
    setTranscript("");
    transcriptRef.current = "";
    setFeedback(null);
    setMicError(null);
    setIsRecording(true);

    // Warm up the hardware DSP pipeline for quiet/far voices
    await startDSPStream();
    
    const startRecognitionSession = () => {
      if (!shouldBeRecordingRef.current) return;

      try {
        const recognition = new SR();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
          evaluatedRef.current = false;
          hasSpokenRef.current = false;
        };
        
        recognition.onresult = (event: any) => {
          let currentSegment = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentSegment += event.results[i][0].transcript;
          }
          
          const combined = (accumulatedTranscriptRef.current + " " + currentSegment).trim();
          setTranscript(combined);
          transcriptRef.current = combined;
          hasSpokenRef.current = true;
          
          const targetText = practiceTextRef.current;
          if (targetText) {
             const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
             const normCombined = normalize(combined);
             const normTarget = normalize(targetText);
             if (normCombined === normTarget || normCombined.includes(normTarget)) {
                evaluatedRef.current = true;
                shouldBeRecordingRef.current = false;
                stopDSPStream();
                setFeedback({ text: "Correct! Amazing job! 🌟", isSuccess: true });
                recognition.stop();
             }
          }
        };
        
        recognition.onerror = (e: any) => {
          console.warn("[Speech Engine] Session Error:", e.error);
          
          if (e.error === 'no-speech') {
            console.log('[Speech Engine] No speech detected, stopping restart cycle.');
            const friendly = getFriendlyMicError(e.error);
            setMicError(friendly);
            shouldBeRecordingRef.current = false;
            stopDSPStream();
            setIsRecording(false);
            return;
          }

          if (e.error === 'aborted') {
            // Ignore intentional abort without restarting
            return;
          }
          
          if (e.error === 'network') {
            retryCountRef.current += 1;
            if (retryCountRef.current <= 5) {
              console.log(`[Speech Engine] Network glitch. Retrying segment (${retryCountRef.current}/5)...`);
              setTimeout(() => {
                startRecognitionSession();
              }, 1000);
              return;
            } else {
              const friendly = getFriendlyMicError(e.error);
              setMicError(friendly);
              toast.error(friendly.message, { id: "network-error" });
              shouldBeRecordingRef.current = false;
              stopDSPStream();
              setIsRecording(false);
            }
            return;
          }
          
          const friendly = getFriendlyMicError(e.error);
          setMicError(friendly);
          toast.error(friendly.message, { id: "mic-error" });
          shouldBeRecordingRef.current = false;
          stopDSPStream();
          setIsRecording(false);
        };
        
        recognition.onend = () => {
           if (shouldBeRecordingRef.current) {
              // Save what we have accumulated so far
              accumulatedTranscriptRef.current = transcriptRef.current;
              console.log("[Speech Engine] Segment ended. Seamlessly restarting via new session...");
              setTimeout(() => {
                if (shouldBeRecordingRef.current) {
                  startRecognitionSession();
                }
              }, 100);
              return;
           }
           
           setIsRecording(false);
           if (evaluatedRef.current) return;
           if (!hasSpokenRef.current && !accumulatedTranscriptRef.current) return;
           setTimeout(() => {
             evaluateSpeech(transcriptRef.current);
           }, 400);
        };
        
        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
         console.error("[Speech Engine] Start failed:", err);
         setIsRecording(false);
      }
    };

    startRecognitionSession();
  };

  const evaluateSpeech = (spoken: string) => {
    if (!practiceTextRef.current) return;
    
    if (!spoken || spoken.trim() === "") {
      setFeedback({ text: "I didn't catch that! Please check your microphone settings or try speaking a bit louder.", isSuccess: false });
      return;
    }

    const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
    
    const target = normalize(practiceTextRef.current);
    const provided = normalize(spoken);
    
    // We already handled success during typing/speaking, this checks if we failed
    if (provided === target || provided.includes(target) || target.includes(provided)) {
      setFeedback({ text: "Correct! Amazing job! 🌟", isSuccess: true });
    } else {
      setFeedback({ text: `Almost! You said: "${spoken}". Try again!`, isSuccess: false });
    }
  };

  const checkAnswer = (input: string) => {
    if (!practiceText) return;
    const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
    
    const target = normalize(practiceText);
    const provided = normalize(input);
    
    // Evaluate fully on stop
    if (provided === target || provided.includes(target) || target.includes(provided)) {
      setFeedback({ text: "Correct! Amazing job! 🌟", isSuccess: true });
    } else {
      setFeedback({ text: `Almost! You said: "${input}". Try again!`, isSuccess: false });
    }
  };

  const checkWrittenAnswer = () => {
    if (!practiceText) return;
    const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
    if (normalize(userInput) === normalize(practiceText)) {
      setFeedback({ text: "Perfect spelling! You are a star! ⭐", isSuccess: true });
    } else {
      setFeedback({ text: `Not quite! The correct text was: "${practiceText}". Keep trying!`, isSuccess: false });
    }
  };

  // ------------------- RENDER -------------------

  if (activeMode) {
    const mode = MODES.find((m) => m.id === activeMode)!;
    
    return (
      <div className="space-y-6 max-w-screen-md mx-auto px-4 py-8">
        <button 
          onClick={() => setActiveMode(null)}
          className="flex items-center gap-2 text-sm font-black text-[#4A6A8A] hover:text-[#1A3A5C] transition-colors bg-white px-4 py-2 rounded-2xl w-fit shadow-sm border border-[#E2E8F0]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Playground
        </button>
        
        <div className="card-cloud p-10 text-center min-h-[500px] flex flex-col items-center animate-pop-in relative overflow-hidden" style={{ borderTop: `8px solid ${mode.color}` }}>
          
          <div className="text-5xl mb-4 p-4 rounded-full" style={{ background: mode.bg }}>{mode.emoji}</div>
          <h2 className={`text-3xl font-black mb-8 ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`}>{mode.title}</h2>

          {loading ? (
             <div className="flex flex-col items-center justify-center flex-1">
               <Loader2 className="w-12 h-12 text-[#4A90D9] animate-spin mb-4" />
               <p className="text-[#4A6A8A] font-bold animate-pulse">Soma AI is writing something new just for you...</p>
             </div>
          ) : (
             <div className="flex flex-col items-center w-full flex-1">
               
               {/* Read & Speak shows the text. The others hide it initially. */}
               {activeMode === "read-speak" ? (
                 <div className={`w-full p-8 rounded-3xl mb-8 border-2 shadow-inner ${isDark ? 'bg-[#0B162C] border-gray-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                   <p className={`text-3xl font-black tracking-wide ${isDark ? 'text-white' : 'text-[#1A3A5C]'}`} style={{ fontFamily: "Comic Sans MS, OpenDyslexic, sans-serif", lineHeight: 1.6 }}>
                     {practiceText}
                   </p>
                 </div>
               ) : (
                 <div className={`w-full p-8 rounded-3xl mb-8 border-2 shadow-inner flex flex-col items-center ${isDark ? 'bg-[#0B162C] border-gray-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                    <p className="text-lg font-bold text-[#4A6A8A] mb-4">Click to hear the secret sentence!</p>
                    <button 
                      onClick={() => playTTS(practiceText)}
                      className="w-20 h-20 bg-gradient-to-tr from-[#4A90D9] to-[#87CEFA] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    >
                      <Volume2 className="w-10 h-10" />
                    </button>
                 </div>
               )}

               {/* Inputs / Buttons */}
               <div className="w-full flex flex-col items-center space-y-6">
                 
                 {/* Voice Recording for Speak modes */}
                 {(activeMode === "read-speak" || activeMode === "listen-repeat") && (
                   <div className="flex flex-col items-center w-full gap-4">
                     {micError && (
                       <div className="w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-left animate-in fade-in duration-300">
                         <div className="flex items-start gap-3">
                           <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                           <div>
                             <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">
                               {micError.message}
                             </p>
                             <p className="text-xs font-semibold text-white/95 leading-relaxed">
                               {micError.suggestion}
                             </p>
                           </div>
                         </div>
                       </div>
                     )}
                     <button 
                       onClick={toggleRecording}
                       disabled={feedback?.isSuccess}
                       className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-white text-lg transition-all ${isRecording ? "bg-red-500 animate-pulse scale-105 shadow-[0_0_20px_rgba(239,68,68,0.6)]" : "bg-[#2ECC71] hover:bg-[#27AE60] shadow-md hover:scale-105"}`}
                     >
                       <Mic className="w-6 h-6" />
                       {isRecording ? "Listening... Click to stop" : "Start Recording"}
                     </button>
                     
                     {/* Live Transcript Display */}
                     {transcript && (
                       <div className={`w-full p-4 rounded-xl border border-dashed min-h-[60px] font-medium text-lg italic text-center ${isDark ? 'bg-[#0B162C] border-gray-600 text-gray-300' : 'bg-white border-[#A0AEC0] text-[#4A6A8A]'}`}>
                         "{transcript}"
                       </div>
                     )}
                   </div>
                 )}

                 {/* Text Input for Listen & Write */}
                 {activeMode === "listen-write" && (
                   <div className="w-full flex flex-col gap-4">
                     <textarea 
                       disabled={feedback?.isSuccess}
                       value={userInput}
                       onChange={(e) => setUserInput(e.target.value)}
                       placeholder="Type what you heard here..."
                       className={`w-full p-4 rounded-2xl border-2 outline-none text-xl font-bold min-h-[120px] shadow-inner resize-none ${isDark ? 'bg-[#0B162C] border-gray-700 text-white focus:border-[#4A90D9]' : 'border-[#E2E8F0] focus:border-[#4A90D9] text-[#1A3A5C]'}`}
                     />
                     <button 
                       onClick={checkWrittenAnswer}
                       disabled={feedback?.isSuccess || !userInput.trim()}
                       className="px-8 py-3 bg-[#4A90D9] text-white rounded-full font-black text-lg hover:bg-[#3A7BC8] transition-transform hover:scale-105 disabled:opacity-50"
                     >
                       Check My Spelling
                     </button>
                   </div>
                 )}

                 {/* Feedback Display */}
                 {feedback && (
                   <div className={`w-full p-4 rounded-2xl border-2 animate-pop-in ${feedback.isSuccess ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-50 border-red-200 text-red-600'}`}>
                     <p className="font-black text-lg">{feedback.text}</p>
                   </div>
                 )}

                 {/* Next Button */}
                 {feedback?.isSuccess && (
                   <button 
                     onClick={() => fetchNewPractice(activeMode)}
                     className="mt-4 px-8 py-3 rounded-full font-black text-white bg-gradient-to-r from-[#FF9500] to-[#FF5E3A] flex items-center gap-2 hover:scale-105 shadow-lg animate-bounce"
                   >
                     Next Sentence <ArrowRight className="w-5 h-5" />
                   </button>
                 )}

               </div>
             </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto px-2">
      {/* Header */}
      <div className="card-cloud p-8 relative overflow-hidden text-center animate-pop-in border-b-4 border-[#9B59B6]">
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A3A5C] mb-3 relative z-10">
          Language <span style={{ color: "#9B59B6" }}>Playground</span> 🗣️
        </h1>
        <p className="text-base text-[#4A6A8A] font-semibold max-w-2xl mx-auto relative z-10">
          Master your speaking, listening, and writing skills! Choose how you want to practice today.
        </p>
      </div>

      {/* Modes Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        {MODES.map((mode, i) => (
          <button
            key={mode.id}
            onClick={() => handleStartMode(mode.id as ModeId)}
            className="card-cloud flex flex-col items-center text-center p-8 transition-all hover:-translate-y-2 hover:shadow-2xl animate-pop-in group border-2 border-transparent hover:border-gray-100"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-inner"
              style={{ background: mode.bg, border: `2px solid ${mode.color}40` }}
            >
              <span className="text-4xl">{mode.emoji}</span>
            </div>
            <h3 className="text-2xl font-black mb-3 text-[#1A3A5C]">{mode.title}</h3>
            <p className="text-sm font-semibold text-[#4A6A8A] leading-relaxed mb-8 flex-1">
              {mode.desc}
            </p>
            <div 
              className="px-6 py-3 rounded-full text-sm font-black text-white w-full flex items-center justify-center gap-2 transition-transform group-hover:scale-105 shadow-md"
              style={{ background: mode.color }}
            >
              Choose <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
      
      {/* Bot companion */}
      <div className="card-cloud p-6 flex flex-col sm:flex-row items-center gap-6 animate-pop-in mt-8 border-2 border-[#4A90D9]/20" style={{ background: "rgba(74,144,217,0.05)" }}>
         <div className="w-32 h-32 shrink-0">
             <RiveAnimation src="/riv-animations/22673-42423-for-education-purpose.riv" className="w-full h-full" />
         </div>
         <div>
            <h3 className="text-xl font-black text-[#1A3A5C] mb-2 flex items-center gap-2">Practice Makes Perfect! ⭐</h3>
            <p className="text-sm font-semibold text-[#4A6A8A] leading-relaxed max-w-3xl">
              Soma AI generates completely new sentences every time based on your grade! It's here to listen to your pronunciation, check your spelling, and help you become a fluent speaker. Don't be afraid to make mistakes—that's how we learn!
            </p>
         </div>
      </div>
    </div>
  );
}
