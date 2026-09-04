import { departures } from "@/data/cabinblu";

export function Departures() {
  return (
    <section className="flex flex-col items-center gap-8 bg-[var(--cb-navy-deep)] px-6 py-16 md:px-20 md:py-20">
      <p className="cb-eyebrow text-center text-[var(--cb-blue-eyebrow-on-navy)]">
        {departures.heading}
      </p>
      <div className="mx-auto grid w-full max-w-[980px] grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
        {departures.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-[var(--cb-navy-card)] px-4 py-6 text-center shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.06)]"
          >
            <span
              className="text-[40px] font-bold tracking-tight text-white md:text-[44px]"
              style={stat.accent ? { color: "var(--cb-gold)" } : undefined}
            >
              {stat.value}
            </span>
            <span className="text-[12.5px] leading-snug text-[var(--cb-blue-stat-label)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
