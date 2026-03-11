"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROLES = ["ADMIN", "FRANCHISEE", "STAFF", "CUSTOMER"];
const RESOURCES = ["SYS_LOGS", "FLEET_DSIPATCH", "SHIPMENT_VIEW", "USER_PROFILE"];

const PERMISSIONS: Record<string, string[]> = {
  "ADMIN": ["SYS_LOGS", "FLEET_DSIPATCH", "SHIPMENT_VIEW", "USER_PROFILE"],
  "FRANCHISEE": ["FLEET_DSIPATCH", "SHIPMENT_VIEW", "USER_PROFILE"],
  "STAFF": ["SHIPMENT_VIEW", "USER_PROFILE"],
  "CUSTOMER": ["USER_PROFILE"]
};

export default function AuthBoundaryLab() {
  const [activeRole, setActiveRole] = useState("CUSTOMER");
  const [isStrictEnabled, setIsStrictEnabled] = useState(false);

  const checkAccess = (role: string, resource: string) => {
    const hasBase = PERMISSIONS[role].includes(resource);
    if (!isStrictEnabled && role === "STAFF" && resource === "FLEET_DSIPATCH") return true; // Simulate a vulnerability
    return hasBase;
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center p-4">
      {/* Role Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
         {ROLES.map(role => (
           <button
             key={role}
             onClick={() => setActiveRole(role)}
             className={cn(
               "px-3 py-1.5 border type-metadata text-[0.45rem] tracking-widest transition-all",
               activeRole === role ? "border-accent bg-accent/10 text-accent" : "border-border-dim opacity-40 hover:opacity-100"
             )}
           >
             {role}
           </button>
         ))}
      </div>

      {/* Access Matrix */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
         {RESOURCES.map(res => {
           const hasAccess = checkAccess(activeRole, res);
           const isVuln = !isStrictEnabled && activeRole === "STAFF" && res === "FLEET_DSIPATCH";

           return (
             <div 
               key={res}
               className={cn(
                 "module-frame !p-4 flex flex-col items-center gap-3 transition-opacity duration-500",
                 hasAccess ? "opacity-100" : "opacity-20"
               )}
             >
                <div className="type-metadata text-[0.4rem] opacity-30">{res}</div>
                <div className={cn(
                  "w-6 h-6 border flex items-center justify-center relative",
                  hasAccess ? "border-accent" : "border-border-dim"
                )}>
                   {hasAccess ? (
                     <div className={cn(
                       "w-2 h-2",
                       isVuln ? "bg-red-400 animate-pulse" : "bg-accent"
                     )} />
                   ) : (
                     <div className="w-4 h-[1px] bg-border-dim rotate-45 absolute" />
                   )}
                </div>
                {isVuln && (
                  <div className="type-metadata text-[0.35rem] text-red-400">LEAK_DETECTED</div>
                )}
             </div>
           );
         })}
      </div>

      {/* Controls */}
      <div className="module-frame bg-bg-secondary w-full max-w-xs !p-5 space-y-4">
         <div className="flex justify-between items-center">
            <span className="type-metadata text-[0.45rem] opacity-30 uppercase tracking-widest font-mono">ENFORCE_STRICT_RBAC</span>
            <button 
              onClick={() => setIsStrictEnabled(!isStrictEnabled)}
              className={cn(
                "w-10 h-5 border rounded-full relative transition-colors",
                isStrictEnabled ? "bg-accent/40 border-accent" : "bg-bg-primary border-border-dim"
              )}
            >
               <motion.div 
                 animate={{ x: isStrictEnabled ? 20 : 0 }}
                 className="w-4 h-4 bg-white absolute top-0 left-0 rounded-full"
               />
            </button>
         </div>
         <div className="type-metadata text-[0.4rem] opacity-30 leading-relaxed">
            Toggling strict enforcement patches the &apos;STAFF&apos; privilege escalation boundary, ensuring rigid security isolation across the system manifest.
         </div>
      </div>
    </div>
  );
}
