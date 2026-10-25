import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, breadcrumbJsonLd } from "@/components/PageHeader";
import { ShopView } from "@/components/ShopView";
import { categories, getCategory } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return { title: c.name, description: c.description, alternates: { canonical: `/shop/${c.slug}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const crumbs = [{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { label: c.name }];
  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={c.short} title={c.name} intro={c.description} />
      <ShopView category={c.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, crumbs)) }} />
    </>
  );
}
