"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Image as ImageIcon, Upload, Video, Music, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState([
    { id: "m1", title: "Nizam Emerald Choker Hero", type: "image", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", size: "4.2 MB" },
    { id: "m2", title: "Vasundhara Hero Video Loop", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-luxury-diamond-ring-glimmering-in-light-42867-large.mp4", size: "8.1 MB" },
    { id: "m3", title: "Solitaire Symphony Earrings", type: "image", url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", size: "3.5 MB" },
    { id: "m4", title: "Ambient Sitar Track", type: "audio", url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3", size: "2.4 MB" },
  ]);

  const [uploadedMsg, setUploadedMsg] = useState(false);

  const handleUpload = () => {
    const newMedia = {
      id: `m-${Date.now()}`,
      title: `Vasundhara Asset ${mediaList.length + 1}`,
      type: "image",
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      size: "3.1 MB",
    };
    setMediaList([newMedia, ...mediaList]);
    setUploadedMsg(true);
    setTimeout(() => setUploadedMsg(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#8C734B]/20">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8C734B] font-medium">
              Supabase Storage Vault
            </span>
            <h1 className="font-serif text-3xl text-[#1C1A17] font-light">Centralized Media Library</h1>
          </div>

          <button
            onClick={handleUpload}
            className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#8C734B] text-[#FDFBF7] font-sans text-xs uppercase tracking-widest rounded-full transition-colors inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-[#B59A5B]" />
            <span>Upload New Media</span>
          </button>
        </div>

        {uploadedMsg && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl flex items-center gap-2 font-sans text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Asset uploaded to Supabase Media Bucket successfully.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="bg-[#FDFBF7] rounded-xl overflow-hidden border border-[#8C734B]/20 shadow-luxury group flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-[#EFE9DA] flex items-center justify-center overflow-hidden">
                {item.type === "image" ? (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                ) : item.type === "video" ? (
                  <Video className="w-12 h-12 text-[#8C734B]" />
                ) : (
                  <Music className="w-12 h-12 text-[#8C734B]" />
                )}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1C1A17]/80 text-[#FDFBF7] rounded-full text-[9px] uppercase tracking-widest">
                  {item.type}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-serif text-base text-[#1C1A17] truncate">{item.title}</h4>
                <p className="font-sans text-[10px] text-[#686256] mt-1">{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
