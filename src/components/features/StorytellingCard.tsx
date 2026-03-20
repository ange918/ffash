import { Badge } from "@/components/ui/Badge";

interface StorytellingData {
  concept: string;
  note_intention: string;
  message_artistique: string;
  univers_references: string[];
}

export function StorytellingCard({ data }: { data: StorytellingData }) {
  return (
    <div className="space-y-10">
      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CONCEPT
        </h3>
        <p className="text-base font-semibold leading-relaxed max-w-2xl">
          {data.concept}
        </p>
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          NOTE D&apos;INTENTION
        </h3>
        <div className="border-l-2 border-black pl-6">
          <p className="text-sm font-semibold leading-relaxed text-black/80 max-w-xl">
            {data.note_intention}
          </p>
        </div>
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          MESSAGE ARTISTIQUE
        </h3>
        <p className="text-2xl italic font-semibold text-center py-8 border-t border-b border-black max-w-2xl">
          {data.message_artistique}
        </p>
      </div>

      <div>
        <h3
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          UNIVERS & RÉFÉRENCES
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.univers_references.map((r) => (
            <Badge key={r} variant="outline">
              {r}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
