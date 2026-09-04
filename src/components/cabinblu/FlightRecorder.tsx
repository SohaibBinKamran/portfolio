"use client";

import { motion, useReducedMotion } from "framer-motion";
import { flightRecorder } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

// Path 'd' data exported directly from Figma (line-a/b/c), not hand-authored.
const LINES = [
  {
    id: "early",
    d: "M1.7451 36.6388C94.7952 59.9013 141.32 100.611 211.108 88.9795C304.158 71.5326 350.683 129.689 420.471 135.505C490.258 141.32 560.046 112.242 629.834 71.5326C687.99 36.6388 734.515 7.5606 769.409 1.74496",
    color: "var(--cb-chart-amber)",
    y: 40,
  },
  {
    id: "fluctuating",
    d: "M1.74507 19.5646C59.9014 48.6427 118.058 71.9053 211.108 66.0896C280.895 60.274 350.683 -3.69797 420.471 2.11767C478.627 7.9333 560.046 48.6427 629.833 42.8271C687.99 37.0115 734.515 10.2596 769.409 7.9333",
    color: "var(--cb-chart-teal)",
    y: 150,
  },
  {
    id: "stable",
    d: "M1.74473 15.7022C94.7949 11.0497 141.32 1.74469 211.108 5.23407C304.158 9.88658 350.683 22.681 420.47 19.1916C490.258 16.8653 560.046 11.0497 629.833 7.56032C687.99 4.07094 734.515 1.74469 769.408 1.74469",
    color: "var(--cb-chart-coral)",
    y: 8,
  },
];

export function FlightRecorder() {
  const reduce = useReducedMotion();

  return (
    <section className="flex flex-col items-center gap-11 bg-white px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{flightRecorder.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">{flightRecorder.heading}</h2>
        <p className="max-w-[900px] text-[17px] leading-[1.55] text-[var(--cb-body)]">{flightRecorder.sub}</p>
      </div>

      <div
        className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 rounded-2xl px-6 py-10 md:px-12 md:py-16"
        style={{
          background:
            "radial-gradient(126% 136% at 80% 0%, rgba(35,42,82,1) 0%, rgba(25,30,60,1) 30%, rgba(15,18,38,1) 60%)",
        }}
      >
        <p className="cb-eyebrow text-[12px] text-[var(--cb-chart-amber)]">{flightRecorder.panel.eyebrow}</p>
        <h3 className="max-w-[930px] text-2xl font-medium leading-snug text-white">{flightRecorder.panel.heading}</h3>
        <p className="max-w-[930px] text-base leading-relaxed text-[#c7cae0]">{flightRecorder.panel.body}</p>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {flightRecorder.legend.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-white/[0.12] px-3.5 py-1.5 text-xs text-[#c7cae0]"
            >
              <span aria-hidden className="h-2.5 w-2.5 rounded-[3px]" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>

        <div className="mt-2 rounded-[18px] border border-white/[0.12] bg-white/[0.03] px-4 py-5 md:px-6">
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 800 300"
              className="h-[280px] w-full min-w-[600px]"
              preserveAspectRatio="none"
              role="img"
              aria-label="Three illustrative anxiety trajectories over 14 days: early improvement with a late spike, a fluctuating pattern, and a stable high pattern."
            >
              {/* grid */}
              {[0, 0.33, 0.66, 1].map((f) => (
                <line
                  key={f}
                  x1={f * 800}
                  x2={f * 800}
                  y1={0}
                  y2={230}
                  stroke="white"
                  strokeOpacity={0.1}
                />
              ))}
              <line x1={0} x2={800} y1={230} y2={230} stroke="white" strokeOpacity={0.15} />

              {/* flight day approaches marker, near day 14 */}
              <line x1={740} x2={740} y1={0} y2={230} stroke="var(--cb-chart-coral)" strokeOpacity={0.5} strokeDasharray="4 4" />
              <text x={735} y={-6} textAnchor="end" fontSize="13" fill="var(--cb-chart-coral)">
                {flightRecorder.markerLabel}
              </text>

              <text x={0} y={10} fontSize="13" fill="#9aa0c4">higher</text>
              <text x={0} y={226} fontSize="13" fill="#9aa0c4">lower</text>

              {flightRecorder.axisDays.map((label, i) => (
                <text
                  key={label}
                  x={(i / (flightRecorder.axisDays.length - 1)) * 800}
                  y={250}
                  fontSize="13"
                  textAnchor={i === 0 ? "start" : i === flightRecorder.axisDays.length - 1 ? "end" : "middle"}
                  fill="#9aa0c4"
                >
                  {label}
                </text>
              ))}

              {LINES.map((line, i) => (
                <motion.path
                  key={line.id}
                  className="cb-chart-path"
                  d={line.d}
                  transform={`translate(15, ${line.y})`}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : i * 0.25, ease: "easeInOut" }}
                />
              ))}
            </svg>
          </div>
        </div>

        <p className="pt-1 text-[13px] leading-relaxed text-[#9aa0c4]">{flightRecorder.caption}</p>
      </div>
    </section>
  );
}
