"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, MapPin, Sparkles, Building2, Ticket } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { ExperienceGalleryModal } from "@/components/luxury/ExperienceGalleryModal";
import {
  getExperienceBySlug,
  getRelatedExperiences,
} from "@/lib/supabase/mock-data";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const resolvedParams = use(params);
  const eventItem = getExperienceBySlug(resolvedParams.slug);

  if (!eventItem || eventItem.eventType !== "EVENT") {
    notFound();
  }

  const related = getRelatedExperiences(eventItem.slug);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* 1. EVENT HERO */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#8C734B]">
            <Link href="/experiences" className="hover:underline">Experiences</Link>
            <span>/</span>
            <Link href="/events" className="hover:underline">Events</Link>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            {eventItem.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans uppercase tracking-widest text-[#686256] pt-2">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C734B]" />
              {eventItem.dateStart} {eventItem.dateEnd ? `– ${eventItem.dateEnd}` : ""}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C734B]" />
              {eventItem.location}
            </span>
          </div>
        </div>
      </section>

      {/* 2. HERO IMAGE BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
          <img
            src={eventItem.coverImage}
            alt={eventItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* 3. EVENT DETAILS SPECIFICATIONS TABLE */}
      <section className="py-12 max-w-4xl mx-auto px-6">
        <div className="bg-[#F7F3E9] rounded-2xl p-8 border border-[#8C734B]/20 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <Calendar className="w-5 h-5 text-[#8C734B] mx-auto mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#686256] block">DATE & TIME</span>
            <span className="font-serif text-base text-[#1C1A17] font-medium block">{eventItem.dateStart}</span>
          </div>

          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-[#8C734B]/20 py-4 sm:py-0">
            <Building2 className="w-5 h-5 text-[#8C734B] mx-auto mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#686256] block">PALACE VENUE</span>
            <span className="font-serif text-base text-[#1C1A17] font-medium block">{eventItem.venueDetails}</span>
          </div>

          <div className="space-y-1">
            <Ticket className="w-5 h-5 text-[#8C734B] mx-auto mb-2" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#686256] block">ACCESS TYPE</span>
            <span className="font-serif text-base text-[#1C1A17] font-medium block">By Royal Invitation</span>
          </div>
        </div>
      </section>

      {/* 4. EVENT NARRATIVE STORY */}
      <section className="py-16 max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            EDITORIAL CONTEXT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
            The Event Experience
          </h2>
        </div>

        <p className="font-sans text-sm text-[#686256] leading-relaxed text-center">
          {eventItem.story || eventItem.description}
        </p>

        {eventItem.curatorialStatement && (
          <div className="p-8 bg-[#F7F3E9] rounded-2xl border border-[#8C734B]/20 text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#8C734B] font-semibold block">
              CURATORIAL STATEMENT
            </span>
            <p className="font-serif text-lg text-[#1C1A17] italic">
              "{eventItem.curatorialStatement}"
            </p>
          </div>
        )}
      </section>

      {/* 5. EXPERIENCE GALLERY ARCHIVE */}
      <section className="py-16 md:py-24 bg-[#F7F3E9] border-y border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          <div className="text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
              PHOTOGRAPHY ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
              Event Gallery
            </h2>
          </div>

          <ExperienceGalleryModal media={eventItem.galleryMedia} title={eventItem.title} />
        </div>
      </section>

      {/* 6. RELATED EXPERIENCES */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            DISCOVER MORE
          </span>
          <h2 className="font-serif text-3xl text-[#1C1A17] font-light">
            Related Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {related.map((rel) => (
            <Link
              key={rel.id}
              href={rel.eventType === "EXHIBITION" ? `/exhibitions/${rel.slug}` : `/events/${rel.slug}`}
              className="group bg-[#F7F3E9] rounded-xl overflow-hidden border border-[#8C734B]/20 p-4 block hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
                <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="font-serif text-xl text-[#1C1A17] group-hover:text-[#8C734B] font-medium">{rel.title}</h3>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#8C734B] mt-2 block">
                Discover Experience →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. PRIVATE VIEWING CONVERSION */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-4xl text-[#FDFBF7] font-light">
            Continue Your Experience Privately
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Schedule a private consultation or tour of our high jewellery collections.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setAppointmentOpen(true)}
              className="px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
            >
              REQUEST A PRIVATE VIEWING
            </button>

            <Link
              href="/collections"
              className="px-8 py-3.5 bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 border border-[#EFE9DA]/40 text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full backdrop-blur-md transition-all inline-flex items-center gap-2"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
