"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CollectionItem } from "@/lib/supabase/mock-data";

interface CollectionCardProps {
  collection: CollectionItem;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative flex flex-col bg-[#F7F3E9] rounded-2xl overflow-hidden border border-[#8C734B]/20 shadow-luxury hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container with Parallax Zoom */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFE9DA]">
        <img
          src={collection.heroImage}
          alt={collection.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/80 via-[#1C1A17]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Top Category Badge */}
        <div className="absolute top-5 left-5 z-10">
          <span className="px-3.5 py-1.5 bg-[#FDFBF7]/90 backdrop-blur-md border border-[#8C734B]/30 rounded-full font-sans text-[10px] uppercase tracking-[0.25em] text-[#1C1A17] font-medium">
            {collection.category}
          </span>
        </div>

        {/* Floating Quick Action Arrow */}
        <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md border border-[#8C734B]/30 flex items-center justify-center text-[#1C1A17] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <ArrowUpRight className="w-5 h-5 text-[#8C734B]" />
        </div>

        {/* Bottom Card Title & Preview Description */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 text-[#FDFBF7]">
          <h3 className="font-serif text-2xl md:text-3xl text-[#FDFBF7] font-light group-hover:text-[#EFE9DA] transition-colors">
            {collection.title}
          </h3>
          <p className="font-sans text-xs text-[#EFE9DA]/80 mt-2 line-clamp-2 leading-relaxed">
            {collection.description}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#B59A5B] font-medium group-hover:text-white transition-colors">
            <span>Discover Collection</span>
            <span className="w-4 h-[1px] bg-[#B59A5B] group-hover:w-8 transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Full Card Link */}
      <Link href={`/collections/${collection.slug}`} className="absolute inset-0 z-20">
        <span className="sr-only">View {collection.title}</span>
      </Link>
    </motion.div>
  );
}
