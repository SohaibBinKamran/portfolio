import { reflections } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function Reflections() {
  return (
    <section className="bg-[var(--wl-forest)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-2 sm:px-8">
        <header className="max-w-[680px]">
          <WlEyebrow onDark>{reflections.eyebrow}</WlEyebrow>
          <h2 className="mt-4 text-[32px] font-bold leading-[1.15] !text-white sm:text-[42px]">
            {reflections.heading}
          </h2>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {reflections.cards.map((c) => (
            <div key={c.num} className="rounded-[16px] bg-[var(--wl-sage)] p-7">
              <p className="text-[13px] font-bold text-[var(--wl-amber)]" style={{ fontFamily: "var(--wl-mono)" }}>
                {c.num}
              </p>
              <h4 className="mt-3 text-[19px] font-bold text-[var(--wl-forest)]">{c.title}</h4>
              <p className="mt-3 text-[13.5px] leading-[1.65] text-[#5b6354]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
