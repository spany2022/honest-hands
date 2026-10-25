import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { recipes, type Recipe } from "@/lib/recipes";
import { cn } from "@/lib/format";
import { Reveal } from "../Reveal";

export function RecipesTeaser() {
  const [lead, ...rest] = recipes;
  return (
    <section className="py-24 lg:py-32" aria-labelledby="recipes-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-terracotta">Recipes &amp; everyday inspiration</p>
            <h2 id="recipes-title" className="mt-4 max-w-2xl text-[clamp(2.3rem,4.6vw,4rem)]">
              From our pantry <span className="italic text-rust">to your plate.</span>
            </h2>
          </Reveal>
          <Link href="/recipes" className="inline-flex shrink-0 items-center gap-2 font-semibold text-rust link-underline">
            All recipes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <RecipeCard recipe={lead} large />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.slice(0, 2).map((r, i) => (
              <Reveal key={r.slug} delay={0.1 * (i + 1)}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecipeCard({ recipe, large }: { recipe: Recipe; large?: boolean }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className={cn("group flex h-full gap-5", large ? "flex-col" : "flex-col lg:flex-row lg:items-center")}>
      <div className={cn("relative shrink-0 overflow-hidden rounded-[1.6rem]", large ? "aspect-[16/11]" : "aspect-[16/11] lg:aspect-square lg:w-48")}>
        <Image src={recipe.image} alt="" fill sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 200px, 50vw"} className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-105" />
      </div>
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-terracotta uppercase">
          <Clock className="h-3.5 w-3.5" aria-hidden /> {recipe.time}
        </p>
        <h3 className={cn("mt-2", large ? "text-4xl" : "text-2xl")}>
          <span className="link-underline">{recipe.title}</span>
        </h3>
        <p className={cn("mt-2 leading-relaxed text-muted", !large && "line-clamp-2 text-sm")}>{recipe.intro}</p>
      </div>
    </Link>
  );
}
