"use client";

import React, { useState } from "react";
import { VasundharaCinematicLoader } from "@/components/luxury/VasundharaCinematicLoader";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { CinematicHero } from "@/components/luxury/CinematicHero";
import { BrandIntroSection } from "@/components/luxury/BrandIntroSection";
import { SignatureCollectionsSection } from "@/components/luxury/SignatureCollectionsSection";
import { BrandValuesBand } from "@/components/luxury/BrandValuesBand";
import { CraftsmanshipSection } from "@/components/luxury/CraftsmanshipSection";
import { FeaturedJewellerySection } from "@/components/luxury/FeaturedJewellerySection";
import { HeritageStorySection } from "@/components/luxury/HeritageStorySection";
import { BespokeJourneySection } from "@/components/luxury/BespokeJourneySection";
import { ExperiencesSection } from "@/components/luxury/ExperiencesSection";
import { TestimonialsSection } from "@/components/luxury/TestimonialsSection";
import { PrivateViewingSection } from "@/components/luxury/PrivateViewingSection";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { MOCK_COLLECTIONS, MOCK_EVENTS } from "@/lib/supabase/mock-data";

export default function Homepage() {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#24211D] relative selection:bg-[#B09262] selection:text-[#FDFBF7]">
      {/* 0. Official Vasundhara Cinematic Loading Film (Dissolves softly into Hero) */}
      <VasundharaCinematicLoader
        desktopVideoSrc="/brand/vdr-loading-film.mp4"
        mobileVideoSrc="/brand/vdr-loading-film-mobile.mp4"
        onComplete={() => setIsLoaderComplete(true)}
      />

      {/* Global Luxury Header */}
      <LuxuryHeader theme="auto" />

      {/* 1. Cinematic Hero (Starts video playback from 0s once loader dissolves) */}
      <CinematicHero isPlaying={isLoaderComplete} isVisible={true} />

      {/* 2. Brand Introduction / Our Story */}
      <BrandIntroSection />

      {/* 3. Signature Collections */}
      <SignatureCollectionsSection collections={MOCK_COLLECTIONS} />

      {/* 4. Brand Values */}
      <BrandValuesBand />

      {/* 5. Craftsmanship */}
      <CraftsmanshipSection />

      {/* 6. Featured Jewellery */}
      <FeaturedJewellerySection />

      {/* 7. Heritage / Storytelling */}
      <HeritageStorySection />

      {/* 8. Bespoke Experience */}
      <BespokeJourneySection />

      {/* 9. Events & Exhibitions */}
      <ExperiencesSection events={MOCK_EVENTS} />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Private Viewing CTA */}
      <PrivateViewingSection />

      {/* 12. Luxury Footer */}
      <LuxuryFooter />

      {/* Floating Experience Controls (AI Concierge + Ambient Sound) */}
      <FloatingExperienceControls />
    </main>
  );
}
