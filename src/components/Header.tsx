'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  PhoneCall, 
  Heart, 
  X,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/mockData';

export default function Header() {
  const { cartCount, setIsCartOpen, setIsCategoryDrawerOpen, isSearchOpen, setIsSearchOpen } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* 1. Top Announcement Bar for BD Audience */}
      <div className="bg-[#590F23] text-[#FDEEF2] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-center w-full sm:w-auto justify-center">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F7D6DE] animate-pulse"></span>
            <p className="font-medium tracking-wide">
              🌸 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ৩০০০৳ অর্ডারে ডেলিভারি চার্জ ফ্রি!
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-light text-[#F7D6DE]">
            <a 
              href="tel:+8801700000000" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>হেল্পলাইন: ০১৭০০-০০০০০০</span>
            </a>
            <span className="opacity-40">|</span>
            <a 
              href="https://m.me/tiarabd" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              মেসেঞ্জার সাপোর্ট
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F7D6DE]/60 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Mobile Menu Trigger & Categories Link */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCategoryDrawerOpen(true)}
                className="p-2 rounded-xl text-[#590F23] hover:bg-[#FAF1F4] transition-colors lg:hidden"
                aria-label="ক্যাটাগরি মেনু"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#241117]">
                <Link 
                  href="/" 
                  className="text-[#590F23] font-semibold border-b-2 border-[#590F23] pb-0.5"
                >
                  হোম (Home)
                </Link>
                <div className="relative group py-2">
                  <button 
                    onClick={() => setIsCategoryDrawerOpen(true)}
                    className="flex items-center gap-1 hover:text-[#590F23] transition-colors py-1"
                  >
                    <span>কালেকশন</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-white tiara-glass rounded-2xl p-3 shadow-xl border border-[#F7D6DE] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#241117] hover:text-[#590F23] hover:bg-[#FAF1F4] rounded-xl transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-[#7A5763] font-normal">{cat.banglaName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link 
                  href="/category/abayas" 
                  className="hover:text-[#590F23] transition-colors"
                >
                  আবায়া
                </Link>
                <Link 
                  href="/category/gowns" 
                  className="hover:text-[#590F23] transition-colors"
                >
                  ফেস্টিভ গাউন
                </Link>
                <Link 
                  href="/category/hijabs" 
                  className="hover:text-[#590F23] transition-colors"
                >
                  খিমার ও হিজাব
                </Link>
              </nav>
            </div>

            {/* Center: Brand TIARA Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative h-12 w-32 sm:h-14 sm:w-44 transition-transform group-hover:scale-[1.02]">
                  <Image
                    src="/images/tiara-logo.jpg"
                    alt="TIARA"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Right: Search & Shopping Bag */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full text-[#590F23] hover:bg-[#FAF1F4] transition-colors"
                aria-label="প্রোডাক্ট খুঁজুন"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-full bg-[#FAF1F4] hover:bg-[#F7D6DE]/60 border border-[#F7D6DE] text-[#590F23] transition-all"
                aria-label="শপিং ব্যাগ"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline-block text-xs font-semibold">ব্যাগ</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-auto sm:right-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-[#590F23] rounded-full shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-[#F7D6DE]/80 bg-[#FAF1F4]/95 backdrop-blur-md py-4 px-4 shadow-md transition-all animate-fadeIn">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5763]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="আবায়া, গাউন, খিমার বা কো-অর্ড খুঁজুন..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full border border-[#F7D6DE] text-sm text-[#241117] focus:outline-none focus:border-[#590F23] shadow-xs"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-white text-[#7A5763] transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
