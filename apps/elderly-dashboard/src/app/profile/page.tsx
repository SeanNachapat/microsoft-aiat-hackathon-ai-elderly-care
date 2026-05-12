"use client";

import React from 'react';
import { User, Settings, LogOut, ChevronRight, Shield } from 'lucide-react';
import { SubPageHeader } from '../../components/SubPageHeader';

export default function ProfilePage() {
  const menuItems = [
    { icon: <User size={20} />, labelTh: 'ข้อมูลส่วนตัว', labelEn: 'Personal Info' },
    { icon: <Shield size={20} />, labelTh: 'ความปลอดภัย', labelEn: 'Security' },
    { icon: <Settings size={20} />, labelTh: 'ตั้งค่า', labelEn: 'Settings' },
    { icon: <LogOut size={20} className="text-coral" />, labelTh: 'ออกจากระบบ', labelEn: 'Logout', isLast: true },
  ];

  return (
    <div className="flex flex-col px-5 pb-8 animate-fade-in">
      <SubPageHeader titleTh="โปรไฟล์" titleEn="User Profile" />

      {/* Profile Summary */}
      <div className="bg-forest rounded-[24px] p-8 text-white mb-6 flex flex-col items-center shadow-lg relative overflow-hidden">
        <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden mb-4 shadow-inner">
           <img src="/elderly-avatar.png" alt="avatar" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold">คุณเทียม มั่นคง</h3>
        <span className="text-xs opacity-70">Khun Thiem · ID: 8842-12</span>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
        {menuItems.map((item, i) => (
          <div key={i} className={`
            flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors
            ${item.isLast ? '' : 'border-bottom border-gray-50'}
          `}>
            <div className="flex items-center gap-4">
              <div className={item.isLast ? 'text-coral' : 'text-forest opacity-60'}>
                {item.icon}
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`text-[15px] font-bold ${item.isLast ? 'text-coral' : 'text-gray-800'}`}>
                  {item.labelTh}
                </span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  {item.labelEn}
                </span>
              </div>
            </div>
            {!item.isLast && <ChevronRight size={18} className="text-gray-300" />}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center">
        <p className="text-[11px] text-gray-400">Version 1.0.42 (Beta) · AI Elderly Care</p>
      </div>
    </div>
  );
}
