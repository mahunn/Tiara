'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openQuickOrder } = useStore();
  const mainImage = product.images[0];

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#F7D6DE]/70 tiara-card-hover tiara-card-shadow flex flex-col">
      {/* 1. Image Container */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] w-full overflow-hidden bg-[#FAF1F4]">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* 2. Clean Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#590F23] transition-colors">
            <h3 className="font-serif font-bold text-[#241117] text-sm sm:text-base line-clamp-1">
              {product.banglaName || product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
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

        {/* 3. Clean Order Button */}
        <div className="mt-3 pt-2 border-t border-[#F7D6DE]/40">
          <button
            onClick={() => openQuickOrder(product)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#590F23] hover:bg-[#721631] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
