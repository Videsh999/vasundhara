"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_EVENTS, EventItem } from "@/lib/supabase/mock-data";
import { Plus, Edit, Calendar } from "lucide-react";

export default function AdminEventsPage() {
  const [eventsList, setEventsList] = useState<EventItem[]>(MOCK_EVENTS);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              CMS Events & Exhibitions
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Events Publisher</h1>
          </div>

          <button className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#B59A5B]" />
            <span>Create New Event</span>
          </button>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">Event Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {eventsList.map((e) => (
                <tr key={e.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-serif text-base text-[#1C1A17] font-medium">{e.title}</td>
                  <td className="p-4 font-sans text-xs text-[#8C734B] font-medium">{e.eventType}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{e.location}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{e.dateStart}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] uppercase tracking-widest font-medium">
                      Published
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
