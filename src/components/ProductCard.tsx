"use client";

import Image from "next/image";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";

type Props = { product: Product };

const categoryImages: Record<string, string> = {
  "Savons Corporels": "/images/savons.png",
  "Laits Corporels": "/images/laits.png",
  "Crèmes Visage": "/images/cremes.png",
  "Lotions Visage": "/images/cremes.png",
  "Gommages": "/images/gommages.png",
  "Savons Visage": "/images/savons.png",
  "Gels de Douche": "/images/gels.png",
  "Gammes de Teint": "/images/laits.png",
  "Lèvres Roses": "/images/levres.png",
  "Anti-Vergetures": "/images/anti-vergetures.png",
  "Anti-Imperfections": "/images/cremes.png",
  "Minceur": "/images/minceur.png",
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  const waMessage = encodeURIComponent(
    `Bonjour, je voudrais commander : ${product.nom} à ${product.prix.toLocaleString("fr-FR")} FCFA`
  );

  const imgSrc = categoryImages[product.categorie] || "/images/product-placeholder.png";

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
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <Image
          src={imgSrc}
          alt={product.nom}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(201,80,120,0.15), transparent)" }} />
        {product.badge && (
          <span
            className="absolute top-3 left-3 z-10"
            style={{ backgroundColor: "#E8739A", color: "white", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.65rem", borderRadius: "999px", padding: "0.25rem 0.7rem" }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info zone */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#8A5A8A", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {product.categorie}{product.gamme && ` · ${product.gamme}`}
          </p>
          <h3 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.92rem", lineHeight: 1.3, margin: "0.35rem 0 0.2rem" }}>
            {product.nom}
          </h3>
          <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 600, color: "#C94F78", fontSize: "1.05rem" }}>
            {product.prix.toLocaleString("fr-FR")} FCFA
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 text-white flex items-center justify-center gap-2 transition-colors duration-200"
            style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.72rem", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#C94F78")}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#E8739A")}
          >
            <ShoppingCart size={13} />
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
            <MessageCircle size={13} />
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}
