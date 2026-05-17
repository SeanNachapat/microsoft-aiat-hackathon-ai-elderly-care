"use client";

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SubPageHeaderProps {
  titleEn: string;
}

export const SubPageHeader: React.FC<SubPageHeaderProps> = ({ titleEn }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 py-4 mb-4">
      <button 
        onClick={() => router.back()}
        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={24} className="text-forest" />
      </button>
      <div className="flex flex-col">
        <h2 className="text-2xl font-black text-gray-800 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{titleEn}</h2>
      </div>
    </div>
  );
};
