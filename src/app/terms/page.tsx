import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Terms & Conditions" }]} title="Terms & Conditions" />
      <div className="container-x max-w-3xl space-y-6 py-16 leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:text-3xl">
        <p>This website is operated by {site.legalName}, {site.address.city}, {site.address.state} (FSSAI Lic. No. {site.fssai}, GSTIN {site.gstin}).</p>
        <h2>Orders</h2>
        <p>
          Submitting checkout sends an order request. An order is accepted only when we confirm it with you on WhatsApp or by phone, including
          the final price, pickup or delivery arrangement and payment method.
        </p>
        <h2>Products & prices</h2>
        <p>
          We describe our products as accurately as we can. Natural and handmade products vary in colour, texture and size from batch to batch.
          Prices and availability may change; the price confirmed with you at the time of your order applies.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.email}`} className="text-rust underline">{site.email}</a> or {site.phone}.
        </p>
      </div>
    </>
  );
}
