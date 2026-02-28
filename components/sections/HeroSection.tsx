"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { identity } from "@/data/identity";
import HeroVisuals from "@/components/ui/HeroVisuals";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Mouse Tracking for Asymmetrical 3D Tension
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    // Kinetic Typography Timeline
    const scrollVelocityY = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ["-0.05em", "0.2em"]);
    const blur = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 8, 20]);
    const skew = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

    const nameFirst = identity.name.split(" ")[0].split("");
    const nameLast = identity.name.split(" ")[1].split("");

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-[300vh] z-20"
        >
            {/* Pinned Scenography */}
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <HeroVisuals />

                {/* ASYMMETRICAL INFRASTRUCTURE: Left-Heavy Grid */}
                <div className="relative z-10 w-full px-8 md:px-20 grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] items-center gap-20">

                    <motion.div
                        style={{
                            y: useTransform(scrollYProgress, [0, 1], [0, -150]),
                            opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0]),
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="flex flex-col items-start text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="mb-16"
                        >
                            <span className="text-[10px] tracking-[1.8em] uppercase text-neutral-400 font-mono font-bold block mb-4">
                                KINETIC // NODE 01
                            </span>
                            <div className="w-40 h-[2px] bg-neutral-900 dark:bg-white origin-left" />
                        </motion.div>

                        {/* KINETIC TYPOGRAPHY: Letter-by-Letter Stagger */}
                        <div className="relative leading-[0.7] mb-12">
                            <h1 className="text-mega uppercase tracking-tighter flex flex-wrap relative z-10">
                                {nameFirst.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 100, rotate: 10, z: 100 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0, z: 100 }}
                                        transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ letterSpacing }}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </h1>
                            <h1 className="text-mega text-neutral-900 dark:text-neutral-50 flex flex-wrap mt-4 relative z-0" style={{ WebkitTextStroke: "2px currentColor", WebkitTextFillColor: "transparent" }}>
                                {nameLast.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 100, rotate: -10, z: 50, skewX: 0 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0, z: 50 }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ skewX: skew }}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="max-w-xl"
                        >
                            <p className="text-3xl md:text-5xl text-neutral-500 font-light italic lowercase leading-tight tracking-tighter mb-16">
                                Engineering <span className="text-neutral-900 dark:text-neutral-50 font-black not-italic border-b-8 border-accent">Resilience.</span>
                            </p>

                            <div className="flex gap-10 mt-16 scale-100 origin-left">
                                <MagneticButton
                                    href="#projects"
                                    className="px-16 py-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-black uppercase tracking-[0.5em] text-[10px]"
                                >
                                    Observe
                                </MagneticButton>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* OVERLAPPING TYPOGRAPHY STACK: Asymmetrical Background Layer */}
                    <motion.div
                        style={{
                            y: useTransform(scrollYProgress, [0, 1], [0, 400]),
                            opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0]),
                            filter: useTransform(blur, v => `blur(${v}px)`)
                        }}
                        className="hidden lg:block absolute right-[-10%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
                    >
                        <span className="text-[clamp(10rem,30vw,35rem)] font-title leading-none rotate-90 block text-neutral-800 dark:text-neutral-200">
                            ARCH
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Kinetic Progress Indicator */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 w-full h-1 bg-accent z-[101] origin-left"
            />
        </section>
    );
}
