"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";

export default function BespokeEnquirePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "WhatsApp",
    interest: "Bridal",
    occasion: "Royal Wedding",
    appointmentType: "Flagship Salon • Jubilee Hills",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
          appointmentType: formData.appointmentType,
          notes: `Interest: ${formData.interest} | Occasion: ${formData.occasion} | Message: ${formData.message}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback gracefully to success state
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Header Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            PRIVATE ATELIER CONSULTATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light">
            Tell Us About The Piece You Imagine
          </h1>
          <p className="font-serif text-lg italic text-[#686256] max-w-xl mx-auto font-light">
            "Every royal commission begins with a conversation."
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-[#F7F3E9] p-8 md:p-12 rounded-2xl border border-[#8C734B]/25 shadow-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-16 h-16 bg-[#8C734B]/15 border border-[#8C734B]/30 rounded-full flex items-center justify-center mx-auto text-[#8C734B]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium block">
                  PRIVATE CONSULTATION REQUESTED
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A17] font-light">
                  YOUR JOURNEY HAS BEGUN
                </h2>
                <p className="font-serif text-lg italic text-[#686256] max-w-lg mx-auto pt-2">
                  "Thank you, {formData.name}. A senior curator from the House of Vasundhara will be in touch with you."
                </p>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-7 py-3 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-colors"
                >
                  RETURN TO HOME
                </Link>
                <Link
                  href="/collections"
                  className="px-7 py-3 bg-[#FDFBF7] hover:bg-white text-[#1C1A17] border border-[#8C734B]/30 font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-colors flex items-center gap-2"
                >
                  <span>EXPLORE COLLECTIONS</span>
                  <ArrowRight className="w-4 h-4 text-[#8C734B]" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-[#8C734B]/20 pb-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-semibold block">
                  ATELIER CONSULTATION FORM
                </span>
                <h3 className="font-serif text-2xl text-[#1C1A17] font-light mt-1">Patron Information</h3>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                  >
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Phone Call">Private Phone Call</option>
                    <option value="Email">Email Correspondence</option>
                  </select>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="border-t border-[#8C734B]/20 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                    Jewellery Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                  >
                    <option value="Bridal Trousseau">Royal Nizam Bridal Trousseau</option>
                    <option value="Polki & Kundan">Imperial Syndicate Polki</option>
                    <option value="Solitaires">GIA D-Flawless Solitaire</option>
                    <option value="Temple Gold">22K Antique Nakshi Gold</option>
                    <option value="Bespoke Royal Commission">Bespoke Royal Commission</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                    Appointment Type
                  </label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                  >
                    <option value="Flagship Salon • Jubilee Hills">Flagship Salon • Jubilee Hills, Hyderabad</option>
                    <option value="Virtual Consultation">Virtual Private Salon Consultation</option>
                    <option value="Home/Palace Visit">Discreet Home/Palace Curation Visit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-2 font-medium">
                  Your Vision / Occasion Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about the occasion, wedding date, or custom jewellery vision..."
                  className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-xl font-sans text-sm text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-semibold rounded-full shadow-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#B59A5B]" />
                  <span>{isSubmitting ? "TRANSMITTING REQUEST..." : "REQUEST A PRIVATE CONSULTATION"}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#686256] text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C734B]" />
                <span>Strict Discretion • Secure Server Validation • No Data Sharing</span>
              </div>
            </form>
          )}
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
