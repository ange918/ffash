"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { DirectionCard } from "@/components/features/DirectionCard";
import { StorytellingCard } from "@/components/features/StorytellingCard";
import { SketchUploader } from "@/components/features/SketchUploader";
import { IllustrationResult } from "@/components/features/IllustrationResult";
import { MaterialInventory } from "@/components/features/MaterialInventory";
import { GenerationsTimeline } from "@/components/features/GenerationsTimeline";
import { CertificatePreview } from "@/components/features/CertificatePreview";
import { v4 as uuidv4 } from "uuid";
import type { MaterialRow } from "@/lib/pdf";

const TABS = [
  { id: "direction", label: "DIRECTION" },
  { id: "storytelling", label: "STORYTELLING" },
  { id: "illustration", label: "ILLUSTRATION" },
  { id: "materiaux", label: "MATÉRIAUX" },
  { id: "historique", label: "HISTORIQUE" },
  { id: "certificat", label: "CERTIFICAT" },
];

interface Project {
  id: string;
  title: string;
  season?: string;
  theme?: string;
  shareToken?: string;
  createdAt: string;
  user?: { name: string; adn_synthese?: string };
  generations: Array<{ id: string; type: string; content: Record<string, unknown>; createdAt: string }>;
  illustrations: Array<{ id: string; sketchUrl: string; resultUrl: string; inCertificate: boolean; createdAt: string }>;
  materials: Array<{ id: string; content: Record<string, unknown> }>;
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState("direction");
  const [project, setProject] = useState<Project | null>(null);
  const [userName, setUserName] = useState("");
  const [adnSynthese, setAdnSynthese] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [direction, setDirection] = useState<Record<string, unknown> | null>(null);
  const [storytelling, setStorytelling] = useState<Record<string, unknown> | null>(null);
  const [illustration, setIllustration] = useState<{ id: string; sketchUrl: string; resultUrl: string; inCertificate: boolean } | null>(null);
  const [materials, setMaterials] = useState<Record<string, unknown> | null>(null);
  const [generations, setGenerations] = useState<Array<{ id: string; type: string; content: Record<string, unknown>; createdAt: string }>>([]);
  const [shareToken, setShareToken] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then(({ project: p }) => {
        setProject(p);
        setShareToken(p.shareToken || null);
        const gens = p.generations || [];
        setGenerations(gens);

        const dir = gens.find((g: { type: string }) => g.type === "direction");
        if (dir) setDirection(dir.content as Record<string, unknown>);

        const story = gens.find((g: { type: string }) => g.type === "storytelling");
        if (story) setStorytelling(story.content as Record<string, unknown>);

        const mat = p.materials[0];
        if (mat) setMaterials(mat.content as Record<string, unknown>);

        const illus = p.illustrations[0];
        if (illus) setIllustration(illus);
      })
      .catch(() => setError("Erreur lors du chargement"))
      .finally(() => setLoading(false));

