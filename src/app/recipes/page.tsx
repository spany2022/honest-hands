import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { RecipeCard } from "@/components/home/RecipesTeaser";
import { recipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Recipes & Everyday Inspiration",
  description: "Simple, traditional recipes with HonestHands ingredients — chatua sharbat, kolatha dal, chakki atta rotis, ragi porridge and filter coffee.",
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Recipes" }]} eyebrow="Recipes & everyday inspiration" title="From our pantry to your plate" />
      <section className="container-x grid gap-x-8 gap-y-16 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:py-24">
        {recipes.map((r, i) => (
          <Reveal key={r.slug} delay={(i % 3) * 0.08}>
            <RecipeCard recipe={r} large />
          </Reveal>
        ))}
      </section>
    </>
  );
}
