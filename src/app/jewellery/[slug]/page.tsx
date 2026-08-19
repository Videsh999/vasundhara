"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Sparkles, ShieldCheck } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { JewelleryLightboxGallery } from "@/components/luxury/JewelleryLightboxGallery";
import dynamic from "next/dynamic";

const Jewellery3DViewer = dynamic(
  () => import("@/components/3d/Jewellery3DViewer").then((m) => ({ default: m.Jewellery3DViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F3E9] border border-[#8C734B]/20 flex items-center justify-center">
        <span className="font-serif text-sm text-[#8C734B] animate-pulse">✦ Loading 3D Atelier...</span>
      </div>
    ),
  }
);
import {
  getJewelleryBySlug,
  getRelatedJewellery,
  getCollectionBySlug,
} from "@/lib/supabase/mock-data";

interface JewelleryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function JewelleryDetailPage({ params }: JewelleryDetailPageProps) {
  const resolvedParams = use(params);
  const jewellery = getJewelleryBySlug(resolvedParams.slug);

  if (!jewellery) {
    notFound();
  }

  const collection = getCollectionBySlug(jewellery.collectionSlug);
  const relatedPieces = getRelatedJewellery(jewellery.slug);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [view3D, setView3D] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* 1. BREADCRUMBS & TOP HEADER */}
      <section className="pt-36 pb-8 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between text-xs font-sans text-[#686256]">
          <div className="flex items-center gap-2 uppercase tracking-widest">
            <Link href="/collections" className="hover:text-[#1C1A17]">Collections</Link>
            <span>/</span>
            {collection && (
              <>
                <Link href={`/collections/${collection.slug}`} className="hover:text-[#1C1A17]">
                  {collection.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-[#8C734B] font-semibold">{jewellery.title}</span>
          </div>

          <span className="hidden sm:inline-block font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C734B] font-medium">
            REF: {jewellery.code}
          </span>
        </div>
      </section>

      {/* 2. MAIN HERO & GALLERY GRID */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Interactive Lightbox Gallery & Optional 3D Atelier Viewer */}
        <div className="lg:col-span-7 space-y-6">
          {view3D ? (
            <Jewellery3DViewer
              title={jewellery.title}
              posterImage={jewellery.model3DPoster || jewellery.primaryImage}
            />
          ) : (
            <JewelleryLightboxGallery
              media={jewellery.galleryMedia.length > 0 ? jewellery.galleryMedia : [jewellery.primaryImage]}
              title={jewellery.title}
            />
          )}

          {jewellery.model3DEnabled && (
            <div className="flex justify-center">
              <button
                onClick={() => setView3D(!view3D)}
                className="px-5 py-2.5 bg-[#F7F3E9] hover:bg-[#8C734B] hover:text-white border border-[#8C734B]/30 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#1C1A17] transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C734B] group-hover:text-white" />
                <span>{view3D ? "SHOW HIGH-RES GALLERY" : "✦ EXPLORE IN 3D ATELIER"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Piece Details & Specifications */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3 pb-6 border-b border-[#8C734B]/20">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-semibold block">
              {jewellery.category} HEIRLOOM • {jewellery.karat}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light leading-snug">
              {jewellery.title}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed pt-2">
              {jewellery.description}
            </p>
          </div>

          {/* Design Inspiration */}
          {jewellery.inspiration && (
            <div className="p-6 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/20 space-y-2">
              <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                ATELIER DESIGN INSPIRATION
              </span>
              <p className="font-serif text-sm italic text-[#1C1A17] leading-relaxed">
                "{jewellery.inspiration}"
              </p>
            </div>
          )}

          {/* Master Specifications Table */}
          <div className="space-y-3 pt-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C734B] font-semibold block">
              SPECIFICATIONS & CRAFT DETAILS
            </span>

            <div className="bg-[#F7F3E9] rounded-xl p-5 border border-[#8C734B]/20 divide-y divide-[#8C734B]/15">
              {Object.entries(jewellery.specifications).map(([key, val]) => (
                <div key={key} className="py-2.5 flex items-center justify-between text-xs font-sans">
                  <span className="text-[#686256] uppercase tracking-wider">{key}</span>
                  <span className="text-[#1C1A17] font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion CTAs */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => setAppointmentOpen(true)}
              className="w-full py-4 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#B59A5B]" />
              <span>REQUEST A PRIVATE VIEWING</span>
            </button>

            <button
              onClick={() => setAppointmentOpen(true)}
              className="w-full py-3.5 bg-[#F7F3E9] hover:bg-[#EFE9DA] text-[#1C1A17] border border-[#8C734B]/30 font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-all text-center"
            >
              ENQUIRE ABOUT THIS PIECE
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#686256] pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C734B]" />
            <span>GIA Certified • Insured Private Delivery • Vasundhara Guarantee</span>
          </div>
        </div>
      </section>

      {/* 3. RELATED JEWELLERY */}
      <section className="py-20 bg-[#F7F3E9] border-t border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          <div className="text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl text-[#1C1A17] font-light">
              You May Also Discover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPieces.map((piece) => (
              <Link
                key={piece.id}
                href={`/jewellery/${piece.slug}`}
                className="group bg-[#FDFBF7] rounded-xl overflow-hidden border border-[#8C734B]/20 p-4 block hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-[#F7F3E9]">
                  <img src={piece.primaryImage} alt={piece.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block mb-1">
                  {piece.code}
                </span>
                <h3 className="font-serif text-lg text-[#1C1A17] group-hover:text-[#8C734B] font-medium">{piece.title}</h3>
                <div className="mt-3 pt-3 border-t border-[#8C734B]/15 flex items-center justify-between font-sans text-xs text-[#8C734B] font-medium">
                  <span>Discover Piece</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
