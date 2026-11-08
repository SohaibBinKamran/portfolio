import type { Metadata } from "next";
import "./classquest-v2.css";
import { ClassQuestV2 } from "@/components/classquest-v2/ClassQuestV2";

// ClassQuest CaseStudy V2 (live). V1 is kept in ./_v1 and tagged classquest-casestudy-v1.
export const metadata: Metadata = {
  title:
    "ClassQuest | Turning Scattered Class Notes Into a Shared Quest for Knowledge | Sohaib Bin Kamran",
  description:
    "A master's thesis case study: ClassQuest is an AI assisted class wiki that turns fragmented course material into cited flashcards, quizzes and a daily study quest, designed and validated across three Design Science Research iterations with the same seven students.",
  openGraph: {
    title: "ClassQuest | A Shared Quest for Knowledge",
    description:
      "An AI assisted class wiki, researched and rebuilt across three DSR phases with the same seven students.",
    images: ["/images/classquest/v2/hero.jpg"],
  },
};

export default function ClassQuestPage() {
  return <ClassQuestV2 />;
}
