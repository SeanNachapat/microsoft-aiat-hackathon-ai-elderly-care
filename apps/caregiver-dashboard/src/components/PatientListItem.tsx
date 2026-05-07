import React from 'react';
import { Patient } from '@healthcare/core';

interface PatientListItemProps {
  patient: Patient;
  isSelected: boolean;
  onClick: () => void;
}

export const PatientListItem: React.FC<PatientListItemProps> = ({ patient, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-2xl bg-white border transition-all flex items-center gap-3 ${
      isSelected 
        ? 'border-blue-200 shadow-md shadow-blue-50 ring-2 ring-blue-100' 
        : 'border-slate-100 hover:border-slate-200'
    }`}
  >
    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
      {patient.avatar || '👴'}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-black text-slate-800 truncate">{patient.name}</p>
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${patient.statusColor}`} />
      </div>
      <p className="text-[9px] font-bold text-slate-400 truncate">{patient.location}</p>
    </div>
    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600 flex-shrink-0`}>
      {patient.risk}
    </span>
  </button>
);
