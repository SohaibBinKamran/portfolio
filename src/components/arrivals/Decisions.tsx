import { decisions } from "@/data/arrivals";

export function Decisions() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{decisions.eyebrow}</span>
        <h2 className="mt-5 max-w-[760px] text-[32px] leading-[1.15] sm:text-[44px]">{decisions.heading}</h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {decisions.items.map((d, i) => (
            <article key={d.title} className="ar-panel flex flex-col gap-3 p-7">
              <span className="ar-mono text-[12px] text-[color:var(--ar-amber)]">0{i + 1}</span>
              <h3 className="text-[22px] leading-[1.25]">{d.title}</h3>
              <p className="text-[16px] leading-[1.75]">{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
