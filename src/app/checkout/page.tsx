import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Breadcrumbs } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <Breadcrumbs dark crumbs={[{ href: "/", label: "Home" }, { href: "/shop", label: "Shop" }, { label: "Checkout" }]} />
      <h1 className="mt-6 text-[clamp(2.6rem,5vw,4.4rem)]">
        <span className="band">Checkout</span>
      </h1>
      <CheckoutForm />
    </div>
  );
}
