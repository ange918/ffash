"use client";

import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  const waMessage = encodeURIComponent(
    `Bonjour, je voudrais commander : ${product.nom} à ${product.prix.toLocaleString("fr-FR")} FCFA`
  );

  return (
    <div
      className="flex flex-col transition-all duration-300"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(232,115,154,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(232,115,154,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(232,115,154,0.08)";
      }}
    >
      {/* Image zone */}
      <div className="relative flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FDE8EF, #EDE0F0)", height: "200px" }}>
        {product.badge && (
          <span
            className="absolute top-3 left-3"
            style={{ backgroundColor: "#E8739A", color: "white", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.65rem", borderRadius: "999px", padding: "0.25rem 0.7rem" }}
          >
            {product.badge}
          </span>
        )}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="38" rx="10" ry="4" fill="#F4B8CB" opacity="0.4"/>
          <rect x="16" y="16" width="16" height="22" rx="4" fill="#F4B8CB"/>
          <rect x="18" y="10" width="12" height="8" rx="3" fill="#E8739A"/>
          <rect x="20" y="8" width="8" height="4" rx="2" fill="#C94F78"/>
          <rect x="19" y="20" width="10" height="2" rx="1" fill="white" opacity="0.5"/>
          <rect x="19" y="24" width="7" height="2" rx="1" fill="white" opacity="0.3"/>
        </svg>
      </div>

      {/* Info zone */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#8A5A8A", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {product.categorie}
            {product.gamme && ` · ${product.gamme}`}
          </p>
          <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.95rem", lineHeight: 1.3, margin: "0.4rem 0 0.2rem" }}>
            {product.nom}
          </h3>
          <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C94F78", fontSize: "1.1rem" }}>
            {product.prix.toLocaleString("fr-FR")} FCFA
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 text-white transition-colors duration-200"
            style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.72rem", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#C94F78")}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#E8739A")}
          >
            Ajouter au panier
          </button>
          <a
            href={`https://wa.me/22900000000?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 flex items-center justify-center gap-2 transition-colors duration-200"
            style={{ border: "1px solid #E8739A", color: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.72rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FDE8EF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.844L.057 23.215a.75.75 0 0 0 .922.922l5.371-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.837-.575-5.4-1.567l-.387-.232-4.01 1.103 1.103-4.01-.231-.387A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
