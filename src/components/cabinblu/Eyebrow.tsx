export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="cb-eyebrow flex items-center gap-2.5 font-bold text-[var(--cb-blue-accent)]">
      <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-[var(--cb-gold)]" />
      {children}
    </p>
  );
}
