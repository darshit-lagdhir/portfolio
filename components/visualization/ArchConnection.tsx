"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArchConnectionProps {
  fromRect: DOMRect | null;
  toRect: DOMRect | null;
  parentRect: DOMRect | null;
  layout: "layered" | "pipeline";
  isActive: boolean;
}

function ArchConnection({ fromRect, toRect, parentRect, layout, isActive }: ArchConnectionProps) {
  if (!fromRect || !toRect || !parentRect) return null;

  // Calculate coordinates relative to parent
  const startX = fromRect.left - parentRect.left + (layout === "layered" ? fromRect.width / 2 : fromRect.width);
  const startY = fromRect.top - parentRect.top + (layout === "layered" ? fromRect.height : fromRect.height / 2);
  
  const endX = toRect.left - parentRect.left + (layout === "layered" ? toRect.width / 2 : 0);
  const endY = toRect.top - parentRect.top + (layout === "layered" ? 0 : toRect.height / 2);

  // Path data
  let path = "";
  if (layout === "layered") {
    // Vertical flow with a small curve/elbow if needed
    const midY = (startY + endY) / 2;
    path = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
  } else {
    // Horizontal flow
    const midX = (startX + endX) / 2;
    path = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
  }

  return (
    <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-accent/30" />
        </marker>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={isActive ? "1.5" : "1"}
        strokeDasharray={isActive ? "0" : "4 4"}
        className={cn(
            "transition-colors duration-500",
            isActive ? "text-accent" : "text-white/10"
        )}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}

export default memo(ArchConnection);
