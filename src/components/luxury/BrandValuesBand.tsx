"use client";

import React from "react";
import { motion } from "framer-motion";

export function BrandValuesBand() {
  const values = [
    {
      id: "val-1",
      title: "EXCEPTIONAL QUALITY",
      subtitle: "Finest diamonds, exceptional brilliance.",
      // Custom delicate diamond stroke SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#B09262]">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20" />
          <path d="M10 3l-2 6 4 12 4-12-2-6" />
        </svg>
      ),
    },
    {
      id: "val-2",
      title: "EXPERTLY CRAFTED",
      subtitle: "Masterful craftsmanship in every creation.",
      // Custom delicate ring/gemstone stroke SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#B09262]">
          <circle cx="12" cy="14" r="7" />
          <path d="M9 7l3-4 3 4" />
          <path d="M9 7h6" />
          <circle cx="12" cy="4" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "val-3",
      title: "TRUST & TRANSPARENCY",
      subtitle: "Honest practices, lifetime of trust.",
      // Custom delicate shield check stroke SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#B09262]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "val-4",
      title: "LEGACY OF EMOTIONS",
      subtitle: "Jewellery that becomes your story.",
      // Custom delicate heart/emotion stroke SVG
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#B09262]">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#F7F3EA] text-[#24211D] border-b border-[#B09262]/20 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#B09262]/20">
          {values.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="flex items-center gap-4 lg:px-6 first:lg:pl-0 last:lg:pr-0"
            >
              {/* Line Icon */}
              <div className="p-3 rounded-full bg-[#FDFBF7]/80 border border-[#B09262]/25 shadow-sm shrink-0">
                {item.icon}
              </div>

              {/* Text */}
              <div className="space-y-0.5">
                <h3 className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#24211D] uppercase">
                  {item.title}
                </h3>
                <p className="font-serif text-xs italic text-[#6E685F]">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
