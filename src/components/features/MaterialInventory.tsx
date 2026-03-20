"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { MaterialRow } from "@/lib/pdf";

interface MaterialInventoryProps {
  materiaux: MaterialRow[];
  budgetTotal: number;
  budgetPerPiece: number;
  sourcingNotes: string;
  projectTitle: string;
}

const CATEGORIES = ["Tous", "Tissu", "Doublure", "Mercerie", "Accessoire", "Finition"];

export function MaterialInventory({
  materiaux,
  budgetTotal,
  budgetPerPiece,
  sourcingNotes,
  projectTitle,
}: MaterialInventoryProps) {
  const [filter, setFilter] = useState("Tous");
  const [rows, setRows] = useState(materiaux);
  const [editing, setEditing] = useState(false);

  const filtered = filter === "Tous" ? rows : rows.filter((r) => r.categorie === filter);

  const total = rows.reduce((sum, r) => sum + r.prix_unitaire_eur, 0);

  const updateRow = (index: number, field: keyof MaterialRow, value: string | number) => {
    const updated = [...rows];
    (updated[index] as Record<string, unknown>)[field] = value;
    setRows(updated);
  };

  const exportPDF = async () => {
    const { generateMaterialsPDF } = await import("@/lib/pdf");
    await generateMaterialsPDF(projectTitle, rows, total, budgetPerPiece, sourcingNotes);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-black p-6">
          <p className="text-xs tracking-widest uppercase font-semibold text-black/50 mb-1">Budget total estimé</p>
          <p className="text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
            {budgetTotal.toFixed(2)} €
          </p>
        </div>
        <div className="border border-black p-6">
          <p className="text-xs tracking-widest uppercase font-semibold text-black/50 mb-1">Budget par pièce</p>
          <p className="text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
            {budgetPerPiece.toFixed(2)} €
          </p>
        </div>
      </div>

      <div className="flex gap-0 border-b border-black overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap transition-colors ${
              filter === cat ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black">
              {["Matériau", "Catégorie", "Quantité", "Prix/u (€)", "Fournisseurs", "Conseils"].map((h) => (
                <th key={h} className="text-left py-3 pr-4 font-black tracking-widest uppercase text-[10px]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-b border-black/10 hover:bg-[#f5f5f5]">
                <td className="py-3 pr-4 font-semibold">{row.nom}</td>
                <td className="py-3 pr-4 font-semibold">{row.categorie}</td>
                <td className="py-3 pr-4 font-semibold">
                  {editing ? (
                    <input
                      className="border border-black px-2 py-1 w-24 text-xs font-semibold"
                      value={row.quantite_estimee}
                      onChange={(e) => updateRow(i, "quantite_estimee", e.target.value)}
                    />
                  ) : (
                    row.quantite_estimee
                  )}
                </td>
                <td className="py-3 pr-4 font-semibold">
                  {editing ? (
                    <input
                      type="number"
                      className="border border-black px-2 py-1 w-20 text-xs font-semibold"
                      value={row.prix_unitaire_eur}
                      onChange={(e) => updateRow(i, "prix_unitaire_eur", parseFloat(e.target.value) || 0)}
                    />
                  ) : (
                    `${row.prix_unitaire_eur} €`
                  )}
                </td>
                <td className="py-3 pr-4 font-semibold text-black/60">
                  {row.fournisseurs_suggeres.join(", ")}
                </td>
                <td className="py-3 font-semibold text-black/60 max-w-[180px] truncate">
                  {row.conseils}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t-2 border-black pt-4">
        <p className="text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
          TOTAL: {total.toFixed(2)} €
        </p>
        {sourcingNotes && (
          <p className="text-xs font-semibold text-black/60 mt-2 max-w-2xl">{sourcingNotes}</p>
        )}
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button onClick={exportPDF}>EXPORTER EN PDF</Button>
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          {editing ? "TERMINER" : "MODIFIER"}
        </Button>
      </div>
    </div>
  );
}
