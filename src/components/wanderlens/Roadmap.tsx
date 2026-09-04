import { roadmap } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function Roadmap() {
  return (
    <section className="bg-[var(--wl-paper)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-2 sm:px-8">
        <header className="max-w-[680px]">
          <WlEyebrow>{roadmap.eyebrow}</WlEyebrow>
          <h2 className="mt-4 text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {roadmap.heading}
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {roadmap.columns.map((col) => (
            <div key={col.tag} className="rounded-[16px] border border-[var(--wl-border)] bg-white p-6">
              <span className="block size-5 rounded-full bg-[var(--wl-moss)]" aria-hidden />
              <p
                className="mt-8 text-[11px] uppercase tracking-[0.08em] text-[var(--wl-moss)]"
                style={{ fontFamily: "var(--wl-mono)" }}
              >
                {col.tag}
              </p>
              <h4 className="mt-2 text-[19px] font-bold text-[var(--wl-forest)]">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-2 pl-4">
                {col.items.map((it) => (
                  <li key={it} className="list-disc text-[14px] leading-[1.6] text-[#5b6354] marker:text-[var(--wl-moss)]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
