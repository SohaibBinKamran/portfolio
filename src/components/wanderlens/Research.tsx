import Image from "next/image";
import { research } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function Research() {
  return (
    <section id="research" className="scroll-mt-24 bg-[var(--wl-sage)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[18px] px-2 sm:px-8">
        <header className="pb-4">
          <WlEyebrow>{research.eyebrow}</WlEyebrow>
          <h2 className="mt-4 max-w-[1000px] text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {research.heading}
          </h2>
          <p className="mt-3 max-w-[1000px] text-[16.5px] leading-[1.6] text-[#5b6354]">
            {research.sub}
          </p>
        </header>

        {/* flow */}
        <div className="grid gap-x-6 gap-y-8 rounded-[28px] border border-[var(--wl-border)] bg-white px-9 py-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {research.flow.map((f, i) => (
            <div key={f.num} className="contents">
              {i > 0 && (
                <span className="hidden self-center text-[20px] text-[#c7d79a] md:block" aria-hidden>
                  →
                </span>
              )}
              <div>
                <p className="text-[13px] font-bold text-[var(--wl-amber)]" style={{ fontFamily: "var(--wl-mono)" }}>
                  {f.num}
                </p>
                <p className="mt-1.5 text-[15.5px] font-bold text-[var(--wl-forest)]">{f.title}</p>
                <p className="mt-1 text-[12.5px] leading-[1.5] text-[#5b6354]">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* themes */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {research.themes.map((t) => (
            <div
              key={t.title}
              className="flex flex-col gap-3 rounded-[16px] border border-[var(--wl-border)] bg-white p-7"
            >
              <h4 className="text-[16px] font-bold text-[var(--wl-forest)]">{t.title}</h4>
              <ul className="flex flex-col gap-1.5 pl-4">
                {t.points.map((p) => (
                  <li key={p} className="list-disc text-[13.5px] leading-[1.6] text-[#5b6354] marker:text-[var(--wl-moss)]">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-auto rounded-[8px] bg-[var(--wl-sage)] px-3 py-2.5 text-[12.5px] font-medium leading-[1.5] text-[var(--wl-forest)]">
                {t.risk}
              </p>
            </div>
          ))}
        </div>

        {/* teardown */}
        <h3 className="mt-8 text-[22px] font-bold text-[var(--wl-forest)]">{research.teardownTitle}</h3>
        <div className="overflow-x-auto rounded-[16px] border border-[var(--wl-border)] bg-white">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-[var(--wl-sage)]">
                {["App", "Strength", "Gap"].map((h) => (
                  <th
                    key={h}
                    className="px-[18px] py-3.5 text-[11px] uppercase tracking-[0.06em] text-[#5b6354]"
                    style={{ fontFamily: "var(--wl-mono)", fontWeight: 700 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {research.teardown.map((r) => (
                <tr key={r.app} className="border-t border-[var(--wl-border)]">
                  <td className="px-[18px] py-4 text-[14px] font-bold text-[var(--wl-forest)]">{r.app}</td>
                  <td className="px-[18px] py-4 text-[14px] text-[var(--wl-ink)]">{r.strength}</td>
                  <td className="px-[18px] py-4 text-[14px] text-[var(--wl-ink)]">{r.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-2 rounded-[16px] bg-[var(--wl-forest)] px-6 py-5 text-[15px] font-medium leading-[1.6] text-white">
          {research.teardownKicker.lead}
          <span className="font-bold text-[var(--wl-moss-bright)]">{research.teardownKicker.parts[0]}</span>
          {research.teardownKicker.parts[1]}
          <span className="font-bold text-[var(--wl-moss-bright)]">{research.teardownKicker.parts[2]}</span>
          {research.teardownKicker.parts[3]}
          <span className="font-bold text-[var(--wl-moss-bright)]">{research.teardownKicker.parts[4]}</span>
          {research.teardownKicker.tail}
        </p>

        {/* survey */}
        <h3 className="mt-8 text-[22px] font-bold text-[var(--wl-forest)]">{research.surveyTitle}</h3>
        <div className="grid gap-5 md:grid-cols-3">
          {research.survey.map((s) => (
            <div key={s.label} className="rounded-[16px] border border-[var(--wl-border)] bg-white p-8">
              <p
                className="text-[52px] leading-none text-[var(--wl-moss)]"
                style={{ fontFamily: "var(--wl-sans)", fontWeight: 900 }}
              >
                {s.stat}
              </p>
              <p className="mt-3 text-[15px] font-bold text-[var(--wl-forest)]">{s.label}</p>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-[#5b6354]">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="text-right text-[10.5px] text-[#5b6354]" style={{ fontFamily: "var(--wl-mono)" }}>
          {research.surveyNote}
        </p>

        {/* socio */}
        <h3 className="mt-8 text-[22px] font-bold text-[var(--wl-forest)]">{research.socioTitle}</h3>
        <div className="grid gap-5 md:grid-cols-2">
          {research.socio.map((s) => (
            <figure key={s.image} className="flex flex-col gap-5">
              <Image src={s.image} alt={s.alt} width={1000} height={780} className="w-full rounded-[24px]" />
              <figcaption className="text-center text-[13.5px] leading-[1.6] text-[#5b6354]">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
