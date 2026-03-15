"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/lib/interaction";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionContainer({ id, children, className, noPadding = false }: SectionContainerProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [containerRef, isIntersecting] = useIntersectionObserver({ rootMargin: "400px" });

  useEffect(() => {
    if (isIntersecting && !hasEntered) {
      setHasEntered(true);
    }
  }, [isIntersecting, hasEntered]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      id={id}
      className={cn(
        "system-container relative overflow-x-hidden",
        !noPadding && "py-sys-48 md:py-sys-64",
        className
      )}
    >
      {children}
    </section>
  );
}
