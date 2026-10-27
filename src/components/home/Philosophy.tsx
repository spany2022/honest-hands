import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MaskReveal, Reveal } from "../Reveal";

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
          {/* Landscape frame so the full signboard and both shop windows show. */}
          <MaskReveal className="relative z-[1] aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(59,33,20,0.5)]">
            <Image
              src="/images/brand/store-front-night.jpg"
              alt="The HonestHands store front in Rasulgarh, Bhubaneswar, lit up at night, with the Honest Kappi menu in the window"
              fill
              sizes="(min-width: 1024px) 45vw, 95vw"
              className="object-cover object-top"
            />
          </MaskReveal>
          <MaskReveal delay={0.3} className="absolute -bottom-10 -right-2 z-[2] aspect-square w-[24%] overflow-hidden rounded-[1.2rem] border-[5px] border-ivory shadow-xl sm:-bottom-14 sm:-right-6 lg:w-[22%]">
            <Image src="/images/brand/packaging-1.jpg" alt="HonestHands spice and flour pouches with the three-women logo label" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
          </MaskReveal>
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
