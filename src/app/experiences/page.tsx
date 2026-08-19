"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";

const EXPERIENCES = [
  {
    id: "exp-showroom",
    title: "Private Showroom Experience",
    subtitle: "Flagship Salon, Jubilee Hills",
    description:
      "Step into our private salon chambers for an intimate viewing of signature high jewellery, guided by dedicated curators in total privacy.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "exp-consultation",
    title: "Personal Jewellery Consultation",
    subtitle: "Tailored Styling & Curation",
    description:
      "One-on-one styling dialogues to discover creations that complement your aesthetic, occasions, and personal jewellery collection.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "exp-bridal",
    title: "Bridal Consultation",
    subtitle: "Royal Trousseau Ensembles",
    description:
      "Comprehensive bridal trousseau curations matching uncut polki chokers, necklaces, and heirloom earrings to your wedding attire.",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "exp-bespoke",
    title: "Bespoke Design Consultation",
    subtitle: "Custom Gouache Parchment Sketches",
    description:
      "Collaborate directly with our master designers to conceptualize a one-of-a-kind creation from rare gemstones to final hand setting.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "exp-virtual",
    title: "Virtual Appointment",
    subtitle: "Worldwide High-Definition Video Dialogue",
    description:
      "Experience private video consultations from anywhere in the world, with live high-definition close-up presentations of selected pieces.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "exp-craft",
    title: "Craftsmanship Experience",
    subtitle: "Behind the Art of Goldsmithing",
    description:
      "An exclusive invitation to observe ancient Nakshi hand-engraving, pure gold foil Kundan setting, and diamond inspection under magnification.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function ExperiencesPage() {
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
            MAISON EXPERIENCES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#24211D] font-light tracking-tight"
          >
            Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-base sm:text-xl italic text-[#6E685F] font-light max-w-xl mx-auto"
          >
            "Curated moments designed to immerse you in the artistry, heritage, and personalized luxury of Vasundhara."
          </motion.p>
        </div>
      </section>

      {/* 2. 6 LUXURY EXPERIENCES GRID */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group bg-[#F7F3EA] rounded-2xl overflow-hidden border border-[#B09262]/25 shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9DA]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#B09262] font-semibold block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-[#24211D] group-hover:text-[#B09262] font-light transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6E685F] leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B09262]/15">
                  <Link
                    href="/private-viewing"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#B09262] hover:text-[#24211D] font-medium transition-colors"
                  >
                    <span>RESERVE EXPERIENCE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-24 bg-[#24211D] text-[#FDFBF7] text-center border-t border-[#B09262]/25">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <Sparkles className="w-6 h-6 text-[#B09262] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFBF7] font-light">
            Plan Your Visit
          </h2>
          <p className="font-serif text-base sm:text-xl italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            "Experience our private viewing chambers at Road No. 36, Jubilee Hills, Hyderabad."
          </p>

          <Link
            href="/private-viewing"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#B09262] hover:bg-[#C6AA78] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
          >
            <span>REQUEST PRIVATE VIEWING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
