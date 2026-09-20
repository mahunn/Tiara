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
import { PRODUCTS, CATEGORIES, MESSENGER_URL } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  let product = PRODUCTS.find((p) => p.id === id || p.slug === id);
  if (!product && (id?.startsWith('tiara-crepe-cotton') || id?.includes('cotton-tassel'))) {
    product = PRODUCTS.find((p) => p.id === 'tiara-crepe-cotton-tassel-hijab');
  }
  if (!product && (id?.startsWith('tiara-prayer-hijab') || id?.includes('prayer-hijab') || id?.includes('bexi-boil'))) {
    product = PRODUCTS.find((p) => p.id === 'tiara-bexi-boil-prayer-hijab');
  }
  if (!product && (id?.startsWith('tiara-leopard') || id?.includes('leopard') || id?.includes('hijab-2'))) {
    product = PRODUCTS.find((p) => p.id === 'tiara-leopard-print-pleated-hijab');
  }

  const { openQuickOrder, addToCart } = useStore();

  const [activeImage, setActiveImage] = useState<string>(product?.images[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'বড় সাইজ (১৯৫/৮৫)');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Sync state if navigating between products
  React.useEffect(() => {
    if (product) {
      setActiveImage(product.images[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || 'বড় সাইজ (১৯৫/৮৫)');
    }
  }, [product?.id]);

  if (!product) {
    notFound();
  }

  const selectedColorObj = product.colors.find((c) => c.name === selectedColor);
  const activePrice = selectedColorObj?.price || product.price;
  const activeOriginalPrice = selectedColorObj?.originalPrice || product.originalPrice;

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Handle color selection: immediately switches main image to that color's photo
  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName);
    const colorObj = product.colors.find((c) => c.name === colorName);
    if (colorObj?.image) {
      setActiveImage(colorObj.image);
    }
  };

  // Handle thumbnail click: immediately switches main image and syncs color
  const handleSelectThumbnail = (img: string) => {
    setActiveImage(img);
    const matchingColor = product.colors.find((c) => c.image === img);
    if (matchingColor) {
      setSelectedColor(matchingColor.name);
    } else {
      setSelectedColor('');
    }
  };

  const activeColor = selectedColor || product.colors[0]?.name || 'স্ট্যান্ডার্ড';

  const handleAddToCart = () => {
    const productToAdd = activePrice !== product.price ? { ...product, price: activePrice } : product;
    addToCart(productToAdd, selectedSize, activeColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleWhatsAppChat = () => {
    const message = `হ্যালো TIARA, আমি এই প্রোডাক্ট সম্পর্কে জানতে চাই:\n${product.name}\nকালার: ${activeColor}\nমূল্য: ৳${activePrice}\nসাইজ: ${selectedSize}`;
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
          <Link href={`/category/${product.category}`} className="hover:text-[#590F23] transition-colors">
            {category?.banglaName || product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#590F23] font-semibold truncate max-w-[220px]">
            {product.banglaName || product.name}
          </span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl p-5 sm:p-8 border border-[#F7D6DE] shadow-sm mb-12">
          
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Big Main Image with Key for instant re-render */}
            <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF1F4] border border-[#F7D6DE] shadow-xs">
              <Image
                key={activeImage}
                src={activeImage || product.images[0]}
                alt={`${product.name} - ${selectedColor}`}
                fill
                priority
                className="object-cover object-top transition-all duration-300 animate-fadeIn"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Active Color / View Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-semibold text-[#590F23] shadow-xs border border-[#F7D6DE]">
                {selectedColorObj?.hex && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: selectedColorObj.hex }}
                  />
                )}
                <span>{selectedColor || 'সকল কালার ভিউ'}</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-[#7A5763] px-1">
                  <span>ফটো গ্যালারি ({product.images.length}টি ছবি)</span>
                  <span className="text-[#590F23] font-medium">ছবিতে ক্লিক করে কালার দেখুন</span>
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {product.images.map((img, idx) => {
                    const isSelected = activeImage === img;
                    const matchingColor = product.colors.find((c) => c.image === img);
                    return (
                      <button
                        key={img || idx}
                        type="button"
                        onClick={() => handleSelectThumbnail(img)}
                        className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#590F23] ring-2 ring-[#590F23]/40 shadow-sm scale-102 opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#F7D6DE]'
                        }`}
                        title={matchingColor?.name || (idx === 0 ? 'সকল কালার ওভারভিউ' : `ছবি ${idx + 1}`)}
                      >
                        <Image
                          src={img}
                          alt={matchingColor?.name || 'thumb'}
                          fill
                          className="object-cover object-top"
                          sizes="80px"
                        />
                        {idx === 0 && (
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] py-0.5 text-center font-medium">
                            সব কালার
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Details & Order Box (Anti-UI Slop: Clean, Minimal, Luxury) */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              {/* Header Status Badges */}
              <div className="flex items-center gap-2.5 flex-wrap text-xs mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-[#FAF1F4] text-[#590F23] border border-[#F7D6DE] text-[11px]">
                  ✨ নতুন কালেকশন
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  স্টকে আছে
                </span>
                <div className="flex items-center gap-1 text-[11px] text-[#7A5763] ml-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#241117]">{product.rating}</span>
                  <span>({product.reviewCount} রিভিউ)</span>
                </div>
              </div>

              {/* Title & English Subtitle */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#241117] tracking-tight">
                {product.banglaName || product.name}
              </h1>
              <p className="text-xs text-[#7A5763] font-medium tracking-wide uppercase mt-0.5">
                {product.name}
              </p>

              {/* Price Section */}
              <div className="my-3.5 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#590F23]">
                  ৳ {activePrice.toLocaleString()}
                </span>
                {activeOriginalPrice && (
                  <span className="text-base text-[#7A5763] line-through font-medium">
                    ৳ {activeOriginalPrice.toLocaleString()}
                  </span>
                )}
                {activeOriginalPrice && (
                  <span className="px-2 py-0.5 text-xs font-bold text-[#590F23] bg-[#FAF1F4] rounded-full border border-[#F7D6DE]">
                    ৳{(activeOriginalPrice - activePrice).toLocaleString()} ছাড়
                  </span>
                )}
              </div>

              {/* Editorial Short Description (Clean, Less Text) */}
              <p className="text-xs sm:text-sm text-[#4A3B40] leading-relaxed mb-3.5">
                {product.description}
              </p>

              {/* Quick Specs Chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {product.fabric && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF1F4] border border-[#F7D6DE] text-xs text-[#590F23] font-medium">
                    <span>🧵</span>
                    <span>{product.fabric}</span>
                  </div>
                )}
                {product.sizes?.[0] && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF1F4] border border-[#F7D6DE] text-xs text-[#590F23] font-medium">
                    <span>📐</span>
                    <span>{product.sizes[0]}</span>
                  </div>
                )}
                {product.subCategory === 'cotton-tassel' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF1F4] border border-[#F7D6DE] text-xs text-[#590F23] font-medium">
                    <span>🪵</span>
                    <span>কাঠের পুঁতি ও টেসেল</span>
                  </div>
                )}
              </div>

              {/* Color Selector (Luxury Swatch Chips) */}
              <div className="space-y-2 pt-3 border-t border-[#F7D6DE]/70">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#241117]">
                    কালার নির্বাচন করুন:
                  </label>
                  <span className="text-xs font-bold text-[#590F23]">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleSelectColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#590F23] bg-[#FAF1F4] font-bold text-[#590F23] ring-2 ring-[#590F23]/20 shadow-xs scale-102'
                            : 'border-[#F7D6DE] bg-white text-[#7A5763] hover:border-[#590F23]/50 hover:bg-[#FAF1F4]/50'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector (If multiple or single) */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#241117]">
                    সাইজ:
                  </label>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
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

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-[#241117]">পরিমাণ:</span>
                <div className="flex items-center border border-[#F7D6DE] bg-[#FAF1F4] rounded-xl px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 text-[#590F23] font-bold text-sm hover:opacity-75 transition-opacity"
                    aria-label="কমান"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#241117]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 text-[#590F23] font-bold text-sm hover:opacity-75 transition-opacity"
                    aria-label="বাড়ান"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: 1-Click Order + Bag */}
            <div className="space-y-2.5 pt-3 border-t border-[#F7D6DE]/70">
              <button
                onClick={() => {
                  const productToOrder = activePrice !== product.price ? { ...product, price: activePrice } : product;
                  openQuickOrder(productToOrder, selectedSize, activeColor);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-[#E7BA83] fill-current" />
                <span>সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 rounded-2xl bg-[#FAF1F4] hover:bg-[#F7D6DE] text-[#590F23] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#F7D6DE] transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? '✓ ব্যাগে যোগ হয়েছে' : 'শপিং ব্যাগে যোগ করুন'}</span>
              </button>

              {/* WhatsApp & Messenger Support */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপ অর্ডার</span>
                </button>
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>মেসেঞ্জারে নক দিন</span>
                </a>
              </div>
            </div>

            {/* Delivery & Reassurance Micro-Card (Replaces messy text box) */}
            <div className="p-3 rounded-2xl bg-[#FAF1F4]/70 border border-[#F7D6DE] text-xs text-[#7A5763] space-y-1.5">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                <span>
                  <strong className="text-[#241117]">ডেলিভারি চার্জ:</strong> চাঁদপুর সদর ৫০৳ • চাঁদপুরের বাহিরে ১২০৳
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                <span>
                  <strong className="text-[#241117]">ক্যাশ অন ডেলিভারি:</strong> প্রোডাক্ট হাতে পেয়ে মূল্য পরিশোধ করার সুবিধা
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#590F23] flex-shrink-0" />
                <span>
                  <strong className="text-[#241117]">সহজ এক্সচেঞ্জ:</strong> কোনো ত্রুটি বা সমস্যা হলে সহজ এক্সচেঞ্জ
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-[#F7D6DE]/70 text-[11px] text-[#7A5763]">
                <span className="text-xs">📍</span>
                <span>আলো এবং স্ক্রিনের সেটিংসের ওপর ভিত্তি করে রঙের সামান্য তারতম্য হতে পারে</span>
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
