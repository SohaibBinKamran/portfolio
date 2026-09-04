import type { Metadata } from "next";
import "./cabinblu.css";
import { Hero } from "@/components/cabinblu/Hero";
import { Departures } from "@/components/cabinblu/Departures";
import { ContextSection } from "@/components/cabinblu/ContextSection";
import { FlightPlan } from "@/components/cabinblu/FlightPlan";
import { PinGate } from "@/components/cabinblu/PinGate";

export const metadata: Metadata = {
  title: "CabinBlu — A 14-Day Flight Anxiety Diary Study | Sohaib Bin Kamran",
  description:
    "A longitudinal diary study on CabinBlu, a flight-anxiety app for Eurowings Digital × Lufthansa Innovation Hub. The full study is PIN-protected — shared under NDA.",
  openGraph: {
    title: "CabinBlu — A 14-Day Flight Anxiety Diary Study",
    description:
      "Following 12 anxious flyers from booking to boarding to see whether a flight-anxiety app actually meets fear where it lives. Full study is PIN-protected.",
    images: ["/images/cabinblu-hero-plane.png"],
  },
};

export default function CabinBluPage() {
  return (
    <div className="cabinblu">
      <Hero />
      <Departures />
      <ContextSection />
      <FlightPlan />
      <PinGate />
    </div>
  );
}
