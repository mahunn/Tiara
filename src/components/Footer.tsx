'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Truck,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES, FB_PROFILE_URL, MESSENGER_URL } from '@/lib/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#241117] text-[#FAF1F4] pt-12 pb-24 sm:pb-12 border-t-4 border-[#590F23] relative overflow-hidden">
      
      {/* Subtle floral texture background watermark */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('/images/floral-pattern.svg')",
          backgroundSize: '320px 320px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & Story */}
          <div className="space-y-4">
            <div className="relative h-14 w-40">
              <Image
                src="/images/tiara-logo-light.png"
                alt="TIARA"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-[#E5B6C3] leading-relaxed">
              প্রিমিয়াম কটন ও নামাজের হিজাব, বাতাস চলাচল-উপযোগী লেইস ইনার ক্যাপ ও হিজাব পিন।
            </p>
            <div className="pt-1 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-[#F7D6DE] border border-white/10">
                <Truck className="w-3.5 h-3.5 text-[#E7BA83]" />
                <span>চাঁদপুর সদর ৫০৳ | ঢাকা ১২০৳</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#F7D6DE] tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C68E4D] rounded-full"></span>
              <span>কালেকশন সমূহ</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#E5B6C3]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white hover:underline transition-colors flex items-center justify-between"
                  >
                    <span>{cat.banglaName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Delivery Policy */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#F7D6DE] tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C68E4D] rounded-full"></span>
              <span>ডেলিভারি চার্জ</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E5B6C3]">
              <li>
                <span className="text-white font-medium">চাঁদপুর সদর (চাঁদপুর):</span>
                <p className="text-[11px] text-[#E5B6C3] mt-0.5">ডেলিভারি চার্জ মাত্র ৫০ টাকা 📦</p>
              </li>
              <li>
                <span className="text-white font-medium">ঢাকা সিটি:</span>
                <p className="text-[11px] text-[#E5B6C3] mt-0.5">ডেলিভারি চার্জ ১২০ টাকা 📦</p>
              </li>
              <li>
                <span className="text-white font-medium">পেমেন্ট মেথড:</span>
                <p className="text-[11px] text-[#E5B6C3] mt-0.5">ক্যাশ অন ডেলিভারি (হাতে পেয়ে টাকা দিন)</p>
              </li>
            </ul>
          </div>

          {/* Column 4: Facebook & Messenger Profile */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#F7D6DE] tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C68E4D] rounded-full"></span>
              <span>ফেসবুক ও মেসেঞ্জার সাপোর্ট</span>
            </h4>
            <div className="space-y-3 text-xs text-[#E5B6C3]">
              <a 
                href={MESSENGER_URL} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors p-2.5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0084FF] flex items-center justify-center text-white flex-shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] text-[#FAF1F4]/70">মেসেঞ্জারে নক দিন</p>
                  <p className="font-bold text-[#F7D6DE] flex items-center gap-1">
                    <span>চ্যাট শুরু করুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              </a>

              <a 
                href={FB_PROFILE_URL}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors p-2.5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-[#FAF1F4]/70">ফেসবুক প্রোফাইল</p>
                  <p className="font-bold text-[#F7D6DE] flex items-center gap-1">
                    <span>TIARA Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF1F4]/60">
          <p className="text-center sm:text-left">
            © 2026 <span className="font-serif font-bold text-white">TIARA</span>. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-2 text-xs flex-wrap justify-center sm:justify-end">
            <span>খাঁটি বেক্সি বয়েল</span>
            <span>•</span>
            <span>ক্যাশ অন ডেলিভারি</span>
            <span>•</span>
            <span>চাঁদপুর সদর</span>
            <span>•</span>
            <Link href="/admin" className="text-[#F7D6DE] hover:underline flex items-center gap-1 font-medium">
              <span>🔒 অ্যাডমিন পোর্টাল</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
