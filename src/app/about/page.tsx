import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, Leaf, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { promise } from "@/components/home/Philosophy";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "HonestHands began with a founder's search for trustworthy organic food during her pregnancy. Today we bring families thoughtfully sourced organic staples, Odisha's regional treasures and handmade heritage from Bhubaneswar.",
  alternates: { canonical: "/about" },
};

// Founder and brand story as written by the client.
const founderStory = [
  "My journey towards building HonestHands began with something very personal: my search for trustworthy food.",
  "When I became pregnant, I started paying closer attention to what I ate and what I brought into my home. I wanted authentic organic products, honest ingredients, and a better understanding of where my food came from. But finding products I could genuinely trust wasn't always easy. I realised that choosing organic meant looking beyond labels and asking the right questions about sourcing, quality, and authenticity.",
  "That experience planted the seed for HonestHands.",
  "Leaving the security of a conventional career to build something of my own wasn't easy. I had to navigate pregnancy, household responsibilities, and the challenges of entrepreneurship, often without the support I had hoped for. There were days when the entire journey rested on my shoulders.",
  "But I had something to build on. My engineering and analytics background helped me research products, examine sourcing opportunities, and approach decisions with a questioning mind. My graphic design skills helped me create the brand identity, packaging, and visual language from scratch.",
  "From researching products and connecting with farmers across Odisha to designing labels, packing orders, and setting up our physical store, I took on each task with a clear purpose: to build a brand I could believe in myself.",
];

const founderClosing = [
  "I decided to turn that question into something meaningful.",
  "Today, HonestHands is my way of helping other families discover thoughtfully sourced organic products, regional treasures, and traditional goodness—with greater transparency and care.",
];

const brandPillars = [
  {
    Icon: MapPin,
    title: "Rooted in Odisha",
    text: "Rooted in Odisha's rich natural resources, regional flavours, and living traditions, we bring together organic staples, distinctive regional treasures, forest-sourced products, and handmade heritage. We believe that every product has a story worth knowing—from the land it comes from to the people whose knowledge and care bring it to you.",
  },
  {
    Icon: Leaf,
    title: "Choosing organic, mindfully",
    text: "For us, choosing organic is about being more mindful of what we consume, understanding where our food comes from, and valuing responsible farming practices. It is also about respecting nature and recognising the farmers, producers, and artisans who preserve our traditions.",
  },
  {
    Icon: HeartHandshake,
    title: "Trust, earned through action",
    text: "We know that trust is earned through actions, not just words. That is why we strive to make thoughtful sourcing decisions, communicate honestly about our products, and treat quality and authenticity as responsibilities.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Our Story" }]}
        eyebrow="Our story"
        title="Born from a search for trust"
        intro="Nature's Goodness. Our Honest Promise."
      />

      {/* ——— Founder story ——— */}
      <section className="container-x py-16 lg:py-24" aria-labelledby="founder-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow text-terracotta">The founder&apos;s story</p>
                <h2 id="founder-title" className="mt-4 text-[clamp(2.4rem,4.6vw,3.8rem)]">
                  I was searching for trust. <span className="italic text-rust">So, I built HonestHands.</span>
                </h2>
                <p className="mt-5 font-hand text-2xl leading-snug text-terracotta">
                  An engineer by education, a designer by skill, and an entrepreneur driven by purpose.
                </p>
              </Reveal>
              <MaskReveal delay={0.15} className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(59,33,20,0.5)]">
                <Image
                  src="/images/brand/store-front-night.jpg"
                  alt="The HonestHands store in Rasulgarh, Bhubaneswar, set up by the founder"
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-top"
                />
              </MaskReveal>
            </div>
          </div>

          <Reveal className="lg:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              {founderStory.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <blockquote className="my-10 border-l-4 border-terracotta bg-cream py-6 pl-6 pr-4 sm:pl-8">
              <p className="text-lg leading-relaxed text-muted">
                HonestHands wasn&apos;t born from a business plan alone. It grew from a question I had asked as a mother-to-be:
              </p>
              <p className="mt-3 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold italic leading-tight text-rust">
                &ldquo;Why should finding honest, authentic food be so difficult?&rdquo;
              </p>
            </blockquote>

            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              {founderClosing.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="font-display text-2xl font-semibold text-bark">
                What began as my personal search for trust has become my commitment to earning yours.
              </p>
            </div>
            <p className="mt-8 font-hand text-2xl text-terracotta">— Founder, HonestHands Private Limited</p>
          </Reveal>
        </div>
      </section>

      {/* ——— Brand story ——— */}
      <section className="bg-cream py-20 lg:py-28" aria-labelledby="brand-title">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-terracotta">Our brand story</p>
            <h2 id="brand-title" className="mt-4 text-[clamp(2.4rem,4.8vw,4rem)]">
              Born from a search for trust. <span className="italic text-rust">Built on honest roots.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              HonestHands began with a simple belief: choosing food for our families should come with confidence, not confusion.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Our founder&apos;s search for trustworthy organic products revealed a larger need—to make authentic, thoughtfully sourced products
              easier to discover and understand. That personal search became the foundation of HonestHands.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {brandPillars.map(({ Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="rounded-[1.6rem] border border-sand/70 bg-ivory p-7">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-terracotta/40 text-rust">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mx-auto mt-14 max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted">
              HonestHands is a reflection of the belief that started it all: families deserve more transparency in the products they bring home,
              and nature&apos;s gifts deserve to be valued with care.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              From our founder&apos;s personal search to your family&apos;s everyday choices, our purpose remains the same—to bring you closer to
              nature, celebrate our heritage, and make honesty part of the way we live.
            </p>
            <p className="mt-10 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-tight text-bark">
              HonestHands — <span className="italic text-rust">Nature&apos;s Goodness. Our Honest Promise.</span>
            </p>
            <p className="mt-3 font-hand text-2xl text-terracotta">From our roots to your home, with honesty in every hand.</p>
            <Link href="/shop" className="btn btn-primary mt-8">
              Shop the collection
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— Promise ——— */}
      <section id="promise" className="on-dark scroll-mt-24 bg-rust py-20 text-cream lg:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-marigold">Our philosophy</p>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-cream">
              <span className="band">The HonestHands</span> Promise
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {promise.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1} className="rounded-[1.6rem] border border-cream/20 p-8">
                <p className="font-display text-5xl italic text-marigold">0{i + 1}</p>
                <h3 className="mt-4 text-3xl text-cream">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/80">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Packaging ——— */}
      <section className="container-x grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <p className="eyebrow text-terracotta">Our packaging</p>
          <h2 className="mt-4 text-5xl">
            See what you buy, <span className="italic text-rust">before you buy it.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Our flours, spices and grains are packed in clear pouches with the HonestHands label—designed by our founder—so the colour and
            texture of what is inside speaks for itself.
          </p>
          <Link href="/shop" className="btn btn-primary mt-8">
            Shop the collection
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          <MaskReveal className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem]">
            <Image src="/images/brand/packaging-1.jpg" alt="Spice and flour pouches with HonestHands labels" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </MaskReveal>
          <MaskReveal delay={0.2} className="relative mt-12 aspect-[3/4] overflow-hidden rounded-[1.6rem]">
            <Image src="/images/brand/packaging-2.jpg" alt="The HonestHands range: flours, honey and spices" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </MaskReveal>
        </div>
      </section>
    </>
  );
}
