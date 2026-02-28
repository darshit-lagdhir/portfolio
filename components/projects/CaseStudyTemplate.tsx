"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { motionConfig } from "@/lib/motion";
import { Project } from "@/types/project";

interface CaseStudyTemplateProps {
    project: Project;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: motionConfig.medium, ease: motionConfig.ease }}
            className="mt-16"
        >
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
            <div className="mt-4 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl">
                {children}
            </div>
        </motion.div>
    );
}

export default function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
    return (
        <section className="py-20">
            <Container>
                <Link
                    href="/#projects"
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                    ← Back to Systems
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: motionConfig.medium, ease: motionConfig.ease }}
                    className="mt-10"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl leading-tight">
                        {project.title}
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                        {project.shortDescription}
                    </p>
                    <p className="mt-4 text-xs text-neutral-500">
                        {project.techStack.join(" · ")}
                    </p>
                </motion.div>

                {project.overview && (
                    <Section title="Project Overview">
                        <p>{project.overview}</p>
                    </Section>
                )}

                {project.problem && (
                    <Section title="Problem Context">
                        <p>{project.problem}</p>
                    </Section>
                )}

                {project.architecture && (
                    <Section title="System Architecture">
                        <p>{project.architecture}</p>
                    </Section>
                )}

                {project.decisions && project.decisions.length > 0 && (
                    <Section title="Key Design Decisions">
                        <ul className="list-disc list-outside pl-5 space-y-3">
                            {project.decisions.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                {project.tradeoffs && project.tradeoffs.length > 0 && (
                    <Section title="Tradeoffs & Limitations">
                        <ul className="list-disc list-outside pl-5 space-y-3">
                            {project.tradeoffs.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                {project.performance && (
                    <Section title="Performance & Optimization">
                        <p>{project.performance}</p>
                    </Section>
                )}

                {project.future && project.future.length > 0 && (
                    <Section title="Future Improvements">
                        <ul className="list-disc list-outside pl-5 space-y-3">
                            {project.future.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                {project.repositoryLink && (
                    <Section title="Repository">
                        <a
                            href={project.repositoryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-200 transition-colors"
                        >
                            View on GitHub →
                        </a>
                    </Section>
                )}
            </Container>
        </section>
    );
}
