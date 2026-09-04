import { results } from "@/data/cinefatic";
import { Section, SectionHead, StatCard } from "./Bits";

export function Results() {
  return (
    <Section className="py-14">
      <SectionHead eyebrow={results.eyebrow} heading={results.heading} intro={results.intro} />
      <div className="mt-10 flex flex-col gap-8 sm:flex-row">
        {results.stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </Section>
  );
}
