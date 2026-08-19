"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BespokeJourneySection() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#F7F3EA] text-[#24211D] border-b border-[#B09262]/20 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B09262] font-semibold">
                  PRIVATE COMMISSIONS
                </span>
                <div className="w-10 h-[1px] bg-[#B09262]/40" />
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#24211D] font-light leading-[1.15] tracking-tight">
                <span className="block">The Bespoke</span>
                <span className="italic font-normal block">Journey</span>
              </h2>
            </div>

            <p className="font-serif text-lg sm:text-xl italic text-[#24211D] font-light">
              "Some pieces are discovered. Others are imagined."
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
              Collaborate intimately with senior Vasundhara family curators and master karigars to create a one-of-a-kind bespoke creation—tailored exclusively for your wedding, heirloom celebration, or private vault.
            </p>

            <div className="pt-3">
              <Link
                href="/bespoke"
                className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.25em] text-[#B09262] hover:text-[#24211D] transition-colors pb-1 border-b border-[#B09262]/40 hover:border-[#24211D]"
              >
                <span>BEGIN YOUR BESPOKE JOURNEY</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-400" />
              </Link>
            </div>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 1.025 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#B09262]/30 group bg-[#FDFBF7]"
          >
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600"
              alt="Vasundhara Bespoke Jewellery Commission"
              loading="lazy"
              className="w-full h-full object-cover transform transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24211D]/60 via-transparent to-transparent opacity-70 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-[#FDFBF7]">
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#C6AA78] font-medium block">
                PRIVATE ATELIER CONSULTATION
              </span>
              <span className="font-serif text-lg text-[#FDFBF7] font-light">
                Hand-Drawn Gouache to Master Goldsmithing
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
