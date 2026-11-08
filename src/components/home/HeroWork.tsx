"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { selectedWork } from "@/data/home";

/** the copy rule: no en or em dashes, so "MSc. HCI – Master Thesis" reads "MSc. HCI · Master Thesis" */
const undash = (s: string) => s.replace(/\s[–—-]\s/g, " · ");

/** hover wash per project, a light tint of each case study's own colour */
const WASH: Record<string, string> = {
  cabinblu: "from-[#d6e3fb] via-[#e8effd] to-[#f6f9ff]",
  classquest: "from-[#dfe0ff] via-[#ecebff] to-[#f8f7ff]",
  cinefatic: "from-[#f5d6df] via-[#fae6ec] to-[#fff5f7]",
};

/** same spring as the testimonial cards under "They trust me" */
const spring = { type: "spring", stiffness: 240, damping: 14, mass: 0.9 } as const;

/**
 * Home: the three selected projects straight under the hero (they replaced the
 * stacked SelectedWork section in Nov 2026),
 * so the work is visible at first glance. Image first and frameless at rest.
 * On hover, like the testimonial cards, the card springs up and a soft wash in
 * the project's own colour fills in behind it, the image tilts forward and an
 * arrow slides in. Each card is tagged for the homepage intro
 * (`data-intro-piece="c0"` and so on).
 */
export function HeroWork() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-6 pb-24 pt-2 md:px-10">
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3 lg:gap-x-14">
        {selectedWork.map((project, i) => (
          <motion.div
            key={project.slug}
            data-intro-piece={`c${i}`}
            className="group relative"
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={{ rest: { y: 0, scale: 1 }, hover: { y: -12, scale: 1.02 } }}
            transition={spring}
          >
            {/* project coloured wash, grows in behind the card */}
            <div
              aria-hidden
              className={`pointer-events-none absolute -inset-3 scale-[0.96] rounded-[26px] bg-gradient-to-b opacity-0 shadow-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_30px_60px_-30px_rgba(20,21,26,0.35)] ${WASH[project.slug] ?? "from-[#f8cca0] via-[#fce1c4] to-[#fdf3d8]"}`}
            />
            <Link href={`/work/${project.slug}`} className="relative flex flex-col gap-5">
              <motion.div
                className="relative aspect-[1144/576] w-full overflow-hidden rounded-[18px] bg-bg-muted shadow-[0_1px_2px_rgba(20,21,26,0.06),0_18px_40px_-18px_rgba(20,21,26,0.28)] ring-1 ring-ink/[0.06]"
                variants={{ rest: { rotateX: 0 }, hover: { rotateX: 4 } }}
                style={{ transformPerspective: 900, transformOrigin: "50% 100%" }}
                transition={spring}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 400px, 90vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                )}
              </motion.div>
              <div className="flex flex-col gap-1.5 px-1 pb-1">
                <span className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-ink-muted transition-colors duration-500 group-hover:text-ink/70">
                  {undash(project.tags[0])}
                </span>
                <h3 className="flex items-center gap-2 font-serif text-[28px] leading-tight text-ink">
                  {project.title}
                  <span
                    aria-hidden
                    className="-translate-x-2 text-[22px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                </h3>
                <p className="max-w-[34ch] font-sans text-[15px] leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-ink/75">
                  {project.blurb}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <Link
          href="/work"
          className="rounded-full border border-ink/15 px-5 py-2.5 font-sans text-[15px] text-ink transition-colors hover:border-ink/40"
        >
          See all work
        </Link>
      </div>
    </section>
  );
}
