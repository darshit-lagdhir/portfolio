import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import CaseStudyTemplate from "@/components/projects/CaseStudyTemplate";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <CaseStudyTemplate project={project} />;
}
