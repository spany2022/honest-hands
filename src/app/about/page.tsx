import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { promise } from "@/components/home/Philosophy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: "HonestHands bridges traditional farm-fresh purity and modern standards — unadulterated heritage grains, cold-pressed oils, artisanal spices and fresh produce from Bhubaneswar.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Our Story" }]} eyebrow={site.catalogueLine} title="True wellness begins in the soil" />

      <section className="container-x grid items-center gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <MaskReveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-6">
          <Image src="/images/brand/store-front-night.jpg" alt="The HonestHands store in Rasulgarh, Bhubaneswar" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </MaskReveal>
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-terracotta">About us</p>
          <h2 className="mt-4 text-5xl">
            Where purity lives <span className="italic text-rust">in every hand.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            At HonestHands, we believe true wellness begins in the soil. We bridge the gap between traditional farm-fresh purity and modern
            fine-dining standards — delivering unadulterated heritage grains, cold-pressed oils, artisanal spices, and garden-fresh exotic
            produce crafted to nourish both body and soul.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Our logo — three women at work with grain, spice and colour — is a reminder of where good food has always come from: patient,
            careful hands. You will find us, and our full range, at our store in Chandimata Colony, Rasulgarh, now home to the Honest Kappi
            café as well.
          </p>
        </Reveal>
      </section>

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

      <section className="container-x grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <p className="eyebrow text-terracotta">Our packaging</p>
          <h2 className="mt-4 text-5xl">
            See what you buy, <span className="italic text-rust">before you buy it.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Our flours, spices and grains are packed in clear pouches with the HonestHands label, so the colour and texture of what is inside
            speaks for itself.
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
