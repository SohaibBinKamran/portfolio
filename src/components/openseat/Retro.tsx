import { retro } from "@/data/openseat";
import { SectionHead, Section, RichText } from "./Bits";

export function Retro() {
  return (
    <Section id="retro">
      <SectionHead
        eyebrow={`${retro.n} · ${retro.eyebrow}`}
        title={retro.title}
        intro={retro.intro}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-[18px] border border-[#c3d1bf] bg-[var(--os-sage-tint)] p-8">
          <p className="font-[family-name:var(--os-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[var(--os-sage)]">
            {retro.worked.label}
          </p>
          <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-[14.5px] leading-[1.6] text-[var(--os-ink)]">
            {retro.worked.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[18px] border border-[#e6cf9c] bg-[var(--os-mustard-tint)] p-8">
          <p className="font-[family-name:var(--os-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[#b07a1c]">
            {retro.improve.label}
          </p>
          <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-[14.5px] leading-[1.6] text-[var(--os-ink)]">
            {retro.improve.items.map((it) => (
              <li key={it}>
                <RichText text={it} className="inline" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
