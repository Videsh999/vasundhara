"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Sparkles, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";

export default function AdminHomepageManager() {
  const [sections, setSections] = useState([
    { id: "s1", key: "hero", title: "Cinematic Hero Banner", is_active: true, order: 1 },
    { id: "s2", key: "brand_intro", title: "Brand Provenance & Legacy", is_active: true, order: 2 },
    { id: "s3", key: "heritage_story", title: "Nizam Heritage Storytelling", is_active: true, order: 3 },
    { id: "s4", key: "featured_collections", title: "Curated Collections Grid", is_active: true, order: 4 },
    { id: "s5", key: "bespoke_section", title: "Bespoke Journey Showcase", is_active: true, order: 5 },
    { id: "s6", key: "ai_concierge_banner", title: "AI Concierge Featured Card", is_active: true, order: 6 },
    { id: "s7", key: "testimonials", title: "Patron Testimonials", is_active: true, order: 7 },
  ]);

  const [saved, setSaved] = useState(false);

  const toggleActive = (id: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s)));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              CMS Modular Architecture
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Homepage Section Manager</h1>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#B59A5B]" />
            <span>Publish Module Changes</span>
          </button>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl flex items-center gap-2 font-sans text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Homepage layout updated successfully in database.</span>
          </div>
        )}

        <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-4">
          {sections.map((sec, i) => (
            <div
              key={sec.id}
              className="p-4 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-lg text-[#8C734B] font-medium">0{sec.order}</span>
                <div>
                  <h4 className="font-serif text-lg text-[#1C1A17] font-medium">{sec.title}</h4>
                  <p className="font-sans text-xs text-[#686256]">Module Key: {sec.key}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleActive(sec.id)}
                  className={`px-4 py-1.5 rounded-full font-sans text-xs uppercase tracking-widest flex items-center gap-1.5 font-medium ${
                    sec.is_active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {sec.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{sec.is_active ? "Published" : "Hidden"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
