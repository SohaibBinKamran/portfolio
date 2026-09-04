import Image from "next/image";
import { Timeline } from "@/components/about/Timeline";
import { bio, education, experiences } from "@/data/about";

export function AboutBio() {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-[1fr_minmax(0,440px)] md:items-start md:gap-20">
      <div className="max-w-2xl">
        <h2 className="mb-10 font-serif text-[34px] leading-tight tracking-tight md:text-[40px]">
          <span className="text-ink">{bio.headingStrong} </span>
          <span className="text-ink/45">{bio.headingMuted}</span>
        </h2>

        <h3 className="mb-4 font-serif text-[28px]">{bio.whoHeading}</h3>
        <p className="mb-14 max-w-xl font-sans text-base leading-relaxed text-ink/55">
          {bio.bioText}
        </p>

        <div className="mb-12">
          <Timeline heading="Experiences" entries={experiences} />
        </div>
        <Timeline heading="Education" entries={education} />
      </div>

      <div className="md:sticky md:top-28">
        <div className="relative aspect-[500/629] w-full overflow-hidden rounded-[20px] border border-ink/10 shadow-soft">
          <Image
            src="/images/portrait-suit.png"
            alt="Sohaib Bin Kamran"
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
