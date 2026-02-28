"use client";

import { motion } from "framer-motion";

export default function BrutalistFocus() {
    const ease = [0.16, 1, 0.3, 1] as const;
    return (
        <section className="min-h-screen w-full bg-[#050505] border-t border-neutral-900 border-dashed flex flex-col justify-center py-40 overflow-hidden relative snap-start px-8 md:px-12 xl:px-32">
            {/* Micro Label - Section Marker */}
            <div className="absolute top-10 right-10 z-0 text-right">
                <span className="font-heading text-step--1 uppercase tracking-micro text-neutral-600 block mb-2 font-bold">SECT // 03</span>
            </div>

            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-4 md:grid-cols-12 gap-x-6 items-center">
                <div className="col-span-4 md:col-span-12 flex flex-col md:flex-row items-baseline gap-8 md:gap-16 select-none">
                    {/* AIML Headline - Aalto Display (step-5) */}
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: ease }}
                        viewport={{ once: true }}
                        className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title"
                    >
                        AIML
                    </motion.h2>

                    {/* SECURITY Headline - Aalto Display (step-4) - Outline Style for Contrast without Color */}
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: ease }}
                        viewport={{ once: true }}
                        className="font-title text-step-4 leading-tight-title text-transparent uppercase tracking-tight-title"
                        style={{ WebkitTextStroke: "1px #262626", WebkitTextFillColor: "transparent" }}
                    >
                        SECURITY
                    </motion.h2>
                </div>

                <div className="col-span-4 md:col-start-7 md:col-span-6 mt-20">
                    <div className="w-12 h-px bg-neutral-900 mb-8" />
                    {/* Mission Focus - Space Grotesk (step-2) */}
                    <p className="font-body text-step-2 text-neutral-500 font-light tracking-wide leading-snug max-w-[40ch]">
                        Currently engineering the intersection of modular logistics and analytical advisory protocols.
                    </p>
                </div>
            </div>
        </section>
    );
}
