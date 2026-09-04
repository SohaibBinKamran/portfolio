import type { Metadata } from "next";
import "./openseat.css";
import { Separator } from "@/components/openseat/Bits";
import { Hero } from "@/components/openseat/Hero";
import { Context } from "@/components/openseat/Context";
import { Discovery } from "@/components/openseat/Discovery";
import { Persona } from "@/components/openseat/Persona";
import { Direction } from "@/components/openseat/Direction";
import { Solution } from "@/components/openseat/Solution";
import { Journeys } from "@/components/openseat/Journeys";
import { Trust } from "@/components/openseat/Trust";
import { KeyScreens } from "@/components/openseat/KeyScreens";
import { Beacon } from "@/components/openseat/Beacon";
import { Branding } from "@/components/openseat/Branding";
import { Retro } from "@/components/openseat/Retro";
import { CaseFooter } from "@/components/openseat/CaseFooter";
import { ClosingCta } from "@/components/openseat/ClosingCta";

export const metadata: Metadata = {
  title:
    "OpenSeat — Turning Solo Dining Into Social Connection | Sohaib Bin Kamran",
  description:
    "A 2-week product design sprint: OpenSeat is a location-based social dining app that lets people broadcast open seats at their table and lets others claim them instantly — a low-stakes, platonic moment of connection, one open seat at a time.",
  openGraph: {
    title: "OpenSeat — Broadcast the seat, not the date",
    description:
      "A location-based social dining app that replaces the awkwardness of eating alone with a low-stakes moment of connection.",
    images: ["/images/openseat/os-radar.png"],
  },
};

export default function OpenSeatPage() {
  return (
    <div className="openseat">
      <Hero />
      <Separator />
      <Context />
      <Separator />
      <Discovery />
      <Separator />
      <Persona />
      <Separator />
      <Direction />
      <Separator />
      <Solution />
      <Separator />
      <Journeys />
      <Separator />
      <Trust />
      <Separator />
      <KeyScreens />
      <Separator />
      <Beacon />
      <Separator />
      <Branding />
      <Separator />
      <Retro />
      <CaseFooter />
      <ClosingCta />
    </div>
  );
}
