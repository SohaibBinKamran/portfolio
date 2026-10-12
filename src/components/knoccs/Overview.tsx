import { overview } from "@/data/knoccs";

export function Overview() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{overview.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{overview.heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {overview.stats.map((stat) => (
            <div key={stat.label} className="kn-panel flex flex-col gap-5 p-7">
              <div className="flex items-baseline gap-4">
                <span className="text-[56px] font-bold leading-none text-[color:var(--kn-s5)]">
                  {stat.from}
                </span>
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden className="self-center">
                  <path d="M0 7h25M20 2l5 5-5 5" stroke="#7620BA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[56px] font-bold leading-none text-[color:var(--kn-p2)]">
                  {stat.to}
                </span>
              </div>
              <p className="text-[14px] leading-[1.5] text-[color:var(--kn-body)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
