import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hand, Leaf, Store } from "lucide-react";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { ProductBuyBox, ProductGallery, VariantProvider } from "@/components/ProductDetail";
import { Reveal } from "@/components/Reveal";
import { getCategory, getProduct, products, relatedProducts } from "@/lib/products";
import { recipes } from "@/lib/recipes";
import { PRICES_ARE_DEMO, site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const title = p.localName ? `${p.name} (${p.localName})` : p.name;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title, description: p.short, images: p.image ? [p.image] : undefined },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const related = relatedProducts(product);
  const usedIn = recipes.filter((r) => r.ingredients.some((i) => i.product === product.slug));
  const crumbs = [
    { href: "/", label: "Home" },
    { href: `/shop/${category.slug}`, label: category.name },
    { label: product.name },
  ];

  // Offers are only published to search engines once prices are real.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category.name,
    brand: { "@type": "Brand", name: site.name },
    ...(product.image ? { image: `${site.url}${product.image}` } : {}),
    ...(!PRICES_ARE_DEMO && !product.enquire
      ? {
          offers: product.variants.map((v) => ({
            "@type": "Offer",
            name: v.label,
            price: v.price,
            priceCurrency: "INR",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${site.url}/product/${product.slug}`,
          })),
        }
      : {}),
  };

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs crumbs={crumbs} dark />
      </div>

      <VariantProvider product={product}>
      <section className="container-x grid gap-10 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <ProductGallery product={product} />
          </div>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <Link href={`/shop/${category.slug}`} className="eyebrow text-terracotta link-underline">
              {category.name}
            </Link>
            <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">{product.name}</h1>
            {product.localName && <p className="font-hand text-3xl text-terracotta">{product.localName}</p>}
            {product.badges && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.badges.map((b) => (
                  <li key={b} className="rounded-full bg-beige px-3 py-1 text-xs font-semibold text-rust">
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-lg leading-relaxed text-muted">{product.description}</p>
          </Reveal>

          <div className="mt-8 rounded-[1.6rem] border border-sand/70 bg-cream p-6 sm:p-8">
            <ProductBuyBox product={product} />
            {PRICES_ARE_DEMO && <p className="mt-5 text-xs text-muted">Preview: price and pack sizes are sample values.</p>}
          </div>

          <ul className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <Leaf className="h-5 w-5 shrink-0 text-leaf" aria-hidden />
              <span>{product.kind === "craft" ? "Natural materials, traditional craft" : "No artificial additives or chemical preservatives"}</span>
            </li>
            <li className="flex items-start gap-3">
              <Hand className="h-5 w-5 shrink-0 text-leaf" aria-hidden />
              <span>{product.kind === "craft" ? "Rooted in Odisha's craft traditions" : "Prepared by traditional methods"}</span>
            </li>
            <li className="flex items-start gap-3">
              <Store className="h-5 w-5 shrink-0 text-leaf" aria-hidden />
              <span>Available at our Rasulgarh store</span>
            </li>
          </ul>

          {usedIn.length > 0 && (
            <div className="mt-10 border-t border-sand pt-8">
              <p className="eyebrow text-muted">Cook with it</p>
              <ul className="mt-3 space-y-2">
                {usedIn.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/recipes/${r.slug}`} className="font-display text-2xl font-semibold text-rust link-underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      </VariantProvider>

      {related.length > 0 && (
        <section className="bg-cream py-20" aria-labelledby="related-title">
          <div className="container-x">
            <h2 id="related-title" className="text-4xl">
              More from <span className="italic text-rust">{category.name}</span>
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-6 min-[460px]:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug} className="card-cell">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, crumbs)) }} />
    </>
  );
}
