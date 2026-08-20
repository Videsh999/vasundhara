"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import * as THREE from "three";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function map(v: any, lo: number, hi: number, fallback: number, span = 20): number {
  const n = typeof v === "number" ? v : parseFloat(v);
  const t = Number.isFinite(n) ? clamp(n, 0, span) : fallback;
  return lo + (t / span) * (hi - lo);
}

function smoothstepJS(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / Math.max(1e-6, e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

function smootherstepJS(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / Math.max(1e-6, e1 - e0), 0, 1);
  return t * t * t * (t * (6 * t - 15) + 10);
}

function crestProfile(edgeToCenter: number, shape: number): number {
  const q = clamp(edgeToCenter, 0, 1);
  const sharp = q;
  const bubble = Math.sqrt(Math.max(0, 1 - Math.pow(1 - q, 2)));
  const flat = smootherstepJS(0, 0.62, q);
  const s = clamp(shape, 0, 2);
  return s <= 1 ? sharp + (bubble - sharp) * s : bubble + (flat - bubble) * (s - 1);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type Transition = {
  type?: string;
  duration?: number;
  ease?: string | number[];
};

function makeEaseFn(transition?: Transition) {
  return (t: number) => {
    return easeInOutCubic(t);
  };
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function edgeRadius(angle: number, irregularity: number, lobes: number, seed: number): number {
  const irr = clamp(irregularity, 0, 0.75);
  const n = Math.max(3, Math.min(12, Math.round(lobes)));
  const a = angle + seed * 0.35;
  const lobe = Math.sin(a * n) * 0.6 + Math.sin(a * (n + 1) + 1.3) * 0.2;
  return 1 + lobe * irr * 0.45;
}

function drawDefaultLogoMask(ctx: CanvasRenderingContext2D, size: number) {
  const cx = size * 0.5;
  const cy = size * 0.5;
  const outer = size * 0.15;
  const inner = outer * 0.52;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = size * 0.02;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const px = cx + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}

function boxBlur(data: Float32Array, size: number, radius: number, passes: number) {
  if (radius < 1) return;
  const line = new Float32Array(size);
  const w = radius * 2 + 1;
  for (let pass = 0; pass < passes; pass++) {
    for (let y = 0; y < size; y++) {
      const row = y * size;
      for (let x = 0; x < size; x++) line[x] = data[row + x];
      let acc = 0;
      for (let x = -radius; x <= radius; x++) acc += line[clamp(x, 0, size - 1)];
      for (let x = 0; x < size; x++) {
        data[row + x] = acc / w;
        acc += line[Math.min(size - 1, x + radius + 1)] - line[Math.max(0, x - radius)];
      }
    }
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) line[y] = data[y * size + x];
      let acc = 0;
      for (let y = -radius; y <= radius; y++) acc += line[clamp(y, 0, size - 1)];
      for (let y = 0; y < size; y++) {
        data[y * size + x] = acc / w;
        acc += line[Math.min(size - 1, y + radius + 1)] - line[Math.max(0, y - radius)];
      }
    }
  }
}

function chamferDistance(mask: Uint8Array, size: number, region: number): Float32Array {
  const dist = new Float32Array(size * size);
  const far = size * 2;
  for (let i = 0; i < dist.length; i++) dist[i] = mask[i] === region ? far : 0;
  const diagonal = Math.SQRT2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      if (dist[i] === 0) continue;
      let d = dist[i];
      if (x > 0) d = Math.min(d, dist[i - 1] + 1);
      if (y > 0) d = Math.min(d, dist[i - size] + 1);
      if (x > 0 && y > 0) d = Math.min(d, dist[i - size - 1] + diagonal);
      if (x + 1 < size && y > 0) d = Math.min(d, dist[i - size + 1] + diagonal);
      dist[i] = d;
    }
  }
  for (let y = size - 1; y >= 0; y--) {
    for (let x = size - 1; x >= 0; x--) {
      const i = y * size + x;
      if (dist[i] === 0) continue;
      let d = dist[i];
      if (x + 1 < size) d = Math.min(d, dist[i + 1] + 1);
      if (y + 1 < size) d = Math.min(d, dist[i + size] + 1);
      if (x + 1 < size && y + 1 < size) d = Math.min(d, dist[i + size + 1] + diagonal);
      if (x > 0 && y + 1 < size) d = Math.min(d, dist[i + size - 1] + diagonal);
      dist[i] = d;
    }
  }
  return dist;
}

