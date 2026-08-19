"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Settings, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    brandName: "Vasundhara Diamond Roof",
    location: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 40 2355 8888",
    email: "concierge@vasundharadiamonds.com",
    instagram: "https://instagram.com/vasundharadiamonds",
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
              System Configuration
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Site Settings</h1>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#B59A5B]" />
            <span>Save Settings</span>
          </button>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl flex items-center gap-2 font-sans text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Site parameters updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                Brand Name
              </label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                Contact Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Hyderabad Showroom Address
            </label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
