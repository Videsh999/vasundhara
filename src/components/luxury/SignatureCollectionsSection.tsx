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
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    title: "SOLITAIRE RINGS",
    subtitle: "Eternal Brilliance",
    slug: "diamond-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    title: "KUNDAN & EMERALD",
    subtitle: "Atelier Masterpiece",
    slug: "kundan",
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    title: "DIAMOND DROPS",
    subtitle: "Sculptural Earrings",
    slug: "diamond-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    title: "TEMPLE HERITAGE",
    subtitle: "22K Pure Nakshi Gold",
    slug: "temple-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1611591475163-9a3d463e230c?auto=format&fit=crop&q=80&w=800",
    title: "GOLD KADA",
    subtitle: "Handcrafted Movement",
    slug: "gold-jewellery",
  },
  {
    src: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=800",
    title: "BRIDAL POLKI",
    subtitle: "Heirloom Ceremonial",
    slug: "bridal",
  },
  {
    src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
    title: "CONTEMPORARY",
    subtitle: "Modern Geometries",
    slug: "contemporary",
  },
  {
    src: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800",
    title: "PEARL VEIL",
    subtitle: "Natural Sea Pearls",
    slug: "high-jewellery",
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
