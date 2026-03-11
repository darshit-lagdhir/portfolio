"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ExplorationArchive() {
  const experimentalProjects = projects.filter(p => p.tier === 2 || p.tier === 3);

  if (experimentalProjects.length === 0) return null;

  return (
    <div className="w-full relative">
      <SectionDivider label="04_RESEARCH_ARCHIVE" />
      
      <div className="mb-sys-48">
        <h2 className="type-h2">TECHNICAL_EXPLORATIONS_</h2>
        <p className="type-body text-sm opacity-60 max-w-2xl leading-relaxed">
          While the primary manifest focuses on core system builds, this archive contains specialized research, low-level prototypes, and technical investigations into specific architectural mechanics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experimentalProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link 
              href={`/${project.slug}`}
              className="module-frame group block h-full flex flex-col relative !p-10 hover:border-accent/20 transition-all border-dashed"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                 {project.tier === 3 && (
                   <span className="type-metadata text-[0.35rem] px-1.5 py-0.5 border border-border-dim text-text-muted bg-transparent">
                     ARCHIVED_03
                   </span>
                 )}
                 <div className="arch-marker scale-[0.4] opacity-10 group-hover:opacity-40 transition-opacity" />
              </div>

              <div className="flex items-center gap-2 mb-6 opacity-30">
                 <span className={cn(
                   "w-1 h-3",
                   project.tier === 2 ? "bg-accent/40" : "bg-text-muted"
                 )} />
                 <span className="type-metadata text-[0.35rem] tracking-[0.2em] group-hover:opacity-100 transition-opacity">
                   REF_{project.slug.toUpperCase().substring(0, 4)}
                 </span>
              </div>

              <h3 className="type-emphasis text-xs mb-4 group-hover:text-accent/60 transition-colors tracking-tight">
                {project.title.toLowerCase()}
              </h3>
              
              <p className="type-body text-[0.65rem] opacity-30 mb-8 flex-grow leading-relaxed font-medium">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-border-dim/20">
                {project.techStack.slice(0, 3).map(tech => (
                  <span key={tech} className="type-metadata text-[0.35rem] opacity-20 group-hover:opacity-40 transition-opacity">
                    {tech.toUpperCase()}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-sys-64 flex justify-center">
         <div className="flex items-center gap-4 py-3 px-8 border border-border-dim/20 bg-bg-secondary/10">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
            <span className="type-metadata text-[0.45rem] tracking-[0.2em] opacity-30">SCALABLE ARCHIVE SYSTEM // TIER_2_RESEARCH_ACTIVE</span>
         </div>
      </div>
    </div>
  );
}
