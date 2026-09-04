import Image from "next/image";

/* Unscaled stage geometry (px). Phones overlap in a tight hand-of-cards fan,
   side phones tucked behind the centre one — matched to Figma node 869:12213.
   The "paper fan" open animation is pure CSS (see openseat.css): the resting
   state below is the final fanned layout, so it is correct with JS disabled
   and under prefers-reduced-motion. */
const STAGE_W = 688;
const STAGE_H = 548;

const SIDE_W = 224;
const CENTER_W = 242;
const SIDE_H = Math.round((SIDE_W * 613) / 299);
const CENTER_H = Math.round((CENTER_W * 613) / 299);

const CENTER_LEFT = (STAGE_W - CENTER_W) / 2;
const SIDE_INSET = 74; // horizontal overlap with the centre phone
const SIDE_DROP = 24; // side phones sit lower

type PhoneDef = { src: string; alt: string };

const CONFIRMED: PhoneDef = {
  src: "/images/openseat/os-confirmed.png",
  alt: "Seat confirmed screen — seat secured at The Alchemist",
};
const RADAR: PhoneDef = {
  src: "/images/openseat/os-radar.png",
  alt: "The Radar discovery map — nearby open tables",
};
const BEACON: PhoneDef = {
  src: "/images/openseat/os-beacon.png",
  alt: "Beacon Mode screen — hold up your phone, look for this color",
};

function Frame({
  def,
  w,
  h,
  priority = false,
}: {
  def: PhoneDef;
  w: number;
  h: number;
  priority?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[2.4rem] border-[9px] border-[#1c1c22] bg-[#1c1c22] shadow-[0_34px_60px_-24px_rgba(43,32,24,0.5)]"
      style={{ width: w, height: h }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
        <Image
          src={def.src}
          alt={def.alt}
          fill
          priority={priority}
          sizes="300px"
          className="object-cover object-top"
        />
      </div>
      <span
        aria-hidden
        className="absolute left-1/2 top-[9px] h-[20px] w-[80px] -translate-x-1/2 rounded-full bg-[#1c1c22]"
      />
    </div>
  );
}

export function HeroPhones() {
  return (
    <div
      className="relative mx-auto w-full [container-type:inline-size]"
      style={{ maxWidth: STAGE_W, aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(min(1, 100cqw / ${STAGE_W}px))`,
          }}
        >
          <div
            className="os-phone os-phone-l absolute z-10"
            style={{ left: CENTER_LEFT - SIDE_W + SIDE_INSET, top: SIDE_DROP }}
          >
            <Frame def={CONFIRMED} w={SIDE_W} h={SIDE_H} />
          </div>

          <div
            className="os-phone os-phone-r absolute z-10"
            style={{ left: CENTER_LEFT + CENTER_W - SIDE_INSET, top: SIDE_DROP }}
          >
            <Frame def={BEACON} w={SIDE_W} h={SIDE_H} />
          </div>

          <div
            className="os-phone os-phone-c absolute z-20"
            style={{ left: CENTER_LEFT, top: 0 }}
          >
            <Frame def={RADAR} w={CENTER_W} h={CENTER_H} priority />
          </div>
        </div>
      </div>
    </div>
  );
}
