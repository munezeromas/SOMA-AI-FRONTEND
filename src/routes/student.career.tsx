import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight, Compass, GraduationCap, Microscope, Rocket, Globe, Palette, RotateCcw, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cohereSimplify } from "@/lib/cohere-server";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/student/career")({
  head: () => ({ meta: [{ title: "Pathways — Soma AI" }] }),
  component: CareerPathExplorer,
});

const STREAMS = [
  { id: "MCB", name: "Math-Chem-Bio", icon: Microscope, color: "text-success bg-success/10", careers: ["Doctor", "Pharmacist", "Biotechnologist"], strength: "Science & Life" },
  { id: "MPC", name: "Math-Phys-Comp", icon: Rocket, color: "text-primary bg-primary/10", careers: ["Engineer", "Software Developer", "Data Scientist"], strength: "Logic & Building" },
  { id: "PCB", name: "Phys-Chem-Bio", icon: Brain, color: "text-amber-400 bg-amber-400/10", careers: ["Medical Specialist", "Chemical Engineer", "Researcher"], strength: "Universal Sciences" },
  { id: "HEG", name: "Hist-Econ-Geog", icon: Globe, color: "text-blue-400 bg-blue-400/10", careers: ["Economist", "Urban Planner", "Diplomat"], strength: "Society & Finance" },
  { id: "LEG", name: "Lit-Econ-Geog", icon: Palette, color: "text-purple-400 bg-purple-400/10", careers: ["Journalist", "Lawyer", "International Relations"], strength: "Language & Analysis" },
];

const ASSESSMENT = [
  { q: "Which subject makes you most curious?", opts: ["How living things work", "How machines and computers work", "How our world and money work", "How we tell stories and share ideas"] },
  { q: "What's your favorite activity?", opts: ["Doing science experiments", "Solving math puzzles", "Reading and writing stories", "Discussing history or news"] },
  { q: "When you grow up, what sounds coolest?", opts: ["Helping people get healthy", "Building new apps or bridges", "Leading a business or country", "Being a famous writer or reporter"] }
];

