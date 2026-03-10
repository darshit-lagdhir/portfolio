"use client";

import { motion } from "framer-motion";

export default function Mindset() {
  return (
    <div className="w-full">
      <div className="section-divider" data-label="01_SYSTEM_PHILOSOPHY">
        <span className="divider-label">01_SYSTEM_PHILOSOPHY</span>
      </div>

      <div className="grid-12">
        <div className="col-span-12 lg:col-span-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-h1 max-w-4xl"
          >
            WHY_SYSTEMS_MATTER: <br />
            <span className="text-secondary">INTERNAL_MECHANICS_AND_DURABILITY</span>
          </motion.h2>

          <div className="grid-12">
            <div className="col-span-12 md:col-span-6">
              <p className="type-body mb-sys-32">
                My approach to engineering is an endless cycle of experimentation: build, break, debug, redesign, and repeat. True mastery comes not from writing code that works the first time, but from observing how systems fail under pressure.
              </p>
              <p className="type-body">
                I treat software development as an architectural discipline. The goal is never just to implement a feature, but to deeply understand the structural integrity, data flow, and mechanical trade-offs of the systems I build.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-center border-l border-border-dim pl-sys-32">
              <div className="type-label mb-sys-16">CORE_PRINCIPLES</div>
              <ul className="space-y-4">
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  STRUCTURAL_INTEGRITY
                </li>
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  PREDICTABLE_STATE
                </li>
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  LATENCY_MINIMIZATION
                </li>
                <li className="type-emphasis text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  DECOUPLED_ARCHITECTURE
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
