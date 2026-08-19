"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_JEWELLERY, JewelleryItem } from "@/lib/supabase/mock-data";
import { Plus, Edit, Eye, EyeOff, Gem } from "lucide-react";

export default function AdminJewelleryPage() {
  const [items, setItems] = useState<JewelleryItem[]>(MOCK_JEWELLERY);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<JewelleryItem>>({
    title: "",
    code: "",
    category: "Bridal",
    karat: "18K Gold",
    diamondCarat: 10,
    description: "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (current.id) {
      setItems(items.map((j) => (j.id === current.id ? ({ ...j, ...current } as JewelleryItem) : j)));
    } else {
      const newItem: JewelleryItem = {
        id: `jewel-${Date.now()}`,
        title: current.title || "New Jewellery Item",
        slug: (current.title || "new-jewel").toLowerCase().replace(/\s+/g, "-"),
        code: current.code || `VDR-JW-${Date.now().toString().slice(-3)}`,
        category: current.category || "Bridal",
        karat: current.karat || "18K Gold",
        diamondCarat: current.diamondCarat || 5.0,
        description: current.description || "",
        specifications: { "Gold Purity": "18K Gold" },
        primaryImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
        galleryMedia: [],
        isFeatured: true,
        isPublished: true,
        collectionSlug: "nizam-bridal-heritage",
      };
      setItems([...items, newItem]);
    }
    setIsEditing(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              CMS Jewellery Inventory
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Jewellery Catalog Manager</h1>
          </div>

          <button
            onClick={() => {
              setCurrent({ title: "", code: "", category: "Bridal", karat: "18K Gold" });
              setIsEditing(true);
            }}
            className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#B59A5B]" />
            <span>Add Jewellery Item</span>
          </button>
        </div>

        {isEditing && (
          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/30 shadow-2xl mb-6">
            <h3 className="font-serif text-2xl text-[#1C1A17] mb-4">
              {current.id ? "Edit Jewellery Item" : "New Jewellery Item"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={current.title || ""}
                    onChange={(e) => setCurrent({ ...current, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={current.code || ""}
                    onChange={(e) => setCurrent({ ...current, code: e.target.value })}
                    placeholder="VDR-BD-001"
                    className="w-full px-4 py-2.5 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                    Karat Purity
                  </label>
                  <input
                    type="text"
                    value={current.karat || "18K Gold"}
                    onChange={(e) => setCurrent({ ...current, karat: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                  Item Description
                </label>
                <textarea
                  rows={3}
                  value={current.description || ""}
                  onChange={(e) => setCurrent({ ...current, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 font-sans text-xs uppercase tracking-widest rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1C1A17] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full hover:bg-[#8C734B]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">SKU Code</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Karat</th>
                <th className="p-4">Diamond Carat</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {items.map((j) => (
                <tr key={j.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-mono text-xs text-[#8C734B] font-bold">{j.code}</td>
                  <td className="p-4 font-serif text-base text-[#1C1A17] font-medium">{j.title}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{j.category}</td>
                  <td className="p-4 font-sans text-xs text-[#686256]">{j.karat}</td>
                  <td className="p-4 font-sans text-xs text-[#8C734B] font-medium">{j.diamondCarat || "—"} Ct</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setCurrent(j);
                        setIsEditing(true);
                      }}
                      className="p-1.5 text-[#8C734B] hover:text-[#1C1A17]"
                    >
                      <Edit className="w-4 h-4" />
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
