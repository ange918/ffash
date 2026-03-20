import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <main className="md:ml-60 min-h-screen">
        <div className="px-8 py-12 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
