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
    image: "/brand/vasundhara-crimson-bridal-emerald.jpg",
    icon: Compass,
  },
  {
    num: "02",
    stepName: "CONSULT",
    title: "Exploring Inspiration & Rare Gems",
    description:
      "Our senior curators present rare uncut syndicate polki diamonds, D-flawless solitaires, and natural Colombian emerald parcels curated specifically for your commission.",
    details: "Gem Selection • Proportion Balance • Metal Purity (18K/22K)",
    image: "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
    icon: Gem,
  },
  {
    num: "03",
    stepName: "DESIGN",
    title: "Hand-Drawn Gouache Renderings",
    description:
      "Master illustrators hand-paint multiple full-scale gouache parchment renderings, translating abstract ideas into sculptural high contemporary joaillerie.",
    details: "Parchment Art • Ergonomic Blueprint • 1:1 Scale Proofs",
    image: "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
    icon: Feather,
  },
  {
    num: "04",
    stepName: "CRAFT",
    title: "Master Karigar Goldsmithing",
    description:
      "Hereditary master artisans hand-chisel the gold structures, craft pure 24K gold foil Kundan encasements, and hand-string pigeon-blood rubies and diamonds.",
    details: "Zero Machine Work • Pure Hand Setting • Devotional Craft",
    image: "/brand/vasundhara-ruby-diamond-bangles.jpg",
    icon: Hammer,
  },
  {
    num: "05",
    stepName: "REVEAL",
    title: "Private Salon Unveiling",
    description:
      "Your finished heirloom is unveiled in a private chamber at our Jubilee Hills salon, accompanied by certified documentation and custom velvet vault casing.",
    details: "Private Chamber Unveiling • Certified Documentation • Heirloom Casing",
    image: "/brand/vasundhara-masterpiece-jewellery.jpg",
    icon: Gift,
  },
];

export default function BespokePage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#24211D] select-none">
      <LuxuryHeader theme="light" />

      {/* 1. HERO */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F7F3EA] border-b border-[#B09262]/20 relative overflow-hidden">
        {/* Subtle Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
          <span className="font-serif text-[20vw] uppercase tracking-widest text-[#B09262] whitespace-nowrap">
            BESPOKE
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
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

      {/* 2. STAGES */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-24">
        {BESPOKE_STAGES.map((stage, idx) => {
          const isEven = idx % 2 === 1;
          const IconComp = stage.icon;

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
                className={`lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#B09262]/35 bg-[#24211D] group ${
                  isEven ? "lg:col-start-7" : ""
                }`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1A17]/70 backdrop-blur-md border border-[#B09262]/40 text-[#D4AF37] font-sans text-[9px] uppercase tracking-[0.25em] font-semibold">
                  <IconComp className="w-3 h-3 text-[#D4AF37]" />
                  <span>STEP {stage.num} • {stage.stepName}</span>
                </div>
              </div>

              {/* Text Narrative */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? "lg:col-start-1" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl sm:text-4xl text-[#B09262] font-light">
                    {stage.num}
                  </span>
                  <div className="h-[1px] w-12 bg-[#B09262]/40" />
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#6E685F] font-semibold">
                    {stage.stepName}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light leading-snug">
                  {stage.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
                  {stage.description}
                </p>

                <div className="p-4 rounded-xl bg-[#EFE9DA]/60 border border-[#B09262]/20 font-sans text-[11px] uppercase tracking-wider text-[#B09262] font-semibold">
                  {stage.details}
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. CTA */}
      <section className="py-20 sm:py-28 bg-[#F7F3EA] border-t border-[#B09262]/20 text-center select-none">
        <div className="max-w-2xl mx-auto px-6 space-y-8">
          <Sparkles className="w-6 h-6 text-[#B09262] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#24211D] font-light">
            Begin Your Commission
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
            Every bespoke creation begins with a private conversation. Connect with our master design team in Jubilee Hills or request a private virtual consultation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setAppointmentOpen(true)}
              className="px-10 py-4 bg-[#24211D] hover:bg-[#B09262] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              REQUEST BESPOKE CONSULTATION
            </button>
          </div>
        </div>
      </section>

      <LuxuryFooter />
      <FloatingExperienceControls />
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </main>
  );
}
