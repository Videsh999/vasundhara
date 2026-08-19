"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_TESTIMONIALS } from "@/lib/supabase/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = MOCK_TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EA] text-[#24211D] border-b border-[#B09262]/20 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
        <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block">
          PATRON STORIES
        </span>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-3xl"
            >
              <h2 className="font-serif text-2xl sm:text-4xl text-[#24211D] font-light leading-relaxed italic">
                "{current.quote}"
              </h2>

              <div className="space-y-1">
                <span className="font-serif text-lg text-[#24211D] font-normal block">
                  {current.customerName}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B09262] block font-medium">
                  {current.occasion} • {current.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length)}
            aria-label="Previous Testimonial"
            className="p-2 text-[#B09262] hover:text-[#24211D] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {MOCK_TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? "w-8 bg-[#B09262]" : "w-1.5 bg-[#B09262]/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length)}
            aria-label="Next Testimonial"
            className="p-2 text-[#B09262] hover:text-[#24211D] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
