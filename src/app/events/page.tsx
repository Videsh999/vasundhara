"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { getEvents } from "@/lib/supabase/mock-data";

export default function EventsLandingPage() {
  const events = getEvents();
  const featuredEvent = events[0];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Hero Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            ROYAL SOIRÉES & PREVIEWS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            Vasundhara Events
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#686256] max-w-xl mx-auto leading-relaxed">
            Private invitations to palace galas, high bridal previews, and exclusive collector evenings.
          </p>
        </div>
      </section>

      {/* Featured & Listed Events */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {featuredEvent && (
          <div className="group relative bg-[#F7F3E9] rounded-2xl overflow-hidden border border-[#8C734B]/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden">
              <img
                src={featuredEvent.coverImage}
                alt={featuredEvent.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#FDFBF7]/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest text-[#1C1A17] font-medium border border-[#8C734B]/20">
                FEATURED EVENT
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-4 text-xs text-[#8C734B] font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredEvent.dateStart}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {featuredEvent.location}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
                {featuredEvent.title}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed">
                {featuredEvent.description}
              </p>

              <div className="pt-2">
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-[#8C734B] font-semibold hover:text-[#1C1A17] transition-colors"
                >
                  <span>Request Pass →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Past Events Archive */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
              FROM THE HOUSE
            </span>
            <h2 className="font-serif text-3xl text-[#1C1A17] font-light">
              Past Experiences Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt) => (
              <div key={evt.id} className="bg-[#F7F3E9] rounded-xl overflow-hidden border border-[#8C734B]/20 p-6 space-y-4">
                <div className="aspect-[16/9] rounded-lg overflow-hidden">
                  <img src={evt.coverImage} alt={evt.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="font-sans text-xs text-[#8C734B]">{evt.dateStart} • {evt.location}</span>
                  <h3 className="font-serif text-xl text-[#1C1A17]">{evt.title}</h3>
                  <p className="font-sans text-xs text-[#686256] line-clamp-2">{evt.description}</p>
                </div>
                <Link href={`/events/${evt.slug}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C734B] font-medium pt-2">
                  <span>Explore Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
