import Image from "next/image";
import { process } from "@/data/xoopah";
import { Eyebrow, Section, SplitHeading } from "./Bits";

export function Process() {
  return (
    <Section>
      <div className="flex flex-col items-start gap-3 max-w-[640px]">
        <Eyebrow>{process.eyebrow}</Eyebrow>
        <SplitHeading parts={process.heading} accentIndex={1} />
      </div>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center">
        {process.steps.map((step, i) => (
          <div key={step.n} className="flex items-center gap-4">
            <div className="flex h-[260px] w-full flex-col items-center gap-1.5 rounded-[16px] bg-[var(--xo-tint)] p-5 md:w-[300px]">
              <span className="font-[family-name:var(--xo-mono)] text-[11px] tracking-[0.06em] text-[var(--xo-purple)]">
                {step.n}
              </span>
              <h4 className="text-[17px] font-bold text-[var(--xo-ink)]">{step.title}</h4>
              <div className="relative mt-1 h-full w-full overflow-hidden rounded-[6px]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 300px, 90vw"
                  className="object-contain"
                />
              </div>
            </div>
            {i < process.steps.length - 1 ? (
              <span aria-hidden className="hidden shrink-0 text-2xl text-[var(--xo-purple)]/50 md:block">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
