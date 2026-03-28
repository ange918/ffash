"use client";

import Link from "next/link";
import { Flower, MapPin, Phone, Clock } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3A2A35", color: "#FDE8EF" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower size={26} color="#E8739A" strokeWidth={1.5} />
              <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, color: "#FDE8EF", fontSize: "0.95rem" }}>
                Cosmetics Shop
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Beauté naturelle pour toutes les peaux · Bénin
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <MapPin size={14} color="#F4B8CB" />
                <span style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.78rem" }}>Cotonou, Bénin</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} color="#F4B8CB" />
                <span style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.78rem" }}>+229 40 69 60 34</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={14} color="#F4B8CB" />
                <span style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.78rem" }}>Lun–Sam, 8h–20h</span>
              </div>
            </div>
          </div>

          {/* Col 2: Liens rapides */}
          <div>
            <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#FDE8EF", fontSize: "0.85rem", marginBottom: "1.2rem" }}>
              Liens rapides
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/a-propos", label: "À propos" },
                { href: "/panier", label: "Panier" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.82rem" }}
                    className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Catégories */}
          <div>
            <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#FDE8EF", fontSize: "0.85rem", marginBottom: "1.2rem" }}>
              Catégories
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Savons Corporels", val: "Savons Corporels" },
                { label: "Laits Corporels", val: "Laits Corporels" },
                { label: "Crèmes Visage", val: "Crèmes Visage" },
                { label: "Gels de Douche", val: "Gels de Douche" },
                { label: "Gammes Spéciales", val: "Gammes de Teint" },
              ].map((c) => (
                <li key={c.val}>
                  <Link href={`/catalogue?categorie=${encodeURIComponent(c.val)}`}
                    style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.82rem" }}
                    className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#FDE8EF", fontSize: "0.85rem", marginBottom: "1.2rem" }}>
              Nous contacter
            </h3>
            <a
              href="https://wa.me/22940696034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white mb-6 transition-colors duration-200"
              style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.78rem" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C94F78")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8739A")}
            >
              <FaWhatsapp size={14} color="#25D366" />
              WhatsApp
            </a>
            <div className="flex gap-4">
              <a href="#" style={{ color: "#F4B8CB" }} className="hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" style={{ color: "#F4B8CB" }} className="hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" style={{ color: "#F4B8CB" }} className="hover:text-white transition-colors" aria-label="TikTok">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(244,184,203,0.2)", marginTop: "3rem", paddingTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", opacity: 0.5, fontSize: "0.75rem" }}>
            © 2025 Cosmetics Shop · Tous droits réservés · Cotonou, Bénin
          </p>
        </div>
      </div>
    </footer>
  );
}
