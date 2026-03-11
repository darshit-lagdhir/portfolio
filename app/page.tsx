import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import SystemModules from "@/components/projects/SystemModules";
import SectionContainer from "@/components/shared/SectionContainer";

// --- LAZY-LOADED ARCHITECTURAL NODES ---
// We use dynamic imports to reduce initial bundle size and execution time.
// Loading skeletons match the engineering aesthetic of the portal.
const ExplorationArchive = dynamic(() => import("@/components/home/ExplorationArchive"), { 
  loading: () => <div className="w-full h-[400px] border border-dashed border-border-dim animate-pulse flex items-center justify-center type-metadata opacity-20">INITIALIZING_ARCHIVE_DATA...</div>
});

const SystemLaboratory = dynamic(() => import("@/components/home/SystemLaboratory"), {
  loading: () => <div className="w-full h-[500px] border border-border-dim bg-bg-secondary/10 flex items-center justify-center type-metadata opacity-20">BOOTING_LAB_ENVIRONMENT...</div>
});

const EngineeringDomains = dynamic(() => import("@/components/home/EngineeringDomains"), {
  loading: () => <div className="w-full h-[600px] border border-border-dim flex items-center justify-center type-metadata opacity-20">MAPPING_TECHNICAL_TERRITORY...</div>
});

const EngineeringPhilosophy = dynamic(() => import("@/components/home/EngineeringPhilosophy"));
const SystemComparison = dynamic(() => import("@/components/home/SystemComparison"), {
  loading: () => <div className="w-full h-[500px] border border-border-dim flex items-center justify-center type-metadata opacity-20">COMPUTING_SYSTEM_MATRICES...</div>
});

const FinalReflection = dynamic(() => import("@/components/home/FinalReflection"));
const About = dynamic(() => import("@/components/about/About"));
const TerminalContact = dynamic(() => import("@/components/contact/TerminalContact"));

export default function Home() {
  return (
    <div className="flex flex-col gap-sys-128 lg:gap-sys-192 pb-sys-128">
      {/* 
         MANIFEST_NODE_00: IDENTITY_PROBE
      */}
      <SectionContainer id="hero" noPadding className="pt-0">
        <Hero />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_01: SYSTEM_CATALOGUE
      */}
      <SectionContainer id="systems">
        <SystemModules />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_02: RESEARCH_ARCHIVE
      */}
      <SectionContainer id="archive">
        <ExplorationArchive />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_03: SYSTEM_LABORATORY
      */}
      <SectionContainer id="laboratory">
        <SystemLaboratory />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_04: INTELLECTUAL_DOMAINS
      */}
      <SectionContainer id="domains">
        <EngineeringDomains />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_05: TECHNICAL_MINDSET
      */}
      <SectionContainer id="philosophy">
        <EngineeringPhilosophy />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_06: COMPARATIVE_ANALYSIS
      */}
      <SectionContainer id="comparison">
        <SystemComparison />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_07: HUMAN_CONSTRUCT
      */}
      <SectionContainer id="about">
        <About />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_08: SYSTEM_REFLECTIONS
      */}
      <SectionContainer id="reflections" noPadding>
        <FinalReflection />
      </SectionContainer>

      {/* 
         MANIFEST_NODE_09: CONNECTION_BUS
      */}
      <SectionContainer id="contact">
        <TerminalContact />
      </SectionContainer>

      <footer className="system-container py-sys-64 border-t border-border-dim/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[0.6rem] font-mono tracking-widest">
           <span>© 2026 DARSHIT_LAGDHIR_SYSTEMS</span>
           <div className="flex gap-8">
              <span>LATENCY: 0.00ms</span>
              <span>STATE: STABLE</span>
              <span>VER: 3.1.2</span>
           </div>
        </div>
      </footer>

      {/* Visual Anchor Metadata */}
      <div className="fixed bottom-sys-32 left-sys-32 pointer-events-none z-50">
        <div className="type-metadata opacity-10 text-[0.5rem] bg-bg-primary/80 backdrop-blur-sm p-1 eng-bracket">
          COORDS: 12.97°N 77.59°E // BENGALURU_SYSTEMS
        </div>
      </div>
    </div>
  );
}
