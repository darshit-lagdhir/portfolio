"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import "./globals.css";
import SmoothScroll from "@/components/brutalist/SmoothScroll";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";

// HUD OVERLAY SYSTEM (PHASE 1)
function HUDOverlay() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setCoords({ x: e.clientX, y: e.clientY });
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    window.addEventListener("mousemove", handleMove);
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden opacity-10 md:opacity-20 font-mono text-[10px] tracking-widest text-white uppercase select-none">
      {/* CORNER BRACKETS */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white" />

      {/* SYSTEM LABELS */}
      <div className="absolute top-12 left-12 flex flex-col gap-1">
        <span>STRATUM OS // V.09.7</span>
        <span className="opacity-50">LAT: {coords.x} / {coords.y}</span>
      </div>

      <div className="absolute top-12 right-12 text-right">
        <span>LOCAL_STAMP: {time}</span>
        <div className="flex justify-end gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-white animate-pulse" />
          <span className="opacity-50">SYNCING_CORE...</span>
        </div>
      </div>

      {/* FLOATING UI DATA ELEMENTS (PHASE 6) */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4">
        <div className="w-24 h-[1px] bg-white opacity-20 relative overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-40"
          />
        </div>
        <span className="opacity-50">EXPANSION_PASS_01</span>
      </div>

      {/* FLOATING COORDINATES GRID (PHASE 2) */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[15%] border-x border-white opacity-5 pointer-events-none"
      />
    </div>
  );
}

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 35, stiffness: 450 });
  const ringY = useSpring(mouseY, { damping: 35, stiffness: 450 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, .interactive-trigger, [role='button']");
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[100000] pointer-events-none hidden md:block"
      />

      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 1,
          borderWidth: isHovering ? "1px" : "1.5px"
        }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference z-[99999] pointer-events-none hidden md:block"
      />

      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 4 : 2, opacity: isHovering ? 0.08 : 0.04 }}
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-white blur-3xl z-[99998] pointer-events-none hidden md:block"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isClicking ? { scale: 1.5, opacity: 0.6 } : { scale: 0, opacity: 0 }}
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-white z-[99997] pointer-events-none hidden md:block"
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { scrollYProgress } = useScroll();
  const gridShiftY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden selection:bg-white selection:text-black bg-background">
        <SmoothScroll />
        <CustomCursor />
        <HUDOverlay />

        <div className="mesh-container">
          <div className="mesh-blob w-[50vw] h-[50vw] bg-white opacity-5 left-0 top-0" />
          <div className="mesh-blob w-[40vw] h-[40vw] bg-white opacity-3 right-0 bottom-0" />
          <div className="mesh-blob w-[30vw] h-[30vw] bg-white opacity-4 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
        </div>

        {/* DYNAMIC GRID OVERLAY (PHASE 2) */}
        <motion.div
          style={{ y: gridShiftY }}
          className="fixed inset-[-10%] z-[-1] pointer-events-none opacity-[0.03]"
        >
          <div className="w-full h-full" style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </motion.div>

        {/* PERSPECTIVE DRAMA LAYERS (PHASE 9) */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden" style={{ perspective: "1500px" }}>
          <div
            className="absolute inset-[-20%] opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)",
              transform: "translateZ(-300px)"
            }}
          />
          <div
            className="absolute inset-[-20%] opacity-10"
            style={{
              backgroundImage: "radial-gradient(#fff 0.5px, transparent 0.5px)",
              backgroundSize: "40px 40px",
              transform: "translateZ(-150px)"
            }}
          />
          <div
            className="absolute inset-0 bg-radial-glow opacity-30"
            style={{ transform: "translateZ(-50px)" }}
          />
        </div>

        <div className="progress-bar hidden md:block">
          <motion.div
            className="progress-fill"
            style={{ height: "var(--scroll-percent, 0%)" }}
          />
        </div>

        <BrutalistNavbar />
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
