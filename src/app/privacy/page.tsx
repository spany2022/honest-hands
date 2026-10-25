import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: "Privacy Policy" }]} title="Privacy Policy" />
      <div className="container-x max-w-3xl space-y-6 py-16 leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:text-3xl">
        <p>This policy explains what information {site.legalName} (“HonestHands”, “we”) collects through this website and how we use it.</p>
        <h2>What we collect</h2>
        <p>
          When you send an order request, the details you enter (name, mobile number, address and order) are placed into a WhatsApp message
          that you choose to send to us. This website does not store them on a server. Your cart is saved only in your own browser.
        </p>
        <p>If you subscribe to our newsletter, we keep your email address to send you updates.</p>
        <h2>How we use it</h2>
        <p>We use your details only to confirm and deliver your order, reply to your questions, and — if you subscribed — send occasional updates. We do not sell your information.</p>
        <h2>Your choices</h2>
        <p>
          You can unsubscribe from emails at any time, or ask us to delete your details by writing to{" "}
          <a href={`mailto:${site.email}`} className="text-rust underline">{site.email}</a>.
        </p>
      </div>
    </>
  );
}
