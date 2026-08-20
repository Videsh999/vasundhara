"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Crown, Gem, Award } from "lucide-react";

export function HeritageStory() {
  return (
    <section className="py-24 md:py-36 bg-[#FDFBF7] text-[#1C1A17] relative overflow-hidden">
      {/* Decorative Watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
        <span className="font-serif text-[18vw] uppercase tracking-widest text-[#8C734B] whitespace-nowrap">
          VASUNDHARA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium"
          >
            The Heritage & Craftsmanship
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1C1A17] mt-3 font-light leading-tight"
          >
            An Immortal Legacy of Nizam Elegance
          </motion.h2>
          <div className="w-16 h-[1px] bg-[#8C734B] mx-auto mt-6" />
        </div>

        {/* 2-Column Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Image Showcase with Dual Heritage Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury border border-[#8C734B]/20">
              <img
                src="/brand/vasundhara-masterpiece-jewellery.jpg"
                alt="Vasundhara Masterpiece Diamond & Gold Bridal Suite"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 backdrop-blur-md bg-[#1C1A17]/40 border border-[#EFE9DA]/20 rounded-xl">
                <span className="font-serif text-lg text-[#EFE9DA] italic">"Every stone carries a soul, every setting tells a century."</span>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#B59A5B] mt-1">Vasundhara Atelier • Hyderabad</p>
              </div>
            </div>
            {/* Secondary Floating Accent Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-56 bg-[#F7F3E9] p-6 rounded-xl border border-[#8C734B]/30 shadow-2xl">
              <Crown className="w-6 h-6 text-[#8C734B] mb-2" />
              <h4 className="font-serif text-lg text-[#1C1A17]">Royal Provenance</h4>
              <p className="font-sans text-xs text-[#686256] mt-1 leading-relaxed">
                Handcrafted by master karigars whose lineage traces back to Nizam royal courts.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Editorial Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-serif text-3xl md:text-4xl text-[#1C1A17] font-light leading-snug">
              Crafting Heirloom Masterpieces for Generations
            </h3>

            <p className="font-sans text-sm text-[#686256] leading-relaxed">
              Born in Hyderabad, Vasundhara Diamond Roof has redefined Indian high jewellery. We blend ancient Nakshi carving, syndicate polki diamond foil setting, and modern international solitaire precision.
            </p>

            <p className="font-sans text-sm text-[#686256] leading-relaxed">
              Our maison operates on unyielding principles: uncompromising gemstone purity, absolute transparency, and bespoke personalization that ensures no two royal bridal trousseaus are ever identical.
            </p>

            {/* Heritage Values Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#EFE9DA] rounded-full text-[#8C734B] shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#1C1A17] font-medium">Royal Legacy</h4>
                  <p className="font-sans text-xs text-[#686256] mt-0.5">Hyderabad Nizam provenance & tradition.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#EFE9DA] rounded-full text-[#8C734B] shrink-0">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#1C1A17] font-medium">Flawless Solitaires</h4>
                  <p className="font-sans text-xs text-[#686256] mt-0.5">Certified GIA/IGI high-fine diamonds.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#EFE9DA] rounded-full text-[#8C734B] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#1C1A17] font-medium">Uncut Polki Purity</h4>
                  <p className="font-sans text-xs text-[#686256] mt-0.5">Syndicate polkis in 22K gold foil.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#EFE9DA] rounded-full text-[#8C734B] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#1C1A17] font-medium">Bespoke Atelier</h4>
                  <p className="font-sans text-xs text-[#686256] mt-0.5">Private consultation & custom creation.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-all duration-300 shadow-md group"
              >
                <span>Read Full Maison Story</span>
                <ArrowRight className="w-4 h-4 text-[#B59A5B] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
