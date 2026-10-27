"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MaskReveal, Reveal } from "../Reveal";

const shots = [
  { src: "/images/mood/kandhamal-turmeric-loose.jpg", alt: "Kandhamal turmeric powder", caption: "Kandhamal gold", ratio: "aspect-[4/5]" },
  { src: "/images/mood/honey-loose.jpg", alt: "Honey pouring from a dipper", caption: "Slow, raw honey", ratio: "aspect-square" },
  { src: "/images/mood/black-rice-loose.jpg", alt: "Black rice in a bowl", caption: "Heirloom black rice", ratio: "aspect-[3/4]" },
  { src: "/images/mood/mustard-oil-loose.jpg", alt: "Mustard oil in a glass jar beside mustard flowers", caption: "Kachi ghani mustard oil", ratio: "aspect-[4/3]" },
  { src: "/images/mood/panch-phoron-loose.jpg", alt: "Panch phoron whole spices", caption: "Five seeds of panch phoron", ratio: "aspect-square" },
  { src: "/images/products/coffee.jpg", alt: "Freshly ground coffee in a brass bowl", caption: "Ground for Honest Kappi", ratio: "aspect-[4/5]" },
  { src: "/images/products/badam-ladoo.webp", alt: "Peanut and jaggery badam ladoos in a clear tub", caption: "Badam ladoo, bound in jaggery", ratio: "aspect-[6/5]" },
  { src: "/images/products/ragi-biscuits.webp", alt: "Ragi biscuits in a HonestHands tub", caption: "Crisp ragi biscuits", ratio: "aspect-square" },
  { src: "/images/mood/a2-desi-cow-ghee-loose.jpg", alt: "A spoon of golden ghee", caption: "Bilona-churned ghee", ratio: "aspect-[3/4]" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d: number) => setActive((a) => (a === null ? a : (a + d + shots.length) % shots.length)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <section className="py-24 lg:py-36" aria-labelledby="gallery-title">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta">The beauty of natural ingredients</p>
          <h2 id="gallery-title" className="mt-4 text-[clamp(2.3rem,4.6vw,4rem)]">
            Colour, texture, <span className="italic text-rust">aroma.</span>
          </h2>
          <p className="mt-5 text-muted">Nothing added to make them look this way.</p>
        </Reveal>

        <div className="mt-16 columns-2 gap-4 sm:gap-6 lg:columns-3">
          {shots.map((s, i) => (
            <figure key={s.src} className="mb-4 break-inside-avoid sm:mb-6">
              <MaskReveal delay={(i % 3) * 0.12} className={`group relative overflow-hidden rounded-[1.4rem] ${s.ratio}`}>
                <button type="button" onClick={() => setActive(i)} className="absolute inset-0 z-10" aria-label={`Enlarge: ${s.caption}`} />
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-105" />
              </MaskReveal>
              <figcaption className="mt-2 font-hand text-xl text-muted">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={shots[active].caption}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bark/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div key={active} className="relative h-[78vh] w-full max-w-4xl" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} onClick={(e) => e.stopPropagation()}>
              <Image src={shots[active].src} alt={shots[active].alt} fill sizes="90vw" className="object-contain" />
              <p className="absolute -bottom-10 left-0 right-0 text-center font-hand text-2xl text-cream">{shots[active].caption}</p>
            </motion.div>
            <button type="button" onClick={close} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20" aria-label="Close" autoFocus>
              <X className="h-6 w-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20" aria-label="Previous image">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20" aria-label="Next image">
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
