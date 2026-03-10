"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectDiagram } from "@/types/project";
import ArchNode from "./ArchNode";
import ArchConnection from "./ArchConnection";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  diagram: ProjectDiagram;
}

export default function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(diagram.nodes[0]?.id || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [nodeRects, setNodeRects] = useState<{ [key: string]: DOMRect | null }>({});
  const [parentRect, setParentRect] = useState<DOMRect | null>(null);

  // Measure nodes and parent for connections
  const updateRects = () => {
    if (containerRef.current) {
      setParentRect(containerRef.current.getBoundingClientRect());
      
      const newRects: { [key: string]: DOMRect | null } = {};
      Object.keys(nodeRefs.current).forEach(id => {
        newRects[id] = nodeRefs.current[id]?.getBoundingClientRect() || null;
      });
      setNodeRects(newRects);
    }
  };

  useEffect(() => {
    updateRects();
    window.addEventListener("resize", updateRects);
    // Intersection observer sometimes needs a tick
    const timer = setTimeout(updateRects, 100);
    return () => {
      window.removeEventListener("resize", updateRects);
      clearTimeout(timer);
    };
  }, [diagram]);

  const activeNode = diagram.nodes.find(n => n.id === activeNodeId);

  return (
    <div className="relative w-full py-sys-32">
      <div 
        ref={containerRef}
        className={cn(
          "relative grid gap-x-12 gap-y-16 lg:gap-y-24",
          diagram.layout === "pipeline" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" 
            : "grid-cols-1 md:grid-cols-3"
        )}
      >
        {/* Connection Layer */}
        {diagram.connections.map((conn, idx) => (
          <ArchConnection
            key={`${conn.from}-${conn.to}-${idx}`}
            fromRect={nodeRects[conn.from]}
            toRect={nodeRects[conn.to]}
            parentRect={parentRect}
            layout={diagram.layout}
          />
        ))}

        {/* Nodes Layer */}
        {diagram.nodes.map((node) => (
          <div 
            key={node.id}
            ref={(el) => { nodeRefs.current[node.id] = el; }}
            className="z-10"
          >
            <ArchNode
              node={node}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(node.id)}
            />
          </div>
        ))}
      </div>

      {/* Node Detail Reveal */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-sys-48 p-8 border border-accent/20 bg-accent/5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-3 bg-accent" />
              <h5 className="type-label text-accent">SYSTEM_SUBSURFACE_ANALYSIS</h5>
            </div>
            <h3 className="type-emphasis text-sm mb-4">{activeNode.label} :: {activeNode.type.toUpperCase()}</h3>
            <p className="type-body text-sm text-text-secondary leading-relaxed max-w-2xl">
              {activeNode.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex justify-between items-center opacity-20">
         <div className="type-metadata text-[0.4rem]">VIS_ENGINE_v1.0 // LAYOUT_{diagram.layout.toUpperCase()}</div>
         <div className="type-metadata text-[0.4rem]">SELECT_NODE_FOR_TELEMETRY</div>
      </div>
    </div>
  );
}
