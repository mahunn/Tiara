'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { MESSENGER_URL } from '@/lib/mockData';

export default function MessengerWidget() {
  return (
    <aside 
      aria-label="Facebook Messenger"
      className="hidden sm:block fixed bottom-6 right-6 z-40"
    >
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#0084FF] to-[#00C6FF] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="ফেসবুক মেসেঞ্জার"
        title="মেসেঞ্জারে ইনবক্স করুন"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
}
