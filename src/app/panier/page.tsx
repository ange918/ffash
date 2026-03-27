"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function PanierPage() {
  const { items, removeFromCart, updateQuantite, clearCart, totalPrix } = useCartStore();
  const total = useCartStore((s) => s.totalPrix());
  const totalArticles = useCartStore((s) => s.totalArticles());

  const buildWhatsAppMessage = () => {
    const lignes = items
      .map((i) => `- ${i.product.nom} x${i.quantite} = ${(i.product.prix * i.quantite).toLocaleString("fr-FR")} FCFA`)
      .join("\n");
    return encodeURIComponent(
      `Bonjour Cosmetics Shop ! Je voudrais commander :\n${lignes}\n\nTotal : ${total}\nMerci !`
    );
  };

  return (
    <div style={{ backgroundColor: "#FDFAF8", minHeight: "100vh", padding: "3rem 1.5rem" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Mon Panier
          </h1>
          {totalArticles > 0 && (
            <span style={{ backgroundColor: "#E8739A", color: "white", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.8rem", borderRadius: "999px", padding: "0.3rem 0.9rem" }}>
              {totalArticles} article{totalArticles > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" fill="#FDE8EF"/>
              <path d="M30 38h40l-5 26H35L30 38z" fill="#F4B8CB"/>
              <path d="M24 38h52" stroke="#E8739A" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M42 38V32a8 8 0 0 1 16 0v6" stroke="#E8739A" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="42" cy="70" r="3" fill="#E8739A"/>
              <circle cx="58" cy="70" r="3" fill="#E8739A"/>
            </svg>
            <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "1.2rem" }}>Votre panier est vide</p>
            <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.9rem" }}>Découvrez nos produits et ajoutez-les à votre panier</p>
            <Link
              href="/catalogue"
              style={{ backgroundColor: "#E8739A", color: "white", borderRadius: "999px", padding: "0.9rem 2.5rem", fontFamily: "var(--font-montserrat)", fontWeight: 600 }}
            >
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Articles */}
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4"
                  style={{ backgroundColor: "white", borderRadius: "12px", padding: "1.2rem", boxShadow: "0 2px 12px rgba(232,115,154,0.07)" }}
                >
                  {/* Mini image */}
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: "80px", height: "80px", backgroundColor: "#FDE8EF", borderRadius: "10px" }}>
                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                      <rect x="14" y="14" width="20" height="26" rx="5" fill="#F4B8CB"/>
                      <rect x="17" y="8" width="14" height="9" rx="3.5" fill="#E8739A"/>
                      <rect x="19" y="5" width="10" height="5" rx="2.5" fill="#C94F78"/>
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.95rem", lineHeight: 1.3 }}>
                      {item.product.nom}
                    </h3>
                    <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.78rem", marginTop: "0.2rem" }}>
                      {item.product.categorie}
                    </p>
                    <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#C94F78", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                      {item.product.prix.toLocaleString("fr-FR")} FCFA / unité
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQuantite(item.product.id, item.quantite - 1)}
                      style={{ width: "30px", height: "30px", borderRadius: "6px", backgroundColor: "#FDE8EF", border: "none", cursor: "pointer", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C94F78", fontSize: "1rem" }}
                    >−</button>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#3A2A35", minWidth: "28px", textAlign: "center" }}>
                      {item.quantite}
                    </span>
                    <button
                      onClick={() => updateQuantite(item.product.id, item.quantite + 1)}
                      style={{ width: "30px", height: "30px", borderRadius: "6px", backgroundColor: "#FDE8EF", border: "none", cursor: "pointer", fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C94F78", fontSize: "1rem" }}
                    >+</button>
                  </div>

                  {/* Line total */}
                  <div className="flex-shrink-0 text-right hidden sm:block">
                    <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 600, color: "#C94F78", fontSize: "1rem" }}>
                      {(item.product.prix * item.quantite).toLocaleString("fr-FR")} FCFA
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#E8739A", flexShrink: 0 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#E8739A")}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Récapitulatif */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24" style={{ backgroundColor: "white", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 20px rgba(232,115,154,0.1)" }}>
                <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                  Récapitulatif
                </h2>

                <div className="flex flex-col gap-3" style={{ borderBottom: "1px solid #FDE8EF", paddingBottom: "1.2rem", marginBottom: "1.2rem" }}>
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.85rem" }}>Sous-total</span>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#3A2A35", fontSize: "0.85rem" }}>{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.85rem" }}>Livraison</span>
                    <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#7A6070", fontSize: "0.82rem" }}>À confirmer</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.9rem" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-unbounded)", fontWeight: 700, color: "#C94F78", fontSize: "1.3rem" }}>{total}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/22900000000?text=${buildWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 text-white transition-colors duration-200"
                    style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.85rem" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C94F78")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8739A")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Commander sur WhatsApp
                  </a>
                  <button
                    onClick={clearCart}
                    className="w-full py-3 transition-colors duration-200"
                    style={{ border: "1px solid #F4B8CB", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 500, fontSize: "0.82rem", color: "#7A6070", cursor: "pointer", background: "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FDE8EF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")}
                  >
                    Vider le panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
