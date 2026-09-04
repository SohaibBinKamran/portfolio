import { beacon } from "@/data/openseat";
import { Eyebrow, Section, Phone } from "./Bits";

export function Beacon() {
  return (
    <Section id="beacon">
      <div className="mx-auto grid max-w-[1040px] items-center gap-14 md:grid-cols-[minmax(0,521px)_1fr]">
        <div className="flex flex-col items-start gap-[18px]">
          <Eyebrow>
            {beacon.n} · {beacon.eyebrow}
          </Eyebrow>
          <h2 className="text-[34px] leading-[1.08] tracking-[-0.02em] md:text-[48px] md:tracking-[-0.48px]">
            {beacon.title}
          </h2>
          {beacon.paras.map((p) => (
            <p key={p} className="text-[16px] leading-[1.6] text-[var(--os-body)]">
              {p}
            </p>
          ))}
          <div className="mt-2 flex flex-wrap gap-3">
            {beacon.chips.map((c) => (
              <span
                key={c}
                className="rounded-[14px] border border-[rgba(255,255,255,0.25)] bg-[var(--os-coral-soft)] px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-white"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Phone
            src="/images/openseat/os-beacon.png"
            alt="Beacon Mode screen — hold up your phone, look for this color"
            className="max-w-[300px]"
          />
        </div>
      </div>
    </Section>
  );
}
