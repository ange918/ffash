import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      projects: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          _count: { select: { generations: true, illustrations: true } },
        },
      },
      _count: { select: { projects: true } },
    },
  });

  const totalIllustrations = await prisma.illustration.count({
    where: { project: { userId: user!.id } },
  });

  const lastActivity = user?.projects[0]?.createdAt;

  return (
    <div>
      <h1
        className="text-4xl md:text-5xl font-black tracking-tight mb-10"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        BONJOUR, {user?.name?.toUpperCase()}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12">
        {[
          { label: "Projets créés", value: user?._count.projects || 0 },
          { label: "Illustrations générées", value: totalIllustrations },
          {
            label: "Dernière activité",
            value: lastActivity
              ? new Date(lastActivity).toLocaleDateString("fr-FR")
              : "—",
          },
        ].map((stat) => (
          <div key={stat.label} className="border border-black p-8 -ml-[1px] -mt-[1px]">
            <p className="text-xs tracking-widest uppercase font-semibold text-black/50 mb-2">
              {stat.label}
            </p>
            <p
              className="text-3xl font-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-sm font-black tracking-widest uppercase"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          PROJETS RÉCENTS
        </h2>
        <Link href="/dashboard/projets/nouveau">
          <Button variant="primary">NOUVEAU PROJET</Button>
        </Link>
      </div>

      {user?.projects.length === 0 ? (
        <div className="border border-black p-16 text-center">
          <p className="text-sm font-semibold text-black/60 mb-6">
            Aucun projet. Créez votre premier projet.
          </p>
          <Link href="/dashboard/projets/nouveau">
            <Button>CRÉER UN PROJET</Button>
          </Link>
        </div>
      ) : (
        <div className="border border-black overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-black">
                {["Titre", "Saison", "Date", "Statut", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 font-black tracking-widest uppercase text-[10px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {user?.projects.map((p) => (
                <tr key={p.id} className="border-b border-black/10 hover:bg-black/5">
                  <td className="px-6 py-4 font-semibold">{p.title}</td>
                  <td className="px-6 py-4">
                    {p.season ? <Badge variant="outline">{p.season}</Badge> : "—"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-black/60">
                    {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="filled">{p._count.generations} génération(s)</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/projets/${p.id}`}
                      className="text-[10px] tracking-widest uppercase font-black underline"
                    >
                      OUVRIR
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
