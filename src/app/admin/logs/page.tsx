"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { History, ShieldCheck } from "lucide-react";

export default function AdminActivityLogsPage() {
  const [logs] = useState([
    { id: "l1", user: "owner@vasundharadiamonds.com", action: "Published Collection: The Nizam Bridal Heritage", entity: "collections", timestamp: "Aug 15, 2026 10:30 AM" },
    { id: "l2", user: "director@vasundharadiamonds.com", action: "Confirmed Appointment for Princess Ananya Rao", entity: "appointments", timestamp: "Aug 15, 2026 09:14 AM" },
    { id: "l3", user: "editor@vasundharadiamonds.com", action: "Updated Jewellery SKU: VDR-BD-001", entity: "jewellery", timestamp: "Aug 14, 2026 04:45 PM" },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#8C734B]/20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
            System Security Audit Trail
          </span>
          <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Activity Audit Logs</h1>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">Staff User</th>
                <th className="p-4">Action Performed</th>
                <th className="p-4">Module Entity</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-mono text-xs text-[#8C734B] font-medium">{log.user}</td>
                  <td className="p-4 font-sans text-xs text-[#1C1A17] font-medium">{log.action}</td>
                  <td className="p-4 font-mono text-[11px] text-[#686256]">{log.entity}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
