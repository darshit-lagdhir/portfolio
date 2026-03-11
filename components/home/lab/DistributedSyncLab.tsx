"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DistributedSyncLab() {
  const [latency, setLatency] = useState(2); // 1-10 scale
  const [packets, setPackets] = useState<{ id: number; state: 'ready' | 'syncing' | 'complete' }[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const controls = useAnimation();

  const initiateSync = useCallback(() => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    // Simulate 4 packets being sent to nodes
    const newPackets = [1, 2, 3, 4].map(id => ({ id, state: 'syncing' as const }));
    setPackets(newPackets);

    // Timeout based on latency
    setTimeout(() => {
      setPackets(prev => prev.map(p => ({ ...p, state: 'complete' })));
      setIsSyncing(false);
    }, latency * 500);
  }, [latency, isSyncing]);

  return (
    <div className="w-full h-full flex flex-col gap-12 items-center justify-center p-4">
      {/* Simulation Area */}
      <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
        {/* Central Orchestrator */}
        <div className="w-16 h-16 border-2 border-accent bg-bg-primary rounded-full flex items-center justify-center relative z-10">
           <div className={cn(
             "w-3 h-3 bg-accent rounded-full",
             isSyncing && "animate-ping"
           )} />
           <div className="absolute -top-6 type-metadata text-[0.4rem] opacity-40">ORCHESTRATOR_NODE</div>
        </div>

        {/* Worker Nodes */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 120;
          const y = Math.sin(angle) * 120;
          
          return (
            <div 
              key={i}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute w-10 h-10 border border-border-bright bg-bg-secondary flex items-center justify-center"
            >
               <div className={cn(
                 "w-1.5 h-1.5 transition-colors duration-500",
                 packets[i]?.state === 'complete' ? "bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" : "bg-border-dim"
               )} />
               
               {/* Packet Animation */}
               {isSyncing && (
                 <motion.div
                   initial={{ scale: 0, x: -x, y: -y }}
                   animate={{ scale: [0, 1, 0], x: 0, y: 0 }}
                   transition={{ 
                     duration: latency * 0.5, 
                     ease: "easeInOut",
                     repeat: 0
                   }}
                   className="absolute w-2 h-2 bg-accent/40 rounded-full"
                 />
               )}
            </div>
          );
        })}

        {/* Connection Traces */}
        <svg className="absolute inset-0 w-full h-full -z-0 opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.2" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Controls */}
      <div className="module-frame !bg-bg-primary/60 backdrop-blur-md w-full max-w-xs !p-4 space-y-4">
         <div className="flex justify-between items-center">
            <span className="type-metadata text-[0.45rem] opacity-30">NETWORK_LATENCY</span>
            <span className="type-metadata text-accent font-mono">{latency * 100}ms</span>
         </div>
         <input 
           type="range" 
           min="1" 
           max="10" 
           value={latency}
           onChange={(e) => setLatency(parseInt(e.target.value))}
           className="w-full accent-accent h-1 bg-border-dim appearance-none cursor-pointer"
         />
         <button
           onClick={initiateSync}
           disabled={isSyncing}
           className="w-full py-2 bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-all text-accent type-metadata text-[0.6rem] tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
         >
           {isSyncing ? "SYNCING..." : "TRIGGER_BROADCAST"}
         </button>
      </div>
    </div>
  );
}
