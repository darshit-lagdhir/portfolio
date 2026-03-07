/**
 * ARCHITECTURAL MANIFEST — PHASE 33: PROJECT CREDIBILITY SYSTEM
 * 
 * A high-density, minimal visualization layer that connects portfolio
 * systems to real-world engineering telemetry.
 * 
 * Design: Editorial, B&W, High-precision.
 */

"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fetchGitHubData, getProjectStatus, GitHubRepoData } from "@/lib/github-service";

interface ProjectCredibilityProps {
  repoName: string;
  githubUrl: string;
  status?: "Production" | "Prototype" | "Research" | "Experimental";
}

export default function ProjectCredibility({ repoName, githubUrl, status = "Prototype" }: ProjectCredibilityProps) {
  const [data, setData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const result = await fetchGitHubData(repoName);
      setData(result);
      setLoading(false);
    }
    init();
  }, [repoName]);

  const activityStatus = useMemo(() => 
    data ? getProjectStatus(data.updated_at) : "Archived",
    [data]
  );

  return (
    <div className="mt-12 py-8 border-t border-white/5 flex flex-col gap-10">
      {/* STEP 2: METADATA GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-micro font-bold text-white/40 uppercase tracking-[0.4em]">Repository</span>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-mono hover:text-white transition-all overflow-hidden text-ellipsis"
          >
            github.com/{repoName}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-micro font-bold text-white/40 uppercase tracking-[0.4em]">Active Status</span>
          <div className="flex items-center gap-3">
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`w-1.5 h-1.5 rounded-full ${
                activityStatus === "Active" ? "bg-white" : 
                activityStatus === "Recent" ? "bg-white/60" : "bg-white/20"
              }`} 
            />
            <span className="text-xs font-ui tracking-widest">{activityStatus}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-micro font-bold text-white/40 uppercase tracking-[0.4em]">Primary Language</span>
          <span className="text-xs font-ui tracking-widest">{data?.language || "—"}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-micro font-bold text-white/40 uppercase tracking-[0.4em]">Project Maturity</span>
          <span className="text-xs uppercase tracking-tighter italic font-bold">{status}</span>
        </div>
      </div>

      {/* STEP 4 & 5: ACTIVITY AND LANGUAGES */}
      <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
        {/* COMMIT TIMELINE */}
        <div className="w-full lg:flex-1">
          <span className="text-micro font-bold text-white/40 uppercase tracking-[0.4em] block mb-6">Engineering Velocity (Last 12 Weeks)</span>
          <div className="flex items-end gap-1.5 h-10 border-b border-white/5 pb-2">
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 bg-white/5 h-1 animate-pulse" />
              ))
            ) : (
              data?.weeklyActivity.map((count, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.03, ease: "easeOut" }}
                  className="flex-1 bg-white/10 hover:bg-white transition-colors origin-bottom"
                  style={{ height: `${Math.min(100, (count / 5) * 100)}%`, minHeight: '2px' }}
                />
              ))
            )}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="w-full lg:flex-1">
          <span className="text-micro font-bold text-white/40 uppercase tracking-[0.4em] block mb-6">Core Technology Breakdown</span>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {data ? Object.keys(data.languages).slice(0, 4).map(lang => (
              <div key={lang} className="flex items-center gap-3">
                <span className="text-micro font-bold tracking-[0.2em]">{lang}</span>
                <span className="text-[10px] text-white/20 font-mono">
                  {Math.round((data.languages[lang] / Object.values(data.languages).reduce((a, b) => a + b, 0)) * 100)}%
                </span>
              </div>
            )) : (
              <span className="text-xs font-ui italic text-white/10 tracking-widest">
                — Telemetry Synchronizing —
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
