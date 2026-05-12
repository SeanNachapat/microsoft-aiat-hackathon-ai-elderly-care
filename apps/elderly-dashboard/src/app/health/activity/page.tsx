"use client";

import React from 'react';
import { SubPageHeader } from '../../../components/SubPageHeader';
import { Footprints, Timer, Flame, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ActivityPage() {
  const activities = [
    { title: 'เดินยามเช้า', sub: 'Morning Walk', time: '07:30', duration: '20 min', status: 'completed' },
    { title: 'กายภาพบำบัดแขน', sub: 'Arm PT', time: '10:00', duration: '15 min', status: 'completed' },
    { title: 'ยืดเหยียดก่อนนอน', sub: 'Evening Stretch', time: '20:00', duration: '10 min', status: 'pending' },
  ];

  return (
    <div className="flex flex-col px-5 pb-8">
      <SubPageHeader titleTh="กิจกรรม" titleEn="Physical Activity" />
      
      {/* Steps Counter */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col items-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Footprints size={120} />
        </div>
        
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ก้าวเดินวันนี้</span>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-black text-forest tracking-tighter">4,820</span>
          <span className="text-lg font-bold text-gray-300">/ 6,000</span>
        </div>
        
        <div className="w-full h-2 bg-gray-100 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-forest rounded-full" style={{ width: '80%' }} />
        </div>

        <div className="grid grid-cols-2 w-full mt-8 gap-4 border-t border-gray-50 pt-6">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase">แคลอรี่</span>
            <div className="flex items-center gap-1 mt-1 text-coral font-bold">
               <Flame size={14} />
               <span>185 kcal</span>
            </div>
          </div>
          <div className="flex flex-col items-center border-l border-gray-50">
            <span className="text-[10px] font-bold text-gray-400 uppercase">เวลาที่เคลื่อนไหว</span>
            <div className="flex items-center gap-1 mt-1 text-sky font-bold">
               <Timer size={14} />
               <span>35 min</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-700 mb-4">ตารางออกกำลังกาย (Workout Plan)</h3>
      
      <div className="flex flex-col gap-4">
        {activities.map((a, i) => (
          <div key={i} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${a.status === 'completed' ? 'bg-sage-light text-sage' : 'bg-gray-100 text-gray-400'}`}>
                {a.status === 'completed' ? <CheckCircle2 size={24} /> : <Timer size={24} />}
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] font-bold text-gray-800 leading-tight">{a.title}</h4>
                <span className="text-xs text-gray-400 mt-0.5">{a.sub} · {a.time}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-forest">{a.duration}</span>
              <ChevronRight size={14} className="text-gray-300 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
