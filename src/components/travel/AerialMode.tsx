"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { places, type Place } from "@/data/places";
import { photography } from "@/data/photography";

/**
 * "Aerial Mode" — a WebGL globe of every place visited, opened from the
 * button on /travel-photography. Pins are real coordinates (no artificial
 * spreading — a prior version nudged tightly-clustered pins apart and it
 * once pushed Lahore's dot across the India border, so every pin here sits
 * at its exact true lat/lon, full stop). Clicking one opens a slideshow of
 * that city's real photos where they exist, or an honest "none yet" state
 * where they don't — most of these 23 places aren't photographed yet.
 */

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 2.6 4.2 5.8 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.8-4.2-9S9.2 5.6 12 3Z" />
    </svg>
  );
}

export function AerialMode() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-sans text-[13px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
      >
        <GlobeIcon />
        Aerial Mode
      </button>
      {open && <GlobeOverlay onClose={() => setOpen(false)} />}
    </>
  );
}

function GlobeOverlay({ onClose }: { onClose: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const [activePlace, setActivePlace] = useState<Place | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const activePlaceRef = useRef(activePlace);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    activePlaceRef.current = activePlace;
  }, [activePlace]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const stageEl = stageRef.current;
    const labelsEl = labelsRef.current;
    if (!stageEl || !labelsEl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 220);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Modern three.js's colour-managed pipeline renders the same texture
    // noticeably flatter than the prototype's older, naive one did — a
    // real rendering difference, not a mistake in the texture or lights.
    // A CSS filter on the canvas is the reliable fix: it punches the
    // output back up regardless of which internal colour space produced it.
    renderer.domElement.style.filter = "saturate(1.55) contrast(1.08) brightness(1.04)";
    stageEl.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const LAND_RADIUS = 4.0;
    const PIN_RADIUS = 4.12;

    const earthGeo = new THREE.SphereGeometry(LAND_RADIUS, 64, 44);
    const earthMat = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/images/earth-texture.jpg"),
      shininess: 10,
      specular: 0x223344,
    });
    group.add(new THREE.Mesh(earthGeo, earthMat));

    const wireGeo = new THREE.SphereGeometry(LAND_RADIUS * 1.004, 24, 16);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.045 });
    group.add(new THREE.Mesh(wireGeo, wireMat));

    const glowGeo = new THREE.SphereGeometry(LAND_RADIUS * 1.045, 32, 22);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x5ea8e0, transparent: true, opacity: 0.1, side: THREE.BackSide });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    scene.add(new THREE.AmbientLight(0x7d8ba3, 1.3));
    const sun = new THREE.DirectionalLight(0xfff3e0, 1.65);
    sun.position.set(6, 3.5, 5);
    scene.add(sun);

    // ------------------------------------------------------------- sky --
    // Twinkling stars, a drifting galactic band, and the occasional
    // shooting star — sits in its own group (not `group`, which the pins
    // and Earth live in) so dragging the globe never drags the sky with
    // it. Everything here is procedural, not a texture, so no extra asset.
    const skyGroup = new THREE.Group();
    scene.add(skyGroup);

    function randomOnSphere(radius: number) {
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    }

    function makeGlowTexture(hex: string) {
      const s = 32;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, hex);
      g.addColorStop(0.4, hex.replace("1)", "0.75)"));
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    }
    const starTex = makeGlowTexture("rgba(255,255,255,1)");

    const starLayers: { mesh: THREE.Points; phase: number; speed: number }[] = [];
    for (let L = 0; L < 4; L++) {
      const starPositions: THREE.Vector3[] = [];
      for (let si = 0; si < 260; si++) starPositions.push(randomOnSphere(55 + Math.random() * 35));
      const starGeo = new THREE.BufferGeometry().setFromPoints(starPositions);
      const starMat = new THREE.PointsMaterial({
        map: starTex, size: 0.45 + Math.random() * 0.55, color: 0xffffff,
        transparent: true, depthWrite: false, sizeAttenuation: true, opacity: 0.6,
      });
      const starPts = new THREE.Points(starGeo, starMat);
      skyGroup.add(starPts);
      starLayers.push({ mesh: starPts, phase: Math.random() * Math.PI * 2, speed: 0.35 + Math.random() * 0.5 });
    }

    // a soft galactic band — points biased toward a tilted plane, denser
    // at the centre, fading toward the edges
    const galaxyPositions: THREE.Vector3[] = [];
    const galaxyColors: number[] = [];
    const planeNormal = new THREE.Vector3(0.35, 0.9, -0.25).normalize();
    const bandHalf = 0.3;
    let galTries = 0;
    while (galaxyPositions.length < 900 && galTries < 30000) {
      galTries++;
      const gp = randomOnSphere(68 + Math.random() * 22);
      const angle = Math.asin(Math.max(-1, Math.min(1, gp.clone().normalize().dot(planeNormal))));
      const aAbs = Math.abs(angle);
      if (aAbs > bandHalf) continue;
      const edgeFalloff = 1 - aAbs / bandHalf;
      if (Math.random() > edgeFalloff * 0.85 + 0.05) continue;
      galaxyPositions.push(gp);
      const tint = Math.random();
      const col = tint < 0.5
        ? new THREE.Color(0x9c8cff).lerp(new THREE.Color(0xffffff), Math.random())
        : new THREE.Color(0x5e45ff).lerp(new THREE.Color(0xc5ff52), Math.random() * 0.3);
      galaxyColors.push(col.r, col.g, col.b);
    }
    const galGeo = new THREE.BufferGeometry().setFromPoints(galaxyPositions);
    galGeo.setAttribute("color", new THREE.Float32BufferAttribute(galaxyColors, 3));
    const galMat = new THREE.PointsMaterial({
      map: starTex, size: 0.5, vertexColors: true, transparent: true,
      opacity: 0.55, depthWrite: false, sizeAttenuation: true,
    });
    skyGroup.add(new THREE.Points(galGeo, galMat));

    // a small pool of shooting stars — short fading streaks fired on a
    // random interval so no two look choreographed
    type ShootingStar = {
      line: THREE.Line; active: boolean; born: number; life: number;
      pos: THREE.Vector3; vel: THREE.Vector3; nextSpawn: number;
    };
    const shootingStars: ShootingStar[] = [];
    for (let sc = 0; sc < 2; sc++) {
      const shootGeo = new THREE.BufferGeometry();
      shootGeo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(6), 3));
      shootGeo.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(6), 3));
      const shootMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0 });
      const shootLine = new THREE.Line(shootGeo, shootMat);
      shootLine.visible = false;
      skyGroup.add(shootLine);
      shootingStars.push({
        line: shootLine, active: false, born: 0, life: 0,
        pos: new THREE.Vector3(), vel: new THREE.Vector3(),
        nextSpawn: performance.now() + Math.random() * 4000,
      });
    }

    function spawnShootingStar(star: ShootingStar) {
      const start = randomOnSphere(58 + Math.random() * 10);
      const dir = new THREE.Vector3(Math.random() - 0.5, -(0.4 + Math.random() * 0.4), Math.random() - 0.5).normalize();
      star.pos.copy(start);
      star.vel.copy(dir).multiplyScalar(26 + Math.random() * 14);
      star.life = 0.7 + Math.random() * 0.5;
      star.born = performance.now();
      star.active = true;
      star.line.visible = true;
    }

    const SHOOT_HEAD = new THREE.Color(0xffffff);
    const SHOOT_TAIL = new THREE.Color(0x0d0d0d);
    function updateShootingStars(now: number) {
      shootingStars.forEach((star) => {
        if (!star.active) {
          if (now >= star.nextSpawn) spawnShootingStar(star);
          return;
        }
        const age = (now - star.born) / 1000;
        if (age >= star.life) {
          star.active = false;
          star.line.visible = false;
          star.nextSpawn = now + 2500 + Math.random() * 6000;
          return;
        }
        const dt = Math.min(0.05, 1 / 60);
        star.pos.addScaledVector(star.vel, dt);
        const tail = star.pos.clone().addScaledVector(star.vel, -0.045);
        const posAttr = star.line.geometry.attributes.position;
        posAttr.setXYZ(0, star.pos.x, star.pos.y, star.pos.z);
        posAttr.setXYZ(1, tail.x, tail.y, tail.z);
        posAttr.needsUpdate = true;
        const colAttr = star.line.geometry.attributes.color;
        colAttr.setXYZ(0, SHOOT_HEAD.r, SHOOT_HEAD.g, SHOOT_HEAD.b);
        colAttr.setXYZ(1, SHOOT_TAIL.r, SHOOT_TAIL.g, SHOOT_TAIL.b);
        colAttr.needsUpdate = true;
        (star.line.material as THREE.LineBasicMaterial).opacity = Math.max(0, 1 - age / star.life);
      });
    }

    // trips — thin bowed lines between cities on the same trip
    const tripGroups: Record<string, Place[]> = {};
    places.forEach((p) => {
      if (!p.trip) return;
      (tripGroups[p.trip] ??= []).push(p);
    });
    const tripMat = new THREE.LineBasicMaterial({ color: 0xc5ff52, transparent: true, opacity: 0.28 });
    Object.values(tripGroups).forEach((group_) => {
      for (let i = 0; i < group_.length - 1; i++) {
        const a = latLonToVector3(group_[i].lat, group_[i].lon, PIN_RADIUS);
        const b = latLonToVector3(group_[i + 1].lat, group_[i + 1].lon, PIN_RADIUS);
        const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(PIN_RADIUS * 1.14);
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(16));
        group.add(new THREE.Line(geo, tripMat));
      }
    });

    // pins — small red beacons, each blinking on its own phase
    function makeDotTexture(hex: string) {
      const s = 64;
      const c = document.createElement("canvas");
      c.width = c.height = s;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, hex);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    }
    const pinDotTex = makeDotTexture("rgba(255,49,49,1)");
    const PIN_SCALE = 0.22;
    const PIN_HOVER_SCALE = 0.42;
    type PinSprite = THREE.Sprite & {
      userData: {
        place: Place;
        baseScale: number;
        blinkPhase: number;
        blinkSpeed: number;
        label: HTMLDivElement;
        photoCount: number;
      };
    };
    const pins: PinSprite[] = [];
    places.forEach((place) => {
      const pos = latLonToVector3(place.lat, place.lon, PIN_RADIUS);
      const photoCount = photography.filter((ph) => ph.location === place.city).length;
      const spriteMat = new THREE.SpriteMaterial({ map: pinDotTex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(spriteMat) as PinSprite;
      sprite.position.copy(pos);
      sprite.scale.set(PIN_SCALE, PIN_SCALE, 1);
      sprite.userData = {
        place, baseScale: PIN_SCALE, photoCount,
        blinkPhase: Math.random() * Math.PI * 2,
        blinkSpeed: 1.6 + Math.random() * 1.1,
        label: document.createElement("div"),
      };
      group.add(sprite);
      pins.push(sprite);

      const stalkGeo = new THREE.BufferGeometry().setFromPoints([
        latLonToVector3(place.lat, place.lon, LAND_RADIUS),
        pos,
      ]);
      const stalkMat = new THREE.LineBasicMaterial({ color: 0xff3131, transparent: true, opacity: 0.45 });
      group.add(new THREE.Line(stalkGeo, stalkMat));

      const label = sprite.userData.label;
      label.className = "aerial-pin-label";
      label.textContent = photoCount > 0 ? `${place.city} · ${photoCount}` : place.city;
      labelsEl.appendChild(label);
    });

    // country labels — persistent, anchored at the average of that
    // country's pins
    const countryGroups: Record<string, Place[]> = {};
    places.forEach((p) => {
      (countryGroups[p.country] ??= []).push(p);
    });
    const countryAnchors: { anchor: THREE.Vector3; label: HTMLDivElement }[] = [];
    Object.entries(countryGroups).forEach(([country, members]) => {
      const sum = new THREE.Vector3();
      members.forEach((p) => sum.add(latLonToVector3(p.lat, p.lon, PIN_RADIUS)));
      const anchor = sum.multiplyScalar(1 / members.length).normalize().multiplyScalar(PIN_RADIUS * 1.24);
      const label = document.createElement("div");
      label.className = "aerial-country-label";
      label.textContent = country;
      labelsEl.appendChild(label);
      countryAnchors.push({ anchor, label });
    });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // drag rotate + momentum
    let dragging = false;
    let dragMoved = false;
    let lastX = 0, lastY = 0;
    let velX = 0, velY = 0;
    const autoSpin = 0.00045;

    function onDown(x: number, y: number) {
      dragging = true; dragMoved = false; lastX = x; lastY = y; velX = 0; velY = 0;
      stageEl!.style.cursor = "grabbing";
    }
    function onMove(x: number, y: number) {
      if (!dragging) return;
      const dx = x - lastX, dy = y - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
      velX = dx * 0.0042; velY = dy * 0.0042;
      group.rotation.y += velX;
      group.rotation.x += velY;
      group.rotation.x = Math.max(-1.05, Math.min(1.05, group.rotation.x));
      lastX = x; lastY = y;
    }
    function onUp() {
      dragging = false;
      stageEl!.style.cursor = "grab";
    }
    stageEl.style.cursor = "grab";
    const onPointerDown = (e: PointerEvent) => onDown(e.clientX, e.clientY);
    const onPointerMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    stageEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onUp);

    // wheel zoom (desktop)
    let camDist = camera.position.z;
    let camTargetDist = camDist;
    const ZOOM_MIN = 6.2, ZOOM_MAX = 22;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camTargetDist = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, camTargetDist + e.deltaY * 0.012));
    };
    stageEl.addEventListener("wheel", onWheel, { passive: false });

    // pinch zoom (touch) — Pointer Events cover single-finger drag-to-rotate
    // above, but a second simultaneous touch needs tracking of its own: the
    // distance between the two active pointers scales camTargetDist the
    // same way the wheel does.
    const activeTouches = new Map<number, { x: number; y: number }>();
    let pinchStartDist = 0;
    let pinchStartCamDist = camTargetDist;
    const onTouchStart = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activeTouches.size === 2) {
        dragging = false;
        const [a, b] = Array.from(activeTouches.values());
        pinchStartDist = Math.hypot(a.x - b.x, a.y - b.y);
        pinchStartCamDist = camTargetDist;
      }
    };
    const onTouchMove = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || !activeTouches.has(e.pointerId)) return;
      activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activeTouches.size === 2) {
        const [a, b] = Array.from(activeTouches.values());
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinchStartDist > 0) {
          const scale = pinchStartDist / Math.max(dist, 1);
          camTargetDist = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, pinchStartCamDist * scale));
        }
      }
    };
    const onTouchEnd = (e: PointerEvent) => {
      activeTouches.delete(e.pointerId);
      pinchStartDist = 0;
    };
    stageEl.addEventListener("pointerdown", onTouchStart);
    window.addEventListener("pointermove", onTouchMove);
    window.addEventListener("pointerup", onTouchEnd);
    window.addEventListener("pointercancel", onTouchEnd);

    // raycast + hover + click
    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();
    let hoveredPin: PinSprite | null = null;

    function updateMouseNdc(x: number, y: number) {
      const r = renderer.domElement.getBoundingClientRect();
      mouseNdc.x = ((x - r.left) / r.width) * 2 - 1;
      mouseNdc.y = -((y - r.top) / r.height) * 2 + 1;
    }
    const onHoverMove = (e: PointerEvent) => {
      updateMouseNdc(e.clientX, e.clientY);
      if (dragging) return;
      raycaster.setFromCamera(mouseNdc, camera);
      const hits = raycaster.intersectObjects(pins);
      const next = (hits.length ? hits[0].object : null) as PinSprite | null;
      if (next !== hoveredPin) {
        if (hoveredPin) { hoveredPin.userData.baseScale = PIN_SCALE; hoveredPin.userData.label.classList.remove("show"); }
        hoveredPin = next;
        if (hoveredPin) hoveredPin.userData.baseScale = PIN_HOVER_SCALE;
        stageEl.style.cursor = hoveredPin ? "pointer" : dragging ? "grabbing" : "grab";
      }
    };
    window.addEventListener("pointermove", onHoverMove);

    const onClick = () => {
      if (dragMoved) return;
      raycaster.setFromCamera(mouseNdc, camera);
      const hits = raycaster.intersectObjects(pins);
      if (hits.length) setActivePlace((hits[0].object as PinSprite).userData.place);
    };
    stageEl.addEventListener("pointerup", onClick);

    // animate
    let raf = 0;
    const v3 = new THREE.Vector3();
    function updateLabels() {
      pins.forEach((sprite) => {
        sprite.getWorldPosition(v3);
        const screen = v3.clone().project(camera);
        const facing = v3.clone().normalize().dot(camera.position.clone().normalize()) > 0.15;
        const label = sprite.userData.label;
        if (sprite === hoveredPin && facing) {
          label.style.left = `${(screen.x * 0.5 + 0.5) * window.innerWidth}px`;
          label.style.top = `${(-screen.y * 0.5 + 0.5) * window.innerHeight}px`;
          label.classList.add("show");
        } else {
          label.classList.remove("show");
        }
      });
      countryAnchors.forEach((c) => {
        const world = c.anchor.clone().applyMatrix4(group.matrixWorld);
        const screen = world.clone().project(camera);
        const facing = world.clone().normalize().dot(camera.position.clone().normalize()) > 0.2;
        if (facing) {
          c.label.style.left = `${(screen.x * 0.5 + 0.5) * window.innerWidth}px`;
          c.label.style.top = `${(-screen.y * 0.5 + 0.5) * window.innerHeight}px`;
          c.label.classList.add("show");
        } else {
          c.label.classList.remove("show");
        }
      });
    }

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = performance.now() / 1000;
      if (!dragging && !pausedRef.current && !activePlaceRef.current) {
        group.rotation.y += autoSpin;
        if (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001) {
          velX *= 0.94; velY *= 0.94;
          group.rotation.y += velX;
          group.rotation.x += velY;
        }
      }
      camDist += (camTargetDist - camDist) * 0.12;
      camera.position.z = camDist;

      pins.forEach((m) => {
        const target = m.userData.baseScale;
        m.scale.x += (target - m.scale.x) * 0.2;
        m.scale.y += (target - m.scale.y) * 0.2;
        if (m === hoveredPin) {
          (m.material as THREE.SpriteMaterial).opacity = 1;
        } else {
          const blink = 0.5 + 0.5 * Math.sin(t * m.userData.blinkSpeed + m.userData.blinkPhase);
          (m.material as THREE.SpriteMaterial).opacity = 0.42 + blink * 0.58;
        }
      });
      updateLabels();

      skyGroup.rotation.y += 0.00006;
      starLayers.forEach((l) => {
        (l.mesh.material as THREE.PointsMaterial).opacity = 0.32 + 0.34 * (0.5 + 0.5 * Math.sin(t * l.speed + l.phase));
      });
      updateShootingStars(performance.now());

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onHoverMove);
      stageEl.removeEventListener("pointerdown", onPointerDown);
      stageEl.removeEventListener("wheel", onWheel);
      stageEl.removeEventListener("pointerup", onClick);
      stageEl.removeEventListener("pointerdown", onTouchStart);
      window.removeEventListener("pointermove", onTouchMove);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      pins.forEach((p) => p.userData.label.remove());
      countryAnchors.forEach((c) => c.label.remove());
      renderer.dispose();
      earthMat.map?.dispose();
      earthMat.dispose();
      pinDotTex.dispose();
      starTex.dispose();
      if (renderer.domElement.parentElement === stageEl) stageEl.removeChild(renderer.domElement);
    };
  }, []);

  const activePhotos = activePlace ? photography.filter((p) => p.location === activePlace.city) : [];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (activePlace) { setActivePlace(null); setSlideIndex(0); }
        else onClose();
      }
      if (activePlace && activePhotos.length > 1) {
        if (e.key === "ArrowRight") setSlideIndex((i) => (i + 1) % activePhotos.length);
        if (e.key === "ArrowLeft") setSlideIndex((i) => (i - 1 + activePhotos.length) % activePhotos.length);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePlace, activePhotos.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0d0d0d]">
      <div ref={stageRef} className="absolute inset-0 touch-none" />
      <div ref={labelsRef} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-7 flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to Travel & Photography"
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-serif text-[19px] text-white">Aerial Mode</span>
          </div>
          <span className="ml-11 font-sans text-[11px] uppercase tracking-[0.14em] text-white/45">
            Everywhere I&rsquo;ve been
          </span>
        </div>
        <div className="absolute right-8 top-7 flex gap-6 text-right">
          <div>
            <div className="font-mono text-xl text-[#c5ff52]">
              {new Set(places.map((p) => p.country)).size}
            </div>
            <div className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/45">Countries</div>
          </div>
          <div>
            <div className="font-mono text-xl text-[#c5ff52]">{places.length}</div>
            <div className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/45">Cities</div>
          </div>
          <div>
            <div className="font-mono text-xl text-[#c5ff52]">{photography.length}</div>
            <div className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/45">Frames</div>
          </div>
        </div>
        <div className="absolute bottom-7 left-0 right-0 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Resume rotation" : "Pause rotation"}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            {paused ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l15 8-15 8V4z" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
            )}
          </button>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-white/55 backdrop-blur-md">
            DRAG TO ROTATE &middot; SCROLL / PINCH TO ZOOM &middot; CLICK A PIN
          </div>
        </div>
      </div>

      {activePlace && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/72 p-8"
          onClick={(e) => { if (e.target === e.currentTarget) { setActivePlace(null); setSlideIndex(0); } }}
        >
          <div className="max-h-[82vh] w-full max-w-[560px] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#121212]">
            <div className="relative border-b border-white/[0.08] px-8 py-7">
              <button
                type="button"
                onClick={() => { setActivePlace(null); setSlideIndex(0); }}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
              <div className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#c5ff52]">
                {activePlace.country}
              </div>
              <div className="mt-2.5 font-serif text-[34px] text-white">{activePlace.city}</div>
              <div className="mt-1 font-mono text-xs text-white/40">
                {activePhotos.length > 0 ? `${slideIndex + 1} / ${activePhotos.length}` : "No photos yet"}
              </div>
            </div>

            {activePhotos.length > 0 ? (
              <div className="p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-black">
                  {activePhotos.map((photo, i) => (
                    <div
                      key={photo.id}
                      className={`absolute inset-0 transition-opacity duration-300 ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
                    >
                      {photo.src && (
                        <Image src={photo.src} alt={photo.location} fill sizes="560px" className="object-cover" />
                      )}
                    </div>
                  ))}
                  {activePhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSlideIndex((i) => (i - 1 + activePhotos.length) % activePhotos.length)}
                        aria-label="Previous photo"
                        className="absolute left-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d]/55 text-white/75 transition-colors hover:bg-[#0d0d0d]/80 hover:text-white"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18" /></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlideIndex((i) => (i + 1) % activePhotos.length)}
                        aria-label="Next photo"
                        className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d]/55 text-white/75 transition-colors hover:bg-[#0d0d0d]/80 hover:text-white"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                      </button>
                    </>
                  )}
                </div>
                {activePhotos.length > 1 && (
                  <div className="flex justify-center gap-1.5 pt-3.5">
                    {activePhotos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlideIndex(i)}
                        aria-label={`Photo ${i + 1}`}
                        className={`h-1.5 w-1.5 rounded-full transition-transform ${i === slideIndex ? "scale-[1.3] bg-[#c5ff52]" : "bg-white/25"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 px-8 py-16 text-center">
                <span className="font-serif text-lg text-white/70">Nothing here yet.</span>
                <span className="max-w-[280px] font-sans text-[13px] text-white/40">
                  {activePlace.city} hasn&rsquo;t made it into the roll — check back once it has.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
