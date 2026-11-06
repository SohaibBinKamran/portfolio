import { buildNote } from "@/data/arrivals";

export function BuildNote() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{buildNote.eyebrow}</span>
        <h2 className="mt-5 text-[32px] leading-[1.15] sm:text-[44px]">{buildNote.heading}</h2>
        <p className="mt-4 max-w-[640px] text-[17px] leading-[1.7]">{buildNote.intro}</p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {buildNote.stack.map((s) => (
            <li
              key={s}
              className="ar-mono rounded-full border border-[color:var(--ar-rule)] px-3 py-1.5 text-[12px] text-[color:var(--ar-body)] transition-colors hover:border-[color:var(--ar-amber)] hover:text-[color:var(--ar-ink)]"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="ar-panel p-7 sm:p-8">
            <h3 className="text-[20px]">{buildNote.prompts.heading}</h3>
            <ol className="mt-6 flex flex-col gap-6">
              {buildNote.prompts.items.map((p) => (
                <li key={p.version} className="grid grid-cols-[44px_1fr] gap-4">
                  <span className="ar-mono mt-1 text-[12px] text-[color:var(--ar-amber)]">{p.version}</span>
                  <div>
                    <p className="text-[16px] leading-[1.6] text-[color:var(--ar-ink)]">“{p.text}”</p>
                    <p className="mt-1.5 text-[14px] leading-[1.6] text-[color:var(--ar-dim)]">{p.result}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="ar-panel p-7 sm:p-8">
            <h3 className="text-[20px]">{buildNote.byHand.heading}</h3>
            <ul className="mt-6 flex flex-col gap-4 text-[15px] leading-[1.65]">
              {buildNote.byHand.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--ar-amber)]" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="ar-panel p-7 sm:p-8">
            <h3 className="text-[20px]">{buildNote.production.heading}</h3>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {buildNote.production.steps.map((s, i) => (
                <li key={s} className="flex gap-3.5">
                  <span className="ar-mono flex size-7 shrink-0 items-center justify-center rounded-md bg-[color:var(--ar-flap)] text-[13px] text-[color:var(--ar-amber)] shadow-[inset_0_-1px_0_var(--ar-flap-edge)]">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-[1.6]">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="ar-panel flex flex-col justify-center gap-3 border-[color:var(--ar-amber-deep)] p-7 sm:p-8">
            <span className="ar-mono inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[color:var(--ar-open)]">
              <span className="size-2 rounded-full bg-[color:var(--ar-open)]" />
              {buildNote.outcome.label}
            </span>
            <p className="text-[18px] leading-[1.55] text-[color:var(--ar-ink)]">{buildNote.outcome.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
