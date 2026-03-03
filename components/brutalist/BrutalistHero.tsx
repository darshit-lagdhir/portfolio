"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScene } from "@/context/SceneContext";

const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];

export default function BrutalistHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { setActiveSection } = useScene();

    // MOUSE PARALLAX — PHASE 4
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]); // MAX TILT: 2 DEGREES
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]); // COMPLEMENTARY TILT

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX / innerWidth - 0.5);
            mouseY.set(clientY / innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // DEPTH SCALES — PHASE 4
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const mainTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const stackTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);

    // LAYERED PARALLAX — PHASE 4
    const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    const backY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[110vh] flex flex-col justify-center overflow-hidden bg-background px-[5vw]"
            id="hero"
            onPointerEnter={() => setActiveSection("hero")}
        >
            {/* BREATHING BACKGROUND — PHASE 4 */}
            <motion.div
                animate={{ scale: [1, 1.005, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)"
                }}
            />

            <motion.div
                style={{ scale: heroScale, rotateX, rotateY, perspective: 1000 }}
                className="grid grid-cols-12 gap-10 items-end w-full max-w-[1800px] mx-auto pt-32"
            >
                {/* LEFT 60% — TYPOGRAPHIC STACKING — PHASE 4 */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-0 z-10">

                    {/* DARSHIT LAYER STACK */}
                    <div className="relative group overflow-visible preserve-3d">
                        {/* BACK LAYER - THIN FRAME SHADOW */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, z: -50 }}
                            className="absolute text-massive italic text-white/10 depth-layer select-none pointer-events-none perspective-tilt text-shadow-architectural flex"
                        >
                            <span>DAR</span><span>SH</span><span>IT</span>
                        </motion.span>
                        {/* MID LAYER - SHADOW */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, z: -25 }}
                            className="absolute -top-2 -left-1 text-massive italic text-white/30 depth-layer select-none pointer-events-none perspective-tilt flex"
                        >
                            <span>DAR</span><span>SH</span><span>IT</span>
                        </motion.span>
                        {/* FRONT LAYER - FOREGROUND WITH MICRO MOTION (STEP 9) */}
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity }}
                            transition={{ duration: 1.2, ease: GLOBAL_EASE }}
                            className="text-massive italic leading-[0.8] -ml-[0.05em] whitespace-nowrap relative z-10 perspective-tilt flex"
                        >
                            <motion.span style={{ y: useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]) }}>DAR</motion.span>
                            <motion.span style={{ y: useTransform(smoothMouseY, [-0.5, 0.5], [-5, 5]) }}>SH</motion.span>
                            <motion.span style={{ y: useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]) }}>IT</motion.span>
                        </motion.h1>
                    </div>

                    {/* LAGDHIR LAYER STACK */}
                    <div className="relative group overflow-visible mt-2 pl-[15vw] preserve-3d">
                        {/* BACK LAYER */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, scale: 0.98, z: -50 }}
                            className="absolute text-massive text-white/10 depth-layer select-none pointer-events-none perspective-tilt flex"
                        >
                            <span>LA</span><span>GD</span><span>HIR</span>
                        </motion.span>
                        {/* MID LAYER */}
                        <motion.span
                            style={{ y: backY, opacity: stackTextOpacity, scale: 0.98, z: -25 }}
                            className="absolute -top-2 -left-1 text-massive text-white/30 depth-layer select-none pointer-events-none perspective-tilt flex"
                        >
                            <span>LA</span><span>GD</span><span>HIR</span>
                        </motion.span>
                        {/* FRONT LAYER */}
                        <motion.h1
                            initial={{ y: "110%", translateZ: 50 }}
                            animate={{ y: 0, translateZ: 50 }}
                            style={{ y: frontY, opacity: mainTextOpacity }}
                            transition={{ duration: 1.2, delay: 0.1, ease: GLOBAL_EASE }}
                            className="text-massive text-white leading-[0.8] whitespace-nowrap relative z-10 perspective-tilt flex"
                        >
                            <motion.span style={{ y: useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]) }}>LA</motion.span>
                            <motion.span style={{ y: useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]) }}>GD</motion.span>
                            <motion.span style={{ y: useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]) }}>HIR</motion.span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 1, ease: GLOBAL_EASE }}
                        className="divider-h mt-20 opacity-30"
                    />
                </div>

                {/* RIGHT 40% — ARCHITECTURAL TENSION */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: GLOBAL_EASE }}
                    className="hidden lg:flex col-span-4 flex-col gap-12 pb-10"
                >
                    <div className="flex flex-col gap-4">
                        <span className="text-micro font-bold tracking-[0.6em] text-white">01_CORE</span>
                        <p className="text-short-body text-white/40 italic">
                            SCULPTING DIGITAL SYSTEMS <br />
                            THROUGH LOGIC-FIRST <br />
                            ARCHITECTURE.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-micro font-bold tracking-[0.6em] text-white">02_SESSION</span>
                        <p className="font-ui text-[10px] text-white/20 tracking-[0.2em] leading-loose">
                            LOC_INDIA // 2024.VER <br />
                            SYS_ACTIVE: TRUE <br />
                            MEM_SYNC: STABLE
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* ASYMMETRIC OVERFLOW DECOR (TIER 3) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute -right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none"
            >
                <span className="text-[30vw] leading-none rotate-90 inline-block font-heading">
                    SYSTEM
                </span>
            </motion.div>

        </section>
    );
}
