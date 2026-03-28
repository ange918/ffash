"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, Shield, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
};

const categoryCards = [
  { image: "/images/savons.png", label: "Savons Corporels", count: 10, val: "Savons Corporels" },
  { image: "/images/laits.png", label: "Laits Corporels", count: 9, val: "Laits Corporels" },
  { image: "/images/cremes.png", label: "Crèmes & Lotions Visage", count: 11, val: "Crèmes Visage" },
  { image: "/images/gels.png", label: "Gels de Douche", count: 10, val: "Gels de Douche" },
  { image: "/images/gommages.png", label: "Gommages", count: 5, val: "Gommages" },
  { image: "/images/levres.png", label: "Kits Lèvres Roses", count: 5, val: "Lèvres Roses" },
  { image: "/images/laits.png", label: "Gammes Spéciales", count: 30, val: "Gammes de Teint" },
  { image: "/images/cremes.png", label: "Anti-Imperfections", count: 11, val: "Anti-Imperfections" },
  { image: "/images/minceur.png", label: "Minceur & Rondeurs", count: 9, val: "Minceur" },
];

const bestsellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);

const stats = [
  { icon: <Star size={20} color="#C94F78" />, value: "100+", label: "Produits disponibles" },
  { icon: <Sparkles size={20} color="#C94F78" />, value: "12+", label: "Gammes spécialisées" },
  { icon: <Shield size={20} color="#C94F78" />, value: "Toutes", label: "Peaux sublimées" },
  { icon: <Truck size={20} color="#C94F78" />, value: "🇧🇯", label: "Livraison au Bénin" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt="Cosmetics Shop hero"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(253,232,239,0.92) 0%, rgba(237,224,240,0.85) 50%, rgba(253,232,239,0.7) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.p
              custom={0} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#E8739A", fontSize: "0.78rem", letterSpacing: "0.3em", marginBottom: "1.2rem" }}
            >
              ✦ Soin · Beauté · Confiance
            </motion.p>
            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontFamily: "var(--font-unbounded)", fontSize: "clamp(2.2rem,5vw,4.5rem)", color: "#3A2A35", lineHeight: 1.1, marginBottom: "1.5rem" }}
            >
              Révélez votre{" "}
              <em style={{ color: "#C94F78", fontStyle: "italic", display: "block" }}>beauté naturelle</em>
            </motion.h1>
            <motion.p
              custom={2} initial="hidden" animate="visible" variants={fadeUp}
              style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#3A2A35", fontSize: "1rem", lineHeight: 1.85, marginBottom: "2rem", maxWidth: "480px", opacity: 0.8 }}
            >
              Des soins cosmétiques de qualité pour toutes les peaux — corps, visage, et gammes spécialisées livrés au Bénin.
            </motion.p>
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="flex items-center gap-2 px-8 py-3.5 text-white font-semibold transition-colors duration-200"
                style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C94F78")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8739A")}
              >
                Voir le catalogue
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/22900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 transition-colors duration-200"
                style={{ border: "1.5px solid #E8739A", color: "#C94F78", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, backgroundColor: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDE8EF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.7)")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Commander sur WhatsApp
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              {["✓ Livraison au Bénin", "✓ Qualité garantie", "✓ Paiement à la livraison"].map((b) => (
                <span key={b} style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C94F78", fontSize: "0.75rem", backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "999px", padding: "0.3rem 0.9rem", border: "1px solid rgba(232,115,154,0.2)" }}>
                  {b}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Floating badges */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="hidden md:flex items-center justify-center relative" style={{ minHeight: "400px" }}>
            <div className="relative" style={{ width: "340px", height: "340px" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", boxShadow: "0 20px 60px rgba(232,115,154,0.2)", position: "relative" }}>
                <Image src="/images/product-placeholder.png" alt="Produit vedette" fill className="object-cover" unoptimized />
              </div>
              <span className="animate-float absolute -top-4 -right-6 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#3A2A35", fontSize: "0.72rem" }}>
                💧 Hydratant
              </span>
              <span className="animate-float-delay-1 absolute -left-8 top-1/3 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#3A2A35", fontSize: "0.72rem" }}>
                ✨ Éclaircissant
              </span>
              <span className="animate-float-delay-2 absolute -bottom-4 right-4 px-4 py-2 bg-white rounded-full shadow-lg" style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#3A2A35", fontSize: "0.72rem" }}>
                🌿 Naturel
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #FDE8EF", borderBottom: "1px solid #FDE8EF" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-around gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-center flex-col sm:flex-row sm:text-left">
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#FDE8EF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, color: "#C94F78", fontSize: "1.8rem", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 400, color: "#7A6070", fontSize: "0.78rem" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATÉGORIES */}
      <section style={{ backgroundColor: "#FDFAF8", padding: "5rem 1.5rem" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.8rem,3vw,2.5rem)", marginBottom: "0.8rem" }}>
              Nos Catégories
            </h2>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070" }}>Découvrez notre sélection de soins pour toutes les peaux</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((c, i) => (
              <motion.div
                key={c.val}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.06 }} viewport={{ once: true }}
              >
                <Link
                  href={`/catalogue?categorie=${encodeURIComponent(c.val)}`}
                  className="block overflow-hidden transition-all duration-300 group"
                  style={{ backgroundColor: "white", borderRadius: "20px", boxShadow: "0 4px 20px rgba(232,115,154,0.08)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 40px rgba(232,115,154,0.16)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(232,115,154,0.08)";
                  }}
                >
                  <div className="relative overflow-hidden" style={{ height: "160px" }}>
                    <Image src={c.image} alt={c.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(201,80,120,0.35), transparent)" }} />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.92rem" }}>{c.label}</h3>
                      <p style={{ fontFamily: "var(--font-montserrat)", color: "#E8739A", fontSize: "0.78rem", marginTop: "0.25rem" }}>{c.count} produits</p>
                    </div>
                    <ArrowRight size={18} color="#E8739A" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section style={{ backgroundColor: "#FDE8EF", padding: "5rem 1.5rem" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.8rem,3vw,2.5rem)" }}>
                Nos Bestsellers
              </h2>
              <span style={{ backgroundColor: "#E8739A", color: "white", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.72rem", borderRadius: "999px", padding: "0.3rem 0.9rem" }}>
                ✦ Les plus aimés
              </span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.08 }} viewport={{ once: true }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="/catalogue"
              className="flex items-center gap-2 px-8 py-3.5 text-white transition-colors duration-200"
              style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C94F78")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8739A")}
            >
              Voir tout le catalogue
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHATSAPP BANNER */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #C94F78, #8A5A8A)", padding: "5rem 2rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <div className="flex justify-center mb-4">
            <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </div>
          </div>
          <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "white", fontSize: "clamp(1.5rem,3vw,2.2rem)", marginBottom: "1rem" }}>
            Commandez facilement sur WhatsApp
          </h2>
          <p style={{ fontFamily: "var(--font-montserrat)", color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: 1.9, marginBottom: "2rem" }}>
            Contactez-nous directement pour passer votre commande. Livraison rapide partout au Bénin.
          </p>
          <a
            href="https://wa.me/22900000000?text=Bonjour, je voudrais commander..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 transition-colors duration-200"
            style={{ backgroundColor: "white", color: "#C94F78", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDE8EF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "white")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Ouvrir WhatsApp
          </a>
        </motion.div>
      </section>
    </>
  );
}
