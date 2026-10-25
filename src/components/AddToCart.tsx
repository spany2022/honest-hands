"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { enquiryCopy, type Product } from "@/lib/products";
import { cn, rupees } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import { useCart } from "@/store/cart";
import { WhatsAppIcon } from "./Icons";

// Pack-size selector, quantity stepper and add-to-cart, shared by the product
// page and the quick-view modal.
type Props = {
  product: Product;
  compact?: boolean;
  // Pass both to control the selected pack/design from outside (e.g. to switch photos).
  variantId?: string;
  onVariantChange?: (id: string) => void;
};

export function AddToCart({ product, compact, variantId: controlled, onVariantChange }: Props) {
  const [own, setOwn] = useState(product.variants[0].id);
  const variantId = controlled ?? own;
  const setVariantId = onVariantChange ?? setOwn;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const variant = product.variants.find((v) => v.id === variantId)!;

  if (product.enquire) {
    const copy = enquiryCopy(product);
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted">{copy.note}</p>
        <a
          href={whatsappLink(copy.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full sm:w-auto"
        >
          <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className={cn("space-y-5", compact && "space-y-4")}>
      <div className="flex items-baseline gap-3">
        <p className="font-display text-4xl font-semibold text-bark">{rupees(variant.price * qty)}</p>
        {qty > 1 && <p className="text-sm text-muted">{rupees(variant.price)} each</p>}
      </div>

      <fieldset>
        <legend className="eyebrow mb-2 text-muted">{product.variants.some((v) => v.image) ? "Design" : "Pack size"}</legend>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rust",
                v.id === variantId ? "border-bark bg-bark text-cream" : "border-sand hover:border-bark",
              )}
            >
              <input type="radio" name={`variant-${product.slug}`} value={v.id} checked={v.id === variantId} onChange={() => setVariantId(v.id)} className="sr-only" />
              {v.label} · {rupees(v.price)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-sand bg-ivory">
          <button type="button" className="grid h-12 w-12 place-items-center rounded-full hover:bg-beige disabled:opacity-40" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite" aria-label={`Quantity ${qty}`}>
            {qty}
          </span>
          <button type="button" className="grid h-12 w-12 place-items-center rounded-full hover:bg-beige disabled:opacity-40" onClick={() => setQty((q) => Math.min(20, q + 1))} disabled={qty >= 20} aria-label="Increase quantity">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {product.inStock ? (
          <button
            type="button"
            className="btn btn-primary min-w-[12rem] flex-1 sm:flex-none"
            onClick={() => {
              add(product.slug, variantId, qty);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={added ? "y" : "n"} className="flex items-center gap-2" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
                {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {added ? "Added to cart" : "Add to cart"}
              </motion.span>
            </AnimatePresence>
          </button>
        ) : (
          <p className="font-medium text-muted">Currently out of stock</p>
        )}
      </div>

      <a
        href={whatsappLink(`Hello HonestHands, I have a question about ${product.name} (${variant.label}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-leaf link-underline"
      >
        <WhatsAppIcon className="h-4 w-4" /> Ask us about this product
      </a>
    </div>
  );
}
