"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../Reveal";

const stages = [
  {
    n: "01",
    title: "Grown with Care",
    text: "We partner directly with conscious growers, so every harvest can be traced back to where it came from — fresh, seasonal and honest.",
    // Photo: Unsplash (free licence), photo-1709207517323-a8fd737c5498.
    image: "/images/mood/farmer-harvest.jpg",
    alt: "A farmer kneeling in a ploughed field beside a woven basket of freshly harvested greens",
  },
  {
    n: "02",
    title: "Prepared with Purpose",
    text: "Rice is hand-pounded, atta is stone-ground, oils are wood cold-pressed and ghee is churned the bilona way — slow methods that keep nutrients intact.",
    image: "/images/mood/chakki-atta-loose.jpg",
    alt: "Stone-ground whole wheat atta",
  },
  {
    n: "03",
    title: "Carefully Packed",
    text: "Weighed and sealed in clear pouches carrying our three-women label — so you can see exactly what you are buying.",
    image: "/images/brand/packaging-1.jpg",
    alt: "HonestHands pouches of spices and flours",
  },
  {
    n: "04",
    title: "Ready for Your Kitchen",
    text: "From our store in Rasulgarh to your shelf — ingredients for the dal, rice and roti you grew up with, and the meals you are yet to cook.",
    image: "/images/mood/roasted-moong-dal-loose.jpg",
    alt: "A bowl of roasted moong dal ready to cook",
  },
];

export function FarmToKitchen() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Each stage rests in place for a stretch of scrolling before sliding on.
  const x = useTransform(scrollYProgress, [0, 0.16, 0.32, 0.5, 0.66, 0.84, 1], ["0%", "0%", "-25%", "-25%", "-50%", "-50%", "-75%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ["#95441c", "#863d18", "#6b2c10"]);

  return (
    <section className="on-dark relative text-cream" aria-labelledby="journey-title">
      {/* Desktop: pinned horizontal journey */}
      <motion.div ref={ref} style={{ backgroundColor: bg }} className="relative hidden h-[400vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="container-x flex items-end justify-between pt-28">
            <div>
              <p className="eyebrow text-marigold">From farm to kitchen</p>
              <h2 id="journey-title" className="mt-3 text-6xl text-cream">
                <span className="band">The journey</span> of an honest ingredient
              </h2>
            </div>
            <div className="w-64">
              <div className="flex justify-between text-xs text-cream/70">
                {stages.map((s) => (
                  <span key={s.n}>{s.n}</span>
                ))}
              </div>
              <div className="mt-2 h-px bg-cream/25">
                <motion.div style={{ width: progress }} className="h-px bg-marigold" />
              </div>
            </div>
          </div>
          <div className="relative flex-1">
            <motion.div style={{ x }} className="absolute inset-y-0 left-0 flex">
              {stages.map((s, i) => (
                <div key={s.n} className="flex w-screen shrink-0 items-center">
                <div className="container-x grid grid-cols-12 items-center gap-10 py-10">
                  <div className="col-span-5">
                    <p className="font-display text-[9rem] leading-none italic text-cream/15">{s.n}</p>
                    <h3 className="-mt-10 text-6xl text-cream">{s.title}</h3>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/80">{s.text}</p>
                  </div>
                  <div className="relative col-span-7 h-[58vh]">
                    <div className={`relative ml-auto h-full w-[85%] overflow-hidden ${i % 2 ? "rounded-[2rem]" : "rounded-t-full rounded-b-[2rem]"}`}>
                      <Image src={s.image} alt={s.alt} fill sizes="50vw" className="object-cover" />
                    </div>
                  </div>
                </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile & tablet: vertical timeline */}
      <div className="bg-rust py-24 lg:hidden">
        <div className="container-x">
          <p className="eyebrow text-marigold">From farm to kitchen</p>
          <h2 className="mt-3 text-[2.6rem] text-cream">The journey of an honest ingredient</h2>
          <ol className="relative mt-12 space-y-14 border-l border-cream/25 pl-7">
            {stages.map((s) => (
              <li key={s.n} className="relative">
                <span className="absolute -left-[2.15rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-marigold ring-4 ring-rust" aria-hidden />
                <Reveal>
                  <p className="font-display text-xl italic text-marigold">{s.n}</p>
                  <h3 className="mt-1 text-3xl text-cream">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream/80">{s.text}</p>
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <Image src={s.image} alt={s.alt} fill sizes="90vw" className="object-cover" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
