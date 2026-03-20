import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MOCK_DIRECTION = {
  theme: "SILENCE MINÉRAL",
  mot_directeur: "Là où la pierre rencontre la peau — une collection née du dialogue entre la roche brute et la douceur du corps.",
  palette: [
    { hex: "#E8E0D5", nom: "Pierre Calcaire" },
    { hex: "#2C2825", nom: "Ébène Profond" },
    { hex: "#9B8E82", nom: "Argile Fumée" },
    { hex: "#C4B5A5", nom: "Sable Doux" },
    { hex: "#F5F2EE", nom: "Blanc Craie" },
  ],
  matieres: ["Cachemire double face", "Laine bouillie", "Cuir végétal patiné", "Coton gaufré", "Lin gratté"],
  capsules: [
    {
      nom: "STRATES",
      description: "Pièces structurées en superposition, jouant sur l'épaisseur et la densité des tissus pour évoquer les couches géologiques.",
    },
    {
      nom: "ÉROSION",
      description: "Vêtements aux découpes asymétriques et aux ourlets bruts, comme sculptés par le temps et les éléments naturels.",
    },
    {
      nom: "CRISTAUX",
      description: "Silhouettes à facettes, construites autour de volumes angulaires précis, inspirées des formations cristallines.",
    },
  ],
  silhouettes: [
    "Manteau oversize à épaules tombantes, col enveloppant, longueur mi-mollet",
    "Pantalon wide-leg taille haute en laine structurée, coupe droite et austère",
    "Robe fourreau asymétrique, encolure bateau, fente latérale profonde",
    "Veste croisée aux revers larges, boutonnage dissimulé, dos architectural",
  ],
};

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id, userId: user.id } });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  let content = MOCK_DIRECTION;

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { anthropic } = await import("@/lib/anthropic");
      const prompt = `Tu es un directeur artistique de mode de renommée internationale. Génère une direction créative complète pour une collection de mode.

Projet: ${project.title}
Thème: ${project.theme || "Libre"}
Saison: ${project.season || ""}
ADN styliste: ${user.adn_synthese || ""}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "theme": "string",
  "mot_directeur": "string",
  "palette": [{"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}],
  "matieres": ["string", "string", "string", "string", "string"],
  "capsules": [{"nom": "string", "description": "string"}, {"nom": "string", "description": "string"}, {"nom": "string", "description": "string"}],
  "silhouettes": ["string", "string", "string", "string"]
}`;

      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      });
      const text = (msg.content[0] as { text: string }).text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) content = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("Anthropic error, using mock:", e);
    }
  }

  await prisma.aiGeneration.create({ data: { projectId: id, type: "direction", content } });
  return NextResponse.json(content);
}
