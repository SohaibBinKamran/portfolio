import type { Metadata } from "next";
import "./wanderlens.css";
import { Hero } from "@/components/wanderlens/Hero";
import { ProblemGoal } from "@/components/wanderlens/ProblemGoal";
import { StoryStrip } from "@/components/wanderlens/StoryStrip";
import { Brand } from "@/components/wanderlens/Brand";
import { Research } from "@/components/wanderlens/Research";
import { Prototype } from "@/components/wanderlens/Prototype";
import { Evaluation } from "@/components/wanderlens/Evaluation";
import { FeaturesImpact } from "@/components/wanderlens/FeaturesImpact";
import { Limitations } from "@/components/wanderlens/Limitations";
import { Roadmap } from "@/components/wanderlens/Roadmap";
import { Reflections } from "@/components/wanderlens/Reflections";
import { CaseFooter } from "@/components/wanderlens/CaseFooter";
import { ClosingCta } from "@/components/wanderlens/ClosingCta";

export const metadata: Metadata = {
  title: "WanderLens — An AR Field Guide for the Trail | Sohaib Bin Kamran",
  description:
    "A solo HCI thesis: designing and researching WanderLens, an augmented-reality hiking companion — 14 academic sources, a 200-person survey, a clickable Figma prototype, and five interviews across a 49-year age range.",
  openGraph: {
    title: "WanderLens — An AR Field Guide for the Trail",
    description:
      "Turning the uncertain middle of a hike into the most interesting part of the walk — researched and prototyped end-to-end.",
    images: ["/images/wanderlens/story-1.png"],
  },
};

export default function WanderLensPage() {
  return (
    <div className="wanderlens">
      <Hero />
      <ProblemGoal />
      <StoryStrip />
      <Brand />
      <Research />
      <Prototype />
      <Evaluation />
      <FeaturesImpact />
      <Limitations />
      <Roadmap />
      <Reflections />
      <CaseFooter />
      <ClosingCta />
    </div>
  );
}
