import type { Route } from "@/data/arrivals";

export const fmt = (n: number) => n.toLocaleString("en-US");

/** Last-year change and since-first-year change for a route's national series. */
export function trendOf(series: Route["series"]) {
  const pts = series.pts;
  const [prevYear, prev] = pts[pts.length - 2];
  const [lastYear, last] = pts[pts.length - 1];
  const [firstYear, first] = pts[0];
  const pct = ((last - prev) / prev) * 100;
  const total = ((last - first) / first) * 100;
  return { prevYear, lastYear, firstYear, pct, total, up: pct >= 0 };
}
