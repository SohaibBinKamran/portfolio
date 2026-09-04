import { meta } from "@/data/openseat";
import { Eyebrow } from "./Bits";
import { HeroPhones } from "./HeroPhones";

export function Hero() {
  return (
    <header className="-mt-12 px-6 pt-28 pb-4">
      <div className="mx-auto flex w-full max-w-[1172px] flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Eyebrow>{meta.eyebrow}</Eyebrow>
          <h1 className="text-[40px] leading-[1.02] sm:text-[56px] md:text-[68px]">
            {meta.title[0]}
            <span className="text-[var(--os-coral)]">{meta.title[1]}</span>
          </h1>
          <p className="max-w-[820px] text-[16px] leading-[1.6] text-[var(--os-body)] md:text-[18px]">
            {meta.intro}
          </p>
        </div>

        {/* Meta card */}
        <div className="overflow-hidden rounded-[24px] border border-[var(--os-border)] bg-[var(--os-card)]">
          <div className="flex items-center justify-between gap-4 px-8 py-6">
            <div>
              <p className="font-[family-name:var(--os-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--os-muted)]">
                Designed by
              </p>
              <p className="mt-1 text-[17px] font-bold text-[var(--os-ink)]">
                {meta.designedBy}
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-[var(--os-coral-tint)] px-3.5 py-1.5 font-[family-name:var(--os-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--os-coral-deep)]">
              <span className="size-[6px] rounded-full bg-[var(--os-coral)]" />
              {meta.badge}
            </span>
          </div>
          <dl className="grid grid-cols-2 border-t border-[var(--os-border)] md:grid-cols-4">
            {meta.facts.map((f, i) => (
              <div
                key={f.label}
                className={`px-8 py-5 ${
                  i !== 0 ? "border-t border-[var(--os-border)] md:border-l md:border-t-0" : ""
                } ${i === 1 ? "border-t md:border-t-0" : ""}`}
              >
                <dt className="font-[family-name:var(--os-mono)] text-[10.5px] uppercase tracking-[0.12em] text-[var(--os-muted)]">
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-[14px] font-bold text-[var(--os-ink)]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-[var(--os-border)] px-8 py-4 text-right font-[family-name:var(--os-mono)] text-[12px] text-[var(--os-muted)]">
            {meta.scrollNote}
          </div>
        </div>

        {/* Phone trio — paper-fan open on load */}
        <div className="mt-4">
          <HeroPhones />
        </div>
        <div className="mt-2 flex justify-between font-[family-name:var(--os-mono)] text-[12px] text-[var(--os-muted)]">
          <span>{meta.phoneCaptions[0]}</span>
          <span>{meta.phoneCaptions[1]}</span>
        </div>
      </div>
    </header>
  );
}
