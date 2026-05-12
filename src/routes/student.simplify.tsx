import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { simplifyText } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Volume2, Square, Type, Sparkles } from "lucide-react";

export const Route = createFileRoute("/student/simplify")({
  head: () => ({ meta: [{ title: "Text Simplifier — Soma AI" }] }),
  component: Simplify,
});

const SAMPLE = "Photosynthesis is the process by which plants utilize sunlight to facilitate the production of food. Subsequently, plants demonstrate growth and additionally release oxygen.";

function Simplify() {
  const [text, setText] = useState(SAMPLE);
  const [overlay, setOverlay] = useState<"none" | "cream" | "mint" | "rose">("cream");
  const [dyslexic, setDyslexic] = useState(true);
  const simplified = simplifyText(text);

  const speak = (t: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };
  const stop = () => window.speechSynthesis?.cancel();

  return (
    <div className="space-y-8 max-w-7xl animate-fade-in pb-20">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tight">Text <span className="text-primary">Synthesizer</span></h1>
        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest italic opacity-70">Linguistic Analysis & Simplification</p>
      </div>

      <div className="rounded-3xl glass p-6 border-none shadow-soft bg-card/30">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted text-[10px] font-black uppercase tracking-widest">
            <Type className="h-3.5 w-3.5" /> Overlay Sensitivity
          </div>
          <div className="flex gap-2">
            {(["none", "cream", "mint", "rose"] as const).map((o) => (
              <button key={o} onClick={() => setOverlay(o)} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${overlay === o ? "bg-primary text-white shadow-glow" : "glass bg-white/5 hover:bg-white/10"}`}>{o}</button>
            ))}
          </div>
          <div className="flex-1" />
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={dyslexic} onChange={(e) => setDyslexic(e.target.checked)} className="h-4 w-4 rounded border-none bg-muted accent-primary cursor-pointer" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Dyslexic Typeface</span>
          </label>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Source Material</div>
            <div className="relative group">
              <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className={`w-full min-h-[320px] rounded-2xl glass p-6 text-base font-medium leading-relaxed border-none focus:ring-2 ring-primary/20 transition-all ${dyslexic ? "font-dyslexic" : ""} ${overlay !== "none" ? `overlay-${overlay}` : "bg-white/5"}`} 
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => speak(text)} className="h-10 w-10 p-0 rounded-full glass hover:bg-primary hover:text-white"><Volume2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-primary ml-2 flex items-center gap-2"><Sparkles className="h-3 w-3" /> Synthesized Result</div>
            <div className={`min-h-[320px] rounded-2xl glass p-6 text-base font-medium leading-relaxed whitespace-pre-wrap ${dyslexic ? "font-dyslexic" : ""} ${overlay !== "none" ? `overlay-${overlay}` : "bg-primary/5"}`}>
              {simplified || <span className="opacity-30 italic">Awaiting source transcription...</span>}
              <div className="mt-8 flex gap-3">
                 <Button size="sm" onClick={() => speak(simplified)} className="rounded-xl font-bold h-10 px-4">Audio Output</Button>
                 <Button size="sm" variant="ghost" onClick={stop} className="h-10 w-10 p-0 rounded-full glass hover:bg-destructive hover:text-destructive-foreground"><Square className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}