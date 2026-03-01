"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS ARCHITECTURE",
        index: "SYSTEM 01"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "ADVISORY INTELLIGENCE PATTERN DETECTION",
        index: "SYSTEM 02"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE CONTRACT VERIFIER",
        index: "SYSTEM 03"
    }
];

function InteractiveProjectCard({ project, index, scrollYProgress }: { project: any, index: number, scrollYProgress: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // FULL 3D STACK TRANSFORMATION (PHASE 4 & 7: HORIZONTAL MODE)
    // Range is calibrated so cards "slide" horizontally in depth
    const startPoint = index * 0.2;
    const midPoint = startPoint + 0.15;
    const endPoint = midPoint + 0.15;

    // Horizontal Slide + Vertical Lift + Depth Shift
    const xFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [400, 0, -400]);
    const zFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [-200, 0, -200]);
    const rotateYFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [10, 0, -10]);
    const opacityFlip = useTransform(scrollYProgress, [startPoint, midPoint, endPoint], [0, 1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX, { damping: 50, stiffness: 100 });
    const mouseYSpring = useSpring(mouseY, { damping: 50, stiffness: 100 });

    // 3D TILT + GLARE (PHASE 11)
    const rotateXInteractive = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateYInteractive = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [-100, 100]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [-100, 100]);
    const background = useMotionTemplate`radial-gradient(circle at calc(50% + ${glareX}px) calc(50% + ${glareY}px), rgba(255,255,255,0.06) 0%, transparent 60%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
            style={{
                x: xFlip,
                z: zFlip,
                rotateX: isHovered ? rotateXInteractive : 0,
                rotateY: isHovered ? rotateYInteractive : rotateYFlip,
                opacity: opacityFlip,
                zIndex: projects.length - index,
                transformStyle: "preserve-3d"
            }}
            className="absolute inset-0 spatial-card border border-border bg-background p-16 md:p-40 flex items-center justify-center hover:border-white/10 transition-all duration-700 overflow-hidden cursor-none"
        >
            {/* GLARE SWEEP (PHASE 11) */}
            <div className="glare-effect" />

            {/* SPOTLIGHT HOVER (PHASE 10) */}
            <motion.div
                style={{
                    background,
                    translateZ: -30
                }}
                className="absolute inset-x-[-20%] inset-y-[-20%] opacity-0 group-hover:opacity-100 pointer-events-none"
            />

            <Link href={project.slug} className="grid grid-layout relative z-10 w-full group">
                <div className="col-span-12 md:col-span-8 flex flex-col gap-5">
                    {/* STAGGERED CHILD ANIMATION (PHASE 6) */}
                    <motion.span
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                        className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                    >
                        SYSTEM // {project.index}
                    </motion.span>
                    <h3 className="font-title text-step-4 text-white uppercase tracking-tight-title text-physical italic first-letter:not-italic group-hover:tracking-tighter transition-all duration-700">
                        {project.name}
                    </h3>
                </div>
                <div className="col-span-12 md:col-span-4 flex items-end justify-end md:text-right">
                    <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[28ch] group-hover:text-white transition-colors duration-500">
                        {project.descriptor}
                    </p>
                </div>
            </Link>

            {/* MAGNETIC TRIGGER (PHASE 9) */}
            <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                style={{ translateZ: -60 }}
                className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none"
            />
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const sectionRef = useRef<HTMLElement>(null);

    // STICKY REVEAL SECTIONS (PHASE 4 & 7: HORIZONTAL SCROLL)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={sectionRef} className="relative w-full h-[350vh] bg-black/5" id="projects">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ perspective: "2000px" }}>

                {/* HORIZONTAL PERSPECTIVE ARENA (PHASE 7) */}
                <motion.div
                    style={{
                        translateZ: 80,
                        transformStyle: "preserve-3d"
                    }}
                    className="w-full h-full relative flex items-center justify-center p-8 md:p-24"
                >
                    <div className="absolute top-[12%] left-[6%] md:left-[10%] z-20">
                        <motion.span
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold link-underline"
                        >
                            03 SYSTEMS ARCHIVE // HORIZONTAL DEPTH FLIP
                        </motion.span>
                    </div>

                    {/* FULL 3D STACK AREA (PHASE 4) */}
                    <div className="relative w-full max-w-[1300px] aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9]">
                        {projects.map((p, i) => (
                            <InteractiveProjectCard
                                key={i}
                                project={p}
                                index={i}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
