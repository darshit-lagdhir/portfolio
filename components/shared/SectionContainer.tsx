"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionContainer({ id, children, className, noPadding = false }: SectionContainerProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // We use a high-performance IntersectionObserver to defer mounting children
    // rootMargin '400px' ensures they start loading/mounting before they enter the screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={containerRef}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "system-container relative",
        !noPadding && "py-sys-96 md:py-sys-128",
        className
      )}
    >
      <AnimatePresence>
        {hasEntered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        ) : (
          <div className="w-full h-32" /> // Minimal reserve space
        )}
      </AnimatePresence>
    </motion.section>
  );
}
