"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CinematicHeroProps {
  videoUrl?: string;
  posterUrl?: string;
  eyebrow?: string;
  title?: string;
  headline?: string;
  isVisible?: boolean;
}

export function CinematicHero({
  videoUrl = "/videos/vasundhara_hero_video.mp4",
  posterUrl = "/brand/vasundhara-royal-bride-portrait.jpg",
  eyebrow = "ESTABLISHED 1997 • HYDERABAD",
  title = "VASUNDHARA",
  headline = "Where Heritage Meets Timeless Brilliance",
  isVisible = true,
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Subtle Parallax (Restrained 25px offset)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, [videoUrl]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[650px] flex items-center justify-center overflow-hidden bg-[#1C1A17] text-[#FDFBF7] select-none"
    >
      {/* 1. Cinematic Background Media with Initial Scale (1.06 -> 1.0) & Subtle Parallax */}
      <motion.div
        style={{ y: mediaY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1.0 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Baseline Poster Image */}
        <img
          src={posterUrl}
          alt="Vasundhara Diamond Roof"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* High-Definition Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </motion.div>

      {/* 2. Restrained Luxury Dual Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 via-[#1C1A17]/20 to-[#1C1A17]/75 pointer-events-none z-1" />

      {/* 3. Sequenced Editorial Typography (0.4s Eyebrow -> 0.7s Title -> 1.0s Subtitle -> 1.3s CTA) */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* 0.4s: Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24211D]/60 backdrop-blur-md border border-[#B09262]/35 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C6AA78]" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#EFE9DA] font-medium">
            {eyebrow}
          </span>
        </motion.div>

        {/* 0.7s: Main Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] font-light uppercase text-[#FDFBF7] drop-shadow-md"
        >
          {title}
        </motion.h1>

        {/* 1.0s: Supporting Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-lg sm:text-2xl md:text-3xl italic text-[#EFE9DA]/90 mt-3 font-light max-w-2xl leading-relaxed"
        >
          "{headline}"
        </motion.p>

        {/* 1.3s: Hero Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/collections"
            className="group px-7 py-3.5 bg-[#B09262] hover:bg-[#C6AA78] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href="/bespoke"
            className="px-7 py-3.5 bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 border border-[#EFE9DA]/40 text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full backdrop-blur-md transition-all duration-300"
          >
            BEGIN YOUR BESPOKE JOURNEY
          </Link>
        </motion.div>
      </div>

      {/* 4. Minimal Cinematic Scroll Indicator */}
      <motion.button
        aria-label="Discover Vasundhara Homepage Content"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight - 60, behavior: "smooth" });
        }}
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-[#EFE9DA] font-medium">
          DISCOVER
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#B09262]" />
      </motion.button>
    </section>
  );
}
