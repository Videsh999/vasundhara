"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_TESTIMONIALS } from "@/lib/supabase/mock-data";
import { Plus, MessageSquareQuote } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              CMS Patron Reviews
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Client Testimonials</h1>
          </div>

          <button className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#B59A5B]" />
            <span>Add Patron Story</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-3">
              <span className="font-sans text-[10px] text-[#8C734B] uppercase tracking-widest font-medium">
                {t.occasion} • {t.location}
              </span>
              <p className="font-serif text-lg text-[#1C1A17] italic leading-relaxed">"{t.quote}"</p>
              <div className="pt-2 border-t border-[#8C734B]/15 flex items-center justify-between">
                <h4 className="font-serif text-base text-[#1C1A17] font-medium">{t.customerName}</h4>
                <span className="font-sans text-[10px] text-[#686256]">{t.collectionName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
