"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseVx: number;
    baseVy: number;
    radius: number;
    alpha: number;
    phase: number;
}

export default function AmbientGradient() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = window.devicePixelRatio || 1;
        const isMobile = window.innerWidth <= 768;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        const particles: Particle[] = [];
        // Performance Guardrails: limit particle count on mobile
        const particleCount = isMobile ? 30 : 80;

        for (let i = 0; i < particleCount; i++) {
            const size = Math.random();
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                baseVx: (Math.random() - 0.5) * 0.4,
                baseVy: (Math.random() - 0.5) * 0.4,
                // Depth Blur strategy: some particles are significantly larger (closer)
                radius: size > 0.85 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5,
                alpha: size > 0.85 ? Math.random() * 0.1 + 0.05 : Math.random() * 0.2 + 0.1,
                phase: Math.random() * Math.PI * 2,
            });
        }

        let mouseX = -1000;
        let mouseY = -1000;
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;
        let time = 0;
        let animationFrameId: number;
        let streakActive = false;
        let streakY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return;
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            // Cap the maximum velocity transfer to avoid chaotic jitter
            scrollVelocity = Math.max(-50, Math.min(50, delta));
            lastScrollY = currentScrollY;
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        const isDark = theme === "dark";
        const baseColor = isDark ? "255, 255, 255" : "0, 0, 0";
        const accentColor = "79, 70, 229"; // Indigo/Accent

        const render = () => {
            time += 0.01;
            scrollVelocity *= 0.9; // Friction to slow down velocity after scroll stops

            ctx.clearRect(0, 0, width, height);

            // Breathing Rhythm Logic: Subtle global wave spanning ~6 seconds
            const breath = Math.sin(time) * 0.5 + 0.5;

            particles.forEach((p, i) => {
                // Scroll Velocity Integration
                const sv = scrollVelocity * (p.radius * 0.1); // Closer particles move faster due to parallax
                p.y -= sv;

                // Cursor Displacement (Repulsion Field)
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.vx -= (dx / dist) * force * 0.5;
                    p.vy -= (dy / dist) * force * 0.5;
                }

                // Smooth return to resting velocity
                p.vx += (p.baseVx - p.vx) * 0.05;
                p.vy += (p.baseVy - p.vy) * 0.05;

                // Apply Micro Scale Wave logic to base motion
                p.x += p.vx * (1 + breath * 0.2);
                p.y += p.vy * (1 + breath * 0.2);

                // Infinite canvas wraparound
                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                const currentAlpha = Math.max(0, p.alpha + (breath * 0.05) - (Math.abs(scrollVelocity) * 0.002));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                // Rare injection of accent color for visual variance
                if (i % 7 === 0) {
                    ctx.fillStyle = `rgba(${accentColor}, ${currentAlpha})`;
                } else {
                    ctx.fillStyle = `rgba(${baseColor}, ${currentAlpha})`;
                }

                // Depth Blur simulation for larger foreground particles
                if (p.radius > 3) {
                    ctx.shadowBlur = isDark ? 15 : 8;
                    ctx.shadowColor = `rgba(${i % 7 === 0 ? accentColor : baseColor}, ${currentAlpha})`;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            });

            // Optional Advanced Pattern: Subtle Light Streaks
            if (!isMobile && Math.random() > 0.995 && !streakActive) {
                streakActive = true;
                streakY = Math.random() * height;
            }

            if (streakActive) {
                ctx.beginPath();
                ctx.moveTo(0, streakY);
                ctx.lineTo(width, streakY);
                ctx.strokeStyle = `rgba(${baseColor}, ${isDark ? 0.02 : 0.01})`;
                ctx.lineWidth = 100;
                ctx.stroke();

                streakY += (Math.random() - 0.5) * 5;
                if (Math.random() > 0.95) streakActive = false;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[-30] overflow-hidden" aria-hidden="true">
            {/* Soft Ambient Depth Background */}
            <div
                className={`absolute inset-0 transition-colors duration-[1500ms] ${theme === "dark"
                        ? "bg-[radial-gradient(ellipse_at_top_right,rgba(15,15,15,1)_0%,rgba(5,5,5,1)_100%)]"
                        : "bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,1)_0%,rgba(242,242,244,1)_100%)]"
                    }`}
            />
            {/* The Generative Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-normal opacity-80" />
            {/* Texture Grain Sub-layer */}
            <div className="noise-overlay" style={{ opacity: theme === "dark" ? 0.06 : 0.03 }} />
        </div>
    );
}
