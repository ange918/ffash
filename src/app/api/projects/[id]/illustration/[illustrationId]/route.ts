import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; illustrationId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, illustrationId } = await params;
  const { inCertificate } = await req.json();

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const project = await prisma.project.findFirst({ where: { id, userId: user!.id } });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  const illustration = await prisma.illustration.update({
    where: { id: illustrationId },
    data: { inCertificate },
  });

  return NextResponse.json({ illustration });
}
