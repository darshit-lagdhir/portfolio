"use client";

import { useRef, useState, useCallback } from "react";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setStyle({
            transform: `perspective(600px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateZ(2px)`,
            transition: "transform 0.15s ease-out",
        });
    }, []);

    const handleLeave = useCallback(() => {
        setStyle({
            transform: "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
            transition: "transform 0.4s ease-out",
        });
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={style}
            className={`tilt-card ${className}`}
        >
            {children}
        </div>
    );
}
