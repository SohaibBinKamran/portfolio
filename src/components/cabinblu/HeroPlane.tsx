"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroPlane() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute right-[-4%] top-[49%] hidden w-[29%] max-w-[320px] sm:block">
      <motion.div
        initial={reduce ? undefined : { x: -60, opacity: 0 }}
        animate={
          reduce
            ? undefined
            : {
                // fly right and off-screen, teleport to the far left, glide back to rest
                x: [0, 1600, -1600, 0],
                y: [0, -14, 0, -8, 0],
                opacity: [1, 1, 1, 1, 1],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                x: {
                  duration: 13,
                  times: [0, 0.42, 0.4201, 1],
                  ease: ["easeIn", "linear", "easeOut"],
                  repeat: Infinity,
                  repeatDelay: 2.5,
                },
                y: {
                  duration: 13,
                  times: [0, 0.2, 0.5, 0.75, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2.5,
                },
                opacity: { duration: 0.8, ease: "easeOut" },
              }
        }
      >
        <Image
          src="/images/cabinblu-hero-plane.svg"
          alt=""
          width={284}
          height={104}
          aria-hidden
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
