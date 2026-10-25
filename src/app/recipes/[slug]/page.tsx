import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/lib/products";
import { getRecipe, recipes } from "@/lib/recipes";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getRecipe((await params).slug);
  if (!r) return {};
  return { title: r.title, description: r.intro, alternates: { canonical: `/recipes/${r.slug}` } };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const recipe = getRecipe((await params).slug);
  if (!recipe) notFound();
  const used = Array.from(new Set(recipe.ingredients.flatMap((i) => (i.product ? [i.product] : []))))
    .map(getProduct)
    .filter((p) => p !== undefined);

  return (
    <article>
      <div className="container-x pt-6">
        <Breadcrumbs dark crumbs={[{ href: "/", label: "Home" }, { href: "/recipes", label: "Recipes" }, { label: recipe.title }]} />
      </div>
      <header className="container-x grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-14">
        <div>
          <p className="eyebrow text-terracotta">Recipe</p>
          <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">{recipe.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{recipe.intro}</p>
          <div className="mt-6 flex gap-6 text-sm font-semibold text-bark">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-terracotta" aria-hidden /> {recipe.time}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-terracotta" aria-hidden /> Serves {recipe.serves}
            </span>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image src={recipe.image} alt="" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="container-x grid gap-12 pb-20 lg:grid-cols-12">
        <section className="lg:col-span-5" aria-labelledby="ingredients">
          <div className="rounded-[1.6rem] bg-cream p-7">
            <h2 id="ingredients" className="text-3xl">Ingredients</h2>
            <ul className="mt-5 space-y-3">
              {recipe.ingredients.map((i) => (
                <li key={i.text} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden />
                  {i.product ? (
                    <Link href={`/product/${i.product}`} className="text-bark underline decoration-terracotta/50 underline-offset-4 hover:text-rust">
                      {i.text}
                    </Link>
                  ) : (
                    <span>{i.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="lg:col-span-7" aria-labelledby="method">
          <h2 id="method" className="text-3xl">Method</h2>
          <ol className="mt-6 space-y-6">
            {recipe.steps.map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-display text-4xl italic leading-none text-terracotta">{i + 1}</span>
                <p className="pt-1 text-lg leading-relaxed text-ink">{s}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {used.length > 0 && (
        <section className="bg-cream py-20" aria-labelledby="shop-recipe">
          <div className="container-x">
            <h2 id="shop-recipe" className="text-4xl">
              Shop this <span className="italic text-rust">recipe</span>
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-6 min-[460px]:grid-cols-2 lg:grid-cols-4">
              {used.map((p) => (
                <li key={p.slug} className="card-cell">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
