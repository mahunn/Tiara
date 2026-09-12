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

      {/* 4. Highlight Feature Banner */}
      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden tiara-banner-pattern border border-[#F7D6DE] shadow-lg p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Real Photos in Clean Elegant Frame */}
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <div className="relative aspect-[3/4] w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-sm border border-[#F7D6DE] bg-white">
                <Image
                  src="/images/products/prayer-hijab-all-1.jpg"
                  alt="বেক্সি বয়েল নামাজের হিজাব"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="relative aspect-[3/4] w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-sm border border-[#F7D6DE] bg-white hidden sm:block">
                <Image
                  src="/images/products/prayer-hijab-lavender.jpg"
                  alt="এডজাস্টেবল ফিতা সহ হিজাব"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: Product Details & Delivery Rates */}
            <div className="w-full lg:w-1/2 space-y-4 text-left">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#590F23] leading-tight">
                নামাজের জন্য আরামদায়ক ও ব্রিদেবল হিজাব
              </h2>

              <ul className="space-y-2 text-xs sm:text-sm text-[#241117]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>খাঁটি বেক্সি বয়েল (Bexi boil) সুতি কাপড়</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>বাতাস চলাচল-সহায়ক ও আরামদায়ক</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>মাপ অনুযায়ী ছোট-বড় করা যায় (Adjustable)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                  <span>ফুল কাভারেজ</span>
                </li>
              </ul>

              {/* Price & Delivery Card */}
              <div className="p-3.5 rounded-2xl bg-white/90 border border-[#F7D6DE] space-y-2 text-xs">
                <div className="font-bold text-[#590F23] text-sm sm:text-base">
                  ১ পিসের দাম ৫৫০ টাকা
                </div>
                <div className="pt-2 border-t border-[#F7D6DE] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#241117]">
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#590F23]" />
                    <span>চাঁদপুর সদর: <strong>৫০ টাকা</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#590F23]" />
                    <span>ঢাকা: <strong>১২০ টাকা</strong></span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0084FF] hover:bg-[#0070D6] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>মেসেঞ্জারে অর্ডার করুন</span>
                </a>

                <Link
                  href="/category/lavender"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#590F23] hover:bg-[#721631] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
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
