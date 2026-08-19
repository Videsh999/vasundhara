"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Music, Play, CheckCircle2 } from "lucide-react";

export default function AdminAudioPage() {
  const [tracks] = useState([
    { id: "a1", title: "Vasundhara Heritage Symphony", composer: "Ambient Sitar & Cello", is_active: true },
    { id: "a2", title: "Taj Falaknuma Court Raga", composer: "Classical Indian Flute", is_active: false },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#8C734B]/20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
            Ambient Luxury Audio System
          </span>
          <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Audio Track Manager</h1>
        </div>

        <div className="space-y-4">
          {tracks.map((t) => (
            <div key={t.id} className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-luxury flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#EFE9DA] rounded-full text-[#8C734B]">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#1C1A17] font-medium">{t.title}</h4>
                  <p className="font-sans text-xs text-[#686256]">{t.composer}</p>
                </div>
              </div>

              <span className={`px-4 py-1.5 rounded-full font-sans text-xs uppercase tracking-widest font-medium ${t.is_active ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"}`}>
                {t.is_active ? "Active Stream" : "Standby"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
