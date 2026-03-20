import Link from "next/link";

interface LogoProps {
  white?: boolean;
  size?: "sm" | "md";
}

export function Logo({ white, size = "md" }: LogoProps) {
  return (
    <Link href="/">
      <span
        className={`tracking-[0.3em] uppercase font-black ${
          size === "sm" ? "text-xs" : "text-sm"
        } ${white ? "text-white" : "text-black"}`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        FASHLINK
      </span>
    </Link>
  );
}
