"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onHide: () => void;
}

export function Toast({ message, show, onHide }: ToastProps) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onHide, 3000);
      return () => clearTimeout(t);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black text-white text-xs tracking-widest uppercase font-semibold px-6 py-4 border border-black">
      {message}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message: string) => setToast({ show: true, message });
  const hideToast = () => setToast((t) => ({ ...t, show: false }));

  return { toast, showToast, hideToast };
}
