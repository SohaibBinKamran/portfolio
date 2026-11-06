import { buildNote } from "@/data/knoccs";

export function BuildNote() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{buildNote.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{buildNote.heading}</h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7]">{buildNote.intro}</p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {buildNote.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-[color:var(--kn-border)] bg-white px-3 py-1.5 font-[family-name:var(--kn-mono)] text-[12px] text-[color:var(--kn-body)] transition-colors hover:border-[color:var(--kn-p2)] hover:text-[color:var(--kn-ink)]"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="kn-panel p-7">
            <h3 className="text-[18px]">{buildNote.prompts.heading}</h3>
            <ol className="mt-6 flex flex-col gap-6">
              {buildNote.prompts.items.map((p) => (
                <li key={p.version} className="grid grid-cols-[36px_1fr] gap-3">
                  <span className="mt-1 font-[family-name:var(--kn-mono)] text-[12px] text-[color:var(--kn-p2)]">{p.version}</span>
                  <div>
                    <p className="text-[15px] leading-[1.6] text-[color:var(--kn-ink)]">“{p.text}”</p>
                    <p className="mt-1.5 text-[13px] leading-[1.6] text-[color:var(--kn-muted)]">{p.result}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="kn-panel p-7">
            <h3 className="text-[18px]">{buildNote.byHand.heading}</h3>
            <ul className="mt-6 flex flex-col gap-4 text-[14px] leading-[1.65]">
              {buildNote.byHand.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[color:var(--kn-p2)]" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="kn-panel p-7">
            <h3 className="text-[18px]">{buildNote.production.heading}</h3>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {buildNote.production.steps.map((s, i) => (
                <li key={s} className="flex gap-3.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--kn-p2)] text-[12px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[14px] leading-[1.6]">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="kn-panel flex flex-col justify-center gap-3 p-7">
            <span className="inline-flex items-center gap-2 font-[family-name:var(--kn-mono)] text-[12px] uppercase tracking-[0.14em] text-[color:var(--kn-green)]">
              <span className="size-2 rounded-full bg-[color:var(--kn-green)]" />
              {buildNote.outcome.label}
            </span>
            <p className="text-[17px] leading-[1.55] text-[color:var(--kn-ink)]">{buildNote.outcome.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
