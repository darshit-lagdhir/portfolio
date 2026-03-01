"use client";

import { motion } from "framer-motion";

export default function BrutalistContact() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="contact">
            <div className="grid-layout px-8 md:px-0 h-full py-24 md:py-32 flex flex-col justify-between">
                {/* 1. Header Label */}
                <div className="col-span-12">
                    <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                        NETWORK // CONNECTION
                    </span>
                </div>

                {/* 2. Signature Conclusion */}
                <div className="col-span-12 flex flex-col gap-8 my-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="font-title text-step-4 text-white uppercase tracking-tight-title"
                        style={{ willChange: "transform, opacity" }}
                    >
                        CONNECT.
                    </motion.h2>
                    <p className="font-body text-step-1 text-neutral-600 font-light max-w-[40ch]">
                        Systems are active. Logic is priority. <br />
                        Communication channels are open for collaboration.
                    </p>
                </div>

                {/* 3. Architectural Footer */}
                <div className="col-span-12 border-t border-neutral-900 pt-16 md:pt-24 mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline">
                        <div className="md:col-span-6">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                DARSHIT LAGDHIR // ARCHITECTURAL INDEX
                            </span>
                        </div>
                        <div className="md:col-span-6 flex justify-end gap-12 md:gap-20">
                            {[
                                { name: "GITHUB", url: "https://github.com/darshit-lagdhir" },
                                { name: "LINKEDIN", url: "https://linkedin.com/in/darshit-lagdhir" }
                            ].map((l, i) => (
                                <a
                                    key={i}
                                    href={l.url}
                                    target="_blank"
                                    className="font-wide text-step-0 text-white uppercase tracking-micro hover:text-neutral-400 transition-colors duration-200 font-bold"
                                >
                                    {l.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



