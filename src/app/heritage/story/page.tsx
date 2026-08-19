"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { MOCK_HERITAGE_CHAPTERS } from "@/lib/supabase/mock-data";

export default function HeritageStoryPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Header Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#8C734B]">
            <Link href="/heritage" className="hover:underline">Heritage</Link>
            <span>/</span>
            <span>House Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            The House Story & Lineage
          </h1>
          <p className="font-serif text-lg italic text-[#686256] max-w-xl mx-auto font-light">
            "A journey through chapters of Deccani heritage, royal craftsmanship, and timeless elegance."
          </p>
        </div>
      </section>

      {/* Chapters Sequence */}
      <section className="py-24 max-w-6xl mx-auto px-6 space-y-28">
        {MOCK_HERITAGE_CHAPTERS.map((chap, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={chap.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
                  <img
                    src={chap.image}
                    alt={chap.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#1C1A17]/80 text-[#FDFBF7] backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-medium border border-[#8C734B]/30">
                    CHAPTER {chap.chapterNumber}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
                  {chap.eyebrow}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light leading-snug">
                  {chap.headline}
                </h2>

                <div className="space-y-4 font-sans text-xs sm:text-sm text-[#686256] leading-relaxed">
                  {chap.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Section CTA */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FDFBF7] font-light">
            Discover the Art of Craftsmanship
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Explore the master techniques behind Nakshi gold carving, Basra pearl stringing, and uncut diamond Kundan settings.
          </p>

          <Link
            href="/heritage/craftsmanship"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
          >
            <span>DISCOVER CRAFTSMANSHIP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
