'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import CategoryPills from '@/components/CategoryPills';
import ProductSection from '@/components/ProductSection';
import WatchAndShop from '@/components/WatchAndShop';
import CustomerReviews from '@/components/CustomerReviews';
import TrustBadges from '@/components/TrustBadges';
import { PRODUCTS } from '@/lib/mockData';

export default function Home() {
  const eidProducts = PRODUCTS.filter((p) => p.isEidArrival);
  const abayaProducts = PRODUCTS.filter((p) => p.category === 'abayas');
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending);

  return (
    <div className="min-h-screen tiara-bg-pattern">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Category Highlights */}
      <CategoryPills />

      {/* 3. EID COLLECTION 2026 (Structure matching Anzaar Lifestyle) */}
      <ProductSection
        title="EID COLLECTION 2026"
        banglaTitle="ঈদ স্পেশাল নতুন কালেকশন"
        subtitle="সীমিত স্টক"
        products={eidProducts}
        viewAllLink="/category/abayas"
      />

      {/* 4. Middle Promotional Highlight (Using TIARA Signature Floral Texture) */}
      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden tiara-banner-pattern border border-[#F7D6DE] shadow-lg p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#590F23] text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E7BA83]" />
                <span>হাতে তৈরি এক্সক্লুসিভ কারচুপি</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#590F23]">
                সৌদি ও দুবাইয়ের নিখুঁত শালীনতা
              </h3>
              <p className="text-xs sm:text-sm text-[#241117]/80 leading-relaxed font-light">
                প্রতিটি আবায়া ও গাউনে থাকছে আসল দুবাই চেরি সিল্কের কোমল স্পর্শ এবং অভিজ্ঞ কারিগরদের নিখুঁত হাতে বোনা কারচুপি সূচিকর্ম।
              </p>
              <div className="pt-2">
                <Link
                  href="/category/abayas"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#590F23] hover:bg-[#721631] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <span>আবায়া কালেকশন দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Brand Showcase Image */}
            <div className="relative w-48 h-36 sm:w-64 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white/90 p-2 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/tiara-logo.jpg"
                  alt="TIARA"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. EXCLUSIVE ABAYAS */}
      <ProductSection
        title="EXCLUSIVE ABAYAS"
        banglaTitle="প্রিমিয়াম বোরকা ও আবায়া"
        subtitle="দুবাই চেরি সিল্ক"
        products={abayaProducts}
        viewAllLink="/category/abayas"
      />

      {/* 6. WATCH & SHOP (Video Reels shopping feed inspired by Anzaar) */}
      <WatchAndShop />

      {/* 7. TRENDING NOW */}
      <ProductSection
        title="TRENDING NOW"
        banglaTitle="সবচেয়ে বেশি পছন্দের ড্রেস"
        products={trendingProducts}
        viewAllLink="/category/coords"
      />

      {/* 8. Customer Testimonials */}
      <CustomerReviews />

      {/* 9. Trust & COD Badges */}
      <TrustBadges />
    </div>
  );
}
