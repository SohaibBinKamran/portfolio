import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { niches, toolTags } from "@/data/home";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex shrink-0 items-center rounded-2xl border border-border-soft bg-white px-4 py-2 font-sans text-sm text-ink-muted">
      {children}
    </span>
  );
}

export function Niches() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24">
      <div className="flex">
        <SectionLabel>Niches</SectionLabel>
      </div>
      <h2 className="max-w-3xl text-3xl md:text-4xl">
        <span className="text-ink/55">Cross-industry experience, one playbook: </span>
        <span className="text-ink">Usable, measurable, shipped.</span>
      </h2>
      <p className="max-w-2xl font-sans text-base text-ink-muted">
        From airline flows to mortgage SaaS, I translate domain quirks into
        clear, shippable UX—B2B, B2C, and SaaS.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Marquee durationSeconds={68} gapClass="gap-3">
          {niches.map((n) => (
            <Tag key={n}>{n}</Tag>
          ))}
        </Marquee>
        <Marquee durationSeconds={104} gapClass="gap-3">
          {toolTags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
