import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function ProjetsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  const projects = await prisma.project.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { generations: true } } },
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-10">
        <h1
          className="text-4xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          MES PROJETS
        </h1>
        <Link href="/dashboard/projets/nouveau">
          <Button>NOUVEAU PROJET</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border border-black p-16 text-center">
          <p className="text-sm font-semibold text-black/60 mb-6">
            Aucun projet. Créez votre premier projet.
          </p>
          <Link href="/dashboard/projets/nouveau">
            <Button>CRÉER UN PROJET</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/projets/${p.id}`}
              className="relative group border border-black p-8 -ml-[1px] -mt-[1px] hover:bg-black/[0.02] transition-colors"
            >
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-black w-0 group-hover:w-full transition-all duration-300"
              />
              <h3
                className="text-sm font-black tracking-wide mb-3 uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {p.title}
              </h3>
              {p.season && (
                <Badge variant="outline" className="mb-3">
                  {p.season}
                </Badge>
              )}
              <p className="text-[10px] font-semibold text-black/50 mt-4">
                {new Date(p.createdAt).toLocaleDateString("fr-FR")}
              </p>
              <p className="text-[10px] font-semibold text-black/50">
                {p._count.generations} génération(s)
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
