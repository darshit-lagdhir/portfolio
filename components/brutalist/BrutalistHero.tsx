"use client";

import { motion } from "framer-motion";

export default function BrutalistHero() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="hero">
            <div className="grid-layout px-8 md:px-0">
                {/* 1. Micro-Label */}
                <div className="col-span-12 mb-8 md:mb-12">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease }}
                        className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro block font-bold"
                    >
                        ARCHITECTURAL INDEX // 2025
                    </motion.span>
                </div>

                {/* 2. Primary Headline */}
                <div className="col-span-12 lg:col-span-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title select-none"
                        style={{ willChange: "transform, opacity" }}
                    >
                        DARSHIT LAGDHIR
                    </motion.h1>
                </div>

                {/* 3. Subline & CTA */}
                <div className="col-span-12 md:col-span-6 lg:col-span-5 mt-16 md:mt-24">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease }}
                        className="font-body text-step-0 text-neutral-600 font-light mb-16 tracking-wide leading-relaxed max-w-[45ch]"
                        style={{ willChange: "transform, opacity" }}
                    >
                        Engineering high-authority systems for logistics, advisory intelligence, and formal contract verification with architectural integrity.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5, ease }}
                        className="flex items-center gap-10"
                    >
                        <a href="#projects" className="font-wide text-step--1 uppercase tracking-micro text-white link-precision pb-2 font-bold">
                            VIEW SYSTEMS
                        </a>
                        <div className="w-8 h-px bg-neutral-900" />
                        <a href="#about" className="font-wide text-step--1 uppercase tracking-micro text-neutral-800 hover:text-white transition-colors duration-200 font-bold">
                            ABOUT
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


