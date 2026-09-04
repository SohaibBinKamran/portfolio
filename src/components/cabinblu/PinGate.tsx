"use client";

import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pinGate } from "@/data/cabinblu";
import { Findings } from "./Findings";
import { FlightRecorder } from "./FlightRecorder";
import { Journey } from "./Journey";
import { BaggageClaim } from "./BaggageClaim";
import { Arrivals } from "./Arrivals";
import { Postcards } from "./Postcards";
import { CaseStudyFooter } from "./CaseStudyFooter";
import { ClosingCta } from "./ClosingCta";

const PIN = "142635";
const LENGTH = 6;
const STORAGE_KEY = "cabinblu-gate-cleared";
const MONO = "font-[family-name:var(--cb-font-mono)]";
const NAVY = "#0c2e6a";
const LINK = "#4888f3";

function LockedSections() {
  return (
    <>
      <Findings />
      <FlightRecorder />
      <Journey />
      <BaggageClaim />
      <Arrivals />
      <Postcards />
      <CaseStudyFooter />
      <ClosingCta />
    </>
  );
}

export function PinGate() {
  const reduce = useReducedMotion();
  const [cleared, setCleared] = useState(false);
  const [digits, setDigits] = useState<string[]>(() => Array(LENGTH).fill(""));
  const [active, setActive] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setCleared(true);
    } catch {
      /* private mode — stay locked */
    }
  }, []);

  // Validate whenever all six slots are filled. Depends only on `digits` so the
  // pending timeout is never cancelled by an unrelated re-render.
  useEffect(() => {
    const entered = digits.join("");
    if (entered.length !== LENGTH) return;

    if (entered === PIN) {
      setStatus("success");
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      const t = window.setTimeout(() => setCleared(true), 650);
      return () => window.clearTimeout(t);
    }

    setStatus("error");
    const t = window.setTimeout(() => {
      setDigits(Array(LENGTH).fill(""));
      setStatus("idle");
      inputs.current[0]?.focus();
    }, 900);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  const setDigit = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (status === "error") setStatus("idle");
    if (char && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        if (next[index]) {
          next[index] = "";
        } else if (index > 0) {
          next[index - 1] = "";
          inputs.current[index - 1]?.focus();
        }
        return next;
      });
      if (status === "error") setStatus("idle");
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const chars = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH).split("");
    if (!chars.length) return;
    setDigits(
      Array(LENGTH)
        .fill("")
        .map((_, i) => chars[i] ?? ""),
    );
    inputs.current[Math.min(chars.length, LENGTH - 1)]?.focus();
  };

  if (cleared) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <LockedSections />
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <div
        className="pointer-events-none select-none blur-[8px] brightness-[0.98]"
        aria-hidden
        inert={true}
      >
        <LockedSections />
      </div>

      <AnimatePresence>
        {!cleared && (
          <motion.div
            key="gate"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-40"
            role="dialog"
            aria-modal="true"
            aria-label="Enter your boarding PIN to view the full case study"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#cdd9ec]/90 via-[#dbe4f2]/85 to-[#c6d3e8]/80" />

            <div className="sticky top-0 flex min-h-screen items-center justify-center px-4 py-14">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[640px]"
              >
                <motion.div
                  animate={status === "error" && !reduce ? { x: [0, -10, 9, -6, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.42 }}
                  className="relative rounded-[25px] bg-white pb-7 pt-6 shadow-[0_30px_80px_-28px_rgba(12,46,106,0.38)]"
                >
                  {/* header */}
                  <div className="flex items-center justify-between gap-3 px-6 sm:px-[42px]">
                    <span
                      className={`${MONO} text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[12px]`}
                      style={{ color: NAVY }}
                    >
                      {pinGate.kicker}
                    </span>
                    <span
                      className={`${MONO} shrink-0 rounded-full px-[16px] py-[9px] text-[9.5px] font-bold uppercase tracking-[0.12em] text-white sm:text-[10.5px]`}
                      style={{ backgroundColor: NAVY }}
                    >
                      {pinGate.classTag}
                    </span>
                  </div>

                  {/* dashed divider */}
                  <div className="my-[24px] px-5 sm:px-[19px]">
                    <svg className="block h-[2px] w-full" preserveAspectRatio="none" viewBox="0 0 640 2">
                      <line
                        x1="0"
                        y1="1"
                        x2="640"
                        y2="1"
                        stroke="#121212"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeDasharray="12 12"
                      />
                    </svg>
                  </div>

                  <div className="px-6 sm:px-[42px]">
                    {/* gate line */}
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#e8ebf3]"
                        style={{ color: NAVY }}
                      >
                        <LockGlyph unlocked={status === "success"} />
                      </span>
                      <span
                        className={`${MONO} text-[11px] font-bold uppercase tracking-[0.13em] sm:text-[13px]`}
                        style={{ color: LINK }}
                      >
                        {pinGate.gateLabel}
                      </span>
                    </div>

                    <h2
                      className="mt-[20px] text-[30px] font-bold leading-[1.08] sm:text-[38px]"
                      style={{ color: NAVY }}
                    >
                      {pinGate.heading}
                    </h2>
                    <p
                      className="mt-[10px] text-[15px] font-medium sm:text-[18px]"
                      style={{ color: LINK }}
                    >
                      {pinGate.subheading}
                    </p>

                    {/* PIN slots */}
                    <div
                      className="mt-[24px] flex items-center justify-between gap-[3.5%] sm:gap-[4.6%]"
                      role="group"
                      aria-label="Enter your 6-digit boarding PIN"
                    >
                      {digits.map((digit, i) => {
                        const isActive = active === i;
                        const isError = status === "error";
                        const isSuccess = status === "success";
                        const border = isError
                          ? "#e2667d"
                          : isSuccess
                            ? "#6fa8a3"
                            : isActive
                              ? "#6481dc"
                              : "#cbd4e6";
                        return (
                          <input
                            key={i}
                            ref={(el) => {
                              inputs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete={i === 0 ? "one-time-code" : "off"}
                            aria-label={`Digit ${i + 1}`}
                            maxLength={1}
                            value={digit}
                            disabled={isSuccess}
                            onChange={(e) => setDigit(i, e.target.value)}
                            onKeyDown={(e) => onKeyDown(i, e)}
                            onPaste={onPaste}
                            onFocus={(e) => {
                              setActive(i);
                              e.target.select();
                            }}
                            onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                            className="aspect-square w-full flex-1 rounded-[9px] border-2 bg-[#f7f8f9] text-center text-[26px] font-bold outline-none transition-colors sm:text-[30px]"
                            style={{
                              borderColor: border,
                              color: isError ? "#c9502f" : NAVY,
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* request / status */}
                    <div className="mt-[26px] min-h-[22px] text-center text-[13px] sm:text-[14px]">
                      <AnimatePresence initial={false} mode="popLayout">
                        {status === "error" ? (
                          <motion.p
                            key="err"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-semibold text-[#c9502f]"
                          >
                            {pinGate.errorMessage}
                          </motion.p>
                        ) : status === "success" ? (
                          <motion.p
                            key="ok"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-semibold text-[#2f7a68]"
                          >
                            {pinGate.success}
                          </motion.p>
                        ) : (
                          <motion.a
                            key="req"
                            href={pinGate.requestHref}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-semibold hover:underline"
                            style={{ color: LINK }}
                          >
                            {pinGate.requestLabel}
                          </motion.a>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* barcode — stretches to the full PIN-row width */}
                  <div className="mt-[34px] px-6 sm:px-[42px]">
                    <svg
                      className="block h-[48px] w-full"
                      viewBox="0 0 590 48"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      {BARS.map(([x, w], i) => (
                        <rect key={i} x={x} y={0} width={w} height={48} fill="#4b4f66" />
                      ))}
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// [x, width] pairs lifted from the Figma barcode (Pin Wall.svg), origin shifted to 0
// (SVG rects start at x=44). Rendered in a 0..590 viewBox that stretches to fit.
const BARS: Array<[number, number]> = [
  [0, 2], [7.3, 3], [15.6, 5], [25.9, 7], [38.2, 15], [58.5, 2], [65.8, 10], [81.1, 5],
  [91.4, 2], [98.7, 1], [105, 7], [117.3, 6], [128.6, 2], [135.9, 5], [146.2, 3], [154.5, 15],
  [174.8, 5], [185.1, 21], [211.4, 1], [217.7, 2], [225, 7], [237.3, 5], [247.6, 3], [255.9, 10],
  [271.2, 2], [278.5, 3], [286.8, 5], [297.1, 7], [309.4, 15], [329.7, 2], [337, 10], [352.3, 5],
  [362.6, 2], [369.9, 1], [376.2, 7], [388.5, 6], [399.8, 2], [407.1, 5], [417.4, 3], [425.7, 15],
  [446, 5], [456.3, 21], [482.6, 1], [488.9, 2], [496.2, 7], [508.5, 5], [518.8, 3], [527.1, 10],
  [542.4, 15], [562.7, 2], [570, 10], [585.3, 5],
];

function LockGlyph({ unlocked }: { unlocked: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10.5" width="16" height="11" rx="2.5" fill="currentColor" />
      <path
        d={unlocked ? "M8 10.5V7a4 4 0 0 1 7.5-1.9" : "M8 10.5V7a4 4 0 0 1 8 0v3.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
