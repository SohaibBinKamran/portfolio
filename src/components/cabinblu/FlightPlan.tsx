"use client";

import { motion } from "framer-motion";
import { flightPlan } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";
import { FigmaCrop } from "./FigmaCrop";

// Exact per-icon crop transforms from Figma get_design_context (one shared
// sprite, five pre-defined crop windows) — not approximated.
const crops = [
  { w: 320.92, h: 373.41, top: -74.21, left: -6.33, aspect: "521/252" },
  { w: 320.92, h: 382.3, top: -83.5, left: -110.28, aspect: "356/168" },
  { w: 330.16, h: 384.08, top: -84.09, left: -219.34, aspect: "356/172" },
  { w: 272.47, h: 534.7, top: -344.26, left: -33.77, aspect: "356/102" },
  { w: 288.77, h: 503.21, top: -324.96, left: -156.54, aspect: "356/115" },
];

export function FlightPlan() {
  const [row1, row2] = [flightPlan.questions.slice(0, 3), flightPlan.questions.slice(3)];

  return (
    <section className="flex flex-col items-center gap-11 bg-white px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{flightPlan.eyebrow}</Eyebrow>
        <h2 className="max-w-[740px] text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">
          {flightPlan.heading}
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-10">
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {row1.map((item, i) => (
            <QuestionCard key={item.q} item={item} crop={crops[i]} index={i} />
          ))}
        </div>
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:justify-center lg:w-2/3">
          {row2.map((item, i) => (
            <QuestionCard key={item.q} item={item} crop={crops[i + 3]} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestionCard({
  item,
  crop,
  index,
}: {
  item: (typeof flightPlan.questions)[number];
  crop: { w: number; h: number; top: number; left: number; aspect: string };
  index: number;
}) {
  const { aspect, ...cropWindow } = crop;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex flex-col items-center gap-6 text-center"
    >
      <div className="flex w-full items-center justify-center">
        <FigmaCrop
          src="/images/cabinblu-questions-sprite.png"
          alt=""
          {...cropWindow}
          className="w-full"
          style={{ aspectRatio: aspect.replace("/", " / ") }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15.5px] font-bold tracking-tight text-[var(--cb-navy)]">{item.q}</p>
        <p className="text-[13.5px] text-[var(--cb-body)]">{item.sub}</p>
      </div>
    </motion.div>
  );
}
