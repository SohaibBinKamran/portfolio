/**
 * Hand-drawn cursor pointer — traced 1:1 from `Redesign July/button and cursor.svg`
 * (near-white fill, thin near-black outline). `dir="ne"` aims up-right; `dir="nw"`
 * is the same shape mirrored to aim up-left. Shared with the Home hero's roaming
 * cursors so the annotation vocabulary stays consistent across pages.
 */
export function CursorArrow({ dir = "nw" }: { dir?: "ne" | "nw" }) {
  return (
    <svg
      width="26"
      height="28"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{
        transform: dir === "nw" ? "scaleX(-1)" : undefined,
        filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.28))",
      }}
    >
      <path
        d="M14.77 21.086 18.949 3.436 3.841 12.588 11.234 14.549Z"
        fill="#fafafa"
      />
      <path
        d="M18.619 2.874 19.93 2.08 19.573 3.589 15.394 21.239 15.006 22.88 14.206 21.401 10.803 15.111 3.678 13.22 2.191 12.826 3.511 12.026Z"
        fill="none"
        stroke="#080808"
        strokeWidth="1.92"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
