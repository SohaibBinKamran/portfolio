import { problem } from "@/data/classquest";
import { Callout, RichText, Section, SectionHead, StatCard } from "./Bits";

export function Problem() {
  return (
    <Section id="problem">
      <SectionHead n={problem.n} eyebrow={problem.eyebrow} title={problem.title} />
      <div className="mt-6 flex max-w-[1000px] flex-col gap-4">
        {problem.paras.map((p, i) => (
          <RichText
            key={i}
            text={p}
            className="text-[16px] leading-[1.68] text-[var(--cq-body)]"
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {problem.stats.map((s) => (
          <StatCard key={s.value + s.label} value={s.value} label={s.label} />
        ))}
      </div>

      <div className="mt-6">
        <Callout {...problem.callout} />
      </div>

      <RichText
        text={problem.close}
        className="mt-8 max-w-[1000px] text-[15px] leading-[1.66] text-[var(--cq-muted)]"
      />
    </Section>
  );
}
