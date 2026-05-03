"use client";

import { useState } from 'react';
import {
  Shield, Mic, Sparkles, FileText, BarChart3, Activity,
  Heart, Thermometer, User, Bell, CheckCircle, AlertTriangle,
  Pill, Clock, Battery, Wifi, ChevronRight, Send
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PATIENTS = [
  {
    id: 'PT-005', name: 'เทียม แก้วมณี', age: 90,
    condition: 'หลอดเลือดสมอง • ความดันสูง', avatar: '👴',
    hr: 92, bp: '173/106', temp: 36.6, spo2: 97, risk: 94,
    riskLabel: 'วิกฤต', riskColor: 'text-red-500', riskBg: 'bg-red-50 border-red-200',
    statusDot: 'bg-red-500',
    medications: [
      { name: 'Clopidogrel 75mg', time: '08:00', taken: true },
      { name: 'Amlodipine 5mg', time: '08:00', taken: false },
    ],
    alerts: [
      { msg: 'หกล้ม! Fall Detection แจ้งเตือน', time: '07:52', level: 'critical' },
      { msg: 'BP วิกฤต 173/106 mmHg', time: '07:55', level: 'critical' },
      { msg: 'SpO2 ต่ำ 93%', time: '07:58', level: 'critical' },
    ],
    devices: [
      { name: 'Health Watch Pro', battery: 40, online: true },
      { name: 'Fall Detection Pad', battery: 75, online: true },
    ],
    aiSummary: 'ผู้ป่วยมีความเสี่ยงสูงมาก ตรวจพบการหกล้มและความดันวิกฤต แนะนำแจ้งแพทย์ทันที และติดตามอาการทุก 15 นาที',
    auditItems: [
      { color: 'bg-red-400', text: 'ตรวจพบการหกล้ม — ยังไม่ได้รับการยืนยัน' },
      { color: 'bg-red-400', text: 'BP 173/106 — เกินเกณฑ์วิกฤต' },
      { color: 'bg-amber-400', text: 'ยา Amlodipine ยังไม่ได้รับประทาน' },
    ],
  },
  {
    id: 'PT-002', name: 'วิมล สุขสมบูรณ์', age: 85,
    condition: 'อัลไซเมอร์ • โรคหัวใจ', avatar: '👵',
    hr: 62, bp: '112/92', temp: 36.4, spo2: 90, risk: 85,
    riskLabel: 'เสี่ยงสูง', riskColor: 'text-orange-500', riskBg: 'bg-orange-50 border-orange-200',
    statusDot: 'bg-orange-500',
    medications: [{ name: 'Aricept 10mg', time: 'ก่อนนอน', taken: true }],
    alerts: [{ msg: 'SpO2 ต่ำ 90%', time: '08:15', level: 'warning' }],
    devices: [{ name: 'Smart Bed Sensor v3', battery: 90, online: true }],
    aiSummary: 'SpO2 ต่ำกว่าเกณฑ์ที่ 90% ควรตรวจสอบการหายใจและพิจารณาเสริมออกซิเจน',
    auditItems: [
      { color: 'bg-amber-400', text: 'SpO2 90% — ต่ำกว่าเกณฑ์ปกติ' },
      { color: 'bg-emerald-400', text: 'รับประทานยาครบถ้วน' },
      { color: 'bg-emerald-400', text: 'Bed Sensor: ออนไลน์' },
    ],
  },
  {
    id: 'PT-001', name: 'สมจิตร วงศ์สวัสดิ์', age: 78,
    condition: 'เบาหวาน • ข้อเข่าเสื่อม', avatar: '👴',
    hr: 81, bp: '148/92', temp: 36.8, spo2: 95, risk: 72,
    riskLabel: 'ปานกลาง', riskColor: 'text-amber-500', riskBg: 'bg-amber-50 border-amber-200',
    statusDot: 'bg-amber-400',
    medications: [{ name: 'Metformin 500mg', time: 'หลังอาหาร', taken: true }],
    alerts: [],
    devices: [{ name: 'Health Watch Pro', battery: 85, online: true }],
    aiSummary: 'สัญญาณชีพอยู่ในเกณฑ์ปกติ BP ยังค่อนข้างสูง ควรติดตามและลดอาหารเค็ม',
    auditItems: [
      { color: 'bg-amber-400', text: 'BP 148/92 — ควรติดตาม' },
      { color: 'bg-emerald-400', text: 'รับประทานยาครบถ้วน' },
      { color: 'bg-emerald-400', text: 'กิจกรรมประจำวันปกติ' },
    ],
  },
  {
    id: 'PT-003', name: 'ประสิทธิ์ มั่นคงธรรม', age: 72,
    condition: 'หัวใจเต้นผิดจังหวะ • ไตเรื้อรัง', avatar: '👴',
    hr: 90, bp: '159/85', temp: 36.5, spo2: 94, risk: 68,
    riskLabel: 'ปกติ', riskColor: 'text-emerald-500', riskBg: 'bg-emerald-50 border-emerald-200',
    statusDot: 'bg-emerald-400',
    medications: [{ name: 'Warfarin 3mg', time: '18:00', taken: false }],
    alerts: [],
    devices: [],
    aiSummary: 'สถานะโดยรวมดี อย่าลืมรับประทาน Warfarin เย็นนี้ และดื่มน้ำให้เพียงพอ',
    auditItems: [
      { color: 'bg-amber-400', text: 'Warfarin 18:00 — ยังไม่รับประทาน' },
      { color: 'bg-emerald-400', text: 'HR 90 bpm — ปกติ' },
      { color: 'bg-emerald-400', text: 'ไม่มีแจ้งเตือนเร่งด่วน' },
    ],
  },
  {
    id: 'PT-004', name: 'บุญรอด ศรีสุวรรณ', age: 81,
    condition: 'มะเร็งลำไส้ (พื้นตัว) • ซึมเศร้า', avatar: '👴',
    hr: 88, bp: '144/80', temp: 36.7, spo2: 97, risk: 58,
    riskLabel: 'ต่ำ', riskColor: 'text-emerald-600', riskBg: 'bg-emerald-50 border-emerald-200',
    statusDot: 'bg-emerald-500',
    medications: [
      { name: 'Sertraline 50mg', time: 'เช้า', taken: true },
      { name: 'Metformin 500mg', time: 'หลังอาหาร', taken: true },
    ],
    alerts: [],
    devices: [],
    aiSummary: 'สัญญาณชีพดีมาก วันนี้ควรสังเกตอารมณ์และกระตุ้นให้พูดคุยกับครอบครัว',
    auditItems: [
      { color: 'bg-emerald-400', text: 'รับประทานยาครบถ้วน' },
      { color: 'bg-emerald-400', text: 'Vitals ทุกค่าปกติ' },
      { color: 'bg-blue-400', text: 'นัดพบจิตแพทย์: 10 พ.ค.' },
    ],
  },
];

const AI_QUICK_ACTIONS = [
  { icon: Sparkles, label: 'ออกแบบเมนูอาหาร', color: 'text-amber-400', reply: 'แนะนำ: ข้าวกล้องต้มผัก ปลานึ่งซีอิ้ว น้ำเต้าหู้ไม่หวาน เหมาะสำหรับผู้ป่วยความดันสูงและเบาหวาน' },
  { icon: FileText, label: 'วิเคราะห์ผลตรวจ', color: 'text-blue-400', reply: 'ผลตรวจล่าสุด: Creatinine 1.2 mg/dL (ปกติ), HbA1c 7.2% (ต้องควบคุม), CBC ปกติ' },
  { icon: BarChart3, label: 'สรุปรายงานสุขภาพ', color: 'text-emerald-400', reply: 'สรุปวันนี้: ผู้ป่วย 5 ราย — วิกฤต 1 ราย เสี่ยงสูง 1 ราย ปกติ 3 ราย อัตราการรับประทานยาเฉลี่ย 93%' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CaregiverDashboard() {
  const [selectedId, setSelectedId] = useState('PT-005');
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'สวัสดีค่ะ ฉันคืออาซูเรีย AI ผู้ช่วยพยาบาล พร้อมดูแลผู้ป่วยร่วมกับคุณค่ะ 💙' },
  ]);

  const patient = PATIENTS.find(p => p.id === selectedId)!;

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    const aiReply = AI_QUICK_ACTIONS.find(a => a.label === text)?.reply
      ?? `วิเคราะห์แล้ว: "${text}" — แนะนำให้ติดตามอาการของ ${patient.name} อย่างใกล้ชิด และปรึกษาแพทย์หากอาการไม่ดีขึ้น`;
    setChatHistory(h => [...h, { role: 'user', text }, { role: 'ai', text: aiReply }]);
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
            <p className="text-[10px] font-bold text-slate-400">ระบบวิเคราะห์สุขภาพและผู้ช่วยเสียงอัจฉริยะสำหรับผู้สูงอายุ</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={20} className="text-slate-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">3</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Backend: Connected</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 flex-1">

        {/* Left — Patient List */}
        <aside className="col-span-3 space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ผู้ป่วยในการดูแล ({PATIENTS.length})</h3>
          <div className="space-y-2">
            {PATIENTS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left p-3 rounded-2xl bg-white border transition-all flex items-center gap-3 ${selectedId === p.id ? 'border-blue-200 shadow-md shadow-blue-50 ring-2 ring-blue-100' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{p.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-black text-slate-800 truncate">{p.name}</p>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.statusDot}`} />
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 truncate">{p.condition}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${p.riskBg} ${p.riskColor} flex-shrink-0`}>{p.risk}</span>
              </button>
            ))}
          </div>

          {/* AI Quick Actions */}
          <div className="bg-slate-900 rounded-2xl p-4 space-y-3 mt-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="text-amber-400" /> AI Insights
            </h3>
            {AI_QUICK_ACTIONS.map(a => (
              <button key={a.label} onClick={() => sendMsg(a.label)}
                className="w-full text-left text-[11px] font-bold text-white/80 hover:text-white flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 transition-all">
                <a.icon size={13} className={a.color} /> {a.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Center — Patient Detail + Chat */}
        <main className="col-span-6 space-y-5">
          {/* Patient Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl">{patient.avatar}</div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">{patient.name}</h2>
                  <p className="text-xs font-bold text-slate-400">{patient.condition} • อายุ {patient.age} ปี • {patient.id}</p>
                </div>
              </div>
              <span className={`text-xs font-black px-4 py-2 rounded-full border ${patient.riskBg} ${patient.riskColor}`}>
                ความเสี่ยง {patient.riskLabel} ({patient.risk}/100)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'HEART RATE', value: patient.hr, unit: 'BPM', color: 'text-red-500' },
                { label: 'BLOOD PRESSURE', value: patient.bp, unit: 'mmHg', color: 'text-blue-600' },
                { label: 'SpO2', value: `${patient.spo2}%`, unit: '', color: patient.spo2 < 95 ? 'text-red-500' : 'text-emerald-500' },
                { label: 'TEMP', value: `${patient.temp}`, unit: '°C', color: 'text-amber-500' },
              ].map(m => (
                <div key={m.label} className="bg-slate-50 rounded-2xl p-4 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                  <span className={`text-xl font-black ${m.color}`}>{m.value}</span>
                  {m.unit && <p className="text-[9px] font-bold text-slate-400 mt-0.5">{m.unit}</p>}
                </div>
              ))}
            </div>

            {/* Medications & Devices */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Pill size={10} /> ยา</p>
                {patient.medications.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                    <span className="font-bold text-slate-700">{m.name}</span>
                    <span className="flex items-center gap-1">{m.taken ? <CheckCircle size={12} className="text-emerald-500" /> : <Clock size={12} className="text-amber-500" />} <span className={m.taken ? 'text-emerald-500' : 'text-amber-500'} style={{fontSize:'9px', fontWeight:'bold'}}>{m.time}</span></span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Wifi size={10} /> IoT Devices</p>
                {patient.devices.length === 0 ? <p className="text-[10px] text-slate-300 font-bold">ไม่มีอุปกรณ์</p> : patient.devices.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                    <span className="font-bold text-slate-700 truncate">{d.name}</span>
                    <span className="flex items-center gap-1 flex-shrink-0"><Battery size={11} className={d.battery < 30 ? 'text-red-400' : 'text-slate-400'} /><span className="text-[9px] font-bold text-slate-400">{d.battery}%</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[360px]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <Sparkles size={18} className="text-amber-400" />
              <span className="font-black text-slate-800">ผู้ช่วยพยาบาล AI — อาซูเรีย</span>
              <span className="ml-auto text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">LIVE</span>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-3">
              <button className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors flex-shrink-0">
                <Mic size={18} />
              </button>
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg(chatMsg)}
                type="text"
                placeholder="สอบถามอาการหรือขอคำแนะนำ..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 text-sm font-medium outline-none focus:border-blue-400 transition-colors"
              />
              <button onClick={() => sendMsg(chatMsg)} className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors flex-shrink-0">
                <Send size={16} />
              </button>
            </div>
          </div>
        </main>

        {/* Right — AI Audit + Alerts */}
        <aside className="col-span-3 space-y-4">
          <div className="bg-blue-600 rounded-3xl p-6 text-white space-y-5 shadow-xl shadow-blue-500/20">
            <h3 className="text-lg font-black">AI Real-time Audit</h3>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">สรุปภาวะสุขภาพ:</p>
              <p className="text-xs leading-relaxed text-blue-50 font-medium">{patient.aiSummary}</p>
            </div>
            <div className="space-y-3">
              {patient.auditItems.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.color}`} />
                  <p className="text-xs font-bold text-blue-50">{a.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" /> แจ้งเตือนล่าสุด
            </h3>
            {patient.alerts.length === 0 ? (
              <div className="text-center py-4">
                <CheckCircle size={24} className="text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-400">ไม่มีการแจ้งเตือน</p>
              </div>
            ) : (
              <div className="space-y-2">
                {patient.alerts.map((a, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-xs ${a.level === 'critical' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                    <p className={`font-black ${a.level === 'critical' ? 'text-red-600' : 'text-amber-600'}`}>{a.msg}</p>
                    <p className="text-slate-400 font-bold mt-0.5">{a.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risk Scores */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={14} className="text-purple-500" /> AI Risk Score
            </h3>
            <div className="space-y-3">
              {[
                { label: 'ความเสี่ยงรวม', value: patient.risk },
                { label: 'หัวใจ', value: Math.round(patient.risk * 0.8) },
                { label: 'หกล้ม', value: Math.round(patient.risk * 1.01) > 100 ? 100 : Math.round(patient.risk * 1.01) },
              ].map(s => (
                <div key={s.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">{s.label}</span>
                    <span className={s.value > 80 ? 'text-red-500' : 'text-slate-400'}>{s.value}/100</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.value > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
