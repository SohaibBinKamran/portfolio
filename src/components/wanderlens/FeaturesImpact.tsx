import Image from "next/image";
import { features } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function FeaturesImpact() {
  return (
    <section className="bg-[var(--wl-paper)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-2 sm:px-8">
        <header>
          <WlEyebrow>{features.eyebrow}</WlEyebrow>
          <h2 className="mt-4 max-w-[1000px] text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {features.heading}
          </h2>
          <p className="mt-3 max-w-[1000px] text-[16.5px] leading-[1.6] text-[#5b6354]">
            {features.sub}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {features.cards.map((c) => (
            <div
              key={c.image}
              className="flex aspect-[550/265] items-center justify-center overflow-hidden rounded-[16px]"
              style={{ background: c.bg }}
            >
              <Image
                src={c.image}
                alt={c.alt}
                width={1100}
                height={460}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