const TEXTURE_SIZE = 512;
const LOGO_RISE_CAP = 0.03;
const LOGO_INK_RELIEF = 0.7;

const FIXED = {
  relief: 0.45,
  logoRelief: 0.6,
  ringRelief: 0.6,
  logoBevel: 0.1,
  logoCrest: 1,
  logoSoftness: 0.4,
  ringWidth: 1,
  ringPeak: 1,
  ringBevel: 0.2,
  ringCrest: 1,
  ringSoftness: 0.3,
  rimCrest: 1,
  rimSoftness: 0.9,
  shapeSeed: 0,
  lightAngle: 139,
  lightHeight: 21,
};

function buildSealTexture(opts: any): Float32Array {
  const { size, irregularity, lobes, shapeSeed, rimWidth, relief, logoSize, logoWeight, logoRelief, logoBevel, logoCrest, showRings, ringCount, ringSize, ringSpacing, ringWidth, ringPeak, ringRelief, ringBevel, ringCrest, wellDepth, edgeCrest, edgeRoundness, ringRoundness, logoRoundness, logoImg } = opts;

  const logoCanvas = document.createElement("canvas");
  logoCanvas.width = size;
  logoCanvas.height = size;
  const lctx = logoCanvas.getContext("2d")!;
  const ls = clamp(logoSize, 5, 120) / 48;

  let masked = false;
  let logoInk: Float32Array | null = null;
  if (logoImg) {
    const maxDim = size * 0.4 * ls;
    const nw = Math.max(1, logoImg.naturalWidth || logoImg.width);
    const nh = Math.max(1, logoImg.naturalHeight || logoImg.height);
    const scale = maxDim / Math.max(nw, nh);
    const dw = Math.max(1, Math.round(nw * scale));
    const dh = Math.max(1, Math.round(nh * scale));
    const dx = Math.round((size - dw) / 2);
    const dy = Math.round((size - dh) / 2);
    lctx.drawImage(logoImg, dx, dy, dw, dh);

    try {
      const raw = lctx.getImageData(dx, dy, dw, dh);
      const px = raw.data;
      let minA = 255;
      for (let i = 0; i < px.length; i += 4) minA = Math.min(minA, px[i + 3]);
      const hasTransparency = minA < 250;

      if (hasTransparency) {
        let sum = 0;
        let count = 0;
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] < 128) continue;
          sum += (px[i] + px[i + 1] + px[i + 2]) / (255 * 3);
          count++;
        }
        if (count) {
          const mean = sum / count;
          const ink = new Float32Array(size * size);
          let peak = 0;
          for (let y = 0; y < dh; y++) {
            for (let x = 0; x < dw; x++) {
              const i = (y * dw + x) * 4;
              if (px[i + 3] < 128) continue;
              const lum = (px[i] + px[i + 1] + px[i + 2]) / (255 * 3);
              const d = lum - mean;
              ink[(dy + y) * size + (dx + x)] = d;
              peak = Math.max(peak, Math.abs(d));
            }
          }
          if (peak > 0.08) {
            for (let p = 0; p < ink.length; p++) ink[p] /= peak;
            logoInk = ink;
          }
        }
      }

      for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3] / 255;
        const lum = (px[i] + px[i + 1] + px[i + 2]) / (255 * 3);
        const v = hasTransparency ? a : 1 - lum;
        const g = Math.round(clamp(v, 0, 1) * 255);
        px[i] = px[i + 1] = px[i + 2] = g;
        px[i + 3] = g;
      }
      lctx.clearRect(0, 0, size, size);
      lctx.putImageData(raw, dx, dy);
      masked = true;
    } catch {
      lctx.clearRect(0, 0, size, size);
    }
  }
  if (!masked) {
    lctx.save();
    lctx.translate(size / 2, size / 2);
    lctx.scale(ls, ls);
    lctx.translate(-size / 2, -size / 2);
    drawDefaultLogoMask(lctx, size);
    lctx.restore();
  }

  const logoPixels = lctx.getImageData(0, 0, size, size).data;
  const logoMask = new Uint8Array(size * size);
  for (let p = 0; p < logoMask.length; p++) logoMask[p] = logoPixels[p * 4 + 3] >= 128 ? 1 : 0;
  const logoInside = chamferDistance(logoMask, size, 1);
  const logoOutside = chamferDistance(logoMask, size, 0);
  let logoRadius = 1;
  for (let p = 0; p < logoInside.length; p++) logoRadius = Math.max(logoRadius, logoInside[p]);
  const logoWeightPx = size * clamp(logoWeight, -1, 4) * 0.006;
  const logoCoreRadius = Math.max(1, logoRadius + logoWeightPx);
  const logoBevelPx = size * clamp(logoBevel, 0, 2) * 0.012;
  const logoRiseRadius = Math.min(logoCoreRadius, size * LOGO_RISE_CAP);

  const data = new Float32Array(size * size * 4);
  const edgeHeight = new Float32Array(size * size);
  const stampHeight = new Float32Array(size * size);
  const ringHeight = new Float32Array(size * size);
  const logoHeight = new Float32Array(size * size);

  const rimW = clamp(rimWidth, 3, 50) / 100;
  const wellR = clamp(ringSize, 15, 85) / 100;
  const seed = Math.round(shapeSeed);
  const nRings = showRings ? Math.max(0, Math.min(8, Math.round(ringCount))) : 0;
  const spacing = clamp(ringSpacing, 0, 30) / 100;
  const slope = 0.003 + clamp(ringBevel, 0, 2) * 0.027;
  const ridgeRadius = 0.004 + clamp(ringWidth, 0, 2) * 0.01 + clamp(ringPeak, 0, 2) * 0.008 + slope;
  const rHeight = 0.025 + clamp(ringRelief, 0, 3) * 0.12;
  const logoH = ((logoRiseRadius / size) * 2.2 * clamp(logoRelief, 0, 3)) / (0.34 * clamp(relief, 0.1, 3));
  const wellD = 0.035 + clamp(wellDepth, 0, 3) * 0.1;
  const edgeRound = clamp(edgeRoundness, 0, 2);
  const ringRound = clamp(ringRoundness, 0, 2);

  const ridgeProfile = (dist: number) => {
    const edgeToCenter = 1 - dist / Math.max(1e-6, ridgeRadius);
    return crestProfile(edgeToCenter, ringCrest);
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const pi = (size - 1 - y) * size + x;
      const i = pi * 4;
      const nx = (x / (size - 1)) * 2 - 1;
      const ny = (y / (size - 1)) * 2 - 1;
      const r = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);
      const edge = 0.84 * edgeRadius(angle, irregularity, lobes, seed);
      const d = edge - r;
      const sd = clamp(0.5 + d * 0.55, 0, 1);

      const body = 0.48 * smootherstepJS(0, rimW * (0.2 + edgeRound * 0.08), d);
      const rimCenter = rimW * (0.46 + edgeRound * 0.05);
      const rimHalf = rimW * (0.5 + edgeRound * 0.3);
      const rimT = clamp(Math.abs(d - rimCenter) / Math.max(1e-6, rimHalf), 0, 1);
      const rimBell = crestProfile(1 - rimT, edgeCrest);
      const outer = body + 0.28 * rimBell;

      const stampR = wellR + 0.065;
      const stampBevel = 0.024 + ringRound * 0.012;
      const stamped = 1 - smootherstepJS(stampR - stampBevel, stampR + stampBevel, r);
      const pinchDist = Math.abs(r - stampR);
      const pinch = Math.pow(1 - smootherstepJS(0, 0.035 + stampBevel, pinchDist), 2);
      const stampDelta = -wellD * stamped - wellD * 0.22 * pinch;

      if (nRings > 0) {
        for (let k = 0; k < nRings; k++) {
          const rr = wellR - k * spacing;
          if (rr < 0.08) continue;
          const center = k === 0 ? wellR + 0.004 : rr;
          const amp = rHeight * (k === 0 ? 1.15 : 1 - k * 0.08);
          ringHeight[pi] += amp * ridgeProfile(Math.abs(r - center));
        }
      }

      if (r < wellR - 0.04) {
        const lp = y * size + x;
        const signedDistance = (logoMask[lp] ? logoInside[lp] : -logoOutside[lp]) + logoWeightPx;
        const edgeToCenter = (signedDistance + logoBevelPx) / (logoRiseRadius + logoBevelPx);
        logoHeight[pi] = crestProfile(edgeToCenter, logoCrest) * logoH;

        if (logoInk) {
          const settled = smoothstepJS(0, logoRiseRadius, signedDistance);
          logoHeight[pi] += logoInk[lp] * logoH * LOGO_INK_RELIEF * settled;
        }
      }

      const floor = stamped;
      edgeHeight[pi] = outer;
      stampHeight[pi] = stampDelta;
      data[i + 2] = clamp(floor, 0, 1);
      data[i + 3] = sd;
    }
  }

  boxBlur(edgeHeight, size, Math.round(edgeRound * 12), 3);
  boxBlur(ringHeight, size, Math.round(ringRound * 9), 3);
  boxBlur(logoHeight, size, Math.round(logoRoundness * 9), 3);

  for (let p = 0; p < size * size; p++) {
    const i = p * 4;
    const delta = stampHeight[p] + ringHeight[p] + logoHeight[p];
    data[i] = clamp(edgeHeight[p], 0, 1);
    data[i + 1] = clamp(0.5 + delta * 0.5, 0, 1);
  }
  return data;
}

