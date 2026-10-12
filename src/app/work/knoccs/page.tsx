import type { Metadata } from "next";
import "./knoccs.css";
import { Hero } from "@/components/knoccs/Hero";
import { Overview } from "@/components/knoccs/Overview";
import { Brand } from "@/components/knoccs/Brand";
import { Foundations } from "@/components/knoccs/Foundations";
import { Anatomy } from "@/components/knoccs/Anatomy";
import { Playground } from "@/components/knoccs/Playground";
import { Library } from "@/components/knoccs/Library";
import { Evolution } from "@/components/knoccs/Evolution";
import { ClosingCta } from "@/components/knoccs/ClosingCta";

export const metadata: Metadata = {
  title: "KNOCCS Design System | Sohaib Bin Kamran",
  description:
    "The design system behind KNOCCS, a customer support inbox. Brand, tokens and a documented component library you can play with.",
  openGraph: {
    title: "KNOCCS Design System",
    description: "Brand, tokens and components behind a customer support inbox.",
    images: ["/images/work-knoccs.png"],
  },
};

export default function KnoccsPage() {
  return (
    <div className="knoccs">
      <Hero />
      <Overview />
      <Brand />
      <Foundations />
      <Anatomy />
      <Playground />
      <Library />
      <Evolution />
      <ClosingCta />
    </div>
  );
}
