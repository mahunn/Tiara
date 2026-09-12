'use client';

import React from 'react';
import { Star, CheckCircle2, Heart } from 'lucide-react';
import { REVIEWS } from '@/lib/mockData';

export default function CustomerReviews() {
  return (
    <section className="py-8 sm:py-14 bg-[#FAF1F4] border-b border-[#F7D6DE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7D6DE] text-[#590F23] text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>সন্তুষ্ট আপুদের রিভিউ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#241117]">
            আমাদের ক্লায়েন্টদের ভালোবাসা ও প্রতিক্রিয়া
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5763]">
            চাঁদপুর, ঢাকা ও সারা বাংলাদেশ থেকে আপুরা তাদের নামাজের হিজাবের জন্য TIARA কেই বেছে নিয়েছেন
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-white border border-[#F7D6DE] tiara-card-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>ভেরিফাইড কাস্টমার</span>
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-[#241117] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 mt-4 border-t border-[#F7D6DE]/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF1F4] border border-[#F7D6DE] text-[#590F23] font-serif font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                  {rev.avatarInitial}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs text-[#241117] truncate">
                    {rev.author}
                  </h4>
                  <p className="text-[10px] text-[#7A5763] truncate">
                    {rev.city} • {rev.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