function CareerPathExplorer() {
  const [stage, setStage] = useState<"intro" | "assessment" | "loading" | "result">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [aiAdvice, setAiAdvice] = useState("");
  const [recommendedStream, setRecommendedStream] = useState<typeof STREAMS[0] | null>(null);

  const startAssessment = () => {
    setStage("assessment");
    setStep(0);
    setAnswers([]);
  };

  const handlePick = async (opt: string) => {
    const newAnswers = [...answers, opt];
    setAnswers(newAnswers);
    
    if (step + 1 < ASSESSMENT.length) {
      setStep(step + 1);
    } else {
      generateResult(newAnswers);
    }
  };

  const generateResult = async (finalAnswers: string[]) => {
    setStage("loading");
    
    try {
      // Analyze answers to pick a stream
      const hasLife = finalAnswers.some(a => a.includes("living") || a.includes("experiments") || a.includes("healthy"));
      const hasTech = finalAnswers.some(a => a.includes("machines") || a.includes("puzzles") || a.includes("apps"));
      const hasArts = finalAnswers.some(a => a.includes("stories") || a.includes("writing") || a.includes("reporter"));
      
      let streamId = "MCB";
      if (hasTech) streamId = "MPC";
      else if (hasLife) streamId = "PCB";
      else if (hasArts) streamId = "LEG";
      else streamId = "HEG";

      const stream = STREAMS.find(s => s.id === streamId) || STREAMS[0];
      setRecommendedStream(stream);

      // Get AI Advice
      const prompt = `A primary school student picked these interests: ${finalAnswers.join(", ")}. I recommended the High School stream "${stream.name}". Give them a very encouraging 2-sentence explanation of why this path fits them and one cool career they could have.`;
      const res = await (cohereSimplify as any)({ data: { text: prompt, grade: "6", subject: "Career Guidance" } });
      setAiAdvice(res || "This path perfectly matches your brilliant mind! You will do amazing things in the future.");
      setStage("result");
    } catch (e) {
      console.error(e);
      setAiAdvice("You have a very versatile mind! This path will open many doors for your bright future.");
      setRecommendedStream(STREAMS[0]);
      setStage("result");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      
      {stage === "intro" && (
        <div className="flex flex-col items-center justify-center py-20 gap-10 text-center">
           <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <div className="h-48 w-48 rounded-[40px] bg-card border border-white/10 flex items-center justify-center relative">
                 <Compass className="h-24 w-24 text-primary animate-pulse" />
              </div>
           </div>
           
           <div className="space-y-4 max-w-2xl">
              <h1 className="text-6xl font-black tracking-tighter">Your <span className="text-primary italic">High School</span> <br /> Path Explorer</h1>
              <p className="text-xl text-muted-foreground font-medium">Discover which Rwandan subject combinations match your brilliant future!</p>
           </div>
           
           <Button onClick={startAssessment} size="lg" className="h-16 px-12 rounded-2xl text-lg font-black shadow-glow">
              Start Exploring <ArrowRight className="h-5 w-5 ml-2" />
           </Button>

           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full pt-10">
              {STREAMS.map(s => (
                <div key={s.id} className="p-4 rounded-2xl glass bg-white/5 border border-white/5 text-center space-y-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                   <s.icon className={`h-6 w-6 mx-auto ${s.color.split(' ')[0]}`} />
                   <p className="text-[10px] font-black uppercase tracking-widest">{s.id}</p>
                </div>
              ))}
           </div>
        </div>
      )}

      {stage === "assessment" && (
        <div className="flex flex-col items-center py-10 space-y-12">
            <div className="w-full max-w-2xl text-center space-y-4">
               <div className="flex justify-center gap-2 mb-6">
                  {ASSESSMENT.map((_, i) => (
                    <div key={i} className={`h-2 w-16 rounded-full transition-all duration-500 ${i <= step ? 'bg-primary shadow-glow' : 'bg-white/5'}`} />
                  ))}
               </div>
               <h2 className="text-4xl font-black tracking-tight leading-tight">{ASSESSMENT[step].q}</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 w-full max-w-4xl">
               {ASSESSMENT[step].opts.map((o) => (
                 <button 
                  key={o} 
                  onClick={() => handlePick(o)}
                  className="group relative rounded-[32px] glass bg-card/40 border border-white/5 p-10 text-left hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xl font-bold group-hover:text-primary transition-colors block">{o}</span>
                 </button>
               ))}
            </div>
        </div>
      )}

      {stage === "loading" && (
        <div className="flex flex-col items-center justify-center py-40 space-y-8">
           <div className="h-32 w-32 relative">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <Brain className="absolute inset-0 m-auto h-12 w-12 text-primary animate-pulse" />
           </div>
           <div className="text-center">
              <p className="text-xl font-black uppercase tracking-widest animate-pulse">Computing Neural Pathways...</p>
              <p className="text-muted-foreground font-medium mt-2">Soma AI is mapping your interests to Rwandan Streams</p>
           </div>
        </div>
      )}

      {stage === "result" && recommendedStream && (
        <div className="space-y-12 md:pb-20 animate-in zoom-in-95 duration-1000">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative group shrink-0">
                 <div className={`absolute inset-0 ${recommendedStream.color.split(' ')[0].replace('text', 'bg')}/20 blur-[100px] rounded-full`} />
                 <div className="h-64 w-64 rounded-[56px] glass bg-card/80 border border-white/10 flex items-center justify-center relative shadow-2xl">
                    <recommendedStream.icon className={`h-32 w-32 ${recommendedStream.color.split(' ')[0]} drop-shadow-glow`} />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-8 py-3 rounded-2xl bg-primary text-white font-black tracking-widest shadow-glow whitespace-nowrap">
                       STRENGTH: {recommendedStream.strength}
                    </div>
                 </div>
              </div>

              <div className="flex-1 space-y-6 text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${recommendedStream.color}`}>Recommended Path</span>
                    <div className="h-px w-20 bg-white/10" />
                 </div>
                 <h1 className="text-6xl font-black tracking-tighter">Your future starts with <br /><span className="text-primary">{recommendedStream.name}</span></h1>
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 relative group overflow-hidden">
                    <Sparkles className="absolute -right-4 -top-4 h-24 w-24 text-primary opacity-10 group-hover:scale-125 transition-transform" />
                    <p className="text-lg font-medium leading-relaxed italic text-white/80 relative z-10 leading-relaxed">
                       "{aiAdvice}"
                    </p>
                 </div>
              </div>
           </div>

           <div className="grid lg:grid-cols-2 gap-10">
              <div className="rounded-[40px] border border-white/5 bg-background p-10 space-y-8">
                 <h3 className="text-2xl font-bold flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Why this combination?
                 </h3>
                 <div className="space-y-4">
                    {[
                      "Strong focus on analytical thinking and problem solving",
                      "Direct gateway to highly sought-after professional degrees",
                      "Matches your natural interest in exploring how things work",
                      "Allows you to use your favorite subjects in practical ways"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                         <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                         </div>
                         <p className="text-muted-foreground font-medium">{item}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="rounded-[40px] glass bg-primary/5 border border-primary/10 p-10 space-y-8 text-center md:text-left">
                 <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-3">
                    <Rocket className="h-6 w-6 text-primary" />
                    Career Trajectories
                 </h3>
                 <p className="text-muted-foreground font-medium">With a background in **{recommendedStream.id}**, you can excel in these rewarding fields:</p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {recommendedStream.careers.map((c) => (
                       <div key={c} className="px-8 py-5 rounded-[28px] glass bg-card/60 border border-white/10 font-black tracking-tight text-lg hover:scale-105 transition-transform cursor-default">
                          {c}
                       </div>
                    ))}
                 </div>
                 <div className="pt-6">
                    <Button onClick={() => setStage("intro")} variant="outline" className="rounded-2xl h-14 px-8 border-white/10 hover:bg-white/5 uppercase tracking-widest text-[10px] font-black">
                       <RotateCcw className="h-4 w-4 mr-2" /> Start New Search
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
