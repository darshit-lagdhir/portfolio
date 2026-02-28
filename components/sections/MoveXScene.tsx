"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const modules = [
    { title: "User Management" },
    { title: "Franchise & Staff" },
    { title: "Customer Booking" },
    { title: "Pickup & Dispatch" },
    { title: "Tracking & Delivery" },
    { title: "Reports & Analytics" }
];

export default function MoveXScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-transparent text-neutral-900 dark:text-neutral-50" id="projects">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

                {/* Global Background Typography */}
                <motion.div style={{ x: useTransform(springProgress, [0, 1], [100, -300]) }} className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                    <span className="text-[clamp(15rem,30vw,35rem)] font-black uppercase whitespace-nowrap tracking-tighter">MOVEX</span>
                </motion.div>

                {/* SCENE 01: Architecture */}
                <motion.div style={{ opacity: useTransform(springProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]), scale: useTransform(springProgress, [0, 0.25], [0.9, 1]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <span className="text-accent tracking-[0.5em] text-[10px] font-mono mb-6 uppercase block font-bold">Project 01</span>
                    <h2 className="text-mega uppercase font-black leading-none tracking-tighter text-center">MoveX</h2>
                    <p className="text-2xl md:text-4xl text-neutral-500 italic font-light lowercase mt-4 tracking-tighter">Modern Logistics System</p>

                    {/* Animated Arch Diagram */}
                    <div className="mt-16 flex flex-col md:flex-row items-center gap-4 md:gap-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                        <span className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md">User Role</span>
                        <div className="w-[1px] h-12 md:w-24 md:h-[1px] bg-neutral-900 dark:bg-white relative overflow-hidden">
                            <motion.div animate={{ y: ["-100%", "100%"], x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-full h-full bg-accent absolute" />
                        </div>
                        <span className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 rounded-full bg-neutral-100 dark:bg-neutral-900">Express Backend</span>
                        <div className="w-[1px] h-12 md:w-24 md:h-[1px] bg-neutral-900 dark:bg-white relative overflow-hidden">
                            <motion.div animate={{ y: ["-100%", "100%"], x: ["-100%", "100%"] }} transition={{ duration: 1, delay: 0.5, repeat: Infinity, ease: "linear" }} className="w-full h-full bg-accent absolute" />
                        </div>
                        <span className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md">PostgreSQL</span>
                    </div>
                </motion.div>

                {/* SCENE 02: Security Layer */}
                <motion.div style={{ opacity: useTransform(springProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]), y: useTransform(springProgress, [0.35, 0.45], [100, 0]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <h3 className="text-display uppercase font-black tracking-tighter mb-12 text-center text-transparent stroke-neutral-900 dark:stroke-neutral-50" style={{ WebkitTextStroke: "1.5px currentColor" }}>Security Depth</h3>
                    <div className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.3em] font-mono font-bold w-full max-w-lg">
                        {["Session Token Flow", "JWT Verification", "Request Limit Pulse", "CSP Shield Enabled"].map((val, i) => (
                            <div key={val} className="flex justify-between items-center p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md">
                                <span>{val}</span>
                                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-accent" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* SCENE 03: Modular Flow */}
                <motion.div style={{ opacity: useTransform(springProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]), scale: useTransform(springProgress, [0.7, 0.8], [1.1, 1]), pointerEvents: "none" }} className="absolute inset-0 flex flex-col items-center justify-center px-8 z-10 w-full h-full">
                    <h3 className="text-5xl md:text-8xl uppercase font-black tracking-tighter mb-16 text-center">6 Core Modules</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
                        {modules.map((mod, i) => (
                            <div key={mod.title} className="group relative p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-accent transition-colors bg-white/30 dark:bg-black/30 backdrop-blur-md">
                                <span className="absolute top-4 right-4 text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                <h4 className="text-sm md:text-base font-bold uppercase tracking-widest mt-4 leading-tight">{mod.title}</h4>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
