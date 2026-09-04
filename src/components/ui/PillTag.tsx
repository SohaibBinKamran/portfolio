export function PillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-2xl bg-black/5 px-3 py-1 font-ui text-xs text-ink/70">
      {children}
    </span>
  );
}
