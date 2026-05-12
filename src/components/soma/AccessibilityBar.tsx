import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Type, Eye, Volume2, Contrast, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("soma-theme") as "light" | "dark") || "dark";
    }
    return "dark";
  });

  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    document.documentElement.classList.toggle("font-dyslexic", dyslexic);
    document.documentElement.classList.toggle("high-contrast", contrast);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.fontSize = `${fontScale * 16}px`;
    localStorage.setItem("soma-theme", theme);
  }, [dyslexic, contrast, fontScale, theme]);

  useEffect(() => {
    if (!speechEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    let text = "You are currently on " + path;
    if (path.includes("planner")) text = "You are now on the study planner. You can algorithmically synthesize your schedule.";
    else if (path.includes("library")) text = "You are now on the library page. This is the ability program curated selection of books. Press any key to interact with the books.";
    else if (path.includes("games")) text = "You are now in the Interactive Hub. Engage in cognitive training with your Rive animations.";
    else if (path.includes("videos")) text = "You are now on the Youtube viewing page. Press any key different from the space bar key to interact.";
    else if (path.includes("tutor")) text = "You are now with the central AI Tutor. Feel free to formulate any question.";
    else if (path === "/student") text = "You are now on the home page. Would you wish to ask your AI anything, I recommend you to press any key and feel free to ask. Do you wanna go to another page, press the space bar key.";

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        window.speechSynthesis.cancel();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [path, speechEnabled]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-2 rounded-2xl border border-white/10 bg-card p-4 space-y-3 w-64 animate-fade-in shadow-soft">
          <h3 className="font-bold text-sm flex items-center gap-2"><Eye className="h-4 w-4" /> Accessibility</h3>
          <label className="flex items-center justify-between text-sm">
            <span>Dyslexic font</span>
            <input type="checkbox" checked={dyslexic} onChange={(e) => setDyslexic(e.target.checked)} />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2"><Volume2 className="h-4 w-4 text-primary" /> AI Auto-Speaker</span>
            <input type="checkbox" checked={speechEnabled} onChange={(e) => setSpeechEnabled(e.target.checked)} />
          </label>
          <label className="flex items-center justify-between text-sm">
            <span>High contrast</span>
            <input type="checkbox" checked={contrast} onChange={(e) => setContrast(e.target.checked)} />
          </label>
          <div className="flex items-center justify-between text-sm pt-1">
             <span>Display Mode</span>
             <div className="flex bg-muted rounded-lg p-1">
                <button 
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Moon className="h-4 w-4" />
                </button>
             </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span>Font size</span><span>{Math.round(fontScale*100)}%</span></div>
            <input type="range" min="0.85" max="1.4" step="0.05" value={fontScale} onChange={(e) => setFontScale(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      )}
      <Button size="icon" onClick={() => setOpen(!open)} className="rounded-full h-12 w-12 border-none bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-none" aria-label="Accessibility">
        <Eye className="h-5 w-5" />
      </Button>
    </div>
  );
}