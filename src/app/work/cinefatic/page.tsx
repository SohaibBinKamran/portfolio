import type { Metadata } from "next";
import "./cinefatic.css";
import { Divider } from "@/components/cinefatic/Bits";
import { Header } from "@/components/cinefatic/Header";
import { Hero } from "@/components/cinefatic/Hero";
import { Problem } from "@/components/cinefatic/Problem";
import { Market } from "@/components/cinefatic/Market";
import { Pivot } from "@/components/cinefatic/Pivot";
import { Prioritization } from "@/components/cinefatic/Prioritization";
import { Solution } from "@/components/cinefatic/Solution";
import { Results } from "@/components/cinefatic/Results";
import { Reflections } from "@/components/cinefatic/Reflections";
import { ClosingCta } from "@/components/cinefatic/ClosingCta";

export const metadata: Metadata = {
  title: "Cinefatic — Making Movie Night a Two-Minute Decision | Sohaib Bin Kamran",
  description:
    "A self-directed product design project: Cinefatic is a city-wide cinema booking app for Karachi. Research reframed a single-cinema fix into a Fandango-style platform — showtimes, seat selection and checkout in one flow under two minutes.",
  openGraph: {
    title: "Cinefatic — Making Movie Night a Two-Minute Decision",
    description:
      "Replacing the phone call nobody answers with a booking flow that takes less time than the trailer.",
    images: ["/images/cinefatic/header-bg.png"],
  },
};

export default function CinefaticPage() {
  return (
    <div className="cinefatic">
      <Header />
      <Hero />
      <Problem />
      <Divider />
      <Market />
      <Divider />
      <Pivot />
      <Divider />
      <Prioritization />
      <Divider />
      <Solution />
      <Divider />
      <Results />
      <Divider />
      <Reflections />
      <ClosingCta />
    </div>
  );
}
