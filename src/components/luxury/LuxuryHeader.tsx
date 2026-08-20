"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";
import { SHOP_BY_JEWELLERY, EXPLORE_COLLECTIONS, SIGNATURE_COLLECTIONS } from "@/lib/navigation/collections-menu";

interface LuxuryHeaderProps {
  theme?: "auto" | "light" | "dark";
  isVisible?: boolean;
}

export function LuxuryHeader({ theme = "auto", isVisible = true }: LuxuryHeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const collectionsDropdownRef = useRef<HTMLDivElement | null>(null);
  const collectionsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomepage = pathname === "/";
  const isLightMode =
    theme === "light" ||
    (!isHomepage && theme !== "dark") ||
    isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change or Escape
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCollectionsOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        collectionsDropdownRef.current &&
        !collectionsDropdownRef.current.contains(e.target as Node) &&
        collectionsTriggerRef.current &&
        !collectionsTriggerRef.current.contains(e.target as Node)
      ) {
        setCollectionsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setCollectionsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setCollectionsOpen(false);
    }, 180);
  };

  return (
    <>
      <header
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none -translate-y-2"
        } ${
          isLightMode
            ? "bg-[#F7F3EA]/95 backdrop-blur-md py-4 border-b border-[#B09262]/20 shadow-sm text-[#24211D]"
            : "bg-gradient-to-b from-[#1C1A17]/85 via-[#1C1A17]/35 to-transparent py-5 text-[#FDFBF7]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          
          {/* LEFT: Vasundhara Official Brand Logo (Replays intro on click) */}
          <VasundharaLogo
            variant="full"
            theme={isLightMode ? "light" : "dark"}
            heightClass="h-10 md:h-12"
            href="/?intro=true"
          />

          {/* CENTER: Direct Navigation Links + Refined Collections Trigger */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-11">
            
            {/* 0. HOME */}
            <Link
              href="/"
              className={`relative font-sans text-[11px] xl:text-xs uppercase tracking-[0.24em] font-medium transition-colors py-1 ${
                pathname === "/"
                  ? "text-[#B09262]"
                  : isLightMode
                  ? "text-[#24211D]/90 hover:text-[#B09262]"
                  : "text-[#FDFBF7]/90 hover:text-white"
              }`}
            >
              <span>HOME</span>
              {pathname === "/" && (
                <motion.div
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B09262]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* 1. COLLECTIONS Dropdown Item */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={collectionsTriggerRef}
                onClick={() => setCollectionsOpen((prev) => !prev)}
                aria-expanded={collectionsOpen}
                aria-haspopup="true"
                className={`group relative flex items-center gap-1.5 font-sans text-[11px] xl:text-xs uppercase tracking-[0.24em] font-medium transition-colors py-1 cursor-pointer ${
                  pathname.startsWith("/collections") || collectionsOpen
                    ? "text-[#B09262]"
                    : isLightMode
                    ? "text-[#24211D]/90 hover:text-[#B09262]"
                    : "text-[#FDFBF7]/90 hover:text-white"
                }`}
              >
                <span>COLLECTIONS</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    collectionsOpen ? "rotate-180 text-[#B09262]" : "text-[#B09262]/70 group-hover:text-[#B09262]"
                  }`}
                />
                {pathname.startsWith("/collections") && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B09262]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>

              {/* Refined Lightweight Dropdown Panel (Zero Fullscreen Intrusion) */}
              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    ref={collectionsDropdownRef}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-[#F7F3EA] text-[#24211D] border border-[#B09262]/25 shadow-2xl rounded-xl p-6 z-50 backdrop-blur-lg select-none"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      
                      {/* Column 1: By Jewellery Type */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#B09262]/20">
                          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#B09262] font-semibold">
                            BY JEWELLERY
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {SHOP_BY_JEWELLERY.slice(0, 6).map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.slug}
                                onClick={() => setCollectionsOpen(false)}
                                className="group flex items-center justify-between text-xs text-[#4A453E] hover:text-[#B09262] transition-colors py-0.5"
                              >
                                <span className="font-serif text-sm group-hover:translate-x-0.5 transition-transform">
                                  {item.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: Craft & Heritage Categories */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#B09262]/20">
                          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#B09262] font-semibold">
                            CRAFT & TRADITIONS
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {EXPLORE_COLLECTIONS.slice(0, 6).map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.slug}
                                onClick={() => setCollectionsOpen(false)}
                                className="group flex items-center justify-between text-xs text-[#4A453E] hover:text-[#B09262] transition-colors py-0.5"
                              >
                                <span className="font-serif text-sm group-hover:translate-x-0.5 transition-transform">
                                  {item.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: Atelier Curations */}
                      <div className="space-y-3 bg-[#EFE9DA]/60 p-4 rounded-lg border border-[#B09262]/20">
                        <div className="flex items-center gap-1.5 pb-1 text-[#B09262]">
                          <Sparkles className="w-3 h-3" />
                          <span className="font-sans text-[9px] uppercase tracking-[0.25em] font-semibold">
                            ATELIER CURATION
                          </span>
                        </div>
                        <p className="font-serif text-base text-[#24211D] leading-snug">
                          Bespoke High Jewellery
                        </p>
                        <p className="font-sans text-[11px] text-[#6E685F] leading-relaxed">
                          Handcrafted heirlooms shaped in our Jubilee Hills ateliers.
                        </p>
                        <div className="pt-2">
                          <Link
                            href="/collections"
                            onClick={() => setCollectionsOpen(false)}
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#B09262] font-semibold hover:text-[#24211D] transition-colors"
                          >
                            <span>VIEW FULL CATALOGUE</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. HERITAGE */}
            <Link
              href="/heritage"
              className={`relative font-sans text-[11px] xl:text-xs uppercase tracking-[0.24em] font-medium transition-colors py-1 ${
                pathname === "/heritage"
                  ? "text-[#B09262]"
                  : isLightMode
                  ? "text-[#24211D]/90 hover:text-[#B09262]"
                  : "text-[#FDFBF7]/90 hover:text-white"
              }`}
            >
              <span>HERITAGE</span>
              {pathname === "/heritage" && (
                <motion.div
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B09262]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* 3. EXPERIENCES */}
            <Link
              href="/experiences"
              className={`relative font-sans text-[11px] xl:text-xs uppercase tracking-[0.24em] font-medium transition-colors py-1 ${
                pathname === "/experiences"
                  ? "text-[#B09262]"
                  : isLightMode
                  ? "text-[#24211D]/90 hover:text-[#B09262]"
                  : "text-[#FDFBF7]/90 hover:text-white"
              }`}
            >
              <span>EXPERIENCES</span>
              {pathname === "/experiences" && (
                <motion.div
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B09262]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            {/* 4. BESPOKE */}
            <Link
              href="/bespoke"
              className={`relative font-sans text-[11px] xl:text-xs uppercase tracking-[0.24em] font-medium transition-colors py-1 ${
                pathname === "/bespoke"
                  ? "text-[#B09262]"
                  : isLightMode
                  ? "text-[#24211D]/90 hover:text-[#B09262]"
                  : "text-[#FDFBF7]/90 hover:text-white"
              }`}
            >
              <span>BESPOKE</span>
              {pathname === "/bespoke" && (
                <motion.div
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B09262]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </nav>

          {/* RIGHT: Primary Direct CTA - PRIVATE VIEWING */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link
              href="/private-viewing"
              className={`px-6 py-2.5 rounded-full font-sans text-[10px] xl:text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 border shadow-sm ${
                pathname === "/private-viewing"
                  ? "bg-[#B09262] text-[#FDFBF7] border-[#B09262]"
                  : isLightMode
                  ? "bg-[#24211D] text-[#FDFBF7] border-[#24211D] hover:bg-[#B09262] hover:border-[#B09262]"
                  : "bg-[#FDFBF7]/90 text-[#24211D] border-[#FDFBF7] hover:bg-white hover:shadow-lg"
              }`}
            >
              PRIVATE VIEWING
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/private-viewing"
              className="px-3.5 py-1.5 rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold bg-[#B09262] text-[#FDFBF7]"
            >
              Viewing
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors ${
                isLightMode ? "text-[#24211D]" : "text-[#FDFBF7]"
              }`}
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-current" />}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN LUXURY MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#F7F3EA] text-[#24211D] flex flex-col justify-between p-8 pt-24 overflow-y-auto lg:hidden select-none"
          >
            <div className="flex flex-col gap-6 pt-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl uppercase tracking-wider transition-colors py-2 border-b border-[#B09262]/20 flex items-center justify-between ${
                  pathname === "/" ? "text-[#B09262]" : "text-[#24211D]"
                }`}
              >
                <span>HOME</span>
                {pathname === "/" && <span className="text-xs font-sans text-[#B09262] tracking-widest">CURRENT</span>}
              </Link>

              <Link
                href="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl uppercase tracking-wider transition-colors py-2 border-b border-[#B09262]/20 flex items-center justify-between ${
                  pathname.startsWith("/collections") ? "text-[#B09262]" : "text-[#24211D]"
                }`}
              >
                <span>COLLECTIONS</span>
                {pathname.startsWith("/collections") && <span className="text-xs font-sans text-[#B09262] tracking-widest">CURRENT</span>}
              </Link>

              <Link
                href="/heritage"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl uppercase tracking-wider transition-colors py-2 border-b border-[#B09262]/20 flex items-center justify-between ${
                  pathname === "/heritage" ? "text-[#B09262]" : "text-[#24211D]"
                }`}
              >
                <span>HERITAGE</span>
                {pathname === "/heritage" && <span className="text-xs font-sans text-[#B09262] tracking-widest">CURRENT</span>}
              </Link>

              <Link
                href="/experiences"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl uppercase tracking-wider transition-colors py-2 border-b border-[#B09262]/20 flex items-center justify-between ${
                  pathname === "/experiences" ? "text-[#B09262]" : "text-[#24211D]"
                }`}
              >
                <span>EXPERIENCES</span>
                {pathname === "/experiences" && <span className="text-xs font-sans text-[#B09262] tracking-widest">CURRENT</span>}
              </Link>

              <Link
                href="/bespoke"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl uppercase tracking-wider transition-colors py-2 border-b border-[#B09262]/20 flex items-center justify-between ${
                  pathname === "/bespoke" ? "text-[#B09262]" : "text-[#24211D]"
                }`}
              >
                <span>BESPOKE</span>
                {pathname === "/bespoke" && <span className="text-xs font-sans text-[#B09262] tracking-widest">CURRENT</span>}
              </Link>

              <Link
                href="/private-viewing"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl uppercase tracking-wider transition-colors py-2 border-b border-[#B09262]/20 ${
                  pathname === "/private-viewing" ? "text-[#B09262]" : "text-[#24211D]"
                }`}
              >
                PRIVATE VIEWING
              </Link>
            </div>

            <div className="pt-8 border-t border-[#B09262]/20 space-y-4">
              <Link
                href="/private-viewing"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-4 bg-[#24211D] text-[#FDFBF7] font-sans text-xs uppercase tracking-[0.25em] font-semibold rounded-full text-center shadow-lg hover:bg-[#B09262] transition-colors"
              >
                REQUEST PRIVATE VIEWING
              </Link>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#6E685F] text-center">
                Vasundhara Diamond Roof • Jubilee Hills, Hyderabad
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
