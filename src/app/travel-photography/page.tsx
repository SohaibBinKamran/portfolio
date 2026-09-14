import { SectionLabel } from "@/components/ui/SectionLabel";
import { MasonryWall } from "@/components/photography/MasonryWall";
import { AerialMode } from "@/components/travel/AerialMode";

export const metadata = {
  title: "Travel & Photography — Sohaib Bin Kamran",
  description: "Personal photography, shot off the clock — no client, no brief.",
};

export default function PhotographyPage() {
  return (
    <>
      <section className="px-6 pb-10 pt-32 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Travel &amp; Photography</SectionLabel>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.1] md:text-[52px]">
            Everything I stopped to look at.{" "}
            <span className="text-ink/55">Still adding to it.</span>
          </h1>
          <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-ink-muted">
            No captions explaining what you&rsquo;re looking at — just where it
            was and when. Click any frame to see it full size.
          </p>
          <AerialMode />
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <MasonryWall />
        </div>
      </section>
    </>
  );
}
