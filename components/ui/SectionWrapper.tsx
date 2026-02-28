import Container from "@/components/layout/Container";

interface SectionWrapperProps {
    id?: string;
    children: React.ReactNode;
    surface?: boolean;
    className?: string;
}

export default function SectionWrapper({ id, children, surface, className = "" }: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={`py-40 md:py-60 ${surface ? "bg-neutral-50/50 dark:bg-neutral-900/10 border-y border-neutral-100 dark:border-neutral-900/50" : ""} ${className}`}
        >
            <Container>{children}</Container>
        </section>
    );
}
