import { Leaf, MessageCircleQuestion, ScrollText, Wheat } from "lucide-react";
import { Reveal } from "../Reveal";

const reasons = [
  {
    Icon: Leaf,
    title: "Thoughtful Selection",
    text: "Unadulterated staples with no artificial additives or chemical preservatives — chosen through direct relationships with conscious growers.",
  },
  {
    Icon: Wheat,
    title: "Traditional Ingredients",
    text: "Dhinki-kuta rice, chakki atta, kachi ghani oil, bilona ghee, chatua and palua — the everyday essentials of an Odia kitchen.",
  },
  {
    Icon: ScrollText,
    title: "Quality You Can Understand",
    text: "Clear names, honest descriptions and clear pouches — so you always know exactly what you are bringing home.",
  },
  {
    Icon: MessageCircleQuestion,
    title: "Convenience for Your Kitchen",
    text: "Order online or on WhatsApp, or visit our Rasulgarh store. We confirm availability with you on WhatsApp and have it ready to collect.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-cream py-24 lg:py-32" aria-labelledby="why-title">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta">Why choose HonestHands</p>
          <h2 id="why-title" className="mt-4 text-[clamp(2.3rem,4.6vw,4rem)]">
            Honest in name. <span className="italic text-rust">Honest in every hand.</span>
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="group h-full rounded-[1.6rem] border border-sand/70 bg-ivory p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(59,33,20,0.5)]">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-terracotta/40 text-rust transition-colors duration-500 group-hover:bg-rust group-hover:text-cream">
                  <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
