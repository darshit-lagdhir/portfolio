interface ContentBlockProps {
    children: React.ReactNode;
    narrow?: boolean;
}

export default function ContentBlock({ children, narrow }: ContentBlockProps) {
    return (
        <div
            className={`text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 ${narrow ? "max-w-2xl" : "max-w-3xl"
                }`}
        >
            {children}
        </div>
    );
}
