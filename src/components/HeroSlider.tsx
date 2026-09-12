'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'NEW ARRIVAL',
    title: 'TIARA Signature Modest Collection',
    banglaTitle: 'বেক্সি বয়েল নামাজের হিজাব',
    subtitle: 'খাঁটি বেক্সি বয়েল কাপড় দিয়ে তৈরি • বাতাস চলাচল-সহায়ক • ফুল কাভারেজ',
    image: '/images/tiara-cover.png',
    link: '/category/prayer-hijab',
    buttonText: 'কালেকশন দেখুন',
    isBrandBanner: true,
  },
  {
    id: 2,
    badge: '১ পিসের দাম ৫৫০৳',
    title: 'Pure Bexi Boil Breathable Prayer Hijab',
    banglaTitle: 'নামাজের জন্য আরামদায়ক হিজাব',
    subtitle: 'ল্যাভেন্ডার, মিন্ট ও পিচ ফ্লোরাল • মাপ অনুযায়ী ছোট-বড় করা যায় (Adjustable)',
    image: '/images/products/prayer-hijab-all-1.jpg',
    link: '/category/prayer-hijab',
    buttonText: 'অর্ডার করুন (৫৫০৳)',
    isBrandBanner: false,
  },
  {
    id: 3,
    badge: 'স্পেশাল কম্বো অফার',
    title: '3-Piece Prayer Hijab Combo',
    banglaTitle: '৩ কালার স্পেশাল কম্বো প্যাক',
    subtitle: 'চাঁদপুর সদরে ডেলিভারি চার্জ মাত্র ৫০ টাকা | ঢাকায় ডেলিভারি ১২০ টাকা',
    image: '/images/products/prayer-hijab-all-2.jpg',
    link: '/category/prayer-hijab',
    buttonText: 'কম্বো প্যাক দেখুন',
    isBrandBanner: false,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF1F4] border-b border-[#F7D6DE]/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg aspect-[16/9] sm:aspect-[21/9] max-h-[520px] bg-[#F8DAE1]">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Image */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={slide.isBrandBanner ? 'object-cover sm:object-contain object-center' : 'object-cover object-center'}
                />

                {!slide.isBrandBanner && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#590F23]/85 via-[#590F23]/50 to-transparent flex items-center">
                    <div className="px-6 sm:px-12 md:px-16 max-w-xl text-white space-y-3 sm:space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FDEEF2] text-xs font-semibold tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#E7BA83]" />
                        <span>{slide.badge}</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight drop-shadow-sm">
                        {slide.banglaTitle}
                      </h2>
                      <p className="text-xs sm:text-base text-[#FDEEF2]/95 font-light max-w-md line-clamp-2">
                        {slide.subtitle}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={slide.link}
                          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white text-[#590F23] font-bold text-xs sm:text-sm hover:bg-[#F7D6DE] transition-all shadow-md active:scale-95"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{slide.buttonText}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {slide.isBrandBanner && (
                  <div className="absolute bottom-3 right-4 sm:bottom-6 sm:right-8 z-20">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#590F23] text-white font-semibold text-xs sm:text-sm hover:bg-[#721631] transition-all shadow-lg active:scale-95 tiara-pulse-ring"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E7BA83]" />
                      <span>নামাজের হিজাব দেখুন</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-[#590F23] flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-[#590F23] flex items-center justify-center backdrop-blur-md shadow-md transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'w-6 sm:w-8 bg-[#590F23]'
                    : 'w-2 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
