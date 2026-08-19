"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface JewelleryLightboxGalleryProps {
  media: string[];
  title: string;
}

export function JewelleryLightboxGallery({ media, title }: JewelleryLightboxGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") setActiveIdx((prev) => (prev - 1 + media.length) % media.length);
      if (e.key === "ArrowRight") setActiveIdx((prev) => (prev + 1) % media.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, media.length]);

  return (
    <div className="space-y-4">
      {/* Primary Main Display Frame */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8C734B]/25 bg-[#F7F3E9] shadow-2xl group">
        <motion.img
          key={media[activeIdx]}
          src={media[activeIdx]}
          alt={`${title} - View ${activeIdx + 1}`}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover object-center"
        />

        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-[#1C1A17]/60 backdrop-blur-md rounded-full text-[#FDFBF7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#8C734B]"
          aria-label="Enlarge Imagery"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {media.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((prev) => (prev - 1 + media.length) % media.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#1C1A17]/50 backdrop-blur-md text-[#FDFBF7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#8C734B]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % media.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#1C1A17]/50 backdrop-blur-md text-[#FDFBF7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#8C734B]"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Ribbon */}
      {media.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {media.map((imgUrl, idx) => (
            <button
              key={imgUrl}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                activeIdx === idx ? "border-[#8C734B] shadow-md" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C1A17]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Header controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[#FDFBF7] z-10">
              <span className="font-serif text-lg tracking-wider font-light">{title}</span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-[#EFE9DA]/80 hover:text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Image */}
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={media[activeIdx]}
                alt={title}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Navigation Arrows */}
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
