"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;
        const startScramble = () => {
            interval = setInterval(() => {
                setDisplay(text.split("").map((char, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join(""));
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        };
        const timer = setTimeout(startScramble, delay * 1000);
        return () => { clearInterval(interval); clearTimeout(timer); };
    }, [text, delay]);

    return <span>{display}</span>;
}

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection, setIsFocusing } = useScene();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

    // PHASE 118.2, 122.7 & 123.12: HERO EXIT & DEPTH PARALLAX
    const cameraZ = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1]); // PHASE 12: MICRO SCALE PARALLAX
    const heroFilter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
    const contentTilt = useTransform(scrollYProgress, [0, 1], [0, -3]);

    // PHASE 123.2: MICRO LETTER SHIFT
    const letterSpacingShift = useTransform(scrollYProgress, [0, 0.2, 0.5], ["0.04em", "0.05em", "0.04em"]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 10,
                y: (e.clientY / window.innerHeight - 0.5) * 10
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const springConfig = { damping: 40, stiffness: 200 };
    const springX = useSpring(mousePos.x, springConfig);
    const springY = useSpring(mousePos.y, springConfig);

    const rotateY = useTransform(springX, (v) => v * (mode === "depth" ? 0.08 : 0.04));
    const rotateX = useTransform(springY, (v) => v * (mode === "depth" ? -0.08 : -0.04));

    return (
        <section
            onPointerEnter={() => setActiveSection("hero")}
            ref={sectionRef}
            className="spatial-section relative flex items-center justify-center section-tone-shift tone-01"
            id="hero"
        >
            <div className="absolute inset-0 z-0 bg-radial-glow opacity-10" />

            {/* PHASE 4: ASYMMETRICAL POSTER COMPOSITION */}
            <motion.div
                className="w-full relative z-10"
            >
                <div className="grid-poster">
                    {/* PHASE 3: LEFT-DOMINANT LAYOUT */}
                    <div className="col-span-12 md:col-span-10 lg:col-span-8 flex flex-col items-start text-left">

                        {/* PHASE 118.6: MICRO SCALE DRAMA */}
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.8, ease: GLOBAL_EASE, delay: 0.1 }}
                            onMouseEnter={() => setIsFocusing(true)}
                            onMouseLeave={() => setIsFocusing(false)}
                            style={{ scale: heroScale, letterSpacing: letterSpacingShift }}
                            className="relative group h-auto"
                        >
                            {/* PHASE 6: SECTION ENTRY LIGHT SWEEP (INTERNAL) */}
                            <motion.div
                                initial={{ x: "-150%" }}
                                animate={{ x: "150%" }}
                                transition={{ duration: 0.8, ease: GLOBAL_EASE, delay: 0.1 }}
                                className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg]"
                            />
                            {/* PHASE 7: SUBTLE TYPOGRAPHY MASK REVEAL */}
                            <h1 className="text-massive text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none mb-14 overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: GLOBAL_EASE, delay: 0.2 }}
                                    className="block drop-shadow-xl z-20 mb-[0.2em] whitespace-nowrap"
                                >
                                    <ScrambleText text="DARSHI" delay={0.1} />
                                    <span className="text-outline border-text stroke-white transition-colors duration-[2000ms] ml-[0.1em] inline-block">T</span>
                                </motion.span>
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: GLOBAL_EASE, delay: 0.35 }}
                                    className="block drop-shadow-xl z-10 pl-[1.5em] whitespace-nowrap"
                                >
                                    <ScrambleText text="LAGDHIR" delay={0.25} />
                                </motion.span>

                                {/* PHASE 4: TYPOGRAPHY DEPTH ILLUSION (EMBOSSED SHADOW) */}
                                <div className="absolute inset-0 z-[-1] opacity-20 blur-[1px] translate-x-[2px] translate-y-[2px] pointer-events-none text-black select-none italic">
                                    <span className="block mb-[0.2em] whitespace-nowrap">DARSHIT</span>
                                    <span className="block pl-[1.5em] whitespace-nowrap">LAGDHIR</span>
                                </div>
                            </h1>

                            {/* PHASE 7 & 117.2: LOW POLY HERO ARCHITECTURAL FORM */}
                            <motion.div
                                style={{ rotateX, rotateY: rotateY, z: -100 }}
                                className="absolute -right-20 md:-right-40 top-10 w-64 h-64 hidden lg:block z-[-10] pointer-events-none"
                            >
                                <motion.div
                                    animate={{
                                        rotateZ: [0, 360],
                                        scale: [1, 1.02, 1], // PHASE 2: SUBTLE GEOMETRIC PULSE
                                        filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
                                    }}
                                    transition={{
                                        rotateZ: { duration: 180, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                                        filter: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="w-full h-full relative"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Primary Low-Poly Slab */}
                                    <div className="absolute inset-0 bg-white/[0.02] border border-white/10 backdrop-blur-md isometric-slab group-hover:bg-white/[0.04] transition-all duration-700" />

                                    {/* PHASE 7: SIGNATURE SHAPE TRANSFORM (CORNER NOTCH EXTENDS) */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 group-hover:w-6 group-hover:h-6 transition-all duration-500" />

                                    {/* Inner Structural Wireframe */}
                                    <div className="absolute inset-4 border border-white/20 transition-all duration-700 group-hover:inset-3" style={{ transform: "translateZ(30px)" }} />
                                    {/* Core Anchor Node */}
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white/50 shadow-[0_0_20px_2px_rgba(255,255,255,0.8)]" style={{ transform: "translateZ(60px)" }} />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* PHASE 1 & 6: SECTION HEADING LAYER & CREATIVE WORD EMPHASIS */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 1, ease: GLOBAL_EASE }}
                            className="max-w-[40ch] mt-4"
                        >
                            <h2 className="text-medium text-white/40 font-bold mb-4 text-highlight-sweep tracking-[0.3em] uppercase">
                                SYSTEM_<span className="text-white brightness-125 transition-all duration-700 animate-pulse-subtle">ARCHITECT</span>
                            </h2>
                            <p className="text-small text-muted font-light tracking-wide max-w-[50ch] opacity-60">
                                Engineering high-precision digital environments through <span className="italic text-white/80">logic-first</span> architecture and structural visual power.
                            </p>
                        </motion.div>

                        {/* PHASE 4: MINIMAL CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.78, duration: 1, ease: GLOBAL_EASE }}
                            className="mt-12"
                        >
                            <a href="#projects" className="text-micro font-bold text-white group flex items-center gap-6 elastic-micro btn-signature signature-bracket p-4 border border-white/5 bg-white/[0.02] light-beam-pass">
                                <div className="w-12 h-px bg-white/20 group-hover:w-20 transition-all duration-500" />
                                [ INITIALIZE_SESSION ]
                            </a>
                        </motion.div>

                    </div>

                    {/* PHASE 3: RIGHT VISUAL ANCHOR (SUBTLE AMBIENCE) */}
                    <div className="hidden lg:flex col-span-4 col-start-9 items-end justify-end pb-20 overflow-hidden">
                        <div className="flex flex-col gap-8 opacity-20">
                            <div className="flex flex-col gap-2">
                                <span className="text-micro">LAT: GLOBAL_ALPHA</span>
                                <div className="w-40 h-[1px] bg-white" />
                            </div>
                            <div className="flex flex-col gap-2 text-right">
                                <span className="text-micro">STATUS: ENFORCING_GRID</span>
                                <div className="w-24 h-[1px] bg-white self-end" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* PHASE 117.7: ARCHITECTURAL LINE ANIMATIONS */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "40vh" }}
                transition={{ duration: 2, ease: GLOBAL_EASE, delay: 1 }}
                className="arch-line arch-line-v hidden lg:block left-[10vw] top-0"
            />

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "20vw" }}
                transition={{ duration: 1.5, ease: GLOBAL_EASE, delay: 1.5 }}
                className="arch-line arch-line-h hidden lg:block right-[5vw] bottom-[20vh]"
            />
        </section>
    );
}
