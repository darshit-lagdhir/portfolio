"use client";

import { useRef } from "react";
import Container from "@/components/layout/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { motionConfig } from "@/lib/motion";
import { identity } from "@/data/identity";

const stagger = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: motionConfig.medium, ease: motionConfig.ease },
    },
};

export default function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

    return (
        <section ref={ref} className="py-24">
            <Container>
                <motion.div style={{ opacity, y, scale }} className="max-w-3xl">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.1]"
                        >
                            {identity.name}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-3 text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500"
                        >
                            {identity.degree} · {identity.university} · Backend · Systems · Infrastructure
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="mt-8 text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 font-medium"
                        >
                            Building structured systems, not just applications.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
                        >
                            I approach software as layered architecture — designing for
                            clarity, separation, and long-term maintainability before
                            writing the first line of code.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="mt-10 flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="#projects"
                                className="px-6 py-3 rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.97] text-center"
                            >
                                Explore Systems
                            </a>

                            <a
                                href={identity.resume}
                                className="px-6 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 text-center"
                            >
                                View Resume
                            </a>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex gap-5 text-xs text-neutral-400 dark:text-neutral-500"
                        >
                            <a
                                href={identity.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href={identity.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                            >
                                LinkedIn
                            </a>
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            className="mt-12 text-[11px] tracking-widest uppercase text-neutral-300 dark:text-neutral-700"
                        >
                            Scroll
                        </motion.p>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
