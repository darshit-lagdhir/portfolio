"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis>(null);

    useEffect(() => {
        // INERTIA SCROLL SYSTEM (PHASE 1)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);

            // Update Scroll Progress Token (PHASE 19)
            const scrollPercent = (lenis.scroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.documentElement.style.setProperty("--scroll-percent", `${scrollPercent}%`);

            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Sync with Page Transitions
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const id = anchor.getAttribute("href")?.slice(1);
                if (id) {
                    const target = document.getElementById(id);
                    if (target) {
                        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
                    }
                }
            });
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
