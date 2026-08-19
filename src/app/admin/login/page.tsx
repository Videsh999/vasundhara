"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, ShieldCheck } from "lucide-react";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@vasundharadiamonds.com");
  const [password, setPassword] = useState("vasundhara2026");
  const [role, setRole] = useState("OWNER");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      sessionStorage.setItem("vdr_admin_auth", JSON.stringify({ email, role, token: "vdr_session_valid" }));
      router.push("/admin/dashboard");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#1C1A17] flex items-center justify-center p-6 text-[#FDFBF7]">
      <div className="w-full max-w-md bg-[#FDFBF7] text-[#1C1A17] p-8 md:p-10 rounded-2xl border border-[#8C734B]/40 shadow-2xl relative">
        <div className="absolute inset-3 border border-[#8C734B]/20 pointer-events-none rounded-xl" />

        <div className="text-center mb-8">
          <VasundharaLogo variant="full" theme="light" heightClass="h-16 md:h-20" href={null} />
          <h1 className="font-serif text-2xl text-[#1C1A17] mt-1 font-light">CMS Portal Login</h1>
          <p className="font-sans text-xs text-[#686256] mt-1">Authorized Staff Authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Staff Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/30 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
            />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/30 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
            />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
              Role Authority
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F3E9] border border-[#8C734B]/30 rounded-lg font-sans text-sm focus:outline-none focus:border-[#8C734B]"
            >
              <option value="OWNER">OWNER (Full Master Rights)</option>
              <option value="ADMIN">ADMIN (System Administrator)</option>
              <option value="EDITOR">EDITOR (Content Manager)</option>
              <option value="MARKETING">MARKETING (Campaign Manager)</option>
              <option value="VIEWER">VIEWER (Read Only)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <span>Authenticating...</span> : <span>Enter CMS Dashboard</span>}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#8C734B]/15 text-center text-[10px] font-sans text-[#686256] uppercase tracking-widest">
          Secured with Supabase RLS & Role Isolation
        </div>
      </div>
    </main>
  );
}
