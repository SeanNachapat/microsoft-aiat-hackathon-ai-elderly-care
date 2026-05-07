import React from 'react';
import { HeartPulse } from 'lucide-react';

export const Header = () => (
  <header className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-[100] h-14">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#10b981] rounded-full flex items-center justify-center text-white shadow-md">
        <HeartPulse size={20} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-800 leading-tight">Healthcare 4 Elder</h1>
        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">AI-Driven Preventive Elderly Healthcare</p>
      </div>
      <div className="ml-3 px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-full flex items-center gap-2">
        <span className="text-[9px] font-semibold text-slate-500">Microsoft Azure</span>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xs font-bold text-slate-700">15 : 53 : 29</p>
        <p className="text-[9px] text-slate-400 font-medium">3 พ.ค. 2569</p>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-[9px] font-bold uppercase">LIVE</span>
      </div>
    </div>
  </header>
);
