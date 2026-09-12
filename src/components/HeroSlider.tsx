'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/images/tiara-cover.png',
    link: '/category/hijab',
    isBrandBanner: true,
  },
  {
    id: 2,
    title: 'বেক্সি বয়েল নামাজের হিজাব',
    image: '/images/products/prayer-hijab-all-1.jpg',
    link: '/category/hijab',
    isBrandBanner: false,
  },
  {
    id: 3,
    title: 'লেইস ইনার ক্যাপ ও হিজাব পিন',
    image: '/images/products/inner-cap-lace.jpg',
    link: '/category/inner-cap',
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
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg aspect-[16/9] sm:aspect-[21/9] max-h-[500px] bg-[#F8DAE1]">
          {SLIDES.map((slide, index) => (
            <Link
              key={slide.id}
              href={slide.link}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out block ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Image */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt="TIARA"
                  fill
                  priority={index === 0}
                  className={slide.isBrandBanner ? 'object-cover sm:object-contain object-center' : 'object-cover object-center'}
                />

                {/* Clean Subtle Title on photo slides */}
                {!slide.isBrandBanner && slide.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-10">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-md">
                      {slide.title}
                    </h2>
                  </div>
                )}
              </div>
            </Link>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#590F23] flex items-center justify-center backdrop-blur-xs shadow-md transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#590F23] flex items-center justify-center backdrop-blur-xs shadow-md transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Clean Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(idx);
                }}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'w-6 bg-[#590F23]'
                    : 'w-1.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
