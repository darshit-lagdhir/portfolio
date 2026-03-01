"use client";

import { motion } from "framer-motion";

export default function BrutalistContact() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="contact">
            <div className="grid-layout px-8 md:px-0 h-full py-24 md:py-32 flex flex-col justify-between">
                {/* 1. Archive Label */}
                <div className="col-span-12">
                    <span className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro font-bold block">
                        NETWORK // CONNECTION
                    </span>
                </div>

                {/* 2. Headline — Centered within space */}
                <div className="col-span-12 flex items-center justify-center my-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="font-title text-step-4 text-white uppercase tracking-tight-title select-none"
                        style={{ willChange: "transform, opacity" }}
                    >
                        CONNECT.
                    </motion.h2>
                </div>

                {/* 3. Refined Footer */}
                <div className="col-span-12 border-t border-neutral-900 pt-12 md:pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                DARSHIT LAGDHIR // 25
                            </span>
                        </div>
                        <div className="md:col-span-8 flex justify-end gap-12 md:gap-20">
                            {[
                                { name: "GITHUB", url: "https://github.com/darshit-lagdhir" },
                                { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }
                            ].map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    className="font-wide text-step-0 uppercase tracking-micro text-neutral-600 hover:text-white transition-colors duration-200 link-precision font-bold"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


