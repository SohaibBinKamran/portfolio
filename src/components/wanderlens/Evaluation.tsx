import Image from "next/image";
import { evaluation } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function Evaluation() {
  return (
    <section className="bg-[var(--wl-sage)] px-6 pb-28 pt-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3.5 px-2 sm:px-8">
        <header>
          <WlEyebrow>{evaluation.eyebrow}</WlEyebrow>
          <h2 className="mt-4 max-w-[1000px] text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {evaluation.heading}
          </h2>
          <p className="mt-3 max-w-[1000px] text-[16.5px] leading-[1.6] text-[#5b6354]">
            {evaluation.sub}
          </p>
        </header>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {[evaluation.guerrilla, evaluation.suggestions].map((b) => (
            <div key={b.title} className="rounded-[16px] border border-[var(--wl-border)] bg-white p-8">
              <h4 className="text-[18px] font-bold text-[var(--wl-forest)]">{b.title}</h4>
              <ul className="mt-3.5 flex flex-col gap-2 pl-4">
                {b.points.map((p) => (
                  <li key={p} className="list-disc text-[14px] leading-[1.6] text-[#5b6354] marker:text-[var(--wl-moss)]">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-[22px] font-bold text-[var(--wl-forest)]">{evaluation.interviewsTitle}</h3>
        <div className="mt-2 flex flex-wrap gap-2.5">
          {evaluation.personas.map((p) => (
            <span
              key={p}
              className="rounded-[20px] bg-white px-3.5 py-1.5 text-[11.5px] font-bold text-[var(--wl-forest)]"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {evaluation.cards.map((c) => (
            <div key={c.image} className="overflow-hidden rounded-[16px] bg-[var(--wl-forest-panel)] p-3">
              <Image
                src={c.image}
                alt={c.alt}
                width={700}
                height={360}
                className="w-full rounded-[10px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
