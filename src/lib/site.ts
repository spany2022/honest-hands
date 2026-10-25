// Verified business details — taken from the HonestHands product catalogue and
// the Honest Kappi menu card. Change values here, not in components.
export const site = {
  name: "HonestHands",
  legalName: "HonestHands Private Limited",
  tagline: "Where Purity Lives in Every Hand",
  catalogueLine: "From conscious farms to exceptional menus",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://honesthands.in",
  phone: "+91 63701 75088",
  phoneHref: "tel:+916370175088",
  altPhone: "+91 70226 62549",
  altPhoneHref: "tel:+917022662549",
  // Number used for WhatsApp orders and enquiries (digits only, with country code).
  whatsapp: "916370175088",
  email: "honesthandspvtltd@gmail.com",
  address: {
    line1: "Plot No. 1025, Chandimata Colony",
    line2: "Rasulgarh",
    city: "Bhubaneswar",
    state: "Odisha",
    pincode: "751010",
    country: "IN",
  },
  // Google Maps pin for the Rasulgarh store (used for "Get directions").
  mapsUrl: "https://maps.app.goo.gl/nPemDbrR8WQjPa5W6",
  fssai: "12026033000334",
  gstin: "21AAICH5308R1ZB",
  // Social profiles: add real URLs when available. Empty entries are not rendered.
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  cafe: {
    name: "Honest Kappi",
    tagline: "Tea, coffee and gossip.",
    closing: "Try once, crave forever.",
    hours: "7 AM – 9 PM",
  },
} as const;

// Prices in src/lib/products.ts come from the client's price sheet (Oct 2026).
// Set back to true to show the "sample prices" banner on a preview build.
export const PRICES_ARE_DEMO = false;

// Home delivery is paused: checkout offers store pickup only. Set to true to
// bring back the delivery option and address fields.
export const HOME_DELIVERY = false;

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city} – ${site.address.pincode}, ${site.address.state}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
