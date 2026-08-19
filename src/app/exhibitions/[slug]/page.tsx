"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, MapPin, Sparkles, Building2 } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { ExperienceGalleryModal } from "@/components/luxury/ExperienceGalleryModal";
import {
  getExperienceBySlug,
  getRelatedExperiences,
} from "@/lib/supabase/mock-data";

interface ExhibitionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ExhibitionDetailPage({ params }: ExhibitionDetailPageProps) {
  const resolvedParams = use(params);
  const exhibition = getExperienceBySlug(resolvedParams.slug);

  if (!exhibition || exhibition.eventType !== "EXHIBITION") {
    notFound();
  }

  const related = getRelatedExperiences(exhibition.slug);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* 1. EXHIBITION HERO */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#8C734B]">
            <Link href="/experiences" className="hover:underline">Experiences</Link>
            <span>/</span>
            <Link href="/exhibitions" className="hover:underline">Exhibitions</Link>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            {exhibition.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans uppercase tracking-widest text-[#686256] pt-2">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C734B]" />
              {exhibition.dateStart} {exhibition.dateEnd ? `– ${exhibition.dateEnd}` : ""}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C734B]" />
              {exhibition.location}
            </span>
          </div>
        </div>
      </section>

      {/* 2. HERO IMAGE BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
          <img
            src={exhibition.coverImage}
            alt={exhibition.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* 3. CURATORIAL STATEMENT */}
      <section className="py-16 max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            CURATORIAL CONTEXT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
            Exhibition Statement
          </h2>
        </div>

        <p className="font-sans text-sm text-[#686256] leading-relaxed text-center">
          {exhibition.story || exhibition.description}
        </p>

        {exhibition.curatorialStatement && (
          <div className="p-8 bg-[#F7F3E9] rounded-2xl border border-[#8C734B]/20 text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#8C734B] font-semibold block">
              THEME STATEMENT
            </span>
            <p className="font-serif text-lg text-[#1C1A17] italic">
              "{exhibition.curatorialStatement}"
            </p>
          </div>
        )}
      </section>

      {/* 4. REUSABLE EXPERIENCE GALLERY */}
      <section className="py-16 md:py-24 bg-[#F7F3E9] border-y border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          <div className="text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
              EXHIBITION GALLERY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
              Featured Works Archive
            </h2>
          </div>

          <ExperienceGalleryModal media={exhibition.galleryMedia} title={exhibition.title} />
        </div>
      </section>

      {/* 5. PRIVATE VIEWING CONVERSION */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-4xl text-[#FDFBF7] font-light">
            Explore Vasundhara Masterpieces Privately
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Book a private curation or visit our Jubilee Hills flagship salon.
          </p>

          <button
            onClick={() => setAppointmentOpen(true)}
            className="px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
          >
            REQUEST A PRIVATE VIEWING
          </button>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
