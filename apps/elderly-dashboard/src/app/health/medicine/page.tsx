"use client";

import React from 'react';
import { SubPageHeader } from '../../../components/SubPageHeader';
import { Pill, Clock, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';

export default function MedicinePage() {
  const medicines = [
    { name: 'Amlodipine', th: 'ยาลดความดัน', dosage: '5mg', time: '08:00 AM', status: 'taken', type: 'pill' },
    { name: 'Metformin', th: 'ยาเบาหวาน', dosage: '500mg', time: '08:00 AM', status: 'taken', type: 'pill' },
    { name: 'Fish Oil', th: 'น้ำมันปลา', dosage: '1000mg', time: '12:00 PM', status: 'pending', type: 'capsule' },
    { name: 'Atorvastatin', th: 'ยาลดไขมัน', dosage: '20mg', time: '08:00 PM', status: 'upcoming', type: 'pill' },
  ];

  return (
    <div className="flex flex-col px-5 pb-8">
      <SubPageHeader titleTh="รายการยา" titleEn="Medication Tracker" />
      
      {/* Alert Banner for Next Dose */}
      <div className="bg-amber-light rounded-[24px] p-5 border border-amber/20 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber text-white flex items-center justify-center shadow-lg shadow-amber/20">
           <Clock size={24} />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">มื้อถัดไป (Next Dose)</span>
          <h4 className="text-[15px] font-bold text-gray-800">Fish Oil · 12:00 PM</h4>
        </div>
        <button className="bg-amber text-white border-none rounded-lg px-3 py-2 text-[10px] font-bold shadow-sm">
          แจ้งเตือน
        </button>
      </div>

      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-base font-bold text-gray-700">รายการยาวันนี้</h3>
        <div className="text-xs text-forest font-semibold flex items-center gap-1 cursor-pointer">
           <Pill size={14} />
           <span>จัดการยา</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {medicines.map((m, i) => (
          <div key={i} className={`bg-white rounded-[24px] p-5 border shadow-sm flex items-center justify-between transition-all ${
            m.status === 'taken' ? 'border-sage/10 opacity-70' : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                m.status === 'taken' ? 'bg-sage-light text-sage' : 
                m.status === 'pending' ? 'bg-amber-light text-amber animate-pulse' : 'bg-gray-100 text-gray-400'
              }`}>
                {m.status === 'taken' ? <CheckCircle2 size={24} /> : <Pill size={24} />}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-bold text-gray-800 leading-tight">{m.name}</h4>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold">{m.dosage}</span>
                </div>
                <span className="text-xs text-gray-400 mt-0.5">{m.th} · {m.time}</span>
              </div>
            </div>
            
            <button className="p-2 text-gray-300 hover:text-gray-500 transition-colors">
               <MoreHorizontal size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* SOS/Emergency Contact */}
      <div className="mt-8 flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
        <AlertCircle size={18} className="text-gray-400" />
        <p className="text-xs text-gray-500">
          หากมีอาการแพ้ยาหรือลืมทานยาเกิน 2 มื้อ โปรดติดต่อเจ้าหน้าที่ทันที
        </p>
      </div>
    </div>
  );
}
