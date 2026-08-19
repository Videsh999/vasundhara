"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Sparkles, MessageSquare, Bot } from "lucide-react";

export default function AdminConciergePage() {
  const [logs] = useState([
    { id: "c1", user: "Visitor #1042", topic: "Bridal Jewellery Inquiry", msgs: 4, date: "Aug 15, 2026 10:45 AM" },
    { id: "c2", user: "Visitor #1039", topic: "Bespoke Emerald Commission", msgs: 6, date: "Aug 15, 2026 09:20 AM" },
    { id: "c3", user: "Visitor #1031", topic: "Showroom Location & Valet", msgs: 2, date: "Aug 14, 2026 06:15 PM" },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#8C734B]/20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
            AI Assistant Knowledge & Logs
          </span>
          <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Vasundhara Concierge Monitor</h1>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">Session Token</th>
                <th className="p-4">Topic / Intent</th>
                <th className="p-4">Message Count</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-mono text-xs text-[#8C734B] font-medium">{l.user}</td>
                  <td className="p-4 font-serif text-base text-[#1C1A17] font-medium">{l.topic}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{l.msgs} Messages</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
