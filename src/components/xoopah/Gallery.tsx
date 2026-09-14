import Image from "next/image";
import { gallery } from "@/data/xoopah";
import { Eyebrow, Section, SplitHeading } from "./Bits";

const tilt = ["-rotate-1.5", "rotate-1", "-rotate-1.5", "rotate-1", "-rotate-1", "rotate-1.5"];

export function Gallery() {
  return (
    <Section tint>
      <div className="flex flex-col items-start gap-3 max-w-[640px]">
        <Eyebrow>{gallery.eyebrow}</Eyebrow>
        <SplitHeading parts={gallery.heading} />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.items.map((item, i) => (
          <div key={item.title} className={`flex flex-col gap-2.5 rounded-[4px] bg-white p-2.5 pb-4 shadow-[0_16px_30px_-16px_rgba(36,19,56,0.35)] ${tilt[i % tilt.length]}`}>
            <div className="relative aspect-[227/149] w-full overflow-hidden rounded-[2px]">
              <Image
                src={item.image}
                alt={`${item.title} — ${item.note}`}
                fill
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                className="object-cover object-top"
              />
            </div>
            <p className="text-center text-[11.5px]">
              <span className="font-bold text-[var(--xo-purple-deep)]">{item.title}</span>
              <span className="text-[var(--xo-body)]"> · {item.note}</span>
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
