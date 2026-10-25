import Image from "next/image";
import { BadgeCheck, MapPin, Phone, Receipt } from "lucide-react";
import { fullAddress, site, whatsappLink } from "@/lib/site";
import { MaskReveal, Reveal } from "../Reveal";
import { WhatsAppIcon } from "../Icons";

// Built only from verifiable facts. Customer reviews will be added here once
// genuine, permissioned reviews are collected — none are invented.
export function Trust() {
  const facts = [
    {
      Icon: MapPin,
      label: "Our store",
      value: (
        <>
          {fullAddress}
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-rust link-underline">
            Get directions →
          </a>
        </>
      ),
    },
    { Icon: Phone, label: "Call us", value: `${site.phone} · ${site.altPhone}` },
    { Icon: BadgeCheck, label: "FSSAI licence", value: site.fssai },
    { Icon: Receipt, label: "GSTIN", value: site.gstin },
  ];

  return (
    <section className="py-24 lg:py-32" aria-labelledby="trust-title">
      <div className="container-x">
        <MaskReveal className="relative aspect-[16/10] overflow-hidden rounded-[2rem] sm:aspect-[21/8]">
          <Image src="/images/brand/store-signboard.jpg" alt="The illuminated HonestHands signboard reading 'Organic & Handmade Products'" fill sizes="100vw" className="object-cover" />
        </MaskReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-terracotta">Trust, the honest way</p>
            <h2 id="trust-title" className="mt-4 text-[clamp(2.3rem,4.4vw,3.8rem)]">
              A real store. Real people. <span className="italic text-rust">Real food.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Walk in, open a pouch, smell the turmeric. We would rather earn your trust in person than with badges — and we will only ever show
              reviews from real customers.
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {facts.map(({ Icon, label, value }, i) => (
                <Reveal key={label} delay={i * 0.06} className="flex gap-4 border-t border-sand pt-5">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-leaf" aria-hidden />
                  <div>
                    <dt className="eyebrow text-muted">{label}</dt>
                    <dd className="mt-1.5 font-medium text-bark">{value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.2} className="mt-10 rounded-[1.6rem] bg-beige/70 p-7">
              <p className="font-display text-2xl font-semibold text-bark">Bought from us? We would love to hear from you.</p>
              <p className="mt-2 text-sm text-muted">Customer reviews are coming soon. Share your experience and, with your permission, we may feature it here.</p>
              <a href={whatsappLink("Hello HonestHands! I'd like to share feedback about my order:")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5">
                <WhatsAppIcon className="h-4 w-4" /> Share your feedback
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
