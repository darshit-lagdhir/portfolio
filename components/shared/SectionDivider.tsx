"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label: string;
  description?: string;
  className?: string;
}

export default function SectionDivider({ label, description, className }: SectionDividerProps) {
  return (
    <div className={`section-divider-container ${className || "mb-sys-64"}`}>
      <div className="section-divider" data-label={label}>
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
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="type-body text-[0.65rem] mt-4 max-w-xl font-medium italic"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
