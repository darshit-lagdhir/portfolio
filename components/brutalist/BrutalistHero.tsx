"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// TEXT REVEAL + SCRAMBLE (PHASE 5)
const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;

        const startScramble = () => {
            interval = setInterval(() => {
                setDisplay(text.split("").map((_, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));

                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 40);
        };

        const timer = setTimeout(startScramble, delay * 1000);
        return () => { clearInterval(interval); clearTimeout(timer); };
    }, [text, delay]);

    return <span>{display || text}</span>;
}

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isIdle, setIsIdle] = useState(false);
    const idleTimer = useRef<NodeJS.Timeout>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // SCROLLYTELLING LAYER (PHASE 3)
    // As we exit, the hero compresses and title scales/fades
    const outRotationX = useTransform(scrollYProgress, [0, 1], [0, -3]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 1, 0.6, 0.2]);

    // KINETIC TYPOGRAPHY (PHASE 13)
    // Headline scales/shifts horizontally on scroll
    const headlineX = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    useEffect(() => {
        const resetIdle = () => {
            setIsIdle(false);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsIdle(true), 4000);
        };

        const handleMouseMove = (e: MouseEvent) => {
            resetIdle();
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        resetIdle();
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    const springConfig = { damping: 50, stiffness: 100 };
    const springX = useSpring(mousePos.x, springConfig);
    const springY = useSpring(mousePos.y, springConfig);

    const interactiveRotateY = useTransform(springX, (v) => v * 0.08);
    const interactiveRotateX = useTransform(springY, (v) => v * -0.08);

    return (
        <section ref={sectionRef} className="spatial-section overflow-hidden" id="hero">

            <motion.div
                style={{
                    rotateX: outRotationX,
                    opacity: heroOpacity,
                    transformStyle: "preserve-3d"
                }}
                className="w-full h-full relative z-10"
            >
                <div className="grid-layout relative z-10 md:pl-[6%] lg:pl-[10%] pt-20">

                    <motion.div
                        animate={{ opacity: isIdle ? 0.7 : 1, scale: isIdle ? 0.99 : 1 }}
                        transition={{ duration: 2 }}
                        style={{
                            rotateX: interactiveRotateX,
                            rotateY: interactiveRotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="col-span-12 items-center flex flex-col gap-10 text-center md:text-left md:items-start morph-surface"
                    >

                        {/* KINETIC TYPOGRAPHY + TEXT SCRAMBLE (PHASE 5 & 13) */}
                        <motion.div
                            style={{ x: headlineX, scale: headlineScale, transformStyle: "preserve-3d" }}
                            className="relative group cursor-none"
                        >
                            <h1 className="font-title text-step-5 text-white uppercase tracking-tight-title flex flex-col leading-[0.8] text-physical group-hover:tracking-tighter transition-all duration-700">
                                <span className="block italic pointer-events-none">
                                    <ScrambleText text="DARSHIT" delay={0.2} />
                                </span>
                                <span className="block pointer-events-none">
                                    <ScrambleText text="LAGDHIR" delay={0.4} />
                                </span>
                            </h1>

                            {/* MAGNETIC INTERACTION TRIGGER (PHASE 9) */}
                            <motion.div
                                style={{ x: useTransform(springX, (v) => v * 0.2), y: useTransform(springY, (v) => v * 0.2) }}
                                className="absolute -inset-10 z-[-1] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-white/[0.02] blur-3xl rounded-full"
                            />
                        </motion.div>

                        <div className="flex flex-col md:flex-row gap-16 md:gap-40 w-full mt-10 items-end md:items-baseline">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="max-w-[48ch]"
                            >
                                <p className="font-body text-step-1 text-muted font-light leading-relaxed">
                                    DESIGNING SPATIAL SYSTEMS FOR LOGISTICS, ADAPTIVE INTELLIGENCE, AND CONTRACT VERIFICATION.
                                </p>
                            </motion.div>

                            {/* MAGNETIC BUTTON GRP (PHASE 9) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3, duration: 1 }}
                                className="flex flex-col gap-5 text-right md:text-left ml-auto"
                            >
                                <motion.a
                                    whileHover={{ x: 10, scale: 1.05 }}
                                    href="#projects"
                                    className="link-underline font-wide text-step--1 text-white uppercase tracking-micro font-bold block interactive-trigger"
                                >
                                    [ VIEW SYSTEMS ]
                                </motion.a>
                                <motion.a
                                    whileHover={{ x: 10, scale: 1.05 }}
                                    href="#about"
                                    className="link-underline font-wide text-step--1 text-muted uppercase tracking-micro font-bold block opacity-40 hover:opacity-100 transition-all"
                                >
                                    [ PHILOSOPHY ]
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
