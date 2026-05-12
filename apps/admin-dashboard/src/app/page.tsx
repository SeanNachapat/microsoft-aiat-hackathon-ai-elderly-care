"use client";

import { useState } from 'react';
import { 
  SectionHeader, ProgressTrack, StatusBadge
} from '@healthcare/core';
import { 
  Users, TriangleAlert, CircleAlert, Wifi, 
  Lock, ShieldCheck, FileCheck, CloudDownload, RotateCcw, 
  ArrowLeft, Zap, Activity
} from 'lucide-react';

// Local Components
import { HeroBanner } from '../components/HeroBanner';
import { SearchBar } from '../components/SearchBar';
import { StatCard } from '../components/StatCard';
import { PatientCard } from '../components/PatientCard';
import { AlertFeed } from '../components/AlertFeed';
import { SecurityGrid } from '../components/SecurityGrid';

export default function Home() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      name: "เทียม แก้วมณี",
      age: 90,
      id: "PT-005",
      location: "อยู่บ้านพัก",
      tags: ["หลอดเลือดสมอง (ประวัติ)", "ความดันโลหิตสูง", "ข้ออักเสบ"],
      hr: 92,
      spo2: 97,
      bp: "173/106",
      risk: 94,
      riskLevel: "critical" as const,
      detail: {
        vitals: { hr: 92, spo2: 97, bp: "173/106", temp: 36.6, sleep: 35, movement: 25, alert: "ตรวจพบการหกล้ม!" },
        alerts: [
          { title: "หกล้ม!", desc: "Fall Detection Sensor ตรวจพบการหกล้ม เวลา 07:52", time: "2/5/2569 07:52:00", status: 'critical' as const },
          { title: "ความดันโลหิตวิกฤต", desc: "BP 162/98 mmHg", time: "2/5/2569 07:55:00", status: 'critical' as const }
        ],
        devices: [
          { name: "Azure Health Watch Pro", type: "watch", level: 40, lastSeen: "30 วินาทีที่แล้ว" },
          { name: "Fall Detection Pad", type: "wifi", level: 75, lastSeen: "10 วินาทีที่แล้ว" }
        ],
        riskScores: [{ label: "ความเสี่ยงรวม", value: 94 }, { label: "หกล้ม", value: 95 }],
        medications: [{ name: "Clopidogrel 75mg", schedule: "08:00", adherence: 96 }],
        events: [
          { time: "07:58", title: "SpO2 ต่ำวิกฤต 93%", type: "critical" as const },
          { time: "07:55", title: "ความดันโลหิตวิกฤต 162/98", type: "critical" as const },
          { time: "07:52", title: "หกล้ม! Fall Detection แจ้งเตือน", type: "critical" as const }
        ],
        consents: [{ label: "Health Monitoring", status: true }, { label: "AI Analysis", status: true }]
      }
    },
    {
      name: "วิมล สุขสมบูรณ์",
      age: 85,
      id: "PT-002",
      location: "อยู่บ้านพัก",
      tags: ["อัลไซเมอร์ (ระยะต้น)", "โรคหัวใจ", "กระดูกพรุน"],
      hr: 62,
      spo2: 90,
      bp: "112/92",
      risk: 85,
      riskLevel: "warning" as const,
      detail: {
        vitals: { hr: 62, spo2: 90, bp: "112/92", temp: 36.4, sleep: 45, movement: 30 },
        alerts: [{ title: "SpO2 ต่ำ", desc: "SpO2 90% ต่ำกว่าเกณฑ์", time: "2/5/2569 08:15:00", status: 'warning' as const }],
        devices: [{ name: "Smart Bed Sensor v3", type: "wifi", level: 90, lastSeen: "5 นาทีที่แล้ว" }],
        riskScores: [{ label: "ความเสี่ยงรวม", value: 85 }],
        medications: [{ name: "Aricept 10mg", schedule: "ก่อนนอน", adherence: 95 }],
        events: [{ time: "08:15", title: "SpO2 ต่ำ 90%", type: "warning" as const }],
        consents: [{ label: "Health Monitoring", status: true }]
      }
    },
    {
      name: "สมจิตร วงศ์สวัสดิ์",
      age: 78,
      id: "PT-001",
      location: "อยู่บ้านพัก",
      tags: ["เบาหวาน", "ความดันโลหิตสูง", "ข้อเข่าเสื่อม"],
      hr: 81,
      spo2: 95,
      bp: "148/92",
      risk: 72,
      riskLevel: "normal" as const,
      detail: {
        vitals: { hr: 81, spo2: 95, bp: "148/92", temp: 36.8, sleep: 70, movement: 60 },
        alerts: [],
        devices: [{ name: "Azure Health Watch Pro", type: "watch", level: 85, lastSeen: "2 นาทีที่แล้ว" }],
        riskScores: [{ label: "ความเสี่ยงรวม", value: 72 }],
        medications: [{ name: "Metformin 500mg", schedule: "หลังอาหาร", adherence: 98 }],
        events: [{ time: "09:00", title: "รับประทานยาเช้า", type: "normal" as const }],
        consents: [{ label: "Health Monitoring", status: true }]
      }
    }
  ];

  const recentAlerts: any[] = [
    { title: "ตรวจพบการหกล้ม: คุณเทียม แก้วมณี (PT-005)", time: "07:52 น.", status: "critical", desc: "Fall Detection Sensor" },
    { title: "ความดันโลหิตสูงวิกฤต: คุณวิมล สุขสมบูรณ์", time: "08:15 น.", status: "critical", desc: "BP 162/98 mmHg" },
    { title: "หัวใจเต้นเร็วผิดปกติ: คุณสมจิตร วงศ์สวัสดิ์", time: "09:00 น.", status: "warning", desc: "HR 102 bpm" },
  ];

  const securityItems = [
    { icon: <Lock />, label: "Encryption", value: "AES-256 + TLS 1.3", active: true },
    { icon: <ShieldCheck />, label: "Sentinel SIEM", value: "Active - MTTD < 5m", active: true },
    { icon: <FileCheck />, label: "PDPA Compliance", value: "3/5 Consented", active: true },
    { icon: <CloudDownload />, label: "Cloud Backup", value: "GRS: Singapore", active: true },
    { icon: <RotateCcw />, label: "DR Test", value: "Q1 2026 - PASSED", active: true },
  ];

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <main style={{ padding: '28px' }}>
      {!selectedPatientId ? (
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* 1. Hero Banner */}
            <HeroBanner 
              titleTh="ภาพรวมระบบ" 
              titleEn="Overview" 
              subtitleTh="ข้อมูลอัปเดตล่าสุด: วันนี้ 08:30 น." 
              subtitleEn="Last updated: Today 08:30 AM" 
            />

            {/* 2. Search Bar */}
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
            />

            {/* 3. Stat Cards */}
            <section style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '14px',
              marginBottom: '24px'
            }}>
              <StatCard 
                icon={<Users />} 
                labelTh="ผู้ป่วยทั้งหมด" 
                labelEn="Total Patients" 
                value="5" 
                subTextTh="จากทั้งหมด 12 เตียง"
                subTextEn="Out of 12 total beds"
              />
              <StatCard 
                icon={<TriangleAlert />} 
                labelTh="แจ้งเตือนวิกฤต" 
                labelEn="Critical Alerts" 
                value="2" 
                subTextTh="ต้องการการตอบสนองด่วน"
                subTextEn="Immediate response needed"
              />
              <StatCard 
                icon={<CircleAlert />} 
                labelTh="การเฝ้าระวัง" 
                labelEn="Warnings" 
                value="4" 
                subTextTh="ควรติดตามอาการต่อเนื่อง"
                subTextEn="Monitor closely"
              />
              <StatCard 
                icon={<Wifi />} 
                labelTh="อุปกรณ์ออนไลน์" 
                labelEn="IoT Status" 
                value="13/15" 
                subTextTh="ทำงานปกติ 92%"
                subTextEn="92% active status"
              />
            </section>

            {/* 4. Patient Grid & Alert Feed layout split */}
            <div style={{ 
              display: 'flex', 
              gap: '20px',
              alignItems: 'flex-start',
              marginBottom: '24px'
            }}>
              {/* Left Column: Patient Grid */}
              <div style={{ flex: 1 }}>
                <SectionHeader title="รายชื่อผู้ป่วย · Patient List" actionLabel="ดูทั้งหมด →" />
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px' 
                }}>
                  {patients.map(p => (
                    <PatientCard key={p.id} patient={p} onClick={() => setSelectedPatientId(p.id)} />
                  ))}
                </div>
              </div>

              {/* Right Column: Alert Feed */}
              <div style={{ width: '280px', flexShrink: 0 }}>
                <AlertFeed alerts={recentAlerts} />
              </div>
            </div>



            {/* 5. Security & Infrastructure Grid */}
            <SecurityGrid items={securityItems} />
          </div>
        ) : (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Detail View Header */}
            <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <button 
                onClick={() => setSelectedPatientId(null)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--warm-white)',
                  border: '1.5px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={20} color="var(--earth)" />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h1 style={{ 
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '28px',
                    margin: 0
                  }}>
                    {selectedPatient?.name} · Khun {selectedPatient?.name.split(' ')[0]}
                  </h1>
                  <StatusBadge status={(selectedPatient?.riskLevel as any) || 'normal'} />
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  ID: {selectedPatient?.id} · อายุ {selectedPatient?.age} ปี · {selectedPatient?.location}
                </p>
              </div>
            </header>

            {/* Detail Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Vitals & Alerts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
                    <SectionHeader title="สัญญาณชีพ · Vitals" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div style={{ backgroundColor: 'var(--sand)', padding: '12px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>HR</span>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--coral)' }}>{selectedPatient?.hr} bpm</div>
                      </div>
                      <div style={{ backgroundColor: 'var(--sand)', padding: '12px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>BP</span>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--coral)' }}>{selectedPatient?.bp}</div>
                      </div>
                      <div style={{ backgroundColor: 'var(--sand)', padding: '12px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>SpO2</span>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sage)' }}>{selectedPatient?.spo2}%</div>
                      </div>
                      <div style={{ backgroundColor: 'var(--sand)', padding: '12px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Temp</span>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--earth)' }}>{selectedPatient?.detail?.vitals.temp}°C</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
                    <SectionHeader title="เหตุการณ์ · Timeline" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {selectedPatient?.detail?.events.map((e, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ 
                            width: '8px', height: '8px', borderRadius: '50%', 
                            backgroundColor: e.type === 'critical' ? 'var(--coral)' : e.type === 'warning' ? 'var(--amber)' : 'var(--sage)',
                            marginTop: '4px'
                          }} />
                          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{e.title}</span>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{e.time} น.</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk & Medication */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                   <div style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
                    <SectionHeader title="ความเสี่ยง · Risk Analysis" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {selectedPatient?.detail?.riskScores.map((s, i) => (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{s.label}</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: s.value > 80 ? 'var(--coral)' : 'var(--earth)' }}>{s.value}%</span>
                          </div>
                          <ProgressTrack value={s.value} variant={s.value > 80 ? 'critical' : s.value > 50 ? 'warning' : 'normal'} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
                    <SectionHeader title="การได้รับยา · Medication" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {selectedPatient?.detail?.medications.map((m, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: i === selectedPatient.detail.medications.length - 1 ? 'none' : '1px solid var(--border-light)' }}>
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--earth)', margin: 0 }}>{m.name}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Scheduled: {m.schedule} AM</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--sage)', margin: 0 }}>{m.adherence}%</p>
                            <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Adherence</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* IoT Devices */}
                <div style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
                  <SectionHeader title="อุปกรณ์ · IoT Devices" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {selectedPatient?.detail?.devices.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Zap size={18} style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--earth)', margin: 0 }}>{d.name}</p>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Last seen: {d.lastSeen}</p>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: d.level < 30 ? 'var(--coral)' : 'var(--earth)' }}>{d.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PDPA Consent */}
                <div style={{ backgroundColor: 'var(--warm-white)', borderRadius: 'var(--radius)', padding: '24px', border: '1.5px solid var(--border)' }}>
                  <SectionHeader title="ความเป็นส่วนตัว · Privacy" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedPatient?.detail?.consents.map((c, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--earth)' }}>{c.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--sage)' }} />
                          <span style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase' }}>Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </main>
  );
}
