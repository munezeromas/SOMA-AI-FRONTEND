import { useEffect } from "react";
import * as pkg from "@rive-app/react-canvas";

// TypeScript types are safe to import as type, which get stripped out during compilation
import type { Fit as FitType, Alignment as AlignmentType } from "@rive-app/react-canvas";

const { useRive, Layout, Fit, Alignment } = pkg as any;

interface RiveAnimationProps {
  src: string;
  className?: string;
  withSound?: boolean;
  /** Pass only if the file actually has a state machine you want to drive */
  stateMachines?: string | string[];
  /** Pass only if the file uses a named timeline animation instead */
  animations?: string | string[];
  fit?: any;
  alignment?: any;
}

export function RiveAnimation({
  src,
  className,
  withSound = false,
  stateMachines,   // intentionally NO default — let Rive auto-detect
  animations,
  fit = Fit.Contain,
  alignment = Alignment.Center,
}: RiveAnimationProps) {
  const { RiveComponent, rive } = useRive({
    src,
    autoplay: true,
    // Only pass stateMachines/animations if explicitly given — otherwise Rive
    // auto-plays whatever the file has (avoids blank canvas on unknown SM names)
    ...(stateMachines ? { stateMachines } : {}),
    ...(animations ? { animations } : {}),
    shouldResizeCanvasToContainer: true,
    layout: new Layout({ fit, alignment }),
  });

  // Unlock audio context on first user gesture (needed for Rive audio)
  useEffect(() => {
    if (!rive || !withSound) return;
    const unlock = () => {
      try {
        (rive as any)?.audioContext?.resume();
      } catch (_) {}
    };
    document.addEventListener("click", unlock, { once: true });
    return () => document.removeEventListener("click", unlock);
  }, [rive, withSound]);

  return (
    <div
      className={className}
      style={{ background: "transparent" }}
    >
      <RiveComponent style={{ width: "100%", height: "100%", background: "transparent" }} />
    </div>
  );
}
