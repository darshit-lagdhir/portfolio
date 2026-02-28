"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Project } from "@/types/project";

export default function FlagshipScene({ project }: { project: Project }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

    // Timeline Transforms
    const titleOpacity = useTransform(springProgress, [0, 0.2, 0.35, 0.45], [0, 1, 1, 0]);
    const titleScale = useTransform(springProgress, [0, 0.2, 0.45], [0.8, 1, 1.2]);
    const titleY = useTransform(springProgress, [0.2, 0.45], [0, -200]);
    const titleRotate = useTransform(springProgress, [0.2, 0.45], [0, -5]);

    // Layer Reveal
    const nodeOpacity = useTransform(springProgress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0]);
    const nodeScale = useTransform(springProgress, [0.4, 0.6], [0.8, 1]);

    const layers = [
        { name: "CORE ARCH", delay: 0 },
        { name: "LOGIC NODE", delay: 0.1 },
        { name: "INTERFACE", delay: 0.2 }
    ];

    return (
        <div ref={containerRef} className="relative h-[450vh] w-full bg-neutral-100 dark:bg-[#080808]">
            {/* Diagonal Asymmetry Break at Section Start */}
            <div className="absolute top-0 left-0 w-full h-[20vh] bg-[#fafafa] dark:bg-[#050505] diagonal-break z-0" />

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
                {/* Layered Text Stack - Parallax Giant Drop */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0, 0.5, 1], [0.01, 0.05, 0.01]),
                        scale: useTransform(springProgress, [0, 1], [1, 2]),
                        y: useTransform(springProgress, [0, 1], [-200, 200]),
                        x: useTransform(springProgress, [0, 1], [-100, 100]),
                        rotate: useTransform(springProgress, [0, 1], [-10, 10])
                    }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                >
                    <span className="text-[clamp(6rem,25vw,30rem)] font-black uppercase leading-none text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                        {project.title.split(" ")[0]}
                    </span>
                </motion.div>

                {/* Step 1 & 2: Kinetic Stagger Title */}
                <motion.div
                    style={{ opacity: titleOpacity, scale: titleScale, y: titleY, rotate: titleRotate }}
                    className="absolute z-20 text-center px-8 flex flex-col items-center"
                >
                    <span className="text-[10px] font-mono tracking-[1.5em] uppercase text-neutral-400 mb-12 block font-bold border-b border-neutral-300 dark:border-neutral-700 pb-4">
                        Flagship Entity
                    </span>
                    <h2 className="text-mega md:text-[8rem] font-black tracking-tighter text-neutral-900 dark:text-neutral-50 uppercase leading-[0.8]">
                        {project.title.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="block"
                                style={{
                                    x: i % 2 === 0 ? useTransform(springProgress, [0, 0.2], [-100, 0]) : useTransform(springProgress, [0, 0.2], [100, 0]),
                                    opacity: useTransform(springProgress, [0, 0.15], [0, 1])
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                </motion.div>

                {/* Step 3: Layered Asymmetrical Destruction Spread */}
                <motion.div
                    style={{ opacity: nodeOpacity, scale: nodeScale }}
                    className="relative z-10 w-full max-w-7xl h-[60vh] flex items-center justify-center"
                >
                    {/* Disconnected Chaos Anchors */}
                    {layers.map((layer, i) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const itemOpacity = useTransform(springProgress, [0.5 + layer.delay, 0.6 + layer.delay], [0, 1]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const yMove = useTransform(springProgress, [0.5, 0.8], [i === 1 ? -100 : 100, 0]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const rotateItem = useTransform(springProgress, [0.5, 0.8], [i % 2 === 0 ? -15 : 15, i % 2 === 0 ? 5 : -5]);

                        return (
                            <motion.div
                                key={layer.name}
                                style={{
                                    opacity: itemOpacity,
                                    y: yMove,
                                    rotate: rotateItem,
                                    position: "absolute",
                                    left: i === 0 ? "5%" : i === 1 ? "40%" : "auto",
                                    right: i === 2 ? "10%" : "auto",
                                    top: i === 1 ? "10%" : "50%",
                                    zIndex: 30 - i
                                }}
                                className="p-8 md:p-12 glass-card rounded-[2rem] border border-neutral-200 dark:border-neutral-800 text-center w-[80vw] md:w-[25vw] shadow-2xl backdrop-blur-3xl"
                            >
                                <span className="text-[10px] font-mono text-neutral-400 block mb-4 tracking-[0.6em] font-bold">L-{i + 1}</span>
                                <h4 className="text-3xl font-black tracking-tighter uppercase">{layer.name}</h4>
                            </motion.div>
                        );
                    })}

                    {/* SVG Connector Tension */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                        <motion.path
                            d="M 10 50 Q 50 10 90 50"
                            stroke="currentColor"
                            strokeWidth="0.2"
                            fill="none"
                            className="text-neutral-900 dark:text-neutral-100 opacity-20"
                            style={{
                                pathLength: useTransform(springProgress, [0.5, 0.7], [0, 1]),
                                pathOffset: useTransform(springProgress, [0.7, 0.9], [0, 1])
                            }}
                        />
                    </svg>
                </motion.div>

                {/* Step 4: Descriptive Subline */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0.75, 0.85, 0.95], [0, 1, 0]),
                        scale: useTransform(springProgress, [0.75, 0.85], [0.9, 1]),
                    }}
                    className="absolute bottom-20 right-10 md:right-32 text-right"
                >
                    <p className="text-2xl md:text-5xl font-light italic text-neutral-500 lowercase tracking-tighter">
                        Architected <br /><span className="text-neutral-900 dark:text-neutral-50 font-black not-italic border-b-4 border-accent">Immunity.</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
