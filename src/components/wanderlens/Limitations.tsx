import Image from "next/image";
import { limitations } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function Limitations() {
  return (
    <section className="bg-[var(--wl-sage)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-2 sm:px-8">
        <header className="max-w-[680px]">
          <WlEyebrow>{limitations.eyebrow}</WlEyebrow>
          <h2 className="mt-4 text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {limitations.heading}
          </h2>
          <p className="mt-3 text-[16.5px] leading-[1.6] text-[#5b6354]">{limitations.sub}</p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {limitations.cards.map((c) => (
            <Image
              key={c.image}
              src={c.image}
              alt={c.alt}
              width={1090}
              height={906}
              className="w-full rounded-[16px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
