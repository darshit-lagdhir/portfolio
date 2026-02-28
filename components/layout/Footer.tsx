"use client";

import Container from "@/components/layout/Container";
import { identity } from "@/data/identity";
import { motion } from "framer-motion";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="py-40 bg-white dark:bg-[#050505] text-neutral-400 dark:text-neutral-600 relative z-50 overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-32 px-8">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-mega text-neutral-900 dark:text-neutral-50 mb-8 uppercase leading-[0.8] tracking-tighter">
                            EXIT
                        </span>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-neutral-200 dark:bg-neutral-800" />
                            <p className="text-[10px] uppercase tracking-[0.8em] font-mono">
                                Sequence Complete // {year}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-16">
                        <div className="flex gap-16 text-[10px] uppercase tracking-[0.5em] font-bold">
                            <a href={`mailto:${identity.email}`} className="hover:text-black dark:hover:text-white transition-colors">Direct</a>
                            <a href={identity.github} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">Source</a>
                            <a href={identity.linkedin} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">Linked</a>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] uppercase tracking-[0.4em] font-mono opacity-40">
                                Engineered for Resilience. Built for Performance.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Background Signature */}
            <div className="absolute -bottom-20 left-0 w-full opacity-[0.02] pointer-events-none select-none">
                <span className="text-display whitespace-nowrap">DARSHIT LAGDHIR // DARSHIT LAGDHIR // DARSHIT LAGDHIR</span>
            </div>
        </footer>
    );
}
