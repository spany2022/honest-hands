"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { categories, fromPrice, products, searchProducts, type CategorySlug } from "@/lib/products";
import { collections } from "@/lib/collections";
import { cn } from "@/lib/format";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export function ShopView({ category, initialQuery = "", collection }: { category?: CategorySlug; initialQuery?: string; collection?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("featured");
  const router = useRouter();
  const pathname = usePathname();
  const curated = collection ? collections[collection] : undefined;

  const list = useMemo(() => {
    let l = q.trim() ? searchProducts(q) : products;
    if (category) l = l.filter((p) => p.category === category);
    if (curated) l = l.filter((p) => curated.slugs.includes(p.slug));
    const sorted = [...l];
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    if (sort === "price-asc") sorted.sort((a, b) => fromPrice(a) - fromPrice(b));
    if (sort === "price-desc") sorted.sort((a, b) => fromPrice(b) - fromPrice(a));
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [q, sort, category, curated]);

  function updateQuery(v: string) {
    setQ(v);
    const params = new URLSearchParams();
    if (v.trim()) params.set("q", v.trim());
    if (collection) params.set("collection", collection);
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
  }

  return (
    <div className="container-x py-12 lg:py-16">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Categories" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
          <Chip href="/shop" active={!category && !curated}>
            All
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} href={`/shop/${c.slug}`} active={category === c.slug}>
              {c.short}
            </Chip>
          ))}
          <Chip href="/shop?collection=odisha-heritage" active={collection === "odisha-heritage"}>
            Odisha Heritage
          </Chip>
        </nav>

        <div className="flex gap-3">
          <div className="relative flex-1 lg:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input id="shop-search" value={q} onChange={(e) => updateQuery(e.target.value)} placeholder="Search products" className="field !rounded-full !py-3 !pl-10" />
            {q && (
              <button type="button" onClick={() => updateQuery("")} className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-beige" aria-label="Clear search">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <label htmlFor="shop-sort" className="sr-only">
            Sort by
          </label>
          <select id="shop-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field !w-auto !rounded-full !py-3">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "product" : "products"}
        {q.trim() && <> for “{q.trim()}”</>}
      </p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-[1.6rem] bg-beige/60 p-10 text-center">
          <p className="font-display text-3xl text-bark">Nothing matched your search.</p>
          <p className="mt-2 text-muted">Try a different word — we also understand Odia names like haladi, kolatha or chatua.</p>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid grid-cols-1 gap-x-6 min-[460px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.li key={p.slug} className="card-cell" layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }}>
                <ProductCard product={p} priority={i < 4} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
        active ? "border-rust bg-rust text-cream" : "border-sand text-bark hover:border-bark",
      )}
    >
      {children}
    </Link>
  );
}
