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
            className={`py-20 ${surface ? "bg-neutral-100/40 dark:bg-neutral-900/20" : ""}`}
        >
            <Container>{children}</Container>
        </section>
    );
}
