"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// TEXT REVEAL + SCRAMBLE (PHASE 5)
const ScrambleText = ({ text, delay = 0, trigger = false }: { text: string, delay?: number, trigger?: boolean }) => {
    const [display, setDisplay] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

    useEffect(() => {
        if (!trigger) return;
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
    }, [text, delay, trigger]);

    return <span>{display || text}</span>;
}

function MagneticSocialLink({ link, index, springX, springY }: { link: any, index: number, springX: any, springY: any }) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // SPOTLIGHT HOVER (PHASE 10)
    const spotlightX = useTransform(springX, [-0.5, 0.5], [-50, 50]);
    const spotlightY = useTransform(springY, [-0.5, 0.5], [-50, 50]);
    const spotlightBg = useMotionTemplate`radial-gradient(circle at calc(50% + ${spotlightX}px) calc(50% + ${spotlightY}px), rgba(255,255,255,0.15) 0%, transparent 60%)`;

    return (
        <motion.a
            ref={linkRef}
            href={link.url}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
            whileHover={{ scale: 1.1, translateZ: 40 }}
            target="_blank"
            className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-white transition-all duration-700 font-bold block link-underline relative px-6 py-3 glass-panel overflow-hidden"
        >
            <motion.div
                style={{ background: spotlightBg }}
                className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
            />
            <span className="relative z-10">{link.name}</span>

            {/* MAGNETIC PULL (PHASE 9) */}
            <motion.div
                animate={isHovered ? { x: springX.get() * 10, y: springY.get() * 10 } : { x: 0, y: 0 }}
                className="absolute -inset-2 z-0 pointer-events-none opacity-0 group-hover:opacity-10 scale-[2] blur-2xl bg-white rounded-full"
            />
        </motion.a>
    );
}

export default function BrutalistContact() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isIdle, setIsIdle] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const idleTimer = useRef<NodeJS.Timeout>(null);

    const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    // CONNECT SCREEN FINAL TRANSFORMATION (PHASE 10)
    // Entire scene compresses vertically and rises in Z-space
    const compressionScaleY = useTransform(sectionScroll, [0, 0.4, 0.6, 1], [0.98, 1, 1, 0.98]);
    const finalShiftZ = useTransform(sectionScroll, [0, 0.5, 1], [-20, 0, -20]);

    // SECTION DEPTH CONTAINERS (PHASE 1: FORWARD BUT DARKER)
    const baseZ = 40;

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const resetIdle = () => {
            setIsIdle(false);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsIdle(true), 3000);
        };

        const handleMouseMove = (e: MouseEvent) => {
            resetIdle();
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        resetIdle();
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    const springX = useSpring(mousePos.x, { damping: 65, stiffness: 80 });
    const springY = useSpring(mousePos.y, { damping: 65, stiffness: 80 });

    const idleDim = isIdle ? 0.45 : 1;

    return (
        <section ref={sectionRef} className="spatial-section overflow-hidden relative min-h-[110vh] bg-black/70" id="contact" style={{ perspective: "1500px" }}>

            {/* AMBIENT STILLNESS */}
            <motion.div
                style={{ opacity: useTransform(sectionScroll, [0.4, 0.6], [0, 0.1]) }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-white rounded-full blur-[450px] z-0 pointer-events-none"
            />

            <motion.div
                animate={{ opacity: idleDim }}
                style={{
                    scaleY: compressionScaleY,
                    translateZ: useTransform(sectionScroll, (v) => baseZ + (v * 10) + finalShiftZ.get()),
                    transformStyle: "preserve-3d"
                }}
                className="grid-layout items-end relative z-10 morph-surface md:pl-[6%] lg:pl-[10%]"
            >
                <div className="col-span-12 flex flex-col gap-32 w-full mb-12">
                    <div className="flex flex-col gap-8">
                        <motion.span
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-10%" }}
                            transition={{ duration: 1.2 }}
                            className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                        >
                            05 TERMINAL ENDPOINT // FINAL CHAMBER
                        </motion.span>

                        {/* CONNECT TITLE RISE (PHASE 10) */}
                        <motion.div
                            onViewportEnter={() => setHasEntered(true)}
                            style={{
                                x: useTransform(springX, (v) => v * 30),
                                y: useTransform(springY, (v) => v * 30),
                                translateZ: useTransform(sectionScroll, [0.4, 0.6], [10, 80])
                            }}
                        >
                            <h2
                                className="font-title text-step-5 text-white uppercase tracking-tight-title leading-[0.8] mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] text-physical italic first-letter:not-italic"
                            >
                                <ScrambleText text="CONNECT." trigger={hasEntered} delay={0.2} />
                            </h2>
                        </motion.div>
                    </div>

                    {/* Structural Footer */}
                    <div className="border-t border-border pt-16 pb-12 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-baseline w-full">
                            <div className="md:col-span-12 lg:col-span-6">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                                >
                                    DARSHIT LAGDHIR // ARCHITECTURAL INDEX 2026 // PHASE 07
                                </motion.span>
                            </div>

                            <div className="md:col-span-12 lg:col-span-12 xl:col-span-5 xl:col-start-8 flex justify-end gap-12 md:gap-24">
                                {[{ name: "GITHUB", url: "https://github.com/darshit-lagdhir" }, { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }].map((l, i) => (
                                    <MagneticSocialLink key={i} link={l} index={i} springX={springX} springY={springY} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
