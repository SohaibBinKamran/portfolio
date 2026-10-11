import { evolution } from "@/data/arrivals";

export function Evolution() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{evolution.eyebrow}</span>
        <h2 className="mt-5 max-w-[760px] text-[32px] leading-[1.15] sm:text-[44px]">{evolution.heading}</h2>

        <ol className="mt-14 flex flex-col">
          {evolution.steps.map((s, i) => (
            <li
              key={s.label}
              className="grid grid-cols-[64px_1fr] gap-x-5 sm:grid-cols-[96px_1fr] sm:gap-x-8"
            >
              <div className="flex flex-col items-center">
                <span className="ar-mono flex h-11 w-[64px] items-center justify-center rounded-[8px] border border-[color:var(--ar-rule)] bg-[color:var(--ar-flap)] text-[14px] font-semibold text-[color:var(--ar-amber)] sm:w-[80px]">
                  {s.label}
                </span>
                {i < evolution.steps.length - 1 && (
                  <span aria-hidden className="my-2 w-px flex-1 bg-[color:var(--ar-rule)]" />
                )}
              </div>
              <div className={i < evolution.steps.length - 1 ? "pb-10" : ""}>
                <h3 className="text-[22px] leading-[1.3] sm:text-[26px]">{s.title}</h3>
                <p className="mt-2 max-w-[680px] text-[16px] leading-[1.75]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
