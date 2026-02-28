"use client";

import Link from "next/link";
import { Project } from "@/types/project";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const mouseX = useSpring(x, { stiffness: 60, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 60, damping: 20 });

    const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
    const brightness = useTransform(mouseY, [0, 1], [1.1, 0.9]);

    // Shadow Physics Upgrade + Brightness Merge
    const shadowX = useTransform(mouseX, [0, 1], [20, -20]);
    const shadowY = useTransform(mouseY, [0, 1], [20, -20]);
    const filterTransform = useTransform(
        [shadowX, shadowY, brightness],
        ([x, y, b]: number[]) => `brightness(${b}) drop-shadow(${x}px ${y}px 40px rgba(0,0,0,0.15))`
    );

    function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width);
        y.set((event.clientY - rect.top) / rect.height);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
            style={{
                rotateX,
                rotateY,
                filter: filterTransform as any,
                transformStyle: "preserve-3d"
            }}
            className="group relative w-full p-10 md:p-16 rounded-[4rem] overflow-hidden glass-card transition-all duration-500 hover:-translate-y-4"
        >
            {/* Visual Depth Background */}
            <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
                <span className="text-[15rem] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none uppercase tracking-[-0.05em] group-hover:tracking-widest transition-all duration-700">
                    {project.title.split(" ")[0]}
                </span>
            </div>

            <div style={{ transform: "translateZ(80px)" }} className="relative z-10 flex flex-col h-full justify-between min-h-[50vh]">
                <div className="flex justify-between items-start mb-16">
                    <span className="text-[9px] font-mono tracking-[1.5em] uppercase text-neutral-400 font-bold">
                        SYS // MODULE
                    </span>
                    <motion.div
                        initial={{ rotate: -45, opacity: 0 }}
                        whileHover={{ rotate: 0, scale: 1.2 }}
                        className="w-12 h-12 rounded-full border border-neutral-900 dark:border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-10 group-hover:translate-x-0"
                    >
                        <span className="text-xl font-bold">→</span>
                    </motion.div>
                </div>

                <div className="space-y-4 relative">
                    {/* Micro Hover Typography Explosions */}
                    <div className="overflow-hidden mb-6 group-hover:skew-x-2 transition-transform duration-500">
                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50 uppercase leading-[0.8] origin-left group-hover:scale-[1.02] transition-transform duration-500 relative inline-block">
                            {project.title}
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-700" />
                        </h3>
                    </div>

                    <p className="text-xl md:text-3xl text-neutral-500 font-light italic opacity-60 group-hover:opacity-100 transition-opacity duration-700 tracking-tighter lowercase">
                        {project.shortDescription}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mt-20">
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((t, i) => (
                            <motion.span
                                key={t}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full group-hover:border-neutral-400 group-hover:text-neutral-900 dark:group-hover:border-neutral-500 dark:group-hover:text-white transition-all"
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>

                    <div className="flex justify-start md:justify-end">
                        <Link
                            href={`/projects/${project.slug}`}
                            className="px-10 py-5 rounded-full border border-neutral-900 dark:border-white text-[9px] uppercase tracking-[0.6em] font-black hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all active:scale-95 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] origin-right"
                        >
                            Explore Matrix
                        </Link>
                    </div>
                </div>
            </div>

            {/* Kinetic Light Tracker Explosion */}
            <motion.div
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08) 0%, transparent 50%)`
                    )
                }}
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
        </motion.div>
    );
}
