export const motionConfig = {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    cinematic: [0.16, 1, 0.3, 1] as const,
    stagger: 0.08,
    viewport: { once: true, margin: "-100px" as const },
};

// Mask Reveal for Headlines (reveals from below with clip-path)
export const maskReveal = {
    initial: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40, opacity: 0 },
    whileInView: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, opacity: 1 },
    transition: { duration: 1.2, ease: motionConfig.cinematic },
};

// Subtle Scale Up & Fade (Cinematic entry)
export const scaleReveal = {
    initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
    whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
    transition: { duration: 1, ease: motionConfig.cinematic },
};

// Standard Glide reveal upgrade
export const sectionReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: motionConfig.viewport,
    transition: { duration: motionConfig.medium, ease: motionConfig.cinematic },
};

export const staggerContainer = {
    whileInView: { transition: { staggerChildren: motionConfig.stagger } },
    viewport: motionConfig.viewport,
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: motionConfig.medium, ease: motionConfig.cinematic },
};
