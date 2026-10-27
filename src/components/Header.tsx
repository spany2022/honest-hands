"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories, getProduct } from "@/lib/products";
import { site } from "@/lib/site";
import { cn, rupees } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useMounted } from "@/lib/useMounted";
import { SearchOverlay } from "./SearchOverlay";

// The Monthly Ration Box gets its own nav link and a card in the phone menu.
const box = getProduct("monthly-ration-box");
const boxHref = "/product/monthly-ration-box";
// Remove once the box is no longer new.
const BOX_IS_NEW = true;

const nav = [
  { href: "/cafe", label: "Honest Kappi" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Visit Us" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const mounted = useMounted();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const setOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || menu ? "bg-ivory/85 shadow-[0_1px_0_rgba(59,33,20,0.08)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <Image src="/images/brand/logo.png" alt="" width={56} height={56} priority className="h-12 w-12 lg:h-14 lg:w-14" />
            <span className="leading-none">
              <span className="block font-display text-[1.55rem] font-bold italic text-rust">{site.name}</span>
              <span className="hidden text-[0.62rem] tracking-[0.2em] text-muted uppercase sm:block">Organic &amp; Handmade</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button
                type="button"
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-bark hover:bg-beige/70"
                aria-expanded={shopOpen}
                aria-controls="shop-menu"
                onClick={() => setShopOpen((v) => !v)}
              >
                Shop <ChevronDown className={cn("h-4 w-4 transition-transform", shopOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    id="shop-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 top-full w-[26rem] pt-3"
                  >
                    <div className="rounded-3xl border border-sand/60 bg-ivory p-3 shadow-[0_30px_60px_-30px_rgba(59,33,20,0.5)]">
                      {categories.map((c) => (
                        <Link key={c.slug} href={`/shop/${c.slug}`} className="block rounded-2xl px-4 py-3 hover:bg-beige/70">
                          <span className="block font-display text-lg font-semibold text-bark">{c.name}</span>
                          <span className="block text-xs text-muted">{c.short}</span>
                        </Link>
                      ))}
                      <Link href="/shop" className="mt-1 block rounded-2xl bg-rust px-4 py-3 text-sm font-semibold text-cream hover:bg-rust-deep">
                        View all products →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {box && (
              <Link
                href={boxHref}
                className={cn("flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-bark hover:bg-beige/70", pathname === boxHref && "text-rust")}
              >
                Monthly Box
                {BOX_IS_NEW && <span className="rounded-full bg-marigold px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-bark uppercase">New</span>}
              </Link>
            )}
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn("rounded-full px-4 py-2 text-sm font-semibold text-bark hover:bg-beige/70", pathname.startsWith(n.href) && "text-rust")}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setSearch(true)} className="grid h-11 w-11 place-items-center rounded-full text-bark hover:bg-beige/70" aria-label="Search products">
              <Search className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setOpen(true)} className="relative grid h-11 w-11 place-items-center rounded-full text-bark hover:bg-beige/70" aria-label={`Open cart${mounted ? `, ${count} items` : ""}`}>
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {mounted && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rust px-1 text-[10px] font-bold text-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button type="button" onClick={() => setMenu((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full text-bark hover:bg-beige/70 lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu}>
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-y-auto bg-ivory lg:hidden"
            >
              <div className="container-x py-6">
                {box && (
                  <Link href={boxHref} className="mb-6 flex items-center gap-4 rounded-2xl bg-rust p-3 text-cream">
                    <Image src={box.image!} alt="" width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-display text-xl font-semibold">
                        Monthly Ration Box
                        {BOX_IS_NEW && <span className="rounded-full bg-marigold px-1.5 py-0.5 font-sans text-[9px] font-bold tracking-wider text-bark uppercase">New</span>}
                      </span>
                      <span className="block text-sm text-cream/80">
                        {box.contents?.length} essentials · {rupees(box.variants[0].price)}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </Link>
                )}
                <p className="eyebrow text-terracotta">Shop by collection</p>
                <ul className="mt-3 divide-y divide-sand/60">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/shop/${c.slug}`} className="block py-3 font-display text-2xl font-semibold text-bark">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/shop" className="block py-3 font-semibold text-rust">
                      All products →
                    </Link>
                  </li>
                </ul>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <Link href={n.href} className="block rounded-2xl bg-beige/70 px-4 py-4 font-semibold text-bark">
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <a href={site.phoneHref} className="mt-6 block text-sm text-muted">
                  Call us: <span className="font-semibold text-bark">{site.phone}</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
