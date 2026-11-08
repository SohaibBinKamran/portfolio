/**
 * Interactions for the ClassQuest case study V2 (ported from the approved artifact).
 *
 * The markup is static (see markup.ts); this file attaches behaviour to it:
 * scroll spy + tracing worksheet rail, the problem section's pinned merge scene,
 * Phase 2 linked highlight, before/after slider, product tabs, flashcard demo,
 * brand interactions and the image lightbox.
 *
 * `initClassQuestV2` returns a cleanup that removes every listener, reverts GSAP
 * and restores the pristine markup, so it is safe under React strict mode and
 * client side navigation.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMG = "/images/classquest/v2/";

type Shot = { s: string; w: number; h: number; t: string; c: string; el?: HTMLImageElement };

const SECTIONS: [string, string][] = [
  ["problem", "Problem"],
  ["method", "Method"],
  ["research", "Research"],
  ["testing", "Testing"],
  ["redesign", "Redesign"],
  ["brand", "Brand"],
  ["product", "Product"],
  ["impact", "Impact"],
  ["guidelines", "Guidelines"],
  ["reflections", "Reflections"],
];

const GUIDELINES: [string, string[]][] = [
  ["Content and contribution", [
    "Consolidate materials, AI output and practice in one course scoped space.",
    "Make the contribution entry point discoverable through multiple paths.",
    "Surface contribution needs on the topic card itself.",
  ]],
  ["AI and micro learning", [
    "Design around retrieval demand, not passive summaries.",
    "Offer differentiated study modes for different goals.",
    "Let students confirm AI extraction before content generation.",
  ]],
  ["Trust and transparency", [
    "Use source citation chips as the default trust mechanism.",
    "Layer trust: chip, explanation, full source excerpt.",
    "Make AI edits and regeneration visible, never silent.",
    "Communicate that AI output is provisional, not authoritative.",
  ]],
  ["Engagement and motivation", [
    "Favor light gamification: streaks and tiers over leaderboards alone.",
    "Use a daily set to make spaced review a habit.",
  ]],
  ["Usability and density", [
    "Reduce density with vertical nav and progressive disclosure.",
    "Use action oriented labels that match user mental models.",
    "Invest deliberately in onboarding the contribute, curate, learn loop.",
  ]],
];

const SCREENS: Shot[][] = [
  [
    { s: "s-sources.jpg", w: 2400, h: 1965, t: "Sources & Wiki", c: "Topics scoped by week, tagged Healthy, Review Due or New." },
    { s: "s-library.jpg", w: 2400, h: 1500, t: "Course Library", c: "Every source stays visible and attributed. Outdated material is flagged, never hidden." },
  ],
  [
    { s: "s-editor.jpg", w: 2400, h: 1558, t: "Wiki Editor with AI Assist", c: "AI tools act only on selected text, never silently." },
    { s: "source-preview.jpg", w: 2400, h: 1833, t: "Source Preview Drawer", c: "One tap from a citation opens the exact excerpt. Chip, then explanation, then full source." },
  ],
  [
    { s: "fmt-flashcard.jpg", w: 1800, h: 1356, t: "Flashcard", c: "Every answer is self rated and opens an Explain & Cite panel." },
    { s: "fmt-mcq.jpg", w: 1800, h: 1322, t: "Multiple choice", c: "Wrong answers explain why, with the source attached." },
    { s: "fmt-cloze.jpg", w: 1800, h: 1176, t: "Cloze", c: "Fill the blank from retrieval, not recognition." },
    { s: "quest-complete.jpg", w: 1600, h: 1000, t: "Quest Complete", c: "A clear summary, not a generic celebration." },
    { s: "progress-dashboard.jpg", w: 1800, h: 2053, t: "Progress Dashboard", c: "Weak spots grouped by topic, not dumped together." },
    { s: "leaderboard.jpg", w: 2000, h: 2186, t: "Leaderboard & Hall of Fame", c: "Silver Division tiers with promotion and relegation, without exposing real identity." },
  ],
];

export function initClassQuestV2(root: HTMLElement, pristineHtml: string): () => void {
  const q = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => r.querySelector(s) as T;
  const qa = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) =>
    Array.prototype.slice.call(r.querySelectorAll(s)) as T[];

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const G = !reduce;
  let alive = true;

  gsap.registerPlugin(ScrollTrigger);

  const offs: Array<() => void> = [];
  const on = <K extends string>(
    target: EventTarget,
    ev: K,
    fn: (e: Event) => void,
    opts?: AddEventListenerOptions | boolean,
  ) => {
    target.addEventListener(ev, fn, opts);
    offs.push(() => target.removeEventListener(ev, fn, opts));
  };
  const vh = () => window.innerHeight;
  const behavior = (): ScrollBehavior => (reduce ? "auto" : "smooth");

  /* in page jumps */
  qa("[data-jump]").forEach((a) =>
    on(a, "click", (e) => {
      e.preventDefault();
      const t = document.getElementById(a.dataset.jump as string);
      if (t) t.scrollIntoView({ behavior: behavior(), block: "start" });
    }),
  );

  /* ---------- rail (tracing worksheet) + mobile menu ---------- */
  const rail = q("#rail");
  const rl = q("ol", rail);
  const mn = q("#mn");
  const fab = q("#fab");
  SECTIONS.forEach((s, i) => {
    const ix = ("0" + (i + 1)).slice(-2);
    rl.insertAdjacentHTML(
      "beforeend",
      '<li><a class="wr" href="#' + s[0] + '" data-s="' + s[0] + '"><span class="hl"></span><span class="gh">' + s[1] +
        '</span><span class="ik" aria-hidden="true">' + s[1] +
        '</span></a><svg class="tk" viewBox="0 0 10 10" aria-hidden="true"><path pathLength="1" d="M1 5.5 3.8 8.6 9 1.2"/></svg></li>',
    );
    mn.insertAdjacentHTML("beforeend", '<a href="#' + s[0] + '" data-s="' + s[0] + '"><span>' + ix + "</span>" + s[1] + "</a>");
  });
  const goto = (e: Event) => {
    const a = (e.target as Element).closest("a[data-s]") as HTMLElement | null;
    if (!a) return;
    e.preventDefault();
    document.getElementById(a.dataset.s as string)?.scrollIntoView({ behavior: behavior(), block: "start" });
    fab.classList.remove("open");
  };
  on(rail, "click", goto);
  on(mn, "click", goto);
  const fabBtn = q("button", fab);
  on(fabBtn, "click", () => {
    const o = fab.classList.toggle("open");
    fabBtn.setAttribute("aria-expanded", String(o));
  });
  rail.insertAdjacentHTML(
    "beforeend",
    '<div class="pcl"><svg width="1" height="1" aria-hidden="true"><g transform="rotate(32)"><path d="M0 0-3.6-9H3.6z" fill="#f0d9b0"/><path d="M0 0-1.2-3H1.2z" fill="#161a2b"/><rect class="pb" x="-3.6" y="-40" width="7.2" height="31" fill="#d9971f"/><rect class="ps" x="-1.2" y="-40" width="2.4" height="31" fill="#eab04a"/><g class="pe"><rect x="-3.6" y="-44" width="7.2" height="4" fill="#a9acb8"/><rect x="-3.6" y="-50" width="7.2" height="6" rx="1.5" fill="#d9786f"/></g></g></svg></div>',
  );
  const secs = SECTIONS.map((s) => document.getElementById(s[0]) as HTMLElement);
  const cta = q(".cta");
  const lis = qa("li", rl);
  const wrs = qa(".wr", rl);
  const pcl = q(".pcl", rail);
  const pb = q(".pb", pcl);
  const ps = q(".ps", pcl);
  const pe = q(".pe", pcl);
  let ticking = false;
  let ptx = 10, pty = 0, px: number | null = null, py: number | null = null, praf = 0;
  let spyRaf = 0;

  const pstep = () => {
    praf = 0;
    const k = reduce ? 1 : 0.2;
    px = (px as number) + (ptx - (px as number)) * k;
    py = (py as number) + (pty - (py as number)) * k;
    if (Math.abs(ptx - px) < 0.2 && Math.abs(pty - py) < 0.2) {
      px = ptx;
      py = pty;
    } else if (alive) praf = requestAnimationFrame(pstep);
    pcl.style.transform = "translate(" + px.toFixed(1) + "px," + py.toFixed(1) + "px)";
  };

  const spy = () => {
    ticking = false;
    if (!alive) return;
    const line = vh() * 0.4;
    let cur = -1, sum = 0;
    const p: number[] = [];
    const tops = secs.map((el) => el.getBoundingClientRect().top);
    secs.forEach((el, i) => {
      const h = i < secs.length - 1 ? tops[i + 1] - tops[i] : el.offsetHeight;
      const v = Math.min(1, Math.max(0, (line - tops[i]) / Math.max(1, h)));
      p.push(v);
      sum += v;
      if (tops[i] <= line) cur = i;
    });
    qa("[data-s]").forEach((a) => a.classList.toggle("on", cur >= 0 && a.dataset.s === SECTIONS[cur][0]));
    const gone = !!cta && cta.getBoundingClientRect().top < vh() * 0.8;
    rail.classList.toggle("gone", gone);
    fab.classList.toggle("gone", gone);
    if (!rail.offsetWidth) return;
    /* keep the rows on the strip's ruled lines (34px pitch) */
    const H = rail.clientHeight;
    const top = Math.max(102, Math.round((H - 34 * SECTIONS.length) / 2 / 34) * 34);
    rl.style.top = top + "px";
    wrs.forEach((w, i) => {
      const qq = Math.min(1, p[i] / 0.3);
      w.style.setProperty("--q", qq.toFixed(3));
      lis[i].classList.toggle("dn", p[i] >= 0.3 && i < cur);
    });
    const i = Math.max(0, cur);
    const qv = cur < 0 ? 0 : Math.min(1, p[cur] / 0.3);
    const gh = q(".gh", wrs[i]);
    ptx = 10 + gh.offsetWidth * qv;
    pty = top + i * 34 + 23;
    if (px === null) {
      px = ptx;
      py = pty;
    }
    const P = sum / secs.length;
    const L = 31 - 20 * P;
    const y0 = -9 - L;
    pb.setAttribute("y", String(y0));
    pb.setAttribute("height", String(L));
    ps.setAttribute("y", String(y0));
    ps.setAttribute("height", String(L));
    pe.setAttribute("transform", "translate(0," + (31 - L) + ")");
    if (!praf) praf = requestAnimationFrame(pstep);
  };
  const queueSpy = () => {
    if (!ticking) {
      ticking = true;
      spyRaf = requestAnimationFrame(spy);
    }
  };
  on(window, "resize", queueSpy);
  on(window, "scroll", queueSpy, { passive: true });
  document.fonts?.ready.then(() => alive && spy());
  spy();

  /* ---------- toast ---------- */
  const tt = q("#toast");
  let tmr: number | undefined;
  const toast = (m: string) => {
    tt.textContent = m;
    tt.classList.add("show");
    window.clearTimeout(tmr);
    tmr = window.setTimeout(() => tt.classList.remove("show"), 1700);
  };

  /* ---------- lightbox ---------- */
  const lb = document.createElement("div");
  lb.className = "zlb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", "Enlarged image");
  lb.innerHTML = '<span class="x">Close &times;</span><div class="lbi"></div>';
  root.appendChild(lb);
  const lbi = q(".lbi", lb);
  const closeLb = () => lb.classList.remove("on");
  on(lb, "click", closeLb);
  on(document, "keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") closeLb();
  });
  const avail = () => ({ w: window.innerWidth - 40, h: window.innerHeight - 80 });
  const openImg = (src: string, w: number, h: number, cx?: number) => {
    const a = avail();
    const s = Math.min(a.w / w, a.h / h, 1.4 * (cx || 1));
    const W = Math.round(w * s), H = Math.round(h * s);
    lbi.style.width = W + "px";
    lbi.style.height = H + "px";
    lbi.innerHTML = "";
    const im = document.createElement("img");
    im.src = src;
    im.alt = "";
    im.style.cssText = "width:" + W + "px;height:" + H + "px";
    lbi.appendChild(im);
    lb.classList.add("on");
  };
  const openCrop = (el: HTMLElement) => {
    const iw = +(el.dataset.iw as string), x = +(el.dataset.x as string), y = +(el.dataset.y as string);
    const w = +(el.dataset.w as string), h = +(el.dataset.h as string), a = avail();
    const s = Math.min(a.w / w, a.h / h, 1.8);
    const W = Math.round(w * s), H = Math.round(h * s);
    lbi.style.width = W + "px";
    lbi.style.height = H + "px";
    lbi.innerHTML = "";
    const im = document.createElement("img");
    im.src = el.dataset.src as string;
    im.alt = "";
    im.style.cssText = "position:absolute;max-width:none;width:" + iw * s + "px;left:" + -x * s + "px;top:" + -y * s + "px";
    lbi.appendChild(im);
    lb.classList.add("on");
  };

  /* ---------- crops ---------- */
  qa(".cp").forEach((el) => {
    const iw = +(el.dataset.iw as string), x = +(el.dataset.x as string), y = +(el.dataset.y as string);
    const w = +(el.dataset.w as string), h = +(el.dataset.h as string);
    el.style.aspectRatio = w + "/" + h;
    const im = document.createElement("img");
    im.src = el.dataset.src as string;
    im.alt = "";
    im.loading = "lazy";
    im.style.width = (iw / w) * 100 + "%";
    im.style.left = (-x / w) * 100 + "%";
    im.style.top = (-y / h) * 100 + "%";
    el.insertBefore(im, el.firstChild);
    const tag = el.querySelector(".tag");
    const par = el.parentNode as HTMLElement;
    if (tag && !par.classList.contains("cpw")) {
      const wrap = document.createElement("div");
      wrap.className = "cpw";
      par.insertBefore(wrap, el);
      wrap.appendChild(tag);
      wrap.appendChild(el);
    } else if (tag) {
      par.insertBefore(tag, el);
    }
    el.classList.add("zoomable");
    on(el, "click", () => openCrop(el));
  });

  /* ---------- lanes svg ---------- */
  {
    const fun = q("#fun"), ln = q("#ln");
    for (let i = 0; i < 7; i++) {
      const y1 = 122 + i * 32.5, y2 = 152 + i * 22;
      fun.insertAdjacentHTML("beforeend", '<path class="fun" pathLength="1" d="M210 ' + y1 + " C 340 " + y1 + " 340 " + y2 + " 470 " + y2 + '"/>');
      ln.insertAdjacentHTML(
        "beforeend",
        '<path class="lane" pathLength="1" d="M470 ' + y2 + ' H 980"/><text class="m" x="480" y="' + (y2 - 6) +
          '" font-size="10" fill="#4b4f66" letter-spacing=".5">P' + (i + 1) + '</text><circle cx="725" cy="' + y2 +
          '" r="4.5" fill="#fff" stroke="#2f5fe0" stroke-width="2.5"/>',
      );
    }
  }

  /* ---------- guidelines accordion ---------- */
  {
    let n = 1;
    const host = q("#gls");
    GUIDELINES.forEach((g, i) => {
      const li = g[1].map((t) => "<li><code>G" + n++ + "</code><span>" + t + "</span></li>").join("");
      host.insertAdjacentHTML(
        "beforeend",
        '<div class="acc' + (i === 0 ? " open" : "") + '"><button type="button" aria-expanded="' + (i === 0) + '">' + g[0] +
          "<em>" + g[1].length + ' guidelines</em><i></i></button><div class="pn"><div><ul class="gl">' + li + "</ul></div></div></div>",
      );
    });
  }
  on(root, "click", (e) => {
    const b = (e.target as Element).closest(".acc>button") as HTMLElement | null;
    if (!b) return;
    const a = b.parentElement as HTMLElement;
    const o = a.classList.toggle("open");
    b.setAttribute("aria-expanded", String(o));
    window.setTimeout(() => alive && ScrollTrigger.refresh(), 450);
  });

  /* ---------- brand: flip cards, swatch copy, tilt ---------- */
  qa(".fl").forEach((f) => {
    on(f, "click", () => f.classList.toggle("on"));
    on(f, "keydown", (e) => {
      const k = (e as KeyboardEvent).key;
      if (k === "Enter" || k === " ") {
        e.preventDefault();
        f.classList.toggle("on");
      }
    });
  });
  qa("#sw button").forEach((b) =>
    on(b, "click", () => {
      const hx = b.dataset.hex as string;
      try {
        navigator.clipboard.writeText(hx).then(
          () => toast("Copied " + hx),
          () => toast(hx + " (copy blocked)"),
        );
      } catch {
        toast(hx + " (copy blocked)");
      }
    }),
  );

  /* ---------- product tabs ---------- */
  const pst = q("#pst"), pt = q("#pt"), pcap = q("#pcap"), thumbs = q("#thumbs");
  let tab = 0, idx = 0;
  pst.classList.add("zoomable");
  on(pst, "click", () => {
    const o = SCREENS[tab][idx];
    openImg(IMG + o.s, o.w, o.h, 1.3);
  });
  SCREENS.forEach((g, ti) =>
    g.forEach((o, i) => {
      const im = document.createElement("img");
      im.src = IMG + o.s;
      im.width = o.w;
      im.height = o.h;
      im.alt = o.t;
      im.loading = ti === 0 && i === 0 ? "eager" : "lazy";
      o.el = im;
      pst.appendChild(im);
    }),
  );
  const show = () => {
    const it = SCREENS[tab][idx];
    SCREENS.forEach((g) => g.forEach((o) => o.el?.classList.toggle("on", o === it)));
    pt.textContent = it.t;
    pcap.textContent = it.c;
    thumbs.innerHTML = "";
    SCREENS[tab].forEach((o, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "th2";
      b.setAttribute("aria-current", String(i === idx));
      b.innerHTML = '<img src="' + IMG + o.s + '" alt="" loading="lazy"><span>' + o.t + "</span>";
      b.addEventListener("click", () => {
        idx = i;
        show();
      });
      thumbs.appendChild(b);
    });
  };
  qa(".tab").forEach((b) =>
    on(b, "click", () => {
      tab = +(b.dataset.tab as string);
      idx = 0;
      qa(".tab").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
      show();
    }),
  );
  show();

  /* ---------- flashcard demo ---------- */
  {
    const fc = q("#fc"), rt = q("#rt"), rh = q("#rh"), ec = q("#ec"), stk = q("#stk"), pgi = q("#pgi"), rs = q("#rs"), app = q("#app");
    const btns = qa<HTMLButtonElement>("button", rt);
    let flipped = false, rated = false;
    const flip = () => {
      if (rated) return;
      flipped = !flipped;
      fc.classList.toggle("flip", flipped);
      btns.forEach((b) => (b.disabled = !flipped));
      rh.textContent = flipped ? "Select one to continue" : "Flip the card first";
    };
    on(fc, "click", flip);
    on(document, "keydown", (e) => {
      const a = document.activeElement as HTMLElement | null;
      const tag = a ? a.tagName : "";
      if ((e as KeyboardEvent).code !== "Space" || tag === "BUTTON" || tag === "INPUT" || (a && a.isContentEditable)) return;
      if (app.matches(":hover")) {
        e.preventDefault();
        flip();
      }
    });
    btns.forEach((b) =>
      on(b, "click", () => {
        if (rated) return;
        rated = true;
        btns.forEach((x) => {
          x.disabled = true;
          x.classList.toggle("sel", x === b);
        });
        ec.classList.add("show");
        stk.textContent = "2 to keep streak";
        pgi.style.width = "66%";
        rh.textContent = "Logged. The source is attached below.";
        rs.hidden = false;
      }),
    );
    on(rs, "click", () => {
      rated = false;
      flipped = false;
      fc.classList.remove("flip");
      ec.classList.remove("show");
      btns.forEach((x) => {
        x.disabled = true;
        x.classList.remove("sel");
      });
      rh.textContent = "Flip the card first";
      stk.textContent = "3 to keep streak";
      pgi.style.width = "33%";
      rs.hidden = true;
    });
  }

  /* ---------- Phase 2 linked highlight ---------- */
  const finds = qa("#finds .fd"), lyD = q("#lyD"), lyC = q("#lyC");
  let act = -1;
  const pinsOn = (k: string) => qa(".pin").forEach((p) => p.classList.toggle("on", p.dataset.k === k));
  const activate = (i: number, force?: boolean) => {
    if (i === act && !force) return;
    act = i;
    const f = finds[i], l = f.dataset.l;
    const x = parseFloat(f.dataset.x as string), y = parseFloat(f.dataset.y as string), s = parseFloat(f.dataset.s as string) || 1;
    finds.forEach((el, j) => el.classList.toggle("on", j === i));
    lyD.classList.toggle("on", l === "D");
    lyC.classList.toggle("on", l === "C");
    pinsOn(f.dataset.x ? (f.dataset.k as string) : "");
    const zm = q(".zm", l === "C" ? lyC : lyD), other = q(".zm", l === "C" ? lyD : lyC);
    const W = zm.offsetWidth, H = zm.offsetHeight;
    let tx = 0, ty = 0, sc = 1;
    if (f.dataset.x) {
      sc = s;
      tx = W / 2 - (x / 100) * W * sc;
      ty = H / 2 - (y / 100) * H * sc;
      tx = Math.min(0, Math.max(W - W * sc, tx));
      ty = Math.min(0, Math.max(H - H * sc, ty));
    }
    if (!reduce) {
      gsap.to(zm, { x: tx, y: ty, scale: sc, duration: 0.9, ease: "power3.out", overwrite: true });
      gsap.to(other, { x: 0, y: 0, scale: 1, duration: 0.6, overwrite: true });
    } else {
      zm.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + sc + ")";
    }
  };
  finds.forEach((f, i) => {
    on(f, "mouseenter", () => activate(i));
    on(f, "click", () => activate(i));
  });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && activate(finds.indexOf(en.target as HTMLElement))),
      { rootMargin: "-38% 0px -50% 0px" },
    );
    finds.forEach((f) => io.observe(f));
    offs.push(() => io.disconnect());
  }
  /* re-aim the zoom when the layout changes width */
  let lastW = window.innerWidth;
  on(window, "resize", () => {
    if (window.innerWidth !== lastW) {
      lastW = window.innerWidth;
      if (act >= 0) activate(act, true);
    }
  });

  /* ---------- compare slider ---------- */
  const cmp = q("#cmp"), range = q<HTMLInputElement>("input", cmp), cur = q("#cur");
  const setP = (v: number | string) => cmp.style.setProperty("--p", v + "%");
  on(range, "input", () => setP(range.value));
  setP(50);
  on(cmp, "mouseenter", () => fine && cmp.classList.add("hov"));
  on(cmp, "mouseleave", () => cmp.classList.remove("hov"));
  on(cmp, "mousemove", (e) => {
    const r = cmp.getBoundingClientRect(), m = e as MouseEvent;
    cur.style.transform = "translate(" + (m.clientX - r.left) + "px," + (m.clientY - r.top) + "px)";
  });

  /* ---------- scroll animations ---------- */
  const ctx = gsap.context(() => {
    activate(0, true);
    if (!G) return;
    const fmt = (v: number, d: number) => (d ? v.toFixed(d) : String(Math.round(v)));

    /* count up */
    qa("[data-to]").forEach((el) => {
      const to = parseFloat(el.dataset.to as string), d = +(el.dataset.dec as string) || 0, o = { v: 0 };
      el.textContent = fmt(0, d);
      ScrollTrigger.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: () => gsap.to(o, { v: to, duration: 1.5, ease: "power2.out", onUpdate: () => { el.textContent = fmt(o.v, d); } }),
      });
    });
    /* bars */
    qa(".pb i").forEach((i) => gsap.fromTo(i, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: i, start: "top 94%", once: true } }));
    /* lanes */
    gsap.fromTo("#lanes .fun", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", stagger: 0.07, scrollTrigger: { trigger: "#lanes", start: "top 75%", once: true } });
    gsap.fromTo("#lanes .lane", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.09, delay: 0.5, scrollTrigger: { trigger: "#lanes", start: "top 75%", once: true } });
    /* ring + scale marker */
    gsap.fromTo("#ring", { strokeDashoffset: 1 }, { strokeDashoffset: 0.102, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: "#ring", start: "top 92%", once: true } });
    gsap.fromTo("#scale .rg", { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#scale", start: "top 92%", once: true } });
    gsap.fromTo("#scale .mk", { left: "0%" }, { left: "81.4%", duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: "#scale", start: "top 92%", once: true } });

    /* hero frame scroll */
    const hf = q("#hf"), hfi = q("#hfi");
    const hfTop = () => hf.getBoundingClientRect().top + window.scrollY;
    gsap.fromTo(hfi, { y: 0 }, {
      y: () => -Math.max(0, hfi.offsetHeight - hf.offsetHeight), ease: "none",
      scrollTrigger: { trigger: hf, start: () => Math.max(0, hfTop() - vh() * 0.55), end: () => hfTop() + hf.offsetHeight * 0.55, scrub: 0.6, invalidateOnRefresh: true },
    });

    /* problem convergence: the section pins with CSS sticky, the timeline is scrubbed by scroll */
    const cv = q("#cv"), tools = qa(".tool", cv), lk = q(".lockc", cv), cnt = q("#cvn"), pw = q("#pinw");
    pw.classList.add("pn");
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: pw, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: (s) => {
          cv.classList.toggle("merged", s.progress > 0.9);
          if (cnt) cnt.textContent = Math.min(5, Math.round(s.progress * 5.2)) + " of 5 merged";
        },
      },
    });
    tools.forEach((t2, i) => {
      const d = +(q(".in", t2).dataset.d as string) || 18, start = i * 0.07, dur = 0.5 + d / 80;
      tl.to(t2, {
        x: () => lk.offsetLeft - (t2.offsetLeft + t2.offsetWidth / 2),
        y: () => lk.offsetTop - (t2.offsetTop + t2.offsetHeight / 2),
        rotation: 0, scale: 0.42, duration: dur, ease: "power1.in",
      }, start);
      tl.to(t2, { opacity: 0, duration: 0.18, ease: "power1.in" }, start + dur - 0.18);
    });
    tl.fromTo(lk, { scale: 0.94, boxShadow: "0 30px 60px -28px rgba(47,95,224,.35)" }, { scale: 1.04, boxShadow: "0 30px 80px -20px rgba(47,95,224,.85)", duration: 1, ease: "power1.inOut" }, 0).to(lk, { scale: 1, duration: 0.2 }, ">");

    /* slider auto sweep, once */
    const sw = { v: 50 };
    const up = () => {
      range.value = String(sw.v);
      setP(sw.v);
    };
    ScrollTrigger.create({
      trigger: cmp, start: "top 70%", once: true,
      onEnter: () => {
        gsap.timeline().to(sw, { v: 14, duration: 1.1, ease: "power2.inOut", onUpdate: up }).to(sw, { v: 86, duration: 1.5, ease: "power2.inOut", onUpdate: up }).to(sw, { v: 50, duration: 0.9, ease: "power2.out", onUpdate: up });
      },
    });

    /* brand cap tilt */
    if (fine) {
      const bp = q("#bp"), capb = q("#capb");
      const rx = gsap.quickTo(capb, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(capb, "rotationY", { duration: 0.6, ease: "power3.out" });
      on(bp, "mousemove", (e) => {
        const r = bp.getBoundingClientRect(), m = e as MouseEvent;
        const fx = (m.clientX - r.left) / r.width, fy = (m.clientY - r.top) / r.height;
        ry((fx - 0.5) * 40);
        rx(-(fy - 0.5) * 30);
        bp.style.setProperty("--mx", fx * 100 + "%");
        bp.style.setProperty("--my", fy * 100 + "%");
      });
      on(bp, "mouseleave", () => {
        ry(0);
        rx(0);
      });
    }
  }, root);

  /* layout settles after fonts and images; ScrollTrigger needs to re-measure */
  const refresh = () => alive && ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  on(window, "load", refresh);
  const t1 = window.setTimeout(refresh, 600);

  return () => {
    alive = false;
    cancelAnimationFrame(praf);
    cancelAnimationFrame(spyRaf);
    window.clearTimeout(tmr);
    window.clearTimeout(t1);
    offs.forEach((f) => f());
    ctx.revert();
    root.innerHTML = pristineHtml;
  };
}
