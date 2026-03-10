"use client";

import { useScene } from "@/context/SceneContext";
import { cn } from "@/lib/utils";

export default function SystemBackground() {
  const { isMobile } = useScene();
  
  return (
    <div 
      className={cn(
        "system-bg-grid fixed inset-0 pointer-events-none z-[-10] transition-opacity duration-1000",
        isMobile ? "opacity-20" : "opacity-60"
      )}
      aria-hidden="true"
    />
  );
}
