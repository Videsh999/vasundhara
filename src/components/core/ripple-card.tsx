"use client";

import * as React from "react";
import { animate } from "framer-motion";

const DEFAULT_IMAGE_SRC =
  "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1600&q=80";

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 vUv;
void main() {
  vUv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform sampler2D uTex;
uniform float uProgress;
uniform float uTime;
uniform float uCardAspect;
uniform float uTexAspect;
uniform float uIntensity;
uniform float uSize;
#define MAX_SRC 24
uniform vec3 uSrc[MAX_SRC];
uniform int uSrcCount;
const float LIFE = 1.17;
const float FREQ_K = 25.2;
varying vec2 vUv;

vec2 coverUv(vec2 uv, float cardAspect, float texAspect) {
  vec2 s = cardAspect < texAspect
    ? vec2(cardAspect / texAspect, 1.0)
    : vec2(1.0, texAspect / cardAspect);
  return (uv - 0.5) * s + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 asp = vec2(max(uCardAspect, 0.0001), 1.0);
  float reach = max(uSize, 0.0001);
  float c = reach / LIFE;
  float freq = FREQ_K / reach;
  vec2 ringDisp = vec2(0.0);
  for (int i = 0; i < MAX_SRC; i++) {
    if (i >= uSrcCount) break;
    vec3 s = uSrc[i];
    float age = uTime - s.z;
    if (age <= 0.0 || age >= LIFE) continue;
    vec2 d = (uv - s.xy) * asp;
    float r = length(d);
    float ringR = c * age;
    float x = (r - ringR) * freq;
    float packet = sin(x) * exp(-x * x * 0.02);
    float u = age / LIFE;
    float fade = pow(1.0 - u, 0.6) * smoothstep(0.0, 0.06, u);
    float amp = fade * inversesqrt(1.0 + r * 6.0);
    vec2 dir = r > 0.0001 ? d / r : vec2(0.0, 1.0);
    ringDisp += dir * packet * amp;
  }
  vec2 disp = ringDisp * 0.9 / asp * uIntensity * uProgress;
  gl_FragColor = texture2D(uTex, coverUv(uv + disp, uCardAspect, uTexAspect));
}
`;

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error("Shader compile error");
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

function createTexture(gl: WebGLRenderingContext) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
  gl.bindTexture(gl.TEXTURE_2D, null);
  return tex;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = url;
  });
}

const EMIT_DISTANCE = 0.04;
const EMIT_INTERVAL = 0.06;
const MAX_SRC = 24;
const INTENSITY_AT_FULL = 0.12;

export interface RippleCardProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  size?: number;
  rounded?: number;
}

export function RippleCard({
  src,
  alt = "",
  className = "",
  style,
  intensity = 100,
  size = 50,
  rounded = 16,
}: RippleCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const optionsRef = React.useRef({
    intensity: (intensity / 100) * INTENSITY_AT_FULL,
    size: size / 100,
  });

  React.useEffect(() => {
    optionsRef.current = {
      intensity: (intensity / 100) * INTENSITY_AT_FULL,
      size: size / 100,
    };
  }, [intensity, size]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvasRef.current = canvas;
      Object.assign(canvas.style, {
        position: "absolute",
        inset: "0px",
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      });
    }
    if (canvas.parentElement !== el) el.appendChild(canvas);

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;

    let program: WebGLProgram | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let uTexLoc: WebGLUniformLocation | null = null;
    let uProgressLoc: WebGLUniformLocation | null = null;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uCardAspectLoc: WebGLUniformLocation | null = null;
    let uTexAspectLoc: WebGLUniformLocation | null = null;
    let uIntensityLoc: WebGLUniformLocation | null = null;
    let uSizeLoc: WebGLUniformLocation | null = null;
    let uSrcLoc: WebGLUniformLocation | null = null;
    let uSrcCountLoc: WebGLUniformLocation | null = null;

    const tex = createTexture(gl);
    let texAspect = 1;
    let running = true;
    let rafId = 0;
    const startTime = performance.now();
    const nowSeconds = () => (performance.now() - startTime) / 1000;
    const pointer = { x: 0.5, y: 0.5 };

    const srcData = new Float32Array(MAX_SRC * 3);
    let srcCount = 0;
    let srcHead = 0;
    let lastEmit = { x: 0.5, y: 0.5, t: -1e9 };

    const emit = (x: number, y: number, t: number) => {
      srcData[srcHead * 3] = x;
      srcData[srcHead * 3 + 1] = y;
      srcData[srcHead * 3 + 2] = t;
      srcHead = (srcHead + 1) % MAX_SRC;
      srcCount = Math.min(MAX_SRC, srcCount + 1);
      lastEmit = { x, y, t };
    };

    const maybeEmit = (x: number, y: number) => {
      const t = nowSeconds();
      if (Math.hypot(x - lastEmit.x, y - lastEmit.y) < EMIT_DISTANCE) return;
      if (t - lastEmit.t < EMIT_INTERVAL) return;
      emit(x, y, t);
    };

    let progress = 0;
    let progressTarget = 0;
    let progressAnim: { stop: () => void } | null = null;
    const gateTo = (to: number) => {
      if (progressTarget === to) return;
      progressTarget = to;
      progressAnim?.stop();
      const from = progress;
      const delta = to - from;
      progressAnim = animate(0, 1, {
        duration: 0.85,
        ease: [0, 0, 0.58, 1] as [number, number, number, number],
        onUpdate: (p: number) => { progress = from + delta * p; },
        onComplete: () => { progressAnim = null; },
      }) as unknown as { stop: () => void };
    };

    const getUVFromClient = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      const u = (clientX - r.left) / Math.max(1, el.offsetWidth);
      const v = 1.0 - (clientY - r.top) / Math.max(1, el.offsetHeight);
      pointer.x = clamp(u, 0, 1);
      pointer.y = clamp(v, 0, 1);
    };

    const onPointerMove = (e: PointerEvent) => {
      getUVFromClient(e.clientX, e.clientY);
      maybeEmit(pointer.x, pointer.y);
    };
    const onPointerEnter = (e: PointerEvent) => {
      getUVFromClient(e.clientX, e.clientY);
      emit(pointer.x, pointer.y, nowSeconds());
      gateTo(1);
    };
    const onPointerLeave = () => gateTo(0);

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(el.offsetWidth * dpr));
      const h = Math.max(1, Math.round(el.offsetHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(el);

    try {
      program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
      gl.useProgram(program);
      const aPos = gl.getAttribLocation(program, "a_position");
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      uTexLoc = gl.getUniformLocation(program, "uTex");
      uProgressLoc = gl.getUniformLocation(program, "uProgress");
      uTimeLoc = gl.getUniformLocation(program, "uTime");
      uCardAspectLoc = gl.getUniformLocation(program, "uCardAspect");
      uTexAspectLoc = gl.getUniformLocation(program, "uTexAspect");
      uIntensityLoc = gl.getUniformLocation(program, "uIntensity");
      uSizeLoc = gl.getUniformLocation(program, "uSize");
      uSrcLoc = gl.getUniformLocation(program, "uSrc[0]");
      uSrcCountLoc = gl.getUniformLocation(program, "uSrcCount");
      if (uTexLoc) gl.uniform1i(uTexLoc, 0);
    } catch (_) { running = false; }

    let cancelled = false;
    (async () => {
      try {
        const img = await loadImage(src);
        if (cancelled) return;
        texAspect = img.naturalWidth / Math.max(1, img.naturalHeight);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.bindTexture(gl.TEXTURE_2D, null);
      } catch (_) {}
    })();

    const tick = () => {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      resize();
      const cardAspect = el.offsetWidth / Math.max(1, el.offsetHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      if (uProgressLoc) gl.uniform1f(uProgressLoc, progress);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, nowSeconds());
      if (uCardAspectLoc) gl.uniform1f(uCardAspectLoc, cardAspect);
      if (uTexAspectLoc) gl.uniform1f(uTexAspectLoc, texAspect);
      const opts = optionsRef.current;
      if (uIntensityLoc) gl.uniform1f(uIntensityLoc, opts.intensity);
      if (uSizeLoc) gl.uniform1f(uSizeLoc, opts.size);
      if (uSrcLoc) gl.uniform3fv(uSrcLoc, srcData);
      if (uSrcCountLoc) gl.uniform1i(uSrcCountLoc, srcCount);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    tick();

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (program) gl.deleteProgram(program);
      if (tex) gl.deleteTexture(tex);
      if (canvas && canvas.parentElement === el) canvas.remove();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: rounded,
        cursor: "crosshair",
        ...style,
      }}
      aria-label={alt}
      role="img"
    >
      <img
        src={src}
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

RippleCard.displayName = "RippleCard";
