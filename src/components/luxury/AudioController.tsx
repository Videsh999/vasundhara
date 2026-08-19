"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const AUDIO_SRC = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-relaxation-114986.mp3";

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Check saved user preference
    const savedState = localStorage.getItem("vdr_audio_enabled");
    const shouldPlay = savedState === "true";

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    if (shouldPlay) {
      // Attempt restored audio play on first user interaction to comply with browser policy
      const handleFirstInteraction = () => {
        toggleAudio(true);
        window.removeEventListener("click", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction, { once: true });
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = (forcePlay?: boolean) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const nextState = forcePlay !== undefined ? forcePlay : !isPlaying;

    if (nextState) {
      // Initialize Web Audio API for smooth gain fade-in
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const source = ctx.createMediaElementSource(audio);
        const gainNode = ctx.createGain();
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        audioCtxRef.current = ctx;
        gainNodeRef.current = gainNode;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      audio.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem("vdr_audio_enabled", "true");
        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(
            0.25,
            audioCtxRef.current.currentTime + 1.5
          );
        }
      }).catch(() => {
        // Handle autoplay policy restriction
        setIsPlaying(false);
      });
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 1.2
        );
        setTimeout(() => {
          audio.pause();
          setIsPlaying(false);
          localStorage.setItem("vdr_audio_enabled", "false");
        }, 1200);
      } else {
        audio.pause();
        setIsPlaying(false);
        localStorage.setItem("vdr_audio_enabled", "false");
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={() => toggleAudio()}
      title={isPlaying ? "Mute Vasundhara Ambient Audio" : "Play Vasundhara Ambient Audio"}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-2.5 bg-[#FDFBF7]/90 backdrop-blur-md border border-[#8C734B]/30 rounded-full shadow-luxury hover:border-[#8C734B] transition-all duration-300 text-[#1C1A17] group"
    >
      <div className="relative flex items-center justify-center text-[#8C734B]">
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#8C734B]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#686256]" />
        )}
      </div>

      <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-medium text-[#1C1A17] group-hover:text-[#8C734B] transition-colors">
        {isPlaying ? "Ambient Sound On" : "Ambient Sound"}
      </span>

      {/* Animated Soundwave Lines when playing */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-3 ml-1">
          <span className="w-[2px] h-full bg-[#8C734B] animate-pulse" style={{ animationDuration: '0.6s' }} />
          <span className="w-[2px] h-2/3 bg-[#8C734B] animate-pulse" style={{ animationDuration: '0.9s' }} />
          <span className="w-[2px] h-4/5 bg-[#8C734B] animate-pulse" style={{ animationDuration: '0.7s' }} />
        </div>
      )}
    </motion.button>
  );
}
