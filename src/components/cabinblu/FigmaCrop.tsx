/* eslint-disable @next/next/no-img-element */

/**
 * Renders one crop window of a shared Figma source image using the exact
 * percentage transform Figma stores per-instance (from get_design_context's
 * `absolute h-[…%] left-[…%] top-[…%] w-[…%]` output), instead of an
 * approximated object-position. Mirrors Figma's own crop technique so each
 * instance shows the illustration it was actually designed to show.
 */
export function FigmaCrop({
  src,
  alt,
  w,
  h,
  top,
  left,
  className,
  style,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  top: number;
  left: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute max-w-none"
        style={{
          width: `${w}%`,
          height: `${h}%`,
          top: `${top}%`,
          left: `${left}%`,
        }}
      />
    </div>
  );
}
