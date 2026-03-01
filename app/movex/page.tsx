"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MoveXPage() {
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
                            SYSTEM // ARCHIVE-001
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title uppercase tracking-tight-title">
                            MoveX
                        </h1>
                        <p className="font-body text-step-1 text-neutral-600 font-light max-w-[50ch] leading-relaxed">
                            Modular backend infrastructure for role-isolated logistics management. Built with absolute integrity in Node.js and PostgreSQL.
                        </p>
                    </motion.div>
                </div>

                {/* 2. Technical Stack (Editorial Rows) */}
                <div className="col-span-12 border-t border-neutral-900 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                01 // OVERVIEW
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <h2 className="font-title text-step-2 text-white uppercase tracking-tight-title mb-8">
                                Secure Logistics Pathway
                            </h2>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[60ch]">
                                Engineering a multi-tenant logistics environment required a zero-trust approach to data access. MoveX implements strict role-based pathway isolation, ensuring that every interaction—from administrative oversight to individual user state tracking—is cryptographically secure and auditable.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Core Modules */}
                <div className="col-span-12 border-t border-neutral-900 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                02 // MODULES
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                                {[
                                    { title: "Isolated Dashboarding", desc: "Granular UI/UX separation based on verified role signatures." },
                                    { title: "Prisma Layering", desc: "Type-safe relational mapping for complex supply chain telemetry." },
                                    { title: "Session Enforcement", desc: "Stateless JWT propagation with rotating secret validation." },
                                    { title: "Audit Logging", desc: "Immutable state-change ledger for every parcel transaction." }
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

                {/* 4. Reflection */}
                <div className="col-span-12 border-t border-neutral-900 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <span className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold">
                                03 // REFLECTION
                            </span>
                        </div>
                        <div className="md:col-span-8">
                            <p className="font-body text-step-1 text-neutral-600 font-light italic leading-relaxed max-w-[55ch]">
                                The focus was not on visual complexity, but on the architectural purity of the backend. Truth exists in the logic, not the interface.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Return (Signature) */}
                <div className="col-span-12 border-t border-neutral-900 pt-24 pb-12 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step-0 text-neutral-800 uppercase tracking-micro font-bold hover:text-white transition-colors duration-200">
                        &larr; INDEX
                    </Link>
                    <Link href="/uidai" className="font-wide text-step-0 text-white uppercase tracking-micro font-bold hover:text-neutral-400 transition-colors duration-200">
                        NEXT SYSTEM &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}



