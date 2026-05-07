import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, color }) => (
  <div className="bg-slate-50 rounded-2xl p-4 text-center">
    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
    <span className={`text-xl font-black ${color}`}>{value}</span>
    {unit && <p className="text-[9px] font-bold text-slate-400 mt-0.5">{unit}</p>}
  </div>
);
