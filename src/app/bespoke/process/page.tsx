"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { MOCK_BESPOKE_STAGES } from "@/lib/supabase/mock-data";

export default function BespokeProcessPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Header Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#8C734B]">
            <Link href="/bespoke" className="hover:underline">Bespoke</Link>
            <span>/</span>
            <span>The Process</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            The Bespoke Atelier Process
          </h1>
          <p className="font-serif text-lg sm:text-xl italic text-[#686256] max-w-xl mx-auto font-light">
            "Five stages from parchment vision to private salon reveal."
          </p>
        </div>
      </section>

      {/* 5 Stages Sequence */}
      <section className="py-24 max-w-6xl mx-auto px-6 space-y-28">
        {MOCK_BESPOKE_STAGES.map((stage, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={stage.stepNumber}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
                  <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#1C1A17]/80 text-[#FDFBF7] backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-medium border border-[#8C734B]/30">
                    STAGE {stage.stepNumber}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-5 ${isEven ? "" : "lg:order-1"}`}>
                <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
                  STAGE {stage.stepNumber} • {stage.title}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light leading-snug">
                  {stage.subtitle}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed">
                  {stage.description}
                </p>

                <div className="pt-2 p-4 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/20 text-xs font-sans text-[#8C734B] font-medium uppercase tracking-wider">
                  {stage.details}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFBF7] font-light">
            Begin Your Bespoke Consultation
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Tell us about the heirloom piece you imagine.
          </p>

          <Link
            href="/bespoke/enquire"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
          >
            <span>REQUEST A PRIVATE CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
