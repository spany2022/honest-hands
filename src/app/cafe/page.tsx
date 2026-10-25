import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CafeIcon } from "@/components/CafeIcon";
import { cafeMenu } from "@/lib/cafe";
import { rupees } from "@/lib/format";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Honest Kappi — Filter Coffee & Tea in Rasulgarh",
  description: "Honest Kappi at the HonestHands store, Rasulgarh, Bhubaneswar: filter coffee ₹30, black coffee ₹30, green tea ₹30 and lemon tea ₹20. Open 7 AM – 9 PM.",
  alternates: { canonical: "/cafe" },
};


export default function CafePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Honest Kappi" }]}
        eyebrow="Newly launched · at the HonestHands store"
        title="Honest Kappi"
        intro={
          <>
            <span className="font-hand text-3xl text-marigold">{site.cafe.tagline}</span>
            <br />
            Brass-filter coffee brewed from our own ground coffee, simple honest teas, and a corner to sit and talk.
          </>
        }
      />

      <section className="container-x grid items-start gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <Reveal className="lg:col-span-6">
          <h2 className="text-5xl">
            Menu <span className="italic text-rust">&amp; prices</span>
          </h2>
          <ul className="mt-8 divide-y divide-sand border-y border-sand">
            {cafeMenu.map((item) => (
              <li key={item.name} className="flex items-center gap-5 py-6">
                <CafeIcon name={item.icon} className="h-11 w-11 shrink-0 text-rust" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-3xl font-semibold text-bark">{item.name}</p>
                  <p className="text-sm text-muted">{item.note}</p>
                </div>
                <p className="font-display text-3xl font-semibold text-rust tabular-nums">{rupees(item.price)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-hand text-3xl text-terracotta">{site.cafe.closing}</p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 text-leaf" aria-hidden />
              <div>
                <dt className="eyebrow text-muted">Open daily</dt>
                <dd className="mt-1 font-semibold text-bark">{site.cafe.hours}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 text-leaf" aria-hidden />
              <div>
                <dt className="eyebrow text-muted">Call</dt>
                <dd className="mt-1 font-semibold text-bark">
                  <a href={site.phoneHref} className="link-underline">{site.phone}</a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <MapPin className="mt-1 h-5 w-5 text-leaf" aria-hidden />
              <div>
                <dt className="eyebrow text-muted">Find us</dt>
                <dd className="mt-1 font-semibold text-bark">{fullAddress}</dd>
              </div>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Get directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="relative mx-auto aspect-[2/3] max-w-md overflow-hidden rounded-[1.6rem] shadow-[0_40px_80px_-40px_rgba(59,33,20,0.7)]">
            <Image
              src="/images/brand/honest-kappi-menu.webp"
              alt="Honest Kappi printed menu card: Filter Coffee ₹30, Black Coffee ₹30, Green Tea ₹30, Lemon Tea ₹20; open 7 AM to 9 PM; Plot 1025, Chandimata Colony, Rasulgarh"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
