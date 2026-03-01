"use client";

import { motion } from "framer-motion";

export default function BrutalistFocus() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="focus">
            <div className="grid-layout px-8 md:px-0 gap-y-16 md:gap-y-24">
                {/* 1. Archive Label */}
                <div className="col-span-12">
                    <span className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro font-bold block">
                        RESEARCH // ACTIVE DOMAINS
                    </span>
                </div>

                {/* 2. Focused Headlines */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="font-title text-step-5 text-white uppercase tracking-tight-title"
                        style={{ willChange: "transform, opacity" }}
                    >
                        DOMAINS.
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
                        <div className="flex flex-col gap-4">
                            <span className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro font-bold">
                                01 // AIML
                            </span>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[30ch]">
                                Investigating autonomous pattern recognition and intelligent system architectures.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro font-bold">
                                02 // SECURITY
                            </span>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[30ch]">
                                Implementing formal verification and zero-trust protocols at the language boundary.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Global Perspective (Supports the domains) */}
                <div className="col-span-12 md:col-start-9 md:col-span-4 border-t border-neutral-900 pt-8 mt-12 md:mt-0">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        viewport={{ once: true }}
                        className="font-body text-step--1 text-neutral-800 font-bold uppercase tracking-micro leading-loose italic"
                    >
                        Building stronger foundations in intelligent systems and secure architectures. Learning state is active and honest.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}


