"use client";

import { motion } from "framer-motion";

const capabilityClusters = [
  {
    category: "LANGUAGES",
    description: "Exploring the mechanics of systems languages, memory management, and high-performance execution environments.",
    items: ["Java", "C++", "Python", "TypeScript", "Rust"],
    id: "cap-lang"
  },
  {
    category: "SYSTEMS_ENGINEERING",
    description: "Researching scalable backend architectures, distributed service communication, and low-latency system design.",
    items: ["Microservices", "API Design", "gRPC", "Node.js", "Docker"],
    id: "cap-sys"
  },
  {
    category: "DATA_SYSTEMS",
    description: "Investigating relational database technologies, query optimization, and designing systems for data reliability.",
    items: ["PostgreSQL", "SQL", "Redis", "Data Modeling", "ORMs"],
    id: "cap-data"
  },
  {
    category: "SECURITY_AND_OS",
    description: "Deep-dives into operating system internals, shell scripting, and practical cybersecurity exploration.",
    items: ["Linux", "OS Internals", "Cybersecurity", "Shell", "Isolation"],
    id: "cap-sec"
  },
  {
    category: "ARTIFICIAL_INTELLIGENCE",
    description: "Experimenting with machine learning pipelines, pattern detection, and future computational models.",
    items: ["Machine Learning", "Data Pipelines", "Pattern Detection", "Transformers", "Neural Nets"],
    id: "cap-ai"
  }
];

export default function Capabilities() {
  return (
    <div className="w-full relative">
      {/* 
         PHASE 4 — KNOWLEDGE MAPPING VISUALIZATION 
         Subtle background lines and nodes connecting conceptual domains.
      */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden -z-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" preserveAspectRatio="none">
          <circle cx="200" cy="200" r="2" fill="currentColor" />
          <circle cx="800" cy="150" r="2" fill="currentColor" />
          <circle cx="500" cy="400" r="2" fill="currentColor" />
          <circle cx="150" cy="650" r="2" fill="currentColor" />
          <circle cx="850" cy="700" r="2" fill="currentColor" />
          <path d="M200 200 L800 150 L500 400 L150 650 L850 700 L200 200" stroke="currentColor" strokeWidth="0.5" />
          <path d="M500 400 L200 200 M500 400 L850 700" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* PHASE 1 — SECTION CONTAINER & HEADERS */}
      <div className="section-divider" data-label="03_ENGINEERING_CAPABILITIES">
        <span className="divider-label">03_ENGINEERING_CAPABILITIES</span>
      </div>

      <div className="grid-12 mb-sys-64">
        <div className="col-span-12 lg:col-span-8">
          <h2 className="type-h1">KNOWLEDGE_MAPPING_</h2>
          <p className="type-body text-lg max-w-2xl text-text-secondary">
            Modular categorization of technical domains and ongoing intellectual explorations. These areas represent investigative paths rather than static mastery.
          </p>
        </div>
      </div>

      {/* PHASE 3 & 6 — CAPABILITY MODULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sys-32">
        {capabilityClusters.map((cluster, index) => (
          <motion.div
            key={cluster.id}
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative border border-border-dim bg-bg-secondary p-sys-32 hover:border-accent/50 transition-all duration-[250ms] ease-out flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/50 md:hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
          >
            <div className="type-label mb-sys-16 text-accent flex items-center gap-2">
              <span className="w-1 h-1 bg-accent rounded-full" />
              DOMAIN_00{index + 1}
            </div>

            <h3 className="type-emphasis text-lg mb-sys-16 group-hover:text-text-primary transition-colors">
              {cluster.category}
            </h3>

            <p className="type-body text-sm mb-sys-32 opacity-70 leading-relaxed flex-grow">
              {cluster.description}
            </p>

            {/* TECHNICAL PRIMITIVES LIST */}
            <div className="mt-auto pt-sys-24 border-t border-border-dim">
              <div className="type-metadata text-[0.5rem] mb-sys-12 opacity-30 tracking-widest">SUB_PRIMITIVES</div>
              <div className="flex flex-wrap gap-x-sys-16 gap-y-sys-8">
                {cluster.items.map(item => (
                  <span key={item} className="type-metadata text-[0.6rem] opacity-50 font-mono">
                    {item.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle Diagnostic Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
              <div className="absolute top-0 right-0 w-full h-full border-t border-r border-accent" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
