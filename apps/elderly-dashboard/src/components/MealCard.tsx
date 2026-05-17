"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { Meal } from '../models/dashboard';

interface MealCardProps {
  meals: Meal[];
}

export const MealCard: React.FC<MealCardProps> = ({ meals }) => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-center px-4 mb-4">
        <h3 className="text-base font-bold text-gray-700">Popular Meals</h3>
        <span className="text-xs text-forest font-semibold cursor-pointer">View all &gt;</span>
      </div>

      <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar">
        {meals.map((m, i) => (
          <div key={i} className="min-w-[240px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 bg-gray-100 relative">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <img 
                  src={`https://source.unsplash.com/featured/?${m.dish.toLowerCase().replace(' ', ',')}`} 
                  alt={m.dish}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-bold text-gray-700">4.8</span>
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <h4 className="text-[15px] font-bold text-gray-700 leading-tight">{m.dish}</h4>
              <p className="text-[13px] text-gray-500 mt-1 mb-2 line-clamp-1">{m.th} · {m.note}</p>
              
              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs font-bold text-forest">FREE</span>
                <button className="bg-forest text-white border-none rounded-lg px-4 py-1.5 text-[11px] font-bold cursor-pointer hover:opacity-90 transition-opacity">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
