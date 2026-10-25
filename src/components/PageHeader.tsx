import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Botanical } from "./Botanical";

type Crumb = { href?: string; label: string };

// Inner-page title in the catalogue style: rust panel, cream tracked eyebrow,
// and the translucent terracotta band behind the heading.
export function PageHeader({ eyebrow, title, intro, crumbs, children }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; crumbs?: Crumb[]; children?: ReactNode }) {
  return (
    <section className="container-x pt-4">
      <div className="on-dark relative overflow-hidden rounded-[2rem] bg-rust px-6 py-14 text-cream sm:px-12 lg:py-20">
        <Botanical tilt className="pointer-events-none absolute -right-32 -top-10 h-[16rem] w-[20rem] text-cream/25 sm:-right-44 sm:-top-14 sm:h-[22rem] sm:w-[27rem]" />
        <Botanical className="pointer-events-none absolute -bottom-4 left-0 hidden h-36 w-48 rotate-180 text-cream/15 sm:block" />
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && <p className="eyebrow mt-6 text-marigold">{eyebrow}</p>}
        <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] text-cream">
          <span className="band">{title}</span>
        </h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">{intro}</div>}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumbs({ crumbs, dark }: { crumbs: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1 text-sm ${dark ? "text-muted" : "text-cream/75"}`}>
        {crumbs.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            {c.href ? (
              <Link href={c.href} className="link-underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-bark" : "text-cream"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(base: string, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${base}${c.href}` } : {}),
    })),
  };
}
