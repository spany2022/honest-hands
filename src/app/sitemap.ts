import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/products";
import { recipes } from "@/lib/recipes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/cafe", "/recipes", "/about", "/contact", "/help", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${site.url}/shop/${c.slug}`, priority: 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/product/${p.slug}`, priority: 0.8 })),
    ...recipes.map((r) => ({ url: `${site.url}/recipes/${r.slug}`, priority: 0.5 })),
  ];
}
