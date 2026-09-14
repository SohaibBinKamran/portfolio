import type { Metadata } from "next";
import "./xoopah.css";
import { Hero } from "@/components/xoopah/Hero";
import { Problem } from "@/components/xoopah/Problem";
import { Persona } from "@/components/xoopah/Persona";
import { Landscape } from "@/components/xoopah/Landscape";
import { Brand } from "@/components/xoopah/Brand";
import { Process } from "@/components/xoopah/Process";
import { Gallery } from "@/components/xoopah/Gallery";
import { Close } from "@/components/xoopah/Close";
import { ClosingCta } from "@/components/xoopah/ClosingCta";

export const metadata: Metadata = {
  title: "Xoopah — Small Business, Sorted | Sohaib Bin Kamran",
  description:
    "Xoopah pulls every DM, order, review and payment small businesses juggle into one calm platform — so owners can stop switching tabs and start growing.",
  openGraph: {
    title: "Xoopah — Small business, sorted.",
    description:
      "A calm web platform that unifies every DM, order, review and payment small business owners juggle.",
    images: ["/images/xoopah/hero-dashboard.png"],
  },
};

export default function XoopahPage() {
  return (
    <div className="xoopah">
      <Hero />
      <Problem />
      <Persona />
      <Landscape />
      <Brand />
      <Process />
      <Gallery />
      <Close />
      <ClosingCta />
    </div>
  );
}
