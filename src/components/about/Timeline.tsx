import type { TimelineEntry } from "@/data/about";

/**
 * Vertical timeline used by both Experiences and Education on the About page.
 * A dashed connector runs behind each entry; the node is a radar-style pinging
 * blue dot.
 */
export function Timeline({
  heading,
  entries,
}: {
  heading: string;
  entries: TimelineEntry[];
}) {
  return (
    <div>
      <h3 className="mb-6 font-serif text-[28px]">{heading}</h3>

      <ol className="relative ml-[6px] flex flex-col gap-11 border-l border-dashed border-ink/15 pl-9">
        {entries.map((entry) => (
          <li key={entry.title} className="relative">
            <span
              className="absolute -left-[43px] top-[6px] flex h-3.5 w-3.5 items-center justify-center"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue ring-4 ring-accent-blue/15" />
            </span>

            <p className="text-[18px] font-bold tracking-tight text-ink">
              {entry.title}
            </p>
            <p className="mt-2 font-sans text-base text-ink">{entry.subtitle}</p>
            <p className="mt-1 font-sans text-base text-ink/55">{entry.dates}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
