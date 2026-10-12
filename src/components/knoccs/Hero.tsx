import Image from "next/image";
import { hero, meta } from "@/data/knoccs";

const META_ITEMS = [
  { label: "ROLE", value: meta.role },
  { label: "COMPANY", value: meta.company },
  { label: "SCOPE", value: meta.scope },
  { label: "VERSIONS", value: meta.timeline },
];

export function Hero() {
  return (
    <section className="px-6 pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{hero.eyebrow}</span>
        <h1 className="mt-5 text-[40px] leading-[1.08] sm:text-[72px] xl:whitespace-nowrap">
          {hero.heading}
        </h1>
        <p className="mt-6 max-w-[900px] text-[17px] leading-[1.7] text-[color:var(--kn-body)] sm:text-[19px]">
          {hero.subheading}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[color:var(--kn-border)] pt-8 sm:grid-cols-4">
          {META_ITEMS.map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] font-semibold tracking-[0.08em] text-[color:var(--kn-muted)]">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-[15px] font-semibold text-[color:var(--kn-ink)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="kn-stage relative mt-14 overflow-hidden p-3 sm:p-5">
          <Image
            src="/images/knoccs/product-hero.jpg"
            alt="The KNOCCS support inbox, showing a conversation list with status tags and a purple sidebar built from the design system"
            width={2048}
            height={1456}
            priority
            className="w-full rounded-[12px]"
          />
        </div>
      </div>
    </section>
  );
}
