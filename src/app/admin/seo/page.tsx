"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Globe, Save, CheckCircle2 } from "lucide-react";

export default function AdminSEOPage() {
  const [seo, setSeo] = useState({
    title: "Vasundhara Diamond Roof | Luxury Heritage Indian Jewellery",
    description: "Experience royal Indian craftsmanship, bespoke bridal diamond jewellery, polki, and high-fine gold heirlooms from Vasundhara Diamond Roof, Hyderabad.",
    keywords: "Vasundhara Diamonds, Hyderabad Jewellery, Nizam Polki, Solitaires India",
    ogImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              Global Meta & OpenGraph
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">SEO Settings</h1>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#B59A5B]" />
            <span>Save SEO Config</span>
          </button>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl flex items-center gap-2 font-sans text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Global SEO metadata saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-4">
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Default Site Title
            </label>
            <input
              type="text"
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
            />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
            />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Target Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
