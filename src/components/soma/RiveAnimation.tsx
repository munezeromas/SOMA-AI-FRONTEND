import { useEffect } from "react";
import { useRive } from "@rive-app/react-canvas";

interface RiveAnimationProps {
  src: string;
  className?: string;
  withSound?: boolean;
}

export function RiveAnimation({ src, className, withSound = false }: RiveAnimationProps) {
  const { RiveComponent, rive } = useRive({
    src,
    autoplay: true,
    stateMachines: "State Machine 1",
    shouldResizeCanvasToContainer: true,
  });

  useEffect(() => {
    if (!rive || !withSound) return;
    const unlock = () => {
      try { (rive as any)?.audioContext?.resume(); } catch (e) {}
    };
    document.addEventListener('click', unlock, { once: true });
    return () => document.removeEventListener('click', unlock);
  }, [rive, withSound]);

  return <div className={className}><RiveComponent /></div>;
}
