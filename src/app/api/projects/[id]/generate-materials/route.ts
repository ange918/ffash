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
    include: {
      generations: {
        where: { type: { in: ["direction", "storytelling"] } },
        orderBy: { createdAt: "desc" },
        take: 2,
      },
    },
  });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  const context = project.generations.map((g) => `${g.type}: ${JSON.stringify(g.content)}`).join("\n");

  const prompt = `Tu es un expert en sourcing de matériaux pour la mode. En fonction de la direction créative et du profil ADN du styliste, génère un inventaire réaliste de matériaux nécessaires.

Projet: ${project.title}
Contexte: ${context}
ADN styliste: ${user.adn_synthese || ""}

Réponds UNIQUEMENT en JSON:
{
  "materiaux": [
    {
      "nom": "string",
      "categorie": "string (Tissu | Doublure | Mercerie | Accessoire | Finition)",
      "description": "string",
      "quantite_estimee": "string (ex: 3m par pièce)",
      "prix_unitaire_eur": number,
      "fournisseurs_suggeres": ["string", "string"],
      "conseils": "string"
    }
  ],
  "budget_estime_total": number,
  "budget_par_piece": number,
  "notes_sourcing": "string"
}`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (msg.content[0] as { text: string }).text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Réponse invalide");
    const content = JSON.parse(jsonMatch[0]);

    await prisma.material.create({ data: { projectId: id, content } });
    await prisma.aiGeneration.create({ data: { projectId: id, type: "materials", content } });

    return NextResponse.json(content);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: "Erreur de génération matériaux" }, { status: 500 });
  }
}
