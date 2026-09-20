'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

interface CategoryProductViewProps {
  products: Product[];
  categoryId: string;
}

export default function CategoryProductView({ products, categoryId }: CategoryProductViewProps) {
  const [selectedSubTab, setSelectedSubTab] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    if (categoryId !== 'hijab' || selectedSubTab === 'all') return true;
    return product.subCategory === selectedSubTab;
  });

  const cottonCount = products.filter((p) => p.subCategory === 'cotton-tassel').length;
  const leopardCount = products.filter((p) => p.subCategory === 'leopard-pleated').length;
  const prayerCount = products.filter((p) => p.subCategory === 'prayer-hijab').length;

  return (
    <div>
      {/* Subcategory Tabs for Hijab Category (Mobile Horizontal Scrolling) */}
      {categoryId === 'hijab' && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          <button
            type="button"
            onClick={() => setSelectedSubTab('all')}
            className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedSubTab === 'all'
                ? 'bg-[#590F23] text-white shadow-xs'
                : 'bg-white text-[#7A5763] hover:bg-[#FAF1F4] border border-[#F7D6DE]'
            }`}
          >
            সকল হিজাব ({products.length})
          </button>

          {leopardCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSubTab('leopard-pleated')}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubTab === 'leopard-pleated'
                  ? 'bg-[#590F23] text-white shadow-xs'
                  : 'bg-white text-[#7A5763] hover:bg-[#FAF1F4] border border-[#F7D6DE]'
              }`}
            >
              🐆 লেপার্ড প্লিটেড ({leopardCount})
            </button>
          )}

          {cottonCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSubTab('cotton-tassel')}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubTab === 'cotton-tassel'
                  ? 'bg-[#590F23] text-white shadow-xs'
                  : 'bg-white text-[#7A5763] hover:bg-[#FAF1F4] border border-[#F7D6DE]'
              }`}
            >
              🌷 ক্রেপ কটন টেসেল ({cottonCount})
            </button>
          )}

          {prayerCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSubTab('prayer-hijab')}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubTab === 'prayer-hijab'
                  ? 'bg-[#590F23] text-white shadow-xs'
                  : 'bg-white text-[#7A5763] hover:bg-[#FAF1F4] border border-[#F7D6DE]'
              }`}
            >
              বেক্সি বয়েল নামাজের হিজাব ({prayerCount})
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
