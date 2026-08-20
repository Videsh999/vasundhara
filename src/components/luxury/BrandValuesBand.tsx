"use client";

import React from "react";
import { InfiniteSlider } from "@/components/core/infinite-slider";

export function BrandValuesBand() {
  const values = [
    {
      id: "val-1",
      title: "EXCEPTIONAL QUALITY",
      subtitle: "Finest diamonds, exceptional brilliance.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#B09262]">
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
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#B09262]">
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
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#B09262]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "val-4",
      title: "LEGACY OF EMOTIONS",
      subtitle: "Jewellery that becomes your story.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#B09262]">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
    {
      id: "val-5",
      title: "NIZAM PROVENANCE",
      subtitle: "Hereditary court karigar lineage.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#B09262]">
          <path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7l3-7z" />
        </svg>
      ),
    },
    {
      id: "val-6",
      title: "BESPOKE ARTISTRY",
      subtitle: "Custom trousseaus sculpted for royalty.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#B09262]">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-[#F7F3EA] text-[#24211D] border-b border-[#B09262]/20 select-none overflow-hidden relative">
      {/* Left/Right Vignette Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F7F3EA] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F7F3EA] to-transparent z-10 pointer-events-none" />

      <div className="w-full">
        <InfiniteSlider gap={32} speed={40} speedOnHover={15} direction="horizontal" className="w-full py-1">
          {values.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-[#FDFBF7]/80 backdrop-blur-sm border border-[#B09262]/25 shadow-sm hover:border-[#B09262] hover:shadow-md transition-all duration-300 shrink-0 min-w-[290px] sm:min-w-[320px]"
            >
              {/* Line Icon */}
              <div className="p-2.5 rounded-full bg-[#EFE9DA] border border-[#B09262]/30 shadow-inner shrink-0">
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
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
