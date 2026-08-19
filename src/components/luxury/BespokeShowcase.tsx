"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Compass, Feather, Gem, Shield } from "lucide-react";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";

export function BespokeShowcase() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Private Consultation",
      desc: "Meet with our Senior Jewellery Curators in Hyderabad or virtually to explore your vision, family heirlooms, and occasion aesthetics."
    },
    {
      num: "02",
      icon: Gem,
      title: "Gemstone Selection",
      desc: "Hand-select rare D-flawless solitaires, unheated Zambian emeralds, Basra pearls, or syndicate polki diamonds from our vault."
    },
    {
      num: "03",
      icon: Feather,
      title: "Royal Renderings & Sketches",
      desc: "Our master artists draft custom hand-drawn gouache paintings and 3D CAD precision models tailored to your exact measurements."
    },
    {
      num: "04",
      icon: Shield,
      title: "Master Artisan Forging",
      desc: "Eighth-generation Hyderabad karigars hand-set every stone in 22K/18K gold, delivering an authenticated, timeless family heirloom."
    }
  ];

  return (
    <>
      <section className="py-24 md:py-36 bg-[#1C1A17] text-[#FDFBF7] relative overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8C734B]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Dual Border Accent */}
        <div className="absolute inset-8 border border-[#EFE9DA]/10 pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-xs uppercase tracking-[0.35em] text-[#B59A5B] font-medium inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Exclusivity & Personal Curation
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FDFBF7] mt-3 font-light leading-tight"
            >
              The Vasundhara Bespoke Journey
            </motion.h2>
            <p className="font-sans text-sm text-[#EFE9DA]/70 mt-4 leading-relaxed max-w-2xl mx-auto">
              Transform your grandest desires into rare Indian high jewellery. From royal wedding trousseaus to reinventing ancestral heirlooms, our atelier crafts your unique legacy.
            </p>
            <div className="w-16 h-[1px] bg-[#8C734B] mx-auto mt-6" />
          </div>

          {/* 4-Step Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="bg-[#FDFBF7]/5 backdrop-blur-md p-8 rounded-2xl border border-[#EFE9DA]/15 hover:border-[#8C734B] transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-3xl text-[#B59A5B] font-light">{step.num}</span>
                      <div className="p-3 bg-[#8C734B]/20 rounded-full text-[#B59A5B] group-hover:bg-[#8C734B] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl text-[#FDFBF7] font-light mb-3">{step.title}</h3>
                    <p className="font-sans text-xs text-[#EFE9DA]/70 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#EFE9DA]/10 flex items-center justify-between text-[10px] font-sans uppercase tracking-widest text-[#B59A5B]">
                    <span>Atelier Protocol</span>
                    <span>Hyderabad</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Primary Bespoke CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setAppointmentOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.3em] font-medium rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#FDFBF7]" />
              <span>Begin Your Bespoke Journey</span>
            </button>
          </div>
        </div>
      </section>

      {/* Appointment Modal Trigger */}
      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