const SHARED_GLSL = `
  uniform sampler2D uMap;
  uniform float uSpread;
  uniform float uLobe;
  uniform float uStamp;
  uniform float uRadius;

  float ballDome(float r) {
    float x = clamp(r / max(uRadius, 1e-4), 0.0, 1.0);
    float dome = sqrt(max(0.0, 1.0 - x * x));
    float peak = mix(1.55, 0.66, uSpread);
    return dome * peak;
  }

  float edgeDist(vec2 uv) {
    vec2 p = uv * 2.0 - 1.0;
    float r = length(p);
    float dBall = uRadius - r;
    float dFinal = (texture2D(uMap, uv).a - 0.5) / 0.55;
    return mix(dBall, dFinal, uLobe);
  }

  float compositeH(vec2 uv) {
    vec2 p = uv * 2.0 - 1.0;
    float r = length(p);
    vec4 t = texture2D(uMap, uv);
    float h = mix(ballDome(r), t.r, uSpread);
    float inside = smoothstep(0.0, 0.033, t.a - 0.5);
    h += (t.g - 0.5) * 2.0 * uStamp * inside;
    h *= smoothstep(-0.015, 0.05, edgeDist(uv));
    return h;
  }

  float compositeA(vec2 uv) {
    return smoothstep(-0.012, 0.012, edgeDist(uv));
  }
`;

