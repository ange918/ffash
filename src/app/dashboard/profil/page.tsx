import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdnForm } from "@/components/features/AdnForm";

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
    select: {
      adn_inspirations: true,
      adn_valeurs: true,
      adn_marche: true,
      adn_prix: true,
      adn_style: true,
      adn_synthese: true,
    },
  });

  return (
    <div>
      <h1
        className="text-4xl font-black tracking-tight mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        VOTRE ADN CRÉATIF
      </h1>
      <p className="text-xs font-semibold text-black/50 tracking-wide mb-12">
        Définissez votre identité créative unique pour personnaliser vos générations IA.
      </p>

      <AdnForm initialData={user || undefined} />
    </div>
  );
}
