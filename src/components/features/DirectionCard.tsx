import { ColorPalette } from "./ColorPalette";
import { Badge } from "@/components/ui/Badge";

interface DirectionData {
  theme: string;
  mot_directeur: string;
  palette: { hex: string; nom: string }[];
  matieres: string[];
  capsules: { nom: string; description: string }[];
  silhouettes: string[];
}

export function DirectionCard({ data }: { data: DirectionData }) {
  return (
    <div className="space-y-10">
      <div>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {data.theme}
        </h2>
        <p className="mt-4 text-base italic font-semibold text-black/70 max-w-2xl">
          {data.mot_directeur}
        </p>
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          PALETTE CHROMATIQUE
        </h3>
        <ColorPalette palette={data.palette} />
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          MATIÈRES
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.matieres.map((m) => (
            <Badge key={m} variant="outline">
              {m}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CAPSULES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {data.capsules.map((c, i) => (
            <div key={c.nom} className="border border-black p-6 -ml-[1px] -mt-[1px]">
              <span className="text-3xl font-black text-black/10 block mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4
                className="text-sm font-black mb-2 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {c.nom}
              </h4>
              <p className="text-xs text-black/70 font-semibold leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SILHOUETTES
        </h3>
        <ol className="space-y-2">
          {data.silhouettes.map((s, i) => (
            <li key={s} className="flex items-start gap-4 text-sm font-semibold">
              <span className="font-black text-black/30 w-5 shrink-0" style={{ fontFamily: "var(--font-heading)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
