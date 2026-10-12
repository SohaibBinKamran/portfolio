import { anatomy } from "@/data/knoccs";

function Marker({ n, style }: { n: number; style: React.CSSProperties }) {
  return (
    <span
      className="absolute z-10 flex size-[20px] items-center justify-center rounded-full bg-[#7620BA] text-[11px] font-bold text-white ring-2 ring-[#17112A]"
      style={style}
    >
      {n}
    </span>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="#312D34" strokeWidth="1.4" />
      <path d="M8 4.8V8l2.4 1.4" stroke="#312D34" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Anatomy() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{anatomy.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{anatomy.heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="kn-stage flex min-h-[340px] items-center justify-center overflow-x-auto rounded-[20px] p-10">
            <div className="relative h-[116px] w-[340px] shrink-0 scale-[1.0] sm:scale-[1.15]">
              <div className="absolute inset-0 rounded-[10px] bg-[#F7F5FA]" />

              <span className="absolute left-[12px] top-[21px] size-[8px] rounded-full bg-[#7620BA]" />
              <span className="absolute left-[26px] top-[14px] text-[14px] font-semibold text-[#1A181C]">
                Liam Wilson
              </span>
              <span className="absolute left-[262px] top-[16px]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#EBC606" aria-hidden>
                  <path d="M8 1.3l1.98 4.2 4.62.55-3.4 3.2.9 4.56L8 11.6l-4.1 2.2.9-4.56-3.4-3.2 4.62-.55L8 1.3z" />
                </svg>
              </span>
              <span className="absolute left-[282px] top-[15px] text-[12px] font-medium text-[#7D7881]">
                6:34 PM
              </span>
              <span className="absolute left-[26px] top-[40px] text-[13px] text-[#534E56]">
                Missing Tooltip on Product Images
              </span>
              <span className="absolute left-[26px] top-[72px] inline-flex items-center gap-1 rounded-full border border-[#7D7881] bg-[#F7F5FA] px-2 py-0.5 text-[11px] text-[#312D34]">
                <ClockIcon />
                30 mins
              </span>
              <span className="absolute left-[114px] top-[72px] rounded-full border border-[#B52121] bg-[#FFEDED] px-2 py-0.5 text-[11px] text-[#B52121]">
                Critical
              </span>

              <Marker n={6} style={{ left: -10, top: 11 }} />
              <Marker n={1} style={{ left: 64, top: -12 }} />
              <Marker n={4} style={{ left: 258, top: -12 }} />
              <Marker n={3} style={{ left: 300, top: -12 }} />
              <Marker n={2} style={{ left: 268, top: 36 }} />
              <Marker n={5} style={{ left: 142, top: 96 }} />
              <Marker n={7} style={{ left: 316, top: 88 }} />
            </div>
          </div>

          <ul className="kn-panel flex flex-col divide-y divide-[color:var(--kn-border)] p-2">
            {anatomy.parts.map((p) => (
              <li key={p.n} className="flex items-center gap-4 px-4 py-3">
                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#7620BA] text-[11px] font-bold text-white">
                  {p.n}
                </span>
                <span className="w-[110px] shrink-0 text-[14px] font-semibold text-[color:var(--kn-ink)]">
                  {p.name}
                </span>
                <span className="flex flex-1 items-center gap-2 text-[13px] text-[color:var(--kn-body)]">
                  <span
                    className="size-[16px] shrink-0 rounded-[4px] border border-black/10"
                    style={{ background: p.hex }}
                  />
                  {p.token}
                </span>
                <span className="hidden text-[12px] text-[color:var(--kn-muted)] sm:block">{p.spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
