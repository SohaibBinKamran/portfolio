import { reflections, sources, tierMeta } from "@/data/arrivals";

export function Reflections() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{reflections.eyebrow}</span>
        <h2 className="mt-5 text-[32px] leading-[1.15] sm:text-[44px]">{reflections.heading}</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reflections.lessons.map((l) => (
            <div key={l.title} className="border-t border-[color:var(--ar-rule)] pt-5">
              <h3 className="text-[20px] leading-[1.3]">{l.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.75]">{l.body}</p>
            </div>
          ))}
        </div>

        <div className="ar-panel mt-16 grid gap-8 p-8 sm:p-10 lg:grid-cols-[320px_1fr]">
          <h3 className="text-[26px] leading-[1.2]">{reflections.next.heading}</h3>
          <ul className="flex flex-col gap-4 text-[16px] leading-[1.7]">
            {reflections.next.items.map((it) => (
              <li key={it} className="flex gap-3">
                <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--ar-amber)]" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <details className="mt-16 border-t border-[color:var(--ar-rule)] pt-6">
          <summary className="ar-mono cursor-pointer text-[12px] uppercase tracking-[0.12em] text-[color:var(--ar-amber)]">
            Sources ({Object.keys(sources).length})
          </summary>
          <ol className="mt-6 grid gap-x-10 gap-y-2 text-[13px] leading-[1.7] sm:grid-cols-2">
            {Object.values(sources).map((s) => (
              <li key={s.url} className="flex gap-2.5">
                <span className="ar-mono mt-[3px] shrink-0 text-[10px] text-[color:var(--ar-dim)]">
                  {tierMeta[s.tier].label}
                </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--ar-body)] underline underline-offset-2 hover:text-[color:var(--ar-ink)]"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ol>
        </details>

        <p className="mt-8 max-w-[760px] text-[13px] leading-[1.7] text-[color:var(--ar-dim)]">
          {reflections.dataNote}
        </p>
      </div>
    </section>
  );
}
