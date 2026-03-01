"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UIDAIAdvisoryPage() {
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
                            System // Advisory
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title mb-8">
                            UIDAI SYSTEM
                        </h1>
                        <p className="font-body text-step-0 text-neutral-600 uppercase tracking-micro">
                            Advisory Intelligence / Pattern Detection
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
                            An advisory intelligence system designed to identify enrollment patterns within biometric registration data. Built with an emphasis on human-in-the-loop validation and biometric integrity.
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
                            Detection Framework
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            {[
                                { title: "Pattern Grouping", desc: "Clustering registration anomalies into distinct risk categories." },
                                { title: "Signal Types", desc: "Classifying biometric drifts as environmental or systematic variants." },
                                { title: "Confidence Scoring", desc: "Quantifying the certainty of detected patterns for human review." },
                                { title: "Advisory-Only", desc: "Strict system constraint: No autonomous decisions are executed." }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold">Core::{item.title}</span>
                                    <p className="font-body text-step-0 text-neutral-600 font-light leading-snug">{item.desc}</p>
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
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Aggregation Logic</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Utilizing structured relational flows to aggregate registration telemetry without direct storage of raw biometric data.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 px-10 py-12 bg-neutral-950 border border-neutral-900">
                            <h3 className="font-wide text-step--1 text-red-900 uppercase tracking-micro font-bold">Pattern Detection Method</h3>
                            <p className="font-body text-step-0 text-neutral-500 font-light leading-relaxed max-w-[55ch]">
                                High-priority advisory warning: All detections requires human review to avoid algorithmic bias in identity verification.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Human-in-the-loop</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                The system is designed as a decision-support tool. Final determination is always reserved for verified human oversight.
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
                                "Signal classification engine",
                                "Dynamic confidence scoring",
                                "Ethics-first algorithmic design",
                                "Temporal distribution analysis"
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
                            Designed to assist decision-making without replacing human judgment. The system operates on the principle that identity verification demands absolute transparency and ethical oversight.
                        </p>
                    </div>
                </div>

                {/* 7. Exit Navigation */}
                <div className="col-span-12 border-t border-neutral-900 pt-20 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold link-precision">
                        &larr; INDEX
                    </Link>
                    <Link href="/pfcv" className="font-wide text-step-0 text-white uppercase tracking-micro link-precision font-bold">
                        NEXT PROJECT: PFCV &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}


