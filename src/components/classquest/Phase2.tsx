import { phase2 } from "@/data/classquest";
import { Callout, LabelCard, Section, SectionHead } from "./Bits";

export function Phase2() {
  return (
    <Section id="phase-2" band>
      <SectionHead
        n={phase2.n}
        eyebrow={phase2.eyebrow}
        title={phase2.title}
        intro={phase2.intro}
      />
      <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {phase2.themes.map((t) => (
          <LabelCard key={t.label} label={t.label} title={t.title} body={t.body} />
        ))}
      </div>
      <div className="mt-8">
        <Callout {...phase2.callout} />
      </div>
    </Section>
  );
}
