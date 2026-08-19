"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";

const INTEREST_OPTIONS = [
  "Bridal",
  "Diamonds",
  "Gold",
  "High Jewellery",
  "Bespoke",
];

const TIME_SLOTS = [
  "11:00 AM – 01:00 PM",
  "02:00 PM – 04:00 PM",
  "04:00 PM – 06:00 PM",
  "06:00 PM – 08:00 PM",
];

export default function PrivateViewingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: TIME_SLOTS[0],
    location: "Hyderabad Flagship (Jubilee Hills)",
    interest: "Bridal",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate luxury appointment confirmation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#24211D] select-none">
      <LuxuryHeader theme="light" />

      {/* 1. EDITORIAL HERO */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-24 bg-[#F7F3EA] border-b border-[#B09262]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#B09262] font-semibold block"
          >
            EXCLUSIVE ATELIER CURATION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#24211D] font-light tracking-tight"
          >
            Private Viewing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-base sm:text-xl italic text-[#6E685F] font-light max-w-xl mx-auto"
          >
            "Experience Vasundhara at your own pace in an intimate salon curated exclusively for you."
          </motion.p>
        </div>
      </section>

      {/* 2. FORM & SALON DETAILS SPLIT */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Flagship Salon Lore */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B09262] font-semibold block">
                FLAGSHIP SALON
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24211D] font-light">
                Jubilee Hills, Hyderabad
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#6E685F] leading-relaxed">
                Our flagship salon offers high-security private chambers where you can explore rare diamond collections, uncut polki heirlooms, and bespoke design archives accompanied by our senior curators.
              </p>
            </div>

            {/* Salon Feature Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F3EA] border border-[#B09262]/20">
                <div className="p-2 bg-[#FDFBF7] rounded-full border border-[#B09262]/30 text-[#B09262] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#24211D] font-medium">Private Viewing Chambers</h4>
                  <p className="font-sans text-xs text-[#6E685F] mt-0.5">
                    Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F3EA] border border-[#B09262]/20">
                <div className="p-2 bg-[#FDFBF7] rounded-full border border-[#B09262]/30 text-[#B09262] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#24211D] font-medium">Salon Hours</h4>
                  <p className="font-sans text-xs text-[#6E685F] mt-0.5">
                    Monday to Saturday • 11:00 AM to 08:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F3EA] border border-[#B09262]/20">
                <div className="p-2 bg-[#FDFBF7] rounded-full border border-[#B09262]/30 text-[#B09262] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#24211D] font-medium">Concierge Assistance</h4>
                  <p className="font-sans text-xs text-[#6E685F] mt-0.5">
                    +91 40 2355 8888 • concierge@vasundharadiamonds.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F7F3EA] rounded-2xl border border-[#B09262]/25 shadow-xl p-8 sm:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#B09262]/20 border border-[#B09262] text-[#B09262] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-[#24211D] font-light">
                      Appointment Requested
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#6E685F] max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-[#24211D]">{formData.name}</span>. Our private salon concierge will contact you within 24 hours to confirm your private viewing.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest text-[#B09262] border border-[#B09262]/40 hover:bg-[#B09262] hover:text-[#FDFBF7] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl text-[#24211D] font-light">
                      Reserve Your Consultation
                    </h3>
                    <p className="font-sans text-xs text-[#6E685F]">
                      Please provide your preferred details for private salon attendance.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Radhika Sharma"
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#B09262]/30 rounded-lg font-sans text-xs text-[#24211D] placeholder-[#6E685F]/50 focus:outline-none focus:border-[#B09262]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98490 12345"
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#B09262]/30 rounded-lg font-sans text-xs text-[#24211D] placeholder-[#6E685F]/50 focus:outline-none focus:border-[#B09262]"
                      />
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#B09262]/30 rounded-lg font-sans text-xs text-[#24211D] placeholder-[#6E685F]/50 focus:outline-none focus:border-[#B09262]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                        Location
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#B09262]/30 rounded-lg font-sans text-xs text-[#24211D] focus:outline-none focus:border-[#B09262]"
                      >
                        <option>Hyderabad Flagship (Jubilee Hills)</option>
                        <option>Virtual High-Definition Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#B09262]/30 rounded-lg font-sans text-xs text-[#24211D] focus:outline-none focus:border-[#B09262]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                        Preferred Time *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FDFBF7] border border-[#B09262]/30 rounded-lg font-sans text-xs text-[#24211D] focus:outline-none focus:border-[#B09262]"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Primary Interest Options */}
                  <div className="space-y-2 pt-1">
                    <label className="font-sans text-[11px] uppercase tracking-widest text-[#24211D] font-medium block">
                      Primary Interest *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, interest: opt })}
                          className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all cursor-pointer ${
                            formData.interest === opt
                              ? "bg-[#B09262] text-[#FDFBF7] font-semibold shadow-sm"
                              : "bg-[#FDFBF7] text-[#6E685F] border border-[#B09262]/30 hover:border-[#B09262]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-[#24211D] hover:bg-[#B09262] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-semibold rounded-full shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      {loading ? "PROCESSING REQUEST..." : "REQUEST PRIVATE VIEWING"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
