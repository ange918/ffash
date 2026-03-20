import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MOCK_SYNTHESE =
  "Votre univers créatif se déploie à l'intersection du minimalisme architectural et de la sensualité des matières nobles. Animée par une vision durable du luxe, vous concevez des pièces intemporelles pensées pour durer au-delà des saisons. Votre signature : des silhouettes épurées, des textures qui parlent au toucher, et une palette chromatique réduite à l'essentiel.";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { inspirations, valeurs, marche, prix, style } = await req.json();

  let synthese = MOCK_SYNTHESE;

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { anthropic } = await import("@/lib/anthropic");
      const prompt = `Tu es un directeur artistique de mode de renommée internationale. 
Analyse le profil créatif de ce styliste et génère une synthèse ADN créative concise (3-4 phrases max).

Profil:
- Inspirations: ${inspirations}
- Valeurs: ${valeurs?.join(", ")}
- Marché: ${marche}
- Gamme de prix: ${prix}
- Style dominant: ${style}

Réponds uniquement avec la synthèse en français, sans titre ni markdown.`;

      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      });
      synthese = (msg.content[0] as { text: string }).text;
    } catch (e) {
      console.error("Anthropic error, using mock:", e);
    }
  }

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
}
