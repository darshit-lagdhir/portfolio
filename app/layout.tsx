import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AmbientGradient from "@/components/ui/AmbientGradient";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata = {
  title: "Darshit Lagdhir — Digital Architect",
  description:
    "Creative Developer Portfolio of Darshit Lagdhir. Systems engineering meets high-fidelity digital performance.",
  openGraph: {
    title: "Darshit Lagdhir — Digital Architect",
    description: "Systems engineering meets high-fidelity digital performance.",
    url: "https://darshitlagdhir.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="selection:bg-indigo-500 selection:text-white">
      <body className="bg-[#fafafa] text-neutral-900 dark:bg-[#050505] dark:text-neutral-50 transition-colors duration-[1500ms] antialiased overflow-x-hidden">
        <ThemeProvider>
          <SmoothScroll>
            {/* Layered Saturation Environment */}
            <AmbientGradient />
            <CustomCursor />
            <Navbar />

            <main className="relative z-10">{children}</main>

            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
