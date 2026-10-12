import Image from "next/image";
import { colorGroups, typeScale, iconography } from "@/data/knoccs";

export function Foundations() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">FOUNDATIONS</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">Tokens come first</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-8">
            {colorGroups.map((group) => (
              <div key={group.name}>
                <h3 className="text-[15px] font-semibold text-[color:var(--kn-ink)]">{group.name}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {group.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className="flex w-[104px] flex-col gap-2"
                      title={swatch.hex}
                    >
                      <div
                        className="kn-swatch h-[64px] w-full"
                        style={{ background: swatch.hex }}
                      />
                      <div className="text-[11px] font-semibold text-[color:var(--kn-ink)]">
                        {swatch.name}
                      </div>
                      <div className="-mt-1.5 text-[11px] uppercase text-[color:var(--kn-muted)]">
                        {swatch.hex}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            <div className="kn-panel p-8">
              <h3 className="text-[15px] font-semibold text-[color:var(--kn-ink)]">Type scale</h3>
              <div className="mt-6 flex flex-col">
                {typeScale.map((step) => (
                  <div
                    key={step.name}
                    className="flex items-baseline justify-between gap-4 border-b border-[color:var(--kn-border)] py-3 last:border-0"
                  >
                    <span
                      className="truncate text-[color:var(--kn-ink)]"
                      style={{ fontSize: step.size, lineHeight: `${step.lineHeight}px` }}
                    >
                      {step.name}
                    </span>
                    <span className="shrink-0 text-[12px] text-[color:var(--kn-muted)]">
                      {step.size}/{step.lineHeight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="kn-panel p-8">
              <h3 className="text-[15px] font-semibold text-[color:var(--kn-ink)]">Iconography</h3>
              <p className="mt-1 text-[13px] leading-[1.6] text-[color:var(--kn-muted)]">
                15 of the 50+ icons, drawn at 24px to one weight.
              </p>
              <div className="mt-5 grid grid-cols-5 gap-3">
                {iconography.map((icon) => (
                  <div
                    key={icon}
                    className="flex aspect-square items-center justify-center rounded-[10px] bg-[color:var(--kn-hover-light)]"
                    title={icon}
                  >
                    <Image
                      src={`/images/knoccs/icons/${icon}.svg`}
                      alt={`${icon} icon`}
                      width={22}
                      height={22}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
