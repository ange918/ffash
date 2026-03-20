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
  const project = await prisma.project.findFirst({ where: { id, userId: user.id } });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  const prompt = `Tu es un directeur artistique de mode de renommée internationale. Génère une direction créative complète pour une collection de mode.

Projet: ${project.title}
Thème: ${project.theme || "Libre"}
Saison: ${project.season || ""}
ADN styliste: ${user.adn_synthese || ""}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "theme": "string — titre du thème principal",
  "mot_directeur": "string — une phrase d intention artistique",
  "palette": [{"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}, {"hex": "#XXXXXX", "nom": "string"}],
  "matieres": ["string", "string", "string", "string", "string"],
  "capsules": [{"nom": "string", "description": "string"}, {"nom": "string", "description": "string"}, {"nom": "string", "description": "string"}],
  "silhouettes": ["string", "string", "string", "string"]
}`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (msg.content[0] as { text: string }).text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Réponse invalide");
    const content = JSON.parse(jsonMatch[0]);

    await prisma.aiGeneration.create({
      data: { projectId: id, type: "direction", content },
    });

    return NextResponse.json(content);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: "Erreur de génération IA" }, { status: 500 });
  }
}
