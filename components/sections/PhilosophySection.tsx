"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const identityScenes = [
    { main: "SYSTEMS", sub: "From the inside out.", id: "01" },
    { main: "LOGIC-FIRST", sub: "Engineering.", id: "02" },
    { main: "BREAK.", sub: "Debug. Rebuild.", id: "03" },
    { main: "SIMPLE.", sub: "Efficient. Readable.", id: "04" },
];

export default function PhilosophySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-transparent overflow-visible" id="philosophy">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                {identityScenes.map((scene, i) => {
                    const sceneLength = 1 / identityScenes.length;
                    const start = i * sceneLength;
                    const end = start + sceneLength;

                    const opacity = useTransform(springProgress,
                        [start, start + 0.1, end - 0.1, end],
                        [0, 1, 1, 0]
                    );

                    const filter = useTransform(springProgress,
                        [start, start + 0.1, end - 0.1, end],
                        ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]
                    );

                    const x = useTransform(springProgress, [start, end], [i % 2 === 0 ? -50 : 50, i % 2 === 0 ? 50 : -50]);
                    const letterSpacing = useTransform(springProgress, [start, end], ["-0.05em", "0.2em"]);
                    const isEven = i % 2 === 0;

                    return (
                        <motion.div
                            key={scene.main}
                            style={{ opacity, filter, x }}
                            className={`absolute inset-0 flex flex-col justify-center px-8 md:px-40 ${isEven ? "items-start text-left" : "items-end text-right"}`}
                        >
                            <motion.span
                                style={{
                                    x: useTransform(springProgress, [start, end], [isEven ? -100 : 100, isEven ? 100 : -100]),
                                    opacity: 0.1
                                }}
                                className="text-[clamp(8rem,25vw,30rem)] font-title text-neutral-800 dark:text-neutral-200 absolute inset-0 flex items-center justify-center pointer-events-none uppercase tracking-[-0.05em]"
                            >
                                {scene.main}
                            </motion.span>

                            <div className="relative z-10 flex flex-col gap-6 max-w-5xl">
                                <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-micro font-bold">
                                    NODE // {scene.id}
                                </span>
                                <motion.h2
                                    style={{ letterSpacing }}
                                    className="font-title text-[clamp(4rem,10vw,12rem)] text-neutral-900 dark:text-neutral-50 leading-none uppercase"
                                >
                                    {scene.main}
                                </motion.h2>
                                <div className="flex flex-col gap-6">
                                    <div className={`w-32 h-2 bg-neutral-900 dark:bg-white ${isEven ? "origin-left" : "origin-right self-end"}`} />
                                    <motion.p
                                        className="text-3xl md:text-5xl lg:text-7xl font-light italic text-neutral-500 lowercase tracking-tighter"
                                    >
                                        {scene.sub}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                <motion.div
                    style={{ rotate: 90 }}
                    className="absolute left-[5%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-10 opacity-30"
                >
                    <span className="text-[10px] font-mono tracking-[1em] uppercase text-neutral-900 dark:text-white font-bold">ABOUT ME</span>
                    <div className="w-1.5 h-64 bg-neutral-200 dark:bg-neutral-800 overflow-hidden rounded-full">
                        <motion.div
                            style={{ scaleY: springProgress }}
                            className="w-full h-full bg-accent origin-top"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
