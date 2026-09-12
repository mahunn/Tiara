'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Zap, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openQuickOrder, addToCart, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');

  const mainImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#F7D6DE]/70 tiara-card-hover tiara-card-shadow flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF1F4]">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : mainImage}
            alt={product.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountBadge && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[11px] font-bold text-white bg-[#590F23] rounded-full shadow-xs tracking-wider">
            {product.discountBadge}
          </span>
        )}

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#590F23] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
          title="কুইক ভিউ"
          aria-label="কুইক ভিউ"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Floating Quick Action Overlay on Mobile / Hover */}
        <div className="absolute bottom-2 inset-x-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            onClick={() => addToCart(product, selectedSize, selectedColor)}
            className="flex-1 py-2 px-2 bg-white/95 backdrop-blur-xs hover:bg-white text-[#590F23] text-xs font-semibold rounded-xl flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ব্যাগে রাখুন</span>
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[11px] font-semibold text-[#241117]">{product.rating}</span>
            <span className="text-[10px] text-[#7A5763]">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#590F23] transition-colors">
            <h3 className="font-serif font-bold text-[#241117] text-sm sm:text-base line-clamp-1">
              {product.banglaName || product.name}
            </h3>
            <p className="text-[11px] text-[#7A5763] line-clamp-1 mt-0.5">
              {product.name}
            </p>
          </Link>

          {/* Size Pills (Minimal & Cute) */}
          <div className="flex items-center gap-1 mt-2.5 flex-wrap">
            <span className="text-[10px] text-[#7A5763] font-medium mr-0.5">সাইজ:</span>
            {product.sizes.slice(0, 3).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-1.5 py-0.5 text-[10px] rounded-md font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-[#590F23] text-white'
                    : 'bg-[#FAF1F4] text-[#7A5763] hover:bg-[#F7D6DE]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-[#590F23]">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#7A5763] line-through">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* 3. Bangladeshi 1-Click Order Button ("সরাসরি অর্ডার") */}
        <div className="mt-3 pt-2 border-t border-[#F7D6DE]/50">
          <button
            onClick={() => openQuickOrder(product, selectedSize, selectedColor)}
            className="w-full py-2 px-3 rounded-xl bg-[#590F23] hover:bg-[#721631] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98"
          >
            <Zap className="w-3.5 h-3.5 text-[#E7BA83] fill-current" />
            <span>সরাসরি অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
