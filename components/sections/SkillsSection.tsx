"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const expertise = [
    { title: "SYSTEMS", tech: ["C++", "C", "Rust"], id: "ARCH-01", offset: "-10vw" },
    { title: "DYNAMICS", tech: ["GSAP", "Three.js", "SVG"], id: "ARCH-02", offset: "15vw" },
    { title: "STABILITY", tech: ["PostgreSQL", "Go", "AWS"], id: "ARCH-03", offset: "-5vw" },
    { title: "INTERFACE", tech: ["React", "TypeScript", "Next.js"], id: "ARCH-04", offset: "20vw" }
];

export default function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-white dark:bg-[#050505]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* OVERLAPPING TYPOGRAPHY STACK: Asymmetrical Background Fragment */}
                <motion.div
                    style={{
                        x: useTransform(springProgress, [0, 1], ["20%", "-20%"]),
                        opacity: 0.03
                    }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
                >
                    <span className="text-[clamp(4rem,20vw,25rem)] font-black uppercase tracking-[-0.05em]">KINETIC REVEAL // MODULE SYNC</span>
                </motion.div>

                <div className="relative z-10 w-full px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-y-[10vh] gap-x-20 max-w-7xl">

                    {/* ASYMMETRICAL OFFSET GRID */}
                    {expertise.map((item, i) => {
                        const start = 0.4 + (i * 0.1);
                        const end = start + 0.3;

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(springProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const x = useTransform(springProgress, [start, end], [i % 2 === 0 ? -100 : 100, i % 2 === 0 ? 50 : -50]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const rotate = useTransform(springProgress, [start, end], [i % 2 === 0 ? -5 : 5, i % 2 === 0 ? 5 : -5]);

                        return (
                            <motion.div
                                key={item.title}
                                style={{
                                    opacity,
                                    x: `calc(${item.offset} + ${x}px)`,
                                    rotate,
                                    transformStyle: "preserve-3d"
                                }}
                                className={`glass-card p-12 rounded-[2.5rem] flex flex-col justify-between h-[45vh] lg:h-[40vh] ${i % 2 !== 0 ? "mt-32" : ""}`}
                            >
                                <div className="space-y-4">
                                    <span className="text-[9px] font-mono tracking-[1em] text-neutral-400 uppercase font-bold">{item.id}</span>
                                    <h3
                                        className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.8] transition-all hover:tracking-widest duration-500"
                                    >
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    {item.tech.map(t => (
                                        <span key={t} className="px-5 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono uppercase text-neutral-400 font-bold">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <motion.div
                                    className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none"
                                    style={{ transform: "translateZ(-20px)" }}
                                >
                                    <span className="text-[12rem] font-black">{i + 1}</span>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ASYMMETRICAL ANCHOR: Vertical Typography */}
                <motion.div
                    style={{
                        opacity: useTransform(springProgress, [0, 0.4], [1, 0]),
                        y: useTransform(springProgress, [0, 0.4], [0, -100])
                    }}
                    className="absolute left-10 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-left"
                >
                    <h2 className="text-mega text-neutral-900 dark:text-neutral-50 tracking-[-0.1em]">STACK</h2>
                </motion.div>
            </div>
        </section>
    );
}
