"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { EventItem } from "@/lib/supabase/mock-data";

interface ExperiencesSectionProps {
  events: EventItem[];
}

// ──────────────────────────────────────────────────────────────
// Sticker Peel Card — inline WebGL peel on hover/press
// ──────────────────────────────────────────────────────────────
function StickerPeelImage({ src, alt, eventType }: { src: string; alt: string; eventType: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const animRef = useRef<{ stop?: () => void }>({});
  const peelRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isLoopingRef = useRef(false);

  // ── lazy-load Three.js only in browser ──
  const threeRef = useRef<any>(null);
  const sceneDataRef = useRef<any>(null);

  const startLoop = (scene: any) => {
    if (isLoopingRef.current) return;
    isLoopingRef.current = true;
    const tick = () => {
      if (!isLoopingRef.current) return;
      applyPeel(scene, peelRef.current);
      scene.renderer.render(scene.scene, scene.camera);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopLoop = (scene: any) => {
    isLoopingRef.current = false;
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    applyPeel(scene, peelRef.current);
    scene.renderer.render(scene.scene, scene.camera);
  };

  const applyPeel = (sd: any, amount: number) => {
    const { bones, inits, mesh, meshW, meshH, GRID_X, GRID_Y, THREE } = sd;
    if (!bones.length || !mesh?.skeleton) return;
    const curlFactor = amount <= 0 ? 1e-4 : 0.6;
    const curlRadius = 0.15;
    const r = Math.max(0.1, Math.min(1, curlRadius));
    const rMapped = (r - 0.1) / (1 - 0.1) * (1 / Math.PI - 0.05) + 0.05;
    const diag = Math.sqrt(meshW * meshW + meshH * meshH) / 2;
    const RPrime = (rMapped * diag) / curlFactor;
    const arcLim = Math.PI * rMapped * diag;
    const curlRad = 225 * (Math.PI / 180);
    const dirX = Math.cos(curlRad), dirY = Math.sin(curlRad);
    const axisVec = new THREE.Vector3(-dirY, dirX, 0).normalize();
    const hw = meshW / 2, hh = meshH / 2;
    const maxDist = Math.max(hw * dirX + hh * dirY, hw * dirX - hh * dirY, -hw * dirX + hh * dirY, -hw * dirX - hh * dirY);
    const curlStart = 1 - amount;
    const foldOff = -maxDist + curlStart * 2 * maxDist;

    const quat = new THREE.Quaternion();
    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      const init = inits[i];
      const sig = (init.x * dirX + init.y * dirY) - foldOff;
      if (sig > 0) {
        const angle_s = (sig * curlFactor) / (rMapped * diag);
        let xRel: number, zRel: number, finalAngle: number;
        if (sig <= arcLim) {
          xRel = RPrime * Math.sin(angle_s); zRel = RPrime * (1 - Math.cos(angle_s)); finalAngle = angle_s;
        } else {
          const Phi = Math.PI * curlFactor;
          xRel = RPrime * Math.sin(Phi) + (sig - arcLim) * Math.cos(Phi);
          zRel = RPrime * (1 - Math.cos(Phi)) + (sig - arcLim) * Math.sin(Phi);
          finalAngle = Phi;
        }
        const dx = xRel - sig;
        bone.position.set(init.x + dx * dirX, init.y + dx * dirY, init.z + zRel);
        quat.setFromAxisAngle(axisVec, -finalAngle);
        bone.quaternion.copy(quat);
      } else {
        bone.position.copy(init);
        bone.quaternion.identity();
      }
    }
    mesh.skeleton?.update();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    let destroyed = false;

    (async () => {
      const THREE = await import("three");
      if (destroyed) return;
      threeRef.current = THREE;

      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;

      const GRID_X = 20, GRID_Y = 20;
      const SCALE = 3;
      const meshW = wrap.offsetWidth || 480;
      const meshH = wrap.offsetHeight || 300;
      const canvasW = meshW * SCALE, canvasH = meshH * SCALE;

      const scene = new THREE.Scene();
      const camDist = 1200;
      const fov = 2 * Math.atan(canvasW / (canvasW / canvasH) / (2 * camDist)) * (180 / Math.PI);
      const camera = new THREE.PerspectiveCamera(fov, canvasW / canvasH, 100, 2000);
      camera.position.set(0, 0, camDist);

      let renderer: any;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvasW, canvasH, false);
        renderer.setPixelRatio(1);
        renderer.shadowMap.enabled = true;
      } catch (_) { return; }

      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;

      // Build skinned mesh
      const geo = new THREE.BoxGeometry(meshW, meshH, 1, 60, 40, 1);
      const pos = geo.attributes.position;
      const sv = new THREE.Vector3();
      const skinIdxs: number[] = [], skinWts: number[] = [];
      for (let i = 0; i < pos.count; i++) {
        sv.fromBufferAttribute(pos, i);
        const nx = (sv.x + meshW / 2) / meshW, ny = (sv.y + meshH / 2) / meshH;
        const gx = nx * (GRID_X - 1), gy = ny * (GRID_Y - 1);
        const x0 = Math.floor(gx), y0 = Math.floor(gy);
        const x1 = Math.min(x0 + 1, GRID_X - 1), y1 = Math.min(y0 + 1, GRID_Y - 1);
        const tx = gx - x0, ty = gy - y0;
        skinIdxs.push(y0 * GRID_X + x0, y0 * GRID_X + x1, y1 * GRID_X + x0, y1 * GRID_X + x1);
        skinWts.push((1 - tx) * (1 - ty), tx * (1 - ty), (1 - tx) * ty, tx * ty);
      }
      geo.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIdxs, 4));
      geo.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWts, 4));
      geo.computeVertexNormals();

      const bones: any[] = [];
      const bsx = meshW / (GRID_X - 1), bsy = meshH / (GRID_Y - 1);
      for (let y = 0; y < GRID_Y; y++) for (let x = 0; x < GRID_X; x++) {
        const b = new THREE.Bone();
        b.position.set(-meshW / 2 + x * bsx, -meshH / 2 + y * bsy, 0);
        bones.push(b);
      }
      const inits = bones.map(b => b.position.clone());

      const frontMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.FrontSide, transparent: true, roughness: 0.2, metalness: 0.3, emissive: 0xffffff, emissiveIntensity: 0.85 });
      const backMat = new THREE.MeshStandardMaterial({ color: 0x1c1a17, side: THREE.FrontSide, transparent: true, roughness: 0.4, metalness: 0, emissive: 0x1c1a17, emissiveIntensity: 0.2 });
      const sideMat = new THREE.MeshStandardMaterial({ color: 0x1c1a17, transparent: true, opacity: 1 });

      const mesh = new THREE.SkinnedMesh(geo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
      mesh.frustumCulled = false;
      bones.forEach(b => { mesh.add(b); b.updateMatrixWorld(true); });
      mesh.bind(new THREE.Skeleton(bones));
      mesh.updateMatrixWorld(true);
      mesh.skeleton.update();
      mesh.castShadow = true;
      scene.add(mesh);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const dir = new THREE.DirectionalLight(0xffffff, 1.8);
      dir.position.set(-300, 140, 400);
      dir.castShadow = true;
      scene.add(dir);

      // Shadow plane
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
      const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(canvasW * 2, canvasH * 2), shadowMat);
      shadowPlane.receiveShadow = true;
      shadowPlane.position.set(0, 0, -1);
      scene.add(shadowPlane);

      const sd = { scene, camera, renderer, mesh, bones, inits, meshW, meshH, GRID_X, GRID_Y, THREE };
      sceneDataRef.current = sd;

      // Load image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (destroyed) return;
        const tex = new THREE.Texture(img);
        tex.needsUpdate = true;
        tex.minFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        const backTex = tex.clone();
        backTex.wrapS = THREE.RepeatWrapping;
        backTex.repeat.x = -1;
        backTex.offset.x = 1;
        backTex.needsUpdate = true;
        const mats = mesh.material as any[];
        if (mats[4]) { mats[4].map = tex; mats[4].emissiveMap = tex; mats[4].alphaTest = 0.01; mats[4].needsUpdate = true; }
        if (mats[5]) { mats[5].map = backTex; mats[5].alphaTest = 0.01; mats[5].needsUpdate = true; }
        for (let i = 0; i < 4; i++) { if (mats[i]) { mats[i].map = tex; mats[i].emissiveMap = tex; mats[i].alphaTest = 0.01; mats[i].needsUpdate = true; } }
        applyPeel(sd, 0);
        renderer.render(scene, camera);
        setLoaded(true);
      };
      img.src = src;
    })();

    return () => {
      destroyed = true;
      isLoopingRef.current = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      animRef.current?.stop?.();
    };
  }, [src]);

  const animatePeelTo = (target: number) => {
    animRef.current?.stop?.();
    const sd = sceneDataRef.current;
    if (!sd) return;
    const from = peelRef.current;
    const duration = 0.55;
    const start = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    startLoop(sd);
    let running = true;
    const tick = () => {
      if (!running) return;
      const elapsed = (performance.now() - start) / (duration * 1000);
      const t = Math.min(1, elapsed);
      peelRef.current = from + (target - from) * ease(t);
      if (t < 1) requestAnimationFrame(tick);
      else { peelRef.current = target; stopLoop(sd); }
    };
    animRef.current = { stop: () => { running = false; } };
    requestAnimationFrame(tick);
  };

  const offsetPct = ((3 - 1) / 2) * 100;

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[16/10] overflow-visible bg-[#EFE9DA] rounded-t-2xl"
      onPointerEnter={() => animatePeelTo(0.38)}
      onPointerLeave={() => animatePeelTo(0)}
      onPointerDown={() => animatePeelTo(0.58)}
      onPointerUp={() => animatePeelTo(0.38)}
      style={{ cursor: "pointer" }}
    >
      {/* Fallback image while WebGL loads */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover rounded-t-2xl transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
        loading="lazy"
      />

      {/* WebGL canvas — oversized to allow shadow overflow */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{
          top: `-${offsetPct}%`,
          left: `-${offsetPct}%`,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s",
          borderRadius: 0,
        }}
      />

      {/* Event type badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FDFBF7]/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-[0.2em] text-[#B09262] font-medium border border-[#B09262]/25">
        {eventType}
      </div>
    </div>
  );
}

export function ExperiencesSection({ events }: ExperiencesSectionProps) {
  const displayEvents = events.slice(0, 2);

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F4] text-[#24211D] border-b border-[#B09262]/20 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block">
              EXPERIENCES & SOIRÉES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light tracking-tight"
          >
            Events & Exhibitions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-sm sm:text-base italic text-[#6E685F] font-light"
          >
            "Moments where high jewellery meets culture and conversation."
          </motion.p>
        </div>

        {/* 2-Column Sticker Peel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayEvents.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35, scale: 1.025 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#F7F3EA] rounded-2xl overflow-visible border border-[#B09262]/25 shadow-sm flex flex-col justify-between"
            >
              {/* Sticker Peel Photo */}
              <StickerPeelImage
                src={item.coverImage}
                alt={item.title}
                eventType={item.eventType}
              />

              <div className="p-8 sm:p-10 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#B09262] font-medium">
                  <span className="flex items-center gap-1.5 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.dateStart}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#24211D] font-light group-hover:text-[#B09262] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#6E685F] leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#B09262]/20 flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#6E685F]">
                    {item.venueDetails}
                  </span>
                  <Link
                    href={`/events/${item.slug}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#B09262] hover:text-[#24211D] font-medium transition-colors group/btn"
                  >
                    <span>REQUEST INVITATION</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-400" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
