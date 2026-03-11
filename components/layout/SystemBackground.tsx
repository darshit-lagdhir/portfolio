"use client";

import { useScene } from "@/context/SceneContext";
import { cn } from "@/lib/utils";

export default function SystemBackground() {
  const { isMobile, isLowPerf, isIdle } = useScene();
  
  return (
    <div 
      className={cn(
        "system-bg-grid fixed inset-0 pointer-events-none z-[-10] transition-opacity duration-1000",
        isLowPerf || isMobile ? "opacity-10" : (isIdle ? "opacity-15" : "opacity-40")
      )}
      style={{
        // If low performance, disable the CSS background fixed behavior or heavy masks
        backgroundAttachment: isLowPerf ? "scroll" : "fixed",
      }}
      aria-hidden="true"
    />
  );
}
