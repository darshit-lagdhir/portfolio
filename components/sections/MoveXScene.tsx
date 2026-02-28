"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function MoveXScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const springProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

    const [hoveredArch, setHoveredArch] = useState("");

    return (
        <section ref={containerRef} className="relative h-[600vh] bg-transparent text-neutral-900 dark:text-neutral-50" id="projects">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                {/* Visualizer Dimming Layer */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]) }}
                    className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm pointer-events-none z-0"
                />

                {/* SCENE 01: Entry Title */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0, 0.1, 0.15, 0.2], [0, 1, 1, 0]),
                        scale: useTransform(springProgress, [0, 0.2], [1.1, 0.9]),
                        filter: useTransform(springProgress, [0, 0.05, 0.15, 0.2], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full pointer-events-none"
                >
                    <h2 className="text-[clamp(6rem,15vw,20rem)] font-title uppercase tracking-[0.1em] font-black leading-none text-transparent stroke-neutral-900 dark:stroke-neutral-50" style={{ WebkitTextStroke: "2px currentColor" }}>
                        MOVEX
                    </h2>
                    <div className="relative mt-8">
                        <p className="text-xl md:text-3xl font-caption uppercase tracking-[0.3em] font-light">Modern Logistics System</p>
                        <motion.div
                            style={{ scaleX: useTransform(springProgress, [0, 0.15], [0, 1]) }}
                            className="absolute -bottom-4 left-0 w-full h-1 bg-accent origin-left"
                        />
                    </div>
                </motion.div>

                {/* SCENE 02: System Architecture Visuals */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.18, 0.22, 0.35, 0.4], [0, 1, 1, 0]),
                        y: useTransform(springProgress, [0.18, 0.22], [50, 0])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 z-20 w-full h-full"
                >
                    <span className="font-micro text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-12">Architecture</span>

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 font-accent text-sm md:text-base tracking-[0.2em] uppercase font-bold">
                        {/* User */}
                        <motion.div
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            className="w-32 h-32 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center bg-white/50 dark:bg-black/50 shadow-[0_0_30px_rgba(0,0,0,0.05)] relative"
                        >
                            <span>User</span>
                        </motion.div>

                        <motion.div style={{ scaleX: useTransform(springProgress, [0.22, 0.25], [0, 1]) }} className="w-[2px] h-8 md:w-24 md:h-[2px] bg-neutral-300 dark:bg-neutral-700 origin-left" />

                        {/* Backend */}
                        <motion.div
                            onHoverStart={() => setHoveredArch("Node.js + Express")} onHoverEnd={() => setHoveredArch("")}
                            className="w-48 h-48 rounded-[2rem] border-2 border-accent flex items-center justify-center bg-white/80 dark:bg-black/80 relative shadow-[0_0_50px_rgba(79,70,229,0.2)] hover:shadow-[0_0_80px_rgba(79,70,229,0.4)] transition-shadow cursor-pointer"
                        >
                            <span>Backend</span>
                            {/* Middleware Ring */}
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border border-dashed border-accent/50 rounded-[2.5rem] opacity-50 pointer-events-none" />
                            {/* Session Layer */}
                            <motion.div style={{ opacity: useTransform(springProgress, [0.28, 0.3], [0, 1]) }} className="absolute -bottom-6 bg-accent text-white font-micro text-[8px] px-4 py-1 rounded-full whitespace-nowrap pointer-events-none">Session Manager</motion.div>
                        </motion.div>

                        <motion.div style={{ scaleX: useTransform(springProgress, [0.25, 0.28], [0, 1]) }} className="w-[2px] h-8 md:w-24 md:h-[2px] bg-neutral-300 dark:bg-neutral-700 origin-left" />

                        {/* PostgreSQL */}
                        <motion.div
                            onHoverStart={() => setHoveredArch("PostgreSQL (MoveX Auth)")} onHoverEnd={() => setHoveredArch("")}
                            className="w-32 h-40 rounded-xl border border-neutral-300 dark:border-neutral-700 flex items-center justify-center bg-white/50 dark:bg-black/50 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.05)]"
                        >
                            <span className="[writing-mode:vertical-rl] font-bold">Database</span>
                        </motion.div>
                    </div>

                    <div className="h-10 mt-16 font-light text-xl text-neutral-500 italic transition-opacity">
                        {hoveredArch}
                    </div>

                    {/* Role Hierarchy */}
                    <div className="absolute bottom-10 left-10 flex flex-col gap-2 font-ui text-xs scale-90 origin-bottom-left border-l border-neutral-300 dark:border-neutral-700 pl-4 py-2">
                        <span className="font-micro tracking-[0.3em] text-[8px] text-neutral-400 mb-2 block">Role-Based Access Control</span>
                        <div className="font-bold text-accent text-sm">Admin</div>
                        <div className="text-neutral-600 dark:text-neutral-400 pl-2 border-l border-neutral-200 dark:border-neutral-800">Franchisee</div>
                        <div className="text-neutral-600 dark:text-neutral-400 pl-2 border-l border-neutral-200 dark:border-neutral-800">Staff</div>
                        <div className="text-neutral-600 dark:text-neutral-400 pl-2 border-l border-neutral-200 dark:border-neutral-800">User</div>
                    </div>
                </motion.div>

                {/* SCENE 03: Security Layers */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.38, 0.42, 0.55, 0.6], [0, 1, 1, 0]),
                        x: useTransform(springProgress, [0.38, 0.42], [-100, 0])
                    }}
                    className="absolute inset-0 flex flex-col justify-center px-12 md:px-32 z-30 w-full h-full pointer-events-none"
                >
                    <h3 className="text-[clamp(4rem,10vw,8rem)] font-title font-black text-left leading-none tracking-tighter mb-16">Security<br />Built-In</h3>

                    <div className="flex flex-col gap-6 max-w-sm">
                        {[
                            { name: "Hashed Credentials", delay: 0 },
                            { name: "Session Isolation", delay: 0.1 },
                            { name: "Request Throttling", delay: 0.2 },
                            { name: "Origin Control", delay: 0.3 },
                            { name: "Browser Policy", delay: 0.4 },
                            { name: "Injection Defense", delay: 0.5 },
                        ].map((item, i) => (
                            <motion.div
                                key={item.name}
                                style={{ opacity: useTransform(springProgress, [0.42 + item.delay * 0.1, 0.45 + item.delay * 0.1], [0, 1]), x: useTransform(springProgress, [0.42 + item.delay * 0.1, 0.45 + item.delay * 0.1], [50, 0]) }}
                                className="flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4"
                            >
                                <div className="w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-accent relative">
                                        <motion.div animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="absolute inset-0 bg-accent rounded-full" />
                                    </div>
                                </div>
                                <span className="font-accent text-sm tracking-[0.1em] uppercase font-bold">{item.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 04: Module Flow */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.58, 0.62, 0.85, 0.9], [0, 1, 1, 0]),
                        scale: useTransform(springProgress, [0.58, 0.62], [1.1, 1])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 z-40 w-full h-full"
                >
                    <span className="font-micro text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-16">Functional Modules</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl">
                        {[
                            { title: "User Management", sub: "Role-based login & control" },
                            { title: "Franchise Operations", sub: "Branch-level workflow" },
                            { title: "Customer Booking", sub: "Booking & rate calculation" },
                            { title: "Pickup & Dispatch", sub: "Dispatch coordination" },
                            { title: "Shipment Tracking", sub: "Real-time status flow" },
                            { title: "Reports & Analytics", sub: "Business insights" }
                        ].map((mod, i) => (
                            <motion.div
                                key={mod.title}
                                style={{
                                    y: useTransform(springProgress, [0.6 + (i * 0.02), 0.65 + (i * 0.02)], [100, 0]),
                                    opacity: useTransform(springProgress, [0.6 + (i * 0.02), 0.65 + (i * 0.02)], [0, 1])
                                }}
                                className="group relative p-8 h-48 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl rounded-2xl flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden cursor-default hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <span className="absolute top-6 right-6 font-micro text-[10px] text-neutral-300 dark:text-neutral-700 transition-colors group-hover:text-accent">0{i + 1}</span>

                                <h4 className="font-accent text-lg md:text-xl font-bold uppercase tracking-widest leading-tight w-3/4 pointer-events-none">{mod.title}</h4>
                                <p className="font-ui text-sm text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 tracking-wide pointer-events-none">
                                    {mod.sub}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 05: Exit Transition (Background Morphing) */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0.85, 1], [0, 1]) }}
                    className="absolute inset-0 bg-[#050505] dark:bg-[#fafafa] z-[100] pointer-events-none mix-blend-difference"
                />

            </div>
        </section>
    );
}
