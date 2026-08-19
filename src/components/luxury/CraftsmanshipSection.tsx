"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { BorderTrail } from "@/components/core/border-trail";

export function CraftsmanshipSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Selective parallax (25px offset)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 lg:py-40 bg-[#FBF9F4] text-[#24211D] border-b border-[#B09262]/20 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Extreme Close-Up Macro Jewellery Photography with Border Trail Beam */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 1.025 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6 overflow-hidden rounded-2xl shadow-2xl bg-[#F7F3EA]"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden group"
            >
              {/* Macro Diamond Photography */}
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200"
                alt="Vasundhara Master Craftsmanship Close-up"
                className="w-full h-full object-cover object-center transform transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                loading="lazy"
              />

              {/* Natural Diamond Light Glimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FDFBF7]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 pointer-events-none" />

              {/* Floating Caption Badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-[#24211D]/80 backdrop-blur-md border border-[#B09262]/30 text-[#FDFBF7] text-[9px] uppercase tracking-[0.25em] font-medium">
                ✦ 24K PURE GOLD FOIL KUNDAN ENCASEMENT
              </div>
            </motion.div>

            {/* Glowing Champagne Gold Border Beam (Zero Solid Blocks — Perimeter Line Only) */}
            <BorderTrail size={160} duration={6} />
          </motion.div>

          {/* Right Column: Editorial Typography & Rotating Watch Control */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start justify-between"
            >
              {/* Eyebrow & Headline */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-3">
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B09262] font-semibold">
                    CRAFTSMANSHIP
                  </span>
                  <div className="w-12 h-[1px] bg-[#B09262]/50" />
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#24211D] font-light leading-[1.12] tracking-tight">
                  <span className="block">Where Artistry</span>
                  <span className="italic font-normal block">Meets Perfection</span>
                </h2>
              </div>

              {/* Circular "WATCH OUR STORY" Interactive Control */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="group relative flex flex-col items-center justify-center p-3 cursor-pointer shrink-0"
                aria-label="Watch Craftsmanship Story Film"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#B09262]/40 group-hover:border-[#B09262] flex items-center justify-center transition-colors duration-500">
                  {/* Rotating Circular Text SVG */}
                  <svg className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path id="craftCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text className="font-sans text-[8.5px] uppercase tracking-[0.24em] fill-[#B09262] font-semibold">
                      <textPath xlinkHref="#craftCirclePath">
                        WATCH OUR STORY • ATELIER •
                      </textPath>
                    </text>
                  </svg>

                  {/* Center Play Icon */}
                  <div className="w-8 h-8 rounded-full bg-[#B09262]/15 group-hover:bg-[#B09262] flex items-center justify-center transition-colors duration-300">
                    <Play className="w-3.5 h-3.5 fill-[#B09262] text-[#B09262] group-hover:fill-[#FDFBF7] group-hover:text-[#FDFBF7] ml-0.5 transition-colors" />
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Editorial Body Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed max-w-xl"
            >
              <p className="font-serif text-base sm:text-lg text-[#24211D] font-light italic leading-snug">
                Every facet, every curve, every detail is shaped by passion and perfected by expertise.
              </p>
              <p>
                In our private ateliers, master goldsmiths execute ancient Nakshi engraving and miniature Kundan stone-setting entirely by hand. No machines, no shortcuts—only pure devotion to the art of fine Indian jewellery.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <Link
                href="/heritage"
                className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-[#B09262] hover:text-[#24211D] transition-colors pb-1 border-b border-[#B09262]/40 hover:border-[#24211D]"
              >
                <span>EXPLORE CRAFTSMANSHIP</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-400" />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#24211D]/90 backdrop-blur-md p-6">
          <div className="relative w-full max-w-4xl bg-[#1C1A17] rounded-2xl overflow-hidden border border-[#B09262]/40 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#24211D]/80 hover:bg-[#B09262] text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close Film"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-luxury-diamond-ring-glimmering-in-light-42867-large.mp4"
                autoPlay
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
