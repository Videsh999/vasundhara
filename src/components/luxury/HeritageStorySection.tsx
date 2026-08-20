"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BoxCarousel, type CarouselItem } from "@/components/core/box-carousel";

const HERITAGE_CUBE_ITEMS: CarouselItem[] = [
  {
    id: 1,
    type: "image",
    srcUrl: "/brand/vasundhara-masterpiece-jewellery.jpg",
    alt: "Vasundhara Masterpiece Diamond & Gold Bridal Collection",
    title: "ATELIER ARCHIVES • HYDERABAD",
    subtitle: "Nearly Three Decades of Indian Goldsmithing",
  },
  {
    id: 2,
    type: "image",
    srcUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200",
    alt: "Traditional Indian Bridal Choker & Kundan Craftsmanship",
    title: "ROYAL HERITAGE ATELIER",
    subtitle: "22K Pure Nakshi Carving & Uncut Polki",
  },
  {
    id: 3,
    type: "image",
    srcUrl: "/brand/vasundhara-masterpiece-jewellery.jpg",
    alt: "Vasundhara Royal Solitaires, Necklaces & Bangles Suite on Silk",
    title: "GEMOLOGICAL PURITY",
    subtitle: "Natural Diamonds & Rare Solitaires",
  },
  {
    id: 4,
    type: "image",
    srcUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
    alt: "Certified Triple-Ex Solitaire Diamond Precision",
    title: "TIMELESS BRILLIANCE",
    subtitle: "Handcrafted Heirlooms Preserved Forever",
  },
];

export function HeritageStorySection() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#FBF9F4] text-[#24211D] border-b border-[#B09262]/20 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story Text Narrative (Alternating Rhythm) */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-3">
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B09262] font-semibold">
                  HERITAGE
                </span>
                <div className="w-12 h-[1px] bg-[#B09262]/50" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light leading-tight tracking-tight">
                <span className="block">Preserving Immortal</span>
                <span className="italic font-normal block">Goldsmithing Traditions</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed"
            >
              <p>
                Founded in April 1997 by visionary designer Mrs. Vasundhara Kasaraneni in Hyderabad, our house was built on a single timeless principle: preserving the majesty of traditional Indian craftsmanship while catering to the modern jewellery connoisseur.
              </p>
              <p>
                From intricate 22K Nakshi gold carving to miniature pure gold foil Kundan stone-setting, every piece is sculpted by master artisans whose expertise represents generations of hereditary devotion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <Link
                href="/heritage"
                className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-[#B09262] hover:text-[#24211D] transition-colors pb-1 border-b border-[#B09262]/40 hover:border-[#24211D]"
              >
                <span>EXPLORE OUR HERITAGE CHAPTERS</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-400" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 3D Box Carousel Cube */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-8 sm:py-12"
          >
            <div className="w-full max-w-[500px] h-[340px] sm:h-[360px] relative flex items-center justify-center">
              <BoxCarousel
                items={HERITAGE_CUBE_ITEMS}
                direction="right"
                animation="autoplay"
                imageWidth={480}
                imageHeight={320}
                dragSensitivity={6}
                ease={{
                  type: "tween",
                  duration: 1.1,
                  delay: 2.5,
                  ease: [0.44, 0, 0.56, 1],
                }}
                className="w-full h-full"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

