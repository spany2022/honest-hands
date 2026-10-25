"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/format";
import { ProductVisual } from "./ProductVisual";
import { AddToCart } from "./AddToCart";

// Shares the selected pack/design between the product photo and the buy box,
// so choosing a design shows its photo.
const VariantContext = createContext<{ id: string; set: (id: string) => void } | null>(null);

function useVariant() {
  const ctx = useContext(VariantContext);
  if (!ctx) throw new Error("useVariant must be used inside VariantProvider");
  return ctx;
}

export function VariantProvider({ product, children }: { product: Product; children: ReactNode }) {
  const [id, set] = useState(product.variants[0].id);
  return <VariantContext.Provider value={{ id, set }}>{children}</VariantContext.Provider>;
}

export function ProductGallery({ product }: { product: Product }) {
  const { id, set } = useVariant();
  const variant = product.variants.find((v) => v.id === id)!;
  const designs = product.variants.filter((v) => v.image);

  return (
    <div>
      <ProductVisual
        product={product}
        image={variant.image}
        priority
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="aspect-square overflow-hidden rounded-[2rem]"
      />
      {designs.length > 1 && (
        <div className="mt-4 flex gap-3" role="radiogroup" aria-label="Choose a design">
          {designs.map((v) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={v.id === id}
              aria-label={v.label}
              onClick={() => set(v.id)}
              className={cn(
                "w-20 overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-ivory transition sm:w-24",
                v.id === id ? "ring-rust" : "ring-transparent opacity-70 hover:opacity-100",
              )}
            >
              <ProductVisual product={product} image={v.image} sizes="96px" className="aspect-square" />
            </button>
          ))}
        </div>
      )}
      {!product.image && !variant.image && <p className="mt-3 text-xs text-muted">Product photograph coming soon — illustration shown.</p>}
    </div>
  );
}

export function ProductBuyBox({ product }: { product: Product }) {
  const { id, set } = useVariant();
  return <AddToCart product={product} variantId={id} onVariantChange={set} />;
}
