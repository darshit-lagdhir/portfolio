"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function UIDAIAdvisoryScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-transparent text-neutral-900 dark:text-neutral-50" id="uidai">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-[#050510] transition-colors duration-1000">

                {/* Subtle Grid Background replacing ambient layer */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        opacity: useTransform(springProgress, [0, 0.1, 0.9, 1], [0, 0.1, 0.1, 0]),
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        backgroundPosition: 'center center'
                    }}
                />

                {/* SCENE 01: Entry Title & Map */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]), filter: useTransform(springProgress, [0, 0.05, 0.15, 0.2], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10 w-full h-full pointer-events-none"
                >
                    <span className="font-micro text-[10px] tracking-[0.5em] text-accent mb-6 uppercase block font-bold">Project 02</span>
                    <h2 className="font-title text-[clamp(4rem,10vw,12rem)] uppercase font-black leading-none tracking-tighter">
                        UIDAI
                        <br />
                        <span className="text-transparent stroke-neutral-900 dark:stroke-neutral-50" style={{ WebkitTextStroke: "1px currentColor" }}>Advisory System</span>
                    </h2>
                    <div className="mt-8 relative inline-block">
                        <p className="font-caption text-sm md:text-xl uppercase tracking-[0.2em] text-neutral-500">Advisory Only. Human Decision Required.</p>
                        <motion.div style={{ scaleX: useTransform(springProgress, [0.05, 0.1], [0, 1]) }} className="absolute -bottom-2 left-0 right-0 h-[1px] bg-accent origin-left" />
                    </div>

                    {/* Abstract Data Map (Points) */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 mt-32">
                        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
                            {/* SVG Nodes mimicking India geo-abstraction */}
                            <svg viewBox="0 0 100 100" className="w-full h-full stroke-neutral-800 dark:stroke-neutral-700 fill-none" strokeWidth="0.2">
                                <path d="M40,10 L35,25 L20,35 L25,50 L30,65 L45,85 L50,90 L60,80 L70,60 L80,50 L75,30 L60,20 Z" />
                                {/* High Stress Pulse */}
                                <motion.circle animate={{ r: [1, 5, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} cx="35" cy="40" className="fill-orange-500 stroke-none" />
                                {/* Trend Shift Arrow */}
                                <motion.path animate={{ y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity }} d="M60,50 L62,48 L64,50" strokeWidth="0.5" className="stroke-accent" />
                                {/* Ghost Zone */}
                                <motion.circle animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3, repeat: Infinity }} cx="50" cy="70" r="3" className="fill-neutral-500 stroke-none" />
                                {/* Volatility Flicker */}
                                <motion.circle animate={{ opacity: [1, 0, 1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} cx="65" cy="35" r="1.5" className="fill-red-500 stroke-none" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* SCENE 02: What It Does */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.18, 0.22, 0.35, 0.4], [0, 1, 1, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full pointer-events-none"
                >
                    <h3 className="font-caption text-2xl md:text-4xl uppercase tracking-[0.2em] mb-16 border-b border-neutral-200 dark:border-neutral-800 pb-4">Pattern Visibility</h3>
                    <div className="flex flex-col gap-6 max-w-xl text-center">
                        {[
                            "Finds enrollment patterns.",
                            "Highlights unusual activity.",
                            "Groups areas by type.",
                            "Estimates future trends.",
                            "Provides confidence scores."
                        ].map((text, i) => (
                            <motion.div
                                key={text}
                                style={{ y: useTransform(springProgress, [0.2 + (i * 0.02), 0.25 + (i * 0.02)], [50, 0]), opacity: useTransform(springProgress, [0.2 + (i * 0.02), 0.25 + (i * 0.02)], [0, 1]) }}
                                className="px-8 py-4 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                            >
                                <span className="font-accent text-lg md:text-xl uppercase tracking-widest">{text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 03: What It Does NOT Do (ETHICS) */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.38, 0.42, 0.55, 0.6], [0, 1, 1, 0]),
                        backgroundColor: useTransform(springProgress, [0.38, 0.42], ["rgba(0,0,0,0)", "rgba(5,5,5,0.95)"])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20 w-full h-full"
                >
                    <div className="w-full flex flex-col gap-12 max-w-7xl">
                        {[
                            "NO AUTOMATED DECISIONS.",
                            "NO RANKING.",
                            "NO RESOURCE CONTROL.",
                            "NO PERFORMANCE SCORING."
                        ].map((text, i) => (
                            <div key={text} className="relative">
                                <motion.div
                                    style={{
                                        x: useTransform(springProgress, [0.4 + (i * 0.03), 0.45 + (i * 0.03)], [-100, 0]),
                                        opacity: useTransform(springProgress, [0.4 + (i * 0.03), 0.45 + (i * 0.03), 0.55], [0, 1, 0.3])
                                    }}
                                >
                                    <h3 className="font-title text-[clamp(3rem,8vw,10rem)] uppercase text-red-500 tracking-tighter leading-none whitespace-nowrap">
                                        {text}
                                    </h3>
                                    <span className="font-ui text-neutral-400 text-sm md:text-xl absolute -bottom-6 left-2 uppercase tracking-widest">
                                        System is advisory only. Human review is mandatory.
                                    </span>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 04: Patterns & Confidence */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.58, 0.62, 0.75, 0.8], [0, 1, 1, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full pointer-events-none"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 w-full max-w-6xl">
                        {/* Patterns */}
                        <div className="space-y-8">
                            <span className="font-micro text-[10px] tracking-[0.3em] text-neutral-500 uppercase">Classifications</span>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { title: "Baby Boom Zone", desc: "High 0–5 enrollment density.", spark: [10, 20, 15, 40, 30] },
                                    { title: "School Ready Zone", desc: "Age 5–15 demographic cluster.", spark: [5, 15, 25, 20, 35] },
                                    { title: "Employment Magnet", desc: "Age 18–30 migration pattern.", spark: [20, 30, 40, 50, 45] },
                                    { title: "Ghost Zone", desc: "Below threshold density.", spark: [10, 8, 5, 2, 0] }
                                ].map((p, i) => (
                                    <div key={p.title} className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white/5 dark:bg-black/20 flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-caption text-sm md:text-base font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50">{p.title}</span>
                                            {/* Sparkline */}
                                            <svg className="w-16 h-4 stroke-accent fill-none" strokeWidth="1.5">
                                                <polyline points={p.spark.map((y, idx) => `${idx * 16},${20 - (y / 3)}`).join(" ")} />
                                            </svg>
                                        </div>
                                        <span className="font-ui text-xs text-neutral-500 lowercase pr-12">{p.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Confidence */}
                        <div className="space-y-8 flex flex-col justify-center">
                            <span className="font-micro text-[10px] tracking-[0.3em] text-neutral-500 uppercase">Confidence Meter</span>
                            <div className="space-y-10">
                                {[
                                    { level: "HIGH", width: "100%", color: "bg-green-500/80", desc: "Pattern stable.", delay: 0 },
                                    { level: "MEDIUM", width: "66%", color: "bg-yellow-500/80", desc: "Verify context.", delay: 0.1 },
                                    { level: "LOW", width: "33%", color: "bg-red-500/80", desc: "Data uncertain.", delay: 0.2 }
                                ].map((c) => (
                                    <div key={c.level} className="w-full">
                                        <div className="flex items-end gap-4 mb-3">
                                            <span className="font-accent text-xl font-bold uppercase">{c.level}</span>
                                            <span className="font-ui text-xs text-neutral-500 pb-1">— {c.desc}</span>
                                        </div>
                                        <div className="h-[2px] bg-neutral-200 dark:bg-neutral-800 w-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${c.color} origin-left`}
                                                style={{ width: c.width, scaleX: useTransform(springProgress, [0.62 + c.delay, 0.65 + c.delay], [0, 1]) }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SCENE 05: Human In The Loop & Ethics */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.78, 0.82, 0.95, 1], [0, 1, 1, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full pointer-events-none"
                >
                    {/* Visual Loop */}
                    <div className="flex flex-col items-center gap-6 mb-24">
                        <div className="w-16 h-16 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center relative">
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-accent" />
                            <span className="font-micro text-[10px]">Signal</span>
                        </div>
                        <div className="h-16 w-[1px] bg-neutral-300 dark:bg-neutral-700 relative overflow-hidden">
                            <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-accent" />
                        </div>
                        <div className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg">
                            <span className="font-accent uppercase font-bold text-sm tracking-widest">Human Review</span>
                        </div>
                        <span className="font-caption uppercase text-xl mt-4 tracking-[0.2em]">System shows. Humans decide.</span>
                    </div>

                    {/* Micro Ethics */}
                    <div className="flex gap-8 overflow-hidden max-w-4xl text-center flex-wrap justify-center">
                        {["No personal data.", "Aggregated totals only.", "Privacy-first design.", "Bias-aware analysis."].map((stmt, i) => (
                            <motion.span
                                key={stmt}
                                style={{ y: useTransform(springProgress, [0.8 + (i * 0.02), 0.85 + (i * 0.02)], [20, 0]), opacity: useTransform(springProgress, [0.8 + (i * 0.02), 0.85 + (i * 0.02)], [0, 1]) }}
                                className="font-light text-sm md:text-lg text-neutral-500 uppercase tracking-widest px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-full"
                            >
                                {stmt}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
