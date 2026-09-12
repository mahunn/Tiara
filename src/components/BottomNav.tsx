'use client';

import React from 'react';
import Link from 'next/link';
import { Home, LayoutGrid, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { MESSENGER_URL } from '@/lib/mockData';

export default function BottomNav() {
  const { cartCount, setIsCartOpen, setIsCategoryDrawerOpen } = useStore();

  return (
    <nav 
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F7D6DE] py-2 px-3 sm:hidden shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around">
        
        {/* 1. Home */}
        <Link 
          href="/" 
          className="flex flex-col items-center gap-1 text-[#590F23] hover:opacity-80 transition-opacity"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">হোম</span>
        </Link>

        {/* 2. Category */}
        <button
          onClick={() => setIsCategoryDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[#7A5763] hover:text-[#590F23] transition-colors"
          aria-label="ক্যাটাগরি মেনু"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-medium">ক্যাটাগরি</span>
        </button>

        {/* 3. Cart / Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[#7A5763] hover:text-[#590F23] transition-colors"
          aria-label="শপিং ব্যাগ"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[9px] font-bold text-white bg-[#590F23] rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">ব্যাগ</span>
        </button>

        {/* 4. Facebook / Messenger Button in Bottom Right */}
        <a
          href={MESSENGER_URL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 text-[#0084FF] hover:opacity-90 transition-all active:scale-95"
          aria-label="Facebook Messenger Support"
        >
          <div className="relative p-1 rounded-full bg-[#0084FF]/10 text-[#0084FF]">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <span className="text-[10px] font-bold text-[#0084FF]">মেসেঞ্জার</span>
        </a>

      </div>
    </nav>
  );
}
