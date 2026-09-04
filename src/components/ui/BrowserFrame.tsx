import Image from "next/image";

export function BrowserFrame({
  label,
  src,
  accent = "bg-bg-muted",
}: {
  label: string;
  src?: string;
  accent?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-bg-muted">
      <div className="flex items-center gap-1.5 bg-bg-dark px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-ui text-xs text-white/50">{label}</span>
      </div>
      {src ? (
        <div className={`relative aspect-[16/10] w-full ${accent}`}>
          <Image
            src={src}
            alt={`${label} project preview`}
            fill
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div
          className={`flex aspect-[16/10] w-full items-center justify-center ${accent}`}
        >
          <span className="font-ui text-xs uppercase tracking-wide text-ink/30">
            Project preview — {label}
          </span>
        </div>
      )}
    </div>
  );
}
