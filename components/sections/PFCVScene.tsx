"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function PFCVScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    const [hoveredNode, setHoveredNode] = useState("");

    const nodes = [
        { name: "Architecture", desc: "System core design." },
        { name: "Pipeline", desc: "Execution sequence router." },
        { name: "Build Process", desc: "Compilation interface." },
        { name: "Ingestion", desc: "Clang metadata extraction." },
        { name: "IR Normalization", desc: "Universal representation." },
        { name: "Contract Schema", desc: "Formal rule synthesis." },
        { name: "Synthesis Engine", desc: "Contract generation engine." },
        { name: "Language Adapter", desc: "Foreign function binding." },
        { name: "Python Adapter", desc: "In Progress", isWip: true }
    ];

    const irFlow = [
        "Native Source (C/C++)",
        "IR Extraction",
        "Normalized Rep.",
        "Contract Schema",
        "Runtime Enforcement",
        "Target (Python/Rust/C++)"
    ];

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-[#020202] text-neutral-50" id="pfcv">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden transition-colors duration-1000">

                {/* Minimal Dark Tech Background */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none opacity-20"
                    style={{
                        opacity: useTransform(springProgress, [0, 0.1, 0.9, 1], [0, 0.2, 0.2, 0]),
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px',
                        backgroundPosition: 'center center'
                    }}
                />
                <div className="absolute inset-0 z-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />

                {/* SCENE 01: Entry Title */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]), filter: useTransform(springProgress, [0, 0.05, 0.15, 0.2], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10 w-full h-full pointer-events-none"
                >
                    <span className="font-micro text-[10px] tracking-[0.5em] text-accent mb-6 uppercase block font-bold">Project 03</span>
                    <h2 className="font-title text-[clamp(4rem,10vw,12rem)] uppercase font-black leading-[0.85] tracking-tighter" style={{ fontFamily: "var(--font-title)" }}>
                        Polyglot FFI
                        <br />
                        <span className="text-transparent stroke-neutral-50" style={{ WebkitTextStroke: "1px currentColor" }}>Contract Verifier</span>
                    </h2>
                    <div className="mt-12">
                        <p className="font-caption text-sm md:text-xl uppercase tracking-[0.3em] text-neutral-400">Cross-Language Safety. Automated Verification.</p>
                    </div>
                </motion.div>

                {/* SCENE 02: 8-Module Pipeline Visualization */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.18, 0.22, 0.35, 0.4], [0, 1, 1, 0]), y: useTransform(springProgress, [0.18, 0.22], [50, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20 w-full h-full"
                >
                    <h3 className="font-caption text-2xl uppercase tracking-[0.2em] mb-24 border-b border-neutral-800 pb-4 text-neutral-500">Pipeline Architecture</h3>

                    <div className="relative w-full max-w-7xl flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-y-12">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-800 -translate-y-1/2 -z-10">
                            <motion.div
                                style={{ scaleX: useTransform(springProgress, [0.25, 0.35], [0, 1]) }}
                                className="h-full bg-accent origin-left shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                            />
                        </div>

                        {nodes.map((node, i) => (
                            <motion.div
                                key={node.name}
                                onHoverStart={() => setHoveredNode(node.desc)}
                                onHoverEnd={() => setHoveredNode("")}
                                style={{ opacity: useTransform(springProgress, [0.22 + (i * 0.01), 0.25 + (i * 0.01)], [0, 1]) }}
                                className={`relative flex flex-col items-center gap-4 cursor-crosshair group ${node.isWip ? 'opacity-50' : ''}`}
                            >
                                <div className="w-3 h-3 md:w-4 md:h-4 bg-neutral-900 border border-neutral-700 rounded-sm rotate-45 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300 relative z-10" />

                                <span className="font-accent text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-center max-w-[80px] leading-tight">
                                    {node.name}
                                </span>

                                {node.isWip && (
                                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-8 font-micro text-[8px] uppercase tracking-widest text-accent border border-accent/30 px-2 py-1 rounded-sm bg-accent/10">
                                        In Progress
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="h-4 mt-24">
                        <span className="font-ui text-sm text-neutral-400 capitalize tracking-widest transition-opacity">
                            {hoveredNode}
                        </span>
                    </div>
                </motion.div>

                {/* SCENE 03: IR Flow Animation */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.38, 0.42, 0.55, 0.6], [0, 1, 1, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 z-30 w-full h-full pointer-events-none"
                >
                    <h3 className="font-caption text-xl md:text-3xl uppercase tracking-[0.2em] mb-20 text-neutral-600">Universal IR Flow</h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-6xl flex-wrap">
                        {irFlow.map((step, i) => (
                            <div key={step} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                                <motion.div
                                    style={{
                                        opacity: useTransform(springProgress, [0.4 + (i * 0.02), 0.45 + (i * 0.02)], [0, 1]),
                                        y: useTransform(springProgress, [0.4 + (i * 0.02), 0.45 + (i * 0.02)], [20, 0])
                                    }}
                                    className="px-6 py-4 bg-[#0a0a0a] border border-neutral-800 rounded-lg shadow-[0_0_20px_rgba(0,0,0,1)] relative overflow-hidden"
                                >
                                    <motion.div
                                        animate={{ left: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                                        className="absolute top-0 bottom-0 w-[1px] bg-accent opacity-50 shadow-[0_0_10px_rgba(79,70,229,1)]"
                                    />
                                    <span className="font-accent text-xs md:text-sm uppercase tracking-widest font-bold">
                                        {step}
                                    </span>
                                </motion.div>

                                {i < irFlow.length - 1 && (
                                    <motion.div
                                        style={{ opacity: useTransform(springProgress, [0.42 + (i * 0.02), 0.47 + (i * 0.02)], [0, 1]) }}
                                        className="text-neutral-700 rotate-90 md:rotate-0"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 04: Runtime Enforcement Shield & Multi-Language */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.58, 0.62, 0.75, 0.8], [0, 1, 1, 0]) }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-20 px-8 z-40 w-full h-full pointer-events-none"
                >
                    {/* Enforcement Layer Visual */}
                    <div className="relative w-64 h-64 md:w-96 md:h-96 flex flex-col items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-neutral-800 rounded-full border-dashed opacity-50"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-accent/30 rounded-full"
                        />

                        {/* Shield Pulse */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-8 bg-accent/10 rounded-full blur-xl"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-caption uppercase tracking-[0.3em] font-bold text-sm">Enforcement<br />Core</span>
                        </div>

                        {/* Orbiting Languages */}
                        {["Python", "Rust", "C++"].map((lang, i) => (
                            <motion.div
                                key={lang}
                                className="absolute w-12 h-12 -ml-6 -mt-6 bg-[#0a0a0a] border border-neutral-800 rounded-full flex items-center justify-center font-micro text-[8px] uppercase text-accent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 5 }}
                                style={{ transformOrigin: "128px 128px", top: 0, left: "50%" }}
                            >
                                <motion.span animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 5 }}>
                                    {lang}
                                </motion.span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Guarantees */}
                    <div className="flex flex-col gap-6">
                        {["Type-safe.", "Memory-safe.", "ABI-compliant."].map((word, i) => (
                            <motion.h3
                                key={word}
                                style={{
                                    opacity: useTransform(springProgress, [0.6 + (i * 0.03), 0.65 + (i * 0.03)], [0, 1]),
                                    x: useTransform(springProgress, [0.6 + (i * 0.03), 0.65 + (i * 0.03)], [50, 0]),
                                    WebkitTextStroke: "1px currentColor",
                                    fontFamily: "var(--font-title)"
                                }}
                                className="font-title text-[clamp(3rem,6vw,6rem)] uppercase font-black tracking-tighter text-transparent stroke-neutral-50"
                            >
                                {word}
                            </motion.h3>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 05: Key Features (Formal Engineering) */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.78, 0.82, 0.95, 1], [0, 1, 1, 0]) }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4 z-50 w-full h-full pointer-events-none"
                >
                    <div className="flex flex-col gap-4 text-center">
                        {[
                            "Nullability checks.",
                            "Ownership validation.",
                            "Relational constraints.",
                            "Cross-language contracts.",
                            "Runtime crash isolation.",
                            "Visual verification reports."
                        ].map((feature, i) => (
                            <motion.div
                                key={feature}
                                style={{
                                    opacity: useTransform(springProgress, [0.8 + (i * 0.02), 0.85 + (i * 0.02), 0.9 + (i * 0.02), 0.95], [0, 1, 1, 0]),
                                    y: useTransform(springProgress, [0.8 + (i * 0.02), 0.85 + (i * 0.02)], [20, 0])
                                }}
                            >
                                <h4 className="font-funky text-[clamp(2.5rem,5vw,5rem)] uppercase tracking-tight text-neutral-300" style={{ fontFamily: "var(--font-title)" }}>
                                    {feature}
                                </h4>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
