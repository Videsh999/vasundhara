"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ParallaxDepthSectionProps {
  image: string;
  title: string;
  subtitle: string;
}

export function ParallaxDepthSection({ image, title, subtitle }: ParallaxDepthSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25 select-none"
    >
      <motion.img
        src={image}
        alt={title}
        animate={{
          x: mousePos.x * -15,
          y: mousePos.y * -15,
          scale: 1.04,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/70 via-transparent to-transparent opacity-70" />

      <motion.div
        animate={{
          x: mousePos.x * 12,
          y: mousePos.y * 12,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        className="absolute bottom-8 left-8 right-8 text-[#FDFBF7] space-y-1"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B59A5B] block font-medium">
          {subtitle}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FDFBF7]">
          {title}
        </h3>
      </motion.div>
    </div>
  );
}
