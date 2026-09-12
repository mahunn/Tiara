'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  Clock, 
  Truck,
  Heart
} from 'lucide-react';
import { CATEGORIES } from '@/lib/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#241117] text-[#FAF1F4] pt-12 pb-24 sm:pb-12 border-t-4 border-[#590F23] relative overflow-hidden">
      
      {/* Subtle floral texture background watermark on footer */}
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
            <div className="relative h-14 w-40 bg-white/95 rounded-2xl p-1 shadow-sm">
              <Image
                src="/images/tiara-logo.jpg"
                alt="TIARA"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-[#E5B6C3] leading-relaxed">
              টিয়ারা (TIARA) আধুনিক রুচিশীল নারীর জন্য শালীন ও অভিজাত ফ্যাশনের সেরা ঠিকানা। খাঁটি দুবাই চেরি সিল্ক ও সৌদি নিদা ফেব্রিকে নিখুঁত কারচুপির কাজ।
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-[#F7D6DE] border border-white/10">
                <Truck className="w-3.5 h-3.5 text-[#E7BA83]" />
                <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Categories */}
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
                    <span className="text-[10px] opacity-70">({cat.itemCount})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Policy */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#F7D6DE] tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C68E4D] rounded-full"></span>
              <span>কাস্টমার পলিসি</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E5B6C3]">
              <li>
                <span className="text-white font-medium">ডেলিভারি চার্জ:</span>
                <p className="text-[11px] text-[#E5B6C3] mt-0.5">ঢাকার ভিতরে ৳৭০ • ঢাকার বাইরে ৳১৩০</p>
              </li>
              <li>
                <span className="text-white font-medium">পেমেন্ট মেথড:</span>
                <p className="text-[11px] text-[#E5B6C3] mt-0.5">ক্যাশ অন ডেলিভারি, বিকাশ, নগদ</p>
              </li>
              <li>
                <span className="text-white font-medium">এক্সচেঞ্জ সুবিধা:</span>
                <p className="text-[11px] text-[#E5B6C3] mt-0.5">সাইজ পরিবর্তন ৩ দিনের মধ্যে সম্ভব</p>
              </li>
            </ul>
          </div>

          {/* Column 4: Helpline & Support */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#F7D6DE] tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C68E4D] rounded-full"></span>
              <span>যোগাযোগ ও অর্ডার সহায়তা</span>
            </h4>
            <div className="space-y-3 text-xs text-[#E5B6C3]">
              <a 
                href="tel:+8801700000000" 
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#E7BA83]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#FAF1F4]/70">হটলাইন নম্বর</p>
                  <p className="font-bold text-[#F7D6DE]">০১৭০০-০০০০০০</p>
                </div>
              </a>

              <a 
                href="https://m.me/tiarabd" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#0084FF]/20 flex items-center justify-center text-[#0084FF]">
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] text-[#FAF1F4]/70">মেসেঞ্জার সাপোর্ট</p>
                  <p className="font-bold text-[#F7D6DE]">m.me/tiarabd</p>
                </div>
              </a>

              <div className="flex items-start gap-2.5 pt-1">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#E7BA83] flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] leading-relaxed">
                  ব্লক সি, রোড ৪, বনশ্রী, রামপুরা, ঢাকা ১২১৯, বাংলাদেশ
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF1F4]/60">
          <p className="text-center sm:text-left">
            © 2026 <span className="font-serif font-bold text-white">TIARA</span>. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span>•</span>
            <span>বিকাশ</span>
            <span>•</span>
            <span>নগদ</span>
            <span>•</span>
            <span>রকেট</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
