import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { DemoNotice, Providers, WhatsAppFloat } from "@/components/Chrome";
import { site } from "@/lib/site";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Organic & Handmade Products, Bhubaneswar`,
    template: `%s | ${site.name}`,
  },
  description:
    "Hand-pounded rice, stone-ground chakki atta, GI-tagged Kandhamal turmeric, wood cold-pressed oils, bilona ghee, chatua and handmade Odisha crafts — from conscious farms to your kitchen.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/images/brand/packaging-2.jpg", width: 1280, height: 960, alt: "HonestHands products in their pouches" }],
  },
  icons: { icon: "/images/brand/logo.png", apple: "/images/brand/logo.png" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#95441c",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: site.name,
  legalName: site.legalName,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/images/brand/logo.png`,
  image: `${site.url}/images/brand/store-front.jpg`,
  hasMap: site.mapsUrl,
  telephone: "+91-6370175088",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pincode,
    addressCountry: site.address.country,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable} ${caveat.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-rust focus:px-5 focus:py-3 focus:text-cream">
          Skip to content
        </a>
        <Providers>
          <DemoNotice />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
