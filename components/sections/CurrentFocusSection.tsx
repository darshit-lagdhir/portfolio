"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CurrentFocusSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    return (
        <section ref={ref} className="py-40 md:py-80 bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-[10px] uppercase font-mono tracking-[0.5em] text-neutral-400 mb-12">Currently Exploring</span>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <motion.h2 style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 100]) }} className="text-mega uppercase font-black tracking-tighter leading-none text-neutral-900 dark:text-neutral-50">AIML</motion.h2>
                <span className="text-4xl italic text-accent font-light">&</span>
                <motion.h2 style={{ x: useTransform(scrollYProgress, [0, 1], [100, -100]), WebkitTextStroke: "1px currentColor" }} className="text-mega uppercase font-black tracking-tighter leading-none text-transparent stroke-neutral-900 dark:stroke-neutral-50">CYBER</motion.h2>
            </div>
            <p className="mt-20 text-xl md:text-3xl text-neutral-500 font-light max-w-2xl text-center italic lowercase">
                Building deeper fundamentals in intelligent systems and secure architectures.
            </p>
        </section>
    );
}
