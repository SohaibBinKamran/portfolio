// Arrivals Board case study content.
// Every figure below was pulled from the sources listed in `sources` (Destatis
// AZR series, IT.NRW Top 15 table and press releases, Statistisches Landesamt
// Baden-Württemberg press releases, Stadt Duisburg's 2013 report, named press).
// Rows marked tier "est" are third party relays of register data whose vintage
// is not independently confirmed, and the page says so on screen.
//
// ASSUMPTIONS TO CONFIRM (not stated in the source material): `meta.role`,
// `meta.context`, `meta.timeline`. The organisation is deliberately unnamed.

export const meta = {
  title: "Arrivals Board",
  role: "Researcher & Product Designer",
  context: "Internal route marketing tool",
  scope: "Research audit, data design, interactive prototype",
  timeline: "V1 → V3 · 2026",
};

export const hero = {
  eyebrow: "CASE STUDY · DATA PRODUCT",
  heading: "The Arrivals Board",
  subheading:
    "I was asked for a heat map of where six diaspora communities live in Germany. The data to draw one doesn't exist at that resolution, so I built a departures board that shows exactly what the registers can prove, and says so out loud when they can't.",
};

export const brief = {
  eyebrow: "THE ASK",
  heading: "Where does VFR demand actually live?",
  body: [
    "VFR, or visiting friends and relatives, is travel driven by community, not campaigns. For six routes, the question was simple: which German cities are home to the Bulgarian, Romanian, Albanian, Kosovar, Serbian and Croatian communities behind them?",
    "I'd already mapped each catchment area in Miro using research assisted by AI. My manager's next request was to turn it into a heat map that pinpoints exact cities, down to the neighbourhood.",
  ],
  routes: [
    { code: "SOF", city: "Sofia", community: "Bulgarian" },
    { code: "OTP", city: "Bucharest", community: "Romanian" },
    { code: "TIA", city: "Tirana", community: "Albanian" },
    { code: "PRN", city: "Pristina", community: "Kosovar" },
    { code: "BEG", city: "Belgrade", community: "Serbian" },
    { code: "ZAD", city: "Zadar", community: "Croatian" },
  ],
};

export type Rung = {
  id: string;
  level: string;
  status: "open" | "partial" | "closed";
  statusLabel: string;
  source: string;
  detail: string;
  example: string;
};

export const reality = {
  eyebrow: "THE REALITY CHECK",
  heading: "A heat map is a promise about resolution",
  intro:
    "Before drawing anything I walked down the ladder of geography to see where the data stops. Pick a rung.",
  rungs: [
    {
      id: "federal",
      level: "Federal",
      status: "open",
      statusLabel: "Published, free",
      source: "Destatis, Ausländerzentralregister (AZR)",
      detail:
        "National totals by citizenship, every 31 December, as a series from 2010 to 2025.",
      example: "Bulgaria 421,895 · Romania 903,770 · Croatia 413,480 · Serbia 271,285 · Kosovo 323,260 (31.12.2025)",
    },
    {
      id: "state",
      level: "State",
      status: "open",
      statusLabel: "Published, free",
      source: "IT.NRW · Statistisches Landesamt Baden-Württemberg",
      detail:
        "Each state office publishes its own nationality tables. NRW's Top 15 table is dated 31.12.2025; Baden-Württemberg's full breakdown is 31.12.2024.",
      example: "NRW: Romanian 170,100 · Bulgarian 103,620. BW: Romanian 181,430 · Croatian 121,995",
    },
    {
      id: "city",
      level: "City",
      status: "partial",
      statusLabel: "Patchy and dated",
      source: "Municipal reports · named press",
      detail:
        "A few cities publish nationality counts openly, but mostly in old reports. Newer figures usually reach me secondhand, through press that cites the register.",
      example: "Duisburg 2013: 4,809 Bulgarians · Dortmund 2023: about 12,000 Romanians and Bulgarians combined",
    },
    {
      id: "district",
      level: "Stadtteil",
      status: "closed",
      statusLabel: "Effectively closed",
      source: "Privacy rules in the registers themselves",
      detail:
        "IT.NRW's register tables round to multiples of five and replace small cells with a dot, marked “Wert geheim zu halten”, which means value withheld. A single nationality in a single neighbourhood is exactly the kind of small cell that disappears.",
      example: "The one open exception found: Duisburg's 2013 city report. In Marxloh it counts 1,224 Bulgarians and 1,003 Romanians",
    },
  ] satisfies Rung[],
  verdict:
    "So the honest answer to “draw me a heat map” was no. It would have implied a precision the data can't back. The better answer was to design something that shows the resolution it actually has.",
};

