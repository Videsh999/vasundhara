"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { EventItem } from "@/lib/supabase/mock-data";

interface ExperiencesSectionProps {
  events: EventItem[];
}

export function ExperiencesSection({ events }: ExperiencesSectionProps) {
  const displayEvents = events.slice(0, 2);

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F4] text-[#24211D] border-b border-[#B09262]/20 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block">
              EXPERIENCES & SOIRÉES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24211D] font-light tracking-tight"
          >
            Events & Exhibitions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-sm sm:text-base italic text-[#6E685F] font-light"
          >
            "Moments where high jewellery meets culture and conversation."
          </motion.p>
        </div>

        {/* 2-Column Editorial Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayEvents.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35, scale: 1.025 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#F7F3EA] rounded-2xl overflow-hidden border border-[#B09262]/25 shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE9DA]">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#FDFBF7]/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-[0.2em] text-[#B09262] font-semibold border border-[#B09262]/25 shadow-sm">
                  {item.eventType}
                </div>
              </div>

              <div className="p-8 sm:p-10 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#B09262] font-medium">
                  <span className="flex items-center gap-1.5 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.dateStart}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#24211D] font-light group-hover:text-[#B09262] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#6E685F] leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#B09262]/20 flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#6E685F]">
                    {item.venueDetails}
                  </span>
                  <Link
                    href={`/events/${item.slug}`}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#B09262] hover:text-[#24211D] font-semibold transition-colors group/btn"
                  >
                    <span>REQUEST INVITATION</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-400" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
