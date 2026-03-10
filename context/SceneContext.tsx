"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

type SectionId = "hero" | "about" | "projects" | "contact" | string;

interface SceneContextType {
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
    isNavigating: boolean;
    setIsNavigating: (val: boolean) => void;
    isMobile: boolean;
    isScrolled: boolean;
    isLowPerf: boolean;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
    const [activeSection, setActiveSection] = useState<SectionId>("hero");
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLowPerf, setIsLowPerf] = useState(false);
    
    const pathname = usePathname();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
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

    // Sync activeSection with route change
    useEffect(() => {
        if (pathname === "/") setActiveSection("hero");
        else setActiveSection(pathname.replace("/", ""));
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
            isMobile, isScrolled, isLowPerf
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
