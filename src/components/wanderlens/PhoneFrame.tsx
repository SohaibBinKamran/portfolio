import Image from "next/image";

/**
 * Lightweight iPhone-style frame wrapping a 393×852 screen export.
 * Matches the device mock used throughout the Figma prototype section.
 */
export function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[393/852] w-full overflow-hidden rounded-[2.4rem] border-[6px] border-[#0c0c0c] bg-[#0c0c0c] shadow-[0_18px_40px_-16px_rgba(29,35,23,0.45)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 45vw, 320px"
        className="object-cover object-top"
        priority={priority}
      />
      {/* notch */}
      <div className="pointer-events-none absolute left-1/2 top-[7px] h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-[#0c0c0c]" />
    </div>
  );
}
