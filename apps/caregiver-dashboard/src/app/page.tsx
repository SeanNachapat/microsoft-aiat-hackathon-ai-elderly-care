"use client";

import { useState, useEffect } from 'react';
import { Shield, Bell, Sparkles, Mic, Send } from 'lucide-react';
import { Patient } from '@healthcare/core';
import { MetricCard } from '@/components/MetricCard';
import { PatientListItem } from '@/components/PatientListItem';
import { AIChatBox } from '@/components/AIChatBox';
import { ApiService } from '@/services/api';
import { MOCK_PATIENTS } from '@/services/mockData';

export default function CaregiverDashboard() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [selectedId, setSelectedId] = useState('PT-005');
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'สวัสดีค่ะ ฉันคืออาซูเรีย AI ผู้ช่วยพยาบาล พร้อมดูแลผู้ป่วยร่วมกับคุณค่ะ 💙' }
  ]);

  const patient = patients.find(p => p.id === selectedId) || patients[0];

  useEffect(() => {
    // ApiService.getPatients().then(setPatients);
  }, []);

  const handleSendChat = () => {
    if (!chatMsg.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', text: chatMsg }]);
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: `รับทราบค่ะ สำหรับ ${patient.name} แนะนำให้เฝ้าระวังอาการเพิ่มเติมนะคะ` }]);
    }, 1000);
    setChatMsg('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans p-6 gap-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Shield fill="currentColor" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Azure AI Care <span className="text-blue-600">Pro</span></h1>
            <p className="text-[10px] font-bold text-slate-400">ระบบวิเคราะห์สุขภาพอัจฉริยะ</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Active</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1">
        {/* Sidebar */}
        <aside className="col-span-3 space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ผู้ป่วยในการดูแล</h3>
          <div className="space-y-2">
            {patients.map(p => (
              <PatientListItem 
                key={p.id} 
                patient={p} 
                isSelected={selectedId === p.id} 
                onClick={() => setSelectedId(p.id)} 
              />
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-6 space-y-5">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl">{patient.avatar || '👴'}</div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">{patient.name}</h2>
                  <p className="text-xs font-bold text-slate-400">{patient.location} • อายุ {patient.age} ปี</p>
                </div>
              </div>
              <span className={`text-xs font-black px-4 py-2 rounded-full border bg-blue-50 text-blue-600`}>
                Risk: {patient.risk}/100
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <MetricCard label="HEART RATE" value={patient.hr} unit="BPM" color="text-red-500" />
              <MetricCard label="BLOOD PRESSURE" value={patient.bp} unit="mmHg" color="text-blue-600" />
              <MetricCard label="SpO2" value={`${patient.spo2}%`} color="text-emerald-500" />
              <MetricCard label="TEMP" value={patient.detail?.vitals.temp || '--'} unit="°C" color="text-amber-500" />
            </div>
          </div>

          <AIChatBox 
            history={chatHistory}
            msg={chatMsg}
            onMsgChange={setChatMsg}
            onSend={handleSendChat}
          />
        </main>

        {/* Right Sidebar */}
        <aside className="col-span-3 space-y-4">
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
            <h3 className="text-lg font-black mb-4">AI Audit Summary</h3>
            <p className="text-xs leading-relaxed text-blue-50 mb-4">
              {patient.detail?.vitals.alert || 'สถานะปัจจุบันปกติ แนะนำให้ติดตามตามรอบเวลา'}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>ยาเช้า: รับประทานแล้ว</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>การเคลื่อนไหว: ปกติ</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
