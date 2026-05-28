import { useEffect } from "react";
import { startSession, stopSession } from "@/lib/routeTime";

// Hook: automatically start a session for the given route on mount and stop on unmount
export function useRouteTimer(route: string | null | undefined) {
  useEffect(() => {
    if (!route) return;
    startSession(route);
    return () => {
      stopSession(route);
    };
  }, [route]);
}
