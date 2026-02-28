"use client";

import { useState, useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const layers = [
    { title: "Machine Code", offset: -30 },
    { title: "System Logic", offset: 20 },
    { title: "Persistence", offset: -10 },
    { title: "Experience", offset: 40 },
    { title: "Infrastructure", offset: 0 },
];

const flagship = "Courier Management System";

export default function SystemMapSection() {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState<number | null>(null);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

    const springProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

    // Asymmetrical Text Depth Stack
    const fgX = useTransform(springProgress, [0, 1], ["-10%", "30%"]);
    const bgX = useTransform(springProgress, [0, 1], ["10%", "-30%"]);

    // Type Compression
    const titleLetterSpacing = useTransform(springProgress, [0, 1], ["0.1em", "-0.1em"]);
    const titleScale = useTransform(springProgress, [0, 1], [1, 0.9]);

    return (
        <section ref={sectionRef} className="relative h-[250vh] bg-white dark:bg-[#050505] overflow-visible z-20">
            {/* Diagonal Break Top */}
            <div className="absolute top-0 left-0 w-full h-[15vh] bg-[#f0f0f0] dark:bg-[#080808] diagonal-break -scale-y-100 z-0" />

            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* FOREGROUND & BACKGROUND DEPTH STACKS */}
                <motion.div style={{ x: bgX }} className="absolute top-[45%] left-0 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap">
                    <span className="text-display opacity-[0.02] font-black tracking-tighter">DATA // FLUX // NODES</span>
                </motion.div>
                <motion.div style={{ x: fgX }} className="absolute top-[55%] left-0 -translate-y-1/2 pointer-events-none select-none z-20 whitespace-nowrap">
                    <span className="text-display opacity-[0.04] font-black color-transparent stroke-neutral-900 dark:stroke-white" style={{ WebkitTextStroke: "2px currentColor" }}>
                        GRAPH // MAPPING
                    </span>
                </motion.div>

                <div className="flex flex-col items-center z-30">
                    <span className="text-[10px] uppercase tracking-[1em] text-accent font-mono mb-12 block font-black">Sync Protocol</span>

                    <div className="overflow-hidden relative mb-20 group">
                        <motion.h2
                            style={{ letterSpacing: titleLetterSpacing, scale: titleScale }}
                            className="text-mega md:text-[8rem] text-neutral-900 dark:text-neutral-50 leading-[0.8] tracking-tighter cursor-crosshair relative z-10 text-mask"
                        >
                            TOPOLOGY
                        </motion.h2>
                    </div>

                    <motion.button
                        onClick={() => setVisible((v) => !v)}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        whileTap={{ scale: 0.9, rotate: -3 }}
                        className="relative px-20 py-8 rounded-full border border-neutral-900 dark:border-white text-[11px] font-black uppercase tracking-[0.5em] overflow-hidden group hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-500"
                    >
                        <span className="relative z-10">{visible ? "Terminate" : "Initialize Matrix"}</span>
                        <div className="absolute inset-x-0 bottom-0 h-0 bg-neutral-900 dark:bg-white group-hover:h-full transition-all duration-300 -z-0" />
                    </motion.button>
                </div>

                <AnimatePresence>
                    {visible && (
                        <motion.div
                            initial={{ opacity: 0, y: 150 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 150 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex items-center justify-center z-40 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl"
                        >
                            <div className="w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-20 items-center">

                                {/* Asymmetrical Offset Nodes */}
                                <div className="space-y-[10vh]">
                                    {layers.map((layer, i) => (
                                        <motion.div
                                            key={layer.title}
                                            initial={{ x: -100, opacity: 0, rotate: 10 }}
                                            animate={{ x: layer.offset, opacity: active === i || active === null ? 1 : 0.1, rotate: 0 }}
                                            transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                                            onMouseEnter={() => setActive(i)}
                                            onMouseLeave={() => setActive(null)}
                                            className="p-8 glass-card rounded-[2rem] flex items-center justify-between group cursor-crosshair transition-all border-l-4 border-transparent hover:border-accent"
                                        >
                                            <span className="text-2xl font-black uppercase tracking-tighter group-hover:italic">{layer.title}</span>
                                            <span className="text-[9px] font-mono text-neutral-400 font-bold ml-12">L-0{i + 1}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="hidden md:block w-32 h-[60vh] relative">
                                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 800">
                                        {layers.map((_, i) => (
                                            <motion.path
                                                key={i}
                                                initial={{ pathLength: 0 }}
                                                animate={{
                                                    pathLength: 1,
                                                    stroke: active === i ? "var(--color-accent)" : "currentColor",
                                                    opacity: active === i ? 1 : 0.05,
                                                    strokeWidth: active === i ? 4 : 1
                                                }}
                                                d={`M ${layers[i].offset} ${150 * i + 80} Q 50 ${150 * i + 80} 100 400`}
                                                fill="none"
                                                className="text-neutral-900 dark:text-neutral-50 transition-all duration-700"
                                            />
                                        ))}
                                    </svg>
                                </div>

                                {/* Central Gravity Node */}
                                <motion.div
                                    initial={{ x: 100, opacity: 0, rotate: -10 }}
                                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="p-16 rounded-[4rem] border border-neutral-200 dark:border-neutral-800 relative group overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                                >
                                    <span className="text-[10px] font-mono tracking-[1em] text-neutral-400 block mb-12 uppercase font-bold">Singularity</span>
                                    <h3 className="text-5xl md:text-7xl font-black leading-[0.8] mb-12 uppercase tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left">{flagship}</h3>
                                    <div className="flex gap-4">
                                        <span className="text-[9px] font-mono px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full font-black animate-pulse">SYNC // OK</span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-[100%] border border-accent/20 rounded-full border-dashed pointer-events-none -z-10"
                                    />
                                </motion.div>
                            </div>

                            <button onClick={() => setVisible(false)} className="absolute top-12 right-12 text-[10px] font-mono uppercase tracking-[0.5em] font-bold border-b border-neutral-900 dark:border-white pb-2 hover:pb-4 transition-all">Close Matrix</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
