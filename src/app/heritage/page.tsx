"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Crown, Award, BookOpen, ShieldCheck } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";

export default function HeritagePage() {
  const pillars = [
    {
      number: "01",
      title: "The Genesis (1997)",
      subtitle: "Founded by Mrs. Vasundhara Kasaraneni",
      description:
        "In April 1997, visionary jewellery designer Mrs. Vasundhara Kasaraneni established the House of Vasundhara in Hyderabad with an uncompromising vision: reviving and celebrating ancient Indian goldsmithing techniques through timeless high jewellery.",
      image: "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
      tag: "EST. APRIL 1997",
    },
    {
      number: "02",
      title: "Master Karigar Lineage",
      subtitle: "Human Artistry Over Machines",
      description:
        "Every Vasundhara creation is sculpted by hand. We partner with a hereditary network of master karigars across India's traditional jewellery hubs, preserving hand-chiseled Nakshi engraving, pure gold foil Kundan stone-setting, and delicate pearl stringing.",
      image: "/brand/vasundhara-temple-heritage-bride.jpg",
      tag: "HEREDITARY KARIGARS",
    },
    {
      number: "03",
      title: "Nizam & Royal Provenance",
      subtitle: "Heritage Meets Sovereign Grandeur",
      description:
        "Our creations bridge the regal grandeur of Hyderabad's Nizam courts with contemporary geometric balance. Each piece is designed not as a fleeting fashion item, but as an enduring family heirloom to be treasured across generations.",
      image: "/brand/vasundhara-royal-bridal-trinity.jpg",
      tag: "ROYAL PROVENANCE",
    },
    {
      number: "04",
      title: "The Flagship Salons",
      subtitle: "Private Viewing in Jubilee Hills",
      description:
        "Located on Road No. 36, Jubilee Hills, Hyderabad, our flagship salon offers private viewing chambers where collectors, brides, and families receive bespoke guidance directly from senior family curators.",
      image: "/brand/vasundhara-royal-bride-portrait.jpg",
      tag: "JUBILEE HILLS SALON",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#24211D] select-none">
      <LuxuryHeader theme="light" />

      {/* 1. HERO */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F7F3EA] border-b border-[#B09262]/20 relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
          <span className="font-serif text-[20vw] uppercase tracking-widest text-[#B09262] whitespace-nowrap">
            HERITAGE
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block"
          >
            OUR HERITAGE & ORIGINS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#24211D] font-light tracking-tight"
          >
            A Legacy of Royal Artistry
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-base sm:text-xl italic text-[#6E685F] font-light max-w-xl mx-auto"
          >
            "Preserving the soul of Indian jewellery traditions through passion, purity, and hereditary craftsmanship since 1997."
          </motion.p>
        </div>
      </section>

      {/* 2. EDITORIAL CHAPTERS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-24">
        {pillars.map((pillar, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <motion.div
              key={pillar.number}
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
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/70 via-transparent to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#1C1A17]/70 backdrop-blur-md border border-[#B09262]/40 text-[#D4AF37] font-sans text-[9px] uppercase tracking-[0.25em] font-semibold">
                  {pillar.tag}
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
                    {pillar.number}
                  </span>
                  <div className="h-[1px] w-12 bg-[#B09262]/40" />
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#6E685F] font-semibold">
                    {pillar.subtitle}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light leading-snug">
                  {pillar.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-2">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#B09262] hover:text-[#24211D] transition-colors"
                  >
                    <span>EXPLORE HEIRLOOMS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
            Experience the Legacy
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
            We invite you to experience our heritage creations in person at our Jubilee Hills salon or schedule a bespoke consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/private-viewing"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#24211D] text-[#FDFBF7] rounded-full border border-[#B09262]/40 hover:bg-[#B09262] transition-colors font-sans text-xs uppercase tracking-[0.2em] font-medium shadow-md"
            >
              SCHEDULE PRIVATE VIEWING
            </Link>
            <Link
              href="/bespoke"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FDFBF7] text-[#24211D] rounded-full border border-[#B09262]/40 hover:border-[#B09262] transition-colors font-sans text-xs uppercase tracking-[0.2em] font-medium"
            >
              THE BESPOKE PROCESS
            </Link>
          </div>
        </div>
      </section>

      <LuxuryFooter />
      <FloatingExperienceControls />
    </main>
  );
}
