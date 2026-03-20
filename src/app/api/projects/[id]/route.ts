import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { generations: { orderBy: { createdAt: "desc" } }, illustrations: true, materials: true },
  });

  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  return NextResponse.json({ project });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const { id } = await params;

  const project = await prisma.project.findFirst({ where: { id, userId: user!.id } });
  if (!project) return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
