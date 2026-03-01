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
            <div className="grid-layout">
                {/* Identification Label (Grid Zone 1) */}
                <div className="col-span-12 mb-16 lg:mb-24">
                    <span className="font-wide text-step--1 text-muted uppercase tracking-micro font-bold">
                        SYSTEM ARCHIVE // 003
                    </span>
                </div>

                {/* Structural Entry Catalog */}
                <div className="col-span-12 flex flex-col">
                    {projects.map((p, i) => (
                        <Link key={i} href={p.slug} className="group block border-t border-border first:border-t-0 hover:bg-surface transition-colors duration-300">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 md:py-24"
                            >
                                {/* Core Identity (Grid Zone 1-7) */}
                                <div className="md:col-span-7 flex flex-col justify-between h-full">
                                    <h3 className="font-title text-step-4 text-white uppercase tracking-tight-title group-hover:text-muted transition-colors duration-300">
                                        {p.name}
                                    </h3>
                                    <div className="mt-12">
                                        <span className="font-wide text-step--1 text-muted group-hover:text-white uppercase tracking-micro font-bold transition-colors duration-200">
                                            // ACCESS SYSTEM &rarr;
                                        </span>
                                    </div>
                                </div>

                                {/* Engineering Context (Grid Zone 8-12) */}
                                <div className="md:col-span-4 md:col-start-9 flex flex-col justify-between items-end text-right">
                                    <div className="flex flex-col gap-4">
                                        <span className="font-wide text-step--1 text-muted uppercase tracking-micro">
                                            INDEX // {p.index}
                                        </span>
                                        <p className="font-body text-step-0 text-muted font-light leading-relaxed max-w-[28ch]">
                                            {p.descriptor}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}




