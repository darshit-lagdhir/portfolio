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
            const height = document.documentElement.scrollHeight - window.innerHeight;
            if (height > 0) {
                setScrollProgress(scrollY / height);
            }

            // Detect Active Section
            const sections: SectionId[] = ["hero", "philosophy", "systems", "capabilities", "about", "contact"];
            for (const id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is roughly in the middle of the viewport
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                        setActiveSection(id);
                        break;
                    }
                }
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

        checkMobile();
        handleScroll();
        detectPerf();

        window.addEventListener("resize", checkMobile);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
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
