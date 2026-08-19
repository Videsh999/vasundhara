"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Gem, ShieldCheck, Award, Sparkles } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";

export default function HeritageCraftsmanshipPage() {
  const craftSequence = [
    {
      step: "01",
      title: "DESIGN & PARCHMENT SKETCHING",
      desc: "Every creation begins with hand-drawn gouache parchment illustrations, balancing historical proportions with individual gemstone shapes.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1400",
    },
    {
      step: "02",
      title: "RARE GEMSTONE SELECTION",
      desc: "Only natural syndicate polki diamonds, unheated Zambian emeralds, and lustrous saltwater Basra pearls meeting strict optical criteria are selected.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1400",
    },
    {
      step: "03",
      title: "22K NAKSHI GOLD CARVING",
      desc: "Master karigars hand-chisel solid 22K yellow gold with traditional steel punches, carving intricate sacred motifs and royal Deccani patterns.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1400",
    },
    {
      step: "04",
      title: "KUNDAN FOIL ENCASEMENT & POLISHING",
      desc: "Uncut polki gems are backed with pure 24K gold foil inside custom settings to maximize natural light reflection, finished with hand-burnished polishing.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1400",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Header Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#8C734B]">
            <Link href="/heritage" className="hover:underline">Heritage</Link>
            <span>/</span>
            <span>Craftsmanship</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            THE ART OF CRAFT
          </h1>
          <p className="font-serif text-lg sm:text-xl italic text-[#686256] max-w-xl mx-auto font-light">
            "Human mastery over precious metals and rare syndicate gems."
          </p>
        </div>
      </section>

      {/* Craft Sequence */}
      <section className="py-24 max-w-6xl mx-auto px-6 space-y-24">
        {craftSequence.map((item, idx) => (
          <div key={item.step} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#1C1A17]/80 text-[#FDFBF7] backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-semibold border border-[#8C734B]/30">
                  STAGE {item.step}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
                CRAFT STAGE {item.step}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1A17] font-light">
                {item.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Conversion Section */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFBF7] font-light">
            Commission a Custom Bespoke Masterpiece
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Experience the art of craft firsthand through an intimate private consultation.
          </p>

          <Link
            href="/bespoke/enquire"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
          >
            <span>REQUEST A PRIVATE CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