const VERTEX_SHADER = `
  ${SHARED_GLSL}
  uniform float uDisp;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += compositeH(uv) * uDisp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  ${SHARED_GLSL}
  uniform vec3 uColor;
  uniform float uDisp;
  uniform float uFade;
  uniform float uTexel;
  uniform vec3 uLight;
  varying vec2 vUv;

  const float GLOSS = 2.0;
  const float SPECULAR = 1.2;
  const float GOLD_DEPTH = 1.0;
  const float WARMTH = 0.0;
  const float SHEEN = 1.05;
  const float FILL_LIGHT = 1.05;
  const float LIGHT_SIZE = 3.0;
  const float EDGE_FOCUS = 0.7;
  const float CONTRAST = 2.5;
  const float AO = 1.2;

  float specularLobe(vec3 normal, vec3 view, vec3 lightDir, float tightPower, float broadPower) {
    float ndh = max(dot(normal, normalize(lightDir + view)), 0.0);
    float tight = pow(ndh, tightPower) * (tightPower + 2.0) / 60.0;
    float broad = pow(ndh, broadPower) * (broadPower + 2.0) / 17.0;
    return tight * 1.15 + broad * 0.18 * SHEEN;
  }

  void main() {
    float alpha = compositeA(vUv) * uFade;
    if (alpha < 0.01) discard;

    float e = uTexel * 1.6;
    float hC = compositeH(vUv);
    float hR = compositeH(vUv + vec2(e, 0.0));
    float hL = compositeH(vUv - vec2(e, 0.0));
    float hU = compositeH(vUv + vec2(0.0, e));
    float hD = compositeH(vUv - vec2(0.0, e));
    float k = uDisp / 2.2 / (2.0 * e) * CONTRAST;
    vec3 n = normalize(vec3(-(hR - hL) * k, -(hU - hD) * k, 1.0));

    float e2 = uTexel * 7.0;
    float occ = 0.0;
    occ += max(0.0, compositeH(vUv + vec2(e2, 0.0)) - hC);
    occ += max(0.0, compositeH(vUv - vec2(e2, 0.0)) - hC);
    occ += max(0.0, compositeH(vUv + vec2(0.0, e2)) - hC);
    occ += max(0.0, compositeH(vUv - vec2(0.0, e2)) - hC);
    float ao = 1.0 - clamp(occ * AO, 0.0, 0.4);

    vec3 L = normalize(uLight);
    vec3 V = vec3(0.0, 0.0, 1.0);
    float lit = dot(n, L) * 0.5 + 0.5;
    float fill = max(dot(n, normalize(vec3(-uLight.x, -uLight.y, 0.35))), 0.0);

    vec3 deepGold = mix(uColor * 0.26, vec3(0.28, 0.16, 0.02), 0.55);
    vec3 deep = mix(uColor * 0.58, deepGold, min(GOLD_DEPTH, 1.0));
    deep *= 1.0 - max(GOLD_DEPTH - 1.0, 0.0) * 0.22;
    vec3 mid = uColor;
    vec3 coolHighlight = mix(uColor, vec3(1.0, 0.98, 0.9), 0.85);
    vec3 warmHighlight = mix(uColor * 1.15, vec3(1.0, 0.78, 0.3), 0.42);
    vec3 hi = mix(coolHighlight, warmHighlight, WARMTH);

    vec3 base = mix(deep, mid, smoothstep(0.42, 0.8, lit));
    base = mix(base, hi, smoothstep(0.88, 1.0, lit));
    base += mid * fill * 0.28 * FILL_LIGHT;

    float slope = length(n.xy);
    float perimeter = 1.0 - smoothstep(0.07, 0.27, edgeDist(vUv));
    float reliefOnly = smoothstep(0.025, 0.22, slope);
    float focusMask = mix(1.0, perimeter * 1.25 + reliefOnly * 0.12, EDGE_FOCUS);
    float tightPower = 10.0 + GLOSS * 70.0;
    float broadPower = 3.0 + GLOSS * 14.0;
    vec3 lightTangent = normalize(vec3(-L.y, L.x, 0.0));
    vec3 lightBitangent = normalize(cross(L, lightTangent));
    float spread = LIGHT_SIZE * 0.36;
    float areaSpec = specularLobe(n, V, L, tightPower, broadPower);
    areaSpec += specularLobe(n, V, normalize(L + lightTangent * spread), tightPower, broadPower);
    areaSpec += specularLobe(n, V, normalize(L - lightTangent * spread), tightPower, broadPower);
    areaSpec += specularLobe(n, V, normalize(L + lightBitangent * spread), tightPower, broadPower);
    areaSpec += specularLobe(n, V, normalize(L - lightBitangent * spread), tightPower, broadPower);
    float areaPeak = 1.0 / (1.0 + LIGHT_SIZE * 0.3);
    float spec = areaSpec * 0.2 * areaPeak * SPECULAR * focusMask;

    vec3 coolSpec = vec3(1.0, 0.97, 0.88);
    vec3 warmSpec = mix(vec3(1.0, 0.82, 0.42), uColor * 1.22, 0.35);
    vec3 col = base + spec * mix(coolSpec, warmSpec, WARMTH);
    col *= ao;

    gl_FragColor = vec4(col, alpha);
  }
`;

