import { phase1 } from "@/data/classquest";
import { LabelCard, Note, Section, SectionHead } from "./Bits";

export function Phase1() {
  return (
    <Section id="phase-1">
      <SectionHead
        n={phase1.n}
        eyebrow={phase1.eyebrow}
        title={phase1.title}
        intro={phase1.intro}
      />
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {phase1.themes.map((t) => (
          <LabelCard key={t.label} label={t.label} title={t.title} body={t.body} />
        ))}
      </div>
      <div className="mt-8">
        <Note text={phase1.close} />
      </div>
    </Section>
  );
}
