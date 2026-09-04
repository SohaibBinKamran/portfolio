/**
 * Work index header — Figma node 857:6307.
 * Serif heading with a muted "Case Studies." lead-in, Satoshi sub-copy with
 * two bold key phrases.
 */
export function WorkHeader() {
  return (
    <header className="flex flex-col items-center px-6 pb-3 pt-40 text-center">
      <h1 className="max-w-[800px] font-serif text-[34px] leading-[1.15] tracking-[-0.01em] text-ink/55 md:text-[44px]">
        Case Studies.{" "}
        <span className="text-ink">My Approach, Process, and Impact.</span>
      </h1>
      <p className="mt-5 max-w-[650px] font-sans text-[16px] font-medium leading-[1.55] tracking-[-0.01em] text-ink/55 md:text-[18px]">
        These case studies provide an in-depth look at my design process, from{" "}
        <span className="font-bold text-ink">user research</span> and{" "}
        <span className="font-bold text-ink">prototyping</span> to final delivery
        and measurable impact.
      </p>
    </header>
  );
}
