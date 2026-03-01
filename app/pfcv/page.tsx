"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PFCVSystemPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div className="min-h-screen w-full bg-[#050505] text-white">
            <div className="grid-layout px-8 md:px-0 py-32 md:py-48 gap-y-32">

                {/* 1. Project Title (Aalto) */}
                <div className="col-span-12 lg:col-span-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        className="flex flex-col gap-8"
                    >
                        <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                            SYSTEM // ARCHIVE-003
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title">
                            POLYGLOT FFI
                        </h1>
                        <p className="font-body text-step-1 text-neutral-600 font-light max-w-[50ch] leading-relaxed">
                            Cross-language contract verification pipeline for memory-safe FFI boundaries.
                        </p>
                    </motion.div>
                </div>

                {/* 2. Overview (Editorial Row) */}
                <div className="col-span-12 border-t border-neutral-900 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                01 // OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <h2 className="font-title text-step-2 text-white uppercase tracking-tight-title mb-8">
                                Binary Contract Enforcement
                            </h2>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[60ch]">
                                Polyglot FFI is an automated verification pipeline designed to eliminate memory layout uncertainty at the boundary between Rust, C++, and WebAssembly. By synthesizing a language-agnostic intermediate representation, the system validates memory alignment, padding invariants, and calling convention adherence before execution.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Pipeline Modules */}
                <div className="col-span-12 border-t border-neutral-900 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                02 // PIPELINE
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                                {[
                                    { title: "IR Normalization", desc: "Synthesis of Language-agnostic Intermediate Representation." },
                                    { title: "Layout Verifier", desc: "Validation of memory alignment and padding invariants." },
                                    { title: "Convention Enforcement", desc: "Strict checks for stack discipline and register pressure." },
                                    { title: "Safe Adapter Gen", desc: "Automatic generation of instrumented, safe FFI bridges." }
                                ].map((m, i) => (
                                    <div key={i} className="flex flex-col gap-4">
                                        <h3 className="font-wide text-step-0 text-white uppercase tracking-micro font-bold">
                                            {m.title}
                                        </h3>
                                        <p className="font-body text-step--1 text-neutral-600 font-light leading-snug">
                                            {m.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Safety Reflection */}
                <div className="col-span-12 border-t border-neutral-900 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                03 // REFLECTION
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="font-body text-step-1 text-neutral-600 font-light italic leading-relaxed max-w-[55ch]">
                                Uncertainty is the root of memory corruption. Formalizing the contract between languages is the only path to absolute binary safety.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Return (Signature) */}
                <div className="col-span-12 border-t border-neutral-900 pt-24 pb-12 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step-0 text-neutral-800 uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        &larr; INDEX
                    </Link>
                    <Link href="/movex" className="font-wide text-step-0 text-white uppercase tracking-micro font-bold hover:text-neutral-400 transition-colors duration-200">
                        NEXT SYSTEM &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}



