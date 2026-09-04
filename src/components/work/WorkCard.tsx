"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/work";

const PANEL_SHADOW =
  "0px 0.754px 1.658px -0.583px rgba(0,0,0,0.04),0px 1.927px 4.239px -1.167px rgba(0,0,0,0.04),0px 3.863px 8.499px -1.75px rgba(0,0,0,0.04),0px 7.323px 16.111px -2.333px rgba(0,0,0,0.04),0px 14.557px 32.024px -2.917px rgba(0,0,0,0.03),0px 32px 70.4px -3.5px rgba(0,0,0,0.02)";
const PANEL_SHADOW_HOVER = "0px 44px 80px -16px rgba(28,18,6,0.28)";

/** Soft, lightly-overshooting spring for the cover lift. */
const coverSpring = { type: "spring", stiffness: 190, damping: 13, mass: 1 } as const;

const PANEL_CLASS =
  "flex items-center justify-center rounded-[14px] bg-[#f0eeeb] px-[28px] py-[43px]";
const COVER_CLASS =
  "relative aspect-[545.38/326.52] w-full overflow-hidden rounded-[10px]";

/**
 * Work index card. Hover: the collage springs gently up out of its warm frame
 * with a soft bounce, and the serif title grows an arrow. The pointer itself is
 * the site-wide hand-drawn `SiteCursor` (mounted in `layout.tsx`); the
 * `data-hover-note` here is what it reads to show this project's handwritten
 * caption.
 *
 * A project flagged `underConstruction` renders as a non-interactive, dimmed
 * card with an "Under Construction" tag instead of a link.
 */
export function WorkCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  if (project.underConstruction) {
    return (
      <div className="relative block cursor-default select-none">
        <div className="flex flex-col gap-3">
          <div className={PANEL_CLASS}>
            <div className={COVER_CLASS} style={{ boxShadow: PANEL_SHADOW }}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 768px) 545px, 90vw"
                className="object-cover opacity-60 grayscale"
              />
              <div className="absolute inset-0 bg-[#f0eeeb]/45" />
              <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-white/95 px-4 py-2 font-sans text-[13px] font-medium text-ink shadow-soft backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623]" />
                Under Construction
              </span>
            </div>
          </div>
          <h2 className="font-serif text-[28px] leading-[1.4] text-ink/45">
            {project.title}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      data-hover-note={project.hoverNote}
      className="group relative block"
    >
      <motion.div
        className="flex flex-col gap-3"
        initial="rest"
        animate="rest"
        whileHover={reduce ? undefined : "hover"}
      >
        <div className={`${PANEL_CLASS} transition-colors duration-500 ease-out group-hover:bg-[#ece6de]`}>
          <motion.div
            className={`${COVER_CLASS} will-change-transform`}
            style={{ boxShadow: PANEL_SHADOW }}
            variants={{
              rest: { y: 0, scale: 1, boxShadow: PANEL_SHADOW },
              hover: { y: -10, scale: 1.045, boxShadow: PANEL_SHADOW_HOVER },
            }}
            transition={{
              default: coverSpring,
              boxShadow: { type: "tween", duration: 0.5, ease: "easeOut" },
            }}
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 768px) 545px, 90vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <h2 className="flex items-center gap-1.5 font-serif text-[28px] leading-[1.4] text-ink">
          {project.title}
          <span
            aria-hidden
            className="-translate-x-2 text-[20px] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
          >
            ↗
          </span>
        </h2>
      </motion.div>
    </Link>
  );
}
