"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useScene } from "@/context/SceneContext";

// PHASE 1: CENTRAL MOTION CONTROLLER
const GLOBAL_EASE = [0.33, 1, 0.68, 1] as [number, number, number, number];
const GLOBAL_SPRING = { damping: 40, stiffness: 200 };

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "SECURE BACKEND LOGISTICS ARCHITECTURE",
        index: "SYSTEM 01",
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "ADVISORY INTELLIGENCE PATTERN DETECTION",
        index: "SYSTEM 02",
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "CROSS-LANGUAGE CONTRACT VERIFIER",
        index: "SYSTEM 03",
    }
];

function InteractiveProjectPanel({ project, index, activeProject, setActiveProject }: { project: any, index: number, activeProject: string | null, setActiveProject: (s: string | null) => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { mode, setIsFocusing } = useScene();
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(mouseX, GLOBAL_SPRING);
    const mouseYSpring = useSpring(mouseY, GLOBAL_SPRING);

    const amp = mode === 'depth' ? 1.5 : 0.8;
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${2.5 * amp}deg`, `-${2.5 * amp}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${2.5 * amp}deg`, `${2.5 * amp}deg`]);

    // PHASE 3: LIGHTING RIM HIGHLIGHT + GLARE (PH-13 REFINED)
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [-120, 120]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [-120, 120]);
    const backgroundGlare = useMotionTemplate`radial-gradient(400px circle at calc(50% + ${glareX}px) calc(50% + ${glareY}px), rgba(255,255,255,0.025), transparent 70%)`;

    // PHASE 4: DEPTH REACTIVE SHADOWS (MICRO OFFSET)
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [4, -4]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || activeProject) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    // PHASE 118.3: PROJECT PANEL TAKEOVER LOGIC
    const isTakingOver = activeProject === project.slug;
    const isOtherTakingOver = activeProject !== null && !isTakingOver;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (activeProject) return;
        setActiveProject(project.slug);

        // Phase 118.5: Controlled motion pause before transition
        setTimeout(() => {
            router.push(project.slug);
            setTimeout(() => setActiveProject(null), 1000);
        }, 600);
    };

    return (
        <motion.div className="flex-1 relative group isometric-slab h-full">
            {/* PHASE 3: ENVIRONMENTAL LIGHT REACTION (AMBIENT GLOW) */}
            <motion.div
                style={{ background: backgroundGlare, opacity: isHovered ? 0.3 : 0 }}
                className="absolute inset-[-60px] z-[-2] pointer-events-none rounded-3xl blur-3xl transition-opacity duration-1000"
            />

            {/* PHASE 4: DEPTH REACTIVE SHADOWS */}
            <motion.div
                style={{ x: shadowX, y: shadowY }}
                className="absolute inset-0 bg-black z-[-1] pointer-events-none rounded-sm blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 delay-75"
            />

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => { !activeProject && setIsHovered(true); setIsFocusing(true); }}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); setIsFocusing(false); }}
                // PHASE 120.4: CARD ENTRY ANIMATION SYNC (FADE + Y, NO SCALE)
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                animate={
                    isTakingOver ? {
                        scale: 1.1,
                        z: 100,
                        backgroundColor: "rgba(5,5,5,1)",
                        boxShadow: "0 50px 100px -20px rgba(255,255,255,0.05)",
                        transition: { duration: 0.6, ease: GLOBAL_EASE }
                    } :
                        isOtherTakingOver ? {
                            scale: 0.9,
                            z: -50,
                            opacity: 0.2,
                            filter: "blur(10px)",
                            transition: { duration: 0.6, ease: GLOBAL_EASE }
                        } : {}
                }
                transition={{ duration: 0.8, delay: index * 0.15, ease: GLOBAL_EASE }}
                style={{
                    rotateX: isTakingOver ? 0 : rotateX,
                    rotateY: isTakingOver ? 0 : rotateY,
                    transformStyle: "preserve-3d"
                }}
                className={`h-full flex flex-col justify-between heavy-panel signature-bracket p-10 md:p-14 md:min-h-[60vh] lg:min-h-[70vh] cursor-none overflow-hidden ${isTakingOver ? 'z-50' : 'z-10'}`}
                data-project="true"
            >
                <div className="flex justify-between items-start opacity-20">
                    <span className="text-micro font-bold">{project.index}</span>
                    <div className="w-10 h-[1px] bg-white group-hover:w-16 transition-all duration-700" />
                </div>

                {/* PHASE 3: DYNAMIC CORNER BRACKETS (ENHANCED) */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 z-20 transition-all duration-700 group-hover:w-10 group-hover:h-10 group-hover:border-white/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 z-20 transition-all duration-700 group-hover:w-10 group-hover:h-10 group-hover:border-white/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 z-20 transition-all duration-700 group-hover:w-10 group-hover:h-10 group-hover:border-white/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 z-20 transition-all duration-700 group-hover:w-10 group-hover:h-10 group-hover:border-white/60" />

                {/* PHASE 4: REACTIVE EDGE HIGHLIGHT */}
                <motion.div
                    style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
                    className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-10 transition-opacity bg-radial-glow blur-3xl w-64 h-64"
                />

                {/* PHASE 8 & 12: REFINED LIGHT BLOOM & EMPHASIS */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay pointer-events-none" />
                <motion.div
                    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent z-0 pointer-events-none"
                />

                <Link href={project.slug} onClick={handleClick} className="relative z-10 flex flex-col gap-6 mt-auto outline-none border-none group-hover/link:opacity-100 group">
                    <motion.div
                        style={{ x: useTransform(mouseX, [-250, 250], [-3, 3]), y: useTransform(mouseY, [-250, 250], [-3, 3]) }}
                        className="flex flex-col gap-6"
                    >
                        {/* PHASE 1, 4 & 5: TYPOGRAPHY DEPTH STACK (Z-SHIFT) */}
                        <h3 className="text-large text-white uppercase tracking-widest italic first-letter:not-italic group-hover:tracking-tighter transition-all duration-700 opacity-90 group-hover:opacity-100 relative">
                            {project.name}
                            {/* PHASE 10: SIGNATURE UNDERLINE EVOLUTION */}
                            <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-[120%] group-hover:-left-[10%] opacity-0 group-hover:opacity-100" />
                        </h3>

                        <motion.p
                            style={{ x: useTransform(mouseX, [-250, 250], [1, -1]) }}
                            className="text-micro text-muted font-bold tracking-[0.3em] opacity-30 group-hover:opacity-100 group-hover:text-white transition-opacity duration-500 delay-75"
                        >
                            {project.descriptor}
                        </motion.p>
                    </motion.div>

                    {/* MINIMAL CTA ACTION (PHASE 2) */}
                    <span className="mt-10 inline-block text-[10px] text-white tracking-widest font-bold opacity-0 group-hover:opacity-40 transition-opacity duration-500 delay-150">
                        OPEN_INTEGRATION_PROTOCOLS &rarr;
                    </span>
                </Link>

                {/* PHASE 13: SURFACE TEXTURE */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
            </motion.div>
        </motion.div>
    );
}

export default function BrutalistProjectsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const { mode, setActiveSection } = useScene();
    const [activeProject, setActiveProject] = useState<string | null>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    return (
        <section
            onPointerEnter={() => setActiveSection("projects")}
            ref={sectionRef}
            className="spatial-section min-h-screen flex items-center justify-center section-tone-shift tone-03"
            id="projects"
        >
            <div className="grid-poster py-24 flex flex-col gap-y-16">

                {/* PHASE 1, 6 & 9: SECTION HEADING LAYER & STRUCTURAL TENSION */}
                <div className="col-span-12 lg:col-span-8 flex flex-col items-start gap-12 group">
                    <div className="flex flex-col gap-6 items-start">
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-micro font-bold text-muted border-l border-white/20 pl-6 h-4 flex items-center"
                        >
                            SECTION_ID_03
                        </motion.span>
                        <h2 className="text-large text-white flex flex-col italic first-letter:not-italic select-none pointer-events-none border-b border-white/5 pb-10 w-full overflow-hidden relative">
                            <motion.span
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: GLOBAL_EASE, delay: 0.3 }}
                            >
                                PROJECTS_ARCHIVE // <span className="text-white brightness-125 font-black tracking-tighter animation-pulse-subtle">SYSTEMS</span>
                            </motion.span>

                            {/* PHASE 4: TYPOGRAPHY DEPTH */}
                            <div className="absolute inset-x-0 bottom-10 z-[-1] opacity-10 blur-[2px] translate-x-[2px] translate-y-[2px] pointer-events-none text-black transition-all group-hover:opacity-20">
                                PROJECTS_ARCHIVE // SYSTEMS
                            </div>
                        </h2>
                    </div>
                </div>

                {/* PHASE 5: PROJECT PREVIEW REBUILD - THREE LARGE PANELS SIDE-BY-SIDE */}
                <div className="col-span-12 flex flex-col md:flex-row gap-8 lg:gap-12 mt-10">
                    {projects.map((p, i) => (
                        <div key={i} className={i === 0 ? "md:ml-[-2vw]" : ""}>
                            <InteractiveProjectPanel
                                project={p}
                                index={i}
                                activeProject={activeProject}
                                setActiveProject={setActiveProject}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* PHASE 117.7 & 117.10: ARCHITECTURAL LINE ANIMATIONS & NEGATIVE SPACE */}
            <div className="absolute bottom-[10%] left-[8%] opacity-5 pointer-events-none hidden lg:block">
                <div className="w-12 h-12 border-b border-l border-white" />
            </div>

            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "30vw" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: GLOBAL_EASE, delay: 0.5 }}
                className="arch-line arch-line-h hidden lg:block right-0 top-[12vh]"
            />
        </section>
    );
}
