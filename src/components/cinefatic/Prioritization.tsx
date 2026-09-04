import Image from "next/image";
import { prioritization } from "@/data/cinefatic";
import { NumberCard, Section, SectionHead } from "./Bits";

export function Prioritization() {
  return (
    <Section className="py-14">
      <SectionHead
        eyebrow={prioritization.eyebrow}
        heading={prioritization.heading}
        intro={prioritization.intro}
      />

      <div className="mt-12 overflow-hidden rounded-[14px]">
        <Image
          src={prioritization.image}
          alt={prioritization.imageAlt}
          width={1900}
          height={1645}
          className="block h-auto w-full"
          sizes="(max-width: 960px) 100vw, 960px"
        />
      </div>

      <div className="mt-9 flex flex-col gap-5 md:flex-row">
        {prioritization.cards.map((c) => (
          <NumberCard key={c.n} {...c} />
        ))}
      </div>
    </Section>
  );
}
