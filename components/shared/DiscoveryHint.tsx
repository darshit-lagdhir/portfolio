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
          <span className="type-metadata text-[0.45rem] text-accent tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity uppercase">
            Discovery_Vector_
          </span>
          <span className="type-nav text-[0.65rem] border-b border-accent/20 group-hover:border-accent transition-all pb-1 uppercase">
            {label} ↗
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
