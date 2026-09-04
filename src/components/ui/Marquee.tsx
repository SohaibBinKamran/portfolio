"use client";

import { Children, type ReactNode } from "react";

/**
 * Seamless infinite marquee. Renders the children set four times in one track
 * and translates it by -50% on a linear loop, so the sequence repeats with no
 * visible seam and the first item follows the last forever.
 */
export function Marquee({
  children,
  durationSeconds = 32,
  gapClass = "gap-10",
}: {
  children: ReactNode;
  durationSeconds?: number;
  gapClass?: string;
}) {
  const items = Children.toArray(children);

  const group = (key: string) => (
    <div
      key={key}
      className={`flex shrink-0 items-center ${gapClass}`}
      aria-hidden={key !== "a"}
    >
      {items.map((child, i) => (
        <div key={i} className="flex shrink-0 items-center">
          {child}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max ${gapClass}`}
        style={{ animation: `marquee-scroll ${durationSeconds}s linear infinite` }}
      >
        {group("a")}
        {group("b")}
        {group("c")}
        {group("d")}
      </div>
    </div>
  );
}
