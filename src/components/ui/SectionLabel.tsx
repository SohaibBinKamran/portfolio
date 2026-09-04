export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[56px] border border-ink/[0.12] px-3 py-[7px] font-sans text-[13px] font-medium tracking-tight text-ink">
      {children}
    </span>
  );
}
