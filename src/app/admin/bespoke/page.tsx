"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_BESPOKE_STAGES, BespokeStage } from "@/lib/supabase/mock-data";
import { Crown, Save, Check } from "lucide-react";

export default function AdminBespokePage() {
  const [stages, setStages] = useState<BespokeStage[]>(MOCK_BESPOKE_STAGES);
  const [saved, setSaved] = useState(false);

  const handleUpdate = (stepNumber: string, field: keyof BespokeStage, value: unknown) => {
    setStages((prev) =>
      prev.map((s) => (s.stepNumber === stepNumber ? { ...s, [field]: value } : s))
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
              Bespoke Atelier Process CMS
            </h1>
          </div>

          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-[#8C734B] hover:bg-[#1C1A17] text-white font-sans text-xs uppercase tracking-widest font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "STAGES SAVED" : "SAVE BESPOKE STAGES"}</span>
          </button>
        </div>

        <div className="space-y-6">
          {stages.map((stg) => (
            <div key={stg.stepNumber} className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#8C734B]/15">
                <span className="font-sans text-xs uppercase tracking-widest text-[#8C734B] font-semibold">
                  STAGE {stg.stepNumber} • {stg.title}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  PUBLISHED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1C1A17] mb-1 font-medium">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={stg.subtitle}
                    onChange={(e) => handleUpdate(stg.stepNumber, "subtitle", e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1C1A17] mb-1 font-medium">
                    Atelier Details Badge
                  </label>
                  <input
                    type="text"
                    value={stg.details}
                    onChange={(e) => handleUpdate(stg.stepNumber, "details", e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1C1A17] mb-1 font-medium">
                  Process Description
                </label>
                <textarea
                  rows={2}
                  value={stg.description}
                  onChange={(e) => handleUpdate(stg.stepNumber, "description", e.target.value)}
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
