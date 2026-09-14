import { problem } from "@/data/xoopah";
import { Eyebrow, Section, SplitHeading } from "./Bits";

const dotColor: Record<string, string> = {
  mint: "bg-[var(--xo-mint)]",
  purple: "bg-[var(--xo-purple)]",
  pink: "bg-[var(--xo-pink)]",
};

const tilt = ["-rotate-3", "rotate-2", "-rotate-1.5", "rotate-3", "-rotate-2.5"];

export function Problem() {
  return (
    <Section>
      <div className="flex flex-col items-start gap-3 max-w-[720px]">
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <SplitHeading parts={problem.heading} />
      </div>
      <div className="flex flex-wrap gap-5">
        {problem.notes.map((note, i) => (
          <div
            key={note.text}
            className={`relative w-[190px] rounded-bl-[4px] rounded-br-[16px] rounded-tl-[4px] rounded-tr-[4px] bg-[var(--xo-tint)] px-4 pb-[18px] pt-8 shadow-[0_10px_22px_-12px_rgba(36,19,56,0.28)] ${tilt[i % tilt.length]}`}
          >
            <span
              aria-hidden
              className={`absolute -top-[7px] left-1/2 size-3.5 -translate-x-1/2 rounded-[3px] shadow-[0_3px_6px_0_rgba(0,0,0,0.25)] ${dotColor[note.dot]}`}
            />
            <p className="text-[14.5px] font-bold leading-[1.4] text-[var(--xo-ink)]">
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
