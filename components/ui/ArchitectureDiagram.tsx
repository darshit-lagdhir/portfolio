"use client";

import { motion } from "framer-motion";

interface DiagramLayer {
    label: string;
}

interface ArchitectureDiagramProps {
    layers: DiagramLayer[];
    caption?: string;
}

export default function ArchitectureDiagram({ layers, caption }: ArchitectureDiagramProps) {
    return (
        <div className="my-12 flex flex-col items-center">
            <div className="w-full max-w-md perspective-1000">
                {layers.map((layer, i) => (
                    <div key={layer.label} className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.2,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 20px rgba(100, 100, 255, 0.15)",
                                borderColor: "rgba(100, 100, 255, 0.3)"
                            }}
                            className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/40 backdrop-blur-sm px-6 py-4 text-center text-base font-bold text-neutral-900 dark:text-neutral-100 transition-colors cursor-default z-10"
                        >
                            {layer.label}
                        </motion.div>

                        {i < layers.length - 1 && (
                            <div className="relative h-12 w-px bg-neutral-200 dark:bg-neutral-800">
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 + 0.4, duration: 0.6 }}
                                    className="absolute top-0 left-0 w-full bg-neutral-900 dark:bg-neutral-100 opacity-20 dark:opacity-40"
                                />
                                {/* Animated Pulse */}
                                <motion.div
                                    animate={{
                                        top: ["0%", "100%"],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.5
                                    }}
                                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 blur-[2px]"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {caption && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-[11px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 font-mono"
                >
                    {caption}
                </motion.p>
            )}
        </div>
    );
}
