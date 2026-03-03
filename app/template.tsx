"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useScene } from "@/context/SceneContext";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const lastClickTime = useRef(Date.now());
    const { isNavigating } = useScene();

    // PHASE 12: CINEMATIC TIMING (SUB-600MS)
    const [duration, setDuration] = useState(0.55);

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastAction = now - lastClickTime.current;

        if (timeSinceLastAction < 2000) {
            setDuration(0.4); // Faster for rapid nav
        } else {
            setDuration(0.55); // Cinematic
        }
        lastClickTime.current = now;

        if (pathname === "/" && prevPathname.current !== "/") {
            setDirection("backward");
        } else if (pathname !== "/" && prevPathname.current === "/") {
            setDirection("forward");
        }
        prevPathname.current = pathname;
    }, [pathname]);

    const ease = [0.16, 1, 0.3, 1] as const;

    // PHASE 5: DIMENSIONAL Z-LAYER ENTRY
    // Strict adherence to Z-depth + opacity only. No blur (Performance Safety)
    const variants = {
        initial: (dir: string) => ({
            opacity: 0,
            scale: dir === "forward" ? 0.98 : 1.02,
            translateZ: dir === "forward" ? -100 : 100, // Depth drop
        }),
        animate: {
            opacity: 1,
            scale: 1,
            translateZ: 0,
            transition: { duration, ease, delay: 0.1 }
        },
        exit: (dir: string) => ({
            opacity: 0,
            scale: dir === "forward" ? 1.02 : 0.98,
            translateZ: dir === "forward" ? 100 : -100,
        }),
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={pathname}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration, ease }}
                className="page-fade"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* PHASE 8/13: ADVANCED PAGE TRANSITION FEEDBACK */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 bg-white z-[2000] pointer-events-none origin-bottom"
                />

                <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                    className="fixed inset-0 bg-white z-[2000] pointer-events-none origin-top"
                />

                {/* SYSTEM PULSE ON TRANSITION (PHASE 13) */}
                <AnimatePresence>
                    {isNavigating && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white z-[3000] pointer-events-none mix-blend-overlay"
                        />
                    )}
                </AnimatePresence>

                {/* SKELETON + MORPH LOADER */}
                <motion.div
                    initial={{ translateY: direction === "forward" ? "100%" : "-100%" }}
                    animate={{ translateY: "-100%" }}
                    exit={{ translateY: direction === "forward" ? "-100%" : "100%" }}
                    transition={{ duration: duration + 0.1, ease }}
                    className="fixed inset-0 bg-background z-[1000] pointer-events-none"
                />

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
