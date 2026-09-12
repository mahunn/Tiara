'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, MessageCircle, Truck, CheckCircle2 } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import CategoryPills from '@/components/CategoryPills';
import ProductSection from '@/components/ProductSection';
import CustomerReviews from '@/components/CustomerReviews';
import TrustBadges from '@/components/TrustBadges';
import { PRODUCTS, MESSENGER_URL } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="min-h-screen tiara-bg-pattern">
      {/* 1. Hero Slider with Real Prayer Hijab Photos */}
      <HeroSlider />

      {/* 2. Category Highlights with Real Product Photos */}
      <CategoryPills />

      {/* 3. Main Product Section: Prayer Hijab Collection */}
      <ProductSection
        title="PRAYER HIJAB COLLECTION"
        banglaTitle="খাঁটি বেক্সি বয়েল নামাজের হিজাব"
        subtitle="১ পিসের দাম ৫৫০ টাকা"
        products={PRODUCTS}
        viewAllLink="/category/lavender"
      />

      {/* 4. Highlight Feature Banner with Exact Customer Description */}
      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden tiara-banner-pattern border border-[#F7D6DE] shadow-xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Real Photos Collaged in Cute Frame */}
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <div className="relative aspect-[3/4] w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white">
                <Image
                  src="/images/products/prayer-hijab-all-1.jpg"
                  alt="বেক্সি বয়েল নামাজের হিজাব"
                  fill
                  className="object-cover object-center"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[11px] font-bold bg-[#590F23] text-white rounded-full">
                  ৩টি আকর্ষণীয় কালার
                </span>
              </div>
              <div className="relative aspect-[3/4] w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white hidden sm:block">
                <Image
                  src="/images/products/prayer-hijab-lavender.jpg"
                  alt="এডজাস্টেবল ফিতা সহ হিজাব"
                  fill
                  className="object-cover object-center"
                />
                <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 text-[11px] font-bold bg-white text-[#590F23] rounded-full shadow-xs">
                  ফিতা দিয়ে এডজাস্টেবল
                </span>
              </div>
            </div>

            {/* Right: Exact Product Description & Delivery Rates */}
            <div className="w-full lg:w-1/2 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#590F23] text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E7BA83]" />
                <span>অরিজিনাল বেক্সি বয়েল ফেব্রিক</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#590F23] leading-tight">
                🌷 নামাজের জন্য আরামদায়ক ও বাতাস চলাচল-সহায়ক হিজাব 🌷
              </h2>

              <ul className="space-y-2 text-xs sm:text-sm text-[#241117] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>📌 খাঁটি বেক্সি বয়েল (Bexi boil) কাপড় দিয়ে তৈরি ✔️</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>📌 বাতাস চলাচল-সহায়ক (Breathable) ✔️</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>📌 মাপ অনুযায়ী ছোট-বড় করা যায় (Adjustable) ✔️</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>📌 ফুল কাভারেজ (Full Coverage) ✔️</span>
                </li>
              </ul>

              {/* Price & Delivery Card */}
              <div className="p-3.5 rounded-2xl bg-white/90 border border-[#F7D6DE] shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#590F23] text-sm sm:text-base">
                    ✨ ১ পিসের দাম ৫৫০ টাকা 💵
                  </span>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    রেডি স্টক
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F7D6DE] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#241117]">
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#590F23]" />
                    <span>চাঁদপুরে ডেলিভারি <strong>৫০ টাকা</strong> (চাঁদপুর সদর)</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#590F23]" />
                    <span>ঢাকায় ডেলিভারি <strong>১২০ টাকা</strong></span>
                  </p>
                </div>
              </div>

              {/* Direct Messenger Button */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0084FF] hover:bg-[#0070D6] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>📩 অর্ডার করতে ইনবক্স করুন</span>
                </a>

                <Link
                  href="/category/lavender"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#590F23] hover:bg-[#721631] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <span>কালেকশন দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <CustomerReviews />

      {/* 6. Trust & Delivery Badges */}
      <TrustBadges />
    </div>
  );
}
