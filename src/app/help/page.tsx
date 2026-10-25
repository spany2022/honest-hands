import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help, Shipping & Returns",
  description: "How ordering, delivery, store pickup and returns work at HonestHands.",
  alternates: { canonical: "/help" },
};

// Describes how the site actually works today (WhatsApp-confirmed orders).
// Update when delivery zones, charges or a return policy are finalised.
const sections = [
  {
    id: "ordering",
    title: "How do I place an order?",
    body: [
      "Add products to your cart and go to checkout. Your order request is sent to our team on WhatsApp with your items.",
      "We reply to confirm stock, a pickup time and payment options. Your order is only confirmed once we reply.",
      `You can also call us on ${site.phone} or visit our store in Rasulgarh, Bhubaneswar.`,
    ],
  },
  {
    id: "shipping",
    title: "Pickup & delivery",
    body: [
      "Home delivery is not available right now — all orders are collected from our store in Chandimata Colony, Rasulgarh, Bhubaneswar.",
      "We'll message you on WhatsApp when your order is ready to collect.",
    ],
  },
  {
    id: "returns",
    title: "Returns & refunds",
    body: [
      "If something arrives damaged or isn't right, message us on WhatsApp with a photo as soon as you can, and we'll work out a fix with you.",
      "Because these are food products, opened packs can't be returned unless there is a quality issue.",
    ],
  },
  {
    id: "storage",
    title: "How should I store your products?",
    body: [
      "We use no chemical preservatives, so keep flours, dals and spices in airtight containers in a cool, dry place, away from sunlight.",
      "Stone-ground atta and roasted flours are best used within a few weeks of opening.",
    ],
  },
  {
    id: "bulk",
    title: "Do you supply restaurants and hotels?",
    body: ["Yes — our catalogue was built for kitchens of every size. Call or WhatsApp us for bulk quantities."],
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Help" }]} eyebrow="Customer support" title="Help & FAQs" />
      <div className="container-x max-w-4xl py-16 lg:py-20">
        <div className="divide-y divide-sand border-y border-sand">
          {sections.map((s) => (
            <details key={s.id} id={s.id} className="group scroll-mt-28 py-6" open={s.id === "ordering"}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-3xl font-semibold text-bark">
                {s.title}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-sand text-xl transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="mt-4 space-y-3 leading-relaxed text-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
