"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface SystemModuleProps {
  project: Project;
  index: number;
}

export default function SystemModule({ project, index }: SystemModuleProps) {
  return (
    <Link href={`/${project.slug}`} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="module-frame group relative h-full flex flex-col transition-all duration-[250ms] ease-out hover:border-accent/50 md:hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
      >
        {/* Module Header Hook */}
        <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-30 transition-opacity">
          <span className="type-metadata text-[0.45rem] tracking-widest font-mono">
            REF_0{index + 1}
          </span>
        </div>

        {/* Status & Credibility Indicators */}
        <div className="flex items-center justify-between mb-sys-32">
          <div className="flex items-center gap-2">
            <span className={cn(
              "w-1 h-1 rounded-full",
              project.status === "COMPLETE" ? "bg-green-500/30" : "bg-yellow-500/30"
            )} />
            <span className="type-label text-[0.55rem] opacity-30">
              {project.status === "COMPLETE" ? "STABLE" : "RESEARCH"}
            </span>
          </div>
          
          {project.authority && (
             <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                   {[...Array(5)].map((_, i) => (
                     <div 
                       key={i} 
                       className={cn(
                         "w-1 h-1", 
                         i < Math.round((project.authority?.complexityScore || 0) / 2) ? "bg-accent/40" : "bg-border-dim"
                       )} 
                     />
                   ))}
                </div>
                <div className="type-metadata text-[0.4rem] px-2 py-0.5 border border-border-dim text-text-muted">
                   {project.authority.architectureDepth}
                </div>
             </div>
          )}
        </div>

        <div className="mb-sys-24">
          <div className="type-metadata text-[0.4rem] text-accent/40 mb-3 tracking-[0.2em] font-mono">NODE_{index + 1} // {project.authority?.primaryDomain.toUpperCase() || "CORE"}</div>
          <h3 className="type-h2 leading-tight text-xl md:text-2xl">{project.title.toLowerCase()}</h3>
        </div>

        <p className="type-body text-sm mb-sys-48 opacity-50 leading-relaxed max-w-[90%] font-medium">
          {project.shortDescription}
        </p>

        {/* Technical Depth Metadata Area */}
        {project.authority && (
          <div className="mb-sys-64 space-y-4 pt-6 border-t border-border-dim">
             <div>
                <div className="type-metadata text-[0.35rem] opacity-20 mb-2 uppercase tracking-widest">Inquiry_Vector</div>
                <div className="type-body text-[0.65rem] opacity-60 italic text-text-secondary">"{project.authority.researchFocus}"</div>
             </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-sys-32">
            {project.techStack.slice(0, 4).map(tech => (
              <span key={tech} className="px-1.5 py-0.5 border border-border-dim bg-transparent type-metadata text-[0.5rem] opacity-30">
                {tech.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between group-hover:text-accent transition-colors pt-sys-24 border-t border-border-dim">
            <span className="type-nav text-[0.55rem] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">DIAGNOSTIC_SPEC</span>
            <span className="text-sm opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all">&rarr;</span>
          </div>
        </div>

        {/* Diagnostic Corner Accent */}
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border border-accent/20 rotate-45" />
        </div>
      </motion.div>
    </Link>
  );
}