export type Verdict = "held" | "corrected" | "softened" | "removed" | "replaced";

export type Claim = {
  claim: string;
  origin: string;
  verdict: Verdict;
  finding: string;
  source: string;
};

export const audit = {
  eyebrow: "THE AUDIT",
  heading: "Treating AI research as a draft, not a source",
  intro:
    "The Miro boards leaned on research generated by AI. If the board was going to be quoted in official documents, every number needed a primary source behind it. I checked each claim against Destatis, IT.NRW, the Baden-Württemberg statistics office and the cities' own reports.",
  claims: [
    {
      claim: "Over 122,000 Croatians live in Baden-Württemberg",
      origin: "AI research",
      verdict: "held",
      finding:
        "Confirmed at 121,995. The claim was right, it just had no source. Now it does.",
      source: "Statistisches Landesamt Baden-Württemberg, 31.12.2024",
    },
    {
      claim: "Nearly 4,000 Kosovars live in Stuttgart",
      origin: "AI research",
      verdict: "held",
      finding:
        "3,895 Kosovo citizens live in the city, and 28,085 across the six districts of the Stuttgart region, so only about 14% of them live in the city proper.",
      source: "AZR 31.12.2024, relayed by a compiler (tier EST)",
    },
    {
      claim: "~81,000 Romanians in Baden-Württemberg",
      origin: "My first draft of the board",
      verdict: "corrected",
      finding:
        "Wrong by more than half. The state office reports 181,430, which makes Romanians Baden-Württemberg's largest group on this list.",
      source: "Statistisches Landesamt Baden-Württemberg, 31.12.2024",
    },
    {
      claim: "Over 50% of Dortmund's Bulgarians live in Nordstadt",
      origin: "AI research",
      verdict: "softened",
      finding:
        "Press reports roughly 12,000 Romanians and Bulgarians combined in Dortmund, mostly in Nordstadt. The 50% share isn't published anywhere I could find, so the board shows the combined figure and nothing more.",
      source: "NZZ (tier PRESS)",
    },
    {
      claim: "Düsseldorf holds 10.6% of NRW's Albanian and Kosovar diaspora",
      origin: "AI research",
      verdict: "removed",
      finding:
        "No register, IT.NRW table or state office release carries this ranking. NRW's Top 15 table doesn't even list Albania separately. Left out rather than repeated.",
      source: "None found",
    },
    {
      claim: "Target Cologne's Kalk, Chorweiler, Mülheim and Porz districts",
      origin: "AI research",
      verdict: "removed",
      finding:
        "Plausible, and unverifiable: no data on nationality by district exists in the open sources. Removed, with a note to confirm with Cologne's statistics office.",
      source: "None found",
    },
    {
      claim: "Croatian and Serbian tables by state",
      origin: "My first draft of the board",
      verdict: "replaced",
      finding:
        "V1 leaned on Wikipedia for 2014 figures. V2 swapped every one for the current official series, and dropped the rows where no official replacement existed instead of keeping stale numbers.",
      source: "Destatis AZR · IT.NRW Top 15",
    },
  ] satisfies Claim[],
};

export type Tier = "gov" | "press" | "est";

export type SourceKey =
  | "destatis_azr"
  | "itnrw_top15"
  | "statbw_2024"
  | "duisburg13"
  | "nzz"
  | "stz_stg"
  | "dua_stg"
  | "dua_de"
  | "statista_ro"
  | "destatis_nat"
  | "statbw_nat"
  | "itnrw_nat";

