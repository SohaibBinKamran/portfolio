import { direction } from "@/data/openseat";
import { SectionHead, Section } from "./Bits";

export function Direction() {
  return (
    <Section id="direction">
      <SectionHead
        eyebrow={`${direction.n} · ${direction.eyebrow}`}
        title={direction.title}
        intro={direction.intro}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {direction.jobs.map((j) => (
          <div
            key={j.tag}
            className="flex flex-col gap-3 rounded-[18px] bg-[var(--os-tint)] p-7"
          >
            <p className="font-[family-name:var(--os-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[var(--os-coral-deep)]">
              {j.tag}
            </p>
            <h3 className="text-[18px] font-bold text-[var(--os-ink)]">{j.title}</h3>
            <p className="text-[14px] leading-[1.55] text-[var(--os-body)]">{j.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
