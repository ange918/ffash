"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, gammes, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Check, SlidersHorizontal } from "lucide-react";

const typePeauOptions = [
  { label: "Toutes", value: "tous" },
  { label: "Peau Grasse", value: "grasse" },
  { label: "Peau Sèche", value: "sèche" },
  { label: "Peau Mixte", value: "mixte" },
  { label: "Peau Sensible", value: "sensible" },
];

const ITEMS_PER_PAGE = 12;

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategorie = searchParams.get("categorie") || "";

  const [search, setSearch] = useState("");
  const [selectedTypePeau, setSelectedTypePeau] = useState("tous");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategorie ? [initialCategorie] : []
  );
  const [selectedGamme, setSelectedGamme] = useState("Toutes");
  const [maxPrix, setMaxPrix] = useState(10000);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (initialCategorie) setSelectedCategories([initialCategorie]);
  }, [initialCategorie]);

  const toggleCategorie = (c: string) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
    setPage(1);
  };

  const reset = () => {
    setSearch("");
    setSelectedTypePeau("tous");
    setSelectedCategories([]);
    setSelectedGamme("Toutes");
    setMaxPrix(10000);
    setPage(1);
  };

  const filtered = useMemo(() => {
    return products.filter((p: Product) => {
      if (search && !p.nom.toLowerCase().includes(search.toLowerCase()) &&
        !p.categorie.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedTypePeau !== "tous" && !p.typePeau.includes(selectedTypePeau) && !p.typePeau.includes("tous")) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.categorie)) return false;
      if (selectedGamme !== "Toutes" && p.gamme !== selectedGamme) return false;
      if (p.prix > maxPrix) return false;
      return true;
    });
  }, [search, selectedTypePeau, selectedCategories, selectedGamme, maxPrix]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const FilterPanel = () => (
    <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 16px rgba(232,115,154,0.08)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "1rem" }}>
          Filtres
        </h2>
        <button onClick={reset} style={{ fontFamily: "var(--font-montserrat)", color: "#C94F78", fontSize: "0.75rem", background: "none", border: "none", cursor: "pointer" }}>
          Réinitialiser
        </button>
      </div>

      {/* Recherche */}
      <div className="mb-5" style={{ borderBottom: "1px solid #FDE8EF", paddingBottom: "1.25rem" }}>
        <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.8rem", display: "block", marginBottom: "0.5rem" }}>Recherche</label>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Nom du produit..."
          style={{ width: "100%", padding: "0.6rem 0.9rem", border: "1px solid #FDE8EF", borderRadius: "8px", fontFamily: "var(--font-montserrat)", fontSize: "0.82rem", outline: "none", color: "#3A2A35" }}
        />
      </div>

      {/* Type de peau */}
      <div className="mb-5" style={{ borderBottom: "1px solid #FDE8EF", paddingBottom: "1.25rem" }}>
        <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.8rem", display: "block", marginBottom: "0.75rem" }}>Type de peau</label>
        <div className="flex flex-wrap gap-2">
          {typePeauOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => { setSelectedTypePeau(t.value); setPage(1); }}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid #F4B8CB",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.75rem",
                cursor: "pointer",
                backgroundColor: selectedTypePeau === t.value ? "#E8739A" : "transparent",
                color: selectedTypePeau === t.value ? "white" : "#3A2A35",
                fontWeight: selectedTypePeau === t.value ? 600 : 400,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catégories */}
      <div className="mb-5" style={{ borderBottom: "1px solid #FDE8EF", paddingBottom: "1.25rem" }}>
        <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.8rem", display: "block", marginBottom: "0.75rem" }}>Catégories</label>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => toggleCategorie(c)}
                style={{
                  width: "16px", height: "16px", borderRadius: "3px",
                  border: "1px solid #F4B8CB",
                  backgroundColor: selectedCategories.includes(c) ? "#E8739A" : "white",
                  cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                {selectedCategories.includes(c) && (
                  <Check size={10} stroke="white" strokeWidth={2.5} />
                )}
              </div>
              <span onClick={() => toggleCategorie(c)} style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.78rem", color: "#3A2A35", cursor: "pointer" }}>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gamme */}
      <div className="mb-5" style={{ borderBottom: "1px solid #FDE8EF", paddingBottom: "1.25rem" }}>
        <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.8rem", display: "block", marginBottom: "0.75rem" }}>Gamme</label>
        <div className="flex flex-wrap gap-2">
          {["Toutes", ...gammes].map((g) => (
            <button
              key={g}
              onClick={() => { setSelectedGamme(g); setPage(1); }}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "999px",
                border: "1px solid #F4B8CB",
                fontFamily: "var(--font-montserrat)",
                fontSize: "0.72rem",
                cursor: "pointer",
                backgroundColor: selectedGamme === g ? "#E8739A" : "transparent",
                color: selectedGamme === g ? "white" : "#3A2A35",
                fontWeight: selectedGamme === g ? 600 : 400,
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.8rem", display: "block", marginBottom: "0.75rem" }}>
          Prix max : <span style={{ color: "#E8739A" }}>{maxPrix.toLocaleString("fr-FR")} FCFA</span>
        </label>
        <input
          type="range" min={500} max={10000} step={100} value={maxPrix}
          onChange={(e) => { setMaxPrix(Number(e.target.value)); setPage(1); }}
          style={{ width: "100%", accentColor: "#E8739A" }}
        />
        <div className="flex justify-between" style={{ fontFamily: "var(--font-montserrat)", fontSize: "0.68rem", color: "#7A6070", marginTop: "0.3rem" }}>
          <span>500</span><span>10 000 FCFA</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12" style={{ backgroundColor: "#FDFAF8", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(1.8rem,4vw,3rem)", marginBottom: "0.5rem" }}>
            Notre Catalogue
          </h1>
          <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.9rem" }}>
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Mobile filter toggle */}
        <button
          className="md:hidden flex items-center gap-2 mb-6 px-4 py-2"
          onClick={() => setFiltersOpen(!filtersOpen)}
          style={{ border: "1px solid #E8739A", color: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.8rem", background: "none", cursor: "pointer" }}
        >
          <SlidersHorizontal size={16} />
          Filtres {selectedCategories.length > 0 && `(${selectedCategories.length})`}
        </button>

        {filtersOpen && <div className="md:hidden mb-6"><FilterPanel /></div>}

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-72 flex-shrink-0 sticky top-24 self-start">
            <FilterPanel />
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-6">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="36" fill="#FDE8EF"/>
                  <path d="M25 30h30l-4 20H29L25 30z" fill="#F4B8CB"/>
                  <path d="M20 30h40" stroke="#E8739A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M34 30V24a6 6 0 0 1 12 0v6" stroke="#E8739A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "1.1rem" }}>Aucun produit trouvé</p>
                <button onClick={reset} style={{ backgroundColor: "#E8739A", color: "white", borderRadius: "999px", padding: "0.75rem 2rem", fontFamily: "var(--font-montserrat)", fontWeight: 600, border: "none", cursor: "pointer" }}>
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      style={{ padding: "0.6rem 1.5rem", borderRadius: "999px", border: "1px solid #F4B8CB", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.82rem", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1, background: "none", color: "#3A2A35" }}
                    >
                      Précédent
                    </button>
                    <span style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.82rem" }}>
                      Page {page} sur {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      style={{ padding: "0.6rem 1.5rem", borderRadius: "999px", border: "1px solid #F4B8CB", fontFamily: "var(--font-montserrat)", fontWeight: 600, fontSize: "0.82rem", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.4 : 1, background: "none", color: "#3A2A35" }}
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
