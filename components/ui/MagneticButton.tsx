"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    magneticRadius?: number; // Size of the invisible magnetic field
}

export default function MagneticButton({ children, href, onClick, className = "", magneticRadius = 150 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    // Mouse coordinates relative to document
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for the button body
    const buttonX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
    const buttonY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Calculate distance from center
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If within magnetic radius, attract
        if (distance < magneticRadius) {
            setHovered(true);
            // Attract button strongly (strength max 0.4)
            x.set(distanceX * 0.4);
            y.set(distanceY * 0.4);
        } else {
            setHovered(false);
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        setHovered(false);
        x.set(0);
        y.set(0);
    };

    const innerContent = (
        <motion.div
            style={{ x: buttonX, y: buttonY }}
            className={`relative group overflow-hidden ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 inline-block font-bold">
                {children}
            </span>

            {/* Animated Shadow/Glow Expansion */}
            <div className="absolute inset-0 rounded-full border border-neutral-900/10 dark:border-white/10 group-hover:border-accent shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all duration-500 z-0" />

            {/* Light Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full opacity-0 group-hover:opacity-100 group-hover:animate-sweep bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent skew-x-12 z-0" />
        </motion.div>
    );

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="magnetic-wrapper relative inline-block p-10 -m-10" // The invisible padding creates the magnetic field radius
            onClick={onClick}
        >
            {href ? (
                <a href={href} className="inline-block outline-none">
                    {innerContent}
                </a>
            ) : (
                <button className="inline-block outline-none">
                    {innerContent}
                </button>
            )}
        </div>
    );
}
