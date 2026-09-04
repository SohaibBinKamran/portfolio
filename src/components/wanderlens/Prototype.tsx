import { prototype } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";
import { PhoneFrame } from "./PhoneFrame";

export function Prototype() {
  return (
    <section className="bg-[var(--wl-paper)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-14 px-2 sm:px-8">
        <header>
          <WlEyebrow>{prototype.eyebrow}</WlEyebrow>
          <h2 className="mt-4 max-w-[1000px] text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {prototype.heading}
          </h2>
          <p className="mt-3 max-w-[1000px] text-[16.5px] leading-[1.6] text-[#5b6354]">
            {prototype.sub}
          </p>
        </header>

        {prototype.groups.map((g) => (
          <div key={g.num}>
            <div className="flex gap-4">
              <span
                className="text-[17px] font-bold text-[var(--wl-amber)]"
                style={{ fontFamily: "var(--wl-mono)" }}
              >
                {g.num}
              </span>
              <div>
                <h3 className="text-[22px] font-bold text-[var(--wl-forest)]">{g.title}</h3>
                <p className="mt-1 text-[15px] leading-[1.5] text-[#5b6354]">{g.sub}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {g.screens.map((s) => (
                <div key={s.title} className="flex flex-col items-center">
                  <div className="w-[210px] max-w-full sm:w-full sm:max-w-[300px]">
                    <PhoneFrame src={s.image} alt={s.title} />
                  </div>
                  <div className="mt-5 w-full">
                    <p className="text-[15px] font-bold text-[var(--wl-forest)]">{s.title}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-[#5b6354]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* stat banner */}
        <div className="rounded-[16px] border border-[var(--wl-border)] bg-white px-8 py-9 text-center shadow-[0_12px_28px_-14px_rgba(29,35,23,0.25)]">
          <p
            className="text-[52px] leading-none text-[var(--wl-forest)]"
            style={{ fontFamily: "var(--wl-display)", fontWeight: 900 }}
          >
            {prototype.statNumber}
          </p>
          <p className="mt-3 text-[15px] font-medium text-[var(--wl-ink-muted)]">{prototype.statLabel}</p>
        </div>
        <p className="-mt-8 text-center text-[13.5px] text-[#5b6354]">{prototype.statNote}</p>
      </div>
    </section>
  );
}
