"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredProducts, getCategory, type CategorySlug } from "@/lib/products";
import { cn } from "@/lib/format";
import { ProductCard } from "../ProductCard";
import { Reveal } from "../Reveal";

const all = featuredProducts();
const tabs: (CategorySlug | "all")[] = ["all", ...Array.from(new Set(all.map((p) => p.category)))];

export function Essentials() {
  const [tab, setTab] = useState<CategorySlug | "all">("all");
  const list = tab === "all" ? all : all.filter((p) => p.category === tab);

  return (
    <section className="py-24 lg:py-32" aria-labelledby="essentials-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow text-terracotta">The everyday essentials collection</p>
            <h2 id="essentials-title" className="mt-4 text-[clamp(2.3rem,4.6vw,4rem)]">
              What our kitchen <span className="italic text-rust">never runs out of.</span>
            </h2>
          </Reveal>
          <Link href="/shop" className="inline-flex shrink-0 items-center gap-2 font-semibold text-rust link-underline">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter essentials">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                tab === t ? "text-cream" : "text-bark hover:bg-beige",
              )}
            >
              {tab === t && <motion.span layoutId="ess-tab" className="absolute inset-0 rounded-full bg-rust" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{t === "all" ? "Bestsellers" : getCategory(t)?.short}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="no-scrollbar -mx-4 mt-10 grid snap-x snap-mandatory auto-cols-[76%] grid-flow-col grid-rows-[repeat(5,auto)] gap-x-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-rows-none sm:grid-cols-2 sm:gap-x-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="card-cell snap-start"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
