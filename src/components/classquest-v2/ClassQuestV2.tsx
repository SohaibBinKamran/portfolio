"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CLASSQUEST_V2_HTML } from "./markup";
import { initClassQuestV2 } from "./runtime";

/**
 * ClassQuest case study V2. The markup is static (rendered at build time, so it
 * is in the exported HTML); runtime.ts attaches the scroll and interaction layer.
 */
export function ClassQuestV2() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return initClassQuestV2(el, CLASSQUEST_V2_HTML);
  }, []);

  return (
    <div
      ref={ref}
      className="cqv2"
      onClick={(e) => {
        // internal links in the static markup go through the router
        const a = (e.target as Element).closest("a[data-nav]");
        if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        router.push(a.getAttribute("href") || "/");
      }}
      dangerouslySetInnerHTML={{ __html: CLASSQUEST_V2_HTML }}
    />
  );
}
