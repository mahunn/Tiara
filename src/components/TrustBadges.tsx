'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    title: 'ক্যাশ অন ডেলিভারি',
    description: 'পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সম্পূর্ণ নিশ্চিন্ত সুবিধা',
  },
  {
    icon: ShieldCheck,
    title: '১০০% অরিজিনাল ফেব্রিক',
    description: 'খাঁটি দুবাই চেরি সিল্ক ও প্রিমিয়াম সৌদি নিদা কাপড়ের নিশ্চয়তা',
  },
  {
    icon: RefreshCw,
    title: 'সহজ সাইজ এক্সচেঞ্জ',
    description: 'সাইজে সমস্যা হলে ৩ দিনের মধ্যে সহজ এক্সচেঞ্জ সাপোর্ট',
  },
  {
    icon: Headphones,
    title: 'মেসেঞ্জার ও ফোন সাপোর্ট',
    description: 'সপ্তাহের ৭ দিন সকাল ৯টা থেকে রাত ১১টা পর্যন্ত কাস্টমার সেবা',
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
