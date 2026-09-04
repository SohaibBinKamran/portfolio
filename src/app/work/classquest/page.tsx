import type { Metadata } from "next";
import "./classquest.css";
import { Separator } from "@/components/classquest/Bits";
import { Hero } from "@/components/classquest/Hero";
import { Problem } from "@/components/classquest/Problem";
import { Process } from "@/components/classquest/Process";
import { Phase1 } from "@/components/classquest/Phase1";
import { Phase2 } from "@/components/classquest/Phase2";
import { Phase3 } from "@/components/classquest/Phase3";
import { Brand } from "@/components/classquest/Brand";
import { Solution } from "@/components/classquest/Solution";
import { Impact } from "@/components/classquest/Impact";
import { Guidelines } from "@/components/classquest/Guidelines";
import { Reflections } from "@/components/classquest/Reflections";
import { CaseFooter } from "@/components/classquest/CaseFooter";
import { ClosingCta } from "@/components/classquest/ClosingCta";

export const metadata: Metadata = {
  title:
    "ClassQuest — Turning Scattered Class Notes Into a Shared Quest for Knowledge | Sohaib Bin Kamran",
  description:
    "A master's thesis case study: ClassQuest is an AI-assisted class wiki that consolidates fragmented course material into citation-backed flashcards, quizzes, and daily study quests — designed and validated across three Design Science Research iterations.",
  openGraph: {
    title: "ClassQuest — A Shared Quest for Knowledge",
    description:
      "An AI-assisted class wiki, researched and rebuilt across three DSR phases with the same seven students.",
    images: ["/images/classquest/hero.jpg"],
  },
};

export default function ClassQuestPage() {
  return (
    <div className="classquest">
      <Hero />
      <Separator />
      <Problem />
      <Separator />
      <Process />
      <Separator />
      <Phase1 />
      <Separator />
      <Phase2 />
      <Separator />
      <Phase3 />
      <Separator />
      <Brand />
      <Separator />
      <Solution />
      <Separator />
      <Impact />
      <Separator />
      <Guidelines />
      <Separator />
      <Reflections />
      <CaseFooter />
      <ClosingCta />
    </div>
  );
}
