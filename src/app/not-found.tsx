"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1C1A17] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-[#F7F3E9] p-10 rounded-2xl border border-[#8C734B]/20 shadow-2xl space-y-6">
        <VasundharaLogo variant="full" theme="light" heightClass="h-20 md:h-24" href="/" className="mx-auto" />

        <div className="space-y-2 pt-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8C734B] font-semibold block">
            404 • PAGE UNCHARTED
          </span>
          <h1 className="font-serif text-3xl text-[#1C1A17] font-light">
            A Tale Yet Unwritten
          </h1>
          <p className="font-sans text-xs text-[#686256] leading-relaxed">
            The page or heirloom reference you requested cannot be located. We invite you to return to our collections.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-[#8C734B] hover:bg-[#1C1A17] text-white font-sans text-xs uppercase tracking-[0.25em] font-medium rounded-full transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>RETURN TO HOUSE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/collections"
            className="px-6 py-3 bg-transparent hover:bg-[#8C734B]/10 text-[#8C734B] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-colors"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      </div>
    </main>
  );
}
