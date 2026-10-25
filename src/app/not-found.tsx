import Link from "next/link";
import { Botanical } from "@/components/Botanical";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Botanical variant="marigold" className="h-20 w-20 text-terracotta" />
      <p className="eyebrow mt-8 text-terracotta">Page not found</p>
      <h1 className="mt-4 text-6xl">This shelf is empty.</h1>
      <p className="mt-4 max-w-md text-muted">The page you were looking for has moved or never existed. Let&apos;s get you back to the pantry.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </section>
  );
}
