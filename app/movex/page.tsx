"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MoveXPage() {
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
                            Logistics // System
                        </span>
                        <h1 className="font-title text-step-5 leading-tight-title text-white uppercase tracking-tight-title mb-8">
                            MoveX
                        </h1>
                        <p className="font-body text-step-0 text-neutral-600 uppercase tracking-micro">
                            Modern Logistics System / Role-based backend architecture
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
                            A modern logistics system built with Node.js, Express, and PostgreSQL. Engineered to manage complex supply chain interactions through secure, role-isolated pathways.
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
                            Role-Based Architecture
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            {[
                                { title: "Admin", desc: "Global system oversight and fleet management." },
                                { title: "Franchisee", desc: "Regional territory control and resource tracking." },
                                { title: "Staff", desc: "Operational dispatch and parcel coordination." },
                                { title: "User", desc: "Secure parcel submission and real-time state tracking." }
                            ].map((role, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <span className="font-wide text-step--2 uppercase tracking-micro text-neutral-800 font-bold">Role::{role.title}</span>
                                    <p className="font-body text-step-0 text-neutral-600 font-light leading-snug">{role.desc}</p>
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
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Session Control</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Implementing secure session persistence through JWT-based authentication with isolated pathway enforcement.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Security Layers</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Argon2id key derivation for password hashing and strict CORS policies to block cross-origin contamination.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="font-wide text-step--1 text-white uppercase tracking-micro font-bold">Database Structure</h3>
                            <p className="font-body text-step-0 text-neutral-600 font-light leading-relaxed max-w-[55ch]">
                                Relational schema optimization in PostgreSQL using Prisma ORM for structured data isolation and efficient tracking queries.
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
                                "Secure session persistence",
                                "Role-based dashboard separation",
                                "Modular backend routing",
                                "Real-time state tracing ledger"
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
                            Focused on building a structured backend with real-world security considerations. The project prioritizes architectural integrity over visual complexity.
                        </p>
                    </div>
                </div>

                {/* 7. Exit Navigation */}
                <div className="col-span-12 border-t border-neutral-900 pt-20 flex justify-between items-baseline">
                    <Link href="/" className="font-wide text-step--1 text-neutral-800 uppercase tracking-micro font-bold link-precision">
                        &larr; INDEX
                    </Link>
                    <Link href="/uidai" className="font-wide text-step-0 text-white uppercase tracking-micro link-precision font-bold">
                        NEXT PROJECT: UIDAI &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );
}


