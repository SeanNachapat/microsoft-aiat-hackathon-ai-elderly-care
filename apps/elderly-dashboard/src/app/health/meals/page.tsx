"use client";

import React from 'react';
import { SubPageHeader } from '../../../components/SubPageHeader';
import { useMeals } from '../../../hooks/useMeals';
import { Utensils, Flame, Coffee, Moon } from 'lucide-react';

export default function MealsPage() {
  const { meals } = useMeals();

  return (
    <div className="flex flex-col px-5 pb-8">
      <SubPageHeader titleTh="โภชนาการ" titleEn="Nutrition Log" />
      
      {/* Daily Summary */}
      <div className="bg-forest rounded-[24px] p-6 text-white mb-6 flex justify-between items-center shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs opacity-70 uppercase tracking-widest font-bold">แคลอรี่วันนี้</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black">1,240</span>
            <span className="text-sm opacity-70">kcal</span>
          </div>
        </div>
        <div className="w-14 h-14 rounded-full border-4 border-white/20 border-t-white flex items-center justify-center text-[10px] font-bold">
          75%
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-700 mb-4">ตารางอาหารวันนี้ (Today's Menu)</h3>
      
      <div className="flex flex-col gap-4">
        {meals.map((m, i) => (
          <div key={i} className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
               <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${m.dish}&backgroundColor=1A3D34`} 
                  alt={m.dish}
                  className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-forest uppercase tracking-tighter">{m.th}</span>
                <span className="text-[10px] text-gray-400 font-medium">08:30 AM</span>
              </div>
              <h4 className="text-[15px] font-bold text-gray-800 leading-tight mt-0.5">{m.dish}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{m.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-sky-light rounded-[24px] p-6 border border-sky/10">
        <h4 className="text-sm font-bold text-sky mb-2 flex items-center gap-2">
          <Coffee size={16} />
          <span>คำแนะนำจากนักโภชนาการ</span>
        </h4>
        <p className="text-[13px] text-sky/80 leading-relaxed">
          วันนี้ควรดื่มน้ำเพิ่มอีก 2 แก้ว และเลี่ยงอาหารที่มีโซเดียมสูงเพื่อรักษาระดับความดันโลหิตให้คงที่
        </p>
      </div>
    </div>
  );
}
