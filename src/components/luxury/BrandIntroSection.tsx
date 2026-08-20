"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function BrandIntroSection() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-[#F7F3EA] text-[#24211D] overflow-hidden border-b border-[#B09262]/20 select-none">
      {/* Delicate Botanical Line Art Background Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 sm:w-96 lg:w-[480px] h-[480px] pointer-events-none opacity-[0.14] select-none">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#B09262] stroke-current">
          <path d="M200 40C200 40 230 110 300 130C300 130 240 170 240 240C240 240 180 200 130 230C130 230 150 160 110 110C110 110 170 120 200 40Z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M200 240C200 240 210 320 270 360" strokeWidth="1" strokeLinecap="round" />
          <path d="M170 270C170 270 130 300 90 290" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="200" cy="180" r="14" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Architectural Arched Alcove Presentation */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 1.025 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-2xl overflow-hidden border border-[#B09262]/35 shadow-2xl bg-[#24211D] group">
              
              {/* Full Bleed Heritage Portrait */}
              <img
                src="/brand/vasundhara-temple-heritage-bride.jpg"
                alt="Vasundhara Temple Jewellery Heritage - Royal Indian Bride in Blue Silk"
                className="w-full h-full object-cover object-top transform transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />

              {/* Concentric Architectural Gold Arches Overlay */}
              <div className="absolute inset-3 sm:inset-4 rounded-t-[125px] sm:rounded-t-[160px] rounded-b-xl border border-[#B09262]/35 pointer-events-none" />
              <div className="absolute inset-6 sm:inset-8 rounded-t-[110px] sm:rounded-t-[140px] rounded-b-lg border border-[#FDFBF7]/20 pointer-events-none" />

              {/* Gradient Vignettes for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/80 via-transparent to-[#24211D]/50 pointer-events-none" />

              {/* Top Inscription Glass Pill */}
              <div className="absolute top-6 inset-x-0 z-10 flex justify-center px-4">
                <span className="px-4 py-1.5 rounded-full bg-[#24211D]/70 backdrop-blur-md border border-[#B09262]/40 font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#EFE9DA] font-medium shadow-lg">
                  MAISON VASUNDHARA • HYDERABAD
                </span>
              </div>

              {/* Bottom Inscription Glass Banner */}
              <div className="absolute bottom-6 inset-x-6 z-10 text-center">
                <div className="p-3 rounded-xl bg-[#24211D]/75 backdrop-blur-md border border-[#B09262]/35 shadow-xl space-y-0.5">
                  <span className="font-serif text-xs sm:text-sm italic tracking-[0.15em] text-[#FDFBF7] block">
                    Est. April 1997 • Master Karigar Lineage
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#C6AA78] block">
                    Temple Heritage & Royal South Indian Goldsmithing
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Line-Revealed Storytelling */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-3">
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B09262] font-semibold">
                  OUR STORY
                </span>
                <div className="w-12 h-[1px] bg-[#B09262]/50" />
              </div>

              {/* Editorial Line Reveal Heading */}
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#24211D] font-light leading-[1.12] tracking-tight">
                <span className="block">A Legacy Crafted</span>
                <span className="italic font-normal block">With Passion</span>
              </h2>
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
                Vasundhara is more than fine jewellery.
              </p>
              <p>
                It is a celebration of emotion, heritage and artistry. Founded in April 1997 by visionary designer Mrs. Vasundhara Kasaraneni in Hyderabad, our maison has spent nearly three decades reviving timeless Indian craftsmanship.
              </p>
              <p>
                Each creation is brought to life through a network of master artisans across India's traditional jewellery hubs. Each piece is a promise of purity, crafted to be cherished for generations to come.
              </p>
            </motion.div>

            {/* Tactile CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-[#B09262] hover:text-[#24211D] transition-colors pb-1 border-b border-[#B09262]/40 hover:border-[#24211D]"
              >
                <span>DISCOVER OUR JOURNEY</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-400" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
