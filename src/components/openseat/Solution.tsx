import { solution } from "@/data/openseat";
import { SectionHead, Section } from "./Bits";

export function Solution() {
  return (
    <Section id="solution">
      <SectionHead
        eyebrow={`${solution.n} · ${solution.eyebrow}`}
        title={solution.title}
        intro={solution.intro}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {solution.pillars.map((p) => (
          <div
            key={p.title}
            className="flex flex-col gap-3 rounded-[18px] border border-[var(--os-border)] bg-[var(--os-tint)] p-7"
          >
            <h3 className="text-[18px] font-bold text-[var(--os-ink)]">{p.title}</h3>
            <p className="text-[14px] leading-[1.55] text-[var(--os-body)]">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
