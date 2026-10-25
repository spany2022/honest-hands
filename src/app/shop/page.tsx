import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ShopView } from "@/components/ShopView";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Heritage rice, chakki atta, unpolished dals, GI-tagged spices, wood cold-pressed oils, bilona ghee, honey and handmade Odisha crafts.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string; collection?: string }> }) {
  const { q, collection } = await searchParams;
  const curated = collection ? collections[collection] : undefined;
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Shop" }]}
        eyebrow="From conscious farms to your kitchen"
        title={curated ? curated.name : "The HonestHands Pantry"}
        intro="Everything we stock, from everyday atta to GI-tagged spices and hand-painted Pattachitra."
      />
      <ShopView initialQuery={q ?? ""} collection={curated ? collection : undefined} />
    </>
  );
}
