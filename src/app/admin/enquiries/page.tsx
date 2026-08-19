"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Inbox, Mail, Phone } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries] = useState([
    { id: "e1", name: "Rajesh K.", email: "rajesh@domain.com", phone: "+91 99887 76655", message: "Inquiring about 5 ct solitaire diamond ring pricing and GIA certification.", date: "Aug 14, 2026" },
    { id: "e2", name: "Kavita S.", email: "kavita@domain.com", phone: "+91 91234 56789", message: "Would like to know availability of Nizam Emerald Choker for November wedding.", date: "Aug 12, 2026" },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#8C734B]/20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
            Inquiries Inbox
          </span>
          <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Showroom Inquiries</h1>
        </div>

        <div className="space-y-4">
          {enquiries.map((eq) => (
            <div key={eq.id} className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl text-[#1C1A17] font-medium">{eq.name}</h4>
                <span className="font-sans text-[10px] text-[#8C734B] uppercase tracking-widest">{eq.date}</span>
              </div>
              <div className="flex items-center gap-4 font-sans text-xs text-[#686256]">
                <span>{eq.email}</span>
                <span>{eq.phone}</span>
              </div>
              <p className="font-sans text-xs text-[#1C1A17] pt-2 border-t border-[#8C734B]/15 leading-relaxed">
                "{eq.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
