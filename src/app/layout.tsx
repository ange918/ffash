import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cosmetics Shop — Soins & Beauté au Bénin",
  description: "Boutique de cosmétiques spécialisée dans les soins corporels et visage au Bénin. Savons, laits, crèmes, gels de douche et gammes spécialisées.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${unbounded.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDFAF8", color: "#3A2A35", fontFamily: "var(--font-montserrat)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
