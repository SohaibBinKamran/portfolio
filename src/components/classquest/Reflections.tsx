import { reflections } from "@/data/classquest";
import { LabelCard, Note, Section, SectionHead } from "./Bits";

export function Reflections() {
  return (
    <Section id="reflections" band>
      <SectionHead
        n={reflections.n}
        eyebrow={reflections.eyebrow}
        title={reflections.title}
      />
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {reflections.cards.map((c) => (
          <LabelCard
            key={c.title}
            label={c.label}
            labelColor={c.label === "Next" ? "blue" : "muted"}
            title={c.title}
            body={c.body}
          />
        ))}
      </div>
      <div className="mt-8">
        <Note text={reflections.close} />
      </div>
    </Section>
  );
}
