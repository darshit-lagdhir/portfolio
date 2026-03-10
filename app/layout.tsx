"use client";

import "./globals.css";
import { fornire, ranade, panchang, hkGroteskWide } from "@/lib/fonts";
import { SceneProvider } from "@/context/SceneContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${fornire.variable} ${ranade.variable} ${panchang.variable} ${hkGroteskWide.variable}`}
    >
      <body className="antialiased bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
        <SceneProvider>
          <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </SceneProvider>
      </body>
    </html>
  );
}

