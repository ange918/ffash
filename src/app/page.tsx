"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-white border-b border-black">
        <span
          className="text-sm tracking-[0.3em] uppercase font-black"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FASHLINK
        </span>
        <nav className="flex items-center gap-8">
          <Link href="/auth/signin" className="relative group text-xs tracking-widest uppercase font-semibold">
            CONNEXION
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/auth/signup" className="relative group text-xs tracking-widest uppercase font-semibold">
            S&apos;INSCRIRE
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-8 pt-32 pb-20 min-h-screen relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl"
          >
            <h1
              className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-8 whitespace-pre-line"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {"L'IA AU SERVICE\nDE VOTRE VISION"}
            </h1>
            <p className="text-base md:text-lg tracking-wide mb-12 font-semibold max-w-lg mx-auto">
              Plateforme de direction créative, moodboard et certification pour stylistes.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/signup"
                className="inline-block bg-black text-white text-xs tracking-widest uppercase px-10 py-4 font-semibold border border-black hover:bg-white hover:text-black transition-colors duration-200"
              >
                COMMENCER GRATUITEMENT
              </Link>
            </motion.div>
          </motion.div>

          {/* Vertical rotated text */}
          <div
            className="absolute bottom-8 left-8 text-[10px] tracking-widest text-black/40 font-semibold"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            FASHLINK © 2025
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-[1px] bg-black" />

        {/* Features Section */}
        <section className="px-8 py-20">
          <h2
            className="text-2xl md:text-3xl font-black mb-16 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            CE QUE FASHLINK FAIT POUR VOUS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border border-black p-8 -ml-[1px] -mt-[1px]"
              >
                <span
                  className="text-5xl font-black text-black/10 block mb-4 leading-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-sm font-black mb-3 tracking-wide uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed text-black/70 font-semibold">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-8 flex items-center justify-center">
          <span
            className="text-white text-sm tracking-[0.4em] font-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            FASHLINK
          </span>
        </footer>
      </main>
    </div>
  );
}

const features = [
  {
    title: "PROFIL ADN",
    desc: "Définissez votre identité créative unique",
  },
  {
    title: "DIRECTION IA",
    desc: "Collections, palettes, matières générées par l'IA",
  },
  {
    title: "CROQUIS → ILLUSTRATION",
    desc: "Transformez vos esquisses en visuels 2D",
  },
  {
    title: "INVENTAIRE MATÉRIAUX",
    desc: "Liste et budget de vos matériaux automatiquement",
  },
  {
    title: "CERTIFICAT",
    desc: "Prouvez l'antériorité de vos créations",
  },
];
