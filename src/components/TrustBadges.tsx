'use client';

import React from 'react';
import { Truck, ShieldCheck, Wind, CheckCircle2 } from 'lucide-react';

const BADGES = [
  {
    icon: Wind,
    title: 'খাঁটি বেক্সি বয়েল',
    description: '১০০% সুতি ব্রিদেবল কাপড়',
  },
  {
    icon: CheckCircle2,
    title: 'এডজাস্টেবল সাইজ',
    description: 'ফিতা দিয়ে সহজে পরিধানযোগ্য',
  },
  {
    icon: Truck,
    title: 'চাঁদপুর ৫০৳ • ঢাকা ১২০৳',
    description: 'ক্যাশ অন ডেলিভারি',
  },
  {
    icon: ShieldCheck,
    title: 'চেক করে পেমেন্ট',
    description: 'হাতে পেয়ে মূল্য পরিশোধের সুবিধা',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-8 bg-white border-b border-[#F7D6DE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAF1F4]/70 border border-[#F7D6DE]/60 tiara-card-hover"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#F7D6DE] text-[#590F23] flex items-center justify-center mb-3 shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#241117]">
                  {b.title}
                </h3>
                <p className="text-[11px] text-[#7A5763] mt-1 leading-normal">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
