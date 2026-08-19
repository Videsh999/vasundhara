"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";

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

  return (
    <>
      <footer className="bg-[#1C1A17] text-[#FDFBF7] pt-20 pb-12 relative overflow-hidden border-t border-[#B09262]/25 select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-16">
          
          {/* Top Newsletter / Invitation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#B09262]/20 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C6AA78] font-medium">
                PRIVATE DISPATCH & ROYAL CATALOGUES
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#FDFBF7] font-light">
                Receive Invitations to Private Previews
              </h3>
              <p className="font-sans text-xs text-[#EFE9DA]/70 leading-relaxed max-w-lg">
                Subscribe for private invitations to Vasundhara high jewellery soirees, private salon previews, and seasonal heirloom releases.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-[#B09262]/20 border border-[#B09262] rounded-xl text-center">
                  <span className="font-serif text-lg text-[#EFE9DA]">Welcome to the Vasundhara Patron Circle</span>
                  <p className="font-sans text-xs text-[#EFE9DA]/70 mt-1">Private dispatches will arrive in your inbox shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-5 py-3.5 bg-[#FDFBF7]/5 border border-[#B09262]/30 rounded-full font-sans text-xs text-white placeholder-[#EFE9DA]/40 focus:outline-none focus:border-[#B09262]"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#B09262] hover:bg-[#C6AA78] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>REQUEST ACCESS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Core Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: Official Brand Identity */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="inline-block space-y-2">
                <img
                  src="/brand/vasundhara-emblem-tight.png"
                  alt="Vasundhara Emblem"
                  className="h-12 w-auto object-contain brightness-110"
                />
                <img
                  src="/brand/vasundhara-wordmark-tight.png"
                  alt="VASUNDHARA"
                  className="h-5 w-auto object-contain brightness-110"
                />
              </Link>

              <p className="font-sans text-xs text-[#EFE9DA]/70 leading-relaxed max-w-sm">
                South India's premier maison of bespoke diamond heirlooms, uncut polki jewels, and master gold craftsmanship. Founded in 1997 by Mrs. Vasundhara Kasaraneni.
              </p>

              <div className="pt-2 flex flex-col gap-2 text-xs text-[#EFE9DA]/80 font-sans">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B09262] shrink-0" />
                  Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B09262] shrink-0" />
                  +91 40 2355 8888 / +91 98490 12345
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#B09262] shrink-0" />
                  concierge@vasundharadiamonds.com
                </span>
              </div>
            </div>

            {/* Column 2: Collections */}
            <div>
              <h4 className="font-serif text-lg text-[#FDFBF7] mb-4 font-normal">Collections</h4>
              <ul className="space-y-2.5 font-sans text-xs text-[#EFE9DA]/70">
                <li>
                  <Link href="/collections/eternal" className="hover:text-[#C6AA78] transition-colors">
                    Eternal Solitaires
                  </Link>
                </li>
                <li>
                  <Link href="/collections/nizam-bridal-heritage" className="hover:text-[#C6AA78] transition-colors">
                    Heritage Polki & Kundan
                  </Link>
                </li>
                <li>
                  <Link href="/collections/grace" className="hover:text-[#C6AA78] transition-colors">
                    Grace Fine Gold
                  </Link>
                </li>
                <li>
                  <Link href="/collections/celestia" className="hover:text-[#C6AA78] transition-colors">
                    Celestia Diamond Stars
                  </Link>
                </li>
                <li>
                  <Link href="/bespoke" className="hover:text-[#C6AA78] transition-colors">
                    Bespoke Commissions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: The Maison */}
            <div>
              <h4 className="font-serif text-lg text-[#FDFBF7] mb-4 font-normal">The Maison</h4>
              <ul className="space-y-2.5 font-sans text-xs text-[#EFE9DA]/70">
                <li>
                  <Link href="/about" className="hover:text-[#C6AA78] transition-colors">
                    Our Story & Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/heritage" className="hover:text-[#C6AA78] transition-colors">
                    Heritage Chapters
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-[#C6AA78] transition-colors">
                    Events & Exhibitions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#C6AA78] transition-colors">
                    Hyderabad Showroom
                  </Link>
                </li>
                <li>
                  <button onClick={() => setAppointmentOpen(true)} className="hover:text-[#C6AA78] transition-colors text-left cursor-pointer">
                    Schedule Private Viewing
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Admin Portal Link */}
            <div>
              <h4 className="font-serif text-lg text-[#FDFBF7] mb-4 font-normal">Maison Services</h4>
              <ul className="space-y-2.5 font-sans text-xs text-[#EFE9DA]/70">
                <li>
                  <Link href="/concierge" className="hover:text-[#C6AA78] transition-colors">
                    AI Concierge Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="px-3 py-1.5 bg-[#B09262]/20 border border-[#B09262]/40 text-[#C6AA78] rounded-full inline-block hover:bg-[#B09262] hover:text-white transition-colors">
                    Vasundhara CMS Portal
                  </Link>
                </li>
                <li className="pt-2 text-[11px] text-[#EFE9DA]/50">
                  Secured with Supabase RBAC
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-[#B09262]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-[#EFE9DA]/50">
            <p>© {new Date().getFullYear()} Vasundhara Diamond Roof, Hyderabad. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <span>Privacy Protocol</span>
              <span>Terms of Curation</span>
              <span>Bespoke Authenticity Certificate</span>
            </div>
          </div>
        </div>
      </footer>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
