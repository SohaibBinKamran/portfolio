import { journeys } from "@/data/openseat";
import { SectionHead, Section, Phone } from "./Bits";

function Flow({ label, steps }: { label: string; steps: string[] }) {
  return (
    <div className="flex flex-col">
      <p className="font-[family-name:var(--os-mono)] text-[12px] uppercase tracking-[0.14em] text-[var(--os-muted)]">
        {label}
      </p>
      <ol className="mt-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-baseline gap-4 border-b border-[var(--os-border)] py-4 text-[15px] text-[var(--os-ink)]"
          >
            <span className="font-[family-name:var(--os-mono)] text-[13px] font-bold text-[var(--os-coral)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Journeys() {
  return (
    <Section id="journeys">
      <SectionHead
        eyebrow={`${journeys.n} · ${journeys.eyebrow}`}
        title={journeys.title}
        intro={journeys.intro}
      />

      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        <Flow label={journeys.host.label} steps={journeys.host.steps} />
        <Flow label={journeys.guest.label} steps={journeys.guest.steps} />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {journeys.phones.map((p) => (
          <Phone key={p.src + p.alt} src={p.src} alt={p.alt} className="mx-auto max-w-[300px]" />
        ))}
      </div>
    </Section>
  );
}
