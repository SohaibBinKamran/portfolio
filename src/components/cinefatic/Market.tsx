import Image from "next/image";
import { market } from "@/data/cinefatic";
import { NumberCard, SectionHead, Section } from "./Bits";

export function Market() {
  return (
    <Section className="py-14">
      <SectionHead eyebrow={market.eyebrow} heading={market.heading} intro={market.intro} />

      <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
        {market.logos.map((l) => (
          <div key={l.alt} className="flex flex-col items-center gap-3">
            <div className="flex h-[90px] w-full items-center justify-center rounded-[12px] border border-[var(--cf-border-soft)] bg-[var(--cf-panel-deep)] p-4">
              <Image
                src={l.src}
                alt={l.alt}
                width={480}
                height={240}
                className="max-h-[46px] w-auto object-contain"
                sizes="120px"
              />
            </div>
            <p className="text-center text-[10.5px] tracking-[0.02em] text-[var(--cf-body-dim)]">
              {l.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-5 md:flex-row">
        {market.cards.map((c) => (
          <NumberCard key={c.n} {...c} />
        ))}
      </div>
    </Section>
  );
}
