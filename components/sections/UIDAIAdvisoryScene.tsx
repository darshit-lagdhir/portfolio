"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function UIDAIAdvisoryScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-transparent text-neutral-900 dark:text-neutral-50">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                <motion.div style={{ rotateX: useTransform(springProgress, [0, 1], [0, 45]), opacity: 0.03 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[clamp(12rem,25vw,30rem)] font-black uppercase whitespace-nowrap opacity-20 tracking-tighter">INTELLIGENCE</span>
                </motion.div>

                {/* Scope 1: Intro */}
                <motion.div style={{ opacity: useTransform(springProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]), y: useTransform(springProgress, [0, 0.25], [50, 0]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10 w-full h-full">
                    <span className="text-accent tracking-[0.5em] text-[10px] font-mono mb-6 uppercase block font-bold">Project 02</span>
                    <h2 className="text-display uppercase font-black leading-none tracking-tighter">UIDAI Advisory<br />System</h2>
                    <p className="text-2xl md:text-3xl text-neutral-500 italic font-light lowercase mt-8 tracking-tighter">Pattern detection. Human in the loop.</p>
                </motion.div>

                {/* Scope 2: What It Does NOT Do (WARNING) */}
                <motion.div style={{ opacity: useTransform(springProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]), scale: useTransform(springProgress, [0.35, 0.6], [0.9, 1.1]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10 w-full h-full">
                    <h3 className="text-2xl md:text-4xl font-black uppercase text-red-500 tracking-tighter mb-12">Strict Advisory Boundaries</h3>
                    <ul className="text-mega uppercase leading-[0.85] tracking-tighter flex flex-col gap-4 text-neutral-900 dark:text-neutral-50">
                        <li>NO AUTOMATED<br /> DECISIONS.</li>
                        <li className="text-transparent stroke-neutral-900 dark:stroke-neutral-50" style={{ WebkitTextStroke: "1.5px currentColor" }}>NO RANKING.</li>
                        <li>NO RESOURCE<br /> CONTROL.</li>
                    </ul>
                </motion.div>

                {/* Scope 3: Patterns & Confidence */}
                <motion.div style={{ opacity: useTransform(springProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 w-full max-w-6xl">
                        <div className="space-y-10">
                            <span className="text-[10px] border-b border-neutral-200 dark:border-neutral-800 pb-4 block font-mono uppercase tracking-[0.3em] font-bold">Pattern Detection Engine</span>
                            {["Baby Boom", "School Ready", "Employment Magnet", "Ghost Zone"].map((p) => (
                                <div key={p} className="text-xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-accent pl-6 text-neutral-800 dark:text-neutral-200">{p}</div>
                            ))}
                        </div>
                        <div className="space-y-10">
                            <span className="text-[10px] border-b border-neutral-200 dark:border-neutral-800 pb-4 block font-mono uppercase tracking-[0.3em] font-bold">Confidence Engine Logic</span>
                            {[
                                { level: "HIGH", width: "100%", color: "bg-green-500" },
                                { level: "MEDIUM", width: "66%", color: "bg-yellow-500" },
                                { level: "LOW", width: "33%", color: "bg-red-500" }
                            ].map((c) => (
                                <div key={c.level} className="w-full">
                                    <div className="flex justify-between text-[10px] font-mono font-bold uppercase mb-2"><span>{c.level}</span></div>
                                    <div className="h-1 bg-neutral-200 dark:bg-neutral-800 w-full rounded-full overflow-hidden">
                                        <div className={`h-full ${c.color}`} style={{ width: c.width }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