export const sources: Record<SourceKey, { name: string; url: string; tier: Tier }> = {
  destatis_azr: {
    name: "Statistisches Bundesamt (Destatis): Ausländische Bevölkerung nach ausgewählten Staatsangehörigkeiten, AZR 2010 bis 2025",
    url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/Tabellen/auslaendische-bevoelkerung-staatsangehoerigkeit-jahre.html",
    tier: "gov",
  },
  itnrw_top15: {
    name: "IT.NRW / Statistik.NRW: Ausländische Bevölkerung nach ausgewählten Staatsangehörigkeiten (Top 15), 31.12.2025",
    url: "https://statistik.nrw/gesellschaft-und-staat/gebiet-und-bevoelkerung/nationalitaet-und-integration/auslaendische-bevoelkerung-nach-ausgewaehlten-staatsangehoerigkeiten-und-geschlecht",
    tier: "gov",
  },
  statbw_2024: {
    name: "Statistisches Landesamt Baden-Württemberg: 2,05 Millionen Ausländerinnen und Ausländer leben in Baden-Württemberg (31.12.2024)",
    url: "https://www.statistik-bw.de/presse/pressemitteilungen/pressemitteilung/205-millionen-auslaenderinnen-und-auslaender-leben-in-baden-wuerttemberg/",
    tier: "gov",
  },
  duisburg13: {
    name: "Stadt Duisburg: Einwohnerentwicklung Duisburg 2013",
    url: "https://www.duisburg.de/vv/medien/dez_i/TI_0114-text.pdf",
    tier: "gov",
  },
  nzz: {
    name: "NZZ: Armutsmigration aus Osteuropa, Dortmunder Nordstadt",
    url: "https://www.nzz.ch/international/armutsmigration-aus-osteuropa-dortmunder-nordstadt-ld.1748783",
    tier: "press",
  },
  stz_stg: {
    name: "Stuttgarter Zeitung: Einwohnerentwicklung in Stuttgart, mehr Kroaten und Italiener zugezogen",
    url: "https://www.stuttgarter-zeitung.de/inhalt.einwohnerentwicklung-in-stuttgart-mehr-kroaten-und-italiener-zugezogen.d080fae7-6508-43f1-bd21-65953c65d97d.html",
    tier: "press",
  },
  dua_stg: {
    name: "dua.com: Albanians in Stuttgart (relaying AZR 31.12.2024)",
    url: "https://www.dua.com/albanians-in-stuttgart/",
    tier: "est",
  },
  dua_de: {
    name: "dua.com: Albaner in Deutschland",
    url: "https://www.dua.com/de/albaner-in-deutschland/",
    tier: "est",
  },
  statista_ro: {
    name: "Statista: Ausländer aus Rumänien in Deutschland (city figures, vintage unconfirmed)",
    url: "https://de.statista.com/statistik/daten/studie/530434/umfrage/auslaender-aus-rumaenien-in-deutschland",
    tier: "est",
  },
  destatis_nat: {
    name: "Destatis: 332 500 Einbürgerungen im Jahr 2025 (3.6.2026)",
    url: "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/06/PD26_186_125.html",
    tier: "gov",
  },
  statbw_nat: {
    name: "Statistisches Landesamt Baden-Württemberg: Fast 40.000 Einbürgerungen im Jahr 2025 (18.5.2026)",
    url: "https://www.statistik-bw.de/leben-und-arbeiten/bevoelkerung-und-gebiet/detail/fast-40000-einbuergerungen-in-baden-wuerttemberg-im-jahr-2025",
    tier: "gov",
  },
  itnrw_nat: {
    name: "IT.NRW: Einbürgerungen in NRW auf höchstem Stand seit 25 Jahren (22.5.2026)",
    url: "https://www.it.nrw/einbuergerungen-nrw-auf-hoechstem-stand-seit-25-jahren-128406",
    tier: "gov",
  },
};

export const tierMeta: Record<Tier, { label: string; blurb: string }> = {
  gov: { label: "GOV", blurb: "Straight from Destatis, IT.NRW, a state statistics office or a city's own report" },
  press: { label: "PRESS", blurb: "A named newspaper citing the register" },
  est: { label: "EST", blurb: "A third party compiler relaying register data; vintage not independently confirmed" },
};

export type Item = {
  name: string;
  value: number;
  year: number;
  level: string;
  note?: string;
  src: SourceKey;
};

export type Natz = { v: string; dir: "up" | "down"; t: string; src: SourceKey };

export type Route = {
  id: string;
  code: string;
  dest: string;
  name: string;
  headline: number;
  headlineLabel: string;
  series: { label: string; pts: [number, number][] };
  states: Item[];
  cities: Item[];
  natz: { items: Natz[]; none?: string };
  caveat: string;
};

