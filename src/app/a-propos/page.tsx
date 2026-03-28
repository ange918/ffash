"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Leaf, Droplets, Sparkles, Heart, Award, Users, Zap, MapPin, Package } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: i * 0.12 },
  }),
};

const valeurs = [
  { icon: <Award size={36} color="#E8739A" />, titre: "Qualité", desc: "Des formules soigneusement sélectionnées pour des résultats visibles et durables." },
  { icon: <Leaf size={36} color="#E8739A" />, titre: "Naturalité", desc: "Des ingrédients respectueux de votre peau et de votre bien-être au quotidien." },
  { icon: <Users size={36} color="#E8739A" />, titre: "Proximité", desc: "Une relation client directe, humaine et réactive — commandez sur WhatsApp en quelques secondes." },
  { icon: <Sparkles size={36} color="#E8739A" />, titre: "Inclusivité", desc: "Des produits pensés pour toutes les carnations, tous les types de peau, sans exception." },
  { icon: <Heart size={36} color="#E8739A" />, titre: "Fierté", desc: "Une boutique fière de servir et sublimer la beauté africaine." },
  { icon: <Zap size={36} color="#E8739A" />, titre: "Accessibilité", desc: "Des prix justes pour que chaque femme accède à des soins de qualité supérieure." },
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
      <section className="py-16 sm:py-24 px-4 sm:px-8 text-center" style={{ background: "linear-gradient(135deg, #FDE8EF, #EDE0F0)" }}>
        <div className="max-w-3xl mx-auto">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#E8739A", fontSize: "0.78rem", letterSpacing: "0.3em", marginBottom: "1.2rem" }}>
            ✦ Notre Histoire
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "clamp(2rem,5vw,4rem)", color: "#3A2A35", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Beauté pensée{" "}
            <em style={{ fontWeight: 600, color: "#C94F78", fontStyle: "italic" }}>pour vous</em>
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "clamp(0.9rem,2vw,1rem)", lineHeight: 1.9, maxWidth: "600px", margin: "0 auto" }}>
            Cosmetics Shop, c'est une passion pour le soin, la beauté naturelle et la confiance en soi — au cœur du Bénin.
          </motion.p>
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section className="py-12 sm:py-20 px-4 sm:px-8" style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#E8739A", fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>— Notre Histoire</p>
            <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, fontSize: "clamp(1.5rem,3.5vw,3rem)", color: "#3A2A35", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Une boutique née <em style={{ color: "#C94F78", fontStyle: "italic" }}>de la passion</em>
            </h2>
            <div style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.95rem", lineHeight: 1.95 }} className="flex flex-col gap-4">
              <p>Cosmetics Shop est née d'une conviction simple : chaque peau mérite des soins adaptés, efficaces et accessibles. Fondée au Bénin, notre boutique s'est donnée pour mission de proposer une gamme complète de cosmétiques pour tous les types de peau, tous les teints, tous les besoins.</p>
              <p>De la peau ébène à la peau claire, de la peau grasse à la peau sensible, nous avons sélectionné et développé plus de 100 produits — savons, laits, crèmes, gommages, gels de douche et gammes spécialisées — pour accompagner chaque femme, chaque homme, chaque enfant dans sa routine beauté quotidienne.</p>
              <p>Notre engagement : la qualité, la transparence et la proximité. Parce que la beauté n'a pas de couleur unique.</p>
            </div>
          </motion.div>

          {/* Visuel — masqué sur mobile, visible sur lg+ */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }} className="hidden lg:flex items-center justify-center relative" style={{ minHeight: "400px" }}>
            <div className="relative" style={{ width: "360px", height: "360px" }}>
              <div style={{ width: "360px", height: "360px", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                <Image src="/images/product-placeholder.png" alt="Cosmetics Shop" fill className="object-cover" unoptimized />
              </div>
              <span className="animate-float absolute -top-4 right-4 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}><Leaf size={12} color="#E8739A" /> Naturel</span>
              <span className="animate-float-delay-1 absolute -left-14 top-1/4 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}><Droplets size={12} color="#E8739A" /> Hydratant</span>
              <span className="animate-float-delay-2 absolute -right-10 bottom-1/3 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}><Sparkles size={12} color="#E8739A" /> Éclaircissant</span>
              <span className="animate-float-delay-3 absolute -bottom-4 left-8 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.72rem" }}><Heart size={12} color="#E8739A" /> Pour toutes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NOS VALEURS */}
      <section className="py-12 sm:py-20 px-4 sm:px-8" style={{ backgroundColor: "#FDE8EF" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
            style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.5rem,3vw,2.5rem)" }}
          >
            Nos Valeurs
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {valeurs.map((v, i) => (
              <motion.div
                key={v.titre}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }} viewport={{ once: true }}
                className="text-center p-6 sm:p-10 transition-all duration-300"
                style={{ backgroundColor: "white", borderRadius: "20px", boxShadow: "0 4px 20px rgba(232,115,154,0.08)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center justify-center mx-auto mb-5" style={{ width: "72px", height: "72px", backgroundColor: "#FDE8EF", borderRadius: "50%" }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "1rem", marginBottom: "0.75rem" }}>{v.titre}</h3>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.85rem", lineHeight: 1.8 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="py-12 sm:py-20 px-4 sm:px-8" style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
            style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.5rem,3vw,2.5rem)" }}
          >
            Cosmetics Shop en chiffres
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {chiffres.map((c, i) => {
              const rightOnMobile = i % 2 === 0;
              const rightOnDesktop = i < 3;
              const bottomOnMobile = i < 2;
              return (
                <div
                  key={c.label}
                  className={[
                    "text-center py-8 sm:py-12",
                    rightOnMobile ? "border-r" : "",
                    !rightOnMobile && rightOnDesktop ? "md:border-r" : "",
                    bottomOnMobile ? "border-b md:border-b-0" : "",
                    i === 3 ? "md:border-r-0" : "",
                  ].join(" ")}
                  style={{ borderColor: "#FDE8EF" }}
                >
                  <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, color: "#C94F78", fontSize: "clamp(2rem,5vw,4rem)" }}>
                    <AnimatedCount target={c.value} suffix={c.suffix} />
                  </p>
                  <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.78rem", letterSpacing: "0.1em", marginTop: "0.5rem" }}>{c.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT WHATSAPP */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 text-center" style={{ background: "linear-gradient(135deg, #C94F78, #8A5A8A)" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <FaWhatsapp size={56} color="white" style={{ marginBottom: "1.5rem", display: "inline-block" }} />
          <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "white", fontSize: "clamp(1.5rem,3.5vw,3rem)", marginBottom: "1rem" }}>
            Un service pensé <em style={{ fontStyle: "italic", color: "#F4B8CB" }}>pour vous</em>
          </h2>
          <p style={{ fontFamily: "var(--font-montserrat)", color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.9rem,2vw,1rem)", lineHeight: 1.9, maxWidth: "560px", margin: "0 auto 2rem" }}>
            Pas besoin de créer un compte ou de remplir de longs formulaires. Chez Cosmetics Shop, commander est aussi simple qu'envoyer un message. Choisissez vos produits, ajoutez-les au panier, et envoyez votre commande directement sur WhatsApp. Nous vous répondons rapidement et organisons la livraison partout.
          </p>
          <a
            href="https://wa.me/22940696034?text=Bonjour Cosmetics Shop, je souhaite passer une commande !"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 transition-colors duration-200"
            style={{ backgroundColor: "white", color: "#C94F78", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 700 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDE8EF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white")}
          >
            💬 Commander sur WhatsApp maintenant
          </a>
        </motion.div>
      </section>

      {/* ÉQUIPE / CONTACT RAPIDE */}
      <section className="py-12 sm:py-20 px-4 sm:px-8" style={{ backgroundColor: "#FDFAF8" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-12">
            <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.4rem,3vw,2.2rem)", marginBottom: "0.75rem" }}>
              Nous sommes là pour vous
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "clamp(0.85rem,2vw,0.9rem)" }}>
              Une question sur un produit ? Un doute sur votre type de peau ? Notre équipe vous conseille personnellement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              { icon: <FaWhatsapp size={28} color="#E8739A" />, titre: "WhatsApp", info: "Disponible Lun–Sam 8h–20h", lien: "Écrire sur WhatsApp →", href: "https://wa.me/22940696034" },
              { icon: <MapPin size={28} color="#E8739A" />, titre: "Localisation", info: "Cotonou, Bénin", lien: "Voir sur la carte →", href: "https://maps.google.com/?q=Cotonou+Bénin" },
              { icon: <Package size={28} color="#E8739A" />, titre: "Livraison", info: "Livraison rapide", lien: "En savoir plus →", href: "/contact" },
            ].map((c, i) => (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center p-6 sm:p-8 transition-all duration-300"
                style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 16px rgba(232,115,154,0.08)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center justify-center mx-auto mb-4" style={{ width: "64px", height: "64px", backgroundColor: "#FDE8EF", borderRadius: "50%" }}>
                  {c.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.95rem", marginBottom: "0.4rem" }}>{c.titre}</h3>
                <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{c.info}</p>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#E8739A", fontSize: "0.82rem" }}>
                  {c.lien}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/catalogue"
              className="px-6 sm:px-8 py-3.5 sm:py-4 text-white transition-colors duration-200"
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
