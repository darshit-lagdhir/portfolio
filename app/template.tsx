"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const lastClickTime = useRef(Date.now());

    // TRANSITION MODE INTELLIGENCE
    const [duration, setDuration] = useState(0.8);

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastAction = now - lastClickTime.current;

        if (timeSinceLastAction < 2000) {
            setDuration(0.5); // Faster for rapid nav
        } else {
            setDuration(0.7); // Cinematic
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

    // PROJECT PAGE ENTRY DEPTH SLAM (PHASE 7)
    // Forward nav: Home slams back, Project slams forward
    // Backward nav: Project pulls back, Home pulls forward
    const variants = {
        initial: (dir: string) => ({
            opacity: 0,
            translateZ: dir === "forward" ? 400 : -400, // Sharp Slam
            rotateX: dir === "forward" ? -5 : 5, // Extra tension
            filter: "blur(12px)",
        }),
        animate: {
            opacity: 1,
            translateZ: 0,
            rotateX: 0,
            filter: "blur(0px)",
        },
        exit: (dir: string) => ({
            opacity: 0,
            translateZ: dir === "forward" ? -400 : 400,
            rotateX: dir === "forward" ? 5 : -5,
            filter: "blur(8px)",
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
                {/* SYSTEM TRANSITION VEIL */}
                <motion.div
                    initial={{ translateY: direction === "forward" ? "100%" : "-100%" }}
                    animate={{ translateY: "-100%" }}
                    exit={{ translateY: direction === "forward" ? "-100%" : "100%" }}
                    transition={{ duration: duration + 0.15, ease }}
                    className="fixed inset-0 bg-background z-[1000] pointer-events-none"
                />

                {/* SKELETON LOADING SHIMMER (PHASE 15) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration, ease: "linear" }}
                    className="fixed inset-0 z-[999] pointer-events-none skeleton mix-blend-overlay"
                />

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
