"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import {
  Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, SkinnedMesh,
  MeshStandardMaterial, Texture, Vector3, Quaternion, Bone, Skeleton,
  Float32BufferAttribute, Uint16BufferAttribute, FrontSide, RepeatWrapping,
  LinearFilter, SRGBColorSpace, RGBAFormat, Color, DirectionalLight, AmbientLight,
  PlaneGeometry, Mesh, Group, ShadowMaterial, PCFSoftShadowMap,
} from "three";

const CAMERA_DISTANCE = 1200;
const CAMERA_NEAR = 100;
const CAMERA_FAR = 2000;
const STICKER_DEPTH = 0.003;
const CANVAS_SCALE = 4;
const BONE_GRID_X = 30;
const BONE_GRID_Y = 30;
const SEGMENTS_W = 80;
const SEGMENTS_H = 60;
const FIXED_CURL_RADIUS = 0.15;
const FIXED_CURL_FACTOR = 0.6;
const _scratchQuat = new Quaternion();
const _scratchRotAxis = new Vector3();

function calculateCameraFov(width: number, height: number, distance: number) {
  const aspect = width / height;
  return 2 * Math.atan(width / aspect / (2 * distance)) * (180 / Math.PI);
}

function mapLinear(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function mapInternalRadius(ui: number) {
  return mapLinear(Math.max(0.1, Math.min(1, ui)), 0.1, 1, 0.05, 1 / Math.PI);
}

export interface StickerPeelProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  curlRotation?: number;
  hoverPeel?: number;
  pressPeel?: number;
  backColor?: string;
  className?: string;
}

