"use client";

interface SpinnerProps {
  text?: string;
  size?: "sm" | "md";
}

export function Spinner({ text, size = "md" }: SpinnerProps) {
  const sz = size === "sm" ? "w-4 h-4" : "w-6 h-6";
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${sz} border-2 border-black border-t-transparent animate-spin`}
        style={{ animationDuration: "0.7s" }}
      />
      {text && (
        <p className="text-xs tracking-widest uppercase font-semibold text-black/70">
          {text}
        </p>
      )}
    </div>
  );
}
