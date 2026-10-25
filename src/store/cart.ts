"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/lib/products";

export type CartLine = { slug: string; variantId: string; qty: number };

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (slug: string, variantId: string, qty?: number) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  remove: (slug: string, variantId: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const same = (l: CartLine, slug: string, variantId: string) => l.slug === slug && l.variantId === variantId;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (slug, variantId, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => same(l, slug, variantId));
          const lines = existing
            ? s.lines.map((l) => (same(l, slug, variantId) ? { ...l, qty: Math.min(l.qty + qty, 20) } : l))
            : [...s.lines, { slug, variantId, qty }];
          return { lines, open: true };
        }),
      setQty: (slug, variantId, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => !same(l, slug, variantId))
              : s.lines.map((l) => (same(l, slug, variantId) ? { ...l, qty: Math.min(qty, 20) } : l)),
        })),
      remove: (slug, variantId) => set((s) => ({ lines: s.lines.filter((l) => !same(l, slug, variantId)) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    { name: "honesthands-cart", partialize: (s) => ({ lines: s.lines }) },
  ),
);

// Resolve cart lines against the catalogue, dropping anything no longer sold.
export function resolveLines(lines: CartLine[]) {
  return lines.flatMap((l) => {
    const product = getProduct(l.slug);
    const variant = product?.variants.find((v) => v.id === l.variantId);
    return product && variant ? [{ ...l, product, variant, total: variant.price * l.qty }] : [];
  });
}
