"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_HERITAGE_CHAPTERS, HeritageChapter } from "@/lib/supabase/mock-data";
import { Edit, BookOpen, Save, Check } from "lucide-react";

export default function AdminHeritagePage() {
  const [chapters, setChapters] = useState<HeritageChapter[]>(MOCK_HERITAGE_CHAPTERS);
  const [saved, setSaved] = useState(false);

  const handleUpdate = (id: string, field: keyof HeritageChapter, value: unknown) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              Content Management System
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1C1A17] font-light">
              Heritage Story & Craftsmanship CMS
            </h1>
          </div>

          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-[#8C734B] hover:bg-[#1C1A17] text-white font-sans text-xs uppercase tracking-widest font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "CHANGES SAVED" : "SAVE HERITAGE CHANGES"}</span>
          </button>
        </div>

        <div className="space-y-6">
          {chapters.map((chap) => (
            <div key={chap.id} className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#8C734B]/15">
                <span className="font-sans text-xs uppercase tracking-widest text-[#8C734B] font-semibold">
                  CHAPTER {chap.chapterNumber} • {chap.title}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  PUBLISHED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1C1A17] mb-1 font-medium">
                    Eyebrow
                  </label>
                  <input
                    type="text"
                    value={chap.eyebrow}
                    onChange={(e) => handleUpdate(chap.id, "eyebrow", e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1C1A17] mb-1 font-medium">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={chap.headline}
                    onChange={(e) => handleUpdate(chap.id, "headline", e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1C1A17] mb-1 font-medium">
                  Chapter Story Paragraphs
                </label>
                <textarea
                  rows={3}
                  value={chap.content.join("\n\n")}
                  onChange={(e) => handleUpdate(chap.id, "content", e.target.value.split("\n\n"))}
                  className="w-full px-3 py-2 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
