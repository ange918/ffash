"use client";

import { useSession } from "next-auth/react";

export function TopBar() {
  const { data: session } = useSession();
  return (
    <div className="h-14 border-b border-black flex items-center justify-end px-8">
      <span className="text-xs font-semibold text-black/60 tracking-wide">
        {session?.user?.name || session?.user?.email}
      </span>
    </div>
  );
}
