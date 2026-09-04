export function RotatingRing({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <span
        className="absolute inset-[-28px] rounded-full border border-dashed border-ink/15"
        style={{ animation: "spin 18s linear infinite" }}
        aria-hidden
      />
      {children}
    </div>
  );
}
