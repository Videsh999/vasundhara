"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { getExhibitions } from "@/lib/supabase/mock-data";

export default function ExhibitionsLandingPage() {
  const exhibitions = getExhibitions();

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Hero Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            HIGH JEWELLERY PREVIEWS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            Exhibitions
          </h1>
          <p className="font-serif text-lg sm:text-xl italic text-[#686256] max-w-xl mx-auto font-light">
            "Where craftsmanship meets art, history, and imagination."
          </p>
        </div>
      </section>

      {/* Exhibitions List */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {exhibitions.map((exh) => (
            <div
              key={exh.id}
              className="group bg-[#F7F3E9] rounded-2xl overflow-hidden border border-[#8C734B]/20 shadow-luxury flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={exh.coverImage}
                  alt={exh.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#FDFBF7]/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-[#1C1A17] font-medium border border-[#8C734B]/20">
                  EXHIBITION
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8C734B] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {exh.dateStart} {exh.dateEnd ? `– ${exh.dateEnd}` : ""}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {exh.location}
                  </span>
                </div>

                <h2 className="font-serif text-2xl text-[#1C1A17] font-light group-hover:text-[#8C734B] transition-colors">
                  {exh.title}
                </h2>

                <p className="font-sans text-xs text-[#686256] leading-relaxed line-clamp-2">
                  {exh.description}
                </p>

                <div className="pt-4 border-t border-[#8C734B]/15 flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#686256]">
                    Venue: {exh.venueDetails}
                  </span>
                  <Link
                    href={`/exhibitions/${exh.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-[#8C734B] font-medium hover:text-[#1C1A17] transition-colors"
                  >
                    <span>Discover Exhibition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
