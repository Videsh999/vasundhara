"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, ArrowRight, ShieldCheck, Crown, Gem, Award, ArrowUp, MessageCircle } from "lucide-react";
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
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/vasundharadiamondrf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#24211D] border border-[#B09262]/40 flex items-center justify-center text-[#B09262] hover:bg-[#B09262] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/VasundharaDiamondRoof"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#24211D] border border-[#B09262]/40 flex items-center justify-center text-[#B09262] hover:bg-[#B09262] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919169165512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#24211D] border border-[#B09262]/40 flex items-center justify-center text-[#B09262] hover:bg-[#B09262] hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
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
