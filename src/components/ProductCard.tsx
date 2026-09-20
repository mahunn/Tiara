'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openQuickOrder } = useStore();
  const mainImage = product.images[0];
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const colorCount = product.colors?.length || 0;

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#F7D6DE]/70 tiara-card-hover tiara-card-shadow flex flex-col transition-all duration-300">
      
      {/* 1. Image Container */}
      <Link 
        href={`/product/${product.id}`} 
        className="block relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#FAF1F4]"
      >
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.discountBadge ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#590F23] backdrop-blur-xs shadow-xs border border-[#F7D6DE]">
              {product.discountBadge}
            </span>
          ) : discountAmount > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#590F23] text-white shadow-xs">
              ৳{discountAmount} ছাড়
            </span>
          ) : null}
        </div>

        {/* Color Count Pill (Bottom right of image) */}
        {colorCount > 1 && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A8B8]"></span>
            <span>{colorCount} কালার</span>
          </div>
        )}
      </Link>

      {/* 2. Clean Product Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Bengali Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#590F23] transition-colors">
            <h3 className="font-serif font-bold text-[#241117] text-xs sm:text-sm md:text-base line-clamp-1">
              {product.banglaName || product.name}
            </h3>
          </Link>

          {/* Color preview dots on hover / mobile */}
          {colorCount > 1 && (
            <div className="flex items-center gap-1 mt-1.5">
              {product.colors.slice(0, 5).map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 flex-shrink-0"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {colorCount > 5 && (
                <span className="text-[10px] text-[#7A5763] font-medium">+{colorCount - 5}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-base md:text-lg font-bold text-[#590F23]">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-xs text-[#7A5763] line-through font-medium">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* 3. Clean 1-Tap Order Button */}
        <div className="mt-2.5 pt-2 border-t border-[#F7D6DE]/50">
          <button
            onClick={() => openQuickOrder(product)}
            className="w-full min-h-[38px] sm:min-h-[42px] py-2 px-2.5 rounded-xl bg-[#590F23] hover:bg-[#721631] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-97 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#E7BA83] fill-current" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
