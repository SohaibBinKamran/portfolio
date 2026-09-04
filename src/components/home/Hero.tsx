"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { hero } from "@/data/home";

/** Always shows the current time in Siegen, Germany (Europe/Berlin). */
function useSiegenTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "Europe/Berlin",
        })
      );
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return time;
}

/**
 * Cursor pointer — traced 1:1 from `Redesign July/button and cursor.svg`
 * (near-white fill, thin near-black outline). `dir` "ne" aims up-right,
 * "nw" is the same shape mirrored to aim up-left.
 */
function CursorArrow({ dir }: { dir: "ne" | "nw" }) {
  return (
    <svg
      width="26"
      height="28"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{
        transform: dir === "nw" ? "scaleX(-1)" : undefined,
        filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.28))",
      }}
    >
      <path
        d="M14.77 21.086 18.949 3.436 3.841 12.588 11.234 14.549Z"
        fill="#fafafa"
      />
      <path
        d="M18.619 2.874 19.93 2.08 19.573 3.589 15.394 21.239 15.006 22.88 14.206 21.401 10.803 15.111 3.678 13.22 2.191 12.826 3.511 12.026Z"
        fill="none"
        stroke="#080808"
        strokeWidth="1.92"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

/** A pointer + chat bubble that slowly roams inside the hero frame. */
function RoamingCursor({
  className,
  bubbleClass,
  label,
  drift,
  dir,
}: {
  className: string;
  bubbleClass: string;
  label: string;
  drift: { x: number[]; y: number[]; duration: number };
  dir: "ne" | "nw";
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-20 hidden lg:flex lg:flex-col ${
        dir === "ne" ? "lg:items-end" : "lg:items-start"
      } ${className}`}
      aria-hidden
      animate={{ x: drift.x, y: drift.y }}
      transition={{
        duration: drift.duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <CursorArrow dir={dir} />
      <span
        className={`-mt-1 rounded-xl border px-3 py-2 font-sans text-sm font-medium shadow-soft ${
          dir === "ne" ? "mr-2" : "ml-2"
        } ${bubbleClass}`}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const time = useSiegenTime();

  return (
    <section className="relative -mt-16 flex min-h-[882px] flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-[800px] [mask-image:linear-gradient(180deg,black_0%,black_28%,transparent_88%)]"
        aria-hidden
      >
        <Image
          src="/images/hero-sky.png"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/50 to-white to-[70%]" />
      </div>

      <RoamingCursor
        className="left-[13%] top-[40%]"
        dir="ne"
        bubbleClass="border-[#4434ad] bg-accent-purple text-white"
        label={hero.role}
        drift={{ x: [0, 60, 20, 90, 0], y: [0, 40, 110, 60, 0], duration: 26 }}
      />
      <RoamingCursor
        className="right-[11%] top-[54%]"
        dir="nw"
        bubbleClass="border-[#212529] bg-accent-lime text-ink"
        label={hero.annotation}
        drift={{ x: [0, -70, -20, -100, 0], y: [0, -50, -100, -30, 0], duration: 30 }}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-7 px-6 pb-40 pt-28 text-center">
        <h1 className="max-w-4xl text-5xl leading-[1.1] tracking-tight md:text-[64px] md:leading-[1.08]">
          <span className="text-ink/45">{hero.headlineMuted} </span>
          <span className="text-ink">{hero.headlineStrong}</span>
        </h1>
        <p className="font-sans text-lg text-ink-muted">{hero.status}</p>
        <PillButton href="/work">{hero.cta}</PillButton>
      </div>

      <div className="flex w-full items-center justify-between bg-border-soft px-6 py-5 font-sans text-base text-ink md:px-14 md:text-lg">
        <span>{hero.location}</span>
        {time && <span>{time}</span>}
      </div>
    </section>
  );
}
