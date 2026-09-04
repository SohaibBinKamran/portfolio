import { guidelines } from "@/data/classquest";
import { Section, SectionHead } from "./Bits";

export function Guidelines() {
  return (
    <Section id="guidelines">
      <SectionHead
        n={guidelines.n}
        eyebrow={guidelines.eyebrow}
        title={guidelines.title}
        intro={guidelines.intro}
      />

      <div className="mt-10 flex flex-col gap-10">
        {guidelines.clusters.map((c) => (
          <div key={c.group} className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold text-[var(--cq-ink)]">{c.group}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {c.items.map((it) => (
                <div
                  key={it.g}
                  className="flex flex-col gap-2 rounded-[12px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-6 py-5"
                >
                  <p className="font-[family-name:var(--cq-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--cq-blue)]">
                    {it.g}
                  </p>
                  <p className="text-[14.5px] leading-[1.55] text-[var(--cq-ink)]">
                    {it.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
