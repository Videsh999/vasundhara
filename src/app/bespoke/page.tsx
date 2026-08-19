"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Compass, Gem, Feather, Hammer, Gift } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";

const BESPOKE_STAGES = [
  {
    num: "01",
    stepName: "DISCOVER",
    title: "Understanding Your Vision",
    description:
      "The bespoke journey begins with an intimate dialogue. We explore your family heritage, aesthetic preferences, and the emotion of the occasion.",
    details: "Private Dialogue • Gemstone Curation • Occasion Blueprint",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000",
    icon: Compass,
  },
  {
    num: "02",
    stepName: "CONSULT",
    title: "Exploring Inspiration & Rare Gems",
    description:
      "Our senior curators present rare uncut syndicate polki diamonds, D-flawless solitaires, and natural gemstone parcels curated specifically for your commission.",
    details: "Gem Selection • Proportion Balance • Metal Purity (18K/22K)",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000",
    icon: Gem,
  },
  {
    num: "03",
    stepName: "DESIGN",
    title: "Hand-Drawn Gouache Renderings",
    description:
      "Master illustrators hand-paint multiple full-scale gouache parchment renderings, translating abstract ideas into sculptural high jewellery.",
    details: "Parchment Art • Ergonomic Blueprint • 1:1 Scale Proofs",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000",
    icon: Feather,
  },
  {
    num: "04",
    stepName: "CRAFT",
    title: "Master Karigar Goldsmithing",
    description:
      "Hereditary master artisans hand-chisel the Nakshi gold structures, craft pure 24K gold foil Kundan encasements, and hand-string natural Basra pearls.",
    details: "Zero Machine Work • Pure Hand Setting • Devotional Craft",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000",
    icon: Hammer,
  },
  {
    num: "05",
    stepName: "REVEAL",
    title: "Private Salon Unveiling",
    description:
      "Your finished heirloom is unveiled in a private chamber at our Jubilee Hills salon, accompanied by certified documentation and custom vault casing.",
    details: "Private Chamber Unveiling • Certified Documentation • Heirloom Casing",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1000",
    icon: Gift,
  },
];

export default function BespokePage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#24211D] select-none">
      <LuxuryHeader theme="light" />

      {/* 1. HERO */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F7F3EA] border-b border-[#B09262]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block"
          >
            PRIVATE ATELIER COMMISSIONS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#24211D] font-light tracking-tight"
          >
            The Bespoke Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-base sm:text-xl italic text-[#6E685F] font-light max-w-xl mx-auto"
          >
            "Some pieces are discovered. Others are imagined. Commission a unique heirloom tailored to your wedding or legacy collection."
          </motion.p>
        </div>
      </section>

      {/* 2. THE 5-STAGE BESPOKE TIMELINE */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        {BESPOKE_STAGES.map((stage, idx) => {
          const isEven = idx % 2 === 1;
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isEven ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Media Visual */}
              <div
                className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#B09262]/25 bg-[#F7F3EA] group ${
                  isEven ? "lg:col-start-7" : ""
                }`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#FDFBF7]/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-[#B09262] font-semibold border border-[#B09262]/20">
                  STAGE {stage.num} • {stage.stepName}
                </div>
              </div>

              {/* Text Narrative */}
              <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:col-start-1" : ""}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 text-[#B09262]">
                    <Icon className="w-4 h-4" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold">
                      {stage.stepName}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
                    {stage.title}
                  </h2>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
                  {stage.description}
                </p>

                <div className="pt-2 border-t border-[#B09262]/15">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B09262] font-medium">
                    {stage.details}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. CTA */}
      <section className="py-24 bg-[#24211D] text-[#FDFBF7] text-center border-t border-[#B09262]/25">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <Sparkles className="w-6 h-6 text-[#B09262] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFBF7] font-light">
            Begin Your Bespoke Journey
          </h2>
          <p className="font-serif text-base sm:text-xl italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            "Every commission begins with a blank parchment and personal dialogue."
          </p>

          <button
            onClick={() => setAppointmentOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#B09262] hover:bg-[#C6AA78] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all cursor-pointer"
          >
            <span>REQUEST BESPOKE CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
