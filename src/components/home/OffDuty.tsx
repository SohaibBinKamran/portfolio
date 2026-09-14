"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photography } from "@/data/photography";

// Three specific frames, one apiece from a different country, so the stack
// reads as "a spread from the archive" rather than one roll's first three
// shots — `photography` is ordered alphabetically by city, so a plain
// `.slice(0, 3)` would have just been three Baku photos in a row.
const STACK_IDS = ["berlin-08", "madrid-05", "baku-02"];
const rest = { rotate: [-7, 4, -2], x: [0, 62, 132], y: [18, 0, 34] };
// On hover the same three prints spread further apart, like a hand of
// photos being fanned open, instead of just sitting there stacked.
const open = { rotate: [-20, 4, 20], x: [-34, 62, 158], y: [30, -6, 30] };

const stack = STACK_IDS.map((id, i) => {
  const p = photography.find((photo) => photo.id === id) ?? photography[i];
  return {
    ...p,
    restStyle: { rotate: rest.rotate[i], x: rest.x[i], y: rest.y[i] },
    openStyle: { rotate: open.rotate[i], x: open.x[i], y: open.y[i] },
  };
});

export function OffDuty() {
  return (
    <section className="overflow-hidden bg-bg-base px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2"
      >
        <div className="flex flex-col items-start gap-5">
          <SectionLabel>Beyond the pixels</SectionLabel>
          <h2 className="text-4xl leading-[1.12] md:text-[42px]">
            Same eye, <span className="text-ink/55">no design system.</span>
          </h2>
          <p className="max-w-md font-sans text-[15px] leading-relaxed text-ink-muted">
            I take photographs for the same reason I design — I like noticing
            how things are arranged.{" "}
            <span className="font-semibold text-ink">
              No client, no brief, no research plan.
            </span>{" "}
            It&rsquo;s where composition, light and patience stay a habit
            instead of a deliverable.
          </p>
          <PillButton href="/travel-photography" className="mt-2">
            See the full roll
          </PillButton>
        </div>

        <motion.div
          initial="rest"
          whileHover="open"
          className="relative mx-auto h-[300px] w-full max-w-xs cursor-default md:max-w-sm"
        >
          {stack.map((photo, i) => (
            <motion.div
              key={photo.id}
              variants={{
                rest: { ...photo.restStyle },
                open: { ...photo.openStyle },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute rounded-[4px] bg-white p-2.5 pb-9 shadow-[0_2px_3px_rgba(0,0,0,0.06),0_22px_40px_-16px_rgba(0,0,0,0.32)]"
              style={{ zIndex: i + 1 }}
            >
              <div className="relative h-[196px] w-[196px] overflow-hidden">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.location}
                    fill
                    sizes="196px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: photo.swatch ?? "linear-gradient(160deg,#37485b,#8ea6b8)" }}
                  />
                )}
              </div>
            </motion.div>
          ))}
          <span className="font-hand absolute -bottom-3.5 right-0 text-sm text-ink-muted [transform:rotate(-4deg)]">
            {stack[0].location}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
