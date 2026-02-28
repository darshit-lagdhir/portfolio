"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import Container from "@/components/layout/Container";

export default function Navbar() {
    const { toggleTheme } = useTheme();

    return (
        <header className="border-b border-neutral-200 dark:border-neutral-800">
            <Container>
                <div className="py-4 flex items-center justify-between">
                    <Link href="/" className="font-semibold text-lg">
                        Darshit Lagdhir
                    </Link>

                    <nav className="flex items-center gap-6 text-sm">
                        <Link href="#philosophy" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Philosophy</Link>
                        <Link href="#skills" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Skills</Link>
                        <Link href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Systems</Link>
                        <button onClick={toggleTheme} className="border border-neutral-300 dark:border-neutral-700 px-3 py-1 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                            Theme
                        </button>
                    </nav>
                </div>
            </Container>
        </header>
    );
}
