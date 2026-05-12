"use client";

import { useState, useEffect } from 'react';
import { 
  Sidebar, PatientAvatar, StatusBadge, VitalPill, AlertDot, SectionHeader, AuditItem, ProgressTrack,
  HeroBanner
} from '@healthcare/core';
import { 
  Shield, Bell, Sparkles, Mic, Send, Smartphone, Pill, Clock, Layout, 
  Activity, Moon, FileText, Search
} from 'lucide-react';

export default function CaregiverDashboard() {
  const [selectedId, setSelectedId] = useState('PT-005');
  const [chatMsg, setChatMsg] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'สวัสดีค่ะ ฉันคืออาซูเรีย AI ผู้ช่วยพยาบาล พร้อมดูแลผู้ป่วยร่วมกับคุณค่ะ 💙\nHello! I am Asuria, your AI Assistant.' }
  ]);

  const patients = [
    { id: 'PT-005', name: 'เทียม แก้วมณี', room: 'Room 402', status: 'critical' as const, avatar: '👴' },
    { id: 'PT-002', name: 'วิมล สุขสมบูรณ์', room: 'Room 405', status: 'warning' as const, avatar: '👵' },
    { id: 'PT-001', name: 'สมจิตร วงศ์สวัสดิ์', room: 'Room 401', status: 'normal' as const, avatar: '👴' },
    { id: 'PT-003', name: 'ประสิทธิ์ มั่นคงธรรม', room: 'Room 408', status: 'normal' as const, avatar: '👴' },
  ];

  const patient = patients.find(p => p.id === selectedId) || patients[0];

  const handleSendChat = (text?: string, en?: string) => {
    const msg = text || chatMsg;
    if (!msg.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: `รับทราบค่ะ สำหรับ ${patient.name} แนะนำให้เฝ้าระวังอาการเพิ่มเติมนะคะ` }]);
    }, 1000);
    setChatMsg('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--cream)' }}>
      <Sidebar appName="AEC Care" appLabelTh="ผู้ช่วยพยาบาล" />
      
      {/* 2. Patient List Column */}
      <aside style={{
        width: '260px',
        marginLeft: '240px',
        backgroundColor: 'var(--warm-white)',
        borderRight: '1.5px solid var(--border)',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '0 20px 20px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            My Patients · ผู้ป่วย
          </p>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              placeholder="ค้นหา · Search"
              style={{
                width: '100%',
                height: '36px',
                backgroundColor: 'var(--sand)',
                border: 'none',
                borderRadius: '20px',
                padding: '0 12px 0 34px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          {patients.map((p) => (
            <div 
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: '72px',
                padding: '0 20px',
                cursor: 'pointer',
                backgroundColor: selectedId === p.id ? 'var(--sage-light)' : 'transparent',
                borderLeft: selectedId === p.id ? '3px solid var(--sage)' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <PatientAvatar name={p.name} size="md" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                   <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{p.room}</span>
                   <span style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.5 }}>·</span>
                   <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>HR 78</span>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </aside>

      {/* 3. Main Patient View */}
      <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Patient Hero Header */}
        <HeroBanner 
           titleTh={patient.name}
           titleEn={patient.name}
           subtitleTh={`ชาย · 90 ปี · ${patient.room}`}
           subtitleEn={`Male · 90 Years · ${patient.room}`}
        />

        {/* Vitals Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <VitalCard label="HEART RATE" value="92" unit="BPM" status={patient.status} />
          <VitalCard label="BLOOD PRESSURE" value="173/106" unit="mmHg" status={patient.status} />
          <VitalCard label="SpO2" value="97%" unit="Oxygen" status="normal" />
          <VitalCard label="TEMP" value="36.6" unit="°C" status="normal" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Activity Chart */}
            <section style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
              <SectionHeader title="Activity Level · ระดับกิจกรรม" />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px', padding: '0 4px' }}>
                {[30, 45, 20, 60, 80, 50, 40, 35, 90, 70, 40, 30, 50, 60].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      flex: 1, 
                      height: `${h}%`, 
                      backgroundColor: h > 75 ? 'var(--coral)' : h > 50 ? 'var(--amber)' : 'var(--sage-mid)',
                      borderRadius: '4px 4px 0 0'
                    }} 
                  />
                ))}
              </div>
            </section>

            {/* Asuria AI Chat */}
            <section style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: 'var(--sage-dark)', padding: '12px 20px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Asuria AI · ผู้ช่วย AI</span>
              </div>
              
              <div style={{ height: '280px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                {chatHistory.map((chat, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor: chat.role === 'user' ? 'var(--sage)' : 'var(--sand)',
                      color: chat.role === 'user' ? 'white' : 'var(--text-primary)',
                      padding: '10px 16px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      maxWidth: '85%',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {chat.text}
                  </div>
                ))}
              </div>

              <div style={{ padding: '16px', borderTop: '1.5px solid var(--border)', display: 'flex', gap: '10px' }}>
                <input 
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  placeholder="ถามข้อมูลผู้ป่วย..."
                  style={{ flex: 1, border: 'none', backgroundColor: 'var(--cream)', borderRadius: '20px', padding: '0 16px', fontSize: '13px', outline: 'none' }}
                />
                <button onClick={() => handleSendChat()} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--sage)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Send size={16} />
                </button>
              </div>
            </section>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
             {/* Care Audit */}
             <section>
               <SectionHeader title="Care Logs · บันทึกการดูแล" />
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <AuditItem title="Medication" body="ได้รับยาความดันแล้ว 08:05 น." icon={<Pill size={14} color="var(--coral)" />} />
                  <AuditItem title="Observation" body="เริ่มมีอาการกระสับกระส่าย" icon={<Activity size={14} color="var(--amber)" />} />
                  <AuditItem title="Rest" body="หลับได้ปกติในช่วงเช้า" icon={<Moon size={14} color="var(--sky)" />} />
               </div>
             </section>

             {/* IoT Panel */}
             <section>
               <SectionHeader title="IoT Status · อุปกรณ์" />
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--warm-white)', padding: '16px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)' }}>
                  <IoTItem name="Smart Watch" status="normal" battery={42} />
                  <IoTItem name="Fall Pad" status="normal" battery={78} />
                  <IoTItem name="Bed Sensor" status="inactive" battery={15} />
               </div>
             </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

const VitalCard = ({ label, value, unit, status }: any) => (
  <div style={{
    backgroundColor: 'var(--warm-white)',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '16px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
    minHeight: '100px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  }}>
    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{label}</span>
    <span style={{ fontSize: '28px', fontWeight: 700, color: status === 'critical' ? 'var(--coral)' : status === 'warning' ? 'var(--amber)' : 'var(--sage-dark)' }}>
      {value}
    </span>
    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>{unit}</span>
  </div>
);

const IoTItem = ({ name, status, battery }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <AlertDot status={status} />
    <span style={{ fontSize: '12px', flex: 1, fontWeight: 500 }}>{name}</span>
    <span style={{ fontSize: '11px', fontWeight: 700, color: battery < 30 ? 'var(--coral)' : battery < 60 ? 'var(--amber)' : 'var(--text-primary)' }}>{battery}%</span>
  </div>
);