export const routes: Route[] = [
  {
    id: "bulgaria",
    code: "SOF",
    dest: "Sofia",
    name: "Bulgarian",
    headline: 421895,
    headlineLabel: "Germany, 31.12.2025 (Destatis/AZR)",
    series: { label: "Bulgarian citizens", pts: [[2022, 429665], [2023, 436860], [2024, 432080], [2025, 421895]] },
    states: [
      { name: "North Rhine-Westphalia", value: 103620, year: 2025, level: "State", src: "itnrw_top15" },
      { name: "Baden-Württemberg", value: 51145, year: 2024, level: "State", src: "statbw_2024" },
    ],
    cities: [
      { name: "Dortmund", value: 12000, year: 2023, level: "City", note: "Romanian and Bulgarian citizens combined, concentrated in Nordstadt", src: "nzz" },
      { name: "Duisburg", value: 4809, year: 2013, level: "City", note: "Bulgarian citizens citywide, from the city's own report, just dated", src: "duisburg13" },
      { name: "Duisburg, Marxloh", value: 1224, year: 2013, level: "Stadtteil", note: "Bulgarian citizens in the Marxloh district", src: "duisburg13" },
    ],
    natz: { items: [], none: "No 2025 naturalisation figure for Bulgarians appears in the Destatis, IT.NRW or Baden-Württemberg releases reviewed." },
    caveat: "National and state totals are current. City level is unchanged: the 2013 Duisburg report is still the only open Stadtteil source.",
  },
  {
    id: "romania",
    code: "OTP",
    dest: "Bucharest",
    name: "Romanian",
    headline: 903770,
    headlineLabel: "Germany, 31.12.2025 (Destatis/AZR)",
    series: { label: "Romanian citizens", pts: [[2022, 883670], [2023, 909795], [2024, 909755], [2025, 903770]] },
    states: [
      { name: "North Rhine-Westphalia", value: 170100, year: 2025, level: "State", src: "itnrw_top15" },
      { name: "Baden-Württemberg", value: 181430, year: 2024, level: "State", src: "statbw_2024" },
    ],
    cities: [
      { name: "Berlin", value: 24264, year: 2023, level: "City", note: "Ranking vintage unconfirmed", src: "statista_ro" },
      { name: "Munich", value: 18845, year: 2023, level: "City", note: "Vintage unconfirmed", src: "statista_ro" },
      { name: "Nuremberg", value: 14903, year: 2023, level: "City", note: "Vintage unconfirmed", src: "statista_ro" },
      { name: "Dortmund", value: 12000, year: 2023, level: "City", note: "Romanian and Bulgarian citizens combined, concentrated in Nordstadt", src: "nzz" },
      { name: "Frankfurt am Main", value: 10451, year: 2023, level: "City", note: "Vintage unconfirmed", src: "statista_ro" },
      { name: "Hamburg", value: 10010, year: 2023, level: "City", note: "Vintage unconfirmed", src: "statista_ro" },
      { name: "Duisburg", value: 5358, year: 2013, level: "City", note: "Romanian citizens citywide", src: "duisburg13" },
      { name: "Duisburg, Marxloh", value: 1003, year: 2013, level: "Stadtteil", note: "Romanian citizens in the Marxloh district", src: "duisburg13" },
    ],
    natz: {
      items: [{ v: "−14%", dir: "down", t: "Romanian naturalisations, Baden-Württemberg, 2025 vs 2024", src: "statbw_nat" }],
      none: "Only a percentage was published for Baden-Württemberg; no absolute count or national or NRW figure was found.",
    },
    caveat: "Baden-Württemberg's 181,430 replaced a rough estimate of about 81,000, and the earlier figure understated it by more than half. City rankings are still relayed via Statista with unconfirmed vintage.",
  },
  {
    id: "kosovo",
    code: "TIA/PRN",
    dest: "Tirana & Pristina",
    name: "Albanian & Kosovar",
    headline: 323260,
    headlineLabel: "Kosovo citizens, Germany, 31.12.2025 (Destatis/AZR)",
    series: { label: "Kosovo citizens", pts: [[2022, 280850], [2023, 299685], [2024, 313615], [2025, 323260]] },
    states: [
      { name: "NRW, Kosovo", value: 72655, year: 2025, level: "State", src: "itnrw_top15" },
      { name: "Baden-Württemberg, Kosovo", value: 89175, year: 2024, level: "State", src: "statbw_2024" },
      { name: "Baden-Württemberg, Albania", value: 19145, year: 2024, level: "State", src: "statbw_2024" },
      { name: "Baden-Württemberg, North Macedonia", value: 30430, year: 2024, level: "State", src: "statbw_2024" },
    ],
    cities: [
      { name: "Region Stuttgart", value: 28085, year: 2024, level: "6 districts", note: "Kosovo citizens across Stuttgart, Rems-Murr, Esslingen, Ludwigsburg, Böblingen and Göppingen. Only 3,895 (13.9%) live in Stuttgart city itself", src: "dua_stg" },
      { name: "Munich", value: 20784, year: 2023, level: "City", note: "Albanian citizens, compiler estimate", src: "dua_de" },
      { name: "Berlin", value: 19372, year: 2023, level: "City", note: "Albanian citizens, compiler estimate", src: "dua_de" },
      { name: "Hamburg", value: 13827, year: 2023, level: "City", note: "Albanian citizens, compiler estimate", src: "dua_de" },
    ],
    natz: {
      items: [
        { v: "6,100", dir: "up", t: "Albanian naturalisations, Germany, 2025 (+97% vs 2024)", src: "destatis_nat" },
        { v: "+111%", dir: "up", t: "Albanian naturalisations, Baden-Württemberg, 2025 vs 2024", src: "statbw_nat" },
        { v: "1,735", dir: "up", t: "Kosovar naturalisations, NRW, 2025", src: "itnrw_nat" },
        { v: "+12%", dir: "up", t: "Kosovar naturalisations, Baden-Württemberg, 2025 vs 2024", src: "statbw_nat" },
      ],
    },
    caveat: "Kosovo has a clean Destatis national figure and an official NRW one. Albania has no standalone entry in NRW's Top 15, so Baden-Württemberg's 19,145 is the only official Albanian number here.",
  },
  {
    id: "serbia",
    code: "BEG",
    dest: "Belgrade",
    name: "Serbian",
    headline: 271285,
    headlineLabel: "Germany, 31.12.2025 (Destatis/AZR)",
    series: { label: "Serbian citizens", pts: [[2022, 263065], [2023, 270750], [2024, 272690], [2025, 271285]] },
    states: [
      { name: "North Rhine-Westphalia", value: 69000, year: 2025, level: "State", src: "itnrw_top15" },
      { name: "Baden-Württemberg (excl. Kosovo)", value: 48050, year: 2024, level: "State", src: "statbw_2024" },
    ],
    cities: [
      { name: "Stuttgart", value: 5668, year: 2020, level: "City", note: "Down from 8,374 in 2010 as part of a declining trend", src: "stz_stg" },
    ],
    natz: {
      items: [
        { v: "1,630", dir: "up", t: "Serbian naturalisations, NRW, 2025", src: "itnrw_nat" },
        { v: "+33%", dir: "up", t: "Serbian naturalisations, Baden-Württemberg, 2025 vs 2024", src: "statbw_nat" },
      ],
    },
    caveat: "The old Bavaria, Hesse and Berlin figures were 2014 Wikipedia numbers. No current official replacement was found, so they're left blank rather than backfilled.",
  },
  {
    id: "croatia",
    code: "ZAD",
    dest: "Zadar",
    name: "Croatian",
    headline: 413480,
    headlineLabel: "Germany, 31.12.2025 (Destatis/AZR)",
    series: { label: "Croatian citizens", pts: [[2022, 436325], [2023, 434045], [2024, 425810], [2025, 413480]] },
    states: [
      { name: "North Rhine-Westphalia", value: 54185, year: 2025, level: "State", src: "itnrw_top15" },
      { name: "Baden-Württemberg", value: 121995, year: 2024, level: "State", src: "statbw_2024" },
    ],
    cities: [],
    natz: { items: [], none: "No 2025 naturalisation figure for Croatians appears in the Destatis, IT.NRW or Baden-Württemberg releases reviewed." },
    caveat: "No verified current Croatian breakdown by city was found; V1's city rows came from Wikipedia alone and were removed. Pforzheim has the highest share of foreign residents of any German city (31.3%), but no count by nationality is published.",
  },
];

