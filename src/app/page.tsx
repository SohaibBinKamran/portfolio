import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HeroWork } from "@/components/home/HeroWork";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyMe } from "@/components/home/WhyMe";
import { Niches } from "@/components/home/Niches";
import { Skills } from "@/components/home/Skills";
import { Process } from "@/components/home/Process";
import { OffDuty } from "@/components/home/OffDuty";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function Home() {
  return (
    <>
      <HomeIntro />
      <Hero variant="hybrid" />
      <HeroWork />
      <Testimonials />
      <WhyMe />
      <Niches />
      <Skills />
      <Process />
      <OffDuty />
      <ClosingCta />
    </>
  );
}
