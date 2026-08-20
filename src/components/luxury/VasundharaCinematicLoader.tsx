"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * VasundharaCinematicLoader — Official Cinematic Brand Opening Experience
 *
 * State Machine:
 * 1. LOADING: Preloads video on warm ivory canvas (#F7F2E9)
 * 2. PLAYING: Fullscreen video plays silently (muted, autoplay, playsInline)
 * 3. COMPLETING: Video reaches final frame -> holds for 350-450ms
 * 4. REVEALING: Soft ivory/champagne dissolve (opacity: 1 -> 0 over 1000ms)
 * 5. COMPLETE: Loader unmounts, scrolling restored, website fully interactive
 */

type LoaderState = "LOADING" | "PLAYING" | "COMPLETING" | "REVEALING" | "COMPLETE";

interface VasundharaCinematicLoaderProps {
  videoSrc?: string;
  fallbackVideoSrc?: string;
  desktopVideoSrc?: string;
  mobileVideoSrc?: string;
  onComplete?: () => void;
  maxTimeoutMs?: number;
}

let globalHasSeenIntro = false;

export function VasundharaCinematicLoader({
  videoSrc,
  fallbackVideoSrc = "/videos/vasundhara_loading.mp4",
  desktopVideoSrc = "/brand/vdr-loading-film.mp4",
  mobileVideoSrc = "/videos/vasundhara_loading.mp4",
  onComplete,
  maxTimeoutMs = 6000,
}: VasundharaCinematicLoaderProps) {
  const primarySrc = videoSrc || desktopVideoSrc;
  const secondarySrc = fallbackVideoSrc || mobileVideoSrc;

  const [loaderState, setLoaderState] = useState<LoaderState>("PLAYING");
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const exitCalledRef = useRef<boolean>(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  const failsafeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Safe Exit Coordinator
  const triggerExit = useCallback(() => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;

    setLoaderState("REVEALING");

    // Allow 1000ms for soft ivory dissolve animation before unmount
    revealTimerRef.current = setTimeout(() => {
      setLoaderState("COMPLETE");
      onComplete?.();
    }, 1000);
  }, [onComplete]);

  // Lock Document Scroll while loading
  useEffect(() => {
    if (loaderState !== "COMPLETE") {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
      };
    }
  }, [loaderState]);

  // Autoplay trigger, session check & timeout safeguards
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if forceIntro param is present in URL (e.g. user clicked brand logo)
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get("intro") === "true";

    if (globalHasSeenIntro && !forceIntro) {
      setLoaderState("COMPLETE");
      onComplete?.();
      return;
    }

    globalHasSeenIntro = true;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      const reducedTimer = setTimeout(triggerExit, 1200);
      return () => clearTimeout(reducedTimer);
    }

    // Play video immediately if mounted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay blocked, gracefully reveal
      });
    }

    // Hard Failsafe Maximum Timeout (6s)
    failsafeTimerRef.current = setTimeout(() => {
      if (!exitCalledRef.current) {
        triggerExit();
      }
    }, maxTimeoutMs);

    return () => {
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, [maxTimeoutMs, triggerExit, onComplete]);

  // Video Event Handlers
  const handleVideoEnded = () => {
    setLoaderState("COMPLETING");
    // Hold final frame for 400ms before soft dissolve
    holdTimerRef.current = setTimeout(() => {
      triggerExit();
    }, 400);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      // If within last 150ms of video duration
      if (videoRef.current.currentTime >= videoRef.current.duration - 0.15) {
        if (loaderState === "PLAYING") {
          handleVideoEnded();
        }
      }
    }
  };

  const handleVideoError = () => {
    setHasVideoError(true);
    // Display static brand emblem on ivory for 1.2s, then reveal homepage
    setTimeout(triggerExit, 1200);
  };

  const isVisible = loaderState !== "COMPLETE";

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="vasundhara-cinematic-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1], // Smooth film dissolve
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F2E9] select-none overflow-hidden"
          aria-label="Vasundhara Diamond Roof — Cinematic Opening Film"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(253, 251, 247, 0.3) 0%, rgba(247, 242, 233, 0) 100%)",
            }}
          />

          {/* MAIN CINEMATIC VIDEO LAYER */}
          {!hasVideoError && !isReducedMotion ? (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#F7F2E9]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                onTimeUpdate={handleTimeUpdate}
                onError={handleVideoError}
                className="w-full h-full object-cover object-center pointer-events-none"
                style={{ objectPosition: "center center" }}
              >
                <source src={primarySrc} type="video/mp4" />
                <source src={secondarySrc} type="video/mp4" />
              </video>

              {/* Restrained ivory edge blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2E9]/20 via-transparent to-[#F7F2E9]/20 pointer-events-none" />
            </div>
          ) : (
            /* FALLBACK / REDUCED MOTION BRAND PRESENTATION */
            <div className="relative z-20 flex flex-col items-center justify-center space-y-4 px-6 text-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src="/brand/vasundhara-emblem-tight.png"
                alt="Vasundhara Diamond Roof"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_2px_8px_rgba(176,146,98,0.15)]"
              />
              <motion.img
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                src="/brand/vasundhara-wordmark-tight.png"
                alt="VASUNDHARA"
                className="h-6 sm:h-7 md:h-8 w-auto max-w-[85%] object-contain"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-[1px] bg-[#B09262]/40"
              />
            </div>
          )}

          {/* Delicate 1px Framing Border */}
          <div className="absolute inset-6 sm:inset-10 lg:inset-14 border border-[#B09262]/20 pointer-events-none rounded-sm z-30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
