"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PFCVSystemPage() {
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <div className="min-h-screen w-full bg-[#050505] text-neutral-50 relative">
            <div className="grid-layout px-8 md:px-0 py-40 gap-y-32 md:gap-y-48">

                {/* 1. Project Header */}
                <div className="col-span-12 lg:col-span-10">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold block mb-4">
                            Verification // Pipeline
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title mb-8">
                            POLYGLOT FFI
                        </h1>
                        <p className="font-body text-step-0 text-neutral-600 uppercase tracking-micro">
                            Cross-Language Contract Verifier / FFI Security
                        </p>
                    </motion.div>
                </div>

                {/* 2. Overview Block */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start border-t border-neutral-900 pt-24">
                    <div className="md:col-span-4 mb-8 md:mb-0">
                        <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold block">
                            01 // Overview
                        </span>
                    </div>
                    <div className="md:col-span-8">
                        <p className="font-body text-step-1 text-neutral-600 font-light leading-relaxed max-w-[60ch]">
                            An automated verification pipeline for cross-language Foreign Function Interfaces (FFI). Engineered to reduce memory layout uncertainty and calling convention mismatches between Rust, C++, and WebAssembly.
                        </p>
                    </div>
                </div>

                {/* 3. System Core */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start border-t border-neutral-900 pt-24">
                    <div className="md:col-span-4 mb-16 md:mb-0">
                        <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold block">
                            02 // System Core
                        </span>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="font-title text-step-3 text-white uppercase tracking-tight-title mb-12">
                            The 8-Module Pipeline
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[
                                { title: "Parsers", desc: "Clang AST and syn-based extraction for C++ and Rust." },
                                { title: "IR Normalization", desc: "Synthesis of Language-agnostic Intermediate Representation." },
                                { title: "Layout Verifier", desc: "Validation of memory alignment and padding invariants." },
                                { title: "Call Enforcement", desc: "Convention checks for stack and register pressure." },
                                { title: "Binding Gen", desc: "Automatic output of safety-instrumented FFI bindings." },
                                { title: "Report Engine", desc: "Structured architectural integrity reports." }
                            ].map((mod, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold">Module::{mod.title}</span>
                                    <p className="font-body text-step-0 text-neutral-600 font-light leading-snug">{mod.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Technical Depth */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start border-t border-neutral-900 pt-24">
                    <div className="md:col-span-4 mb-16 md:mb-0">
                        <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold block">
                            03 // Technical Depth
                        </span>
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-16">
                        <div className="flex flex-col gap-6">
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Pipeline Stages</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Systematic transformation from source-specific syntax trees to a unified verification model, ensuring end-to-end contract adherence.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Runtime Adapter Enforcement</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Verification of binary isolation and non-overlapping memory regions during concurrent cross-language execution.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">IR Concept</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Implementing a custom Intermediate Representation (IR) to abstract language-specific complexities and focus on memory layout invariants.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Key Highlights */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start border-t border-neutral-900 pt-24">
                    <div className="md:col-span-4 mb-16 md:mb-0">
                        <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold block">
                            04 // Highlights
                        </span>
                    </div>
                    <div className="md:col-span-8">
                        <ul className="flex flex-col gap-8">
                            {[
                                "Cross-language contract enforcement",
                                "Memory layout schema generation",
                                "Runtime safety protection layer",
                                "LLVM metadata alignment validation"
                            ].map((highlight, i) => (
                                <li key={i} className="flex items-center gap-6">
                                    <div className="w-2 h-2 bg-neutral-900" />
                                    <span className="font-body text-step-1 text-white font-light">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 6. Final Reflection */}
                <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 items-start border-t border-neutral-900 pt-24">
                    <div className="md:col-span-4 mb-16 md:mb-0">
                        <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold block">
                            05 // Reflection
                        </span>
                    </div>
                    <div className="md:col-span-8">
                        <p className="font-body text-step-1 text-neutral-600 font-light italic leading-relaxed max-w-[55ch]">
                            Built to reduce uncertainty at cross-language boundaries. The project focuses on the formal verification of data contracts to eliminate memory safety vulnerabilities.
                        </p>
                    </div>
                </div>

                {/* 7. Exit Navigation */}
                <div className="col-span-12 border-t border-neutral-900 pt-20 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold link-precision">
                        &larr; INDEX
                    </Link>
                    <Link href="/movex" className="font-wide text-step-0 text-white uppercase tracking-micro link-precision font-bold">
                        NEXT PROJECT: MoveX &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}


