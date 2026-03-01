"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
    {
        name: "MoveX",
        slug: "/movex",
        descriptor: "Secure Backend Logistics Architecture",
        index: "001"
    },
    {
        name: "UIDAI SYSTEM",
        slug: "/uidai",
        descriptor: "Advisory Intelligence Pattern Detection",
        index: "002"
    },
    {
        name: "POLYGLOT FFI",
        slug: "/pfcv",
        descriptor: "Cross-Language Contract Verifier",
        index: "003"
    }
];

export default function BrutalistProjectsPreview() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section className="snap-section" id="projects">
            <div className="grid-layout px-8 md:px-0 gap-y-12 md:gap-y-16">
                {/* Section Header */}
                <div className="col-span-12 mb-8">
                    <span className="font-wide text-step--2 text-neutral-800 uppercase tracking-micro font-bold">
                        SYSTEMS ARCHIVE // SELECTION
                    </span>
                </div>

                {/* Vertical Project Cards */}
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, ease }}
                        className="col-span-12"
                    >
                        <Link href={project.slug}>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.4, ease }}
                                className="w-full min-h-[40vh] md:min-h-[50vh] border border-neutral-900 bg-[#070707] p-12 md:p-20 flex flex-col justify-center hover:border-neutral-700 transition-colors duration-300 relative group overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-pointer">
                                    <div className="md:col-span-1">
                                        <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro block">
                                            {project.index}
                                        </span>
                                    </div>
                                    <div className="md:col-span-7">
                                        <h3 className="font-title text-step-4 text-white uppercase tracking-tight-title mb-4">
                                            {project.name}
                                        </h3>
                                        <p className="font-body text-step-0 text-neutral-600 font-light max-w-[40ch]">
                                            {project.descriptor}
                                        </p>
                                    </div>
                                    <div className="md:col-span-4 flex justify-end">
                                        <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold group-hover:text-white transition-colors duration-200">
                                            ENTER SYSTEM &rarr;
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
