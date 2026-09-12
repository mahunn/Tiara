import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, Sparkles } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);

  return (
    <div className="min-h-screen tiara-bg-pattern py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#7A5763] mb-6">
          <Link href="/" className="hover:text-[#590F23] transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#590F23] font-semibold">{category.banglaName}</span>
        </div>

        {/* Category Header Banner with Floral Texture */}
        <div className="relative rounded-3xl overflow-hidden tiara-banner-pattern border border-[#F7D6DE] shadow-md p-6 sm:p-10 mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[#590F23] text-xs font-semibold mb-3 border border-[#F7D6DE]">
            <Sparkles className="w-3.5 h-3.5 text-[#C68E4D]" />
            <span>এক্সক্লুসিভ কালেকশন</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#590F23]">
            {category.banglaName} ({category.name})
          </h1>
          {category.description && (
            <p className="text-xs sm:text-sm text-[#241117]/80 max-w-lg mx-auto mt-2 font-light">
              {category.description}
            </p>
          )}
          <p className="text-xs text-[#7A5763] mt-3">
            মোট {categoryProducts.length} টি এক্সক্লুসিভ ডিজাইন পাওয়া যাচ্ছে
          </p>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F7D6DE] p-8">
            <h3 className="font-serif text-lg font-bold text-[#241117]">
              এই ক্যাটাগরিতে নতুন স্টক শীঘ্রই যুক্ত হচ্ছে!
            </h3>
            <p className="text-xs text-[#7A5763] mt-1">
              আমাদের ফেসবুক পেজ ও মেসেঞ্জারে নক দিয়ে কাস্টম অর্ডার করতে পারেন।
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-block px-6 py-2.5 rounded-full bg-[#590F23] text-white text-xs font-semibold hover:bg-[#721631]"
              >
                অন্যান্য কালেকশন দেখুন
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
