"use client";

import React, { useState } from "react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { ConciergeModal } from "@/components/luxury/ConciergeModal";
import { Sparkles, Bot, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { AudioController } from "@/components/luxury/AudioController";

export default function ConciergePage() {
  const [conciergeOpen, setConciergeOpen] = useState(true);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader />

      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex p-3 bg-[#EFE9DA] rounded-full text-[#8C734B] mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            Private Luxury Assistant Protocol
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light mt-2">
            Vasundhara Concierge
          </h1>
          <p className="font-sans text-xs text-[#686256] mt-4 max-w-xl mx-auto leading-relaxed">
            Our AI concierge is trained in the art of royal Indian jewellery, solitaire selection, bespoke trousseau curation, and private Hyderabad appointments.
          </p>

          <div className="mt-8">
            <button
              onClick={() => setConciergeOpen(true)}
              className="px-8 py-3.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#B59A5B]" />
              <span>Launch Concierge Panel</span>
            </button>
          </div>
        </div>
      </section>

      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
      <AudioController />
      <LuxuryFooter />
    </main>
  );
}
