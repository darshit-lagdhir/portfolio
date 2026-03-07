"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark"); // Default to dark for brutalist aesthetics

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem("theme") as Theme | null : null;
        if (stored) {
            requestAnimationFrame(() => {
                setTheme(stored);
                document.documentElement.classList.toggle("dark", stored === "dark");
            });
        } else {
            // Default force dark if no preference found to maintain portfolio aesthetic
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const next = prev === "dark" ? "light" : "dark";
            document.documentElement.classList.toggle("dark", next === "dark");
            localStorage.setItem("theme", next);
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
