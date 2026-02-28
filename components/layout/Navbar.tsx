"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useActiveSection } from "@/lib/useActiveSection";
import { identity } from "@/data/identity";
import Container from "@/components/layout/Container";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "#philosophy", label: "About", id: "philosophy" },
    { href: "#skills", label: "Stack", id: "skills" },
    { href: "#projects", label: "Systems", id: "projects" },
];

function MagneticLink({ children, href, isActive }: { children: React.ReactNode; href: string; isActive: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const x = (clientX - (rect.left + rect.width / 2)) * 0.4;
            const y = (clientY - (rect.top + rect.height / 2)) * 0.4;
            setPosition({ x, y });
        }
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.1, y: -2 }}
            className={`relative py-2 group transition-colors ${isActive ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"}`}
        >
            <span className="relative z-10">{children}</span>
            {/* Animated Underline Draw */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-neutral-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />

            {isActive && (
                <motion.div
                    layoutId="navDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-neutral-900 dark:bg-white"
                />
            )}
        </motion.a>
    );
}

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const activeSection = useActiveSection();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-1000 ${scrolled ? "py-6" : "py-12"}`}>
            <Container>
                <div className={`px-12 py-5 rounded-full flex items-center justify-between transition-all duration-1000 ${scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-3xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] scale-95" : "bg-transparent"}`}>
                    <Link href="/" className="font-bold text-2xl tracking-[0.2em] font-display uppercase group">
                        <span className="hidden sm:inline">{identity.name.split(" ")[0]}</span>
                        <span className="sm:hidden">DL</span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            className="block h-[1px] bg-neutral-900 dark:bg-white origin-left transition-transform duration-500"
                        />
                    </Link>

                    <nav className="flex items-center gap-12">
                        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-mono font-medium">
                            {navLinks.map((link) => (
                                <MagneticLink key={link.id} href={link.href} isActive={isHome && activeSection === link.id}>
                                    {link.label}
                                </MagneticLink>
                            ))}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all relative overflow-hidden active:scale-90 group"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={theme}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[9px] font-mono font-medium tracking-widest uppercase"
                                >
                                    {theme === "dark" ? "LT" : "DK"}
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                        </button>
                    </nav>
                </div>
            </Container>
        </header>
    );
}
