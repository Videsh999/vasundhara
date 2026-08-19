"use client";

import React, { useEffect, useMemo, useRef, type CSSProperties } from "react";
import * as THREE from "three";

export interface GalleryTunnelSlide {
  url: string;
  y?: number;
  title?: string;
}

export interface GalleryTunnelProps {
  images?: Array<string | { image?: string; src?: string; y?: number; title?: string }>;
  colors?: string[];
  background?: string;
  lineColor?: string;
  lineOpacity?: number;
  grid?: number;
  cellMode?: "square" | "stretched";
  tunnelSize?: number;
  speed?: number;
  boost?: number;
  fade?: number;
  label?: boolean;
  labelText?: string;
  labelFill?: string;
  labelColor?: string;
  labelFont?: CSSProperties;
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1611591475163-9a3d463e230c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1200",
];

const LUXURY_DEFAULTS = {
  background: "#FBF9F4",
  lineColor: "#B09262",
  lineOpacity: 35,
  colors: ["#EFE9DA", "#F7F3EA", "#E5DEC9", "#C6AA78", "#D9CBB0", "#F4EFE5"],
  grid: 4,
  cellMode: "stretched" as const,
  tunnelSize: 1.2,
  speed: 80,
  boost: 140,
  fade: 90,
  label: true,
  labelText: "Hold to Accelerate Atelier",
  labelFill: "#24211D",
  labelColor: "#FDFBF7",
  labelFont: {
    fontFamily: 'var(--font-sans), "Plus Jakarta Sans", sans-serif',
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
  },
};

const TUNNEL_WIDTH = 2.4;
const TUNNEL_HEIGHT = 1.9;
const BASE_SEGMENT_DEPTH = 1.1;
const TUNNEL_LENGTH = 16;
const LINE_RADIUS = 0.0025;
const SCROLL_TO_Z = 0.05;
const CAMERA_CHASE = 0.1;
const FADE_IN = 0.8;

const fogFarFor = (segCount: number, segDepth: number) =>
  segCount * segDepth * 0.95;

type Slide = { url: string; y: number };

const slideOf = (entry: any): Slide => {
  if (typeof entry === "string") return { url: entry, y: 50 };
  const raw = entry?.image ?? entry?.src ?? entry?.url ?? entry;
  const url = typeof raw === "string" ? raw : (raw?.src ?? "");
  const y = typeof entry?.y === "number" ? entry.y : 50;
  return { url, y };
};

