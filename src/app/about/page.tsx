import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBio } from "@/components/about/AboutBio";
import { AboutFeatures } from "@/components/about/AboutFeatures";

export const metadata: Metadata = {
  title: "About | Sohaib Bin Kamran",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutFeatures />
    </>
  );
}
