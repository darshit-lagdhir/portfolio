"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type SectionId = "hero" | "systems" | "domains" | "philosophy" | "about" | "contact" | string;

interface SceneContextType {
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    isNavigating: boolean;
    setIsNavigating: (val: boolean) => void;
    isMobile: boolean;
    isScrolled: boolean;
    isLowPerf: boolean;
    isIdle: boolean;
    scrollProgress: number;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLowPerf, setIsLowPerf] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    
    const pathname = usePathname();

    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Auto-enable low performance mode on mobile
            if (mobile) setIsLowPerf(true);
        };
        
        const updateScroll = () => {
            const scrollY = window.scrollY;
            
            // Reduced precision for scroll state to minimize re-renders
            if (Math.abs(scrollY - lastScrollY.current) > 10) {
                const scrolled = scrollY > 100;
                setIsScrolled(scrolled);
                
                const docElement = document.documentElement;
                const scrollHeight = docElement.scrollHeight - window.innerHeight;
                if (scrollHeight > 100) {
                    // Round to 3 decimal places to prevent micro-renders
                    const progress = parseFloat((scrollY / scrollHeight).toFixed(3));
                    setScrollProgress(progress);
                }
                lastScrollY.current = scrollY;
            }
            ticking.current = false;
        };

        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateScroll);
                ticking.current = true;
            }
        };

        const detectPerf = () => {
            if (typeof navigator !== 'undefined') {
                // Heuristic detection for low-end devices
                const cores = navigator.hardwareConcurrency || 4;
                // @ts-expect-error - deviceMemory is not standard in all TS versions
                const memory = navigator.deviceMemory || 8;
                const isSlow = cores <= 4 || memory <= 4;
                
                if (isSlow) setIsLowPerf(true);
                
                // Log performance state for system telemetry
                console.log(`[SYS_TELEMETRY] CORES: ${cores}, MEMORY: ${memory}GB, LOW_PERF_MODE: ${isSlow || isMobile}`);
            }
        };

        // --- NAVIGATION INTELLIGENCE LAYER ---
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -40% 0px',
            threshold: [0, 0.1],
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isNavigating) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = ["hero", "about", "domains", "systems", "comparison", "exploration", "archive", "philosophy", "reflections", "contact"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) sectionObserver.observe(el);
        });

        const resetIdleTimer = () => {
            setIsIdle(false);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsIdle(true), 15000); // 15s idle threshold
        };

        checkMobile();
        handleScroll();
        detectPerf();
        resetIdleTimer();

        window.addEventListener("resize", checkMobile);
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", resetIdleTimer, { passive: true });
        window.addEventListener("keydown", resetIdleTimer, { passive: true });

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            sectionObserver.disconnect();
        };
    }, [pathname, isNavigating, isMobile]); // Added isNavigating to dependencies

    // Sync activeSection with route change if not on home
    useEffect(() => {
        if (pathname !== "/") {
            const section = pathname.replace("/", "");
            const timer = setTimeout(() => setActiveSection(section || "hero"), 50);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    //Interaction lock duration management
    useEffect(() => {
        if (isNavigating) {
            const timer = setTimeout(() => setIsNavigating(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isNavigating]);

    return (
        <SceneContext.Provider value={{
            activeSection, setActiveSection,
            isNavigating, setIsNavigating,
            isMobile, isScrolled, isLowPerf, isIdle,
            scrollProgress
        }}>
            {children}
        </SceneContext.Provider>
    );
}

export function useScene() {
    const context = useContext(SceneContext);
    if (context === undefined) {
        throw new Error("useScene must be used within a SceneProvider");
    }
    return context;
}
