"use client";

import Container from "@/components/layout/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import FlagshipScene from "@/components/sections/FlagshipScene";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ProjectsSection() {
    const flagship = projects.find(p => p.tier === 1);
    const supporting = projects.filter(p => p.tier !== 1);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
    const xBackground = useTransform(springProgress, [0, 1], ["20%", "-20%"]);
    const textSpacing = useTransform(springProgress, [0, 1], ["-0.05em", "0.1em"]);

    const title = "MODULES".split("");

    return (
        <section id="projects" className="relative bg-[#fafafa] dark:bg-[#050505] overflow-visible">
            {/* PINNED FLAGSHIP SCENE */}
            {flagship && <FlagshipScene project={flagship} />}

            {/* Diagonal Transition Break */}
            <div className="absolute top-[450vh] left-0 w-full h-[30vh] bg-[#f5f5f5] dark:bg-[#0a0a0a] diagonal-break -scale-y-100 opacity-50 z-0 pointer-events-none" />

            {/* SUPPORTING MODULES ARCHIVE */}
            <div ref={sectionRef} className="py-60 relative z-10">
                <motion.div
                    style={{ x: xBackground }}
                    className="absolute top-32 left-0 pointer-events-none select-none z-0 whitespace-nowrap"
                >
                    <span className="text-display opacity-[0.03] tracking-tighter">ARCHIVE // TRACE // LOG //</span>
                </motion.div>

                <Container>
                    {/* Layered Typography Header */}
                    <div className="mb-40 px-8 flex flex-col items-center text-center relative z-20">
                        <span className="text-[10px] font-mono tracking-[1.5em] uppercase text-neutral-400 mb-8 block font-bold border-b border-neutral-300 dark:border-neutral-700 pb-2 inline-block">Archival Trace</span>
                        <div className="flex overflow-hidden">
                            {title.map((char, i) => (
                                <motion.h2
                                    key={i}
                                    style={{ letterSpacing: textSpacing }}
                                    className="text-mega md:text-[12rem] text-neutral-900 dark:text-neutral-50 uppercase leading-[0.75] font-black inline-block text-mask"
                                >
                                    {char}
                                </motion.h2>
                            ))}
                        </div>
                    </div>

                    {/* Asymmetrical Grid Destruction */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[15vh] gap-x-12 px-8">
                        {supporting.map((p, i) => (
                            <motion.div
                                key={p.slug}
                                initial={{ opacity: 0, y: 100, rotate: i % 2 === 0 ? -5 : 5 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 1.2, delay: i * 0.1, type: "spring" }}
                                className={`relative w-full ${i % 2 !== 0 ? "md:mt-40" : ""}`}
                            >
                                <ProjectCard project={p} />

                                {/* Absolute positioned background typography anchor */}
                                <div className="absolute -left-10 -bottom-10 -z-10 pointer-events-none select-none opacity-[0.05] dark:opacity-[0.02]">
                                    <span className="text-[15rem] font-black">0{i + 1}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </div>
        </section>
    );
}
