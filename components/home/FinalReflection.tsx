"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/shared/SectionDivider";

export default function FinalReflection() {
  return (
    <div className="w-full relative">
      <SectionDivider label="08_SYSTEM_REFLECTIONS" />
      
      <div className="py-sys-96 lg:py-sys-128 mb-sys-64">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Visual Anchor - Minimal Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-1 border border-accent/10 bg-accent/5 rounded-full mb-12"
          >
            <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-40" />
          </motion.div>
          
          {/* Reflective Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="type-identity text-3xl md:text-5xl uppercase tracking-tighter opacity-80"
          >
            End_of_Manifest_
          </motion.h2>

          {/* Deep Philosophical Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <p className="type-body text-lg md:text-xl text-text-secondary opacity-60 leading-relaxed font-light px-6">
              This portfolio is not a static archive of completed work, but a continuing investigation into the 
              structural integrity of digital systems. It represents a journey of curiosity—of dissecting 
              the internal mechanics of building software to understand not just how it works, but how 
              it evolves and scales. We are perpetually exploring the boundary where architectural 
              rigor meets engineering discovery.
            </p>
            
            <div className="flex flex-col items-center gap-6">
               <div className="w-[1px] h-16 bg-gradient-to-b from-border-dim to-transparent opacity-50" />
               <div className="flex gap-8">
                  <span className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] uppercase hover:opacity-100 transition-opacity duration-700 cursor-default">EXPLORATION</span>
                  <span className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] uppercase hover:opacity-100 transition-opacity duration-700 cursor-default">CURIOSITY</span>
                  <span className="type-metadata text-[0.4rem] opacity-20 tracking-[0.4em] uppercase hover:opacity-100 transition-opacity duration-700 cursor-default">SYNTHESIS</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
