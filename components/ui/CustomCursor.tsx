"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfigRing = { stiffness: 120, damping: 20 };
    const springConfigDot = { stiffness: 600, damping: 30 };
    const springConfigHalo = { stiffness: 80, damping: 25 };

    const ringX = useSpring(cursorX, springConfigRing);
    const ringY = useSpring(cursorY, springConfigRing);
    const dotX = useSpring(cursorX, springConfigDot);
    const dotY = useSpring(cursorY, springConfigDot);
    const haloX = useSpring(cursorX, springConfigHalo);
    const haloY = useSpring(cursorY, springConfigHalo);

    const [cursorState, setCursorState] = useState("default");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.closest("a") || target.closest("button") || target.closest(".magnetic-btn")) {
                setCursorState("button");
            } else if (target.closest(".glass-card")) {
                setCursorState("card");
            } else if (target.closest("h1") || target.closest("h2") || target.closest("h3") || target.closest(".text-mega")) {
                setCursorState("typography");
            } else if (target.closest("svg") || target.closest(".diagram")) {
                setCursorState("diagram");
            } else {
                setCursorState("default");
            }
        };

        const handleMouseDown = () => setCursorState("click");
        const handleMouseUp = () => setCursorState("default");

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    const variants = {
        default: { scale: 1, backgroundColor: "rgba(255,255,255,1)", borderWidth: "0px", mixBlendMode: "difference" as any },
        button: { scale: 0.2, backgroundColor: "rgba(255,255,255,1)", borderWidth: "0px", mixBlendMode: "difference" as any },
        card: { scale: 1.5, backgroundColor: "rgba(255,255,255,0.1)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.5)", mixBlendMode: "normal" as any },
        typography: { scale: 2.5, backgroundColor: "rgba(255,255,255,1)", borderWidth: "0px", mixBlendMode: "difference" as any },
        diagram: { scale: 1.2, backgroundColor: "rgba(255,255,255,0)", borderWidth: "1px", borderColor: "rgba(255,255,255,1)", mixBlendMode: "difference" as any },
        click: { scale: 0.5, backgroundColor: "rgba(255,255,255,1)", borderWidth: "0px", mixBlendMode: "difference" as any }
    };

    const ringVariants = {
        default: { scale: 1, opacity: 0.5, borderColor: "rgba(100,100,100,0.5)" },
        button: { scale: 2.5, opacity: 1, borderColor: "var(--color-accent)" },
        card: { scale: 0, opacity: 0 },
        typography: { scale: 0, opacity: 0 },
        diagram: { scale: 1.5, opacity: 1, borderColor: "rgba(255,255,255,0.8)", borderStyle: "dashed" },
        click: { scale: 1.5, opacity: 0, borderColor: "var(--color-accent)" }
    };

    const haloVariants = {
        default: { scale: 0, opacity: 0 },
        button: { scale: 3, opacity: 0.15 },
        card: { scale: 4, opacity: 0.05 },
        typography: { scale: 0, opacity: 0 },
        diagram: { scale: 2, opacity: 0.1 },
        click: { scale: 0, opacity: 0 }
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Soft Halo */}
            <motion.div
                className="absolute left-0 top-0 w-24 h-24 rounded-full bg-accent blur-xl -translate-x-1/2 -translate-y-1/2"
                style={{ x: haloX, y: haloY }}
                variants={haloVariants}
                animate={cursorState}
                transition={{ duration: 0.4 }}
            />
            {/* Outer Ring */}
            <motion.div
                className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
                style={{ x: ringX, y: ringY }}
                variants={ringVariants}
                animate={cursorState}
                transition={{ duration: 0.3 }}
            />
            {/* Inner Dot */}
            <motion.div
                className="absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ x: dotX, y: dotY }}
                variants={variants}
                animate={cursorState}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
}
