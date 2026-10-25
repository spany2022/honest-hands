"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Botanical } from "../Botanical";
import { Reveal } from "../Reveal";

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus({ kind: "error", message: "Please enter a valid email address." });
    if (!consent) return setStatus({ kind: "error", message: "Please tick the box to agree to receive emails from us." });
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message: string };
      setStatus({ kind: res.ok ? "ok" : "error", message: data.message });
      if (res.ok) setEmail("");
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again in a moment." });
    }
  }

  return (
    <section className="relative overflow-hidden bg-beige py-24 lg:py-32" aria-labelledby="newsletter-title">
      <Botanical variant="wheat" className="pointer-events-none absolute left-[6%] top-10 hidden h-64 w-20 text-terracotta/40 md:block" />
      <Botanical variant="wheat" className="pointer-events-none absolute bottom-6 right-[8%] hidden h-52 w-16 rotate-12 text-terracotta/30 md:block" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta">Newsletter &amp; community</p>
          <h2 id="newsletter-title" className="mt-4 text-[clamp(2.4rem,5vw,4.2rem)]">
            Bring a little more <span className="italic text-rust">goodness home.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Discover new products, seasonal ingredients, simple recipes, and inspiration for a more thoughtful kitchen.
          </p>

          <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 max-w-xl text-left">
            <div className="flex flex-col gap-3 sm:flex-row sm:rounded-full sm:bg-ivory sm:p-1.5 sm:shadow-[0_10px_40px_-20px_rgba(59,33,20,0.4)]">
              <label htmlFor="nl-email" className="sr-only">
                Email address
              </label>
              <input
                id="nl-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="field flex-1 sm:!border-0 sm:!bg-transparent sm:!shadow-none"
                aria-describedby="nl-status"
              />
              <button type="submit" className="btn btn-primary" disabled={status.kind === "loading"}>
                {status.kind === "loading" ? "Subscribing…" : "Subscribe"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-muted">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-rust" />
              <span>
                I agree to receive occasional emails from HonestHands. You can unsubscribe at any time. See our{" "}
                <a href="/privacy" className="underline">
                  privacy policy
                </a>
                .
              </span>
            </label>
            <div id="nl-status" aria-live="polite" className="min-h-[1.5rem]">
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.p
                    key={status.message}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-3 flex items-center gap-2 text-sm font-medium ${status.kind === "ok" ? "text-leaf" : "text-rust"}`}
                  >
                    {status.kind === "ok" && <Check className="h-4 w-4" />} {status.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
