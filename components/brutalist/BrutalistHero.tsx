"use client";

import { motion } from "framer-motion";

export default function BrutalistHero() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="hero">
            <div className="grid-layout px-8 md:px-0">
                {/* 1. Micro Label */}
                <div className="col-span-12 mb-12 lg:mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease }}
                        className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro block font-bold"
                    >
                        ARCHITECTURAL INDEX // SELECTION
                    </motion.span>
                </div>

                {/* 2. Main Headline */}
                <div className="col-span-12 lg:col-span-11">
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title"
                        style={{ willChange: "transform, opacity" }}
                    >
                        DARSHIT LAGDHIR
                    </motion.h1>
                </div>

                {/* 3. Supporting Subline */}
                <div className="col-span-12 md:col-span-7 lg:col-span-6 mt-16 md:mt-24">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease }}
                        className="font-body text-step-1 text-neutral-600 font-light leading-relaxed max-w-[50ch] mb-16"
                        style={{ willChange: "transform, opacity" }}
                    >
                        Engineering high-authority systems for logistics, advisory intelligence, and formal contract verification with architectural integrity.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, ease }}
                        className="flex items-center gap-12"
                    >
                        <a href="#projects" className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-neutral-400 transition-colors duration-200 font-bold">
                            View Systems &rarr;
                        </a>
                        <a href="#about" className="font-wide text-step-0 text-neutral-800 uppercase tracking-micro hover:text-white transition-colors duration-200 font-bold">
                            About
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}



