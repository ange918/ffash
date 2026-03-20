"use client";

import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white border border-black p-8 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h3
              className="text-sm font-black tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="ml-auto bg-black text-white w-8 h-8 flex items-center justify-center text-lg leading-none hover:bg-black/70"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
