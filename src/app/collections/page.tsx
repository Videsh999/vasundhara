"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import {
  SHOP_BY_JEWELLERY,
  EXPLORE_COLLECTIONS,
  SIGNATURE_COLLECTIONS,
} from "@/lib/navigation/collections-menu";

const SHOP_JEWELLERY_IMAGES: Record<string, string> = {
  "shop-rings": "/brand/vasundhara-masterpiece-jewellery.jpg",
  "shop-earrings": "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
  "shop-necklaces": "/brand/vasundhara-temple-peacock-necklace.jpg",
  "shop-pendants": "/brand/vasundhara-royal-bride-portrait.jpg",
  "shop-bangles": "/brand/vasundhara-emerald-diamond-kada.jpg",
  "shop-bridal": "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
  "shop-mangalsutra": "/brand/vasundhara-temple-peacock-necklace.jpg",
};

const EXPLORE_COLLECTIONS_IMAGES: Record<string, string> = {
  "col-high-jewellery": "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
  "col-diamond": "/brand/vasundhara-masterpiece-jewellery.jpg",
  "col-gold": "/brand/vasundhara-emerald-diamond-kada.jpg",
  "col-polki": "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
  "col-kundan": "/brand/vasundhara-royal-bride-portrait.jpg",
  "col-temple": "/brand/vasundhara-temple-peacock-necklace.jpg",
  "col-heirloom": "/brand/vasundhara-ruby-diamond-bangles.jpg",
  "col-contemporary": "/brand/vasundhara-emerald-diamond-kada.jpg",
};

const SIGNATURE_IMAGES: Record<string, string> = {
  "sig-bespoke": "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
  "sig-bridal-couture": "/brand/vasundhara-royal-bride-portrait.jpg",
  "sig-heritage": "/brand/vasundhara-temple-peacock-necklace.jpg",
  "sig-new-arrivals": "/brand/vasundhara-ruby-diamond-bangles.jpg",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#24211D] select-none">
      <LuxuryHeader theme="light" />

      {/* 1. EDITORIAL HERO */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 bg-[#F7F3EA] border-b border-[#B09262]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block"
          >
            THE MAISON CATALOGUE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#24211D] font-light tracking-tight"
          >
            Collections
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-base sm:text-xl italic text-[#6E685F] font-light max-w-xl mx-auto"
          >
            "Discover the artistry of Vasundhara — timeless creations shaped by craftsmanship, character and emotion."
          </motion.p>
        </div>
      </section>

      {/* 2. SECTION 1: SHOP BY JEWELLERY */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12 border-b border-[#B09262]/20">
        <div className="space-y-2 border-b border-[#B09262]/20 pb-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#B09262] font-semibold block">
            CATEGORY SELECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
            Shop by Jewellery
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {SHOP_BY_JEWELLERY.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <Link
                href={item.slug}
                className="group block space-y-3 cursor-pointer"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F7F3EA] border border-[#B09262]/25 shadow-sm p-3 flex items-center justify-center">
                  <img
                    src={SHOP_JEWELLERY_IMAGES[item.id] || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base sm:text-lg text-[#24211D] group-hover:text-[#B09262] font-normal transition-colors">
                      {item.title}
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B09262] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                  <p className="font-sans text-xs text-[#6E685F] leading-tight">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SECTION 2: EXPLORE COLLECTIONS */}
      <section className="py-20 sm:py-28 bg-[#F7F3EA] border-b border-[#B09262]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="space-y-2 border-b border-[#B09262]/20 pb-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#B09262] font-semibold block">
              MAISON THEMES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
              Explore Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {EXPLORE_COLLECTIONS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <Link
                  href={item.slug}
                  className="group block space-y-3 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#FDFBF7] border border-[#B09262]/25 shadow-sm p-3 flex items-center justify-center">
                    <img
                      src={EXPLORE_COLLECTIONS_IMAGES[item.id] || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="font-serif text-lg text-[#24211D] group-hover:text-[#B09262] font-normal transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#6E685F] leading-tight">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: SIGNATURE COLLECTIONS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        <div className="space-y-2 border-b border-[#B09262]/20 pb-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#B09262] font-semibold block">
            EXCLUSIVE COMMISSIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
            Signature Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SIGNATURE_COLLECTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link
                href={item.slug}
                className="group block space-y-4 cursor-pointer"
              >
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#F7F3EA] border border-[#B09262]/30 shadow-md">
                  <img
                    src={SIGNATURE_IMAGES[item.id] || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800"}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {item.badge && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#B09262] text-[#FDFBF7] text-[9px] uppercase tracking-widest font-semibold">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-[#24211D] group-hover:text-[#B09262] font-medium transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6E685F] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
