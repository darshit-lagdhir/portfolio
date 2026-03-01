"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "Secure Backend Logistics Architecture",
        index: "ARC-001"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "Advisory Intelligence Pattern Detection",
        index: "ARC-002"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "Cross-Language Contract Verifier",
        index: "ARC-003"
    }
];

export default function BrutalistProjectsPreview() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="projects">
            <div className="grid-layout px-8 md:px-0">
                {/* 1. Header Label */}
                <div className="col-span-12 mb-16">
                    <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                        SYSTEMS CATALOG // PROJECT INDEX
                    </span>
                </div>

                {/* 3 Panels (Grid-based selection) */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <Link key={i} href={p.slug} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="border border-neutral-900 bg-[#070707] p-10 h-full min-h-[500px] flex flex-col justify-between hover:border-neutral-600 transition-all duration-300"
                            >
                                <div className="flex flex-col gap-8">
                                    <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro">
                                        {p.index}
                                    </span>
                                    <h3 className="font-title text-step-3 text-white uppercase tracking-tight-title group-hover:text-neutral-400 transition-colors duration-300">
                                        {p.name}
                                    </h3>
                                    <p className="font-body text-step-0 text-neutral-600 font-light leading-snug max-w-[20ch]">
                                        {p.descriptor}
                                    </p>
                                </div>

                                <div className="border-t border-neutral-900 pt-8 flex justify-between items-center group-hover:border-neutral-600 transition-colors duration-300">
                                    <span className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">
                                        ENTER SYSTEM &rarr;
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

