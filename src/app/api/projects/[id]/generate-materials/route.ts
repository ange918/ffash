import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MOCK_MATERIALS = {
  materiaux: [
    {
      nom: "Cachemire double face",
      categorie: "Tissu",
      description: "Cachemire de grade A, double face naturel/teint, 300g/m²",
      quantite_estimee: "4m par pièce",
      prix_unitaire_eur: 185,
      fournisseurs_suggeres: ["Loro Piana Textiles", "Cariaggi Lanificio"],
      conseils: "Commander en avance (délai 8 semaines), demander échantillons de lainage avant validation.",
    },
    {
      nom: "Laine bouillie naturelle",
      categorie: "Tissu",
      description: "Laine mérinos bouillie, main ferme, résistante, coloris naturels",
      quantite_estimee: "3m par pièce",
      prix_unitaire_eur: 62,
      fournisseurs_suggeres: ["Abraham Moon & Sons", "Tissus Reine Paris"],
      conseils: "Tester la rétractation avant coupe. Prévoir 10% de surplus.",
    },
    {
      nom: "Cuir végétal patiné",
      categorie: "Tissu",
      description: "Cuir tanné végétal, épaisseur 1.2mm, finition cireuse mate",
      quantite_estimee: "1.5m par pièce",
      prix_unitaire_eur: 95,
      fournisseurs_suggeres: ["Badalassi Carlo", "Conceria Walpier"],
      conseils: "Conserver à l'abri de l'humidité. Nourrir à la cire d'abeille avant assemblage.",
    },
    {
      nom: "Fil de soie pour doublure",
      categorie: "Doublure",
      description: "Satin de soie 100%, grammage léger 80g/m², coloris grège",
      quantite_estimee: "2.5m par pièce",
      prix_unitaire_eur: 38,
      fournisseurs_suggeres: ["Taroni Fabrics", "Picardy Textiles"],
      conseils: "Laver à froid avant utilisation pour éviter les rétrécissements.",
    },
    {
      nom: "Boutons en corne naturelle",
      categorie: "Mercerie",
      description: "Boutons en corne de zébu, teinture naturelle, diamètre 22mm",
      quantite_estimee: "6 unités par pièce",
      prix_unitaire_eur: 4.5,
      fournisseurs_suggeres: ["Le Bouton d'Or", "Impex SAS"],
      conseils: "Chaque bouton est unique — sélectionner par lot pour cohérence visuelle.",
    },
    {
      nom: "Fermeture invisible YKK",
      categorie: "Mercerie",
      description: "Zip invisible YKK 20cm, coloris nacre, résistance renforcée",
      quantite_estimee: "1 unité par pièce",
      prix_unitaire_eur: 3.2,
      fournisseurs_suggeres: ["YKK Europe", "Dritz Professional"],
      conseils: "Toujours utiliser le pied presseur spécifique fermeture invisible.",
    },
    {
      nom: "Étiquettes tissées personnalisées",
      categorie: "Finition",
      description: "Étiquettes en satin tissé, logo brodé, format 5x2cm",
      quantite_estimee: "2 étiquettes par pièce",
      prix_unitaire_eur: 1.8,
      fournisseurs_suggeres: ["Etiketoplossingen.nl", "Wunderlabel"],
      conseils: "Commander minimum 200 unités pour optimiser le coût unitaire.",
    },
  ],
  budget_estime_total: 2640,
  budget_par_piece: 389.5,
  notes_sourcing:
    "Privilégier les fournisseurs européens pour réduire l'empreinte carbone. Les matières premières représentent 68% du coût total. Négocier des conditions de paiement à 60 jours avec les fournisseurs réguliers.",
};

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

  let content = MOCK_MATERIALS;

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { anthropic } = await import("@/lib/anthropic");
      const context = project.generations.map((g) => `${g.type}: ${JSON.stringify(g.content)}`).join("\n");
      const prompt = `Tu es un expert en sourcing de matériaux pour la mode. Génère un inventaire réaliste.

Projet: ${project.title}
Contexte: ${context}
ADN styliste: ${user.adn_synthese || ""}

Réponds UNIQUEMENT en JSON:
{
  "materiaux": [{"nom":"string","categorie":"string","description":"string","quantite_estimee":"string","prix_unitaire_eur":number,"fournisseurs_suggeres":["string","string"],"conseils":"string"}],
  "budget_estime_total": number,
  "budget_par_piece": number,
  "notes_sourcing": "string"
}`;
      const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      });
      const text = (msg.content[0] as { text: string }).text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) content = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("Anthropic error, using mock:", e);
    }
  }

  await prisma.material.create({ data: { projectId: id, content } });
  await prisma.aiGeneration.create({ data: { projectId: id, type: "materials", content } });
  return NextResponse.json(content);
}