export const board = {
  eyebrow: "PLAY WITH IT",
  heading: "The board, live",
  intro:
    "This is the working prototype, rebuilt for this page. Click a route to open it, switch between state and city level, and hover a bar to read its source. Then give it a new skin.",
  skins: [
    { id: "amber", label: "Departures board", note: "The original dark and amber look" },
    { id: "brand", label: "Brand skin", note: "The same board in an organisation's brand palette" },
  ],
  brandSwatches: [
    { hex: "#D41370", name: "Magenta" },
    { hex: "#891B55", name: "Plum" },
    { hex: "#009DC4", name: "Cyan" },
    { hex: "#BCEDF7", name: "Sky" },
    { hex: "#212529", name: "Ink" },
    { hex: "#495057", name: "Slate" },
    { hex: "#CED4DA", name: "Grey" },
    { hex: "#F8F9FA", name: "Paper" },
  ],
  skinNote:
    "A palette with two hues can't give five routes five colours, so routes are separated by shade and each keeps its airport code chip. Source tiers are shapes, not colours, so they read in any skin.",
};

export type Step = { label: string; title: string; body: string };

export const evolution = {
  eyebrow: "PROCESS",
  heading: "Five passes, one idea getting honest",
  steps: [
    {
      label: "V0",
      title: "The bubble map",
      body: "My first answer to “heat map” was a schematic Germany with proportional bubbles. It looked wrong and wasn't interactive. Worse, an outline of the country implied a precision the data didn't have.",
    },
    {
      label: "V1",
      title: "The arrivals board",
      body: "I dropped the map and borrowed the metaphor of the thing the work is about: a departures board. One row per route, numbers that flip like a split flap display, ranked bars that open on click, and a comparison across routes.",
    },
    {
      label: "V2",
      title: "The sourcing pass",
      body: "The numbers had to survive being quoted in official documents. Wikipedia went. Every national and state figure now comes from Destatis, IT.NRW or a state statistics office, and every bar carries a GOV, PRESS or EST tier.",
    },
    {
      label: "V2+",
      title: "Trend and the hidden diaspora",
      body: "Each route gained a 2024→2025 arrow and a trend line from 2022 to 2025, plus a naturalisation note: citizens who naturalise leave the foreigner count but still fly home to visit family, so a flat total can hide a stable market.",
    },
    {
      label: "V3",
      title: "The brand skin",
      body: "A new skin in the organisation's palette to test whether the board could carry a real brand. It could, because colour, shape and type were tokens from the start.",
    },
  ] satisfies Step[],
};

