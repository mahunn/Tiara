'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import { FB_PROFILE_URL, MESSENGER_URL } from '@/lib/mockData';

export default function MessengerWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside 
      aria-label="Customer Chat Widget"
      className="hidden sm:block fixed bottom-6 right-6 z-40"
    >
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-white p-4 shadow-2xl border border-[#F7D6DE] tiara-glass animate-scaleUp">
          <div className="flex items-center justify-between pb-2 border-b border-[#F7D6DE]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-serif font-bold text-xs text-[#590F23]">TIARA কাস্টমার কেয়ার</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#7A5763] hover:text-[#590F23]"
              aria-label="মেসেজ বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#241117] my-3 leading-relaxed">
            আসসালামু আলাইকুম! বেক্সি বয়েল নামাজের হিজাব, ইনার ক্যাপ বা হিজাব পিনের অর্ডার করতে মেসেঞ্জারে সরাসরি ইনবক্স করুন 🌸
          </p>

          <div className="space-y-2">
            <a
              href={MESSENGER_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>মেসেঞ্জারে চ্যাট শুরু করুন</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
            <a
              href={FB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-[#FAF1F4] hover:bg-[#F7D6DE] text-[#590F23] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>ফেসবুক প্রোফাইল দেখুন</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Messenger Icon Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden lg:flex items-center bg-white px-3.5 py-1.5 rounded-full shadow-md border border-[#F7D6DE] text-xs font-semibold text-[#590F23] animate-bounce">
            <span>অর্ডারে মেসেজ দিন 💬</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#0084FF] to-[#00C6FF] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all tiara-pulse-ring cursor-pointer"
          aria-label="ফেসবুক মেসেঞ্জার চ্যাট"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </button>
      </div>
    </aside>
  );
}
