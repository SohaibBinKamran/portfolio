import Image from "next/image";
import { phase3 } from "@/data/classquest";
import { Callout, Caption, Section, SectionHead } from "./Bits";

export function Phase3() {
  return (
    <Section id="phase-3">
      <SectionHead
        n={phase3.n}
        eyebrow={phase3.eyebrow}
        title={phase3.title}
        intro={phase3.intro}
      />

      <div className="mt-9 flex flex-col gap-4">
        {phase3.rows.map((row) => (
          <div key={row.insight} className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[12px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-6 py-5">
              <p className="font-[family-name:var(--cq-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--cq-red)]">
                Insight
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--cq-ink)]">
                {row.insight}
              </p>
            </div>
            <div className="rounded-[12px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-6 py-5">
              <p className="font-[family-name:var(--cq-mono)] text-[11px] uppercase tracking-[0.09em] text-[var(--cq-green)]">
                Action
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--cq-ink)]">
                {row.action}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          { label: phase3.beforeAfter.before, src: "/images/classquest/dash-before.png", w: 1500, h: 1261, chip: "bg-[var(--cq-red-tint)] text-[var(--cq-red)]" },
          { label: phase3.beforeAfter.after, src: "/images/classquest/dash-after.jpg", w: 1176, h: 1036, chip: "bg-[var(--cq-green-tint)] text-[var(--cq-green)]" },
        ].map((d) => (
          <figure key={d.label}>
            <figcaption
              className={`mb-3 inline-block rounded-[5px] px-2.5 py-1 font-[family-name:var(--cq-mono)] text-[10.5px] uppercase tracking-[0.09em] ${d.chip}`}
            >
              {d.label}
            </figcaption>
            <div className="overflow-hidden rounded-[12px] border border-[var(--cq-border)]">
              <Image
                src={d.src}
                alt={`ClassQuest dashboard — ${d.label}`}
                width={d.w}
                height={d.h}
                sizes="(min-width: 768px) 550px, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </figure>
        ))}
      </div>
      <Caption>{phase3.beforeAfter.caption}</Caption>

      <div className="mt-8">
        <Callout {...phase3.callout} />
      </div>
    </Section>
  );
}