export type Decision = { title: string; body: string };

export const decisions = {
  eyebrow: "DESIGN DECISIONS",
  heading: "Four choices that make the board trustworthy",
  items: [
    {
      title: "Show the gap, don't fill it",
      body: "Where no verified figure exists, the board says so, “No figure at this level clears the bar”, instead of backfilling with an estimate. Croatia has no city rows. That is the finding, not a bug.",
    },
    {
      title: "Tier every number",
      body: "Each bar carries GOV, PRESS or EST, as a shape rather than a colour so it survives any skin. A reader can tell a register figure from a relayed one at a glance, and quote accordingly.",
    },
    {
      title: "Disclose the axis",
      body: "The trend lines are zoomed to show movement and don't start at zero, because 0.5% on a zero axis is invisible. The chart says so beside the data rather than hoping nobody notices.",
    },
    {
      title: "Count who the register can't",
      body: "The naturalisation note exists because a foreigner count only ever shrinks as people become citizens. For a VFR question that's the wrong direction to be blind in.",
    },
  ] satisfies Decision[],
};

export const reflections = {
  eyebrow: "REFLECTIONS",
  heading: "What I took from it",
  lessons: [
    {
      title: "Say no with a better artefact",
      body: "“That data doesn't exist” is a dead end on its own. Paired with a board that shows exactly what does exist, it became a more useful answer than the heat map would have been.",
    },
    {
      title: "AI research is a draft",
      body: "Of seven claims I checked, two held, one was wrong by more than half, one was softened, two couldn't be sourced at all and one rested on Wikipedia. The checking was the work.",
    },
    {
      title: "A caveat is a feature",
      body: "Every route has a “what's missing” note beside its data. It's the part of the board I'd defend first.",
    },
  ],
  next: {
    heading: "What I'd do next",
    items: [
      "Ask Dortmund, Duisburg and Cologne's statistics offices directly for nationality counts by Stadtteil, the only route to the resolution the original ask wanted.",
      "Pull the EST rows straight from the Landesdatenbank NRW and GENESIS tables so every bar is GOV.",
      "Add Bavaria and Hesse, which the state view still lacks.",
      "Lay actual route bookings over the diaspora counts to see where demand and community line up, and where they don't.",
    ],
  },
  dataNote:
    "Figures are citizenship counts from the Ausländerzentralregister, not ethnicity. Naturalised citizens aren't captured, so every total understates the real diaspora.",
};

export const closingCta = {
  heading: "Got a question the data can't answer yet? Let's design around it.",
  cta: "Let's Talk?",
};
