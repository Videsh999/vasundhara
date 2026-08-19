"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  FolderKanban,
  Gem,
  Calendar,
  UserCheck,
  Inbox,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Eye,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Private Appointments", value: "14", icon: UserCheck, change: "+24% this week", color: "text-[#8C734B]" },
    { label: "Showroom Inquiries", value: "38", icon: Inbox, change: "+12% this week", color: "text-[#8C734B]" },
    { label: "Active Collections", value: "5", icon: FolderKanban, change: "100% Published", color: "text-[#8C734B]" },
    { label: "AI Concierge Chats", value: "142", icon: Sparkles, change: "98% Satisfaction", color: "text-[#8C734B]" },
  ];

  const recentAppointments = [
    { name: "Princess Ananya Rao", category: "Bridal Jewellery", date: "Sep 15, 2026", status: "CONFIRMED" },
    { name: "Dr. Sunita Reddy", category: "Solitaire High Diamonds", date: "Sep 18, 2026", status: "PENDING" },
    { name: "Vikramaditya Verma", category: "Imperial Polki", date: "Sep 20, 2026", status: "CONFIRMED" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              Vasundhara Master CMS
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1C1A17] font-light">
              Executive Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-[#FDFBF7] border border-[#8C734B]/30 rounded-full font-sans text-xs uppercase tracking-widest text-[#1C1A17] hover:border-[#8C734B] transition-colors inline-flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#8C734B]" />
              <span>Preview Live Site</span>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/20 shadow-luxury flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-wider text-[#686256] font-medium">
                    {stat.label}
                  </span>
                  <div className="p-2.5 bg-[#F7F3E9] rounded-xl text-[#8C734B]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="font-serif text-4xl text-[#1C1A17] font-light">{stat.value}</span>
                  <p className="font-sans text-[11px] text-[#8C734B] mt-1 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Appointments & Content Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Private Appointments */}
          <div className="lg:col-span-7 bg-[#FDFBF7] p-6 md:p-8 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/15">
              <h3 className="font-serif text-2xl text-[#1C1A17]">Recent Appointment Requests</h3>
              <Link href="/admin/appointments" className="font-sans text-xs uppercase tracking-widest text-[#8C734B] hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {recentAppointments.map((app, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/15"
                >
                  <div>
                    <h4 className="font-serif text-lg text-[#1C1A17] font-medium">{app.name}</h4>
                    <p className="font-sans text-xs text-[#686256]">{app.category} • {app.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${
                      app.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick CMS Module Links */}
          <div className="lg:col-span-5 bg-[#FDFBF7] p-6 md:p-8 rounded-2xl border border-[#8C734B]/20 shadow-luxury space-y-6">
            <h3 className="font-serif text-2xl text-[#1C1A17] pb-4 border-b border-[#8C734B]/15">
              CMS Module Quick Actions
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/admin/collections"
                className="p-3.5 bg-[#F7F3E9] hover:bg-[#8C734B] hover:text-white rounded-xl border border-[#8C734B]/20 transition-colors flex items-center justify-between text-xs uppercase tracking-wider font-medium group"
              >
                <span>Manage Collections</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C734B] group-hover:text-white" />
              </Link>

              <Link
                href="/admin/jewellery"
                className="p-3.5 bg-[#F7F3E9] hover:bg-[#8C734B] hover:text-white rounded-xl border border-[#8C734B]/20 transition-colors flex items-center justify-between text-xs uppercase tracking-wider font-medium group"
              >
                <span>Manage Jewellery Items</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C734B] group-hover:text-white" />
              </Link>

              <Link
                href="/admin/homepage"
                className="p-3.5 bg-[#F7F3E9] hover:bg-[#8C734B] hover:text-white rounded-xl border border-[#8C734B]/20 transition-colors flex items-center justify-between text-xs uppercase tracking-wider font-medium group"
              >
                <span>Homepage Modular Editor</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C734B] group-hover:text-white" />
              </Link>

              <Link
                href="/admin/media"
                className="p-3.5 bg-[#F7F3E9] hover:bg-[#8C734B] hover:text-white rounded-xl border border-[#8C734B]/20 transition-colors flex items-center justify-between text-xs uppercase tracking-wider font-medium group"
              >
                <span>Supabase Media Vault</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C734B] group-hover:text-white" />
              </Link>
            </div>

            {/* Audit Activity Log Section */}
            <div className="pt-6 border-t border-[#8C734B]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C734B] font-semibold block">
                  RECENT AUDIT LOG
                </span>
                <Link href="/admin/logs" className="font-sans text-[10px] uppercase tracking-widest text-[#8C734B] hover:underline">
                  Full Log →
                </Link>
              </div>

              <div className="space-y-2 text-xs font-sans text-[#686256]">
                <div className="flex justify-between py-1.5 border-b border-[#8C734B]/10">
                  <span><strong>EDITOR</strong> • Published Collection</span>
                  <span className="text-[#8C734B]">2 hours ago</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#8C734B]/10">
                  <span><strong>ADMIN</strong> • Added New Jewellery Ref</span>
                  <span className="text-[#8C734B]">5 hours ago</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span><strong>OWNER</strong> • Configured AI Concierge</span>
                  <span className="text-[#8C734B]">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
