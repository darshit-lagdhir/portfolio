"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function PFCVScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-transparent text-neutral-900 dark:text-neutral-50">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                <motion.div style={{ opacity: 0.02, x: useTransform(springProgress, [0, 1], [-200, 200]) }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[clamp(15rem,30vw,35rem)] font-black uppercase whitespace-nowrap tracking-tighter">POLYGLOT</span>
                </motion.div>

                {/* 1. Pipeline Arch */}
                <motion.div style={{ opacity: useTransform(springProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]), scale: useTransform(springProgress, [0, 0.25], [0.95, 1]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <span className="text-accent tracking-[0.5em] text-[10px] font-mono mb-6 uppercase block font-bold">Project 03</span>
                    <h2 className="text-display uppercase font-black leading-[0.85] tracking-tighter text-center">Polyglot FFI<br />Contract Verifier</h2>

                    <div className="mt-20 flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl text-[10px] font-mono uppercase font-bold tracking-[0.2em]">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((m, i) => (
                            <motion.div key={m} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md">
                                Mod 0{m}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 2. IR Flow */}
                <motion.div style={{ opacity: useTransform(springProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <h3 className="text-4xl md:text-7xl uppercase font-black tracking-tighter mb-16 text-center">Universal IR Flow</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm md:text-xl font-black uppercase tracking-widest text-neutral-400">
                        <span className="text-neutral-900 dark:text-neutral-50 px-8 py-4 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">Native</span>
                        <motion.span animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="rotate-90 md:rotate-0">→</motion.span>
                        <span className="text-neutral-900 dark:text-neutral-50 px-8 py-4 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">IR</span>
                        <motion.span animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="rotate-90 md:rotate-0">→</motion.span>
                        <span className="text-neutral-900 dark:text-neutral-50 px-8 py-4 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">Contract</span>
                        <motion.span animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="rotate-90 md:rotate-0">→</motion.span>
                        <span className="text-neutral-900 dark:text-neutral-50 px-8 py-4 bg-neutral-100 dark:bg-neutral-900 rounded-3xl">Enforcement</span>
                    </div>
                </motion.div>

                {/* 3. Guarantees */}
                <motion.div style={{ opacity: useTransform(springProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl text-center md:text-left">
                        {[
                            "Type-Safe",
                            "Memory-Safe",
                            "ABI-Compliant",
                            "Multi-Language",
                            "Runtime Enforcement",
                            "Visual Reporting"
                        ].map(feature => (
                            <h4 key={feature} className="text-4xl md:text-6xl uppercase font-black tracking-tighter border-b-2 border-accent pb-4 inline-block">{feature}.</h4>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
