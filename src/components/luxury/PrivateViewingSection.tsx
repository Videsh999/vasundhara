"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export function PrivateViewingSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#24211D] text-[#FDFBF7] border-b border-[#B09262]/30 overflow-hidden flex items-center justify-center select-none">
      {/* Subtle Background Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000"
          alt="Vasundhara Diamond Roof Salon Background"
          loading="lazy"
          className="w-full h-full object-cover opacity-20 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24211D] via-[#24211D]/85 to-[#24211D]" />
      </div>

      {/* Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#C6AA78] font-medium block">
            FLAGSHIP SALON • JUBILEE HILLS, HYDERABAD
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FDFBF7] font-light tracking-tight">
            Private Viewing
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-lg sm:text-2xl italic text-[#EFE9DA]/90 max-w-2xl mx-auto leading-relaxed font-light"
        >
          "Discover Vasundhara in an intimate consultation curated exclusively for you and your family."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/private-viewing"
            className="group px-8 py-4 bg-[#B09262] hover:bg-[#C6AA78] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5"
          >
            <Calendar className="w-4 h-4 text-[#FDFBF7]" />
            <span>REQUEST PRIVATE VIEWING</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-400" />
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 border border-[#EFE9DA]/30 text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <span>CONTACT THE MAISON</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
