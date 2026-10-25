"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { getCategory, type Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";
import { AddToCart } from "./AddToCart";

export function QuickView({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant = product.variants.find((v) => v.id === variantId)!;
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-bark/55 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-ivory shadow-2xl sm:rounded-[2rem] md:grid-cols-2"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductVisual product={product} image={variant.image} className="aspect-square md:aspect-auto md:min-h-full" sizes="(min-width: 768px) 450px, 100vw" />
            <div className="p-6 sm:p-9">
              <button ref={closeRef} type="button" onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 hover:bg-beige" aria-label="Close quick view">
                <X className="h-5 w-5" />
              </button>
              <p className="eyebrow text-terracotta">{getCategory(product.category)?.name}</p>
              <h2 className="mt-3 text-4xl">{product.name}</h2>
              {product.localName && <p className="font-hand text-2xl text-terracotta">{product.localName}</p>}
              <p className="mt-4 leading-relaxed text-muted">{product.description}</p>
              <div className="mt-6">
                <AddToCart product={product} compact variantId={variantId} onVariantChange={setVariantId} />
              </div>
              <Link href={`/product/${product.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rust link-underline" onClick={onClose}>
                View full details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
