"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Gem,
  Calendar,
  Sparkles,
  MessageSquareQuote,
  Image,
  Inbox,
  UserCheck,
  Music,
  Globe,
  Settings,
  Users,
  History,
  LogOut,
  Menu,
  X,
  BookOpen,
  Crown,
} from "lucide-react";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";

const navGroups = [
  {
    group: "DASHBOARD",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    group: "CONTENT",
    items: [
      { label: "Homepage Modules", href: "/admin/homepage", icon: Sparkles },
      { label: "Collections", href: "/admin/collections", icon: FolderKanban },
      { label: "Jewellery Catalog", href: "/admin/jewellery", icon: Gem },
      { label: "Events & Exhibitions", href: "/admin/events", icon: Calendar },
      { label: "Heritage Story", href: "/admin/heritage", icon: BookOpen },
      { label: "Bespoke Journey", href: "/admin/bespoke", icon: Crown },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    group: "EXPERIENCE",
    items: [
      { label: "Media Library", href: "/admin/media", icon: Image },
      { label: "AI Concierge Logs", href: "/admin/concierge", icon: Sparkles },
      { label: "Ambient Audio", href: "/admin/audio", icon: Music },
    ],
  },
  {
    group: "CUSTOMER",
    items: [
      { label: "Enquiries Inbox", href: "/admin/enquiries", icon: Inbox },
      { label: "Private Appointments", href: "/admin/appointments", icon: UserCheck },
    ],
  },
  {
    group: "SYSTEM",
    items: [
      { label: "SEO Metadata", href: "/admin/seo", icon: Globe },
      { label: "Users & Roles", href: "/admin/users", icon: Users },
      { label: "Site Settings", href: "/admin/settings", icon: Settings },
      { label: "Activity Logs", href: "/admin/logs", icon: History },
    ],
  },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("vdr_admin_auth");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#1C1A17] flex flex-col md:flex-row font-sans select-none">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1C1A17] text-[#FDFBF7] p-6 border-r border-[#8C734B]/30 shrink-0">
        <div className="pb-6 border-b border-[#EFE9DA]/10 flex items-center justify-between">
          <VasundharaLogo variant="full" theme="dark" heightClass="h-12" href="/admin/dashboard" />
          <Link href="/" title="View Public Website" className="text-xs text-[#B59A5B] hover:underline">
            Site ↗
          </Link>
        </div>

        <nav className="flex-1 py-6 space-y-6 overflow-y-auto scrollbar-thin">
          {navGroups.map((g) => (
            <div key={g.group} className="space-y-1.5">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#B59A5B] font-semibold block px-3">
                {g.group}
              </span>
              {g.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-sans text-xs uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-[#8C734B] text-[#FDFBF7] font-medium shadow-sm"
                        : "text-[#EFE9DA]/70 hover:bg-[#FDFBF7]/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#B59A5B]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="pt-4 border-t border-[#EFE9DA]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#8C734B] flex items-center justify-center text-[10px] text-white font-bold">
              OWN
            </div>
            <div className="text-[10px]">
              <p className="text-white font-medium">Administrator</p>
              <p className="text-[#B59A5B]">OWNER Role</p>
            </div>
          </div>
          <button onClick={handleLogout} title="Sign Out" className="p-1.5 text-[#EFE9DA]/60 hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-[#1C1A17] text-[#FDFBF7] p-4 flex items-center justify-between border-b border-[#8C734B]/30">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg text-[#FDFBF7]">Vasundhara Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1C1A17] text-[#FDFBF7] p-6 space-y-6 border-b border-[#8C734B]/30">
          {navGroups.map((g) => (
            <div key={g.group} className="space-y-2">
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#B59A5B] font-semibold block">
                {g.group}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {g.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 bg-[#FDFBF7]/10 rounded-lg text-xs font-sans uppercase tracking-wider text-[#EFE9DA]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleLogout} className="w-full py-2.5 bg-red-900/40 text-red-200 text-xs uppercase tracking-widest rounded-lg">
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
