import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AmbientGradient from "@/components/ui/AmbientGradient";

export const metadata = {
  title: "Darshit Lagdhir — Systems-Focused Developer",
  description:
    "Portfolio of Darshit Lagdhir. Backend systems, clean architecture, and practical engineering under real constraints.",
  openGraph: {
    title: "Darshit Lagdhir — Systems-Focused Developer",
    description:
      "Backend systems, clean architecture, and practical engineering.",
    url: "https://darshitlagdhir.dev",
    type: "website",
  },
  other: {
    "profile:username": "darshit-lagdhir",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300 antialiased">
        <ThemeProvider>
          <AmbientGradient />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
