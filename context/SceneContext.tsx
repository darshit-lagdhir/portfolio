"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type SectionId = "hero" | "philosophy" | "systems" | "capabilities" | "about" | "contact" | string;

interface SceneContextType {
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    isNavigating: boolean;
    setIsNavigating: (val: boolean) => void;
    isMobile: boolean;
    isScrolled: boolean;
    isLowPerf: boolean;
    scrollProgress: number;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLowPerf, setIsLowPerf] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    
    const pathname = usePathname();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 40);
            
            // Calculate progress
            const docElement = document.documentElement;
            const scrollHeight = docElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setScrollProgress(scrollY / scrollHeight);
            }
        };

        const detectPerf = () => {
            if (typeof navigator !== 'undefined') {
                const lowCpu = (navigator.hardwareConcurrency || 4) <= 4;
                // @ts-expect-error - deviceMemory is not standard
                const lowMem = (navigator.deviceMemory || 8) <= 4;
                if (lowCpu || lowMem) setIsLowPerf(true);
            }
        };

        // --- NAVIGATION INTELLIGENCE LAYER ---
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0,
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = ["hero", "philosophy", "systems", "capabilities", "about", "contact"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) sectionObserver.observe(el);
        });

        checkMobile();
        handleScroll();
        detectPerf();

        window.addEventListener("resize", checkMobile);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
            sectionObserver.disconnect();
        };
    }, []);

    // Sync activeSection with route change if not on home
    useEffect(() => {
        if (pathname !== "/") {
            const section = pathname.replace("/", "");
            setActiveSection(section || "hero");
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
            isMobile, isScrolled, isLowPerf,
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
