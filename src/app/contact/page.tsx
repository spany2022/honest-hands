import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/Icons";
import { fullAddress, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Visit Us",
  description: `Visit HonestHands at ${fullAddress}. Call ${site.phone} or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};


export default function ContactPage() {
  const cards = [
    { Icon: Phone, title: "Call us", body: <><a href={site.phoneHref} className="link-underline">{site.phone}</a><br /><a href={site.altPhoneHref} className="link-underline">{site.altPhone}</a></> },
    { Icon: Mail, title: "Email", body: <a href={`mailto:${site.email}`} className="link-underline break-all">{site.email}</a> },
    { Icon: MapPin, title: "Store", body: <>{fullAddress}<br /><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-rust link-underline">Get directions →</a></> },
    { Icon: Clock, title: "Honest Kappi café", body: <>Open {site.cafe.hours}</> },
  ];
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Visit Us" }]} eyebrow="Contact us" title="Come say hello" intro="Questions about a product, a bulk order for your kitchen or restaurant, or just directions — we're happy to help." />
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.06} className="rounded-[1.6rem] border border-sand/70 bg-cream p-7">
              <Icon className="h-6 w-6 text-rust" aria-hidden />
              <h2 className="mt-5 text-2xl">{title}</h2>
              <div className="mt-2 leading-relaxed text-muted">{body}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="on-dark mt-10 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-leaf p-8 text-cream sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="text-4xl text-cream">Prefer WhatsApp?</h2>
            <p className="mt-2 text-cream/85">Send us a message — orders, questions, or today&apos;s fresh harvest.</p>
          </div>
          <a href={whatsappLink("Hello HonestHands!")} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </Reveal>
        <p className="mt-10 text-sm text-muted">
          {site.legalName} · FSSAI Lic. No. {site.fssai} · GSTIN {site.gstin}
        </p>
      </section>
    </>
  );
}
