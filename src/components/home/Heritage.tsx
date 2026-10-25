import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/products";
import { HERITAGE_SLUGS } from "@/lib/collections";
import { Reveal } from "../Reveal";
import { Botanical } from "../Botanical";

// A swappable seasonal / special-collection banner. Change the copy and
// HERITAGE_SLUGS (src/lib/collections.ts) to run a different campaign.
export function Heritage() {
  const items = HERITAGE_SLUGS.map(getProduct).filter((p) => p !== undefined);
  return (
    <section className="py-8 lg:py-12" aria-labelledby="heritage-title">
      <div className="container-x">
        <div className="on-dark relative isolate overflow-hidden rounded-[2.2rem] bg-rust px-6 py-16 text-cream sm:px-12 lg:px-16 lg:py-24">
          <Image src="/images/mood/kandhamal-turmeric-loose.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30 mix-blend-multiply" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-rust via-rust/90 to-rust/40" />
          <Botanical tilt className="pointer-events-none absolute -right-36 -top-10 h-[18rem] w-[22rem] text-cream/25 lg:-right-56 lg:-top-16 lg:h-[28rem] lg:w-[34rem]" />
          <Botanical variant="marigold" className="pointer-events-none absolute bottom-8 right-[30%] hidden h-24 w-24 text-marigold/50 lg:block" />

          <Reveal className="max-w-2xl">
            <p className="eyebrow text-marigold">Special collection</p>
            <h2 id="heritage-title" className="mt-4 text-[clamp(2.6rem,5.4vw,4.8rem)] text-cream">
              <span className="band">The Odisha</span> Heritage Collection
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              GI-tagged Kandhamal haladi and Koraput kala jeera rice, chatua for summer mornings, palua for festive sweets, kolatha for winter
              dal — and the hand-painted, handwoven crafts of our state.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex max-w-3xl flex-wrap gap-2">
            {items.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="rounded-full border border-cream/35 bg-cream/5 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-cream hover:text-rust">
                {p.name}
              </Link>
            ))}
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <Link href="/shop?collection=odisha-heritage" className="btn btn-light">
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
