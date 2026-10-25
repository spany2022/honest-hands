"use client";

import Link from "next/link";
import { useState } from "react";
import { Info, Send } from "lucide-react";
import { resolveLines, useCart } from "@/store/cart";
import { rupees } from "@/lib/format";
import { HOME_DELIVERY, PRICES_ARE_DEMO, fullAddress, site, whatsappLink } from "@/lib/site";
import { useMounted } from "@/lib/useMounted";
import { ProductVisual } from "./ProductVisual";
import { WhatsAppIcon } from "./Icons";

type Form = { name: string; phone: string; address: string; landmark: string; city: string; pincode: string; delivery: "delivery" | "pickup"; notes: string };

const empty: Form = { name: "", phone: "", address: "", landmark: "", city: "Bhubaneswar", pincode: "", delivery: HOME_DELIVERY ? "delivery" : "pickup", notes: "" };

// There is no payment gateway yet: checkout sends a complete order request to
// the store on WhatsApp, and the team confirms stock, delivery charge and
// payment with the customer. Nothing here pretends an order is placed or paid.
export function CheckoutForm() {
  const mounted = useMounted();
  const lines = useCart((s) => s.lines);
  const items = resolveLines(lines);
  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Please enter a valid 10-digit Indian mobile number.";
    if (form.delivery === "delivery") {
      if (form.address.trim().length < 8) e.address = "Please enter your full delivery address.";
      if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Please enter a 6-digit PIN code.";
      if (!form.city.trim()) e.city = "Please enter your city.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function buildMessage() {
    const lines = [
      `*New order request — ${site.name} website*`,
      "",
      ...items.map((i) => `• ${i.product.name} (${i.variant.label}) × ${i.qty} = ${rupees(i.total)}`),
      "",
      `Items total: ${rupees(subtotal)}${PRICES_ARE_DEMO ? " (website preview prices)" : ""}`,
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.delivery === "pickup"
        ? "Collection: I'll pick up from the Rasulgarh store"
        : `Deliver to: ${form.address.trim()}${form.landmark.trim() ? `, near ${form.landmark.trim()}` : ""}, ${form.city.trim()} – ${form.pincode}`,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : "",
      "",
      form.delivery === "pickup" ? "Please confirm availability, pickup time and payment options." : "Please confirm availability, delivery charges and payment options.",
    ];
    return lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");
  }

  if (!mounted) return <div className="mt-10 h-96 animate-pulse rounded-[2rem] bg-beige/60" />;

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-[2rem] bg-beige/60 p-10 text-center">
        <p className="font-display text-3xl text-bark">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary mt-6">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!validate()) return;
        window.open(whatsappLink(buildMessage()), "_blank", "noopener,noreferrer");
        setSent(true);
      }}
      className="mt-10 grid gap-10 lg:grid-cols-12"
    >
      <div className="space-y-8 lg:col-span-7">
        <fieldset className="space-y-4">
          <legend className="font-display text-3xl font-semibold text-bark">Your details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="name" className="field" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field id="phone" label="Mobile number" error={errors.phone}>
              <input id="phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-3xl font-semibold text-bark">{HOME_DELIVERY ? "How would you like it?" : "Store pickup"}</legend>
          {!HOME_DELIVERY ? (
            <div className="rounded-2xl border border-rust bg-cream p-4">
              <p className="font-semibold text-bark">Collect from our store</p>
              <p className="mt-1 text-sm text-muted">{fullAddress}</p>
              <p className="mt-2 text-sm text-muted">Home delivery is not available right now. We&apos;ll message you on WhatsApp when your order is ready to collect.</p>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-rust link-underline">
                Get directions →
              </a>
            </div>
          ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["delivery", "Home delivery", "We'll confirm the delivery charge for your area."],
                ["pickup", "Store pickup", "Collect from Chandimata Colony, Rasulgarh."],
              ] as const
            ).map(([v, title, sub]) => (
              <label key={v} className={`cursor-pointer rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rust ${form.delivery === v ? "border-rust bg-cream" : "border-sand"}`}>
                <input type="radio" name="delivery" value={v} checked={form.delivery === v} onChange={() => set("delivery", v)} className="sr-only" />
                <span className="block font-semibold text-bark">{title}</span>
                <span className="block text-sm text-muted">{sub}</span>
              </label>
            ))}
          </div>
          )}

          {form.delivery === "delivery" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="address" label="House / flat, street, area" error={errors.address} className="sm:col-span-2">
                <textarea id="address" rows={3} className="field" autoComplete="street-address" value={form.address} onChange={(e) => set("address", e.target.value)} />
              </Field>
              <Field id="landmark" label="Landmark (optional)">
                <input id="landmark" className="field" value={form.landmark} onChange={(e) => set("landmark", e.target.value)} />
              </Field>
              <Field id="city" label="City" error={errors.city}>
                <input id="city" className="field" autoComplete="address-level2" value={form.city} onChange={(e) => set("city", e.target.value)} />
              </Field>
              <Field id="pincode" label="PIN code" error={errors.pincode}>
                <input id="pincode" className="field" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} />
              </Field>
            </div>
          )}
          <Field id="notes" label="Order notes (optional)">
            <textarea id="notes" rows={2} className="field" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </Field>
        </fieldset>
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-[2rem] border border-sand/70 bg-cream p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-3xl">Order summary</h2>
          <ul className="mt-5 divide-y divide-sand/60">
            {items.map((i) => (
              <li key={`${i.slug}-${i.variantId}`} className="flex items-center gap-4 py-3">
                <ProductVisual product={i.product} image={i.variant.image} className="h-14 w-14 shrink-0 rounded-xl" sizes="56px" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-bark">{i.product.name}</p>
                  <p className="text-sm text-muted">
                    {i.variant.label} × {i.qty}
                  </p>
                </div>
                <p className="font-semibold tabular-nums">{rupees(i.total)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-sand pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Items total</dt>
              <dd className="font-semibold tabular-nums">{rupees(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{form.delivery === "pickup" ? "Pickup" : "Delivery"}</dt>
              <dd className="text-muted">{form.delivery === "pickup" ? "Free, from our store" : "Confirmed on WhatsApp"}</dd>
            </div>
          </dl>

          <div className="mt-5 flex gap-3 rounded-2xl bg-ivory p-4 text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden />
            <p>
              Your order request is sent to our team on WhatsApp. We&apos;ll confirm stock, {HOME_DELIVERY ? "the delivery charge" : "a pickup time"} and
              payment options — no payment is taken on this website.
            </p>
          </div>

          <button type="submit" className="btn btn-primary mt-6 w-full">
            <WhatsAppIcon className="h-4 w-4" /> Send order request on WhatsApp
          </button>
          {sent && (
            <p className="mt-4 flex items-start gap-2 text-sm text-leaf" role="status">
              <Send className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              WhatsApp should have opened with your order. Press send there, and we&apos;ll reply to confirm. Didn&apos;t open? Call us on{" "}
              {site.phone}.
            </p>
          )}
        </div>
      </aside>
    </form>
  );
}

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-bark">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-rust" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
