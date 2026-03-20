import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MOCK_STORYTELLING = {
  concept:
    "Cette collection prend racine dans le silence des paysages minéraux — carrières abandonnées, falaises au crépuscule, déserts de sel. Elle explore la tension entre la dureté de la matière et la vulnérabilité du corps qui la porte. Chaque pièce est pensée comme un fragment de paysage, taillé avec précision pour s'adapter aux formes humaines sans les contraindre.",
  note_intention:
    "Je cherche dans cette collection à réconcilier deux opposés que l'on croit irréconciliables : la permanence de la roche et la fluidité du mouvement. Les vêtements doivent sembler avoir toujours existé — portés, patiné, traversés par le temps — dès le premier instant où on les enfile.",
  message_artistique: "Porter la montagne comme une seconde peau.",
  univers_references: [
    "Agnes Martin — grilles de lumière et méditation",
    "Peter Zumthor — architecture thermale, sensorialité",
    "Wolfgang Tillmans — intimité et nudité de la matière",
    "Donald Judd — minimalisme radical et rigueur formelle",
  ],
};

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { generations: { where: { type: "direction" }, orderBy: { createdAt: "desc" }, take: 1 } },
  });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  let content = MOCK_STORYTELLING;

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { anthropic } = await import("@/lib/anthropic");
      const directionContext = project.generations[0]?.content
        ? JSON.stringify(project.generations[0].content)
        : "";
      const prompt = `Tu es un rédacteur créatif spécialisé en mode. Génère le storytelling de cette collection.

Projet: ${project.title}
Direction créative: ${directionContext}
ADN styliste: ${user.adn_synthese || ""}

Réponds UNIQUEMENT en JSON:
{
  "concept": "string",
  "note_intention": "string",
  "message_artistique": "string",
  "univers_references": ["string", "string", "string", "string"]
}`;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      });
      const text = (msg.content[0] as { text: string }).text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) content = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("Anthropic error, using mock:", e);
    }
  }

  await prisma.aiGeneration.create({ data: { projectId: id, type: "storytelling", content } });
  return NextResponse.json(content);
}
