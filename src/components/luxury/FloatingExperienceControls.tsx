"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { ConciergeModal } from "@/components/luxury/ConciergeModal";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";
import { getDefaultTrack } from "@/lib/audio/audio-config";

export interface FloatingExperienceControlsProps {
  isVisible?: boolean;
}

export function FloatingExperienceControls({ isVisible = true }: FloatingExperienceControlsProps) {
  // Ambient Sound State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Concierge Panel & Appointment Modal States
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const activeTrack = getDefaultTrack();

  useEffect(() => {
    // Session state check (Audio remains OFF by default unless user opted in during session)
    const savedState = localStorage.getItem("vdr_audio_enabled");
    const shouldPlay = savedState === "true";

    if (shouldPlay) {
      const handleFirstInteraction = () => {
        toggleAudio(true);
        window.removeEventListener("click", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction, { once: true });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleAudio = (forcePlay?: boolean) => {
    const nextState = forcePlay !== undefined ? forcePlay : !isPlaying;

    if (nextState) {
      // Lazy load audio instance only upon explicit user request
      if (!audioRef.current) {
        const audio = new Audio();
        audio.preload = "none";
        audio.loop = true;
        audio.crossOrigin = "anonymous";
        audio.src = activeTrack.src;
        audioRef.current = audio;
      }

      const audio = audioRef.current;

      if (!audioCtxRef.current) {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          const source = ctx.createMediaElementSource(audio);
          const gainNode = ctx.createGain();

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          source.connect(gainNode);
          gainNode.connect(ctx.destination);

          audioCtxRef.current = ctx;
          gainNodeRef.current = gainNode;
        } catch {
          // Web Audio API fallback
        }
      }

      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsUnavailable(false);
          localStorage.setItem("vdr_audio_enabled", "true");

          if (gainNodeRef.current && audioCtxRef.current) {
            gainNodeRef.current.gain.linearRampToValueAtTime(
              activeTrack.defaultVolume,
              audioCtxRef.current.currentTime + 1.5
            );
          }
        })
        .catch(() => {
          setIsPlaying(false);
          setIsUnavailable(true);
          localStorage.setItem("vdr_audio_enabled", "false");
        });
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 1.2
        );
        setTimeout(() => {
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          localStorage.setItem("vdr_audio_enabled", "false");
        }, 1200);
      } else {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem("vdr_audio_enabled", "false");
      }
    }
  };

  return (
    <>
      {/* FLOATING CONTROLS VERTICAL STACK (BOTTOM-RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 select-none">
        {/* 1. TOP CONTROL: AI CHATBOT / CONCIERGE BUTTON */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setConciergeOpen(true)}
          title="Vasundhara AI Concierge — Private Luxury Jewellery Advisor"
          aria-label="Open Vasundhara AI Concierge"
          className="group relative flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#1C1A17] to-[#24211D] text-[#FDFBF7] border border-[#B09262]/70 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:border-[#D4AF37] hover:shadow-[0_10px_40px_rgba(176,146,98,0.3)] transition-all duration-300 cursor-pointer"
        >
          {/* Subtle Outer Glow Ring */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#B09262]/30 via-[#D4AF37]/40 to-[#B09262]/30 opacity-70 group-hover:opacity-100 blur-sm transition-opacity pointer-events-none" />

          {/* Logo Container with AI Badge */}
          <div className="relative z-10 flex items-center shrink-0">
            <div className="relative p-1.5 rounded-full bg-[#2A2621] border border-[#B09262]/40">
              <VasundharaLogo
                variant="mark"
                theme="dark"
                heightClass="h-5"
                href={null}
                aria-hidden={true}
              />
            </div>
            {/* Prominent Gold AI Badge */}
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#F0D590] via-[#D4AF37] to-[#B09262] text-[8px] font-sans font-bold text-[#1C1A17] tracking-wider leading-none shadow-md">
              AI
            </span>
          </div>

          {/* AI Concierge Text Label (Always Visible) */}
          <div className="relative z-10 text-left pr-1">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xs sm:text-sm text-[#FDFBF7] font-medium tracking-wide">
                AI Concierge
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#C6AA78] block">
              Private Luxury Advisor
            </span>
          </div>
        </motion.button>

        {/* 2. BOTTOM CONTROL: AMBIENT SOUND BUTTON */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={() => toggleAudio()}
          aria-label={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
          title={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#F7F3EA]/95 backdrop-blur-md border border-[#B09262]/30 rounded-full shadow-md hover:border-[#B09262] transition-all duration-300 text-[#24211D] group cursor-pointer"
        >
          {/* Subtle Equalizer Bars when Playing */}
          {isPlaying ? (
            <div className="flex items-center gap-[2px] h-3 px-0.5">
              <span className="w-[1.5px] h-2 bg-[#B09262] animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-[1.5px] h-3 bg-[#B09262] animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-[1.5px] h-1.5 bg-[#B09262] animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#6E685F]" />
          )}

          <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-medium text-[#6E685F] group-hover:text-[#24211D] transition-colors">
            {isUnavailable ? "Sound Unavailable" : isPlaying ? "♫ SOUND ON" : "♫ SOUND OFF"}
          </span>
        </motion.button>
      </div>

      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
