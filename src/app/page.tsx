import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Collections } from "@/components/home/Collections";
import { Essentials } from "@/components/home/Essentials";
import { FarmToKitchen } from "@/components/home/FarmToKitchen";
import { Gallery } from "@/components/home/Gallery";
import { WhyChoose } from "@/components/home/WhyChoose";
import { RecipesTeaser } from "@/components/home/RecipesTeaser";
import { Trust } from "@/components/home/Trust";
import { HonestKappi } from "@/components/home/HonestKappi";
import { Heritage } from "@/components/home/Heritage";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Collections />
      <Essentials />
      <FarmToKitchen />
      <Gallery />
      <WhyChoose />
      <RecipesTeaser />
      <HonestKappi />
      <Trust />
      <Heritage />
      <Newsletter />
    </>
  );
}
