"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * VasundharaLoader — Art-Directed Signature Opening Sequence
 *
 * Supports both:
 * 1. Custom Brand Loading Video (`public/videos/vasundhara_loading_video.mp4`)
 * 2. Signature Emblem & Wordmark Motion Sequence (Fallback / Default)
 *
 * Hard failsafe timeout guarantees the website reveals unconditionally.
 */

interface VasundharaLoaderProps {
  videoUrl?: string;
  onComplete?: () => void;
  minDuration?: number;
}

export function VasundharaLoader({
  videoUrl = "/videos/vasundhara_loading_video.mp4",
  onComplete,
  minDuration = 2600,
}: VasundharaLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Animation phase triggers
  const [emblemVisible, setEmblemVisible] = useState(false);
  const [sheenVisible, setSheenVisible] = useState(false);
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);

  const exitCalledRef = useRef(false);

  const handleExit = () => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;
    setVisible(false);
    try {
      sessionStorage.setItem("vdr_loader_completed", "1");
    } catch {}
    onComplete?.();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        setEmblemVisible(true);
        setWordmarkVisible(true);
        setTaglineVisible(true);
        setLineVisible(true);
        const t = setTimeout(handleExit, 250);
        return () => clearTimeout(t);
      }
    }

    // Check if loading video exists
    if (videoUrl) {
      const testVideo = document.createElement("video");
      testVideo.src = videoUrl;
      testVideo.oncanplay = () => setHasVideo(true);
      testVideo.onerror = () => setHasVideo(false);
    }

    // 0.3s: Emblem begins fading in
    const t1 = setTimeout(() => setEmblemVisible(true), 300);

    // 1.0s: Subtle champagne light sweep passes once across emblem
    const t2 = setTimeout(() => setSheenVisible(true), 1000);

    // 1.4s: Wordmark appears
    const t3 = setTimeout(() => setWordmarkVisible(true), 1400);

    // 1.8s: Tagline appears
    const t4 = setTimeout(() => setTaglineVisible(true), 1800);

    // 2.3s: Thin gold rule draws
    const t5 = setTimeout(() => setLineVisible(true), 2300);

    // 2.6s: Begin dissolving
    const t6 = setTimeout(handleExit, minDuration);

    // 4.5s: Hard absolute failsafe exit
    const tFailsafe = setTimeout(handleExit, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tFailsafe);
    };
  }, [minDuration, videoUrl]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="vdr-signature-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1], // Smooth film dissolve
            },
          }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#F7F2E9] select-none overflow-hidden"
          aria-label="Vasundhara Diamond Roof — Opening Sequence"
          role="status"
        >
          {/* OPTION A: Video Loading Experience (Plays if video file is present) */}
          {hasVideo ? (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#1C1A17]">
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                muted
                playsInline
                onEnded={handleExit}
                onError={() => setHasVideo(false)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/40 via-transparent to-[#1C1A17]/40 pointer-events-none" />
            </div>
          ) : (
            /* OPTION B: Art-Directed Signature Emblem Sequence */
            <>
              {/* Subtle Ambient Radial Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(253, 251, 247, 0.85) 0%, rgba(247, 242, 233, 0) 100%)",
                }}
              />

              {/* Delicate 1px Outer Framing Border */}
              <div className="absolute inset-6 sm:inset-10 lg:inset-14 border border-[#B09262]/15 pointer-events-none rounded-sm" />

              {/* Centered Identity Container */}
              <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-md text-center space-y-4">
                
                {/* 1. Official Emblem Artwork (0.3s -> 0.8s) */}
                <div className="relative overflow-visible flex items-center justify-center">
                  <motion.img
                    src="/brand/vasundhara-emblem-tight.png"
                    alt="Vasundhara Emblem"
                    draggable={false}
                    onError={handleExit}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={
                      emblemVisible
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.97 }
                    }
                    transition={{
                      duration: isReducedMotion ? 0.2 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_2px_8px_rgba(176,146,98,0.1)]"
                  />

                  {/* 1.0s: Restrained Champagne Gold Light Sweep (ONE pass only) */}
                  {sheenVisible && !isReducedMotion && (
                    <motion.div
                      initial={{ x: "-140%", opacity: 0 }}
                      animate={{ x: "180%", opacity: [0, 0.55, 0] }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                      className="absolute inset-y-0 w-8 pointer-events-none bg-gradient-to-r from-transparent via-[#C6AA78]/35 to-transparent mix-blend-overlay -skew-x-12"
                    />
                  )}
                </div>

                {/* 2. Official VASUNDHARA Wordmark (1.4s) */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={
                    wordmarkVisible
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 5 }
                  }
                  transition={{
                    duration: isReducedMotion ? 0.2 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full flex justify-center pt-1"
                >
                  <img
                    src="/brand/vasundhara-wordmark-tight.png"
                    alt="VASUNDHARA"
                    draggable={false}
                    onError={handleExit}
                    className="h-6 sm:h-7 md:h-8 w-auto max-w-[85%] object-contain"
                  />
                </motion.div>

                {/* 3. Official Tagline Artwork (1.8s) */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={
                    taglineVisible
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 4 }
                  }
                  transition={{
                    duration: isReducedMotion ? 0.2 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full flex justify-center"
                >
                  <img
                    src="/brand/vasundhara-tagline-tight.png"
                    alt="COUNTLESS TALES OF PRECIOUS"
                    draggable={false}
                    onError={handleExit}
                    className="h-2.5 sm:h-3 w-auto max-w-[70%] object-contain opacity-85"
                  />
                </motion.div>

                {/* 4. Fine Champagne Gold Horizontal Line (2.3s) */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={
                    lineVisible
                      ? { scaleX: 1, opacity: 1 }
                      : { scaleX: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-20 h-[1px] bg-[#B09262]/35"
                />
              </div>

              {/* Subdued Bottom Signature line */}
              <div className="absolute bottom-8 sm:bottom-10 pointer-events-none opacity-40">
                <span className="font-sans text-[8.5px] tracking-[0.45em] uppercase text-[#B09262] font-light">
                  EST. 1997 • HYDERABAD
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
