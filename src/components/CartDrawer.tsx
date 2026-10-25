"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { resolveLines, useCart } from "@/store/cart";
import { rupees } from "@/lib/format";
import { HOME_DELIVERY, PRICES_ARE_DEMO } from "@/lib/site";
import { useMounted } from "@/lib/useMounted";
import { ProductVisual } from "./ProductVisual";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove } = useCart();
  const mounted = useMounted();
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = resolveLines(lines);
  const subtotal = items.reduce((s, i) => s + i.total, 0);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-bark/50 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-sand/70 px-6 py-5">
              <div>
                <p className="eyebrow text-terracotta">Your basket</p>
                <h2 className="text-3xl">Cart</h2>
              </div>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-beige" aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-terracotta" aria-hidden />
                <p className="font-display text-2xl text-bark">Your cart is empty</p>
                <p className="text-sm text-muted">Start with our everyday essentials — chakki atta, chatua, ghee and more.</p>
                <Link href="/shop" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
                  Browse the shop
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-sand/60 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.li
                        key={`${i.slug}-${i.variantId}`}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0 }}
                        className="flex gap-4 py-5"
                      >
                        <ProductVisual product={i.product} image={i.variant.image} className="h-24 w-20 shrink-0 rounded-xl" sizes="80px" />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-2">
                            <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="font-display text-lg font-semibold leading-tight text-bark">
                              {i.product.name}
                            </Link>
                            <button type="button" onClick={() => remove(i.slug, i.variantId)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-beige hover:text-rust" aria-label={`Remove ${i.product.name}`}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm text-muted">{i.variant.label}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-sand">
                              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-beige" onClick={() => setQty(i.slug, i.variantId, i.qty - 1)} aria-label="Decrease quantity">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold tabular-nums">{i.qty}</span>
                              <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-beige" onClick={() => setQty(i.slug, i.variantId, i.qty + 1)} aria-label="Increase quantity">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="font-semibold tabular-nums">{rupees(i.total)}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-sand/70 bg-cream px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">Subtotal</span>
                    <motion.span key={subtotal} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-semibold text-bark">
                      {rupees(subtotal)}
                    </motion.span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {HOME_DELIVERY ? "Delivery charges are confirmed with you before dispatch." : "Store pickup only for now — we confirm your order on WhatsApp."}
                    {PRICES_ARE_DEMO && " Prices in this preview are sample values."}
                  </p>
                  <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
                    Proceed to checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
