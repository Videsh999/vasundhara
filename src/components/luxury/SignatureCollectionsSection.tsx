"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { RoundCarousel, RoundCarouselImage } from "@/components/core/round-carousel";
import { CollectionItem } from "@/lib/supabase/mock-data";

export interface SignatureCollectionsSectionProps {
  collections?: CollectionItem[];
}

const VASUNDHARA_CAROUSEL_IMAGES: RoundCarouselImage[] = [
  {
    src: "/brand/vasundhara-royal-bridal-trinity.jpg",
    title: "ROYAL BRIDAL TRINITY",
    subtitle: "Grand Nizam Troussier Suite",
    slug: "bridal",
  },
  {
    src: "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
    title: "COLOMBIAN EMERALD MESH",
    subtitle: "D-Flawless Solitaire Bib Suite",
    slug: "high-jewellery",
  },
  {
    src: "/brand/vasundhara-crimson-bridal-emerald.jpg",
    title: "CRIMSON BRIDAL POLKI",
    subtitle: "Multi-Tiered Emerald Bead Choker",
    slug: "kundan",
  },
  {
    src: "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
    title: "IMPERIAL JADE & DIAMOND",
    subtitle: "High Contemporary Joaillerie",
    slug: "contemporary",
  },
  {
    src: "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
    title: "NAKSHI RAJMATA SUITE",
    subtitle: "Antique Gold & Syndicate Polki",
    slug: "temple-jewellery",
  },
  {
    src: "/brand/vasundhara-ruby-diamond-bangles.jpg",
    title: "BURMESE RUBY KADAS",
    subtitle: "Cushion-Cut Pigeon Blood Rubies",
    slug: "high-jewellery",
  },
  {
    src: "/brand/vasundhara-emerald-diamond-kada.jpg",
    title: "EMERALD & POLKI KADA",
    subtitle: "24K Kundan Foil Encasement",
    slug: "gold-jewellery",
  },
  {
    src: "/brand/vasundhara-temple-peacock-necklace.jpg",
    title: "SACRED PEACOCK HAAR",
    subtitle: "Basra Pearls & Sacred Motifs",
    slug: "temple-jewellery",
  },
];

export function SignatureCollectionsSection({}: SignatureCollectionsSectionProps = {}) {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F4] text-[#24211D] border-b border-[#B09262]/20 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Section Header: Centered Editorial Typography */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block">
              COLLECTIONS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light leading-tight tracking-tight"
          >
            Discover Our Collections
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-sm sm:text-base italic text-[#6E685F] font-light"
          >
            Timeless designs that celebrate every moment of your life.
          </motion.p>
        </div>

        {/* Interactive 3D Round Carousel Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center"
        >
          <RoundCarousel
            images={VASUNDHARA_CAROUSEL_IMAGES}
            imageWidth={260}
            imageHeight={340}
            spacing={3}
            speed={5}
            direction="right"
            drag={true}
            sensitivity={5}
            tilt={-6}
            perspective={2600}
            cornerRadius={18}
            innerDim={3.5}
            background="transparent"
          />

          {/* Interactive Drag Hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24211D]/80 backdrop-blur-md border border-[#B09262]/30 text-[#FDFBF7] text-[10px] uppercase tracking-[0.25em] font-medium pointer-events-none opacity-80 shadow-md">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#B09262] animate-pulse" />
            <span>DRAG TO ROTATE ATELIER</span>
          </div>
        </motion.div>

        {/* Centered Bottom CTA */}
        <div className="text-center pt-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.28em] text-[#6E685F] hover:text-[#24211D] transition-colors pb-1 border-b border-[#B09262]/30 hover:border-[#24211D]"
            >
              <span>VIEW ALL COLLECTIONS</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-400 text-[#B09262]" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default SignatureCollectionsSection;
