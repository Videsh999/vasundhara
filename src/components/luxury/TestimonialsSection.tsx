"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_TESTIMONIALS } from "@/lib/supabase/mock-data";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { BlockTextReveal } from "@/components/core/block-text-reveal";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const current = MOCK_TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-36 bg-[#F7F3EA] text-[#24211D] border-b border-[#B09262]/20 overflow-hidden select-none relative">
      {/* Decorative Gold Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <Quote className="w-96 h-96 text-[#B09262]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DA] border border-[#B09262]/30 text-[#B09262]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold">
            PATRON STORIES & REVIEWS
          </span>
        </div>

        {/* Block Text Reveal Quote Container */}
        <div className="relative min-h-[220px] sm:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 w-full max-w-3xl"
            >
              <div className="w-full flex justify-center">
                <BlockTextReveal
                  key={`quote-${current.id}`}
                  text={`"${current.quote}"`}
                  textColor="#24211D"
                  blockColor="#B09262"
                  revealType="blocks"
                  direction="center"
                  speed={65}
                  rounded={8}
                  align="center"
                  font={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(20px, 3.2vw, 34px)",
                    fontWeight: 300,
                    lineHeight: "1.45",
                    fontStyle: "italic",
                  }}
                  highlight={[
                    { text: "Vasundhara", block: true, color: "#B09262", rounded: 12, textColor: "#FDFBF7" },
                    { text: "heirloom.", block: true, color: "#24211D", rounded: 12, textColor: "#D4AF37" },
                    { text: "heritage.", block: true, color: "#24211D", rounded: 12, textColor: "#D4AF37" },
                    { text: "flawless", block: true, color: "#B09262", rounded: 12, textColor: "#FDFBF7" },
                  ]}
                />
              </div>

              {/* Author Details */}
              <div className="space-y-1 pt-2">
                <span className="font-serif text-lg sm:text-xl text-[#24211D] font-normal block tracking-wide">
                  {current.customerName}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B09262] block font-medium">
                  {current.occasion} • {current.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center justify-center gap-5 pt-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length)}
            aria-label="Previous Testimonial"
            className="p-2.5 rounded-full bg-[#EFE9DA]/60 border border-[#B09262]/20 text-[#B09262] hover:bg-[#B09262] hover:text-[#FDFBF7] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {MOCK_TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentIndex === idx ? "w-8 bg-[#B09262]" : "w-2 bg-[#B09262]/30 hover:bg-[#B09262]/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length)}
            aria-label="Next Testimonial"
            className="p-2.5 rounded-full bg-[#EFE9DA]/60 border border-[#B09262]/20 text-[#B09262] hover:bg-[#B09262] hover:text-[#FDFBF7] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
