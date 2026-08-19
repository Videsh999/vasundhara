"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Shield, Eye, Sparkles } from "lucide-react";

export function VasundharaExperienceSection() {
  const highlights = [
    {
      icon: Eye,
      title: "Private Consultation Salons",
      desc: "Discreet high-security viewing chambers designed for total privacy during royal family curations.",
    },
    {
      icon: Shield,
      title: "Valet & High Security",
      desc: "Private underground valet parking and dedicated security escorts provided for every patron.",
    },
    {
      icon: Sparkles,
      title: "Personal Curators",
      desc: "Guided by 8th-generation family curators who understand royal trousseaus and legacy diamond vaults.",
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#F7F3E9] text-[#1C1A17] border-b border-[#8C734B]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            THE FLAGSHIP SALON
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1A17] font-light">
            THE VASUNDHARA EXPERIENCE
          </h2>
          <p className="font-serif text-base sm:text-xl italic text-[#686256] font-light">
            "An oasis of Nizam royal luxury in Jubilee Hills, Hyderabad."
          </p>
        </div>

        {/* Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25 group"
          >
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600"
              alt="Vasundhara Flagship Salon Interior"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 text-[#FDFBF7] flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
              <MapPin className="w-4 h-4 text-[#B59A5B]" />
              <span>Road No. 36, Jubilee Hills, Hyderabad</span>
            </div>
          </motion.div>

          <div className="lg:col-span-5 space-y-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="p-6 bg-[#FDFBF7] rounded-xl border border-[#8C734B]/20 shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#8C734B]" />
                    <h3 className="font-serif text-lg text-[#1C1A17] font-medium">{item.title}</h3>
                  </div>
                  <p className="font-sans text-xs text-[#686256] leading-relaxed pl-7">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
