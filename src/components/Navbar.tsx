"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Flower } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalArticles = useCartStore((s) => s.totalArticles());

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-white"
        style={{ boxShadow: "0 2px 12px rgba(232,115,154,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Flower size={26} color="#E8739A" strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, color: "#C94F78", fontSize: "1rem", letterSpacing: "0.02em" }}>
              Cosmetics Shop
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative group"
                style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em" }}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "#E8739A" }} />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Panier */}
            <Link href="/panier" className="relative p-2">
              <ShoppingBag size={22} color="#C94F78" strokeWidth={1.8} />
              {totalArticles > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#E8739A", fontSize: "0.62rem", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}>
                  {totalArticles}
                </span>
              )}
            </Link>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/22900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-white transition-colors duration-200"
              style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.72rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C94F78")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8739A")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Commander
            </a>

            {/* Hamburger */}
            <button className="md:hidden p-2" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={22} color="#C94F78" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setMenuOpen(false)} />
          <div className="w-72 bg-white h-full flex flex-col p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Flower size={20} color="#E8739A" strokeWidth={1.5} />
                <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, color: "#C94F78", fontSize: "0.9rem" }}>Menu</span>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={22} color="#C94F78" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#C94F78", fontSize: "1.1rem" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="https://wa.me/22900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-white"
                style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}
              >
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
