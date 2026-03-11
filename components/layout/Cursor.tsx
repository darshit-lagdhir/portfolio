"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

export default function Cursor() {
  const { isLowPerf, isMobile } = useScene();
  const [cursorType, setCursorType] = useState<"default" | "hover" | "active">("default");
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const shouldReduceMotion = useReducedMotion();

  // Mouse positioning values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Responsive spring physics - simplified if low performance
  const springConfig = isLowPerf 
    ? { damping: 40, stiffness: 400, mass: 1 } 
    : { damping: 30, stiffness: 2000, mass: 0.01 };
    
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device uses a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointer(mediaQuery.matches);

    if (!mediaQuery.matches || isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorRef.current && cursorRef.current.style.opacity === "0") {
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="hover"]');
      
      const nextType = isInteractive ? "hover" : "default";
      setCursorType(prev => prev === "active" ? "active" : nextType);
    };

    const handleMouseDown = () => setCursorType("active");
    const handleMouseUp = () => setCursorType("hover");

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isMobile]);

  // Disable on mobile/touch or if pointer is not fine
  if (!isPointer || isMobile) return null;

  const variants = {
    default: {
      scale: 1,
      backgroundColor: "transparent",
      borderColor: "var(--color-border-bright)",
      borderWidth: "1px",
    },
    hover: {
      scale: isLowPerf ? 1.5 : 2.5,
      backgroundColor: "var(--color-accent)",
      opacity: isLowPerf ? 0.3 : 0.15,
      borderColor: "transparent",
    },
    active: {
      scale: isLowPerf ? 1.2 : 1.8,
      backgroundColor: "var(--color-accent)",
      opacity: 0.3,
      borderColor: "transparent",
    }
  };

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border pointer-events-none z-[9999] mix-blend-difference opacity-0 transition-opacity duration-300"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        // Use translate3d for hardware acceleration
        translateZ: 0,
      }}
      variants={variants}
      animate={cursorType}
      transition={{
        type: "spring",
        stiffness: shouldReduceMotion ? 0 : 500,
        damping: 25,
        mass: 0.1
      }}
    >
      {/* Reticle Dot */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: cursorType === 'hover' ? 0 : 1 }}
      >
        <motion.div 
          className="w-1 h-1 rounded-full"
          animate={{ backgroundColor: cursorType === 'active' ? "var(--color-accent)" : "var(--color-text-secondary)" }}
        />
      </motion.div>
    </motion.div>
  );
}
