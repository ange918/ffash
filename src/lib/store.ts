"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./products";

type CartItem = {
  product: Product;
  quantite: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantite: (id: number, quantite: number) => void;
  clearCart: () => void;
  totalArticles: () => number;
  totalPrix: () => string;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantite: i.quantite + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantite: 1 }],
          }));
        }
      },
      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        }));
      },
      updateQuantite: (id, quantite) => {
        if (quantite <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id ? { ...i, quantite } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalArticles: () => get().items.reduce((acc, i) => acc + i.quantite, 0),
      totalPrix: () => {
        const total = get().items.reduce(
          (acc, i) => acc + i.product.prix * i.quantite,
          0
        );
        return total.toLocaleString("fr-FR") + " FCFA";
      },
    }),
    {
      name: "cosmetics-cart",
    }
  )
);
