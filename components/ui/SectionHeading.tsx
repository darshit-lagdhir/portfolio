interface SectionHeadingProps {
    children: React.ReactNode;
    as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({ children, as: Tag = "h2" }: SectionHeadingProps) {
    const sizes = {
        h1: "text-3xl md:text-4xl",
        h2: "text-3xl md:text-4xl",
        h3: "text-xl md:text-2xl",
    };

    return (
        <Tag className={`${sizes[Tag]} font-semibold tracking-tight`}>
            {children}
        </Tag>
    );
}
