"use client";

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionContainer({ id, children, className, noPadding = false }: SectionContainerProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "system-container relative",
        !noPadding && "py-sys-96 md:py-sys-128",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
