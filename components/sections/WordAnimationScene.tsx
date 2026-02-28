"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function WordAnimationScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

    // Kinetic Word Splits: "RELIANCE" -> "REL" "IAN" "CE"
    const word = "RELIANCE";
    const letters = word.split("");

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-white dark:bg-[#050505] overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                <div className="relative flex items-center justify-center w-full h-full px-8 md:px-20">

                    {/* ASYMMETRICAL KINETIC MASKING */}
                    <div className="relative z-10 flex text-mega text-[clamp(4rem,20vw,20rem)] font-black tracking-[-0.1em] text-neutral-900 dark:text-neutral-50 leading-none select-none">
                        {letters.map((char, i) => {
                            const delay = i * 0.05;
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const x = useTransform(springProgress,
                                [0.2 + i * 0.05, 0.5 + i * 0.05, 0.8],
                                [0, i % 2 === 0 ? -200 - i * 50 : 200 + i * 50, 0]
                            );
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(springProgress,
                                [0.4 + i * 0.05, 0.5 + i * 0.05, 0.6 + i * 0.05],
                                [1, 0.2, 1]
                            );
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const rotate = useTransform(springProgress,
                                [0.4, 0.6],
                                [0, i % 2 === 0 ? -15 : 15]
                            );

                            return (
                                <motion.span
                                    key={i}
                                    style={{ x, opacity, rotate }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </div>

                    {/* OVERLAPPING KINETIC ANCHOR */}
                    <motion.div
                        style={{
                            opacity: useTransform(springProgress, [0.4, 0.5, 0.6], [0, 0.1, 0]),
                            scale: useTransform(springProgress, [0.4, 0.6], [0.8, 1.2])
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="text-[clamp(3rem,8vw,12rem)] font-mono tracking-[1.5em] text-accent uppercase opacity-50">
                            DECONSTRUCT
                        </span>
                    </motion.div>
                </div>

                {/* Kinetic Sub-instruction */}
                <motion.div
                    style={{ opacity: useTransform(springProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2"
                >
                    <span className="text-[10px] uppercase tracking-[1em] text-neutral-400 font-mono">
                        Deconstruction in Progress
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
