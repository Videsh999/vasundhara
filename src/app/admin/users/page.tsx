"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Users, Plus, ShieldCheck } from "lucide-react";

export default function AdminUsersPage() {
  const [users] = useState([
    { id: "u1", name: "Vasundhara Master Owner", email: "owner@vasundharadiamonds.com", role: "OWNER" },
    { id: "u2", name: "Hyderabad Salon Director", email: "director@vasundharadiamonds.com", role: "ADMIN" },
    { id: "u3", name: "Senior Content Curator", email: "editor@vasundharadiamonds.com", role: "EDITOR" },
    { id: "u4", name: "PR & Event Manager", email: "events@vasundharadiamonds.com", role: "MARKETING" },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              Supabase RBAC Isolation
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Staff & Role Access Control</h1>
          </div>

          <button className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#B59A5B]" />
            <span>Invite Staff Member</span>
          </button>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-serif text-base text-[#1C1A17] font-medium">{u.name}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{u.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-[#8C734B]/20 text-[#8C734B] rounded-full text-[10px] uppercase tracking-widest font-bold">
                      {u.role}
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
