import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id, userId: user.id } });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  const { imageBase64, styleText, adnSynthese } = await req.json();

  try {
    // Step 1: GPT-4 Vision to describe the sketch
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Décris précisément ce croquis de mode en français pour générer une illustration 2D professionnelle. Inclus: type de vêtement, silhouette, détails vestimentaires, style.",
            },
            { type: "image_url", image_url: { url: imageBase64 } },
          ],
        },
      ],
      max_tokens: 300,
    });

    const description = visionResponse.choices[0].message.content || "";

    // Step 2: DALL-E 3 generation
    const dallePrompt = `Professional 2D fashion illustration, flat design, technical fashion sketch style, clean lines, white background, black outlines. ${description}. ${styleText || ""}. ${adnSynthese || ""}. NOT photorealistic. Illustration only.`;

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: dallePrompt,
      n: 1,
      size: "1024x1024",
    });

    const resultUrl = imageResponse.data[0].url!;

    const illustration = await prisma.illustration.create({
      data: {
        projectId: id,
        sketchUrl: imageBase64,
        resultUrl,
        inCertificate: false,
      },
    });

    await prisma.aiGeneration.create({
      data: {
        projectId: id,
        type: "illustration",
        content: { illustrationId: illustration.id, resultUrl },
      },
    });

    return NextResponse.json({
      id: illustration.id,
      sketchUrl: imageBase64,
      resultUrl,
      inCertificate: false,
    });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: "Erreur de génération illustration" }, { status: 500 });
  }
}
