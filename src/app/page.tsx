import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyMe } from "@/components/home/WhyMe";
import { Niches } from "@/components/home/Niches";
import { Skills } from "@/components/home/Skills";
import { Process } from "@/components/home/Process";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Testimonials />
      <WhyMe />
      <Niches />
      <Skills />
      <Process />
      <ClosingCta />
    </>
  );
}
