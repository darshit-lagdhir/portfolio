"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";
import DiscoveryHint from "@/components/shared/DiscoveryHint";

const PRINCIPLES = [
  {
    id: "experimentation",
    title: "BUILD_AND_BREAK",
    description: "I learn primarily by building systems directly and exposing them to stress. True understanding comes from the feedback loop of construction and controlled failure.",
    icon: "01"
  },
  {
    id: "debugging",
    title: "DEBUGGING_AS_LEARNING",
    description: "Many of my technical insights come from investigating unexpected system failures. I view debugging not just as a problem to fix, but as a primary learning tool.",
    icon: "02"
  },
  {
    id: "redesign",
    title: "CONTINUOUS_REDESIGN",
    description: "Whenever architectural problems appear, I see an opportunity to tear down and reconstruct. I value the lessons learned from a broken state as much as a stable build.",
    icon: "03"
  },
  {
    id: "humility",
    title: "TECHNICAL_HUMILITY",
    description: "I am actively learning how large, continuous systems are designed. My exploration is an ongoing, hands-on process driven by curiosity rather than assumed expertise.",
    icon: "04"
  }
];

export default function EngineeringPhilosophy() {
  return (
    <div className="w-full">
      <SectionDivider label="03_TECHNICAL_MINDSET" />

      <div className="grid-12 items-start gap-y-sys-64 md:gap-y-0">
        <div className="col-span-12 lg:col-span-12 mb-sys-96 text-center lg:text-left">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-5xl"
           >
              <h2 className="type-h1 text-4xl md:text-5xl mb-sys-48 uppercase leading-[1.05] tracking-tighter">
                Architecture is a <span className="text-accent underline decoration-accent/20 decoration-1 underline-offset-[12px]">Diagnostic Discipline</span>, not just a constructive one.
              </h2>
              <div className="space-y-6">
                <p className="type-body text-xl md:text-2xl text-text-primary/70 leading-relaxed max-w-3xl">
                  I believe that the best way to learn how a system works is to build it, break it, and then spend hours figuring out why it failed.
                </p>
                <p className="type-body text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl opacity-60">
                  My goal isn&apos;t just to write code that runs. I am actively learning how to architect software that is stable, predictable, and resilient by studying real-world mechanics.
                </p>
              </div>
           </motion.div>
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {PRINCIPLES.map((principle, index) => (
             <motion.div
               key={principle.id}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 1 }}
               className="module-frame group relative overflow-hidden h-full flex flex-col hover:shadow-lg transition-all"
             >
                {/* Visual Signature Marker */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-60 transition-opacity">
                   <div className="arch-marker scale-75" />
                </div>

                <div className="flex flex-col h-full">
                   <div className="type-metadata text-[0.45rem] text-accent/40 mb-10 flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent/40" />
                      PRINC_0{principle.icon}
                   </div>
                   
                   <h3 className="type-emphasis text-sm mb-8 tracking-tight group-hover:text-accent/80 transition-colors">
                     {principle.title}
                   </h3>
                   
                   <p className="type-body text-xs opacity-40 leading-relaxed group-hover:opacity-60 transition-opacity max-w-[90%] font-medium">
                     {principle.description}
                   </p>
                </div>

                {/* Bottom interactive hint */}
                <div className="mt-12 pt-6 border-t border-border-dim opacity-0 group-hover:opacity-40 transition-opacity flex justify-between items-center">
                   <span className="type-metadata text-[0.35rem]">ALIGN_VERIFIED</span>
                   <div className="w-1 h-1 bg-accent" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <div className="mt-sys-128 flex flex-col items-center text-center">
        <DiscoveryHint 
          label="COMPARE_SYSTEM_ARCHITECTURES" 
          href="#comparison"
          description="See how these engineering principles are applied across different technical domains."
          orientation="center"
        />
      </div>
    </div>
  );
}
