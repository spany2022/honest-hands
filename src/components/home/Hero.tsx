"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Hand, ShieldCheck, Store } from "lucide-react";
import { Magnetic } from "../Magnetic";
import { Botanical } from "../Botanical";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const line1 = ["Goodness", "Grown", "Naturally."];
const line2 = ["Crafted", "with", "Care."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem] lg:-mt-20 lg:pt-20" aria-labelledby="hero-title">
      {/* Sunlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[15%] -top-[25%] h-[85vmax] w-[85vmax] rounded-full bg-[radial-gradient(circle,rgba(217,162,59,0.38)_0%,rgba(217,162,59,0.12)_35%,transparent_65%)] [animation:sun-drift_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_70px,rgba(255,236,190,0.22)_70px_110px,transparent_110px_190px)] [mask-image:linear-gradient(200deg,black,transparent_60%)]" />
      </div>
      <Botanical tilt className="pointer-events-none absolute -right-48 -top-14 hidden h-[26rem] w-[32rem] text-terracotta/30 lg:block" />

      <div className="container-x relative grid min-h-[calc(100svh-4.5rem)] items-center gap-10 pb-16 pt-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:gap-6 lg:pb-16">
        <motion.div style={{ opacity: fade }} className="relative z-10 lg:col-span-6">
          <motion.p className="eyebrow text-terracotta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
            Organic &amp; Handmade · Bhubaneswar, Odisha
          </motion.p>

          <h1 id="hero-title" className="mt-5 text-[clamp(2.6rem,min(7.2vw,10vh),5.6rem)] leading-[0.95] lg:text-[clamp(2.6rem,min(5.6vw,10vh),5.6rem)]">
            <span className="block">
              {line1.map((w, i) => (
                <Word key={w} delay={0.35 + i * 0.09}>{w}</Word>
              ))}
            </span>
            <span className="block italic text-rust">
              {line2.map((w, i) => (
                <Word key={w} delay={0.7 + i * 0.09}>{w}</Word>
              ))}
            </span>
          </h1>

          <motion.p className="mt-6 max-w-xl text-lg leading-relaxed text-muted" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.05 }}>
            Discover thoughtfully sourced organic staples, traditional ingredients, and handmade essentials that bring nature&apos;s goodness to your everyday kitchen.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.2 }}>
            <Magnetic>
              <Link href="/shop" className="btn btn-primary group">
                Shop Our Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link href="/about" className="btn btn-ghost">
              Discover Our Story
            </Link>
          </motion.div>

          <motion.ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.45 }}>
            <li className="flex items-center gap-2">
              <Hand className="h-4 w-4 text-leaf" aria-hidden /> Hand-pounded, stone-ground &amp; wood-pressed
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-leaf" aria-hidden /> FSSAI licensed
            </li>
            <li className="flex items-center gap-2">
              <Store className="h-4 w-4 text-leaf" aria-hidden /> Visit our store in Rasulgarh
            </li>
          </motion.ul>
        </motion.div>

        {/* Layered ingredient composition */}
        <div className="relative mx-auto aspect-[5/5.4] w-full max-w-[34rem] lg:col-span-6 lg:max-w-[min(100%,calc((100svh-9rem)*0.92))]">
          <Layer y={yBack} className="absolute left-[30%] top-0 h-[78%] w-[44%]" delay={0.15} arch>
            <HeroImg src="/images/mood/kandhamal-turmeric-loose.jpg" alt="Golden Kandhamal turmeric powder" priority />
          </Layer>
          <Layer y={yMid} className="absolute left-0 top-[24%] h-[58%] w-[34%]" delay={0.35} arch>
            <HeroImg src="/images/mood/chakki-atta-loose.jpg" alt="Stone-ground chakki atta" />
          </Layer>
          <Layer y={yMid} className="absolute right-0 top-[14%] h-[52%] w-[30%]" delay={0.5} arch>
            <HeroImg src="/images/mood/a2-desi-cow-ghee-loose.jpg" alt="Golden A2 desi cow ghee" />
          </Layer>
          <Layer y={yFront} className="absolute bottom-[2%] left-[14%] h-[30%] w-[30%] rounded-full" delay={0.7}>
            <HeroImg src="/images/mood/roasted-moong-dal-loose.jpg" alt="Roasted moong dal" />
          </Layer>
          <Layer y={yFront} className="absolute bottom-[8%] right-[6%] h-[34%] w-[38%] rounded-[2rem]" delay={0.85}>
            <HeroImg src="/images/mood/honey-loose.jpg" alt="Raw honey dripping from a wooden dipper" />
          </Layer>

          {/* Rotating seal */}
          <motion.div
            className="absolute right-[34%] top-[64%] z-10 grid h-28 w-28 place-items-center sm:h-32 sm:w-32"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 1.1 }}
          >
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full [animation:spin-slow_28s_linear_infinite]" aria-hidden>
              <defs>
                <path id="seal" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <circle cx="60" cy="60" r="59" fill="#fbf8f0" />
              <text fontSize="9.4" letterSpacing="2.6" fill="#95441c" fontWeight="600">
                <textPath href="#seal">WHERE PURITY LIVES IN EVERY HAND · </textPath>
              </text>
            </svg>
            <Image src="/images/brand/logo.png" alt="" width={80} height={80} className="relative h-[52%] w-[52%]" />
          </motion.div>

          <motion.p
            className="absolute left-0 top-[6%] hidden max-w-[30%] font-hand sm:block text-2xl leading-tight text-terracotta sm:text-3xl"
            initial={{ opacity: 0, rotate: -6 }}
            animate={{ opacity: 1, rotate: -6 }}
            transition={{ duration: 1, delay: 1.6 }}
            aria-hidden
          >
            straight from {site.address.state}’s farms
          </motion.p>
        </div>
      </div>

      <motion.a
        href="#philosophy"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold tracking-[0.3em] text-muted uppercase lg:flex"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-sand">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-rust [animation:scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.a>
    </section>
  );
}

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
      <motion.span className="inline-block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

function Layer({ children, className, delay, y, arch }: { children: React.ReactNode; className: string; delay: number; y: MotionValue<number>; arch?: boolean }) {
  return (
    <motion.div style={{ y }} className={className}>
      <motion.div
        className={`relative h-full w-full overflow-hidden shadow-[0_30px_60px_-30px_rgba(59,33,20,0.55)] ${arch ? "rounded-t-full rounded-b-[1.6rem]" : "rounded-[inherit]"}`}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function HeroImg({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 22vw, 45vw"
      className="object-cover [animation:slow-zoom_2.8s_cubic-bezier(0.22,1,0.36,1)_both]"
    />
  );
}
