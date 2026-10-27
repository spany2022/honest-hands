"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Package, ShoppingBag } from "lucide-react";
import { getProduct } from "@/lib/products";
import { rupees } from "@/lib/format";
import { useCart } from "@/store/cart";
import { Botanical } from "../Botanical";
import { Reveal } from "../Reveal";

// Homepage feature for the Monthly Ration Box bundle.
export function MonthlyBox() {
  const box = getProduct("monthly-ration-box");
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  if (!box?.contents) return null;
  const price = box.variants[0].price;

  return (
    <section className="py-8 lg:py-12" aria-labelledby="box-title">
      <div className="container-x">
        <div className="on-dark relative isolate overflow-hidden rounded-[2.2rem] bg-rust text-cream">
          <Botanical tilt className="pointer-events-none absolute -right-36 -top-10 h-[18rem] w-[22rem] text-cream/20 lg:-right-56 lg:-top-16 lg:h-[28rem] lg:w-[34rem]" />
          <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <Reveal className="relative lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-[1.8rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <Image src={box.image!} alt="Products packed in the HonestHands Monthly Ration Box: rice, atta, mustard oil, moong dal, chatua, honey, turmeric, besan and badi" fill sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
              </div>
              <span className="absolute -right-2 -top-3 grid h-24 w-24 place-items-center rounded-full bg-marigold text-center text-bark shadow-lg sm:h-28 sm:w-28">
                <span className="leading-tight">
                  <span className="block font-display text-3xl font-semibold sm:text-4xl">{box.contents.length}</span>
                  <span className="block text-[10px] font-bold tracking-[0.15em] uppercase">items</span>
                </span>
              </span>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-marigold/50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-marigold uppercase">
                <Package className="h-3.5 w-3.5" aria-hidden /> New · Monthly Ration Box
              </p>
              <h2 id="box-title" className="mt-5 text-[clamp(2.4rem,4.6vw,4rem)] text-cream">
                Your whole month&apos;s kitchen, <span className="italic text-marigold">in one box.</span>
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/80">
                Twenty everyday HonestHands staples — from hand-pounded rice and chakki atta to cold-pressed mustard oil, chatua, wild honey and
                a full set of spices.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm text-cream/90 sm:grid-cols-2">
                {box.contents.map((c) => (
                  <li key={c.name} className="flex items-baseline justify-between gap-3 border-b border-cream/10 py-1">
                    <span className="min-w-0 truncate">{c.name}</span>
                    <span className="shrink-0 font-semibold text-marigold">{c.qty}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div>
                  <p className="font-display text-5xl font-semibold text-cream">{rupees(price)}</p>
                  <p className="text-xs text-cream/70">per box · pick up from our Rasulgarh store</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      add(box.slug, box.variants[0].id);
                      setAdded(true);
                      setTimeout(() => setAdded(false), 1600);
                    }}
                    className="btn btn-light"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span key={added ? "y" : "n"} className="flex items-center gap-2" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                        {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                        {added ? "Added to cart" : "Add box to cart"}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                  <Link href={`/product/${box.slug}`} className="btn border border-cream/35 text-cream hover:bg-cream hover:text-rust">
                    See full list <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
