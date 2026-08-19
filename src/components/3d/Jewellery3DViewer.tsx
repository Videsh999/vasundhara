"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { RotateCcw, Play, Pause, Maximize2 } from "lucide-react";
import { ThreeErrorBoundary } from "@/components/3d/ThreeErrorBoundary";

interface Jewellery3DMeshProps {
  autoRotate: boolean;
}

function Jewellery3DMesh({ autoRotate }: Jewellery3DMeshProps) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Central Kundan Pendant Sculpture */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1.4, 2]} />
          <meshStandardMaterial
            color="#8C734B"
            metalness={0.92}
            roughness={0.18}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Central Emerald Gemstone Inset */}
        <mesh position={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.65, 0.65, 0.3, 8]} />
          <meshPhysicalMaterial
            color="#0F3622"
            transmission={0.65}
            opacity={1}
            transparent
            roughness={0.1}
            ior={1.75}
            reflectivity={0.9}
            clearcoat={1}
          />
        </mesh>

        {/* Outer Polki Diamond Halo Frame */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 1.7;
          const y = Math.sin(angle) * 1.7;
          return (
            <mesh key={i} position={[x, y, 0.1]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshPhysicalMaterial
                color="#FDFBF7"
                metalness={0.1}
                roughness={0.05}
                transmission={0.85}
                ior={2.4}
                reflectivity={1}
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
}

interface Jewellery3DViewerProps {
  title: string;
  posterImage: string;
}

export function Jewellery3DViewer({ title, posterImage }: Jewellery3DViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setAutoRotate(false);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F3E9] border border-[#8C734B]/20">
        <img src={posterImage} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <ThreeErrorBoundary fallbackImage={posterImage} title={title}>
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F7F3E9] to-[#EFE9DA] border border-[#8C734B]/30 shadow-2xl group select-none">
        {/* Studio Lighting Canvas */}
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FFF8E7" />
          <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#8C734B" />
          <pointLight position={[0, 4, 3]} intensity={1.2} color="#FFFFFF" />

          <Jewellery3DMesh autoRotate={autoRotate} />

          <OrbitControls
            enableZoom={true}
            minDistance={3}
            maxDistance={7}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.6}
            dampingFactor={0.05}
          />
        </Canvas>

        {/* Overlay Label & Controls */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-[#1C1A17]/80 backdrop-blur-md rounded-full text-[#FDFBF7] text-[9px] uppercase tracking-widest border border-[#8C734B]/30">
          <span className="font-serif text-[#B59A5B]">✦</span>
          <span>3D ATELIER INTERACTIVE VIEW</span>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="p-2.5 bg-[#1C1A17]/80 hover:bg-[#8C734B] text-[#FDFBF7] backdrop-blur-md rounded-full border border-[#8C734B]/30 transition-colors"
            title={autoRotate ? "Pause Auto Rotation" : "Play Auto Rotation"}
            aria-label="Toggle Auto Rotation"
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
}
