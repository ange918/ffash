"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center text-xs tracking-widest uppercase font-semibold px-6 py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-black text-white border border-black hover:bg-white hover:text-black",
    outline: "bg-white text-black border border-black hover:bg-black hover:text-white",
    ghost: "bg-transparent text-black hover:underline",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 border border-current border-t-transparent animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
