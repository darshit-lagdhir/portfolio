"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const domains = [
    {
        title: "AIML.",
        description: "AUTONOMOUS PATTERN RECOGNITION AND INTELLIGENT SYSTEMS. SIGNAL TO INTELLIGENCE MAPPING."
    },
    {
        title: "SECURITY.",
        description: "FORMAL-VERIFICATION AND ZERO-TRUST PROTOCOLS. REDUCING UNCERTAINTY IN CROSS-LANGUAGE INTERACTIONS."
    }
];

export default function BrutalistFocus() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    // SCROLL-DRIVEN PERSPECTIVE SHIFT (PHASE 2)
    const rotateXShift = useTransform(sectionScroll, [0, 0.4, 0.6, 1], [3, 0, 0, -3]);

    // DIAGONAL TRANSITION MOMENT (PHASE 6)
    // One-time diagonal shift as section enters
    const diagonalSkew = useTransform(sectionScroll, [0, 0.15, 0.3], [1.5, -0.5, 0]);
    const diagonalRotate = useTransform(sectionScroll, [0, 0.15, 0.3], [1, -0.5, 0]);

    // SECTION DEPTH CONTAINERS (PHASE 1: SLIGHTLY RECESSED)
    const baseZ = -30;

    return (
        <section ref={sectionRef} className="spatial-section bg-surface/10 relative overflow-hidden" id="focus">

            {/* BACKGROUND LAYER REVEAL FIRST */}
            <motion.div
                style={{ y: useTransform(sectionScroll, [0, 1], [0, -150]), rotate: 12, opacity: useTransform(sectionScroll, [0, 0.4, 0.6, 1], [0, 0.15, 0.15, 0]) }}
                className="absolute inset-x-0 -top-[30%] h-[160%] z-0 flex items-center justify-center pointer-events-none"
            >
                <div className="w-[140%] h-[140%] grid grid-cols-24 gap-12 -rotate-12">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-l border-t border-white/[0.03] h-64 w-full" />
                    ))}
                </div>
            </motion.div>

            <motion.div
                style={{
                    rotateX: rotateXShift,
                    skewX: diagonalSkew,
                    rotate: diagonalRotate,
                    translateZ: useTransform(sectionScroll, (v) => baseZ + (v * 10)), /* Gradual focus shift */
                    transformStyle: "preserve-3d"
                }}
                className="grid-layout items-start relative z-10 morph-surface md:pl-[6%] lg:pl-[10%]"
            >
                <div className="col-span-12 mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        04 RESEARCH FOCUS // DIAGONAL SHIFT
                    </motion.span>
                </div>

                <div className="col-span-12 flex flex-col">
                    {domains.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, translateZ: -80 }}
                            whileInView={{ opacity: 1, translateZ: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-t border-border pt-16 pb-20 md:pb-32 group"
                        >
                            <div className="md:col-span-8">
                                <motion.h3
                                    className="font-title text-step-4 text-white uppercase tracking-tight-title group-hover:translate-x-6 transition-all duration-700 text-physical italic first-letter:not-italic"
                                >
                                    {d.title}
                                </motion.h3>
                            </div>

                            <div className="md:col-span-4 md:col-start-9 mt-6 md:mt-0">
                                <p className="font-body text-step-0 text-muted font-light leading-relaxed group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                    {d.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
