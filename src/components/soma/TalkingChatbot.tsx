import { useEffect, useRef, useState } from "react";

export function TalkingChatbot({ 
  textToSpeak, 
  onSubtitle,
  mood = "neutral" 
}: { 
  textToSpeak?: string, 
  onSubtitle?: (text: string) => void,
  mood?: string
}) {
  const nodeAvatarRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unlockAudio = () => {
      if (headRef.current?.audioCtx?.state === 'suspended') {
        headRef.current.audioCtx.resume();
      }
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('soma-audio-unlocked', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('soma-audio-unlocked', unlockAudio);
    };
  }, []);

  useEffect(() => {
    if (!nodeAvatarRef.current || headRef.current || typeof window === "undefined") return;
    
    // Initialize
    const init = async () => {
      try {
        // @ts-ignore
        const { TalkingHead } = await import("@met4citizen/talkinghead");
        const head = new TalkingHead(nodeAvatarRef.current, {
          cameraView: "head",
          lipsyncModules: ["en", "fi"]
        });
        
        await head.showAvatar({
          url: '/avatars/brunette.glb',
          body: 'F',
          avatarMood: mood,
          avatarIgnoreCamera: false
        });
        
        headRef.current = head;
        
        // Ensure context is running if we are already unlocked or if we can resume it
        if (head.audioCtx?.state === 'suspended') {
          head.audioCtx.resume().catch(() => {}); 
        }
        
        setReady(true);
      } catch (err) {
        console.error("TalkingHead initialization failed", err);
      }
    };
    init();
    return () => {
      if (headRef.current) {
        try {
          headRef.current.stopSpeaking();
        } catch (e) {}
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [mood]);

  useEffect(() => {
    if (ready && headRef.current) {
      if (!textToSpeak) {
        try { headRef.current.stopSpeaking(); } catch (e) {}
        return;
      }
      
      // Use the library's native speakText method which handles visemes and lip-sync automatically
      try {
        console.log("TalkingHead speaking:", textToSpeak.substring(0, 50) + "...");
        headRef.current.stopSpeaking();
        headRef.current.speakText(textToSpeak);
      } catch (err) {
        console.error("TalkingHead speakText failed", err);
        // Fallback to simpler method if needed
      }
      
      if (onSubtitle) onSubtitle(textToSpeak);
    }
  }, [ready, textToSpeak, mood, onSubtitle]);

  return (
    <div className="w-full h-[350px] overflow-hidden bg-transparent relative flex-shrink-0">
       <div ref={nodeAvatarRef} className="w-full h-full absolute inset-0"></div>
       {!ready && (
         <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-foreground/40 text-center px-6 animate-pulse">
           Establishing Neural Link...
         </div>
       )}
    </div>
  );
}
