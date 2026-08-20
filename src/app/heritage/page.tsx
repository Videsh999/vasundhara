"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
      image: "/brand/vasundhara-royal-bride-portrait.jpg",
    },
    {
      number: "02",
      title: "Master Karigar Lineage",
      subtitle: "Human Artistry Over Machines",
      description:
        "Every Vasundhara creation is sculpted by hand. We partner with a hereditary network of master karigars across India's traditional jewellery hubs, preserving hand-chiseled Nakshi engraving, pure gold foil Kundan stone-setting, and delicate pearl stringing.",
      image: "/brand/vasundhara-emerald-diamond-kada.jpg",
    },
    {
      number: "03",
      title: "Design Philosophy",
      subtitle: "Heritage Meets Modern Sophistication",
      description:
        "Our creations bridge the regal grandeur of Indian heritage with contemporary geometric balance. Each piece is designed not as a fleeting fashion item, but as an enduring family heirloom to be treasured across generations.",
      image: "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
    },
    {
      number: "04",
      title: "The Flagship Salons",
      subtitle: "Private Viewing in Jubilee Hills",
      description:
        "Located on Road No. 36, Jubilee Hills, Hyderabad, our flagship salon offers private viewing chambers where collectors, brides, and families receive bespoke guidance directly from senior family curators.",
      image: "/brand/vasundhara-masterpiece-jewellery.jpg",
    },
  ];

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
            OUR HERITAGE & ORIGINS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#24211D] font-light tracking-tight"
          >
            A Legacy of Artistry
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
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
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
                className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#B09262]/25 bg-[#F7F3EA] group ${
                  isEven ? "lg:col-start-7" : ""
                }`}
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#FDFBF7]/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-[#B09262] font-semibold border border-[#B09262]/20">
                  CHAPTER {pillar.number}
                </div>
              </div>

              {/* Story Narrative */}
              <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:col-start-1" : ""}`}>
                <div className="space-y-1">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B09262] font-semibold block">
                    {pillar.subtitle}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
                    {pillar.title}
                  </h2>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. CTA BANNER */}
      <section className="py-24 bg-[#24211D] text-[#FDFBF7] text-center border-t border-[#B09262]/25">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <Sparkles className="w-6 h-6 text-[#B09262] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFBF7] font-light">
            Commission an Heirloom
          </h2>
          <p className="font-serif text-base sm:text-xl italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            "Experience our master craftsmanship in a private consultation curated for you."
          </p>

          <Link
            href="/bespoke"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#B09262] hover:bg-[#C6AA78] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
          >
            <span>BEGIN YOUR BESPOKE JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
