import Image from "next/image";
import { persona } from "@/data/xoopah";
import { Eyebrow, Section, SplitHeading } from "./Bits";

export function Persona() {
  return (
    <Section tint>
      <div className="flex flex-col items-start gap-3 max-w-[640px]">
        <Eyebrow>{persona.eyebrow}</Eyebrow>
        <SplitHeading parts={persona.heading} />
      </div>

      <div className="flex flex-col gap-10 md:flex-row md:items-start">
        <div className="relative w-[280px] shrink-0 rotate-[-1.4deg] rounded-[20px] bg-white p-[26px] pb-10 shadow-[0_20px_40px_-20px_rgba(36,19,56,0.35)]">
          <span
            aria-hidden
            className="absolute right-[15px] top-[13px] h-[26px] w-[70px] rotate-6 border border-[rgba(244,185,66,0.7)] bg-[rgba(244,185,66,0.55)] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]"
          />
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={persona.card.photo}
              alt={persona.card.name}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
          <h3 className="pt-3.5 text-[22px] font-bold text-[var(--xo-ink)]">
            {persona.card.name}
          </h3>
          <p className="pb-3.5 pt-1 font-[family-name:var(--xo-sans)] text-[11.5px] uppercase tracking-[0.05em] text-[var(--xo-purple-deep)]">
            {persona.card.role}
          </p>
          <hr className="border-t border-[rgba(36,19,56,0.14)]" />
          <p className="pt-3.5 text-[13.5px] leading-[1.55] text-[var(--xo-body)]">
            {persona.card.body}
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-[18px]">
          <div className="flex flex-col gap-2.5">
            <span className="font-[family-name:var(--xo-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--xo-muted)]">
              Goals
            </span>
            <div className="flex flex-wrap gap-2.5">
              {persona.goals.map((g) => (
                <span
                  key={g}
                  className="rounded-full border border-[rgba(36,19,56,0.14)] bg-white px-4 py-2 text-[13px] font-bold text-[var(--xo-ink)]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="font-[family-name:var(--xo-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--xo-muted)]">
              Frustrations
            </span>
            <div className="flex flex-wrap gap-2.5">
              {persona.frustrations.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-[rgba(129,85,201,0.3)] bg-[#fbf0fb] px-4 py-2 text-[13px] font-bold text-[#6e2e7a]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <span className="font-[family-name:var(--xo-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--xo-muted)]">
              What drives her
            </span>
            {persona.drivers.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="w-[110px] shrink-0 text-[12.5px] font-bold text-[var(--xo-body)]">
                  {d.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8def7]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#b587ff] to-[var(--xo-purple)]"
                    style={{ width: `${d.value * 10}%` }}
                  />
                </div>
                <span className="w-[34px] shrink-0 text-right text-[12px] text-[var(--xo-purple-deep)]">
                  {d.value}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
