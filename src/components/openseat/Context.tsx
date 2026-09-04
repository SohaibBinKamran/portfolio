import Image from "next/image";
import { context } from "@/data/openseat";
import { Eyebrow, Section } from "./Bits";

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[10px] font-[family-name:var(--os-mono)] text-[12.5px] uppercase tracking-[0.14em] text-[var(--os-coral-deep)]">
      <span className="size-[7px] rounded-[2px] bg-[var(--os-coral)]" />
      {children}
    </span>
  );
}

export function Context() {
  return (
    <Section id="context">
      <div className="flex flex-col items-start gap-[18px]">
        <Eyebrow>
          {context.n} · {context.eyebrow}
        </Eyebrow>
        <h2 className="w-full text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[46px] md:tracking-[-0.46px]">
          {context.title}
        </h2>
      </div>

      <div className="mt-[18px] flex flex-col items-center gap-12 md:flex-row md:items-center">
        {/* Left column — fixed ~643px like Figma */}
        <div className="flex w-full flex-col gap-[18px] md:w-[643px] md:shrink-0">
          <p className="max-w-[620px] text-[15px] leading-[1.6] text-[var(--os-body)]">
            {context.intro}
          </p>

          <div className="flex flex-col gap-[15px] rounded-[22px] border border-[var(--os-border)] bg-[var(--os-card)] p-[33px]">
            <MiniLabel>{context.friction.label}</MiniLabel>
            <p className="text-[16px] leading-[1.65] text-[var(--os-ink)]">
              {context.friction.body}
            </p>
            <MiniLabel>{context.opportunity.label}</MiniLabel>
            <p className="text-[16px] leading-[1.65] text-[var(--os-ink)]">
              {context.opportunity.body}
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-[22px] bg-[var(--os-dark)] p-[34px]">
            <p className="font-[family-name:var(--os-mono)] text-[11.5px] uppercase tracking-[0.12em] text-[var(--os-mustard)]">
              {context.brief.label}
            </p>
            <p className="text-[17px] leading-[1.6] text-[var(--os-tint)]">
              {context.brief.quote}
            </p>
            <p className="border-t border-[rgba(251,242,230,0.2)] pt-[19px] text-[12px] leading-[1.5] text-[#d9cbbb]">
              {context.brief.note}
            </p>
          </div>
        </div>

        {/* Illustration — larger, vertically centred against the text block */}
        <div className="flex w-full flex-1 justify-center md:justify-end">
          <Image
            src="/images/openseat/city.png"
            alt="An illustrated hillside city packed with buildings, streets and people"
            width={900}
            height={1124}
            sizes="(min-width: 768px) 481px, 80vw"
            className="h-auto w-full max-w-[481px]"
          />
        </div>
      </div>
    </Section>
  );
}
