"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BrutalistNavbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Systems", href: "/#projects" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${scrolled ? "py-4 bg-[#050505]/95 backdrop-blur-md border-b border-neutral-900" : "py-10 bg-transparent border-b border-transparent"}
            `}
        >
            <nav className="grid-layout px-8 md:px-0">
                {/* Brand — Col 1-4 */}
                <div className="col-span-12 md:col-span-4">
                    <Link href="/" className="font-title text-step-0 tracking-tight-title text-white uppercase select-none font-bold">
                        DARSHIT LAGDHIR
                    </Link>
                </div>

                {/* Links — Optimized for 12-col grid */}
                <div className="hidden md:flex md:col-start-8 md:col-span-5 justify-end gap-x-12">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-wide text-step--2 uppercase tracking-micro transition-colors duration-200 font-bold ${isActive ? "text-white" : "text-neutral-800 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}


