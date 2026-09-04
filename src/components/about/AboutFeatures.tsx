import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { features } from "@/data/about";
import {
  PeopleIcon,
  PenNibIcon,
  PlaneIcon,
  RocketIcon,
  TrophyIcon,
} from "@/components/about/FeatureIcons";

const icons = [PlaneIcon, PeopleIcon, TrophyIcon, RocketIcon, PenNibIcon];

/** Renders a body string with its `emphasis` phrase in full-black bold. */
function EmphasisText({ body, emphasis }: { body: string; emphasis: string }) {
  const idx = body.indexOf(emphasis);
  if (idx === -1) return <>{body}</>;
  return (
    <>
      {body.slice(0, idx)}
      <span className="font-semibold text-ink">{emphasis}</span>
      {body.slice(idx + emphasis.length)}
    </>
  );
}

export function AboutFeatures() {
  return (
    <section className="relative overflow-hidden bg-bg-muted px-6 py-24">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[320px] opacity-[0.12] [mask-image:linear-gradient(0deg,black_0%,transparent_100%)]"
        aria-hidden
      >
        <Image
          src="/images/hero-sky.png"
          alt=""
          fill
          className="object-cover object-bottom grayscale"
        />
      </div>

      <div className="relative">
        <div className="mb-5 flex justify-center">
          <SectionLabel>Features</SectionLabel>
        </div>
        <h2 className="mb-4 text-center text-3xl md:text-4xl">
          What sets me apart?
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center font-sans text-base text-ink-muted">
          Every detail counts. Discover how I tailor solutions to elevate and
          innovate, ensuring flawless execution and stunning results.
        </p>

        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-border-soft overflow-hidden rounded-[20px] border border-border-soft bg-white shadow-soft sm:grid-cols-6 sm:divide-y-0">
          {features.map((feature, i) => {
            const Icon = icons[i];
            const borderClasses = [
              "sm:border-b sm:border-r",
              "sm:border-b sm:border-r",
              "sm:border-b",
              "sm:border-r",
              "",
            ][i];
            const spanClasses = i < 3 ? "sm:col-span-2" : "sm:col-span-3";
            return (
              <div
                key={feature.title}
                className={`flex flex-col gap-3 border-border-soft p-8 ${borderClasses} ${spanClasses}`}
              >
                <span className="text-ink/70">
                  <Icon />
                </span>
                <h3 className="text-xl">{feature.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-ink/55">
                  <EmphasisText body={feature.body} emphasis={feature.emphasis} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
