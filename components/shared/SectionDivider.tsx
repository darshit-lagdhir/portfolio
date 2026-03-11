"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label: string;
  className?: string;
}

export default function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={`section-divider ${className || "mb-sys-64"}`} data-label={label}>
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="divider-label"
      >
        {label}
      </motion.span>
    </div>
  );
}
