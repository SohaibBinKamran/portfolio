import { process } from "@/data/classquest";
import { Note, Section, SectionHead } from "./Bits";

export function Process() {
  return (
    <Section id="process" band>
      <SectionHead
        n={process.n}
        eyebrow={process.eyebrow}
        title={process.title}
        intro={process.intro}
      />

      <div className="mt-9 grid overflow-hidden rounded-[14px] border border-[var(--cq-border)] bg-[var(--cq-card)] md:grid-cols-3">
        {process.phases.map((p, i) => (
          <div
            key={p.label}
            className={`flex flex-col gap-2 px-7 py-6 ${
              i > 0 ? "border-t border-[var(--cq-border)] md:border-l md:border-t-0" : ""
            }`}
          >
            <p className="font-[family-name:var(--cq-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--cq-gold)]">
              {p.label}
            </p>
            <h3 className="text-[17px] font-bold text-[var(--cq-ink)]">{p.title}</h3>
            <p className="text-[13.5px] leading-[1.5] text-[var(--cq-body)]">{p.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-7">
        <Note text={process.close} />
      </div>
    </Section>
  );
}
