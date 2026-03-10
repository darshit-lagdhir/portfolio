"use client";

import { useScene } from "@/context/SceneContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "HOME", code: "00" },
  { id: "philosophy", label: "SYSTEMS", code: "01" },
  { id: "systems", label: "MODULES", code: "02" },
  { id: "capabilities", label: "SKILLS", code: "03" },
  { id: "about", label: "ABOUT", code: "04" },
  { id: "contact", label: "CONNECT", code: "05" },
];

export default function NavigationDock() {
  const { activeSection, isMobile } = useScene();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMobile) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border-dim px-sys-24 py-sys-16 flex justify-between items-center h-sys-64">
        <div className="type-metadata text-[0.6rem] text-accent">SYSTEMS_ENGINEER</div>
        <div className="flex gap-sys-16">
          {NAV_ITEMS.filter(item => ["hero", "systems", "contact"].includes(item.id)).map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={cn(
                "type-nav text-[0.6rem] transition-colors",
                activeSection === item.id ? "text-accent" : "text-text-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed left-sys-32 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-sys-24">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleScroll(item.id)}
          className="group flex items-center gap-sys-16 text-left relative"
        >
          {/* Code Indicator */}
          <span className={cn(
            "type-metadata text-[0.6rem] transition-all duration-300 w-sys-24",
            activeSection === item.id ? "text-accent" : "text-text-muted opacity-40 group-hover:opacity-100"
          )}>
            {item.code}
          </span>

          {/* Label Container */}
          <div className="overflow-hidden">
            <motion.span 
              className={cn(
                "type-nav text-[0.7rem] block transition-all duration-300",
                activeSection === item.id ? "text-text-primary translate-x-0" : "text-text-muted -translate-x-full group-hover:translate-x-0"
              )}
            >
              {item.label}
            </motion.span>
          </div>

          {/* Active indicator line */}
          <AnimatePresence>
            {activeSection === item.id && (
              <motion.div 
                layoutId="nav-active"
                className="absolute -left-sys-12 w-1 h-sys-12 bg-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </button>
      ))}
      
      {/* Scroll Progress Bar */}
      <div className="absolute -right-sys-8 top-0 bottom-0 w-[1px] bg-border-dim">
        <SceneScrollProgress />
      </div>
    </nav>
  );
}

function SceneScrollProgress() {
  const { scrollProgress } = useScene();
  return (
    <motion.div 
      className="w-full bg-accent origin-top"
      style={{ height: `${scrollProgress * 100}%` }}
    />
  );
}
