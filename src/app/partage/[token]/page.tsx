import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ColorPalette } from "@/components/features/ColorPalette";

export default async function PartagePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const project = await prisma.project.findUnique({
    where: { shareToken: token },
    include: {
      user: { select: { name: true, adn_synthese: true } },
      generations: { orderBy: { createdAt: "desc" } },
      illustrations: { where: { inCertificate: true }, take: 1 },
      materials: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!project) notFound();

  const direction = project.generations.find((g) => g.type === "direction")?.content as Record<string, unknown> | null;
  const storytelling = project.generations.find((g) => g.type === "storytelling")?.content as Record<string, unknown> | null;
  const material = project.materials[0]?.content as Record<string, unknown> | null;
  const illustration = project.illustrations[0];

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black px-8 py-6 flex items-center justify-between">
        <span
          className="text-sm tracking-[0.3em] font-black"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FASHLINK
        </span>
        {project.season && <Badge variant="outline">{project.season}</Badge>}
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16 space-y-16">
        <div>
          <h1
            className="text-5xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {project.title}
          </h1>
          <p className="text-xs font-semibold text-black/50 mt-2">
            Par {project.user.name} — {new Date(project.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>

        {project.user.adn_synthese && (
          <section>
            <h2
              className="text-xs tracking-widest uppercase font-black mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              PROFIL ADN
            </h2>
            <div className="border border-black p-6">
              <p className="text-sm font-semibold leading-relaxed">{project.user.adn_synthese}</p>
            </div>
          </section>
        )}

        {direction && (
          <section>
            <h2
              className="text-xs tracking-widest uppercase font-black mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              DIRECTION CRÉATIVE
            </h2>
            <h3
              className="text-3xl font-black mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {direction.theme as string}
            </h3>
            <p className="text-base italic font-semibold text-black/70 mb-6">
              {direction.mot_directeur as string}
            </p>
            <ColorPalette palette={(direction.palette as Array<{ hex: string; nom: string }>) || []} />
            <div className="flex flex-wrap gap-2 mt-6">
              {((direction.matieres as string[]) || []).map((m: string) => (
                <Badge key={m} variant="outline">{m}</Badge>
              ))}
            </div>
          </section>
        )}

        {storytelling && (
          <section>
            <h2
              className="text-xs tracking-widest uppercase font-black mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              STORYTELLING
            </h2>
            <p className="text-base font-semibold leading-relaxed mb-6 max-w-2xl">
              {storytelling.concept as string}
            </p>
            {storytelling.message_artistique && (
              <p className="text-xl italic font-semibold text-center py-8 border-t border-b border-black">
                {storytelling.message_artistique as string}
              </p>
            )}
          </section>
        )}

        {illustration && (
          <section>
            <h2
              className="text-xs tracking-widest uppercase font-black mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ILLUSTRATION
            </h2>
            <img
              src={illustration.resultUrl}
              alt="Illustration"
              className="border border-black max-w-sm w-full"
            />
          </section>
        )}

        {material && (
          <section>
            <h2
              className="text-xs tracking-widest uppercase font-black mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              BUDGET MATÉRIAUX
            </h2>
            <div className="grid grid-cols-2 gap-0 max-w-sm">
              <div className="border border-black p-6 -ml-[1px]">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-black/50 mb-1">Budget total</p>
                <p className="text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                  {Number(material.budget_estime_total || 0).toFixed(2)} €
                </p>
              </div>
              <div className="border border-black p-6 -ml-[1px]">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-black/50 mb-1">Par pièce</p>
                <p className="text-xl font-black" style={{ fontFamily: "var(--font-heading)" }}>
                  {Number(material.budget_par_piece || 0).toFixed(2)} €
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black py-6 text-center">
        <span className="text-white text-[10px] tracking-widest font-semibold uppercase">
          Créé avec FASHLINK
        </span>
      </footer>
    </div>
  );
}
