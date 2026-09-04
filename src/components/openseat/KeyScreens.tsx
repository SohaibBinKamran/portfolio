import { keyScreens } from "@/data/openseat";
import { SectionHead, Section, Phone } from "./Bits";

export function KeyScreens() {
  return (
    <Section id="screens">
      <SectionHead
        eyebrow={`${keyScreens.n} · ${keyScreens.eyebrow}`}
        title={keyScreens.title}
        intro={keyScreens.intro}
      />
      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {keyScreens.screens.map((s, i) => (
          <div key={s.title + i} className="flex flex-col gap-4">
            <Phone src={s.src} alt={s.alt} className="mx-auto max-w-[280px]" />
            <div>
              <h3 className="text-[16.5px] font-bold text-[var(--os-ink)]">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.55] text-[var(--os-body)]">
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