export function GalleryTunnel({
  images,
  colors,
  background = LUXURY_DEFAULTS.background,
  lineColor = LUXURY_DEFAULTS.lineColor,
  lineOpacity = LUXURY_DEFAULTS.lineOpacity,
  grid = LUXURY_DEFAULTS.grid,
  cellMode = LUXURY_DEFAULTS.cellMode,
  tunnelSize = LUXURY_DEFAULTS.tunnelSize,
  speed = LUXURY_DEFAULTS.speed,
  boost = LUXURY_DEFAULTS.boost,
  fade = LUXURY_DEFAULTS.fade,
  label = LUXURY_DEFAULTS.label,
  labelText = LUXURY_DEFAULTS.labelText,
  labelFill = LUXURY_DEFAULTS.labelFill,
  labelColor = LUXURY_DEFAULTS.labelColor,
  labelFont = LUXURY_DEFAULTS.labelFont,
  style,
  className = "",
}: GalleryTunnelProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const slides = useMemo<Slide[]>(() => {
    const list = (images ?? []).map(slideOf).filter((s) => s.url);
    return list.length ? list : DEFAULT_IMAGES.map((url) => ({ url, y: 50 }));
  }, [images]);

  const slideKey = slides.map((s) => `${s.url}|${s.y}`).join(",");

  const palette = useMemo(() => {
    const list = (colors ?? []).filter(Boolean);
    return list.length ? list : LUXURY_DEFAULTS.colors;
  }, [colors]);

  const cfgRef = useRef<any>(null);
  cfgRef.current = {
    speed: Math.max(0, speed) / 100,
    boost: Math.max(0, boost) / 10,
  };

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    let pressed = false;
    let alive = true;

    const sizeUi = Math.max(1, Math.min(20, Math.round(tunnelSize * 7)));
    const sizeK = 1 + ((sizeUi - 1) * 2) / 19;

    const rows = Math.max(1, Math.round(grid));
    let cols: number;
    let colW: number;
    let rowH: number;
    let cellDepth: number;
    let depthCells: number;
    let segDepth: number;
    let tunnelW: number;
    let tunnelH: number;

    if (cellMode === "square") {
      const cell = (TUNNEL_HEIGHT * sizeK) / rows;
      cols = Math.max(1, Math.round((TUNNEL_WIDTH * sizeK) / cell));
      depthCells = Math.max(1, Math.round(BASE_SEGMENT_DEPTH / cell));
      cellDepth = cell;
      segDepth = depthCells * cell;
      tunnelH = cell * rows;
      tunnelW = cell * cols;
      colW = cell;
      rowH = cell;
    } else {
      cols = rows;
      depthCells = 1;
      segDepth = BASE_SEGMENT_DEPTH;
      cellDepth = BASE_SEGMENT_DEPTH;
      tunnelW = TUNNEL_WIDTH * sizeK;
      tunnelH = TUNNEL_HEIGHT * sizeK;
      colW = tunnelW / cols;
      rowH = tunnelH / rows;
    }

    const segCount = Math.max(6, Math.round(TUNNEL_LENGTH / segDepth));
    const perimeterCells = 2 * cols + 2 * rows;
    const countMatched = Math.min(0.5, (2 * rows * cellDepth) / perimeterCells);
    const fillChance = cellMode === "square" ? (countMatched + 0.5) / 2 : 0.5;
    const fogFar = fogFarFor(segCount, segDepth);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);

    const fogNear = Math.min(
      fogFar * (1 - Math.min(100, Math.max(0, fade)) / 100),
      fogFar - 0.01
    );
    scene.fog = new THREE.Fog(new THREE.Color(background), fogNear, fogFar);

    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const lineMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: Math.max(0, Math.min(100, lineOpacity)) / 100,
    });

    const hw = tunnelW / 2;
    const hh = tunnelH / 2;

    const geoFloor = new THREE.PlaneGeometry(colW, cellDepth);
    const geoWall = new THREE.PlaneGeometry(cellDepth, rowH);

    const railLength = segCount * segDepth + segDepth;
    const geoTubeZ = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -railLength)
      ),
      1,
      LINE_RADIUS,
      8
    );
    const geoTubeX = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(tunnelW, 0, 0)
      ),
      1,
      LINE_RADIUS,
      8
    );
    const geoTubeY = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, tunnelH, 0)
      ),
      1,
      LINE_RADIUS,
      8
    );

    const colorMats = palette.map(
      (hex) =>
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(hex),
          side: THREE.DoubleSide,
        })
    );

    const fading: THREE.MeshBasicMaterial[] = [];

    const imageMats = slides.map(({ url, y }) => {
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      loader.load(
        url,
        (tex) => {
          if (!alive) {
            tex.dispose();
            return;
          }
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          tex.colorSpace = THREE.SRGBColorSpace;

          const iw = tex.image?.width ?? 1;
          const ih = tex.image?.height ?? 1;
          const aspect = iw / ih;
          if (aspect > 1) {
            tex.repeat.set(1 / aspect, 1);
            tex.offset.set((1 - 1 / aspect) / 2, 0);
          } else {
            const rY = aspect;
            const anchor = Math.max(0, Math.min(100, y)) / 100;
            tex.repeat.set(1, rY);
            tex.offset.set(0, (1 - rY) * (1 - anchor));
          }

          mat.map = tex;
          mat.needsUpdate = true;
          fading.push(mat);
        },
        undefined,
        () => {}
      );
      return mat;
    });

    let populateIndex = 0;
    let colorIndex = 0;
    let imageIndex = 0;

    const tube = (
      geo: THREE.BufferGeometry,
      x: number,
      y: number,
      z = 0
    ) => {
      const m = new THREE.Mesh(geo, lineMaterial);
      m.position.set(x, y, z);
      return m;
    };

    const SLOTS: Array<{
      geo: THREE.BufferGeometry;
      pos: THREE.Vector3;
      rot: THREE.Euler;
      d: number;
    }> = [];

    for (let d = 0; d < depthCells; d++) {
      const z = -(d + 0.5) * cellDepth;
      for (let i = 0; i < cols; i++) {
        const x = -hw + i * colW + colW / 2;
        SLOTS.push({
          geo: geoFloor,
          pos: new THREE.Vector3(x, -hh, z),
          rot: new THREE.Euler(-Math.PI / 2, 0, 0),
          d,
        });
        SLOTS.push({
          geo: geoFloor,
          pos: new THREE.Vector3(x, hh, z),
          rot: new THREE.Euler(Math.PI / 2, 0, 0),
          d,
        });
      }
      for (let i = 0; i < rows; i++) {
        const y = -hh + i * rowH + rowH / 2;
        SLOTS.push({
          geo: geoWall,
          pos: new THREE.Vector3(-hw, y, z),
          rot: new THREE.Euler(0, Math.PI / 2, 0),
          d,
        });
        SLOTS.push({
          geo: geoWall,
          pos: new THREE.Vector3(hw, y, z),
          rot: new THREE.Euler(0, -Math.PI / 2, 0),
          d,
        });
      }
    }

    function populate(group: THREE.Group) {
      const baseRow = populateIndex;
      populateIndex += depthCells;
      const slabs = group.userData.slabs as THREE.Mesh[];

      for (let i = 0; i < slabs.length; i++) {
        const slab = slabs[i];
        const takesSlabs = (baseRow + SLOTS[i].d) % 2 === 0;
        if (!takesSlabs || Math.random() > fillChance) {
          slab.visible = false;
          continue;
        }
        slab.visible = true;
        if (Math.random() > 0.5) {
          slab.material =
            colorMats[(5 * colorIndex) % colorMats.length];
          colorIndex++;
        } else {
          slab.material =
            imageMats[(3 * imageIndex) % imageMats.length];
          imageIndex++;
        }
      }
    }

    function createSegment(z: number) {
      const group = new THREE.Group();
      group.position.z = z;

      for (let d = 0; d < depthCells; d++) {
        const z = -d * cellDepth;
        group.add(tube(geoTubeX, -hw, -hh, z));
        group.add(tube(geoTubeX, -hw, hh, z));
        group.add(tube(geoTubeY, -hw, -hh, z));
        group.add(tube(geoTubeY, hw, -hh, z));
      }

      const slabs: THREE.Mesh[] = SLOTS.map((slot) => {
        const m = new THREE.Mesh(slot.geo, colorMats[0]);
        m.position.copy(slot.pos);
        m.rotation.copy(slot.rot);
        m.visible = false;
        group.add(m);
        return m;
      });
      group.userData.slabs = slabs;

      populate(group);
      return group;
    }

    const rails = new THREE.Group();
    for (let i = 0; i <= cols; i++) {
      const x = -hw + i * colW;
      rails.add(tube(geoTubeZ, x, -hh));
      rails.add(tube(geoTubeZ, x, hh));
    }
    for (let i = 1; i < rows; i++) {
      const y = -hh + i * rowH;
      rails.add(tube(geoTubeZ, -hw, y));
      rails.add(tube(geoTubeZ, hw, y));
    }
    scene.add(rails);

    const segments: THREE.Group[] = [];
    for (let i = 0; i < segCount; i++) {
      const g = createSegment(-i * segDepth);
      scene.add(g);
      segments.push(g);
    }

    const resize = () => {
      const w = Math.max(1, frame.clientWidth);
      const h = Math.max(1, frame.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(frame);
    resize();

    let scrollPos = 0;
    let raf = 0;
    let last = 0;

    const animate = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(animate);
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;

      const cfg = cfgRef.current;
      scrollPos += pressed ? cfg.boost : cfg.speed;

      const want = -SCROLL_TO_Z * scrollPos;
      camera.position.z += CAMERA_CHASE * (want - camera.position.z);

      rails.position.z = camera.position.z;

      const span = segCount * segDepth;
      const z = camera.position.z;
      for (const seg of segments) {
        if (seg.position.z > z + segDepth) {
          let min = 0;
          for (const s of segments) min = Math.min(min, s.position.z);
          seg.position.z = min - segDepth;
          populate(seg);
        } else if (seg.position.z < z - span - segDepth) {
          let max = -999999;
          for (const s of segments) max = Math.max(max, s.position.z);
          seg.position.z = max + segDepth;
          populate(seg);
        }
      }

      for (let i = fading.length - 1; i >= 0; i--) {
        const m = fading[i];
        m.opacity = Math.min(1, m.opacity + dt / FADE_IN);
        if (m.opacity >= 1) fading.splice(i, 1);
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: PointerEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      const rect = frame.getBoundingClientRect();
      const sx = rect.width > 0 ? frame.clientWidth / rect.width : 1;
      const sy = rect.height > 0 ? frame.clientHeight / rect.height : 1;
      el.style.left = `${(e.clientX - rect.left) * sx}px`;
      el.style.top = `${(e.clientY - rect.top) * sy}px`;
    };
    const onEnter = () => {
      const el = cursorRef.current;
      if (el) el.style.opacity = "1";
    };
    const onLeave = () => {
      pressed = false;
      const el = cursorRef.current;
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translate(0%, -100%) scale(1)";
      }
    };
    const onDown = () => {
      pressed = true;
      const el = cursorRef.current;
      if (el) el.style.transform = "translate(0%, -100%) scale(0.85)";
    };
    const onUp = () => {
      pressed = false;
      const el = cursorRef.current;
      if (el) el.style.transform = "translate(0%, -100%) scale(1)";
    };

    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointerleave", onLeave);
    frame.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointerleave", onLeave);
      frame.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);

      geoFloor.dispose();
      geoWall.dispose();
      geoTubeZ.dispose();
      geoTubeX.dispose();
      geoTubeY.dispose();
      for (const m of colorMats) m.dispose();
      for (const m of imageMats) {
        m.map?.dispose();
        m.dispose();
      }
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [
    slideKey,
    palette,
    background,
    lineColor,
    lineOpacity,
    grid,
    cellMode,
    tunnelSize,
    fade,
  ]);

  return (
    <div
      ref={frameRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: label ? "none" : "default",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      {label && (
        <div
          ref={cursorRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(0%, -100%) scale(1)",
            pointerEvents: "none",
            opacity: 0,
            background: labelFill,
            borderRadius: 9999,
            padding: "8px 18px",
            transition: "transform 0.1s ease, opacity 0.2s ease",
            whiteSpace: "nowrap",
            userSelect: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            border: "1px solid rgba(176, 146, 98, 0.4)",
            ...labelFont,
            color: labelColor,
          }}
        >
          {labelText}
        </div>
      )}
    </div>
  );
}

export default GalleryTunnel;
