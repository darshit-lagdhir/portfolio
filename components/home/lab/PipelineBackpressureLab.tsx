"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScene } from "@/context/SceneContext";

export default function PipelineBackpressureLab() {
  const [consumerSpeed, setConsumerSpeed] = useState(5); // 1-10
  const [producerQueue, setProducerQueue] = useState<number[]>([]);
  const [backpressure, setBackpressure] = useState(0); // 0-100%
  const { isIdle } = useScene();

  useEffect(() => {
    if (isIdle) return;
    
    const producerInterval = setInterval(() => {
      setProducerQueue(prev => {
        if (prev.length < 15) {
          return [...prev, Math.random()];
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(producerInterval);
  }, [isIdle]);

  useEffect(() => {
    if (isIdle) return;

    const consumerInterval = setInterval(() => {
      setProducerQueue(prev => {
        if (prev.length > 0) {
          return prev.slice(1);
        }
        return prev;
      });
    }, 1100 - (consumerSpeed * 100));

    return () => clearInterval(consumerInterval);
  }, [consumerSpeed, isIdle]);

  useEffect(() => {
    setBackpressure(Math.min(100, (producerQueue.length / 12) * 100));
  }, [producerQueue]);

  return (
    <div className="w-full h-full flex flex-col gap-12 items-center justify-center p-4">
      {/* Pipeline Visualization */}
      <div className="relative w-full max-w-sm h-32 border-y border-border-dim/30 flex items-center px-4 bg-bg-secondary/10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 text-center">
           <div className="type-metadata text-[0.4rem] opacity-30">PRODUCER</div>
           <div className="w-8 h-8 border border-border-dim flex items-center justify-center bg-bg-primary">
              <div className="w-2 h-2 bg-accent animate-pulse" />
           </div>
        </div>

        {/* The Pipeline */}
        <div className="flex-grow h-12 border-x border-border-dim/20 relative flex items-center px-2 gap-2 overflow-hidden">
           {producerQueue.map((id, i) => (
             <motion.div
               key={id}
               layoutId={String(id)}
               className="w-3 h-6 bg-accent/40 border border-accent/20 flex-shrink-0"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
             />
           ))}
           
           {/* Backpressure Overlay */}
           <div 
             className="absolute inset-0 bg-red-500/5 transition-opacity duration-500" 
             style={{ opacity: (backpressure / 100) * 0.5 }} 
           />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 text-center">
           <div className="type-metadata text-[0.4rem] opacity-30">CONSUMER</div>
           <div className="w-8 h-8 border border-border-dim flex items-center justify-center bg-bg-primary">
              <div 
                className="w-2 h-2 bg-accent"
                style={{ opacity: consumerSpeed / 10 }}
              />
           </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 w-full max-w-xs gap-4">
         <div className="module-frame !p-3 text-center">
            <div className="type-metadata text-[0.4rem] opacity-30 mb-1">QUEUE_DEPTH</div>
            <div className="type-emphasis text-sm text-accent">{producerQueue.length} units</div>
         </div>
         <div className="module-frame !p-3 text-center">
            <div className="type-metadata text-[0.4rem] opacity-30 mb-1">PRESSURE</div>
            <div className={cn(
              "type-emphasis text-sm",
              backpressure > 80 ? "text-red-400" : "text-accent"
            )}>{Math.round(backpressure)}%</div>
         </div>
      </div>

      {/* Controls */}
      <div className="module-frame bg-bg-secondary w-full max-w-xs !p-4 space-y-4">
         <div className="flex justify-between items-center">
            <span className="type-metadata text-[0.45rem] opacity-30">CONSUMPTION_RATE</span>
            <span className="type-metadata text-accent font-mono">{consumerSpeed}.0x</span>
         </div>
         <input 
           type="range" 
           min="1" 
           max="10" 
           value={consumerSpeed}
           onChange={(e) => setConsumerSpeed(parseInt(e.target.value))}
           className="w-full accent-accent h-1 bg-border-dim appearance-none cursor-pointer"
         />
         <div className="type-metadata text-[0.4rem] opacity-30 uppercase tracking-widest leading-relaxed">
            Reducing consumer rate simulates bottleneck conditions, triggering architectural backpressure.
         </div>
      </div>
    </div>
  );
}
