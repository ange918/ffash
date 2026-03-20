import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";

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

  const directionContext = project.generations[0]?.content
    ? JSON.stringify(project.generations[0].content)
    : "";

  const prompt = `Tu es un rédacteur créatif spécialisé en mode. Génère le storytelling de cette collection.

Projet: ${project.title}
Direction créative: ${directionContext}
ADN styliste: ${user.adn_synthese || ""}

Réponds UNIQUEMENT en JSON:
{
  "concept": "string — paragraphe du concept de collection",
  "note_intention": "string — note d intention du styliste",
  "message_artistique": "string — phrase manifeste",
  "univers_references": ["string", "string", "string", "string"]
}`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (msg.content[0] as { text: string }).text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Réponse invalide");
    const content = JSON.parse(jsonMatch[0]);

    await prisma.aiGeneration.create({
      data: { projectId: id, type: "storytelling", content },
    });

    return NextResponse.json(content);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: "Erreur de génération IA" }, { status: 500 });
  }
}
