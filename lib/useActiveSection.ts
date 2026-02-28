"use client";

import { useEffect, useState } from "react";

const sections = ["philosophy", "skills", "projects"];

export function useActiveSection() {
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id);
                    }
                },
                { rootMargin: "-30% 0px -60% 0px", threshold: 0.2 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return active;
}
