"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DiscoveryHintProps {
  label: string;
  href: string;
  description?: string;
  className?: string;
  orientation?: "left" | "right" | "center";
}

export default function DiscoveryHint({ 
  label, 
  href, 
  description, 
  className,
  orientation = "left"
}: DiscoveryHintProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group flex flex-col gap-3",
        orientation === "right" && "items-end text-right",
        orientation === "center" && "items-center text-center",
        className
      )}
    >
      <Link href={href} className="inline-flex items-center gap-4">
        <div className="flex flex-col">
          <span className="type-metadata text-[0.4rem] text-accent/40 tracking-[0.3em] font-mono mb-1 uppercase">
            PATH:RESOLVE
          </span>
          <span className="type-nav text-[0.6rem] border-b border-border-dim/50 group-hover:border-accent/40 transition-all pb-1 uppercase tracking-widest text-text-secondary/70 group-hover:text-accent/80">
            {label} &rarr;
          </span>
        </div>
      </Link>
      {description && (
        <p className="type-body text-[0.65rem] opacity-30 italic max-w-xs leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