    fetch("/api/adn/me").then((r) => {
      if (r.ok) r.json().then((d) => { setUserName(d.name); setAdnSynthese(d.adn_synthese || ""); });
    }).catch(() => {});
  }, [id]);

  const generate = async (endpoint: string, setter: (d: Record<string, unknown>) => void) => {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch(`/api/projects/${id}/${endpoint}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setter(data);
      const gensRes = await fetch(`/api/projects/${id}/generations`);
      const gensData = await gensRes.json();
      setGenerations(gensData.generations || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur de génération");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Spinner text="Chargement du projet..." /></div>;
  if (!project) return <div className="border border-black p-8 text-sm font-semibold">Projet non trouvé.</div>;

  const lastGen = generations[0]?.createdAt;
  const certData = {
    projectTitle: project.title,
    userName: userName || "—",
    createdAt: new Date(project.createdAt).toLocaleDateString("fr-FR"),
    lastGeneration: lastGen ? new Date(lastGen).toLocaleDateString("fr-FR") : "—",
    certificateId: project.id + "-" + uuidv4().slice(0, 8),
    hasDirection: generations.some((g) => g.type === "direction"),
    hasStorytelling: generations.some((g) => g.type === "storytelling"),
    hasIllustration: !!illustration,
    hasMaterials: generations.some((g) => g.type === "materials"),
  };

  return (
    <div>
      <div className="flex items-start gap-4 flex-wrap mb-2">
        <h1
          className="text-4xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {project.title}
        </h1>
        {project.season && <Badge variant="outline">{project.season}</Badge>}
      </div>
      <p className="text-xs font-semibold text-black/40 mb-8">
        Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")}
      </p>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {error && (
        <div className="border border-black p-4 mt-6 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          {/* DIRECTION */}
          {tab === "direction" && (
            <div>
              {!direction && !generating && (
                <Button onClick={() => generate("generate-direction", setDirection)}>
                  GÉNÉRER LA DIRECTION CRÉATIVE
                </Button>
              )}
              {generating && <Spinner text="Génération en cours..." />}
              {direction && !generating && (
                <>
                  <div className="flex gap-4 mb-8">
                    <Button variant="outline" onClick={() => generate("generate-direction", setDirection)}>
                      RÉGÉNÉRER
                    </Button>
                  </div>
                  <DirectionCard data={direction as Parameters<typeof DirectionCard>[0]["data"]} />
                </>
              )}
            </div>
          )}

          {/* STORYTELLING */}
          {tab === "storytelling" && (
            <div>
              {!storytelling && !generating && (
                <Button onClick={() => generate("generate-storytelling", setStorytelling)}>
                  GÉNÉRER LE CONCEPT
                </Button>
              )}
              {generating && <Spinner text="Génération en cours..." />}
              {storytelling && !generating && (
                <>
                  <div className="flex gap-4 mb-8">
                    <Button variant="outline" onClick={() => generate("generate-storytelling", setStorytelling)}>
                      RÉGÉNÉRER
                    </Button>
                  </div>
                  <StorytellingCard data={storytelling as Parameters<typeof StorytellingCard>[0]["data"]} />
                </>
              )}
            </div>
          )}

          {/* ILLUSTRATION */}
          {tab === "illustration" && (
            <div>
              <h2
                className="text-sm font-black tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                CROQUIS → ILLUSTRATION 2D
              </h2>
              {illustration ? (
                <IllustrationResult
                  sketchUrl={illustration.sketchUrl}
                  resultUrl={illustration.resultUrl}
                  illustrationId={illustration.id}
                  inCertificate={illustration.inCertificate}
                />
              ) : (
                <SketchUploader
                  projectId={id}
                  adnSynthese={adnSynthese}
                  onResult={(data) => setIllustration({ ...data, inCertificate: false })}
                />
              )}
            </div>
          )}

          {/* MATERIAUX */}
          {tab === "materiaux" && (
            <div>
              <h2
                className="text-sm font-black tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                INVENTAIRE DES MATÉRIAUX
              </h2>
              {!materials && !generating && (
                <Button onClick={() => generate("generate-materials", setMaterials)}>
                  GÉNÉRER L&apos;INVENTAIRE
                </Button>
              )}
              {generating && <Spinner text="Génération de l'inventaire..." />}
              {materials && !generating && (
                <MaterialInventory
                  materiaux={(materials as { materiaux: MaterialRow[] }).materiaux || []}
                  budgetTotal={(materials as { budget_estime_total: number }).budget_estime_total || 0}
                  budgetPerPiece={(materials as { budget_par_piece: number }).budget_par_piece || 0}
                  sourcingNotes={(materials as { notes_sourcing: string }).notes_sourcing || ""}
                  projectTitle={project.title}
                />
              )}
            </div>
          )}

          {/* HISTORIQUE */}
          {tab === "historique" && (
            <div>
              <h2
                className="text-sm font-black tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                HISTORIQUE DES GÉNÉRATIONS
              </h2>
              <GenerationsTimeline generations={generations} />
            </div>
          )}

          {/* CERTIFICAT */}
          {tab === "certificat" && (
            <div>
              <h2
                className="text-sm font-black tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                CERTIFICAT DE PREUVE D&apos;ANTÉRIORITÉ
              </h2>
              <CertificatePreview
                data={certData}
                projectId={id}
                shareToken={shareToken}
                onShareGenerated={(token) => setShareToken(token)}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
