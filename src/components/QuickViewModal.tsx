'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, Zap, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, openQuickOrder, addToCart } = useStore();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedImgIdx(0);
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Standard');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#F7D6DE] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#7A5763] shadow-sm transition-all"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Gallery */}
        <div className="w-full md:w-1/2 p-4 bg-[#FAF1F4] flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-[#F7D6DE]">
            <Image
              src={quickViewProduct.images[selectedImgIdx] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`relative w-14 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImgIdx === idx
                      ? 'border-[#590F23] ring-1 ring-[#590F23]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Action */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-[#241117]">{quickViewProduct.rating}</span>
              <span className="text-xs text-[#7A5763]">({quickViewProduct.reviewCount} কাস্টমার রিভিউ)</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241117]">
              {quickViewProduct.banglaName || quickViewProduct.name}
            </h3>
            <p className="text-xs text-[#7A5763] mt-0.5">{quickViewProduct.name}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-2xl font-bold text-[#590F23]">
                ৳ {quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#7A5763] line-through">
                  ৳ {quickViewProduct.originalPrice.toLocaleString()}
                </span>
              )}
              {quickViewProduct.discountBadge && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#590F23] rounded-full">
                  {quickViewProduct.discountBadge}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#241117] leading-relaxed line-clamp-3">
              {quickViewProduct.description}
            </p>

            {quickViewProduct.fabric && (
              <p className="text-xs text-[#7A5763] mt-2">
                <span className="font-semibold text-[#241117]">ফেব্রিক:</span> {quickViewProduct.fabric}
              </p>
            )}

            {/* Size Selector */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#241117] mb-1.5">
                সাইজ নির্বাচন করুন:
              </label>
              <div className="flex gap-2 flex-wrap">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                      selectedSize === s
                        ? 'border-[#590F23] bg-[#590F23] text-white'
                        : 'border-[#F7D6DE] bg-[#FAF1F4] text-[#241117] hover:bg-[#F7D6DE]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-3">
              <label className="block text-xs font-bold text-[#241117] mb-1.5">
                কালার: <span className="font-normal text-[#590F23]">{selectedColor}</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-xl border transition-all ${
                      selectedColor === c.name
                        ? 'border-[#590F23] bg-[#FAF1F4] font-bold text-[#590F23]'
                        : 'border-[#F7D6DE] bg-white text-[#7A5763]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Order & Add to Bag CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#F7D6DE]">
            <button
              onClick={() => {
                setQuickViewProduct(null);
                openQuickOrder(quickViewProduct, selectedSize, selectedColor);
              }}
              className="w-full py-3 rounded-2xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <Zap className="w-4 h-4 text-[#E7BA83] fill-current" />
              <span>সরাসরি অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
            </button>

            <button
              onClick={() => {
                addToCart(quickViewProduct, selectedSize, selectedColor);
                setQuickViewProduct(null);
              }}
              className="w-full py-2.5 rounded-2xl bg-[#FAF1F4] hover:bg-[#F7D6DE] text-[#590F23] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#F7D6DE] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>শপিং ব্যাগে রাখুন</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-800 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
