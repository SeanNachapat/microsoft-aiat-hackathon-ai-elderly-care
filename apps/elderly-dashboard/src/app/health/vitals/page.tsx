"use client";

import React from 'react';
import { SubPageHeader } from '../../../components/SubPageHeader';
import { useHealthMetrics } from '../../../hooks/useHealthMetrics';
import { Heart, Activity, Wind, Thermometer, TrendingUp } from 'lucide-react';

export default function VitalsPage() {
  const { metrics } = useHealthMetrics();

  const iconMap: Record<string, React.ReactNode> = {
    'ชีพจร': <Heart size={24} />,
    'ความดัน': <Activity size={24} />,
    'ออกซิเจน': <Wind size={24} />,
    'อุณหภูมิ': <Thermometer size={24} />,
  };

  const colorMap: Record<string, string> = {
    'ชีพจร': 'bg-coral-light text-coral',
    'ความดัน': 'bg-sky-light text-sky',
    'ออกซิเจน': 'bg-sage-light text-sage',
    'อุณหภูมิ': 'bg-amber-light text-amber',
  };

  return (
    <div className="flex flex-col px-5 pb-8">
      <SubPageHeader titleTh="ข้อมูลสุขภาพ" titleEn="Vitals Monitoring" />
      
      <div className="flex flex-col gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[m.th] || 'bg-gray-100 text-gray-400'}`}>
                  {iconMap[m.th] || <Activity size={24} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">{m.en}</span>
                  <h3 className="text-xl font-bold text-gray-800">{m.th}</h3>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                m.statusType === 'critical' ? 'bg-coral-light text-coral' : 
                m.statusType === 'warning' ? 'bg-amber-light text-amber' : 'bg-sage-light text-sage'
              }`}>
                {m.statusTh}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-800 tracking-tight">{m.value.split(' ')[0]}</span>
                <span className="text-sm font-bold text-gray-400">{m.value.split(' ').slice(1).join(' ')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sage text-xs font-bold">
                <TrendingUp size={14} />
                <span>ปกติในช่วง 7 วัน</span>
              </div>
            </div>

            {/* Mock Sparkline/Chart Area */}
            <div className="h-12 w-full bg-gray-50 rounded-xl flex items-end gap-1 px-3 py-2">
              {[40, 70, 45, 90, 65, 80, 50, 60, 40, 75].map((h, idx) => (
                <div key={idx} className="flex-1 bg-gray-200 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
