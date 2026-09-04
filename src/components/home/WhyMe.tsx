"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { whyMe } from "@/data/home";

/** The three feature marks, traced 1:1 from Figma `912-3939` (navy #0A0A30 + accent #265BFF). */
const icons = [
  // marker / highlighter — wings left/right
  <svg key="1" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className="wm-icon-anim origin-center [animation:wm-wing_1.6s_ease-in-out_infinite]">
    <g transform="translate(9.625 4.055)" strokeWidth="1.75">
      <path d="M1.45833 4.73317H7.29167" stroke="#265BFF" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.875 2.625C0.875 2.16087 1.05937 1.71575 1.38756 1.38756C1.71575 1.05937 2.16087 0.875 2.625 0.875H6.125C6.58913 0.875 7.03425 1.05937 7.36244 1.38756C7.69063 1.71575 7.875 2.16087 7.875 2.625V15.8083C7.8749 16.0648 7.81842 16.3182 7.70955 16.5504C7.60068 16.7827 7.44209 16.9882 7.245 17.1523L5.495 18.6095C5.18055 18.8714 4.78424 19.0148 4.375 19.0148C3.96576 19.0148 3.56945 18.8714 3.255 18.6095L1.505 17.1523C1.30791 16.9882 1.14932 16.7827 1.04045 16.5504C0.931578 16.3182 0.875096 16.0648 0.875 15.8083V2.625Z" stroke="#0A0A30" />
    </g>
  </svg>,
  // plus with centre dot — twirls like a windmill
  <svg key="2" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className="wm-icon-anim origin-center [animation:wm-windmill_2.4s_linear_infinite]">
    <g transform="translate(8.46 8.46)">
      <path d="M5.5825 0.875V10.2083M10.2083 5.54167H0.875" stroke="#0A0A30" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M5.54167 7.44917C6.59515 7.44917 7.44917 6.59515 7.44917 5.54167C7.44917 4.48818 6.59515 3.63417 5.54167 3.63417C4.48818 3.63417 3.63417 4.48818 3.63417 5.54167C3.63417 6.59515 4.48818 7.44917 5.54167 7.44917Z" fill="#265BFF" />
    </g>
  </svg>,
  // heart — beats
  <svg key="3" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className="wm-icon-anim origin-center [animation:wm-beat_1.15s_ease-in-out_infinite]">
    <g transform="translate(3.79 5.075)" strokeWidth="1.75">
      <path d="M9.6425 2.35551L9.79883 2.50951C9.90798 2.61709 10.0551 2.6774 10.2083 2.6774C10.3616 2.6774 10.5087 2.61709 10.6178 2.50951L10.773 2.35551C11.7433 1.4045 13.0485 0.872802 14.4072 0.875007C15.0815 0.875007 15.7488 1.00567 16.3718 1.26001C16.9937 1.51291 17.5601 1.88507 18.039 2.35551C18.515 2.82451 18.8942 3.38217 19.152 3.99584C19.4097 4.60817 19.5425 5.26582 19.5425 5.93017C19.5425 6.59453 19.4097 7.25218 19.152 7.86451C18.8928 8.47899 18.5145 9.03609 18.039 9.50367L10.619 16.8058C10.5099 16.9134 10.3628 16.9737 10.2095 16.9737C10.0562 16.9737 9.90915 16.9134 9.8 16.8058L2.38 9.50367C1.90448 9.03776 1.52651 8.48182 1.26811 7.86828C1.00972 7.25475 0.876082 6.5959 0.875001 5.93017C0.875001 4.58851 1.41633 3.30284 2.38 2.35551C3.34913 1.40552 4.65242 0.873901 6.0095 0.875007C7.37217 0.875007 8.67883 1.40701 9.6425 2.35551Z" stroke="#0A0A30" />
      <path d="M14.2917 3.79167C15.2273 4.14634 16.464 5.46001 16.625 6.12501" stroke="#265BFF" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>,
];

export function WhyMe() {
  return (
    <section className="bg-bg-cream px-6 pb-28 pt-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-start gap-5">
          <SectionLabel>Why Me?</SectionLabel>
          <h2 className="max-w-[720px] text-3xl leading-[1.15] md:text-[44px]">
            Behind the Designs: Evidence In, Outcomes Out
          </h2>
          <p className="max-w-[760px] font-sans text-base text-ink-muted md:text-lg">
            Every project is an opportunity to transform complex challenges into
            intuitive, user-centered experiences.
          </p>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {whyMe.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <div className="flex items-center justify-center rounded-[18px] border border-[#0a0f29]/[0.08] bg-white p-4 shadow-[0_12px_32px_-12px_rgba(10,15,41,0.16)]">
                {icons[i]}
              </div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-sans text-[22px] font-medium tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="max-w-[380px] font-sans text-base text-ink-muted">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
