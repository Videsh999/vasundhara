"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserCheck, Calendar, Phone, Mail, CheckCircle2 } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([
    { id: "app-1", name: "Princess Ananya Rao", phone: "+91 98490 11111", email: "ananya@rao.com", category: "Bridal Jewellery", date: "2026-09-15", time: "11:00 AM", status: "CONFIRMED" },
    { id: "app-2", name: "Dr. Sunita Reddy", phone: "+91 98765 22222", email: "sunita@reddy.com", category: "Solitaire High Diamonds", date: "2026-09-18", time: "02:00 PM", status: "PENDING" },
    { id: "app-3", name: "Vikramaditya Verma", phone: "+91 91234 33333", email: "vikram@verma.com", category: "Imperial Polki", date: "2026-09-20", time: "04:30 PM", status: "CONFIRMED" },
  ]);

  const toggleStatus = (id: string) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: a.status === "CONFIRMED" ? "PENDING" : "CONFIRMED" } : a
      )
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              Showroom Consultation Pipeline
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Private Appointments</h1>
          </div>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">Patron Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-serif text-base text-[#1C1A17] font-medium">{a.name}</td>
                  <td className="p-4 text-[#686256]">
                    <div>{a.phone}</div>
                    <div className="text-[10px] text-[#8C734B]">{a.email}</div>
                  </td>
                  <td className="p-4 font-sans text-xs text-[#8C734B] font-medium">{a.category}</td>
                  <td className="p-4 text-[#686256]">{a.date} @ {a.time}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${
                        a.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleStatus(a.id)}
                      className="px-3 py-1 bg-[#1C1A17] text-[#FDFBF7] text-[10px] uppercase tracking-widest rounded-full hover:bg-[#8C734B]"
                    >
                      Toggle Confirm
                    </button>
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
