"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Flower } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { FaWhatsapp } from "react-icons/fa";

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
              href="https://wa.me/22940696034"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-white transition-colors duration-200"
              style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.72rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C94F78")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8739A")}
            >
              <FaWhatsapp size={14} color="#25D366" />
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
                href="https://wa.me/22940696034"
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
