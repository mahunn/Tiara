'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Phone, MessageCircle, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { CATEGORIES, MESSENGER_URL } from '@/lib/mockData';

export default function CategoryDrawer() {
  const { isCategoryDrawerOpen, setIsCategoryDrawerOpen } = useStore();

  if (!isCategoryDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCategoryDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col border-r border-[#F7D6DE]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F7D6DE] bg-[#FAF1F4]">
            <div className="relative h-10 w-28">
              <Image
                src="/images/tiara-logo-transparent.png"
                alt="TIARA"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setIsCategoryDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-white text-[#7A5763] transition-colors"
              aria-label="মেনু বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <p className="text-xs font-bold text-[#7A5763] uppercase tracking-wider px-2 pt-1">
              কালেকশন সমূহ
            </p>

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF1F4] border border-transparent hover:border-[#F7D6DE] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FAF1F4] border border-[#F7D6DE] flex-shrink-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#241117] group-hover:text-[#590F23] transition-colors">
                      {cat.banglaName}
                    </h4>
                    <p className="text-[11px] text-[#7A5763]">
                      {cat.name}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7A5763] group-hover:text-[#590F23] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>

          {/* Customer Service Box */}
          <div className="p-4 border-t border-[#F7D6DE] bg-[#FAF1F4] space-y-2 text-xs">
            <p className="font-bold text-[#241117]">সহযোগিতার জন্য:</p>
            <a
              href={MESSENGER_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#0084FF] font-semibold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>মেসেঞ্জারে চ্যাট করুন</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
