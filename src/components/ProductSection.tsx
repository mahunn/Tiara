'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  banglaTitle?: string;
  subtitle?: string;
  products: Product[];
  viewAllLink: string;
  bannerImage?: string;
}

export default function ProductSection({
  title,
  banglaTitle,
  subtitle,
  products,
  viewAllLink,
  bannerImage,
}: ProductSectionProps) {
  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Inspired by Anzaar Lifestyle) */}
        <div className="flex items-end justify-between mb-4 sm:mb-8 pb-2 border-b border-[#F7D6DE]/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#590F23] rounded-full"></span>
              <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#241117] uppercase">
                {title}
              </h2>
            </div>
            {banglaTitle && (
              <p className="text-xs sm:text-sm text-[#7A5763] font-light mt-0.5 ml-3.5">
                {banglaTitle} {subtitle ? `• ${subtitle}` : ''}
              </p>
            )}
          </div>

          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-[#590F23] bg-[#FAF1F4] hover:bg-[#F7D6DE] rounded-full border border-[#F7D6DE] transition-all whitespace-nowrap active:scale-95"
          >
            <span>সবগুলো দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Optional Section Banner */}
        {bannerImage && (
          <div className="mb-6 rounded-2xl overflow-hidden aspect-[21/6] relative shadow-md bg-[#F8DAE1]">
            <img
              src={bannerImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
