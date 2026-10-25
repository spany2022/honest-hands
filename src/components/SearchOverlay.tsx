"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { fromPrice, searchProducts } from "@/lib/products";
import { rupees } from "@/lib/format";
import { ProductVisual } from "./ProductVisual";

const suggestions = ["Chatua", "Kandhamal", "Ghee", "Kolatha", "Honey", "Badi", "Mustard oil", "Saree"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = searchProducts(q).slice(0, 6);

  // Start every search with an empty box.
  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-bark/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="relative mx-auto mt-0 max-h-[100dvh] w-full max-w-3xl overflow-y-auto bg-ivory p-5 shadow-2xl sm:mt-20 sm:rounded-[2rem] sm:p-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
                router.push(`/shop?q=${encodeURIComponent(q)}`);
              }}
              className="flex items-center gap-3 border-b border-sand pb-4"
            >
              <Search className="h-6 w-6 shrink-0 text-terracotta" aria-hidden />
              <label htmlFor="site-search" className="sr-only">
                Search products
              </label>
              <input
                id="site-search"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search atta, chatua, haladi, ghee…"
                className="w-full bg-transparent font-display text-2xl text-bark placeholder:text-muted/60 focus:outline-none sm:text-3xl"
                autoComplete="off"
              />
              <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-beige" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </form>

            {q.trim() === "" ? (
              <div className="pt-5">
                <p className="eyebrow text-muted">Popular</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-sand px-4 py-2 text-sm hover:border-bark">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="pt-6 text-muted">
                Nothing found for “{q}”. Try another word, or ask us on WhatsApp — we may have it in store.
              </p>
            ) : (
              <ul className="divide-y divide-sand/60 pt-2" aria-live="polite">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-2xl py-3 hover:bg-beige/50">
                      <ProductVisual product={p} className="h-16 w-16 shrink-0 rounded-xl" sizes="64px" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-xl font-semibold text-bark">{p.name}</span>
                        <span className="block truncate text-sm text-muted">{p.localName ?? p.short}</span>
                      </span>
                      {!p.enquire && <span className="text-sm font-semibold">from {rupees(fromPrice(p))}</span>}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Link href={`/shop?q=${encodeURIComponent(q)}`} onClick={onClose} className="inline-flex items-center gap-2 font-semibold text-rust">
                    See all results <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
