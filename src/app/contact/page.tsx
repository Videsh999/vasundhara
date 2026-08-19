"use client";

import React, { useState } from "react";
import { LuxuryHeader } from "@/components/luxury/LuxuryHeader";
import { LuxuryFooter } from "@/components/luxury/LuxuryFooter";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { FloatingExperienceControls } from "@/components/luxury/FloatingExperienceControls";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Showroom Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17]">
      <LuxuryHeader theme="light" />

      {/* Header Banner */}
      <section className="pt-36 pb-20 bg-[#F7F3E9] border-b border-[#8C734B]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium block">
            Jubilee Hills • Hyderabad
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1A17] font-light mt-2">
            The Flagship Salon
          </h1>
          <p className="font-sans text-xs text-[#686256] mt-4 max-w-xl mx-auto leading-relaxed">
            We welcome patrons to experience Vasundhara's high diamond collections in private consultation chambers.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Location & Hours */}
          <div className="lg:col-span-5 space-y-8 bg-[#F7F3E9] p-8 md:p-10 rounded-2xl border border-[#8C734B]/20 shadow-luxury">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
                Maison Address
              </span>
              <h3 className="font-serif text-2xl text-[#1C1A17] mt-1">Vasundhara Diamond Roof</h3>
              <p className="font-sans text-xs text-[#686256] mt-2 leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8C734B] shrink-0 mt-0.5" />
                Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033, India
              </p>
            </div>

            <div className="pt-4 border-t border-[#8C734B]/15 space-y-3 font-sans text-xs text-[#686256]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8C734B]" />
                <span>+91 40 2355 8888 / +91 98490 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8C734B]" />
                <span>concierge@vasundharadiamonds.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#8C734B]" />
                <span>Monday – Sunday: 11:00 AM – 8:00 PM</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#8C734B]/15">
              <span className="font-serif text-lg text-[#1C1A17] block mb-2">Valet & Security</span>
              <p className="font-sans text-xs text-[#686256] leading-relaxed">
                Private underground valet parking and high-security private viewing suites are provided for all patrons.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FDFBF7] p-8 md:p-10 rounded-2xl border border-[#8C734B]/20 shadow-luxury">
            {submitted ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#8C734B] mx-auto mb-4" />
                <h3 className="font-serif text-3xl text-[#1C1A17]">Inquiry Received</h3>
                <p className="font-sans text-xs text-[#686256] mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our senior curator will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
                    Send Direct Inquiry
                  </span>
                  <h3 className="font-serif text-3xl text-[#1C1A17] mt-1 font-light">Connect With Atelier</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                    Message / Curation Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your inquiry details..."
                    className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-colors shadow-lg"
                >
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <FloatingExperienceControls />
      <LuxuryFooter />
    </main>
  );
}
