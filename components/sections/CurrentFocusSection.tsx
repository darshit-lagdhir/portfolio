"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CurrentFocusSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    return (
        <section ref={ref} className="py-40 md:py-80 bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
            <span className="font-caption text-[10px] md:text-sm uppercase tracking-[0.5em] text-neutral-400 mb-16">Currently Exploring</span>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-8">
                <motion.h2 style={{ x: useTransform(scrollYProgress, [0, 1], [-200, 200]), fontFamily: 'var(--font-title)' }} className="text-[clamp(4rem,10vw,12rem)] uppercase font-black tracking-tighter leading-none text-neutral-900 dark:text-neutral-50 drop-shadow-lg">
                    AIML
                </motion.h2>
                <motion.h2 style={{ x: useTransform(scrollYProgress, [0, 1], [200, -200]), WebkitTextStroke: "2px currentColor", WebkitTextFillColor: "transparent", fontFamily: 'var(--font-ui)' }} className="text-[clamp(3.5rem,8vw,10rem)] uppercase font-black tracking-widest leading-none text-neutral-900 dark:text-neutral-50 drop-shadow-2xl">
                    CYBERSECURITY
                </motion.h2>
            </div>
            <p className="font-ui mt-32 text-sm md:text-lg text-neutral-500 font-light max-w-2xl text-center uppercase tracking-widest">
                Building stronger foundations in intelligent systems and secure architectures.
            </p>
        </section>
    );
}
