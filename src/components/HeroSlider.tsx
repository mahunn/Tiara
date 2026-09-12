'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'NEW ARRIVAL 2026',
    title: 'TIARA Signature Modest Collection',
    banglaTitle: 'ঈদ ও উৎসবের আভিজাত্য',
    subtitle: 'প্রিমিয়াম দুবাই চেরি সিল্ক ও নিখুঁত কারচুপির সূক্ষ্ম শিল্পকর্ম',
    image: '/images/tiara-cover.png',
    link: '/category/abayas',
    buttonText: 'কালেকশন দেখুন',
    isBrandBanner: true,
  },
  {
    id: 2,
    badge: 'EID SPECIAL',
    title: 'Royal Handwork Festive Gowns',
    banglaTitle: 'রাজকীয় ফেস্টিভ গাউন কালেকশন',
    subtitle: 'খাঁটি অরগানজা ও সিল্কে তৈরি মনোমুগ্ধকর আধুনিক গাউন',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop',
    link: '/category/gowns',
    buttonText: 'গাউন দেখুন',
    isBrandBanner: false,
  },
  {
    id: 3,
    badge: 'BESTSELLER',
    title: 'Flowing French Chiffon Khimars',
    banglaTitle: 'ফ্রেঞ্চ শিফন খিমার ও হিজাব সেট',
    subtitle: 'পরম আরামদায়ক, অ্যান্টি-স্লিপ ফ্যাব্রিক ও চমৎকার কাটিং',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1600&auto=format&fit=crop',
    link: '/category/hijabs',
    buttonText: 'খিমার কালেকশন',
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
              {/* Slide Image / Background */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={slide.isBrandBanner ? 'object-cover sm:object-contain object-center' : 'object-cover object-center'}
                />

                {/* Soft gradient overlay for text readability when not brand banner */}
                {!slide.isBrandBanner && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#590F23]/80 via-[#590F23]/40 to-transparent flex items-center">
                    <div className="px-6 sm:px-12 md:px-16 max-w-xl text-white space-y-3 sm:space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FDEEF2] text-xs font-semibold tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#E7BA83]" />
                        <span>{slide.badge}</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
                        {slide.banglaTitle}
                      </h2>
                      <p className="text-xs sm:text-base text-[#FDEEF2]/90 font-light max-w-md line-clamp-2">
                        {slide.subtitle}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={slide.link}
                          className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white text-[#590F23] font-semibold text-xs sm:text-sm hover:bg-[#F7D6DE] transition-all shadow-md active:scale-95"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{slide.buttonText}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* For Brand Banner slide: Subtle floating CTA */}
                {slide.isBrandBanner && (
                  <div className="absolute bottom-3 right-4 sm:bottom-6 sm:right-8 z-20">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#590F23] text-white font-medium text-xs sm:text-sm hover:bg-[#721631] transition-all shadow-lg active:scale-95 tiara-pulse-ring"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E7BA83]" />
                      <span>কালেকশন দেখুন</span>
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
