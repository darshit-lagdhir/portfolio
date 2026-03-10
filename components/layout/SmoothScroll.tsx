"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useScene } from "@/context/SceneContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { isMobile, isLowPerf } = useScene();

  // If mobile or low perf, or on a page that doesn't need it, fallback to native
  if (isMobile || isLowPerf) {
    return <div className="relative">{children}</div>;
  }

  return <VirtualScrollLayer>{children}</VirtualScrollLayer>;
}

function VirtualScrollLayer({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    
    // Initial height
    handleResize();

    // Observe content changes
    const observer = new ResizeObserver(handleResize);
    if (contentRef.current) observer.observe(contentRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [children]);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    damping: 25,
    stiffness: 120,
    mass: 0.1
  });

  const y = useTransform(smoothScrollY, (value) => -value);

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 right-0 w-full overflow-hidden"
      >
        {children}
      </motion.div>
    </>
  );
}
