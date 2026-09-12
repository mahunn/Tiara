'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Zap, 
  ShoppingBag, 
  ChevronRight, 
  MessageCircle,
  Phone,
  Check
} from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = PRODUCTS.find((p) => p.id === id);

  const { openQuickOrder, addToCart } = useStore();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleWhatsAppChat = () => {
    const message = `হ্যালো TIARA, আমি এই প্রোডাক্ট সম্পর্কে জানতে চাই:\n${product.name}\nমূল্য: ৳${product.price}\nসাইজ: ${selectedSize}`;
    window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen tiara-bg-pattern py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#7A5763] mb-6">
          <Link href="/" className="hover:text-[#590F23] transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${product.category}`} className="hover:text-[#590F23] transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#590F23] font-semibold truncate max-w-[200px]">
            {product.banglaName || product.name}
          </span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl p-5 sm:p-8 border border-[#F7D6DE] shadow-lg mb-12">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#FAF1F4] border border-[#F7D6DE] shadow-xs">
              <Image
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-top"
              />
              {product.discountBadge && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white bg-[#590F23] rounded-full shadow-md">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImgIdx === idx
                        ? 'border-[#590F23] ring-1 ring-[#590F23]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="thumb" fill className="object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Order Box */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Rating & Stock */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-bold text-[#241117]">{product.rating}</span>
                  <span className="text-[#7A5763]">({product.reviewCount} টি ভেরিফাইড রিভিউ)</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                  ইন স্টক • রেডি ডেলিভারি
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241117]">
                {product.banglaName || product.name}
              </h1>
              <p className="text-xs text-[#7A5763] mt-1">{product.name}</p>

              {/* Price */}
              <div className="my-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#590F23]">
                  ৳ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#7A5763] line-through">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] text-xs sm:text-sm text-[#241117] leading-relaxed space-y-2">
                <p>{product.description}</p>
                {product.fabric && (
                  <p className="pt-2 border-t border-[#F7D6DE] text-xs">
                    <span className="font-bold text-[#590F23]">ফেব্রিক স্পেসিফিকেশন:</span> {product.fabric}
                  </p>
                )}
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#241117]">
                    সাইজ নির্বাচন করুন:
                  </label>
                  <span className="text-[11px] text-[#590F23] underline cursor-pointer">
                    সাইজ গাইড
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        selectedSize === s
                          ? 'border-[#590F23] bg-[#590F23] text-white shadow-xs'
                          : 'border-[#F7D6DE] bg-white text-[#241117] hover:bg-[#FAF1F4]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-[#241117] mb-2">
                  কালার: <span className="text-[#590F23] font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-2.5 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border transition-all ${
                        selectedColor === c.name
                          ? 'border-[#590F23] bg-[#FAF1F4] font-bold text-[#590F23] ring-1 ring-[#590F23]'
                          : 'border-[#F7D6DE] bg-white text-[#7A5763]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-[#241117]">পরিমাণ:</span>
                <div className="flex items-center border border-[#F7D6DE] bg-[#FAF1F4] rounded-xl px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 text-[#590F23] font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#241117]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 text-[#590F23] font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: 1-Click Order + Bag */}
            <div className="space-y-2.5 pt-4 border-t border-[#F7D6DE]">
              <button
                onClick={() => openQuickOrder(product, selectedSize, selectedColor)}
                className="w-full py-3.5 rounded-2xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 tiara-pulse-ring cursor-pointer"
              >
                <Zap className="w-5 h-5 text-[#E7BA83] fill-current" />
                <span>সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-2xl bg-[#FAF1F4] hover:bg-[#F7D6DE] text-[#590F23] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#F7D6DE] transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? '✓ ব্যাগে যোগ হয়েছে' : 'শপিং ব্যাগে যোগ করুন'}</span>
              </button>

              {/* WhatsApp & Messenger Support */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপ অর্ডার</span>
                </button>
                <a
                  href="https://m.me/tiarabd"
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>মেসেঞ্জারে নক দিন</span>
                </a>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F7D6DE] text-center text-[11px] text-[#7A5763]">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#590F23] mb-1" />
                <span>হোম ডেলিভারি</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#590F23] mb-1" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-[#590F23] mb-1" />
                <span>সহজ এক্সচেঞ্জ</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241117] mb-4">
              আরও পছন্দ হতে পারে
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
