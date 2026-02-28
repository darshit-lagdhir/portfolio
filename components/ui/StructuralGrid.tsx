"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function StructuralGrid() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <motion.div
            style={{ y }}
            className="fixed inset-0 pointer-events-none -z-20 opacity-[0.03] dark:opacity-[0.07]"
        >
            <div
                className="w-full h-[200%] bg-[radial-gradient(circle,currentColor_1px,transparent_1px)]"
                style={{ backgroundSize: "40px 40px" }}
            />
        </motion.div>
    );
}
