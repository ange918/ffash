"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

interface Generation {
  id: string;
  type: string;
  content: Record<string, unknown>;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  direction: "DIRECTION",
  storytelling: "STORYTELLING",
  illustration: "ILLUSTRATION",
  materials: "MATÉRIAUX",
};

const FILTERS = ["Tous", "direction", "storytelling", "illustration", "materials"];

export function GenerationsTimeline({ generations }: { generations: Generation[] }) {
  const [filter, setFilter] = useState("Tous");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "Tous" ? generations : generations.filter((g) => g.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex gap-0 border-b border-black overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap transition-colors ${
              filter === f ? "bg-black text-white" : "hover:bg-black/5"
            }`}
          >
            {f === "Tous" ? "Tous" : TYPE_LABELS[f] || f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm font-semibold text-black/50 py-8">Aucune génération.</p>
      ) : (
        <div className="relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-black" />
          <div className="space-y-6">
            {filtered.map((g) => (
              <div key={g.id} className="relative">
                <div className="absolute -left-5 top-2 w-2 h-2 bg-black" />
                <div
                  className="border border-black p-4 cursor-pointer hover:bg-black/5 transition-colors"
                  onClick={() => setExpanded(expanded === g.id ? null : g.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="filled">{TYPE_LABELS[g.type] || g.type}</Badge>
                    <span className="text-[10px] font-semibold text-black/50">
                      {new Date(g.createdAt).toLocaleString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-black/70 truncate">
                    {JSON.stringify(g.content).slice(0, 100)}…
                  </p>
                  {expanded === g.id && (
                    <pre className="mt-4 text-[10px] bg-black/5 p-4 overflow-auto max-h-64 font-mono whitespace-pre-wrap">
                      {JSON.stringify(g.content, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
