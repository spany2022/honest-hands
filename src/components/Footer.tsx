import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/products";
import { fullAddress, site } from "@/lib/site";
import { Botanical } from "./Botanical";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";

const support = [
  { href: "/contact", label: "Contact Us" },
  { href: "/help#shipping", label: "Pickup & Delivery" },
  { href: "/help#returns", label: "Returns & Refunds" },
  { href: "/help", label: "FAQs" },
];

const company = [
  { href: "/about", label: "Our Story" },
  { href: "/about#promise", label: "Our Philosophy" },
  { href: "/cafe", label: "Honest Kappi Café" },
  { href: "/recipes", label: "Recipes & Inspiration" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-rust-deep text-cream">
      <Botanical tilt className="pointer-events-none absolute -right-36 -top-10 h-[18rem] w-[22rem] text-cream/15 sm:-right-56 sm:-top-16 sm:h-[28rem] sm:w-[34rem]" />
      <Botanical className="pointer-events-none absolute -bottom-6 left-0 hidden h-56 w-72 rotate-180 text-cream/10 md:block" />

      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-cream/15 py-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-marigold">{site.catalogueLine}</p>
            <p className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
              Bring a little more honesty to your kitchen.
            </p>
          </div>
          <Link href="/shop" className="btn btn-light shrink-0">
            Shop the collection
          </Link>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-cream p-1">
                <Image src="/images/brand/logo.png" alt="" width={64} height={64} className="h-14 w-14" />
              </span>
              <span>
                <span className="block font-display text-3xl font-bold italic">{site.name}</span>
                <span className="block text-xs text-cream/70">{site.tagline}</span>
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-cream/85">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-marigold" aria-hidden />
                <span>
                  {fullAddress}
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-marigold link-underline">
                    Get directions →
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-marigold" aria-hidden />
                <span>
                  <a href={site.phoneHref} className="link-underline">{site.phone}</a> ·{" "}
                  <a href={site.altPhoneHref} className="link-underline">{site.altPhone}</a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-marigold" aria-hidden />
                <a href={`mailto:${site.email}`} className="link-underline break-all">{site.email}</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 hover:bg-cream hover:text-rust-deep">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 hover:bg-cream hover:text-rust-deep">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={categories.map((c) => ({ href: `/shop/${c.slug}`, label: c.name }))} />
          <FooterCol title="Customer Support" links={support} />
          <FooterCol title="Company" links={company} />
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/15 py-6 text-xs text-cream/65 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>FSSAI Lic. No. {site.fssai}</span>
            <span>GSTIN {site.gstin}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow text-marigold">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-cream/85 hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
