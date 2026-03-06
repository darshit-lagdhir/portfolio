"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useScene } from "@/context/SceneContext";
import { ChoreographedSection } from "@/components/brutalist/SystemComponents";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

// TEXT SCRAMBLE HOOK — PHASE 4
const useScramble = (text: string, active: boolean) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

    useEffect(() => {
        if (!active) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(prev => prev.split("").map((_, i) => {
                if (i < iteration) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [active, text]);

    return display;
};

export default function BrutalistProjectsPreview() {
    const { setActiveSection } = useScene();
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: false, amount: 0.1 });
    const scrambledTitle = useScramble("SELECTED_WORK_ARCHIVE", inView);

    // SECTION BREATHING (TO MATCH SECTION 3)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const breathPadding = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["8rem", "10rem", "10rem", "8rem"]);

    const projects = [
        {
            id: "01",
            name: "MOVEX_SYSTEM",
            type: "LOGISTICS / BACKEND",
            href: "/movex",
            desc: "A robust supply chain engine focusing on real-time routing and high-scale operational capacity. Engineered for precision and transparency in global movement.",
            span: "lg:col-span-6 lg:col-start-1"
        },
        {
            id: "02",
            name: "UIDAI_AI",
            type: "PATTERN / AUTH",
            href: "/uidai",
            desc: "Advanced semantic search and retrieval architecture built for hyper-fast identity documentation. Integrating neural patterns into structural databases.",
            span: "lg:col-span-5 lg:col-start-8"
        },
        {
            id: "03",
            name: "POLYGLOT_FFI",
            type: "CONTRACT / SECURITY",
            href: "/pfcv",
            desc: "Zero-overhead foreign function interfaces bridging isolated memory spaces with absolute type safety. Secured through rigorous algorithmic validation.",
            span: "lg:col-span-7 lg:col-start-3"
        }
    ];

    return (
        <ChoreographedSection id="projects" className="bg-white text-black">
            <div
                ref={containerRef}
                onPointerEnter={() => setActiveSection("projects")}
                className="relative min-h-screen overflow-hidden bg-white text-black"
            >
                {/* SECTION NUMBER SYSTEM (MATCHING SECTION 3) */}
                <span className="absolute top-[10%] left-[5%] text-[20vw] font-heading font-black leading-none text-black opacity-[0.02] pointer-events-none z-0 select-none">
                    02
                </span>

                {/* BREATHING WRAPPER (MATCHING SECTION 3) */}
                <motion.div style={{ paddingTop: breathPadding, paddingBottom: breathPadding }} className="relative z-10">
                    <div className="w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-32">

                        {/* SECTION HEADING (MATCHING SECTION 3) */}
                        <div className="flex flex-col gap-6 items-start self-start w-full">
                            <span className="text-micro font-bold tracking-[0.8em] opacity-40">02_ARCHIVE</span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 1, ease: GLOBAL_EASE }}
                                className="text-[clamp(1.5rem,8vw,6rem)] break-words font-heading font-extrabold italic leading-none uppercase tracking-tighter w-full border-b border-black/20 pb-8 type-react-hover whitespace-nowrap"
                            >
                                {scrambledTitle}
                            </motion.h2>
                        </div>

                        {/* EDITORIAL PROJECT BLOCKS (MATCHING SECTION 3) */}
                        <div className="grid grid-cols-12 gap-y-32 gap-x-8 items-start mt-20">
                            {projects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: idx * 0.1, ease: GLOBAL_EASE }}
                                    className={`col-span-12 ${project.span}`}
                                    data-project="true"
                                >
                                    <Link href={project.href} className="group flex flex-col gap-8 h-full">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-micro font-bold opacity-30">{project.id}</span>
                                            <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-heading font-bold leading-tight uppercase type-react-hover group-hover:italic transition-all duration-500">
                                                {project.name.split('_').map((word, i) => (
                                                    <span key={i} className={i === 1 ? "text-black/40 italic" : ""}>
                                                        {word}{i === 0 && <br />}
                                                    </span>
                                                ))}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col gap-8">
                                            <p className="text-short-body text-black/70 tracking-wide bg-black/[0.04] p-6 md:p-8 border-l-2 border-black/30 group-hover:bg-black/5 transition-colors">
                                                {project.desc}
                                            </p>
                                            <div className="flex justify-between items-center border-t border-black/10 pt-6">
                                                <span className="text-micro font-bold tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
                                                    {project.type}
                                                </span>
                                                <motion.div
                                                    whileHover={{ x: 5 }}
                                                    className="w-12 h-12 flex items-center justify-center border border-black/10 rounded-full group-hover:bg-black group-hover:text-white transition-all"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                                        <polyline points="7 7 17 7 17 17"></polyline>
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* EXIT CUE */}
                        <div className="mt-20 md:mt-32 border-t border-black/10 pt-12 md:pt-16 flex justify-end">
                            <div className="flex flex-col items-end gap-2 opacity-30">
                                <span className="text-micro font-bold tracking-[0.4em]">SYS_NAV_02</span>
                                <div className="w-16 h-px bg-black" />
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </ChoreographedSection>
    );
}
