"use client";

import React from 'react';
import { Search, Sparkles, ChevronRight, Activity, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      
      {/* 1. Integrated Dark Green Header Section */}
      <div className="bg-forest px-5 pt-0 pb-10 rounded-b-[32px] flex flex-col gap-6 border-none animate-flow-down mt-[-1px]">
        
        {/* Search Bar */}
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-forest transition-colors" />
          <input 
            type="text" 
            placeholder="Search for help or wellness tips..." 
            className="w-full h-12 rounded-xl border-none bg-white pl-12 text-sm outline-none shadow-sm focus:shadow-md transition-shadow"
          />
        </div>

        {/* Hero Section: Greeting & Banner */}
        <div className="flex items-center justify-between gap-5">
          <div className="flex-1 text-white">
            <h1 className="text-2xl font-extrabold leading-tight" style={{ color: '#FFFFFF' }}>
              สวัสดีครับ<br />คุณเทียม!
            </h1>
            <p className="text-[11px] opacity-80 mt-2 mb-4">
              วันนี้คุณรู้สึกอย่างไรบ้างครับ? ผมพร้อมช่วยเหลือเสมอ
            </p>
            <button className="bg-white text-forest border-none rounded-lg px-5 py-2.5 text-[13px] font-bold cursor-pointer hover:bg-white/90 transition-colors">
              เช็คอินสุขภาพ · Check-in
            </button>
          </div>
          
          {/* Illustration Placeholder */}
          <div className="w-[120px] h-[120px] bg-white/10 rounded-[20px] flex items-center justify-center">
            <Sparkles size={60} className="text-sky" />
          </div>
        </div>

        {/* Status Widgets Area (New) */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {/* Pill Reminder */}
          <Link href="/health/medicine" className="no-underline">
            <div className="bg-white rounded-2xl p-3 border border-amber/10 flex flex-col gap-1 hover:shadow-md transition-all cursor-pointer active:scale-95 shadow-sm">
              <div className="flex items-center gap-1.5 text-amber text-[10px] font-bold uppercase tracking-wider">
                 <Clock size={12} />
                 <span>ยาถัดไป (Next Pill)</span>
              </div>
              <span className="text-gray-800 text-[13px] font-bold mt-1">Fish Oil · 12:00</span>
              <span className="text-gray-400 text-[10px]">1000mg · หลังอาหาร</span>
            </div>
          </Link>

          {/* Health Summary */}
          <Link href="/health/vitals" className="no-underline">
            <div className="bg-white rounded-2xl p-3 border border-sky/10 flex flex-col gap-1 hover:shadow-md transition-all cursor-pointer active:scale-95 shadow-sm">
              <div className="flex items-center gap-1.5 text-sky text-[10px] font-bold uppercase tracking-wider">
                 <Activity size={12} />
                 <span>คะแนนวันนี้ (Health)</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-gray-800 text-[15px] font-black">92</span>
                <span className="text-gray-400 text-[10px]">/ 100</span>
              </div>
              <span className="text-sage text-[10px] font-bold">4,820 ก้าว (Steps)</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 2. Categories / Quick Actions Section */}
      <div className="px-5 pt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-bold text-gray-700">Quick Actions</h3>
          <span className="text-xs text-forest font-semibold cursor-pointer">View all &gt;</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <QuickActionCard 
            icon={<ShieldCheck size={20} />} 
            labelTh="แจ้งขอความช่วยเหลือ" 
            labelEn="SOS Help" 
            path="/sos" 
            color="coral"
          />
          <QuickActionCard 
            icon={<Activity size={20} />} 
            labelTh="ดูรายงานสุขภาพ" 
            labelEn="Health Report" 
            path="/health" 
            color="sage"
          />
          <QuickActionCard 
            icon={<Clock size={20} />} 
            labelTh="แผนงานวันนี้" 
            labelEn="Daily Tasks" 
            path="/schedule" 
            color="sky"
          />
          <QuickActionCard 
            icon={<Sparkles size={20} />} 
            labelTh="คุยกับ AI" 
            labelEn="Chat AI" 
            path="/chat" 
            color="amber"
          />
        </div>
      </div>

    </div>
  );
}

const QuickActionCard = ({ icon, labelTh, labelEn, path, color }: { icon: any, labelTh: string, labelEn: string, path: string, color: string }) => {
  // Map color name to Tailwind class prefix
  const bgClasses: Record<string, string> = {
    coral: 'bg-coral-light text-coral',
    sage: 'bg-sage-light text-sage',
    sky: 'bg-sky-light text-sky',
    amber: 'bg-amber-light text-amber',
  };

  return (
    <Link href={path} className="no-underline">
      <div className="bg-white rounded-[20px] p-4 border border-gray-100 flex items-center gap-3 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgClasses[color]}`}>
          {icon}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <span className="text-[13px] font-bold text-gray-700 leading-tight">{labelTh}</span>
          <span className="text-[10px] text-gray-400">{labelEn}</span>
        </div>
        <ChevronRight size={14} className="text-gray-300" />
      </div>
    </Link>
  );
};
