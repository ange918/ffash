import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const project = await prisma.project.findUnique({
    where: { shareToken: token },
    include: {
      user: { select: { name: true, adn_synthese: true } },
      generations: { orderBy: { createdAt: "desc" } },
      illustrations: { where: { inCertificate: true }, take: 1 },
      materials: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!project) return NextResponse.json({ error: "Lien invalide" }, { status: 404 });

  return NextResponse.json({ project });
}
