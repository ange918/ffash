import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3A2A35", color: "#FDE8EF" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 2C14 2 10 6 10 10C10 12.2 11.8 14 14 14C16.2 14 18 12.2 18 10C18 6 14 2 14 2Z" fill="#E8739A"/>
                <path d="M14 14C14 14 6 13 4 17C3 19 4.5 21.5 7 22C9.5 22.5 12 21 14 19" fill="#C94F78"/>
                <path d="M14 14C14 14 22 13 24 17C25 19 23.5 21.5 21 22C18.5 22.5 16 21 14 19" fill="#C9A0C4"/>
                <circle cx="14" cy="14" r="2" fill="#C94F78"/>
              </svg>
              <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, color: "#FDE8EF", fontSize: "0.95rem" }}>
                Cosmetics Shop
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#F4B8CB", fontSize: "0.82rem", lineHeight: 1.8 }}>
              Beauté naturelle pour toutes les peaux · Bénin
            </p>
          </div>

          {/* Col 2: Liens rapides */}
          <div>
            <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#FDE8EF", fontSize: "0.85rem", marginBottom: "1rem" }}>
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
            <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#FDE8EF", fontSize: "0.85rem", marginBottom: "1rem" }}>
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
            <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#FDE8EF", fontSize: "0.85rem", marginBottom: "1rem" }}>
              Nous contacter
            </h3>
            <a
              href="https://wa.me/22900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white mb-6 transition-colors duration-200"
              style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.78rem" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" style={{ color: "#F4B8CB" }} className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" style={{ color: "#F4B8CB" }} className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" style={{ color: "#F4B8CB" }} className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
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
