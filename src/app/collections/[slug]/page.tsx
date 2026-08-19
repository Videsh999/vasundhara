"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import {
  getCollectionBySlug,
  getJewelleryByCollection,
  getRelatedCollections,
} from "@/lib/supabase/mock-data";

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const resolvedParams = use(params);
  const collection = getCollectionBySlug(resolvedParams.slug);

  if (!collection) {
    notFound();
  }

  const jewelleryItems = getJewelleryByCollection(collection.slug);
  const relatedCollections = getRelatedCollections(collection.slug);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* 1. COLLECTION HERO */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#8C734B]">
            <Link href="/collections" className="hover:underline">Collections</Link>
            <span>/</span>
            <span>{collection.category}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            {collection.title}
          </h1>

          <p className="font-serif text-lg sm:text-2xl italic text-[#686256] max-w-2xl mx-auto font-light">
            "{collection.description}"
          </p>
        </div>
      </section>

      {/* 2. HERO IMAGE BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
          <img
            src={collection.heroImage}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* 3. COLLECTION STORY & CRAFT NARRATIVE */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            COLLECTION PROVENANCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
            The Story Behind {collection.title}
          </h2>
        </div>

        <p className="font-sans text-sm text-[#686256] leading-relaxed text-center">
          {collection.story || collection.description}
        </p>

        {collection.inspiration && (
          <div className="p-8 bg-[#F7F3E9] rounded-2xl border border-[#8C734B]/20 text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#8C734B] font-semibold block">
              DESIGN INSPIRATION
            </span>
            <p className="font-serif text-lg text-[#1C1A17] italic">
              "{collection.inspiration}"
            </p>
          </div>
        )}
      </section>

      {/* 4. JEWELLERY SHOWCASE */}
      <section className="py-16 md:py-24 bg-[#F7F3E9] border-y border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
              CURATED PIECES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
              Jewellery Showcase
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {jewelleryItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#8C734B]/20 shadow-luxury flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F3E9]">
                  <img
                    src={item.primaryImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 space-y-4">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                      {item.code} • {item.karat}
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1A17] font-light group-hover:text-[#8C734B] transition-colors mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-[#686256] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-4 border-t border-[#8C734B]/15 flex items-center justify-between">
                    <Link
                      href={`/jewellery/${item.slug}`}
                      className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#8C734B] font-medium hover:text-[#1C1A17] transition-colors"
                    >
                      <span>Discover Piece</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setAppointmentOpen(true)}
                      className="font-sans text-[10px] uppercase tracking-widest text-[#1C1A17] hover:text-[#8C734B] font-semibold"
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELATED COLLECTIONS */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            EXPLORE FURTHER
          </span>
          <h2 className="font-serif text-3xl text-[#1C1A17] font-light">
            Related Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedCollections.map((rel) => (
            <Link
              key={rel.id}
              href={`/collections/${rel.slug}`}
              className="group bg-[#F7F3E9] rounded-xl overflow-hidden border border-[#8C734B]/20 p-4 block hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img src={rel.heroImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="font-serif text-lg text-[#1C1A17] group-hover:text-[#8C734B] font-medium">{rel.title}</h3>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#8C734B] mt-1 block">
                Discover →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. PRIVATE VIEWING CONVERSION */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-4xl text-[#FDFBF7] font-light">
            Experience {collection.title} in Person
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Book a private viewing at our Jubilee Hills flagship salon or request a dedicated curator presentation.
          </p>

          <button
            onClick={() => setAppointmentOpen(true)}
            className="px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>REQUEST A PRIVATE VIEWING</span>
          </button>
        </div>
      </section>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
