"use client";

import { motion } from "framer-motion";
import { DiagramNode } from "@/types/project";
import { cn } from "@/lib/utils";

interface ArchNodeProps {
  node: DiagramNode;
  isActive: boolean;
  isDimmed: boolean;
  onClick: () => void;
}

const TYPE_COLORS = {
  service: "text-accent",
  database: "text-green-500",
  pipeline: "text-yellow-500",
  interface: "text-purple-500",
  logic: "text-blue-500",
  client: "text-pink-500"
};

const TYPE_LABELS = {
  service: "SERVICE_MODULE",
  database: "DATA_STORE",
  pipeline: "PROCESS_FLOW",
  interface: "SYSTEM_INTERFACE",
  logic: "CORE_LOGIC",
  client: "USER_INTERFACE"
};

export default function ArchNode({ node, isActive, isDimmed, onClick }: ArchNodeProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: isDimmed ? 1 : 1.02 }}
      className={cn(
        "relative p-4 border transition-all duration-300 cursor-pointer select-none",
        isActive 
          ? "border-accent bg-accent/10 ring-1 ring-accent/30 z-20" 
          : "border-border-dim bg-bg-secondary/80 hover:border-border-bright",
        isDimmed && !isActive && "opacity-20 grayscale scale-[0.98]"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className={cn(
            "type-metadata text-[0.45rem] tracking-widest",
            TYPE_COLORS[node.type] || "text-text-muted"
          )}>
            {TYPE_LABELS[node.type] || "COMPONENT"}
          </span>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            isActive ? "bg-accent pulse" : "bg-border-dim"
          )} />
        </div>
        
        <h4 className="type-label text-[0.65rem] tracking-wider text-text-primary">
          {node.label}
        </h4>
        
        <p className="type-body text-[0.6rem] opacity-40 leading-tight">
          {isActive ? node.description : node.description.substring(0, 40) + "..."}
        </p>
      </div>

      {isActive && (
        <motion.div 
          layoutId="node-glow"
          className="absolute inset-0 bg-accent/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}
