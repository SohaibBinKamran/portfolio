import { brand } from "@/data/classquest";
import { Aside, RichText, Section, SectionHead, SubHead } from "./Bits";
import { ClassQuestLockup, ClassQuestMark } from "./Logo";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ExploreIcon({ kind }: { kind: string }) {
  const cls = "size-9 text-[var(--cq-muted)]";
  if (kind === "shield")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path {...stroke} d="M12 3l7 2.5v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9v-6L12 3z" />
      </svg>
    );
  if (kind === "cards")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <rect {...stroke} x="6" y="7" width="13" height="10" rx="1.6" />
        <path {...stroke} d="M4 9v9a1.6 1.6 0 001.6 1.6H16" />
      </svg>
    );
  if (kind === "cap-flat")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path {...stroke} d="M2 9l10-4 10 4-10 4L2 9z" />
        <path {...stroke} d="M6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
        <path {...stroke} d="M22 9v5" />
      </svg>
    );
  return <ClassQuestMark className="size-9" />;
}

export function Brand() {
  const { exploration: ex, lockup, color, type, voice } = brand;
  return (
    <Section id="brand" band>
      <SectionHead
        n={brand.n}
        eyebrow={brand.eyebrow}
        title={brand.title}
        intro={brand.intro}
      />

      {/* Logo exploration */}
      <div className="mt-14 flex flex-col gap-6">
        <SubHead title={ex.title} intro={ex.intro} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ex.options.map((o) => (
            <div
              key={o.n}
              className={`relative flex flex-col gap-3 rounded-[12px] border px-5 pb-5 pt-9 ${
                o.final
                  ? "border-[var(--cq-blue)] bg-[var(--cq-blue-tint)]"
                  : "border-[var(--cq-border)] bg-[var(--cq-card)]"
              }`}
            >
              {o.final ? (
                <span className="absolute right-4 top-3 rounded-full bg-[var(--cq-blue)] px-2.5 py-[3px] font-[family-name:var(--cq-mono)] text-[9px] uppercase tracking-[0.08em] text-white">
                  Final mark
                </span>
              ) : null}
              <ExploreIcon kind={o.icon} />
              <p className="font-[family-name:var(--cq-mono)] text-[10.5px] text-[var(--cq-muted)]">
                {o.n}
              </p>
              <h4 className="text-[15px] font-bold text-[var(--cq-ink)]">{o.title}</h4>
              <p className="text-[13px] leading-[1.55] text-[var(--cq-body)]">{o.body}</p>
            </div>
          ))}
        </div>
        <Aside title={ex.why.title} body={ex.why.body} />
      </div>

      {/* Lockup & usage */}
      <div className="mt-16 flex flex-col gap-6">
        <SubHead title={lockup.title} intro={lockup.intro} />
        <div className="overflow-hidden rounded-[14px] border border-[var(--cq-border)]">
          {lockup.rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] md:items-center ${
                i > 0 ? "border-t border-[var(--cq-border)]" : ""
              } bg-[var(--cq-card)]`}
            >
              <div>
                <p className="font-[family-name:var(--cq-mono)] text-[10.5px] uppercase tracking-[0.09em] text-[var(--cq-gold)]">
                  {r.label}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--cq-body)]">
                  {r.desc}
                </p>
              </div>
              <div
                className={`flex min-h-[92px] items-center justify-center rounded-[10px] ${
                  r.surface === "dark"
                    ? "bg-[var(--cq-dark)]"
                    : r.surface === "icon"
                      ? "bg-[var(--cq-bg-alt)]"
                      : "bg-white ring-1 ring-inset ring-[var(--cq-border)]"
                }`}
              >
                {r.surface === "icon" ? (
                  <ClassQuestMark className="h-9 w-auto" />
                ) : (
                  <ClassQuestLockup
                    className={r.surface === "dark" ? "text-white" : "text-[var(--cq-dark)]"}
                    markClass="h-[26px] w-auto"
                    wordClass="text-[22px]"
                  />
                )}
              </div>
              <ul className="flex flex-col gap-1.5 text-[12.5px] leading-[1.4] text-[var(--cq-body)]">
                {r.rules.map((rule, idx) => (
                  <li key={rule} className="flex gap-2">
                    <span
                      className={
                        idx === r.rules.length - 1
                          ? "text-[var(--cq-red)]"
                          : "text-[var(--cq-green)]"
                      }
                    >
                      {idx === r.rules.length - 1 ? "✗" : "✓"}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Aside title={lockup.why.title} body={lockup.why.body} />
      </div>

      {/* Color system */}
      <div className="mt-16 flex flex-col gap-6">
        <SubHead title={color.title} intro={color.intro} />
        <div className="grid gap-6 md:grid-cols-3">
          {color.groups.map((grp) => (
            <div key={grp.group} className="flex flex-col gap-3">
              <p className="font-[family-name:var(--cq-mono)] text-[10.5px] uppercase tracking-[0.09em] text-[var(--cq-muted)]">
                {grp.group}
              </p>
              {grp.swatches.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col justify-end rounded-[10px] p-4 min-h-[116px]"
                  style={{
                    background: s.css,
                    color: s.dark ? "#fff" : "var(--cq-ink)",
                  }}
                >
                  <p className="text-[13px] font-bold">{s.name}</p>
                  <p className="font-[family-name:var(--cq-mono)] text-[10.5px] opacity-80">
                    {s.hex}
                  </p>
                  <p className="mt-1 text-[11px] leading-[1.4] opacity-80">{s.use}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="mt-16 flex flex-col gap-6">
        <SubHead title={type.title} intro={type.intro} />
        <div className="grid gap-4 md:grid-cols-2">
          {type.specimens.map((sp) => (
            <div
              key={sp.role}
              className="flex flex-col gap-3 rounded-[12px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-6 py-5"
            >
              <p className="font-[family-name:var(--cq-mono)] text-[10.5px] uppercase tracking-[0.09em] text-[var(--cq-muted)]">
                {sp.role}
              </p>
              <p className={`text-[var(--cq-ink)] ${sp.size}`}>{sp.sample}</p>
              <p className="font-[family-name:var(--cq-mono)] text-[11px] text-[var(--cq-muted)]">
                {sp.spec}
              </p>
            </div>
          ))}
        </div>
        <RichText
          text={type.note}
          className="max-w-[80ch] rounded-[10px] bg-[var(--cq-bg)] px-5 py-4 text-[13.5px] leading-[1.6] text-[var(--cq-body)]"
        />
      </div>

      {/* Voice & tone */}
      <div className="mt-16 flex flex-col gap-6">
        <SubHead title={voice.title} />
        <div className="grid gap-4 md:grid-cols-3">
          {voice.items.map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-2 rounded-[12px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-6 py-5"
            >
              <span className="text-[18px] text-[var(--cq-blue)]">{v.glyph}</span>
              <h4 className="text-[15px] font-bold text-[var(--cq-ink)]">{v.title}</h4>
              <p className="text-[13px] leading-[1.55] text-[var(--cq-body)]">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
