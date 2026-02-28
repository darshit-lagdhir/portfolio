"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { projects } from "@/data/projects";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const featured = projects.filter((p) => p.githubUrl && p.tier === 1);

export default function FootprintSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    // Parallax Depth Stacks
    const bgX1 = useTransform(springProgress, [0, 1], ["5%", "-15%"]);
    const bgX2 = useTransform(springProgress, [0, 1], ["-10%", "20%"]);
    const bgY1 = useTransform(springProgress, [0, 1], ["-10%", "10%"]);

    // Type Compression
    const disciplineTracking = useTransform(springProgress, [0.3, 0.6], ["-0.08em", "0.05em"]);

    return (
        <section ref={sectionRef} className="relative h-[250vh] bg-white dark:bg-[#080808] overflow-hidden z-20">
            {/* Split Screen Diagonal Cut */}
            <div className="absolute top-0 right-0 w-[50vw] h-full bg-[#fcfcfc] dark:bg-[#050505] diagonal-break origin-top-right transform -scale-x-100 opacity-50 z-0 pointer-events-none" />

            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

                {/* FOREGROUND & BACKGROUND DEPTH STACKS */}
                <motion.div style={{ x: bgX1, y: bgY1 }} className="absolute top-[30%] left-0 pointer-events-none select-none z-0 whitespace-nowrap">
                    <span className="text-display opacity-[0.03] font-black tracking-tighter uppercase">GITHUB // FOOTPRINT</span>
                </motion.div>
                <motion.div style={{ x: bgX2 }} className="absolute top-[60%] left-0 pointer-events-none select-none z-0 whitespace-nowrap">
                    <span className="text-display opacity-[0.03] font-black text-neutral-900 dark:text-white uppercase" style={{ WebkitTextStroke: "2px currentColor", WebkitTextFillColor: "transparent" }}>
                        OPEN SOURCE // ARCHIVE
                    </span>
                </motion.div>

                <div className="px-8 md:px-20 grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-[10vw] items-center w-full relative z-10 h-full">

                    {/* Left Heavy Asymmetry */}
                    <motion.div
                        style={{
                            opacity: useTransform(springProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]),
                            y: useTransform(springProgress, [0, 0.4], [100, 0]),
                        }}
                        className="flex flex-col items-start"
                    >
                        <span className="text-[10px] tracking-[1.5em] text-accent font-mono mb-12 block font-black uppercase">Trace 04 // Footprint</span>

                        <div className="relative mb-20 overflow-hidden flex flex-col group">
                            <motion.h2
                                className="text-mega text-neutral-900 dark:text-neutral-50 uppercase leading-[0.75] font-black tracking-tighter text-mask origin-left"
                            >
                                CODE IS
                            </motion.h2>
                            <motion.h2
                                style={{ letterSpacing: disciplineTracking }}
                                className="text-mega text-neutral-900 dark:text-neutral-50 uppercase leading-[0.75] font-black group-hover:italic transition-all duration-700 text-mask"
                            >
                                DISCIPLINE.
                            </motion.h2>
                        </div>

                        <a
                            href="https://github.com/darshit-lagdhir"
                            target="_blank"
                            className="group inline-block text-[11px] font-mono uppercase tracking-[0.5em] pb-4 relative overflow-hidden font-bold"
                        >
                            <span className="relative z-10 group-hover:tracking-widest transition-all duration-500">Review Matrix</span>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-200 dark:bg-neutral-800" />
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-700" />
                        </a>
                    </motion.div>

                    {/* Nodes Offset Reveal */}
                    <div className="flex flex-col justify-center h-full space-y-[8vh]">
                        {featured.map((repo, i) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const nodeOpacity = useTransform(springProgress, [0.3 + (i * 0.1), 0.5 + (i * 0.1), 0.8 + (i * 0.1), 1], [0, 1, 1, 0]);
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const nodeX = useTransform(springProgress, [0.3 + (i * 0.1), 0.5 + (i * 0.1)], [100, i % 2 === 0 ? 0 : -50]);

                            return (
                                <motion.a
                                    key={repo.slug}
                                    style={{ opacity: nodeOpacity, x: nodeX }}
                                    href={repo.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block relative pl-12 border-l-2 border-transparent hover:border-accent transition-colors duration-500 ml-auto w-full max-w-lg"
                                >
                                    {/* Offset Decorative Marker */}
                                    <span className="text-[9px] font-mono text-neutral-400 absolute -left-8 top-0 -rotate-90 origin-top-left uppercase tracking-widest translate-y-8 font-bold group-hover:text-accent transition-colors">
                                        NODE // 0{i + 1}
                                    </span>

                                    {/* Kinetic Header */}
                                    <div className="overflow-hidden mb-4">
                                        <h3 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-neutral-50 group-hover:skew-x-[5deg] group-hover:scale-[1.05] origin-left transition-transform duration-500 tracking-tighter uppercase whitespace-nowrap inline-block relative">
                                            {repo.title}
                                            <div className="absolute bottom-1 left-0 w-0 h-1 bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-500" />
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {repo.techStack.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
