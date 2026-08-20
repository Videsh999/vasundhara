"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, ArrowRight, ShieldCheck, Crown, Gem, Award, ArrowUp, Instagram, Facebook, MessageCircle } from "lucide-react";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";

export function LuxuryFooter() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-[#191714] via-[#141210] to-[#0D0C0A] text-[#FDFBF7] pt-24 pb-14 relative overflow-hidden border-t border-[#B09262]/30 select-none">
        {/* Majestic Architectural Watermark */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.025] select-none">
          <span className="font-serif text-[24vw] uppercase tracking-widest text-[#B09262] whitespace-nowrap">
            VASUNDHARA
          </span>
        </div>

        {/* Ambient Subtle Gold Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#B09262]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-20">
          
          {/* 1. VIP DISPATCH & ROYAL CIRCLE INVITATION CARD */}
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#24211D]/90 via-[#2A2621]/95 to-[#24211D]/90 border border-[#B09262]/40 shadow-2xl overflow-hidden">
            {/* Corner Gold Flourish Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#B09262]/40 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#B09262]/40 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#B09262]/40 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#B09262]/40 rounded-br-lg" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B09262]/20 border border-[#B09262]/40 text-[#D4AF37]">
                  <Crown className="w-3.5 h-3.5" />
                  <span className="font-sans text-[9px] uppercase tracking-[0.35em] font-semibold">
                    EXCLUSIVE PATRON PRIVILEGES
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#FDFBF7] font-light leading-snug">
                  Invitations to Private Salon Previews
                </h3>
                <p className="font-sans text-xs text-[#EFE9DA]/70 leading-relaxed max-w-lg">
                  Join our distinguished circle for private dispatches, rare Colombian emerald releases, bespoke bridal trousseau consultations, and invitations to annual Nizam high jewellery exhibitions.
                </p>
              </div>

              <div className="lg:col-span-6">
                {subscribed ? (
                  <div className="p-6 bg-[#B09262]/20 border border-[#B09262]/60 rounded-2xl text-center space-y-1">
                    <span className="font-serif text-xl text-[#FDFBF7] block">Welcome to the Vasundhara Patron Circle</span>
                    <p className="font-sans text-xs text-[#EFE9DA]/70">Your royal invitation and dispatch dossier will arrive shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your private email address..."
                      className="flex-1 px-6 py-4 bg-[#141210]/90 border border-[#B09262]/40 rounded-full font-sans text-xs text-white placeholder-[#EFE9DA]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-inner"
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-[#B09262] via-[#C6AA78] to-[#B09262] text-[#141210] font-sans text-xs uppercase tracking-[0.22em] font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>REQUEST INVITATION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 2. CORE EDITORIAL FOOTER DIRECTORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-4">
            
            {/* Column 1: Maison Identity & Salons (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-block space-y-3">
                <VasundharaLogo
                  variant="full"
                  theme="dark"
                  heightClass="h-12"
                  href="/?intro=true"
                />
              </div>

              <p className="font-sans text-xs text-[#EFE9DA]/70 leading-relaxed max-w-sm">
                South India's premier maison of bespoke diamond heirlooms, uncut syndicate polki jewels, and master Nakshi gold craftsmanship. Founded in 1997 by visionary designer Mrs. Vasundhara Kasaraneni.
              </p>

              {/* Verified Contact Details with Official Social and Phone */}
              <div className="space-y-3 pt-2 text-xs text-[#EFE9DA]/80 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B09262] shrink-0 mt-0.5" />
                  <span>Flagship Salon: Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B09262] shrink-0" />
                  <a href="tel:+919169165512" className="hover:text-[#D4AF37] transition-colors">
                    +91 91691 65512
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B09262] shrink-0" />
                  <a href="mailto:customercare@vasundhradiamondroof.com" className="hover:text-[#D4AF37] transition-colors">
                    customercare@vasundhradiamondroof.com
                  </a>
                </div>
              </div>

              {/* Official Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/vasundharadiamondrf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#24211D] border border-[#B09262]/40 flex items-center justify-center text-[#B09262] hover:bg-[#B09262] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/VasundharaDiamondRoof"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#24211D] border border-[#B09262]/40 flex items-center justify-center text-[#B09262] hover:bg-[#B09262] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919169165512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#24211D] border border-[#B09262]/40 flex items-center justify-center text-[#B09262] hover:bg-[#B09262] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: High Jewellery & Collections (Span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif text-lg text-[#FDFBF7] font-normal tracking-wide flex items-center gap-2 border-b border-[#B09262]/20 pb-2">
                <span>Collections</span>
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-[#EFE9DA]/70">
                <li>
                  <Link href="/collections" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Royal Bridal Trinity</span>
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Colombian Emerald Mesh Suite</span>
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Nizam Polki & Nakshi Chokers</span>
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Temple Heirlooms & Peacock Haars</span>
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Burmese Rubies & Imperial Jade</span>
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Flawless Solitaire Diamonds</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: The Maison & Atelier (Span 3) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif text-lg text-[#FDFBF7] font-normal tracking-wide flex items-center gap-2 border-b border-[#B09262]/20 pb-2">
                <span>The Maison</span>
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-[#EFE9DA]/70">
                <li>
                  <Link href="/heritage" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>The Nizam Legacy & Lineage</span>
                  </Link>
                </li>
                <li>
                  <Link href="/bespoke" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Bespoke Bridal Atelier</span>
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Grand Exhibitions & Soirees</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#B09262]/50" />
                    <span>Founder's Story — Mrs. Vasundhara</span>
                  </Link>
                </li>
                <li>
                  <Link href="/private-viewing" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-[#D4AF37] font-medium">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                    <span>Book Private Viewing Chamber</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Certifications & Services (Span 2) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-lg text-[#FDFBF7] font-normal tracking-wide flex items-center gap-2 border-b border-[#B09262]/20 pb-2">
                <span>Provenance</span>
              </h4>
              <div className="space-y-3 font-sans text-xs text-[#EFE9DA]/70">
                <div className="flex items-center gap-2.5 text-xs text-[#EFE9DA]">
                  <ShieldCheck className="w-4 h-4 text-[#B09262] shrink-0" />
                  <span>BIS 916/750 Gold Hallmark</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#EFE9DA]">
                  <Gem className="w-4 h-4 text-[#B09262] shrink-0" />
                  <span>GIA & IGI Certified</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#EFE9DA]">
                  <Award className="w-4 h-4 text-[#B09262] shrink-0" />
                  <span>Conflict-Free Diamonds</span>
                </div>

                <div className="pt-3">
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24211D] border border-[#B09262]/40 text-[#C6AA78] text-[10px] uppercase tracking-wider hover:bg-[#B09262] hover:text-white transition-colors"
                  >
                    <span>Maison Admin Portal</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* 3. BOTTOM VINTAGE DIVIDER & COPYRIGHT */}
          <div className="pt-8 border-t border-[#B09262]/25 flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-[11px] text-[#EFE9DA]/50">
            <div className="flex items-center gap-4">
              <p>© 1997–{new Date().getFullYear()} Maison Vasundhara Diamond Roof. All Royal Rights Reserved.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/admin/login" className="text-[#C6AA78] hover:text-[#D4AF37] transition-colors">
                Admin Panel
              </Link>
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Privacy Protocol</span>
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Terms of Curation</span>
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">Bespoke Authenticity Certificate</span>
              <button
                onClick={scrollToTop}
                aria-label="Back to Top"
                className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors cursor-pointer pl-4"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
