'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/mockData';

export default function CategoryPills() {
  return (
    <section className="py-4 sm:py-6 bg-white/70 border-b border-[#F7D6DE]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center group flex-shrink-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 border-2 border-[#F7D6DE] group-hover:border-[#590F23] transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:scale-105 bg-[#FAF1F4] overflow-hidden">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="mt-2 text-xs sm:text-sm font-medium text-[#241117] group-hover:text-[#590F23] transition-colors text-center">
                {cat.banglaName}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
