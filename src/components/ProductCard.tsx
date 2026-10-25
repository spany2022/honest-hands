"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Eye, Plus } from "lucide-react";
import { enquiryCopy, type Product } from "@/lib/products";
import { rupees, cn } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import { useCart } from "@/store/cart";
import { ProductVisual } from "./ProductVisual";
import { QuickView } from "./QuickView";
import { WhatsAppIcon } from "./Icons";

// Pack sizes show as buttons when a few short ones fit on one line,
// otherwise as a dropdown, so every card keeps the same one-line height.
const fitsAsPills = (p: Product) => p.variants.length <= 3 && p.variants.every((v) => v.label.length <= 7);

// The card is a five-row subgrid (photo, name, description, size, buy) so
// rows line up across a grid row; see `.card-cell` in globals.css.
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [added, setAdded] = useState(false);
  const [quick, setQuick] = useState(false);
  const closeQuick = useCallback(() => setQuick(false), []);
  const add = useCart((s) => s.add);
  const variant = product.variants.find((v) => v.id === variantId)!;

  function onAdd() {
    add(product.slug, variantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="card-cell group relative">
      {/* 1 · photo */}
      <div className="relative self-start overflow-hidden rounded-[1.4rem] bg-beige ring-1 ring-sand/60 transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-24px_rgba(59,33,20,0.45)]">
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="block">
          <ProductVisual
            product={product}
            image={variant.image}
            priority={priority}
            className="aspect-square"
            imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
          />
        </Link>
        {product.badges?.[0] && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-rust backdrop-blur">
            {product.badges[0]}
          </span>
        )}
        <button
          type="button"
          onClick={() => setQuick(true)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ivory/90 text-bark opacity-100 backdrop-blur transition hover:bg-rust hover:text-cream md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          aria-label={`Quick view: ${product.name}`}
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* 2 · name */}
      <div className="pt-4">
        <h3 className="text-[1.35rem] leading-tight">
          <Link href={`/product/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        {product.localName && <p className="font-hand text-lg leading-tight text-terracotta">{product.localName}</p>}
      </div>

      {/* 3 · description */}
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{product.short}</p>

      {/* 4 · pack size */}
      <div className="pt-3">
        {product.enquire ? (
          <p className="text-xs font-medium text-muted">{product.enquire === "harvest" ? "Price changes daily" : "Price on request"}</p>
        ) : product.variants.length === 1 ? (
          <span className="inline-block rounded-full border border-sand px-3 py-1 text-xs font-medium text-ink">{variant.label}</span>
        ) : fitsAsPills(product) ? (
          <div className="flex gap-1.5" role="radiogroup" aria-label="Pack size">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={v.id === variantId}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition",
                  v.id === variantId ? "border-bark bg-bark text-cream" : "border-sand text-ink hover:border-bark",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="relative">
            <label htmlFor={`size-${product.slug}`} className="sr-only">
              Pack size
            </label>
            <select
              id={`size-${product.slug}`}
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-full border border-sand bg-ivory py-1.5 pl-3 pr-8 text-xs font-medium text-ink transition hover:border-bark focus:border-rust focus:outline-none"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} — {rupees(v.price)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" aria-hidden />
          </div>
        )}
      </div>

      {/* 5 · buy */}
      <div className="@container flex items-center gap-3 pb-12 pt-4">
        {!product.inStock ? (
          <p className="text-sm font-medium text-muted">Currently out of stock</p>
        ) : product.enquire ? (
          <a href={whatsappLink(enquiryCopy(product).message)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full !py-3">
            <WhatsAppIcon className="h-4 w-4" /> {enquiryCopy(product).button}
          </a>
        ) : (
          <>
            <div className="shrink-0 leading-none">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={variant.price}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="font-display text-[1.6rem] font-semibold text-bark tabular-nums"
                >
                  {rupees(variant.price)}
                </motion.p>
              </AnimatePresence>
              <p className="mt-1 text-[11px] text-muted">{variant.label.replace(/^.*· /, "")}</p>
            </div>
            <button type="button" onClick={onAdd} className="btn btn-primary relative min-w-0 flex-1 overflow-hidden !px-3 !py-3">
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span key="ok" className="flex items-center gap-2" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}>
                    <Check className="h-4 w-4" /> Added
                  </motion.span>
                ) : (
                  <motion.span key="add" className="flex items-center gap-2" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }}>
                    <Plus className="h-4 w-4" />
                    <span className="@[15rem]:hidden">Add</span>
                    <span className="hidden @[15rem]:inline">Add to cart</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </>
        )}
      </div>

      <QuickView product={product} open={quick} onClose={closeQuick} />
    </article>
  );
}
