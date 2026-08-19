"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Compass, Gem, Calendar, ArrowRight, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { AppointmentModal } from "@/components/luxury/AppointmentModal";
import { VasundharaLogo } from "@/components/luxury/VasundharaLogo";

interface ConciergeMessage {
  id: string;
  sender: "concierge" | "user";
  text: string;
  recommendedCollections?: Array<{ title: string; slug: string; category: string; heroImage: string }>;
  recommendedJewellery?: Array<{ title: string; slug: string; code: string; primaryImage: string; karat: string }>;
  recommendedExperiences?: Array<{ title: string; slug: string; eventType: string; coverImage: string }>;
  actions?: Array<{ label: string; href?: string; actionType?: string }>;
}

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConciergeModal({ isOpen, onClose }: ConciergeModalProps) {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: "msg-1",
      sender: "concierge",
      text: "Namaste. Welcome to the House of Vasundhara. How may I curate your experience today?",
      actions: [
        { label: "Explore Collections", href: "/collections" },
        { label: "Find Bridal Jewellery", href: "/collections/nizam-bridal-heritage" },
        { label: "Discover Bespoke", href: "/bespoke" },
        { label: "Explore Heritage", href: "/heritage" },
        { label: "Request Private Viewing", actionType: "APPOINTMENT" },
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || loading) return;

    const userMsg: ConciergeMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history: historyPayload }),
      });

      if (res.ok) {
        const data = await res.json();
        const conciergeMsg: ConciergeMessage = {
          id: `c-${Date.now()}`,
          sender: "concierge",
          text: data.reply || "I'd be delighted to assist you with our collections.",
          recommendedCollections: data.recommendedCollections,
          recommendedJewellery: data.recommendedJewellery,
          recommendedExperiences: data.recommendedExperiences,
          actions: data.actions,
        };
        setMessages((prev) => [...prev, conciergeMsg]);
      } else {
        throw new Error("Concierge offline");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "concierge",
          text: "I'm unable to connect right now. You can explore the House or request a private viewing directly.",
          actions: [
            { label: "Explore Collections", href: "/collections" },
            { label: "Request Private Viewing", actionType: "APPOINTMENT" },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-end justify-end sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1A17]/60 backdrop-blur-xs pointer-events-auto"
          />

          {/* Concierge Interactive Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full sm:max-w-md h-[90vh] sm:h-[620px] bg-[#FDFBF7] border border-[#8C734B]/30 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto text-[#1C1A17] flex flex-col justify-between mb-0 sm:mb-16 mr-0 sm:mr-4"
          >
            {/* Header */}
            <div className="p-5 bg-[#1C1A17] text-[#FDFBF7] flex items-center justify-between border-b border-[#8C734B]/30 select-none">
              <div className="flex items-center gap-3">
                <VasundharaLogo
                  variant="mark"
                  theme="dark"
                  heightClass="h-7"
                  href={null}
                  aria-hidden={true}
                />
                <div>
                  <h3 className="font-serif text-lg tracking-wider text-[#FDFBF7]">VASUNDHARA CONCIERGE</h3>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#B59A5B]">
                    How may we assist your journey?
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1 text-[#EFE9DA]/70 hover:text-white transition-colors"
                aria-label="Close Concierge"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Log Body */}
            <div ref={scrollRef} className="p-4 overflow-y-auto space-y-4 flex-1 bg-[#FDFBF7] scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-2`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#1C1A17] text-[#FDFBF7] rounded-tr-none font-sans"
                        : "bg-[#F7F3E9] text-[#1C1A17] border border-[#8C734B]/20 rounded-tl-none font-serif text-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Collections Mini Cards */}
                  {msg.recommendedCollections && msg.recommendedCollections.length > 0 && (
                    <div className="w-full space-y-2 pt-1">
                      <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                        CURATED COLLECTIONS
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedCollections.map((col) => (
                          <Link
                            key={col.slug}
                            href={`/collections/${col.slug}`}
                            onClick={onClose}
                            className="group p-2.5 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/20 flex items-center gap-3 hover:border-[#8C734B] transition-all"
                          >
                            <img src={col.heroImage} alt={col.title} className="w-12 h-12 object-cover rounded-lg" />
                            <div className="flex-1 min-w-0">
                              <span className="font-serif text-xs text-[#1C1A17] font-medium block truncate group-hover:text-[#8C734B]">
                                {col.title}
                              </span>
                              <span className="font-sans text-[9px] uppercase tracking-widest text-[#686256] block">
                                {col.category} • DISCOVER →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Jewellery Mini Cards */}
                  {msg.recommendedJewellery && msg.recommendedJewellery.length > 0 && (
                    <div className="w-full space-y-2 pt-1">
                      <span className="font-sans text-[9px] uppercase tracking-widest text-[#8C734B] font-semibold block">
                        CURATED JEWELLERY PIECES
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedJewellery.map((j) => (
                          <Link
                            key={j.slug}
                            href={`/jewellery/${j.slug}`}
                            onClick={onClose}
                            className="group p-2.5 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/20 flex items-center gap-3 hover:border-[#8C734B] transition-all"
                          >
                            <img src={j.primaryImage} alt={j.title} className="w-12 h-12 object-cover rounded-lg" />
                            <div className="flex-1 min-w-0">
                              <span className="font-serif text-xs text-[#1C1A17] font-medium block truncate group-hover:text-[#8C734B]">
                                {j.title}
                              </span>
                              <span className="font-sans text-[9px] uppercase tracking-widest text-[#686256] block">
                                {j.karat} • CODE: {j.code}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Chips */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actions.map((act, aIdx) => {
                        if (act.actionType === "APPOINTMENT") {
                          return (
                            <button
                              key={aIdx}
                              onClick={() => {
                                onClose();
                                setAppointmentOpen(true);
                              }}
                              className="px-3 py-1.5 bg-[#1C1A17] text-[#FDFBF7] hover:bg-[#8C734B] rounded-full text-[10px] font-sans uppercase tracking-wider transition-colors flex items-center gap-1.5"
                            >
                              <Calendar className="w-3 h-3 text-[#B59A5B]" />
                              <span>{act.label}</span>
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={aIdx}
                            href={act.href || "/collections"}
                            onClick={onClose}
                            className="px-3 py-1.5 bg-[#F7F3E9] hover:bg-[#8C734B] hover:text-white border border-[#8C734B]/25 rounded-full text-[10px] font-sans uppercase tracking-wider text-[#1C1A17] transition-colors flex items-center gap-1"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3 text-[#8C734B]" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 bg-[#F7F3E9] rounded-xl border border-[#8C734B]/20 text-xs font-serif italic text-[#8C734B] w-max">
                  <span className="font-serif animate-pulse">✦</span>
                  <span>Curating recommendations for you...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#F7F3E9] border-t border-[#8C734B]/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about bridal, solitaires, bespoke..."
                  className="flex-1 px-4 py-2.5 bg-[#FDFBF7] border border-[#8C734B]/25 rounded-full font-sans text-xs text-[#1C1A17] focus:outline-none focus:border-[#8C734B]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2.5 bg-[#1C1A17] text-[#FDFBF7] hover:bg-[#8C734B] disabled:opacity-40 rounded-full transition-colors"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#686256] px-2 pt-2">
                <span>Flagship Salon • Jubilee Hills</span>
                <button
                  onClick={() => {
                    onClose();
                    setAppointmentOpen(true);
                  }}
                  className="text-[#8C734B] hover:underline font-medium"
                >
                  Private Viewing →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <AppointmentModal isOpen={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
