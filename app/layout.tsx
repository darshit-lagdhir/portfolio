import type { Metadata } from "next";
import "./globals.css";
import { fornire, ranade, panchang, hkGroteskWide } from "@/lib/fonts";
import { SceneProvider } from "@/context/SceneContext";
import NavigationDock from "@/components/layout/NavigationDock";
import SmoothScroll from "@/components/layout/SmoothScroll";
import SystemBackground from "@/components/layout/SystemBackground";
import Cursor from "@/components/layout/Cursor";

export const metadata: Metadata = {
  title: "Darshit Lagdhir | Systems Engineer",
  description: "Architectural portfolio of Darshit Lagdhir, focusing on systems thinking and high-performance digital environments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${fornire.variable} ${ranade.variable} ${panchang.variable} ${hkGroteskWide.variable}`}
    >
      <body className="antialiased bg-bg-primary text-text-primary overflow-x-hidden selection:bg-accent selection:text-white">
        <SceneProvider>
          {/* Phase 3: System Grid Background Engine */}
          <SystemBackground />
          
          {/* Phase 13: Custom Cursor System */}
          <Cursor />
          
          {/* Phase 4: Global Navigation Dock */}
          <NavigationDock />

          <div className="relative min-h-screen flex flex-col">
            {/* Phase 5: Scroll Behavior Infrastructure */}
            <SmoothScroll>
              {/* Phase 1: Main Content Container */}
              <main className="flex-grow pt-sys-64 lg:pt-0">
                {children}
              </main>
            </SmoothScroll>
          </div>
        </SceneProvider>
      </body>
    </html>
  );
}
