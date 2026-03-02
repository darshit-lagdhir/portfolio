"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

// TEXT SCRAMBLE HOOK — PHASE 4 (STEP 5)
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
    const containerRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const scrambledTitle = useScramble("SELECTED_WORK_ARCHIVE", inView);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // HORIZONTAL MOTION INSERT — PHASE 4 (STEP 9)
    const xParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    const projects = [
        { id: "01", name: "MOVEX_SYSTEM", type: "LOGISTICS / BACKEND", href: "/movex" },
        { id: "02", name: "UIDAI_AI", type: "PATTERN / AUTH", href: "/uidai" },
        { id: "03", name: "POLYGLOT_FFI", type: "CONTRACT_VERIFIER", href: "/pfcv" }
    ];

    return (
        <section
            ref={containerRef}
            id="projects"
            onPointerEnter={() => setActiveSection("projects")}
            className="relative min-h-screen bg-white text-black py-40 flex flex-col items-center overflow-hidden"
        >
            <motion.div
                onViewportEnter={() => setInView(true)}
                className="w-full max-w-[1800px] mx-auto px-[5vw] flex flex-col gap-24"
            >

                {/* SECTION HEADING — TEXT SCRAMBLE — PHASE 4 */}
                <div className="flex flex-col gap-6 items-start self-start">
                    <span className="text-micro font-bold tracking-[0.8em] opacity-40">02_ARCHIVE</span>
                    <h2 className="text-large text-black font-heading italic leading-none uppercase tracking-tighter w-full border-b border-black pb-8">
                        {scrambledTitle}
                    </h2>
                </div>

                {/* PROJECT ROWS — PHASE 4 */}
                <motion.div
                    style={{ x: xParallax }}
                    className="flex flex-col w-full"
                >
                    {projects.map((project, i) => (
                        <ProjectRow key={project.id} project={project} index={i} />
                    ))}
                </motion.div>
            </motion.div>

            {/* EXIT CUE — PHASE 4 */}
            <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <span className="text-micro font-bold tracking-[0.6em]">SYS_NAV_02</span>
                <div className="w-20 h-px bg-black" />
            </div>
        </section>
    );
}

function ProjectRow({ project, index }: { project: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 + index * 0.1, ease: GLOBAL_EASE }}
            className={`
                relative w-full border-b border-black group cursor-none project-row-transition
                ${isHovered ? "flash-invert" : ""}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-project="true"
        >
            <Link href={project.href} className="flex flex-col md:flex-row md:items-center justify-between py-16 gap-8 px-4 group-hover:bg-black group-hover:text-white transition-colors duration-200">

                {/* ID + TITLE — MASK REVEAL — PHASE 4 */}
                <div className="flex items-center gap-12 mask-reveal overflow-visible">
                    <span className="text-[14px] font-bold opacity-30 group-hover:opacity-100">{project.id}</span>
                    <motion.h3
                        animate={{ letterSpacing: isHovered ? "0.15em" : "0.02em" }}
                        className="text-large-mini md:text-large font-heading italic uppercase transition-all duration-500"
                    >
                        {project.name}
                    </motion.h3>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                    <span className="text-micro font-bold tracking-[0.4em] opacity-40 group-hover:opacity-100 italic">
                        {project.type}
                    </span>
                    <div className="relative overflow-hidden w-full md:w-32 h-px bg-black/20 group-hover:bg-white/40">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: isHovered ? "0%" : "-100%" }}
                            transition={{ duration: 0.4, ease: GLOBAL_EASE }}
                            className="absolute inset-0 bg-white"
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
