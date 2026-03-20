"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/dashboard/profil", label: "Profil ADN" },
  { href: "/dashboard/projets", label: "Mes Projets" },
  { href: "/dashboard/projets/nouveau", label: "Nouveau Projet" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white w-10 h-10 flex items-center justify-center text-xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? "×" : "≡"}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-black text-white flex flex-col z-40 border-r border-white transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-6 py-8 border-b border-white/20">
          <span
            className="text-sm tracking-[0.3em] uppercase font-black text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            FASHLINK
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3 py-6">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`relative group px-4 py-3 text-xs tracking-widest uppercase font-semibold transition-colors
                  ${active ? "text-white" : "text-white/50 hover:text-white"}
                `}
              >
                {item.label}
                <span
                  className={`absolute bottom-2 left-4 h-[1px] bg-white transition-all duration-300
                    ${active ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-white/20">
          <p className="text-[10px] text-white/50 font-semibold mb-3 truncate">
            {session?.user?.email}
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="w-full text-[10px] tracking-widest uppercase font-semibold border border-white text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            DÉCONNEXION
          </button>
        </div>
      </aside>
    </>
  );
}
