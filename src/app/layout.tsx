import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "FASHLINK — Direction Créative IA",
  description:
    "Plateforme de direction créative, moodboard et certification pour stylistes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
