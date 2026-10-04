import type { Metadata } from "next";
import "./cabinblu.css";
import { Hero } from "@/components/cabinblu/Hero";
import { Departures } from "@/components/cabinblu/Departures";
import { ContextSection } from "@/components/cabinblu/ContextSection";
import { FlightPlan } from "@/components/cabinblu/FlightPlan";
import { Findings } from "@/components/cabinblu/Findings";
import { FlightRecorder } from "@/components/cabinblu/FlightRecorder";
import { Journey } from "@/components/cabinblu/Journey";
import { BaggageClaim } from "@/components/cabinblu/BaggageClaim";
import { Arrivals } from "@/components/cabinblu/Arrivals";
import { Postcards } from "@/components/cabinblu/Postcards";
import { CaseStudyFooter } from "@/components/cabinblu/CaseStudyFooter";
import { ClosingCta } from "@/components/cabinblu/ClosingCta";

export const metadata: Metadata = {
  title: "CabinBlu — A 14-Day Flight Anxiety Diary Study | Sohaib Bin Kamran",
  description:
    "A longitudinal diary study on CabinBlu, a flight-anxiety app for Eurowings Digital × Lufthansa Innovation Hub — 12 participants, 24 interviews, 5 survey touchpoints, 3 anxiety trajectories.",
  openGraph: {
    title: "CabinBlu — A 14-Day Flight Anxiety Diary Study",
    description:
      "Following 12 anxious flyers from booking to boarding to see whether a flight-anxiety app actually meets fear where it lives.",
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
      <Findings />
      <FlightRecorder />
      <Journey />
      <BaggageClaim />
      <Arrivals />
      <Postcards />
      <CaseStudyFooter />
      <ClosingCta />
    </div>
  );
}
