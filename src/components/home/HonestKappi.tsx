import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { cafeMenu } from "@/lib/cafe";
import { rupees } from "@/lib/format";
import { site } from "@/lib/site";
import { Reveal } from "../Reveal";
import { CafeIcon } from "../CafeIcon";

export function HonestKappi() {
  return (
    <section className="on-dark relative overflow-hidden bg-bark py-24 text-cream lg:py-32" aria-labelledby="kappi-title">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(217,162,59,0.22),transparent_60%)]" />
      <div className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-marigold/50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-marigold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold" /> Newly launched
          </p>
          <h2 id="kappi-title" className="mt-6 text-[clamp(3rem,6vw,5.4rem)] text-cream">
            {site.cafe.name}
          </h2>
          <p className="font-hand text-3xl text-marigold">{site.cafe.tagline}</p>
          <p className="mt-6 max-w-lg leading-relaxed text-cream/75">
            Our little café corner at the HonestHands store — brass-filter coffee brewed from our own ground coffee, and simple, honest teas.
          </p>

          <ul className="mt-10 divide-y divide-cream/15 border-y border-cream/15">
            {cafeMenu.map((item) => (
              <li key={item.name} className="flex items-center gap-3 py-4 sm:gap-4">
                <CafeIcon name={item.icon} className="h-8 w-8 shrink-0 text-marigold sm:h-9 sm:w-9" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-semibold text-cream sm:text-2xl">{item.name}</p>
                  <p className="text-sm leading-snug text-cream/60">{item.note}</p>
                </div>
                <span aria-hidden className="hidden flex-1 border-b border-dotted border-cream/30 sm:block" />
                <p className="shrink-0 font-display text-xl font-semibold text-marigold tabular-nums sm:text-2xl">{rupees(item.price)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/75">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-marigold" aria-hidden /> Open {site.cafe.hours}
            </span>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 link-underline hover:text-cream">
              <MapPin className="h-4 w-4 text-marigold" aria-hidden /> Chandimata Colony, Rasulgarh · Directions
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cafe" className="btn btn-light">
              Visit Honest Kappi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[2/3] w-[78%] max-w-md rotate-[2.5deg] overflow-hidden rounded-[1.4rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] transition-transform duration-700 hover:rotate-0">
            <Image src="/images/brand/honest-kappi-menu.webp" alt="Honest Kappi menu card: Filter Coffee ₹30, Black Coffee ₹30, Green Tea ₹30, Lemon Tea ₹20; open 7 AM to 9 PM" fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 left-0 aspect-square w-[38%] max-w-[13rem] -rotate-6 overflow-hidden rounded-full border-[6px] border-bark shadow-xl">
            <Image src="/images/products/coffee.jpg" alt="Freshly ground coffee in a brass bowl" fill sizes="200px" className="object-cover" />
          </div>
          <p className="absolute -bottom-8 right-0 -rotate-3 font-hand text-2xl text-marigold sm:right-6">{site.cafe.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
