/** ClassQuest cap mark — faceted graduation cap, traced 1:1 from
    `Redesign July/ClassQuest Logo.svg`. Gradient is fixed (the "Graduation
    Gradient"); the wordmark is rendered separately as live text so its colour
    can flip per surface. */
export function ClassQuestMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 31.5 28"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M30.2034 7.36864L16.8319 0.276775C16.1373 -0.0922585 15.3136 -0.0922585 14.619 0.276775L1.24748 7.36864C0.477126 7.76996 0 8.57262 0 9.43983C0 10.3182 0.477089 11.1097 1.24748 11.5222L3.32989 12.6279L5.42351 13.7337L14.6205 18.603C15.3052 18.9637 16.1429 18.9693 16.8221 18.603L22.2989 15.7081V14.5154C22.2989 14.5154 16.5682 11.1757 15.1844 10.3732C13.9636 9.65888 15.0314 7.79961 16.269 8.50825L23.9249 12.9551C24.5199 13.2358 24.4876 14.002 24.4666 14.5605C24.4708 15.9524 24.4638 18.9315 24.4666 20.3404C24.4525 21.0813 24.4764 23.1104 24.4666 23.8316C24.489 25.2489 26.6092 25.2616 26.6359 23.8316V21.8573C27.579 21.5107 28.1978 20.6099 28.1978 19.5798V15.0249L26.6359 15.8598C26.6359 15.8598 26.6247 13.4953 26.6149 13.4196C27.4835 12.9691 29.3288 11.9855 30.2043 11.5224C31.8378 10.7212 31.8504 8.16587 30.2043 7.36903L30.2034 7.36864Z"
        fill="url(#cq_cap_a)"
      />
      <path
        d="M15.7248 21.0427C14.9868 21.0427 14.2613 20.8688 13.6102 20.5222L5.42234 16.1848L3.25293 15.0244V19.5794C3.25293 20.6641 3.93629 21.607 4.94521 21.9116C6.71329 22.4869 11.1264 24.1455 13.9036 27.1933C14.8186 28.2653 16.6245 28.2681 17.5365 27.2045C18.9467 25.6652 20.7358 24.5047 22.2976 23.6796C22.3033 22.3381 22.2934 19.5147 22.2976 18.1594L17.8411 20.5238C17.19 20.8703 16.4632 21.0444 15.7264 21.0444L15.7248 21.0427Z"
        fill="url(#cq_cap_b)"
      />
      <defs>
        <linearGradient
          id="cq_cap_a"
          x1="31.4873"
          y1="0"
          x2="4.05693"
          y2="28.8085"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3C83F6" />
          <stop offset="1" stopColor="#212834" />
        </linearGradient>
        <linearGradient
          id="cq_cap_b"
          x1="22.3317"
          y1="15.0244"
          x2="8.30108"
          y2="32.1578"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3C83F6" />
          <stop offset="1" stopColor="#212834" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Full lockup: cap mark + "ClassQuest" wordmark. Wordmark colour follows the
    `text-*` class on the wrapper (deep navy on light, white on dark). */
export function ClassQuestLockup({
  className = "",
  markClass = "h-[22px] w-auto",
  wordClass = "text-[19px]",
}: {
  className?: string;
  markClass?: string;
  wordClass?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <ClassQuestMark className={markClass} />
      <span className={`font-bold tracking-[-0.02em] ${wordClass}`}>ClassQuest</span>
    </span>
  );
}
