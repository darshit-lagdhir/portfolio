"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// PHASE 14 STEP 11: PROJECT ENTRY LOADING SEQUENCE
export function ProjectEntryLoader() {
    return (
        <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: "circIn" }}
            className="fixed top-1/2 left-0 w-full h-[1px] bg-white z-[100] origin-left pointer-events-none"
        />
    );
}

// PHASE 14 STEP 1 & 12: SYSTEM HEADER BAR & STATUS INDICATOR
export function SystemHeaderBar({ current }: { current: string }) {
    return (
        <div className="fixed top-0 left-0 w-full h-12 border-b border-white/10 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-between px-6 font-ui text-[10px] tracking-widest text-white/60">
            <div className="flex items-center gap-6">
                <Link href="/" className="hover:text-white transition-colors">SYS_OVERRIDE</Link>
                <span className="opacity-30">/</span>
                <span className="text-white">{current}</span>
            </div>
            {/* STEP 12: SYSTEM STATUS INDICATOR */}
            <div className="flex items-center gap-3">
                <span className="uppercase opacity-50">System Active</span>
                <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                />
            </div>
        </div>
    );
}

// PHASE 14 STEP 8: SYSTEM GRID OVERLAY
export function SystemGridOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
            <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />
        </div>
    );
}

// PHASE 14 STEP 2, 7 & 13: PROJECT INFORMATION PANELS
export function ProjectPanel({ title, index, children }: { title: string, index: number, children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    // Step 13: Panel stack depth (active panel comes forward)
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", borderColor: "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full border border-white/5 bg-black/40 p-8 md:p-12 transition-colors origin-bottom"
        >
            <div className="flex flex-col md:flex-row gap-6 md:gap-16">
                <div className="md:w-1/4">
                    <span className="text-micro font-bold tracking-[0.4em] text-white/40 uppercase">
                        {`0${index + 1}_${title}`}
                    </span>
                </div>
                <div className="md:w-3/4 flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

// PHASE 14 STEP 6: PROJECT METADATA PANEL
export function ProjectMetadata({ tech, language, type, arch }: { tech: string[], language: string, type: string, arch: string }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-white/10 w-full mb-20 font-ui text-[11px] uppercase tracking-widest text-white/60">
            <div className="flex flex-col gap-2">
                <span className="opacity-40">System Type</span>
                <span className="text-white">{type}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="opacity-40">Core Language</span>
                <span className="text-white">{language}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="opacity-40">Architecture</span>
                <span className="text-white">{arch}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="opacity-40">Core Stack</span>
                <div className="flex flex-wrap gap-2 text-white">
                    {tech.map(t => <span key={t}>{t}</span>)}
                </div>
            </div>
        </div>
    );
}

// PHASE 14 STEP 5: PROJECT FLOW TIMELINE
export function ProjectTimeline({ steps }: { steps: string[] }) {
    return (
        <div className="w-full flex items-center justify-between relative py-8">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />

            {steps.map((step, i) => (
                <motion.div
                    key={step}
                    initial={{ opacity: 0.3, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-20% 0px -20% 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative z-10 flex flex-col items-center gap-3 bg-black px-4"
                >
                    <div className="w-2 h-2 border border-white bg-black rotate-45" />
                    <span className="text-[10px] font-ui tracking-widest text-white/50 uppercase">{step}</span>
                </motion.div>
            ))}
        </div>
    );
}

// PHASE 14 STEP 4 & 3: ARCHITECTURE VISUALIZATION
export function ArchitectureVisual() {
    return (
        <div className="w-full h-64 border border-white/10 mt-8 relative flex items-center justify-center bg-[#050505]">
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d="M 10 30 L 100 30 L 150 120 L 300 120"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                />
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    d="M 100 200 L 150 120"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                />
            </svg>
            <div className="grid grid-cols-3 gap-24 relative z-10">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="border border-white/20 px-6 py-4 text-[10px] tracking-widest bg-black">FRONTEND_SYS</motion.div>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="border border-white/40 px-6 py-4 text-[10px] tracking-widest text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] bg-black">CORE_ENGINE</motion.div>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="border border-white/20 px-6 py-4 text-[10px] tracking-widest bg-black">DB_CLUSTER</motion.div>
            </div>
        </div>
    );
}

// PHASE 14 STEP 10: PROJECT CODE BLOCK VISUAL
export function CodeBlockVisual({ code }: { code: string[] }) {
    return (
        <div className="w-full border border-white/10 bg-[#0a0a0a] p-6 text-white/50 font-mono text-sm leading-relaxed overflow-x-hidden mt-8">
            {code.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex gap-6"
                >
                    <span className="opacity-20 select-none">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line.replace(/ /g, '&nbsp;') }} />
                </motion.div>
            ))}
        </div>
    );
}

// PHASE 14 STEP 9 & 14: COMMAND-LIKE NAVIGATION
export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                // Step 14: Disable command palette on mobile
                if (window.innerWidth >= 768) {
                    setOpen(o => !o);
                }
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!open) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg border border-white/10 bg-black shadow-2xl overflow-hidden"
            >
                <div className="px-4 py-3 border-b border-white/10 text-[10px] tracking-widest text-white/40 uppercase">
                    System Command Palette
                </div>
                <div className="p-2 flex flex-col gap-1">
                    {[
                        { label: "SYS_HOME", href: "/" },
                        { label: "MOD_MOVEX", href: "/movex" },
                        { label: "MOD_UIDAI", href: "/uidai" },
                        { label: "MOD_PFCV", href: "/pfcv" },
                    ].map(cmd => (
                        <button
                            key={cmd.label}
                            onClick={() => {
                                router.push(cmd.href);
                                setOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-ui tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            {cmd.label}
                        </button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
