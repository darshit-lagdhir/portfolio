import Container from "@/components/layout/Container";

interface SectionWrapperProps {
    id?: string;
    children: React.ReactNode;
    surface?: boolean;
}

export default function SectionWrapper({ id, children, surface }: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={`py-28 ${surface ? "bg-neutral-50/50 dark:bg-neutral-900/10 border-y border-neutral-100 dark:border-neutral-900/50" : ""}`}
        >
            <Container>{children}</Container>
        </section>
    );
}
