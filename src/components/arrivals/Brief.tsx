import { brief } from "@/data/arrivals";

export function Brief() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <span className="ar-eyebrow">{brief.eyebrow}</span>
          <h2 className="mt-5 text-[32px] leading-[1.15] sm:text-[44px]">{brief.heading}</h2>
          <div className="mt-6 flex flex-col gap-5 text-[17px] leading-[1.75]">
            {brief.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {brief.routes.map((r) => (
            <li key={r.code} className="ar-panel flex items-center gap-4 px-4 py-4">
              <span className="ar-mono rounded-[6px] bg-[color:var(--ar-flap)] px-2.5 py-1.5 text-[14px] font-semibold text-[color:var(--ar-amber)]">
                {r.code}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[15px] font-bold text-[color:var(--ar-ink)]">{r.city}</span>
                <span className="text-[12px] text-[color:var(--ar-dim)]">{r.community}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
