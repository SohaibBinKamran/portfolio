import { impact } from "@/data/classquest";
import { Callout, LabelCard, Note, Section, SectionHead, StatCard } from "./Bits";

export function Impact() {
  return (
    <Section id="impact" band>
      <SectionHead
        n={impact.n}
        eyebrow={impact.eyebrow}
        title={impact.title}
        intro={impact.intro}
      />

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        {impact.stats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      <div className="mt-6">
        <Callout {...impact.callout} />
      </div>

      <p className="mt-8 max-w-[76ch] text-[15px] leading-[1.64] text-[var(--cq-body)]">
        {impact.hotjarLead}
      </p>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {impact.metrics.map((m) => (
          <LabelCard
            key={m.label}
            label={m.label}
            title={m.value}
            body={m.body}
          />
        ))}
      </div>

      <div className="mt-8">
        <Note text={impact.close} />
      </div>
    </Section>
  );
}
