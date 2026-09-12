'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Eye, ShoppingBag, MessageCircle, X } from 'lucide-react';
import { REELS, PRODUCTS } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { ReelVideo } from '@/types';

export default function WatchAndShop() {
  const { openQuickOrder } = useStore();
  const [activeReel, setActiveReel] = useState<ReelVideo | null>(null);

  const handleOrderReelProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      openQuickOrder(product);
      setActiveReel(null);
    }
  };

  return (
    <section className="py-8 sm:py-14 bg-gradient-to-b from-white via-[#FAF1F4] to-white border-y border-[#F7D6DE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8 pb-2 border-b border-[#F7D6DE]/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#590F23] rounded-full"></span>
              <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#241117] uppercase">
                WATCH & SHOP
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#7A5763] font-light mt-0.5 ml-3.5">
              ভিডিওতে ড্রেসের ফ্লেয়ার ও কারচুপি দেখুন • সরাসরি অর্ডার করুন
            </p>
          </div>
        </div>

        {/* Reels Grid / Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {REELS.map((reel) => {
            const product = PRODUCTS.find((p) => p.id === reel.productId);
            return (
              <div 
                key={reel.id}
                className="group relative rounded-2xl overflow-hidden bg-black/5 aspect-[9/16] shadow-md tiara-card-hover border border-[#F7D6DE]"
              >
                {/* Thumbnail Image */}
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3">
                  
                  {/* Top: Duration and Views */}
                  <div className="flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" />
                      <span>{reel.views}</span>
                    </span>
                    <span className="bg-[#590F23]/80 px-2 py-0.5 rounded-full">
                      {reel.videoDuration}
                    </span>
                  </div>

                  {/* Center: Play Trigger */}
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => setActiveReel(reel)}
                      className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-[#590F23] group-hover:text-white text-[#590F23] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 active:scale-95"
                      aria-label="ভিডিও দেখুন"
                    >
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </button>
                  </div>

                  {/* Bottom: Title & Order CTA */}
                  <div className="space-y-2">
                    <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-sm">
                      {reel.banglaTitle}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-white/20">
                      <span className="text-white font-bold text-xs">
                        ৳ {reel.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => product && openQuickOrder(product)}
                        className="px-2.5 py-1 bg-white hover:bg-[#F7D6DE] text-[#590F23] font-bold text-[11px] rounded-lg shadow-sm transition-all flex items-center gap-1 active:scale-95"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>অর্ডার</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reel Modal Popup */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-[#1A0B10] shadow-2xl border border-white/10 aspect-[9/16] flex flex-col justify-between">
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Background Mock / Showcase */}
            <div className="relative w-full h-full">
              <Image
                src={activeReel.thumbnail}
                alt={activeReel.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 flex items-center justify-center">
                <div className="text-center p-6 text-white space-y-2">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                    <Play className="w-7 h-7 text-white fill-current ml-1" />
                  </div>
                  <p className="text-xs font-light text-white/80">প্রোডাক্ট রিল প্রিভিউ</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Video Reel */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent space-y-3 z-10">
              <div>
                <h4 className="text-white font-serif font-bold text-sm">
                  {activeReel.banglaTitle}
                </h4>
                <p className="text-[#E7BA83] font-bold text-base mt-0.5">
                  ৳ {activeReel.price.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOrderReelProduct(activeReel.productId)}
                  className="flex-1 py-2.5 rounded-xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>এখনই অর্ডার করুন</span>
                </button>
                <a
                  href="https://m.me/tiarabd"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs flex items-center justify-center backdrop-blur-md"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
