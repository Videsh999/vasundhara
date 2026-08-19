"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Globe, ShieldCheck } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";

export default function AboutPage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const leadershipTeam = [
    {
      name: "Mrs. Vasundhara Kasaraneni",
      role: "Founder, CEO & Managing Director",
      bio: "A fierce, passionate, and inspirational force in the luxury jewellery industry, Mrs. Vasundhara Kasaraneni is the creative anchor of the brand. With over 25 years of design mastery, her journey began with designing a single pair of traditional gold armlets. Today, she oversees the creative direction of the house, remaining steadfast in her mission to safeguard local artisanal welfare and keep traditional Indian jewellery forms vibrantly alive.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Mr. Anil Kumar Kasaraneni",
      role: "Co-Director",
      bio: "Mr. Anil Kumar provides strategic oversight and institutional strength to the business, serving as a foundational pillar behind the brand's sustainable commercial expansion.",
    },
    {
      name: "Ms. Ayushi Kasaraneni",
      role: "Director of Sales & Marketing",
      bio: "Representing the dynamic second generation of leadership, Ayushi drives brand strategy, consumer experience, and digital transformation, connecting the house's heritage with contemporary communication and customer experience.",
    },
    {
      name: "Mr. Ashish Kasaraneni",
      role: "Director of Operations",
      bio: "Ashish oversees operational networks, supply chain infrastructure, and inventory frameworks that support a seamless experience across the house.",
    },
    {
      name: "Ms. Neha Anumolu",
      role: "Director of Design & Production",
      bio: "Working closely with master artisans, Neha translates design concepts into finely crafted jewellery, ensuring that technical production meets the house's standards of quality and detail.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* 1. ABOUT HERO */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <VasundharaLogo variant="full" theme="light" heightClass="h-20 md:h-24" href="/" />

          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8C734B] font-semibold block pt-2">
            ABOUT VASUNDHARA DIAMOND ROOF
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            Our Heritage: A Legacy of Brilliance
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#686256] max-w-2xl mx-auto leading-relaxed">
            Founded in April 1997 by visionary designer Mrs. Vasundhara Kasaraneni, Vasundhara Diamond Roof has evolved over nearly three decades into a distinguished luxury jewellery house rooted in Indian craftsmanship, timeless design, trust, and an uncompromising attention to detail.
          </p>
        </div>
      </section>

      {/* 2. EDITORIAL INTRODUCTION */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
              ESTABLISHED APRIL 1997
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light leading-snug">
              South India’s Sanctuary of High Jewellery
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed">
              Originally established as Vasundhara Exotic Jewellers, our house has evolved over nearly three decades into one of South India's premier luxury jewelry houses. What began as a passionate endeavor to revive traditional Indian craftsmanship has blossomed into a cherished heritage brand synonymous with timeless luxury, trust, and an unparalleled design aesthetic.
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed">
              Headquartered in Jubilee Hills, Hyderabad, our flagship showroom stands as a sanctuary of luxury jewelry design. We take pride in accompanying generations of families through their most milestone celebrations, weaving memories into diamonds, gold, and precious gemstones.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#8C734B]/25">
              <img
                src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1200"
                alt="Vasundhara Diamond Roof Flagship Salon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 text-[#FDFBF7]">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#B59A5B] block">
                  Jubilee Hills Flagship Salon
                </span>
                <span className="font-serif text-xl font-light">
                  Hyderabad, Telangana
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY & CRAFTSMANSHIP PILLARS */}
      <section className="py-24 bg-[#F7F3E9] border-y border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
              Jewellery as an Art Form
            </h2>
            <p className="font-serif text-lg italic text-[#686256] max-w-2xl mx-auto font-light">
              "At Vasundhara Diamond Roof, we believe that jewelry is not merely an ornament—it is an art form defined by proportion, restraint, and a quiet discipline of craft."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-3">
              <span className="font-sans text-xs font-semibold text-[#8C734B] block">01</span>
              <h3 className="font-serif text-xl text-[#1C1A17] font-medium">Preserving Tradition</h3>
              <p className="font-sans text-xs text-[#686256] leading-relaxed">
                Preserving and honoring time-tested Indian jewellery styles while reinterpreting them for the contemporary connoisseur.
              </p>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-3">
              <span className="font-sans text-xs font-semibold text-[#8C734B] block">02</span>
              <h3 className="font-serif text-xl text-[#1C1A17] font-medium">Uncompromising Detail</h3>
              <p className="font-sans text-xs text-[#686256] leading-relaxed">
                Every curve, setting, and gemstone placement is considered with meticulous attention to detail.
              </p>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-3">
              <span className="font-sans text-xs font-semibold text-[#8C734B] block">03</span>
              <h3 className="font-serif text-xl text-[#1C1A17] font-medium">Master Artisan Network</h3>
              <p className="font-sans text-xs text-[#686256] leading-relaxed">
                Every masterpiece is brought to life through a network of master craftsmen across Mumbai, Jaipur, Gujarat, and Tamil Nadu.
              </p>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-3">
              <span className="font-sans text-xs font-semibold text-[#8C734B] block">04</span>
              <h3 className="font-serif text-xl text-[#1C1A17] font-medium">Signature Curation</h3>
              <p className="font-sans text-xs text-[#686256] leading-relaxed">
                18kt & 22kt hallmarked gold, brilliant solitaires, uncut Polki, Kundan, fine Pachi work, and South Indian temple forms with Zambian emeralds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISIONARY LEADERSHIP */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center space-y-3">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
            OUR LEADERSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
            A Family Shaped by Design, Craft & Enterprise
          </h2>
        </div>

        {/* Founder Spotlight */}
        <div className="bg-[#F7F3E9] rounded-2xl border border-[#8C734B]/25 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#8C734B]/20 shadow-md">
              <img
                src={leadershipTeam[0].image}
                alt={leadershipTeam[0].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-semibold block">
              FOUNDER & CREATIVE ANCHOR
            </span>
            <h3 className="font-serif text-3xl text-[#1C1A17] font-light">
              {leadershipTeam[0].name}
            </h3>
            <span className="font-sans text-xs uppercase tracking-widest text-[#8C734B] font-medium block">
              {leadershipTeam[0].role}
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#686256] leading-relaxed pt-2">
              {leadershipTeam[0].bio}
            </p>
          </div>
        </div>

        {/* Co-Directors & Next Generation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadershipTeam.slice(1).map((leader) => (
            <div
              key={leader.name}
              className="bg-[#F7F3E9] p-8 rounded-2xl border border-[#8C734B]/20 space-y-3 shadow-sm"
            >
              <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                EXECUTIVE DIRECTOR
              </span>
              <h4 className="font-serif text-2xl text-[#1C1A17] font-light">{leader.name}</h4>
              <span className="font-sans text-xs text-[#8C734B] font-medium block">{leader.role}</span>
              <p className="font-sans text-xs text-[#686256] leading-relaxed pt-1">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SHOWROOM PRESENCE & VIRTUAL CONSULTATION */}
      <section className="py-24 bg-[#F7F3E9] border-t border-[#8C734B]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
              OUR SHOWROOMS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
              Experience Vasundhara in Person
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#686256] max-w-xl mx-auto leading-relaxed">
              We invite you to experience the world of Vasundhara Diamond Roof in person. Each of our retail environments is designed to offer private, deeply personalized walkthroughs and bespoke design consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#8C734B]/15 flex items-center justify-center text-[#8C734B]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                  FLAGSHIP SALON
                </span>
                <h3 className="font-serif text-2xl text-[#1C1A17] font-light mt-1">HYDERABAD</h3>
                <p className="font-sans text-xs text-[#686256] leading-relaxed mt-2">
                  Plot No. 775 F, Road No. 45, Jubilee Hills, Telangana 500033
                </p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#8C734B]/15 flex items-center justify-center text-[#8C734B]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                  REGIONAL LUXURY SUITE
                </span>
                <h3 className="font-serif text-2xl text-[#1C1A17] font-light mt-1">VIJAYAWADA</h3>
                <p className="font-sans text-xs text-[#686256] leading-relaxed mt-2">
                  Regional High Jewellery Suite, Andhra Pradesh
                </p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#8C734B]/15 flex items-center justify-center text-[#8C734B]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                  REGIONAL LUXURY SUITE
                </span>
                <h3 className="font-serif text-2xl text-[#1C1A17] font-light mt-1">VISAKHAPATNAM</h3>
                <p className="font-sans text-xs text-[#686256] leading-relaxed mt-2">
                  Regional High Jewellery Suite, Andhra Pradesh
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-[#1C1A17] text-[#FDFBF7] rounded-2xl text-center space-y-3">
            <Globe className="w-6 h-6 text-[#B59A5B] mx-auto" />
            <h3 className="font-serif text-2xl text-[#FDFBF7] font-light">International Virtual Appointments</h3>
            <p className="font-serif text-sm italic text-[#EFE9DA]/90 max-w-lg mx-auto">
              "Bespoke virtual video appointments are available for international clientele seeking custom bridal design collaborations."
            </p>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION ENDING CTA */}
      <section className="py-24 bg-[#1C1A17] text-[#FDFBF7] text-center space-y-6">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <Sparkles className="w-6 h-6 text-[#B59A5B] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FDFBF7] font-light">
            Discover Vasundhara in Person
          </h2>
          <p className="font-serif text-lg italic text-[#EFE9DA]/90 max-w-xl mx-auto">
            Schedule a private consultation at our Jubilee Hills flagship salon or request a bespoke design walkthrough.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setAppointmentOpen(true)}
              className="px-8 py-3.5 bg-[#8C734B] hover:bg-[#B59A5B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full shadow-2xl transition-all"
            >
              REQUEST A PRIVATE VIEWING
            </button>

            <Link
              href="/bespoke"
              className="px-8 py-3.5 bg-[#FDFBF7]/10 hover:bg-[#FDFBF7]/20 border border-[#EFE9DA]/40 text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full backdrop-blur-md transition-all inline-flex items-center gap-2"
            >
              <span>BEGIN A BESPOKE JOURNEY</span>
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
