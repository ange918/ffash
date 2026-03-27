"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
};

const valeurs = [
  { emoji: "💎", titre: "Qualité", desc: "Des formules soigneusement sélectionnées pour des résultats visibles et durables." },
  { emoji: "🌿", titre: "Naturalité", desc: "Des ingrédients respectueux de votre peau et de votre bien-être au quotidien." },
  { emoji: "🤝", titre: "Proximité", desc: "Une relation client directe, humaine et réactive — commandez sur WhatsApp en quelques secondes." },
  { emoji: "✨", titre: "Inclusivité", desc: "Des produits pensés pour toutes les carnations, tous les types de peau, sans exception." },
  { emoji: "🇧🇯", titre: "Fierté Béninoise", desc: "Une boutique ancrée au Bénin, fière de servir et sublimer la beauté africaine." },
  { emoji: "🚀", titre: "Accessibilité", desc: "Des prix justes pour que chaque femme accède à des soins de qualité supérieure." },
];

const chiffres = [
  { value: 100, suffix: "+", label: "Produits disponibles" },
  { value: 12, suffix: "+", label: "Gammes spécialisées" },
  { value: 500, suffix: "+", label: "Clientes satisfaites" },
  { value: 1, suffix: "", label: "Passion : la beauté" },
];

function AnimatedCount({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const inc = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AProposPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #FDE8EF, #EDE0F0)", padding: "7rem 2rem", textAlign: "center" }}>
        <div className="max-w-3xl mx-auto">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#E8739A", fontSize: "0.78rem", letterSpacing: "0.3em", marginBottom: "1.2rem" }}>
            ✦ Notre Histoire
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "clamp(2.5rem,5vw,4rem)", color: "#3A2A35", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Beauté pensée{" "}
            <em style={{ fontWeight: 600, color: "#C94F78", fontStyle: "italic" }}>pour vous</em>
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "1rem", lineHeight: 1.9, maxWidth: "600px", margin: "0 auto" }}>
            Cosmetics Shop, c'est une passion pour le soin, la beauté naturelle et la confiance en soi — au cœur du Bénin.
          </motion.p>
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section style={{ backgroundColor: "white", padding: "6rem 2rem" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#E8739A", fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>— Notre Histoire</p>
            <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "#3A2A35", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Une boutique née <em style={{ color: "#C94F78", fontStyle: "italic" }}>de la passion</em>
            </h2>
            <div style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.95rem", lineHeight: 1.95 }} className="flex flex-col gap-4">
              <p>Cosmetics Shop est née d'une conviction simple : chaque peau mérite des soins adaptés, efficaces et accessibles. Fondée au Bénin, notre boutique s'est donnée pour mission de proposer une gamme complète de cosmétiques pour tous les types de peau, tous les teints, tous les besoins.</p>
              <p>De la peau ébène à la peau claire, de la peau grasse à la peau sensible, nous avons sélectionné et développé plus de 100 produits — savons, laits, crèmes, gommages, gels de douche et gammes spécialisées — pour accompagner chaque femme, chaque homme, chaque enfant dans sa routine beauté quotidienne.</p>
              <p>Notre engagement : la qualité, la transparence et la proximité. Parce que la beauté n'a pas de couleur unique.</p>
            </div>
          </motion.div>

          {/* Visuel */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }} className="flex items-center justify-center relative" style={{ minHeight: "400px" }}>
            <div className="relative flex items-center justify-center" style={{ width: "360px", height: "360px", backgroundColor: "#FDE8EF", borderRadius: "50%" }}>
              <div style={{ position: "absolute", inset: "20px", border: "1px solid rgba(244,184,203,0.3)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", inset: "40px", border: "1px solid rgba(244,184,203,0.3)", borderRadius: "50%" }} />
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M40 15C40 15 28 25 28 35C28 41.627 33.373 47 40 47C46.627 47 52 41.627 52 35C52 25 40 15 40 15Z" fill="#E8739A"/>
                <path d="M40 47C40 47 20 50 18 60C17 65 21 70 27 71C33 72 38 68 40 63" fill="#C94F78"/>
                <path d="M40 47C40 47 60 50 62 60C63 65 59 70 53 71C47 72 42 68 40 63" fill="#C9A0C4"/>
                <path d="M35 60C32 65 35 72 40 72C45 72 48 65 45 60" fill="#F4B8CB"/>
              </svg>
              <span className="animate-float absolute -top-2 right-8 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}>🌿 Naturel</span>
              <span className="animate-float-delay-1 absolute -left-12 top-1/4 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}>💧 Hydratant</span>
              <span className="animate-float-delay-2 absolute -right-6 bottom-1/4 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}>✨ Éclaircissant</span>
              <span className="animate-float-delay-3 absolute bottom-0 left-8 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}>💕 Pour toutes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NOS VALEURS */}
      <section style={{ backgroundColor: "#FDE8EF", padding: "6rem 2rem" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-12"
            style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.8rem,3vw,2.5rem)" }}
          >
            Nos Valeurs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valeurs.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }} viewport={{ once: true }}
                className="text-center p-10 transition-all duration-300"
                style={{ backgroundColor: "white", borderRadius: "20px", boxShadow: "0 4px 20px rgba(232,115,154,0.08)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center justify-center mx-auto mb-5" style={{ width: "72px", height: "72px", backgroundColor: "#FDE8EF", borderRadius: "50%", fontSize: "36px" }}>
                  {v.emoji}
                </div>
                <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "1rem", marginBottom: "0.75rem" }}>{v.titre}</h3>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.85rem", lineHeight: 1.8 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section style={{ backgroundColor: "white", padding: "5rem 2rem" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-12"
            style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.8rem,3vw,2.5rem)" }}
          >
            Cosmetics Shop en chiffres
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {chiffres.map((c, i) => (
              <div key={c.label} className="text-center py-12" style={{ borderRight: i < 3 ? "1px solid #FDE8EF" : "none" }}>
                <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, color: "#C94F78", fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  <AnimatedCount target={c.value} suffix={c.suffix} />
                </p>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.82rem", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT WHATSAPP */}
      <section style={{ background: "linear-gradient(135deg, #C94F78, #8A5A8A)", padding: "5rem 2rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="white" style={{ marginBottom: "1.5rem", display: "inline-block" }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "white", fontSize: "clamp(1.8rem,3.5vw,3rem)", marginBottom: "1rem" }}>
            Un service pensé <em style={{ fontStyle: "italic", color: "#F4B8CB" }}>pour vous</em>
          </h2>
          <p style={{ fontFamily: "var(--font-montserrat)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.9, maxWidth: "560px", margin: "0 auto 2rem" }}>
            Pas besoin de créer un compte ou de remplir de longs formulaires. Chez Cosmetics Shop, commander est aussi simple qu'envoyer un message. Choisissez vos produits, ajoutez-les au panier, et envoyez votre commande directement sur WhatsApp. Nous vous répondons rapidement et organisons la livraison partout au Bénin.
          </p>
          <a
            href="https://wa.me/22900000000?text=Bonjour Cosmetics Shop, je souhaite passer une commande !"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 transition-colors duration-200"
            style={{ backgroundColor: "white", color: "#C94F78", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 700 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDE8EF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white")}
          >
            💬 Commander sur WhatsApp maintenant
          </a>
        </motion.div>
      </section>

      {/* ÉQUIPE / CONTACT RAPIDE */}
      <section style={{ backgroundColor: "#FDFAF8", padding: "5rem 2rem" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: "0.75rem" }}>
              Nous sommes là pour vous
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.9rem" }}>
              Une question sur un produit ? Un doute sur votre type de peau ? Notre équipe vous conseille personnellement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { emoji: "📱", titre: "WhatsApp", info: "Disponible Lun–Sam 8h–20h", lien: "Écrire sur WhatsApp →", href: "https://wa.me/22900000000" },
              { emoji: "📍", titre: "Localisation", info: "Cotonou, Bénin", lien: "Voir sur la carte →", href: "https://maps.google.com/?q=Cotonou+Bénin" },
              { emoji: "📦", titre: "Livraison", info: "Partout au Bénin", lien: "En savoir plus →", href: "/contact" },
            ].map((c, i) => (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center p-8 transition-all duration-300"
                style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 16px rgba(232,115,154,0.08)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center justify-center mx-auto mb-4" style={{ width: "64px", height: "64px", backgroundColor: "#FDE8EF", borderRadius: "50%", fontSize: "28px" }}>
                  {c.emoji}
                </div>
                <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.95rem", marginBottom: "0.4rem" }}>{c.titre}</h3>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{c.info}</p>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#E8739A", fontSize: "0.82rem" }}
                  className="hover:text-rose-fonce transition-colors">
                  {c.lien}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/catalogue"
              className="px-8 py-4 text-white transition-colors duration-200"
              style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C94F78")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8739A")}
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
