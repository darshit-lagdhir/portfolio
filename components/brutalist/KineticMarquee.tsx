"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const MARQUEE_WORDS = [
    "SELECTED WORK",
    "SYSTEM DESIGN",
    "SOFTWARE ENGINEERING",
    "BACKEND ARCHITECTURE",
    "BUILDING SYSTEMS",
    "LOGIC-FIRST",
    "STRUCTURAL CODE",
    "DIGITAL PRECISION",
];

export default function KineticMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);
    const smoothHover = useSpring(isHovered, { damping: 30, stiffness: 200 });

    // STEP 4: Speed reacts to hover — duration mapped from 30s to 18s
    const animDuration = useTransform(smoothHover, [0, 1], [30, 18]);

    const handleEnter = () => isHovered.set(1);
    const handleLeave = () => isHovered.set(0);

    // Double the content for seamless loop
    const content = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="relative w-full overflow-hidden py-6 border-y border-white/10 cursor-none"
        >
            {/* STEP 3: INFINITE MARQUEE BAND */}
            <div className="marquee-track">
                {content.map((word, i) => (
                    <span
                        key={i}
                        className="text-[3vw] md:text-[2vw] font-heading font-light italic text-white/15 tracking-[0.3em] px-[4vw] whitespace-nowrap uppercase select-none"
                    >
                        {word}
                        <span className="text-white/5 px-[2vw]">—</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
