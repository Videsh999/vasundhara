"use client";

import React from "react";
import { motion } from "framer-motion";
import { CollectionItem } from "@/lib/supabase/mock-data";
import { CollectionCard } from "@/components/luxury/CollectionCard";

interface CollectionGridProps {
  collections: CollectionItem[];
  title?: string;
  subtitle?: string;
}

export function CollectionGrid({
  collections,
  title = "Curated High Collections",
  subtitle = "Masterpieces of Hyderabad Nizam Craftsmanship",
}: CollectionGridProps) {
  return (
    <section className="py-24 md:py-32 bg-[#F7F3E9] text-[#1C1A17] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-[#8C734B] font-medium"
          >
            {subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl text-[#1C1A17] mt-3 font-light"
          >
            {title}
          </motion.h2>
          <div className="w-16 h-[1px] bg-[#8C734B] mx-auto mt-6" />
        </div>

        {/* Modular Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {collections.map((col, idx) => (
            <CollectionCard key={col.id} collection={col} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
