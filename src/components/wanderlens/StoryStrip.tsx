import Image from "next/image";
import { story } from "@/data/wanderlens";
import { WlEyebrow } from "./Mark";

export function StoryStrip() {
  return (
    <section className="bg-[var(--wl-forest)] px-6 py-24 text-white">
      <div className="mx-auto max-w-[1180px] px-2 sm:px-8">
        <WlEyebrow onDark>{story.eyebrow}</WlEyebrow>
        <h2 className="mt-4 max-w-[900px] text-[32px] font-bold leading-[1.15] !text-white sm:text-[42px]">
          {story.heading}
        </h2>
        <p className="mt-3 max-w-[900px] text-[16.5px] leading-[1.6] text-[#c9d6ba]">
          {story.sub}
        </p>

        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {story.cards.map((c) => (
            <Image
              key={c.image}
              src={c.image}
              alt={c.alt}
              width={720}
              height={720}
              className="w-full rounded-[14px]"
            />
          ))}
        </div>

        <p className="mt-9 border-t border-white/15 pt-6 text-[24px] font-bold leading-[1.5] sm:text-[29px]">
          {story.kickerLead}
          <span className="text-[var(--wl-moss-bright)]">{story.kickerAccent}</span>
        </p>
      </div>
    </section>
  );
}
