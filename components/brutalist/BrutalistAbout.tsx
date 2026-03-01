"use client";

import { motion } from "framer-motion";

const aboutBlocks = [
    {
        statement: "Systems from the inside out.",
        details: "Focusing on the interaction between individual components to build resilient architectures that scale effectively."
    },
    {
        statement: "Logic-first engineering.",
        details: "Prioritizing foundation over aesthetics. Real performance is built on structural integrity and formal verification."
    },
    {
        statement: "Controlled Refinement.",
        details: "Constant debugging and iterative rebuilding to ensure that every system remains stable under real-world friction."
    },
    {
        statement: "Modular by conviction.",
        details: "Building for isolation and composition. Every module is a self-contained unit designed for long-term maintainability."
    }
];

export default function BrutalistAbout() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="about">
            <div className="grid-layout px-8 md:px-0 gap-y-24 md:gap-y-32">
                {aboutBlocks.map((block, i) => (
                    <div
                        key={i}
                        className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-neutral-900 pt-16 md:pt-20"
                    >
                        {/* Statement Label (Micro) */}
                        <div className="md:col-span-4 mb-4 md:mb-0">
                            <span className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro font-bold">
                                PRINCIPLE // 0{i + 1}
                            </span>
                        </div>

                        {/* Content Split: Headline (7) + Detail (5) */}
                        <div className="md:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-12">
                            <div className="lg:col-span-5">
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.7, ease }}
                                    className="font-title text-step-3 text-white uppercase tracking-tight-title"
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    {block.statement}
                                </motion.h2>
                            </div>
                            <div className="lg:col-span-3">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ delay: 0.1, duration: 0.7, ease }}
                                    className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[30ch]"
                                >
                                    {block.details}
                                </motion.p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


