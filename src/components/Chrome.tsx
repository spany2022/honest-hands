"use client";

import { MotionConfig } from "framer-motion";
import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { PRICES_ARE_DEMO, site } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Preview-only strip so nobody mistakes sample prices for real ones.
export function DemoNotice() {
  const [hidden, setHidden] = useState(false);
  if (!PRICES_ARE_DEMO || hidden) return null;
  return (
    <div className="relative z-[51] bg-bark text-center text-xs text-cream/90">
      <p className="container-x py-2 pr-10">
        Preview build — product prices, pack sizes and stock shown are sample data and will be updated before launch.
      </p>
      <button type="button" onClick={() => setHidden(true)} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-cream/10" aria-label="Dismiss notice">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello HonestHands! I have a question.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HonestHands on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-leaf text-cream shadow-[0_14px_30px_-10px_rgba(86,112,58,0.8)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
