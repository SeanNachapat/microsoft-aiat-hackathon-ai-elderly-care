"use client";

import React from 'react';
import { Heart, Thermometer, Wind, Droplets, ChevronRight, Activity } from 'lucide-react';
import { Metric } from '../models/dashboard';
import Link from 'next/link';

interface HealthCardProps {
  metrics: Metric[];
}

const iconMap: Record<string, React.ReactNode> = {
  'อัตราการเต้นหัวใจ': <Heart size={20} />,
  'ความดันโลหิต': <Activity size={20} />,
  'ระดับออกซิเจน': <Wind size={20} />,
  'อุณหภูมิร่างกาย': <Thermometer size={20} />,
};

const colorMap: Record<string, string> = {
  'อัตราการเต้นหัวใจ': 'text-coral bg-coral-light',
  'ความดันโลหิต': 'text-sky bg-sky-light',
  'ระดับออกซิเจน': 'text-sage bg-sage-light',
  'อุณหภูมิร่างกาย': 'text-amber bg-amber-light',
};

export const HealthCard: React.FC<HealthCardProps> = ({ metrics }) => {
  return (
    <div className="px-5 pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-700">Health Metrics</h3>
        <span className="text-xs text-forest font-semibold cursor-pointer">Details &gt;</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <Link href="/health" key={i} className="no-underline">
            <div className="bg-white rounded-[20px] p-4 border border-gray-100 flex items-center gap-3 shadow-sm hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[m.th] || 'bg-gray-100 text-gray-400'}`}>
                {iconMap[m.th] || <Activity size={20} />}
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <span className="text-[15px] font-bold text-gray-700 truncate">{m.th}</span>
                <span className={`text-[13px] font-semibold ${m.statusType === 'critical' ? 'text-coral' : 'text-gray-500'}`}>
                  {m.value}
                </span>
              </div>
              <ChevronRight size={14} className="text-gray-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
