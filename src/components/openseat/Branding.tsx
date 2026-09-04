import Image from "next/image";
import { branding } from "@/data/openseat";
import { SectionHead, Section, RichText } from "./Bits";

export function Branding() {
  return (
    <Section id="branding">
      <SectionHead
        eyebrow={`${branding.n} · ${branding.eyebrow}`}
        title={branding.title}
        intro={branding.intro}
      />

      <div className="mt-10 flex flex-col items-start gap-10 md:flex-row md:gap-12">
        <div className="shrink-0 rounded-[28px] border border-[var(--os-border)] p-10">
          <Image
            src="/images/openseat/logo.png"
            alt="OpenSeat app icon — a line-drawn chair with broadcast waves on a coral field"
            width={150}
            height={150}
            className="size-[130px] rounded-[30px]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[24px] font-bold text-[var(--os-ink)] md:text-[26px]">
            {branding.markTitle}
          </h3>
          {branding.markBody.map((b) => (
            <RichText
              key={b}
              text={b}
              className="text-[15px] leading-[1.7] text-[var(--os-body)]"
            />
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {branding.swatches.map((s) => (
          <div
            key={s.name}
            className="overflow-hidden rounded-[16px] border border-[var(--os-border)]"
          >
            <div className="h-[92px]" style={{ background: s.fill }} />
            <div className="bg-white px-3.5 py-3">
              <p className="text-[13px] font-bold text-[var(--os-ink)]">{s.name}</p>
              <p className="text-[11.5px] text-[var(--os-body)]">{s.hex}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[20px] border border-[var(--os-border)] bg-white p-8">
        <p className="font-[family-name:var(--os-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--os-muted)]">
          {branding.font.label}
        </p>
        <p className="mt-2 text-[40px] font-extrabold text-[var(--os-ink)] md:text-[44px]">
          {branding.font.specimen}
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--os-body)]">
          {branding.font.note}
        </p>
      </div>
    </Section>
  );
}
