import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { inspirations, valeurs, marche, prix, style } = await req.json();

  const prompt = `Tu es un directeur artistique de mode de renommée internationale. 
Analyse le profil créatif de ce styliste et génère une synthèse ADN créative concise (3-4 phrases max).

Profil:
- Inspirations: ${inspirations}
- Valeurs: ${valeurs?.join(", ")}
- Marché: ${marche}
- Gamme de prix: ${prix}
- Style dominant: ${style}

Réponds uniquement avec la synthèse en français, sans titre ni markdown.`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const synthese = (msg.content[0] as { text: string }).text;

    await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        adn_inspirations: inspirations,
        adn_valeurs: valeurs || [],
        adn_marche: marche,
        adn_prix: prix,
        adn_style: style,
        adn_synthese: synthese,
      },
    });

    return NextResponse.json({ synthese });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: "Erreur de génération IA" }, { status: 500 });
  }
}
