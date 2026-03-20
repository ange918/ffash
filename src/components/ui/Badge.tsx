interface BadgeProps {
  children: React.ReactNode;
  variant?: "outline" | "filled";
  className?: string;
}

export function Badge({ children, variant = "outline", className = "" }: BadgeProps) {
  const variants = {
    outline: "border border-black text-black bg-white",
    filled: "bg-black text-white",
  };
  return (
    <span
      className={`inline-block text-[10px] tracking-widest uppercase font-semibold px-2 py-1 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
