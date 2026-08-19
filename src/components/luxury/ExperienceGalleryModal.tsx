"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ExperienceGalleryModalProps {
  media: string[];
  title: string;
}

export function ExperienceGalleryModal({ media, title }: ExperienceGalleryModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") setActiveIdx((prev) => (prev - 1 + media.length) % media.length);
      if (e.key === "ArrowRight") setActiveIdx((prev) => (prev + 1) % media.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, media.length]);

  if (!media || media.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Grid Thumbnail Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {media.map((imgUrl, idx) => (
          <div
            key={imgUrl}
            onClick={() => {
              setActiveIdx(idx);
              setIsOpen(true);
            }}
            className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#8C734B]/20 shadow-md cursor-pointer bg-[#F7F3E9]"
          >
            <img
              src={imgUrl}
              alt={`${title} - Gallery Photo ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#1C1A17]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#FDFBF7]">
              <Maximize2 className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C1A17]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          >
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[#FDFBF7] z-10">
              <span className="font-serif text-lg font-light tracking-wider">{title} Archive</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#EFE9DA]/80 hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <motion.div
              key={activeIdx}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={media[activeIdx]}
                alt={title}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {media.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIdx((prev) => (prev - 1 + media.length) % media.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-[#FDFBF7] hover:text-[#8C734B] transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => setActiveIdx((prev) => (prev + 1) % media.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-[#FDFBF7] hover:text-[#8C734B] transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
