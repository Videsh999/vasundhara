"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { InfiniteSlider } from "@/components/core/infinite-slider";

const COLUMN_1_IMAGES = [
  {
    src: "/brand/vasundhara-royal-bridal-trinity.jpg",
    title: "The Royal Bridal Trinity",
    category: "Bridal Couture",
    karat: "22K Gold & Polki",
  },
  {
    src: "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
    title: "Colombian Emerald Mesh",
    category: "High Jewellery",
    karat: "18K White Gold",
  },
  {
    src: "/brand/vasundhara-crimson-bridal-emerald.jpg",
    title: "Crimson Heritage Polki",
    category: "Royal Troussier",
    karat: "22K Pure Nakshi",
  },
  {
    src: "/brand/vasundhara-temple-heritage-bride.jpg",
    title: "Temple Peacock Haar",
    category: "Temple Heirlooms",
    karat: "22K Antique Patina",
  },
  {
    src: "/brand/vasundhara-ruby-diamond-bangles.jpg",
    title: "Burmese Ruby Kadas",
    category: "Rare Gemstones",
    karat: "18K Platinum & Rubies",
  },
];

const COLUMN_2_IMAGES = [
  {
    src: "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
    title: "Imperial Jade & Solitaires",
    category: "Contemporary Joaillerie",
    karat: "18K Gold & Jade",
  },
  {
    src: "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
    title: "Nakshi Rajmata Choker",
    category: "Nizam Provenance",
    karat: "22K Antique Gold",
  },
  {
    src: "/brand/vasundhara-emerald-diamond-kada.jpg",
    title: "Emerald & Polki Kada",
    category: "Fine Gold Filigree",
    karat: "24K Kundan Encasement",
  },
  {
    src: "/brand/vasundhara-royal-bride-portrait.jpg",
    title: "Imperial Purple Silk Suite",
    category: "Bridal Heirlooms",
    karat: "22K South Indian Gold",
  },
  {
    src: "/brand/vasundhara-masterpiece-jewellery.jpg",
    title: "Solitaire Symphony Grand Suite",
    category: "Flawless Solitaires",
    karat: "D-Flawless Diamonds",
  },
];

export function MasterpieceInfiniteShowcase() {
  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EA] text-[#24211D] border-b border-[#B09262]/20 select-none overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B09262]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Description & CTA */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DA] border border-[#B09262]/30 text-[#B09262]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold">
                  CONTINUOUS ATELIER CURATION
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#24211D] font-light leading-tight tracking-tight">
                An Infinite Stream of Rare Brilliance
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed max-w-md">
                Every month, our hereditary karigars bring forth new bespoke commissions for Indian royal families, global collectors, and brides of distinction.
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-3 pt-2"
            >
              <div className="flex items-center gap-3 text-xs text-[#24211D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B09262]" />
                <span className="font-medium">100% Certified Natural Gemstones & Syndicate Polki</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#24211D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B09262]" />
                <span className="font-medium">Zero Industrial Moulding — Sculpted Purely by Hand</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#24211D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B09262]" />
                <span className="font-medium">Custom Velvet Vault Packaging & Royal Provenance Papers</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#24211D] text-[#FDFBF7] rounded-full border border-[#B09262]/40 hover:bg-[#B09262] hover:border-[#C6AA78] transition-all duration-400 font-sans text-xs uppercase tracking-[0.25em] font-medium shadow-xl hover:scale-[1.02]"
              >
                <span>EXPLORE ALL PIECES</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Dual Vertical Infinite Sliders */}
          <div className="lg:col-span-7">
            <div className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden p-3 bg-[#EFE9DA]/40 border border-[#B09262]/25 shadow-2xl">
              
              {/* Subtle Gradient Fade Masks (Top & Bottom) */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#F7F3EA] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F7F3EA] to-transparent z-10 pointer-events-none" />

              {/* Dual Vertical Columns */}
              <div className="grid grid-cols-2 gap-4 h-full">
                
                {/* Column 1: Upward Infinite Movement */}
                <div className="h-full overflow-hidden">
                  <InfiniteSlider direction="vertical" speed={35} gap={16} speedOnHover={10} className="h-full">
                    {COLUMN_1_IMAGES.map((item, idx) => (
                      <div
                        key={`col1-${idx}`}
                        className="group relative rounded-xl overflow-hidden border border-[#B09262]/30 shadow-lg bg-[#24211D] aspect-[3/4]"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/85 via-[#1C1A17]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-[#FDFBF7] space-y-0.5">
                          <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#C6AA78] font-semibold block">
                            {item.category}
                          </span>
                          <span className="font-serif text-xs sm:text-sm font-light text-white block truncate">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </InfiniteSlider>
                </div>

                {/* Column 2: Downward Infinite Movement (Reverse) */}
                <div className="h-full overflow-hidden">
                  <InfiniteSlider direction="vertical" reverse speed={35} gap={16} speedOnHover={10} className="h-full">
                    {COLUMN_2_IMAGES.map((item, idx) => (
                      <div
                        key={`col2-${idx}`}
                        className="group relative rounded-xl overflow-hidden border border-[#B09262]/30 shadow-lg bg-[#24211D] aspect-[3/4]"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/85 via-[#1C1A17]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-[#FDFBF7] space-y-0.5">
                          <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#C6AA78] font-semibold block">
                            {item.category}
                          </span>
                          <span className="font-serif text-xs sm:text-sm font-light text-white block truncate">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </InfiniteSlider>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
