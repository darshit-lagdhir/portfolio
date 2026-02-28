"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { motionConfig, sectionReveal, staggerItem } from "@/lib/motion";

export default function ProjectsSection() {
    const sorted = [...projects].sort((a, b) => a.tier - b.tier);

    return (
        <SectionWrapper id="projects">
            <motion.div {...sectionReveal}>
                <SectionHeading>Selected Systems</SectionHeading>
            </motion.div>

            <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={motionConfig.viewport}
                transition={{ staggerChildren: motionConfig.stagger }}
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {sorted.map((project) => (
                    <motion.div key={project.slug} variants={staggerItem}>
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
