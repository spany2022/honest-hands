import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaskReveal, Reveal } from "../Reveal";
import { Botanical } from "../Botanical";

// The "HonestHands Promise", worded as in the product catalogue.
export const promise = [
  {
    title: "Unadulterated",
    text: "Free from artificial additives, chemical preservatives, or synthetic processing. Just pure, natural food.",
  },
  {
    title: "Nutrient Preserved",
    text: "Processed using traditional cold-pressed, stone-ground, and hand-pounding methods to keep vital nutrients intact.",
  },
  {
    title: "Farm Traceability",
    text: "Direct partnership with conscious growers ensures complete transparency, fresh harvests, and maximum quality.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative scroll-mt-20 py-24 lg:py-36" aria-labelledby="philosophy-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] sm:w-[82%]">
            <Image
              src="/images/brand/store-front.jpg"
              alt="The HonestHands store front in Rasulgarh, Bhubaneswar, lit up in the evening"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[30%_50%]"
            />
          </MaskReveal>
          <MaskReveal delay={0.3} className="absolute -bottom-10 right-0 aspect-square w-[44%] overflow-hidden rounded-[1.6rem] border-[6px] border-ivory shadow-xl">
            <Image src="/images/brand/packaging-1.jpg" alt="HonestHands spice and flour pouches with the three-women logo label" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
          </MaskReveal>
          <Botanical className="pointer-events-none absolute -left-8 -top-14 h-40 w-52 text-terracotta/50" />
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="eyebrow text-terracotta">Our Philosophy · Back to Nature</p>
            <h2 id="philosophy-title" className="mt-5 text-[clamp(2.4rem,5vw,4.4rem)]">
              Closer to Nature. <span className="italic text-rust">Closer to What Matters.</span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted">
              At HonestHands, we believe true wellness begins in the soil. We bridge the gap between traditional farm-fresh purity and modern
              standards — delivering unadulterated heritage grains, cold-pressed oils, artisanal spices, and garden-fresh produce crafted to
              nourish both body and soul.
            </p>
          </Reveal>

          <ol className="mt-10 space-y-6">
            {promise.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 * i} className="flex gap-5 border-t border-sand pt-6">
                  <span className="font-display text-3xl italic text-terracotta">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{p.text}</p>
                  </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/about" className="inline-flex items-center gap-2 font-semibold text-rust link-underline">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="font-hand text-2xl text-leaf">— the HonestHands promise</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
