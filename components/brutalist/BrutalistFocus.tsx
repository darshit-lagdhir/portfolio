"use client";

import { motion } from "framer-motion";

const domains = [
    {
        title: "AIML.",
        description: "Investigating autonomous pattern recognition and intelligent system architectures. Focused on the transition from signal to actionable intelligence."
    },
    {
        title: "CYBERSECURITY.",
        description: "Implementing formal verification and zero-trust protocols at the language boundary. Reducing uncertainty in cross-language interactions."
    }
];

export default function BrutalistFocus() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="focus">
            <div className="grid-layout px-8 md:px-0 gap-y-32 md:gap-y-48">
                {/* 1. Header Label */}
                <div className="col-span-12">
                    <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                        RESEARCH // ACTIVE DOMAINS
                    </span>
                </div>

                {/* 2. Focused Blocks */}
                <div className="col-span-12 flex flex-col gap-24 md:gap-32">
                    {domains.map((d, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline">
                            <div className="md:col-span-5 lg:col-span-6">
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    className="font-title text-step-4 text-white uppercase tracking-tight-title"
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    {d.title}
                                </motion.h2>
                            </div>
                            <div className="md:col-span-7 lg:col-span-6 border-l border-neutral-900 pl-8 md:pl-12">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.1, ease }}
                                    viewport={{ once: true }}
                                    className="font-body text-step-1 text-neutral-600 font-light leading-relaxed max-w-[40ch]"
                                >
                                    {d.description}
                                </motion.p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



