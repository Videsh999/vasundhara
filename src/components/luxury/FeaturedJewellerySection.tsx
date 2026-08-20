"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GalleryTunnel } from "@/components/core/gallery-tunnel";

const FEATURED_TUNNEL_IMAGES = [
  "/brand/vasundhara-royal-bridal-trinity.jpg",
  "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
  "/brand/vasundhara-crimson-bridal-emerald.jpg",
  "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
  "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
  "/brand/vasundhara-ruby-diamond-bangles.jpg",
  "/brand/vasundhara-emerald-diamond-kada.jpg",
  "/brand/vasundhara-temple-peacock-necklace.jpg",
];

export function FeaturedJewellerySection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F4] text-[#24211D] border-b border-[#B09262]/20 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B09262]/20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-3">
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B09262] font-semibold">
                CURATED SELECTION
              </span>
              <div className="w-10 h-[1px] bg-[#B09262]/40" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light tracking-tight">
              Featured High Jewellery
            </h2>
          </motion.div>

          <Link
            href="/collections"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-[#6E685F] hover:text-[#24211D] transition-colors self-start md:self-auto pb-1 border-b border-[#B09262]/30 hover:border-[#24211D]"
          >
            <span>VIEW COMPLETE CATALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B09262] transform group-hover:translate-x-1.5 transition-transform duration-400" />
          </Link>
        </div>

        {/* 3D Infinite Gallery Tunnel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[520px] sm:h-[600px] lg:h-[640px] rounded-2xl overflow-hidden border border-[#B09262]/30 shadow-2xl bg-[#FBF9F4]"
        >
          {/* Three.js 3D Gallery Tunnel */}
          <GalleryTunnel
            images={FEATURED_TUNNEL_IMAGES}
            background="#FBF9F4"
            lineColor="#B09262"
            lineOpacity={40}
            grid={4}
            cellMode="stretched"
            tunnelSize={1.2}
            speed={75}
            boost={150}
            fade={88}
            label={true}
            labelText="Press & Hold to Accelerate"
            labelFill="#24211D"
            labelColor="#FDFBF7"
          />

          {/* Center Floating Editorial Card Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="max-w-md text-center bg-[#FDFBF7]/85 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-[#B09262]/35 shadow-2xl pointer-events-auto space-y-4"
            >
              <div className="inline-flex items-center gap-2 text-[#B09262]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-semibold">
                  PERSPECTIVE & ARTISTRY
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#24211D] font-light leading-snug">
                Heirloom Perspectives
              </h3>

              <p className="font-serif text-xs sm:text-sm italic text-[#6E685F] font-light leading-relaxed">
                "Step inside our continuous realm of bespoke high jewellery — sculpted by hand, preserved forever."
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/collections"
                  className="px-6 py-2.5 bg-[#24211D] hover:bg-[#B09262] text-[#FDFBF7] font-sans text-[10px] uppercase tracking-[0.22em] font-medium rounded-full transition-all duration-300 shadow-md"
                >
                  EXPLORE ARCHIVES
                </Link>
                <Link
                  href="/private-viewing"
                  className="px-6 py-2.5 bg-transparent hover:bg-[#24211D]/5 text-[#24211D] border border-[#B09262]/40 font-sans text-[10px] uppercase tracking-[0.22em] font-medium rounded-full transition-all duration-300"
                >
                  PRIVATE VIEWING
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Subdued Bottom Corner Hint */}
          <div className="absolute bottom-4 left-6 pointer-events-none opacity-70">
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#6E685F]">
              ✦ PRESS CANVAS TO ACCELERATE
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturedJewellerySection;