export interface WaxSealProps {
  waxColor?: string;
  logo?: string;
  style?: CSSProperties;
  className?: string;
}

export function WaxSeal({
  waxColor = "#FFE800",
  logo = "/brand/vasundhara-emblem-dark.png",
  style,
  className = "",
}: WaxSealProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cursorPositionRef = useRef<{ x: number; y: number } | null>(null);
  const dynamicLightRef = useRef({ x: 0, y: 0 });

  const bake = useMemo(
    () => ({
      size: TEXTURE_SIZE,
      relief: FIXED.relief,
      irregularity: map(5, 0, 0.75, 5),
      lobes: 8,
      shapeSeed: FIXED.shapeSeed,
      rimWidth: 19,
      edgeCrest: FIXED.rimCrest,
      edgeRoundness: FIXED.rimSoftness,
      wellDepth: map(10, 0, 3, 10),
      logoSize: 50,
      logoWeight: map(12, -1, 4, 12),
      logoRelief: FIXED.logoRelief,
      logoBevel: FIXED.logoBevel,
      logoCrest: FIXED.logoCrest,
      logoRoundness: FIXED.logoSoftness,
      showRings: false,
      ringCount: 1,
      ringSize: 58,
      ringSpacing: 6,
      ringRelief: FIXED.ringRelief,
      ringWidth: FIXED.ringWidth,
      ringPeak: FIXED.ringPeak,
      ringBevel: FIXED.ringBevel,
      ringCrest: FIXED.ringCrest,
      ringRoundness: FIXED.ringSoftness,
    }),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPointerMove = (event: PointerEvent) => {
      cursorPositionRef.current = { x: event.clientX, y: event.clientY };
      (mountRef.current as any)?.__waxApi?.invalidate();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;
    const mount = mountRef.current;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let isVisible = false;
    let hiddenAt = 0;
    let requestRender = () => {};
    const disposables: Array<{ dispose: () => void }> = [];

    const api = { play: () => {}, reset: () => {}, invalidate: () => {} };
    (mount as any).__waxApi = api;

    (async () => {
      const logoImg = logo ? await loadImage(logo) : null;
      if (disposed || !mount) return;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(2.5, window.devicePixelRatio || 1));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const viewSize = 1.18;
      const camera = new THREE.OrthographicCamera(-viewSize, viewSize, viewSize, -viewSize, 0.1, 40);
      camera.position.set(0, 8, 0);
      camera.rotation.order = "YXZ";
      camera.rotation.set(-Math.PI / 2, 0, 0);

      const sealData = buildSealTexture({ ...bake, logoImg });
      const half = new Uint16Array(sealData.length);
      for (let i = 0; i < sealData.length; i++) half[i] = THREE.DataUtils.toHalfFloat(sealData[i]);
      const sealTex = new THREE.DataTexture(half, TEXTURE_SIZE, TEXTURE_SIZE, THREE.RGBAFormat, THREE.HalfFloatType);
      sealTex.flipY = false;
      sealTex.minFilter = THREE.LinearFilter;
      sealTex.magFilter = THREE.LinearFilter;
      sealTex.wrapS = THREE.ClampToEdgeWrapping;
      sealTex.wrapT = THREE.ClampToEdgeWrapping;
      sealTex.needsUpdate = true;
      disposables.push(sealTex);

      const srgb = new THREE.Color(waxColor).convertLinearToSRGB();

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: sealTex },
          uColor: { value: srgb },
          uDisp: { value: 0.34 * FIXED.relief },
          uTexel: { value: 1 / TEXTURE_SIZE },
          uLight: { value: new THREE.Vector3(-0.48, 0.58, 0.62) },
          uSpread: { value: 1 },
          uLobe: { value: 1 },
          uStamp: { value: 1 },
          uRadius: { value: 0.7 },
          uFade: { value: 1 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: true,
      });
      disposables.push(material);

      const segments = 160;
      const geo = new THREE.PlaneGeometry(2.2, 2.2, segments, segments);
      disposables.push(geo);
      const seal = new THREE.Mesh(geo, material);
      seal.rotation.x = -Math.PI / 2;
      const group = new THREE.Group();
      group.add(seal);
      scene.add(group);

      const resize = () => {
        if (!renderer || !mount) return;
        const w = Math.max(1, mount.clientWidth);
        const h = Math.max(1, mount.clientHeight);
        renderer.setSize(w, h, false);
        const aspect = w / h;
        if (aspect >= 1) {
          camera.left = -viewSize * aspect;
          camera.right = viewSize * aspect;
          camera.top = viewSize;
          camera.bottom = -viewSize;
        } else {
          camera.left = -viewSize;
          camera.right = viewSize;
          camera.top = viewSize / aspect;
          camera.bottom = -viewSize / aspect;
        }
        camera.updateProjectionMatrix();
        requestRender();
      };
      resize();
      ro = new ResizeObserver(resize);
      ro.observe(mount);

      let playing = false;
      let t0 = 0;
      let progress = 0;
      let hasPlayed = false;

      const applyPose = (p: number) => {
        const pe = easeInOutCubic(p);
        const fade = smoothstepJS(0, 0.05, pe);
        const pour = smoothstepJS(0, 0.48, pe);
        const pourEase = easeOutCubic(pour);
        const jiggle = Math.sin(pour * Math.PI * 3) * (1 - pour) * (1 - pour) * 0.035;
        const blobRadius = 0.12 + 0.34 * pourEase + jiggle;

        const press = smoothstepJS(0.52, 0.72, pe);
        const pressEase = easeOutCubic(press);
        const radius = blobRadius + (0.72 - blobRadius) * pressEase;
        const spread = 0.12 * pour + 0.88 * easeInOutCubic(press);
        const stamp = easeOutBack(press);
        const squish = Math.sin(press * Math.PI) * 0.045;

        const lobeTime = clamp((pe - 0.52) / 0.48, 0, 1);
        const lobe = 1 - Math.pow(1 - lobeTime, 1.45);

        material.uniforms.uFade.value = fade;
        material.uniforms.uSpread.value = spread;
        material.uniforms.uRadius.value = radius;
        material.uniforms.uLobe.value = lobe;
        material.uniforms.uStamp.value = stamp;
        group.scale.setScalar(1 + squish);
      };

      const play = () => {
        playing = true;
        progress = 0;
        hasPlayed = true;
        t0 = performance.now();
        requestRender();
      };
      const reset = () => {
        playing = false;
        progress = 0;
        hasPlayed = false;
        applyPose(0);
        requestRender();
      };
      api.play = play;
      api.reset = reset;
      applyPose(progress);

      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const nextVisible = !!(entry && entry.isIntersecting && entry.intersectionRatio >= 0.01);
          const becameVisible = nextVisible && !isVisible;
          const becameHidden = !nextVisible && isVisible;
          isVisible = nextVisible;

          if (becameHidden) {
            if (raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
            if (playing) hiddenAt = performance.now();
            reset();
            return;
          }
          if (becameVisible) {
            if (hiddenAt && playing) {
              t0 += performance.now() - hiddenAt;
              hiddenAt = 0;
            }
            if (!hasPlayed) play();
            else requestRender();
          }
        },
        { threshold: [0, 0.01] }
      );
      io.observe(mount);

      const tick = (now: number) => {
        if (disposed || !renderer) return;
        raf = 0;
        if (!isVisible) return;

        material.uniforms.uColor.value.set(waxColor).convertLinearToSRGB();

        const restRad = (FIXED.lightAngle * Math.PI) / 180;
        let targetX = Math.cos(restRad);
        let targetY = Math.sin(restRad);
        const cursor = cursorPositionRef.current;
        if (cursor) {
          const rect = mount.getBoundingClientRect();
          const dx = cursor.x - (rect.left + rect.width / 2);
          const dy = cursor.y - (rect.top + rect.height / 2);
          const length = Math.hypot(dx, dy);
          if (length > 1) {
            targetX = dx / length;
            targetY = dy / length;
          }
        }

        const dynamicLight = dynamicLightRef.current;
        const lightDelta = Math.hypot(targetX - dynamicLight.x, targetY - dynamicLight.y);
        if (dynamicLight.x === 0 && dynamicLight.y === 0) {
          dynamicLight.x = targetX;
          dynamicLight.y = targetY;
        } else {
          dynamicLight.x += (targetX - dynamicLight.x) * 0.12;
          dynamicLight.y += (targetY - dynamicLight.y) * 0.12;
        }
        const rad = Math.atan2(dynamicLight.y, dynamicLight.x);
        const elevation = (FIXED.lightHeight * Math.PI) / 180;
        const planar = Math.cos(elevation);
        material.uniforms.uLight.value.set(Math.cos(rad) * planar, Math.sin(rad) * planar, Math.sin(elevation));

        if (playing) {
          const dur = 1200;
          progress = clamp((now - t0) / dur, 0, 1);
          applyPose(progress);
          if (progress >= 1) playing = false;
        }

        renderer.render(scene, camera);
        if (playing || lightDelta > 0.001) requestRender();
      };

      requestRender = () => {
        if (disposed || !renderer || raf || !isVisible) return;
        raf = requestAnimationFrame(tick);
      };
      api.invalidate = requestRender;
      requestRender();
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      mount.querySelector("canvas")?.remove();
      for (const d of disposables) d.dispose();
      renderer?.dispose();
      renderer = null;
    };
  }, [bake, logo, waxColor]);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Wax seal"
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    />
  );
}

WaxSeal.displayName = "Wax Seal";
