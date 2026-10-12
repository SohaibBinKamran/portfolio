import Image from "next/image";
import { brand } from "@/data/knoccs";

const PRIMARY = ["#778AFA", "#7620BA", "#EB7878", "#DE62EA"];
const NEUTRALS = ["#1A181C", "#312D34", "#534E56", "#7D7881", "#ADA7B2", "#EAE7EB", "#FFFFFF"];

function RatioGraphic() {
  return (
    <div className="flex h-[44px] overflow-hidden rounded-[10px] border border-black/5">
      {NEUTRALS.map((c) => (
        <span key={c} className="flex-[3]" style={{ background: c }} />
      ))}
      {PRIMARY.map((c) => (
        <span key={c} className="flex-1" style={{ background: c }} />
      ))}
    </div>
  );
}

function StatesGraphic() {
  return (
    <div className="flex h-[44px] items-center gap-2">
      <span className="flex h-full flex-1 items-center justify-center rounded-[8px] border border-[#EAE7EB] bg-white text-[11px] text-[#534E56]">
        Default
      </span>
      <span className="flex h-full flex-1 items-center justify-center rounded-[8px] bg-[#F7F5FA] text-[11px] text-[#534E56]">
        Hover
      </span>
      <span className="flex h-full flex-1 items-center justify-center rounded-[8px] bg-[#4B3B56] text-[11px] font-semibold text-white">
        Active
      </span>
    </div>
  );
}

function GovernedGraphic() {
  return (
    <div className="flex h-[44px] items-center gap-3">
      <div className="flex gap-1">
        {["#778AFA", "#1A181C", "#ADA7B2", "#DE62EA", "#EAE7EB"].map((c) => (
          <span key={c} className="size-[14px] rounded-full opacity-50" style={{ background: c }} />
        ))}
      </div>
      <svg width="22" height="12" viewBox="0 0 28 14" fill="none" aria-hidden>
        <path d="M0 7h25M20 2l5 5-5 5" stroke="#7620BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="size-[26px] rounded-full bg-[#7620BA]" />
    </div>
  );
}

const GRAPHICS: Record<string, () => React.ReactNode> = {
  ratio: () => <RatioGraphic />,
  states: () => <StatesGraphic />,
  governed: () => <GovernedGraphic />,
};

export function Brand() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{brand.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{brand.heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="kn-stage flex flex-col items-center justify-center gap-6 rounded-[20px] p-12">
            <Image
              src="/images/knoccs/logo-mark.svg"
              alt="The KNOCCS logo mark, an open looping ring in a purple to pink gradient"
              width={120}
              height={120}
            />
            <span className="text-[34px] font-extrabold tracking-[-0.01em] text-white">KNOCCS</span>
            <p className="max-w-[260px] text-center text-[13.5px] leading-[1.6] text-white/60">
              {brand.body}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {brand.principles.map((p, i) => (
              <div key={p.id} className="kn-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8">
                <div className="sm:w-[44%]">
                  <span className="text-[12px] font-semibold text-[color:var(--kn-p2)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-[16px] font-semibold text-[color:var(--kn-ink)]">{p.title}</h3>
                  <p className="mt-1 text-[13px] leading-[1.55] text-[color:var(--kn-body)]">{p.body}</p>
                </div>
                <div className="flex-1">{GRAPHICS[p.id]()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
