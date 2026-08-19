"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_COLLECTIONS, CollectionItem } from "@/lib/supabase/mock-data";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionItem[]>(MOCK_COLLECTIONS);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<CollectionItem>>({
    title: "",
    category: "Bridal",
    slug: "",
    description: "",
    isPublished: true,
    isFeatured: true,
  });

  const handleTogglePublish = (id: string) => {
    setCollections(
      collections.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (current.id) {
      setCollections(
        collections.map((c) => (c.id === current.id ? ({ ...c, ...current } as CollectionItem) : c))
      );
    } else {
      const newItem: CollectionItem = {
        id: `col-${Date.now()}`,
        title: current.title || "New Collection",
        slug: (current.title || "new-collection").toLowerCase().replace(/\s+/g, "-"),
        category: current.category || "Bridal",
        description: current.description || "",
        heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
        isFeatured: true,
        isPublished: true,
        displayOrder: collections.length + 1,
      };
      setCollections([...collections, newItem]);
    }
    setIsEditing(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              CMS Collections Module
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Collections Manager</h1>
          </div>

          <button
            onClick={() => {
              setCurrent({ title: "", category: "Bridal", description: "", isPublished: true });
              setIsEditing(true);
            }}
            className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#B59A5B]" />
            <span>Create New Collection</span>
          </button>
        </div>

        {/* Modal Form for Create/Edit */}
        {isEditing && (
          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#8C734B]/30 shadow-2xl mb-6">
            <h3 className="font-serif text-2xl text-[#1C1A17] mb-4">
              {current.id ? "Edit Collection" : "Create New Collection"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                    Collection Title *
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
                    Category
                  </label>
                  <select
                    value={current.category || "Bridal"}
                    onChange={(e) => setCurrent({ ...current, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F7F3E9] border border-[#8C734B]/20 rounded-lg font-sans text-sm"
                  >
                    <option>Bridal</option>
                    <option>Diamond</option>
                    <option>Gold</option>
                    <option>Temple</option>
                    <option>Polki</option>
                    <option>Kundan</option>
                    <option>Bespoke</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1A17] mb-1 font-medium">
                  Editorial Description
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
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Collections Table */}
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#8C734B]/20 shadow-luxury overflow-hidden">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-[#1C1A17] text-[#FDFBF7] uppercase tracking-widest text-[10px]">
              <tr>
                <th className="p-4">Collection Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C734B]/15">
              {collections.map((col) => (
                <tr key={col.id} className="hover:bg-[#F7F3E9] transition-colors">
                  <td className="p-4 font-serif text-base text-[#1C1A17] font-medium">{col.title}</td>
                  <td className="p-4 font-sans text-xs text-[#8C734B] font-medium">{col.category}</td>
                  <td className="p-4 font-mono text-[11px] text-[#686256]">{col.slug}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${
                        col.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {col.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleTogglePublish(col.id)}
                      className="p-1.5 text-[#8C734B] hover:text-[#1C1A17]"
                      title="Toggle Status"
                    >
                      {col.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setCurrent(col);
                        setIsEditing(true);
                      }}
                      className="p-1.5 text-[#8C734B] hover:text-[#1C1A17]"
                      title="Edit"
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
