import { hero, meta } from "@/data/arrivals";
import { HeroBoard } from "./HeroBoard";

const META_ITEMS = [
  { label: "ROLE", value: meta.role },
  { label: "CONTEXT", value: meta.context },
  { label: "SCOPE", value: meta.scope },
  { label: "VERSIONS", value: meta.timeline },
];

export function Hero() {
  return (
    <section className="px-6 pb-20 pt-[150px] sm:pt-[180px]">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{hero.eyebrow}</span>
        <h1 className="mt-5 max-w-[860px] text-[42px] leading-[1.06] sm:text-[68px]">
          {hero.heading}
        </h1>
        <p className="mt-6 max-w-[700px] text-[17px] leading-[1.7] sm:text-[19px]">
          {hero.subheading}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[color:var(--ar-rule)] pt-8 sm:grid-cols-4">
          {META_ITEMS.map((item) => (
            <div key={item.label}>
              <dt className="ar-mono text-[11px] tracking-[0.12em] text-[color:var(--ar-dim)]">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-[15px] font-medium text-[color:var(--ar-ink)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <HeroBoard />
      </div>
    </section>
  );
}