export function StickerPeel({
  src,
  alt = "",
  width,
  height,
  curlRotation = 225,
  hoverPeel = 40,
  pressPeel = 60,
  backColor = "#1C1A17",
  className = "",
}: StickerPeelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const groupRef = useRef<any>(null);
  const bonesRef = useRef<any[]>([]);
  const bonesInitRef = useRef<any[]>([]);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);
  const curlRotRef = useRef(curlRotation);
  const animRef = useRef<Record<string, any>>({});
  const isHoveringRef = useRef(false);
  const isPressedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const isAnimRef = useRef(false);
  const animatedCurlRef = useRef({ amount: 0 });
  const pendingUpdateRef = useRef(false);
  const [sceneReady, setSceneReady] = useState(false);

  const curlAmountMV = useMotionValue(0);

  const renderFrame = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    const gl = rendererRef.current.getContext();
    if (!gl || gl.isContextLost()) return;
    if (meshRef.current?.skeleton) {
      meshRef.current.updateMatrixWorld(true);
      meshRef.current.skeleton.bones.forEach((b: any) => b?.updateMatrixWorld?.(true));
      meshRef.current.skeleton.update();
    }
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const startLoop = useCallback(() => {
    if (isAnimRef.current) return;
    isAnimRef.current = true;
    const loop = () => {
      if (!isAnimRef.current) return;
      renderFrame();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [renderFrame]);

  const stopLoop = useCallback(() => {
    isAnimRef.current = false;
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    requestAnimationFrame(() => renderFrame());
  }, [renderFrame]);

  const updateBones = useCallback(() => {
    if (!bonesRef.current.length || !meshRef.current?.skeleton) return;
    const bones = bonesRef.current;
    const inits = bonesInitRef.current;
    const amount = Math.min(1, Math.max(0, animatedCurlRef.current.amount));
    const curlStart = 1 - amount;
    const curlFactor = amount <= 0 ? 1e-4 : FIXED_CURL_FACTOR;
    const r = mapInternalRadius(FIXED_CURL_RADIUS);
    const { geometry } = meshRef.current;
    const w: number = geometry.parameters.width;
    const h: number = geometry.parameters.height;
    const rad = curlRotRef.current * (Math.PI / 180);
    const dirX = Math.cos(rad);
    const dirY = Math.sin(rad);
    _scratchRotAxis.set(-dirY, dirX, 0).normalize();
    const hw = w / 2, hh = h / 2;
    const maxDist = Math.max(hw * dirX + hh * dirY, hw * dirX - hh * dirY, -hw * dirX + hh * dirY, -hw * dirX - hh * dirY);
    const diag = Math.sqrt(w * w + h * h) / 2;
    const foldOff = -maxDist + curlStart * 2 * maxDist;
    const RPrime = (r * diag) / curlFactor;
    const arcLim = Math.PI * r * diag;

    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      const init = inits[i];
      const distOnDir = init.x * dirX + init.y * dirY;
      const sig = distOnDir - foldOff;
      if (sig > 0) {
        const angle_s = (sig * curlFactor) / (r * diag);
        let xRel: number, zRel: number, finalAngle: number;
        if (sig <= arcLim) {
          xRel = RPrime * Math.sin(angle_s);
          zRel = RPrime * (1 - Math.cos(angle_s));
          finalAngle = angle_s;
        } else {
          const Phi = Math.PI * curlFactor;
          xRel = RPrime * Math.sin(Phi) + (sig - arcLim) * Math.cos(Phi);
          zRel = RPrime * (1 - Math.cos(Phi)) + (sig - arcLim) * Math.sin(Phi);
          finalAngle = Phi;
        }
        const dx = xRel - sig;
        bone.position.x = init.x + dx * dirX;
        bone.position.y = init.y + dx * dirY;
        bone.position.z = init.z + zRel;
        _scratchQuat.setFromAxisAngle(_scratchRotAxis, -finalAngle);
        bone.quaternion.copy(_scratchQuat);
      } else {
        bone.position.copy(init);
        bone.quaternion.identity();
      }
    }
    meshRef.current.skeleton?.update();
  }, []);

  const scheduleBoneUpdate = useCallback(() => {
    if (pendingUpdateRef.current) return;
    pendingUpdateRef.current = true;
    requestAnimationFrame(() => { pendingUpdateRef.current = false; updateBones(); });
  }, [updateBones]);

  useMotionValueEvent(curlAmountMV, "change", (v) => {
    animatedCurlRef.current.amount = v;
    scheduleBoneUpdate();
  });

  const animateTo = useCallback((target: number) => {
    Object.values(animRef.current).forEach(c => c?.stop?.());
    startLoop();
    animRef.current.curl = animate(curlAmountMV, target, {
      type: "tween", duration: 0.55, ease: "easeInOut",
      onComplete: () => stopLoop(),
    });
  }, [curlAmountMV, startLoop, stopLoop]);

  const onEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (!isPressedRef.current) animateTo(hoverPeel / 100);
  }, [hoverPeel, animateTo]);
  const onLeave = useCallback(() => {
    isHoveringRef.current = false;
    isPressedRef.current = false;
    animateTo(0);
  }, [animateTo]);
  const onDown = useCallback(() => {
    isPressedRef.current = true;
    animateTo(pressPeel / 100);
  }, [pressPeel, animateTo]);
  const onUp = useCallback(() => {
    if (!isPressedRef.current) return;
    isPressedRef.current = false;
    animateTo(isHoveringRef.current ? hoverPeel / 100 : 0);
  }, [hoverPeel, animateTo]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const meshW = width, meshH = height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasW = meshW * CANVAS_SCALE, canvasH = meshH * CANVAS_SCALE;

    const scene = new Scene();
    sceneRef.current = scene;
    const camera = new PerspectiveCamera(calculateCameraFov(canvasW, canvasH, CAMERA_DISTANCE), canvasW / canvasH, CAMERA_NEAR, CAMERA_FAR);
    camera.position.set(0, 0, CAMERA_DISTANCE);
    cameraRef.current = camera;

    let renderer: any;
    try {
      renderer = new WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(Math.round(canvasW * dpr), Math.round(canvasH * dpr), false);
      renderer.setPixelRatio(1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;
      rendererRef.current = renderer;
    } catch (_) { return; }

    canvasRef.current.style.width = `${canvasW}px`;
    canvasRef.current.style.height = `${canvasH}px`;

    const geo = new BoxGeometry(meshW, meshH, STICKER_DEPTH, SEGMENTS_W, SEGMENTS_H, 1);
    const pos = geo.attributes.position;
    const v = new Vector3();
    const skinIdxs: number[] = [], skinWts: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const nx = (v.x + meshW / 2) / meshW;
      const ny = (v.y + meshH / 2) / meshH;
      const gx = nx * (BONE_GRID_X - 1), gy = ny * (BONE_GRID_Y - 1);
      const x0 = Math.floor(gx), y0 = Math.floor(gy);
      const x1 = Math.min(x0 + 1, BONE_GRID_X - 1), y1 = Math.min(y0 + 1, BONE_GRID_Y - 1);
      const tx = gx - x0, ty = gy - y0;
      skinIdxs.push(y0 * BONE_GRID_X + x0, y0 * BONE_GRID_X + x1, y1 * BONE_GRID_X + x0, y1 * BONE_GRID_X + x1);
      skinWts.push((1 - tx) * (1 - ty), tx * (1 - ty), (1 - tx) * ty, tx * ty);
    }
    geo.setAttribute("skinIndex", new Uint16BufferAttribute(skinIdxs, 4));
    geo.setAttribute("skinWeight", new Float32BufferAttribute(skinWts, 4));
    geo.computeVertexNormals();

    const bones: any[] = [];
    const bsx = meshW / (BONE_GRID_X - 1), bsy = meshH / (BONE_GRID_Y - 1);
    for (let y = 0; y < BONE_GRID_Y; y++) for (let x = 0; x < BONE_GRID_X; x++) {
      const bone = new Bone();
      bone.position.set(-meshW / 2 + x * bsx, -meshH / 2 + y * bsy, 0);
      bones.push(bone);
    }
    bonesRef.current = bones;
    bonesInitRef.current = bones.map(b => b.position.clone());

    const frontMat = new MeshStandardMaterial({ color: 0xffffff, side: FrontSide, transparent: true, roughness: 0.2, metalness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.8 });
    const backMat = new MeshStandardMaterial({ color: 0xffffff, side: FrontSide, transparent: true, roughness: 0.3, metalness: 0, emissive: 0xffffff, emissiveIntensity: 0.3 });
    const hexStr = backColor.replace("#", "");
    const br = parseInt(hexStr.slice(0, 2), 16) / 255, bg = parseInt(hexStr.slice(2, 4), 16) / 255, bb = parseInt(hexStr.slice(4, 6), 16) / 255;
    const sideMat = new MeshStandardMaterial({ color: new Color(br, bg, bb), transparent: true, opacity: 1, roughness: 0.1, metalness: 0 });
    const mesh = new SkinnedMesh(geo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]);
    mesh.frustumCulled = false;
    bones.forEach(b => { mesh.add(b); b.updateMatrixWorld(true); });
    mesh.bind(new Skeleton(bones));
    mesh.updateMatrixWorld(true);
    mesh.skeleton.update();
    mesh.castShadow = true;

    const group = new Group();
    groupRef.current = group;
    group.add(mesh);
    meshRef.current = mesh;
    scene.add(group);

    scene.add(new AmbientLight(0xffffff, 0.4));
    const dirLight = new DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(-300, 140, 400);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 2000;
    dirLight.shadow.bias = -0.00001;
    dirLight.shadow.radius = 8;
    const sz = Math.max(canvasW, canvasH);
    dirLight.shadow.camera.left = -sz / 2;
    dirLight.shadow.camera.right = sz / 2;
    dirLight.shadow.camera.top = sz / 2;
    dirLight.shadow.camera.bottom = -sz / 2;
    scene.add(dirLight);

    const shadowMat = new ShadowMaterial({ opacity: 0.3 });
    const shadowPlane = new Mesh(new PlaneGeometry(sz, sz), shadowMat);
    shadowPlane.receiveShadow = true;
    shadowPlane.position.set(0, 0, -1);
    scene.add(shadowPlane);

    // Load texture
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImgRef.current = img;
      const tex = new Texture(img);
      tex.needsUpdate = true;
      tex.minFilter = LinearFilter;
      tex.colorSpace = SRGBColorSpace;
      tex.format = RGBAFormat;
      const backTex = tex.clone();
      backTex.wrapS = RepeatWrapping;
      backTex.repeat.x = -1;
      backTex.offset.x = 1;
      backTex.needsUpdate = true;
      const mats = mesh.material as any[];
      if (mats[4]) { mats[4].map = tex; mats[4].emissiveMap = tex; mats[4].alphaTest = 0.01; mats[4].needsUpdate = true; }
      if (mats[5]) { mats[5].map = backTex; mats[5].alphaTest = 0.01; mats[5].needsUpdate = true; }
      for (let i = 0; i < 4; i++) { if (mats[i]) { mats[i].map = tex; mats[i].emissiveMap = tex; mats[i].alphaTest = 0.01; mats[i].needsUpdate = true; } }
      setSceneReady(true);
      updateBones();
      renderFrame();
    };
    img.src = src;

    renderer.render(scene, camera);

    return () => {
      isAnimRef.current = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      Object.values(animRef.current).forEach(c => c?.stop?.());
      mesh.geometry?.dispose();
      (mesh.material as any[]).forEach((m: any) => { m.map?.dispose(); m.dispose(); });
      try { renderer.dispose(); } catch (_) {}
      sceneRef.current = null;
      rendererRef.current = null;
    };
  }, [src, width, height, backColor, updateBones, renderFrame]);

  useEffect(() => { curlRotRef.current = curlRotation; updateBones(); renderFrame(); }, [curlRotation, updateBones, renderFrame]);

  const offsetPct = ((CANVAS_SCALE - 1) / 2) * 100;

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      onPointerUp={onUp}
      style={{ position: "relative", width, height, overflow: "visible", cursor: "pointer" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: `-${offsetPct}%`,
          left: `-${offsetPct}%`,
          display: "block",
          pointerEvents: "none",
          opacity: sceneReady ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {!sceneReady && (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 12 }} />
      )}
    </div>
  );
}
