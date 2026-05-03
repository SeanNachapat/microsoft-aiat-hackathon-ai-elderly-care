"use client";

import { useState } from 'react';
import { 
  Header, StatCard, InfraCard, PatientCard, Footer,
  DetailHeader, VitalsCard, AlertsList, IoTCards, RiskScoreCard,
  MedicationCard, TimelineCard, PDPAConsentCard
} from '@/components/DashboardComponents';
import { 
  Users, TriangleAlert, CircleAlert, TrendingUp, Wifi, Link2, 
  ShieldCheck, Lock, FileCheck, CloudDownload, RotateCcw, 
  Shield
} from 'lucide-react';

export default function Home() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

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
      riskLevel: "วิกฤต",
      statusColor: "bg-red-500",
      alerts: [{ type: 'critical', count: 3, label: 'วิกฤต' }] as const,
      detail: {
        vitals: { hr: 92, spo2: 97, bp: "173/106", temp: 36.6, sleep: 35, movement: 25, alert: "ตรวจพบการหกล้ม!" },
        alerts: [
          { title: "หกล้ม!", desc: "Fall Detection Sensor ตรวจพบการหกล้ม เวลา 07:52", time: "2/5/2569 07:52:00" },
          { title: "ความดันโลหิตวิกฤต", desc: "BP 162/98 mmHg", time: "2/5/2569 07:55:00" }
        ],
        devices: [
          { name: "Azure Health Watch Pro", type: "watch", level: 40, lastSeen: "30 วินาทีที่แล้ว" },
          { name: "Fall Detection Pad", type: "wifi", level: 75, lastSeen: "10 วินาทีที่แล้ว" }
        ],
        riskScores: [{ label: "ความเสี่ยงรวม", value: 94 }, { label: "หกล้ม", value: 95 }],
        medications: [{ name: "Clopidogrel 75mg", schedule: "08:00", adherence: 96 }],
        events: [
          { time: "07:58", title: "SpO2 ต่ำวิกฤต 93%", type: "critical" },
          { time: "07:55", title: "ความดันโลหิตวิกฤต 162/98", type: "critical" },
          { time: "07:52", title: "หกล้ม! Fall Detection แจ้งเตือน", type: "critical" }
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
      riskLevel: "เสี่ยงสูง",
      statusColor: "bg-red-500",
      alerts: [{ type: 'critical', count: 1, label: 'วิกฤต' }] as const,
      detail: {
        vitals: { hr: 62, spo2: 90, bp: "112/92", temp: 36.4, sleep: 45, movement: 30 },
        alerts: [{ title: "SpO2 ต่ำ", desc: "SpO2 90% ต่ำกว่าเกณฑ์", time: "2/5/2569 08:15:00" }],
        devices: [{ name: "Smart Bed Sensor v3", type: "wifi", level: 90, lastSeen: "5 นาทีที่แล้ว" }],
        riskScores: [{ label: "ความเสี่ยงรวม", value: 85 }],
        medications: [{ name: "Aricept 10mg", schedule: "ก่อนนอน", adherence: 95 }],
        events: [{ time: "08:15", title: "SpO2 ต่ำ 90%", type: "warning" }],
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
      riskLevel: "ปกติ",
      statusColor: "bg-amber-400",
      alerts: [{ type: 'warning', count: 1, label: 'เตือน' }] as const,
      detail: {
        vitals: { hr: 81, spo2: 95, bp: "148/92", temp: 36.8, sleep: 70, movement: 60 },
        alerts: [],
        devices: [{ name: "Azure Health Watch Pro", type: "watch", level: 85, lastSeen: "2 นาทีที่แล้ว" }],
        riskScores: [{ label: "ความเสี่ยงรวม", value: 72 }],
        medications: [{ name: "Metformin 500mg", schedule: "หลังอาหาร", adherence: 98 }],
        events: [{ time: "09:00", title: "รับประทานยาเช้า", type: "normal" }],
        consents: [{ label: "Health Monitoring", status: true }]
      }
    },
    {
      name: "ประสิทธิ์ มั่นคงธรรม",
      age: 72,
      id: "PT-003",
      location: "อยู่บ้านพัก",
      tags: ["หัวใจเต้นผิดจังหวะ", "ไตเรื้อรัง ระยะที่ 3"],
      hr: 90,
      spo2: 94,
      bp: "159/85",
      risk: 68,
      riskLevel: "ปกติ",
      statusColor: "bg-amber-400",
      alerts: [{ type: 'warning', count: 1, label: 'เตือน' }] as const,
      detail: {
        vitals: { hr: 90, spo2: 94, bp: "159/85", temp: 36.5, sleep: 65, movement: 50 },
        alerts: [],
        devices: [],
        riskScores: [],
        medications: [],
        events: [],
        consents: []
      }
    },
    {
      name: "บุญรอด ศรีสุวรรณ",
      age: 81,
      id: "PT-004",
      location: "อยู่บ้านพัก",
      tags: ["มะเร็งลำไส้ (ระยะพื้นตัว)", "เบาหวาน", "ซึมเศร้า"],
      hr: 88,
      spo2: 97,
      bp: "144/80",
      risk: 58,
      riskLevel: "ปกติ",
      statusColor: "bg-amber-400",
      alerts: [{ type: 'warning', count: 1, label: 'เตือน' }] as const,
      detail: {
        vitals: { hr: 88, spo2: 97, bp: "144/80", temp: 36.7, sleep: 80, movement: 70 },
        alerts: [],
        devices: [],
        riskScores: [],
        medications: [],
        events: [],
        consents: []
      }
    }
  ];

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      
      <div className="max-w-[1400px] mx-auto w-full px-5 py-8">
        {!selectedPatientId ? (
          <div className="space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard icon={<Users size={24} />} label="ผู้ป่วยทั้งหมด" value="5" subLabel="ภายใต้การดูแล" borderColor="border-emerald-500" iconBg="bg-emerald-50" iconColor="text-emerald-500" />
              <StatCard icon={<TriangleAlert size={24} />} label="แจ้งเตือนวิกฤต" value="4" subLabel="รอผู้ดำเนินการ" borderColor="border-red-500" iconBg="bg-red-50" iconColor="text-red-500" alert="4 วิกฤต" />
              <StatCard icon={<CircleAlert size={24} />} label="แจ้งเตือนเตือน" value="4" subLabel="รอผู้ดำเนินการ" borderColor="border-amber-500" iconBg="bg-amber-50" iconColor="text-amber-500" />
              <StatCard icon={<TrendingUp size={24} />} label="ความเสี่ยงเฉลี่ย" value="75/100" subLabel="เสี่ยงสูง" borderColor="border-purple-500" iconBg="bg-purple-50" iconColor="text-purple-500" />
              <StatCard icon={<Wifi size={24} />} label="อุปกรณ์ออนไลน์" value="13/15" subLabel="IoT Devices" borderColor="border-blue-500" iconBg="bg-blue-50" iconColor="text-blue-500" />
              <StatCard icon={<Link2 size={24} />} label="Adherence เฉลี่ย" value="90%" subLabel="การรับประทานยา" borderColor="border-cyan-500" iconBg="bg-cyan-50" iconColor="text-cyan-500" />
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <Shield size={16} className="fill-emerald-100" />
                <h2 className="text-[11px] font-black uppercase tracking-widest">Security & Infrastructure</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <InfraCard icon={<Lock size={18} />} title="Encryption" value="AES-256 + TLS 1.3" iconBg="bg-emerald-50" iconColor="text-emerald-500" />
                <InfraCard icon={<ShieldCheck size={18} />} title="Azure Sentinel SIEM" value="Active - MTTD < 5 min" iconBg="bg-blue-50" iconColor="text-blue-500" />
                <InfraCard icon={<FileCheck size={18} />} title="PDPA Compliance" value="3/5 consent full, 2/5 partial" iconBg="bg-amber-50" iconColor="text-amber-500" />
                <InfraCard icon={<CloudDownload size={18} />} title="Backup Status" value="GRS: Singapore -> Hong Kong" iconBg="bg-emerald-50" iconColor="text-emerald-500" />
                <InfraCard icon={<RotateCcw size={18} />} title="Last DR Test" value="Q1 2026 - PASSED" iconBg="bg-emerald-50" iconColor="text-emerald-500" />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-slate-800">รายชื่อผู้ป่วย (5 ราย)</h2>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">คลิกเพื่อดูรายละเอียด • ข้อมูลอัปเดตทุก 5 วินาที</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map((p, i) => (
                  <PatientCard key={i} {...p} onClick={() => setSelectedPatientId(p.id)} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            <DetailHeader 
              onBack={() => setSelectedPatientId(null)} 
              name={selectedPatient?.name} 
              id={selectedPatient?.id} 
              age={selectedPatient?.age} 
              location={selectedPatient?.location}
              riskScore={selectedPatient?.risk}
              riskLevel={selectedPatient?.riskLevel}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <VitalsCard data={selectedPatient?.detail?.vitals} />
                  <AlertsList alerts={selectedPatient?.detail?.alerts || []} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <RiskScoreCard scores={selectedPatient?.detail?.riskScores || []} />
                  <MedicationCard medications={selectedPatient?.detail?.medications || []} />
                </div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <IoTCards devices={selectedPatient?.detail?.devices || []} />
                <TimelineCard events={selectedPatient?.detail?.events || []} />
                <PDPAConsentCard consents={selectedPatient?.detail?.consents || []} />
              </div>
            </div>
          </div>
        )}
        
        {/* Footer inside the same flow container */}
        <Footer />
      </div>
    </div>
  );
}
