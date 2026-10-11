import type { Metadata } from "next";
import "./arrivals.css";
import { Hero } from "@/components/arrivals/Hero";
import { Brief } from "@/components/arrivals/Brief";
import { Reality } from "@/components/arrivals/Reality";
import { Audit } from "@/components/arrivals/Audit";
import { Board } from "@/components/arrivals/Board";
import { Evolution } from "@/components/arrivals/Evolution";
import { Decisions } from "@/components/arrivals/Decisions";
import { Reflections } from "@/components/arrivals/Reflections";
import { ClosingCta } from "@/components/arrivals/ClosingCta";

export const metadata: Metadata = {
  title: "Arrivals Board: Diaspora Research Tool | Sohaib Bin Kamran",
  description:
    "A heat map was the ask, but the data to draw one doesn't exist. How I audited AI research against Destatis, IT.NRW and state statistics offices, and designed a split flap departures board that shows exactly what the registers can prove.",
  openGraph: {
    title: "Arrivals Board: Diaspora Research Tool",
    description:
      "Auditing AI research against official German statistics and turning it into an interactive departures board with tiered sources.",
    images: ["/images/work-arrivals.png"],
  },
};

export default function ArrivalsPage() {
  return (
    <div className="arrivals -mt-14">
      <Hero />
      <Brief />
      <Reality />
      <Audit />
      <Board />
      <Evolution />
      <Decisions />
      <Reflections />
      <ClosingCta />
    </div>
  );
}
