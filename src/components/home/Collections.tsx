import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, productsIn, type Category } from "@/lib/products";
import { cn } from "@/lib/format";
import { Reveal } from "../Reveal";

// Editorial, alternating layout on desktop; a swipeable rail on mobile.
const layout = [
  "lg:col-span-7 lg:row-span-2 lg:aspect-auto",
  "lg:col-span-5 lg:aspect-[16/10]",
  "lg:col-span-5 lg:aspect-[16/10]",
  "lg:col-span-4 lg:aspect-[4/4.4]",
  "lg:col-span-4 lg:aspect-[4/4.4]",
  "lg:col-span-4 lg:aspect-[4/4.4]",
];

// Fresh Produce & Wellness stays in the shop but is not featured here.
const homeCollections = categories.filter((c) => c.slug !== "fresh-produce-wellness");

export function Collections() {
  return (
    <section className="relative bg-cream py-24 lg:py-32" aria-labelledby="collections-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-terracotta">Explore our collections</p>
            <h2 id="collections-title" className="mt-4 max-w-2xl text-[clamp(2.3rem,4.6vw,4rem)]">
              <span className="band">A pantry</span> built the old-fashioned way.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm leading-relaxed text-muted">
              From heritage rice to hand-painted Pattachitra — every collection is stocked in our Bhubaneswar store.
            </p>
          </Reveal>
        </div>

        <div className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {homeCollections.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08} className={cn("relative aspect-[4/5] w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto", layout[i])}>
              <CategoryCard category={c} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const count = productsIn(category.slug).length;
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[1.8rem] bg-rust text-cream transition-transform duration-700 ease-[var(--ease-soft)] hover:-translate-y-1.5"
    >
      {category.image ? (
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 80vw"
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.07]"
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,162,59,0.45),transparent_45%),repeating-conic-gradient(from_45deg,rgba(247,244,228,0.08)_0_25%,transparent_0_50%)] bg-[length:100%_100%,28px_28px]" />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bark/95 via-bark/55 via-55% to-bark/0 lg:from-bark/85 lg:via-bark/25 lg:via-50%" />
      <span aria-hidden className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream text-rust shadow-md sm:hidden">
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="relative flex items-end justify-between gap-4 p-5 sm:p-8">
        <div className="min-w-0 [text-shadow:0_1px_14px_rgba(40,22,12,0.45)]">
          <p className="eyebrow text-cream/75">
            {String(index + 1).padStart(2, "0")} · {count} products
          </p>
          <h3 className="mt-2 text-[1.75rem] text-cream sm:text-[2.1rem]">{category.name}</h3>
          <p className="mt-2 line-clamp-2 max-w-md text-[13px] leading-relaxed text-cream/90 opacity-100 sm:line-clamp-none sm:text-sm sm:text-cream/80 transition-all duration-500 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            {category.description}
          </p>
        </div>
        <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-rust transition-transform duration-500 group-hover:rotate-45 sm:grid">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
