"use client";

import { useState } from 'react';
import { Sparkles, Mic, Send, Bell, Heart, Activity, Thermometer, Moon, Pill, CheckCircle, Clock, Phone } from 'lucide-react';

// ─── Mock Data for Elderly Self-View ─────────────────────────────────────────
const ELDERLY_PATIENT = {
  name: 'คุณเทียม',
  fullName: 'เทียม แก้วมณี',
  age: 90,
  greeting: 'สวัสดีตอนเช้าครับ คุณเทียม 👋',
  subGreeting: 'วันนี้ผมพร้อมดูแลคุณด้วยความใส่ใจครับ',
  vitals: { hr: 92, spo2: 97, bp: '173/106', temp: 36.6 },
  medications: [
    { name: 'Clopidogrel 75mg', time: '08:00', taken: true, desc: 'ยาละลายลิ่มเลือด' },
    { name: 'Amlodipine 5mg', time: '08:00', taken: false, desc: 'ยาลดความดัน' },
  ],
  reminders: [
    { time: '08:00', msg: 'รับประทานยาเช้า', done: true },
    { time: '10:00', msg: 'ดื่มน้ำ 2 แก้ว', done: true },
    { time: '12:00', msg: 'รับประทานอาหารกลางวัน', done: false },
    { time: '15:00', msg: 'เดินเบาๆ 15 นาที', done: false },
    { time: '18:00', msg: 'วัดความดันโลหิต', done: false },
  ],
  caregiver: { name: 'พยาบาลสุดา', available: true, phone: '02-xxx-xxxx' },
  aiHistory: [
    { role: 'ai' as const, text: 'สวัสดีครับคุณเทียม! วันนี้รู้สึกเป็นอย่างไรบ้างครับ? ผมพร้อมช่วยเหลือเสมอนะครับ 😊' },
  ],
  menu: [
    { meal: 'เช้า', items: 'โจ๊กข้าวหอมมะลิ + ไข่ตุ๋น + น้ำขิง', notes: 'ลดเกลือ — เหมาะกับความดันสูง' },
    { meal: 'กลางวัน', items: 'ข้าวกล้อง + ปลาทูนึ่งมะนาว + ผักต้ม', notes: 'โปรตีนสูง — บำรุงกล้ามเนื้อ' },
    { meal: 'เย็น', items: 'ข้าวต้มปลา + เต้าหู้ผัดผัก', notes: 'ย่อยง่าย — เบาท้องก่อนนอน' },
  ],
};

const QUICK_REPLIES = [
  'ฉันรู้สึกปวดหัว',
  'ฉันต้องการความช่วยเหลือ',
  'ฉันหกล้ม',
  'ฉันลืมกินยา',
  'วันนี้ฉันสบายดี',
];

const mockAIReply = (msg: string): string => {
  const m = msg.toLowerCase();
  if (m.includes('ปวดหัว')) return 'ฉันเข้าใจครับ ควรนอนพักและดื่มน้ำสะอาด กำลังแจ้ง พยาบาลสุดา ทันทีนะครับ อย่าตื่นตระหนก 💙';
  if (m.includes('หกล้ม') || m.includes('ล้ม')) return '🚨 ฉันได้รับสัญญาณแล้วครับ! กำลังแจ้งทีมดูแลทันที กรุณาอยู่นิ่งๆ อย่าพยายามลุกขึ้นเองนะครับ';
  if (m.includes('ลืมกิน') || m.includes('ยา')) return 'ไม่เป็นไรครับ ยังพอรับประทานได้ถ้าไม่เกิน 2 ชั่วโมง แต่ถ้าเกินแล้วให้ข้ามไปรับประทานมื้อถัดไปนะครับ';
  if (m.includes('ช่วยเหลือ')) return '🆘 รับทราบแล้วครับ! กำลังติดต่อพยาบาลสุดาให้เข้ามาหาคุณทันทีครับ';
  if (m.includes('สบายดี')) return 'ดีใจมากเลยครับ! 😊 อย่าลืมดื่มน้ำให้เพียงพอและรับประทานอาหารตรงเวลานะครับ';
  return 'ขอบคุณที่แจ้งให้ทราบครับ ฉันจะช่วยดูแลคุณต่อไป หากมีอะไรต้องการก็บอกได้เลยนะครับ 💙';
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ElderlyDashboard() {
  const p = ELDERLY_PATIENT;
  const [chatHistory, setChatHistory] = useState(p.aiHistory);
  const [inputMsg, setInputMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'menu' | 'schedule'>('chat');

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    const reply = mockAIReply(text);
    setChatHistory(h => [...h, { role: 'user', text }, { role: 'ai', text: reply }]);
    setInputMsg('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <nav className="bg-[#3b5998] h-16 flex items-center justify-between px-8 text-white shadow-md">
        <div className="flex items-center gap-3">
          <Heart className="fill-white" size={22} />
          <span className="text-xl font-bold tracking-tight">Azure AI <span className="font-normal opacity-80">Care Center</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            ผู้ดูแล: {p.caregiver.name} ({p.caregiver.available ? 'ออนไลน์' : 'ออฟไลน์'})
          </div>
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-full text-sm font-black transition-colors">
            <Phone size={14} /> โทรหาผู้ดูแล
          </button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto w-full px-8 py-8 space-y-6">

        {/* Welcome */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-slate-800 mb-1">{p.greeting}</h1>
            <p className="text-lg font-bold text-slate-400 italic">"{p.subGreeting}"</p>
          </div>
          {/* Emergency Button */}
          <button className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-red-200 transition-all hover:scale-105 active:scale-95">
            🆘 ขอความช่วยเหลือฉุกเฉิน
          </button>
        </header>

        {/* Vitals Strip */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'อัตราการเต้นหัวใจ', value: p.vitals.hr, unit: 'bpm', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'ออกซิเจนในเลือด', value: `${p.vitals.spo2}%`, unit: 'SpO2', icon: Activity, color: p.vitals.spo2 < 95 ? 'text-red-500' : 'text-emerald-500', bg: p.vitals.spo2 < 95 ? 'bg-red-50' : 'bg-emerald-50' },
            { label: 'ความดันโลหิต', value: p.vitals.bp, unit: 'mmHg', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'อุณหภูมิร่างกาย', value: `${p.vitals.temp}°C`, unit: 'ปกติ', icon: Thermometer, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map(v => (
            <div key={v.label} className={`${v.bg} rounded-2xl p-5 border border-white shadow-sm text-center`}>
              <p className="text-xs font-bold text-slate-500 mb-2">{v.label}</p>
              <p className={`text-3xl font-black ${v.color}`}>{v.value}</p>
              <p className="text-xs font-bold text-slate-400 mt-1">{v.unit}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left — AI Chat / Menu / Schedule */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-blue-100 shadow-xl shadow-blue-50 overflow-hidden flex flex-col h-[560px]">
            {/* Tab Bar */}
            <div className="flex border-b border-slate-100">
              {(['chat', 'menu', 'schedule'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-sm font-black uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-600'}`}>
                  {tab === 'chat' ? '💬 ผู้ช่วย AI' : tab === 'menu' ? '🍲 เมนูอาหาร' : '📅 ตารางวันนี้'}
                </button>
              ))}
            </div>

            {/* Tab: Chat */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatHistory.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'ai' && <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 self-end">🤖</div>}
                      <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-base font-medium leading-relaxed ${m.role === 'user' ? 'bg-[#3b5998] text-white' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-slate-100 space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    {QUICK_REPLIES.map(r => (
                      <button key={r} onClick={() => sendMsg(r)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors flex-shrink-0">
                      <Mic size={20} />
                    </button>
                    <input value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg(inputMsg)}
                      type="text" placeholder="พิมพ์อาการ หรือถามอะไรก็ได้..."
                      className="flex-1 h-12 bg-white border border-slate-200 px-5 rounded-full text-base font-medium outline-none focus:border-blue-400 transition-colors" />
                    <button onClick={() => sendMsg(inputMsg)} className="w-12 h-12 bg-[#3b5998] text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors flex-shrink-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Tab: Menu */}
            {activeTab === 'menu' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <p className="text-sm font-bold text-slate-400 flex items-center gap-2"><Sparkles size={14} className="text-amber-400" /> เมนูที่ AI แนะนำสำหรับวันนี้ — ออกแบบตามภาวะสุขภาพของคุณ</p>
                {p.menu.map((m, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                    <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2">มื้อ{m.meal}</p>
                    <p className="text-lg font-black text-slate-800 mb-1">{m.items}</p>
                    <p className="text-xs font-bold text-slate-500">💡 {m.notes}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Schedule */}
            {activeTab === 'schedule' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                <p className="text-sm font-bold text-slate-400">กิจกรรมและยาประจำวันของคุณ</p>
                {p.reminders.map((r, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${r.done ? 'bg-emerald-50 border-emerald-100 opacity-60' : 'bg-white border-slate-100'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${r.done ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {r.done ? <CheckCircle size={20} className="text-emerald-500" /> : <Clock size={20} className="text-slate-400" />}
                    </div>
                    <div>
                      <p className={`font-black text-base ${r.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{r.msg}</p>
                      <p className="text-xs font-bold text-slate-400">{r.time} น.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Medication */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Pill size={16} className="text-emerald-500" /> ยาที่ต้องรับประทานวันนี้
              </h3>
              {p.medications.map((m, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl mb-2 border ${m.taken ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-200'}`}>
                  <div>
                    <p className={`font-black text-base ${m.taken ? 'text-slate-500' : 'text-slate-800'}`}>{m.name}</p>
                    <p className="text-xs font-bold text-slate-400">{m.desc} • {m.time} น.</p>
                  </div>
                  <div className={`text-xs font-black px-3 py-1.5 rounded-full ${m.taken ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
                    {m.taken ? '✓ รับประทานแล้ว' : '⏰ ยังไม่ได้รับประทาน'}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Summary */}
            <div className="bg-gradient-to-br from-[#3b5998] to-blue-800 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="font-black text-base">การวิเคราะห์สุขภาพวันนี้</h3>
              </div>
              <p className="text-sm leading-relaxed text-blue-100">
                ค่าความดันโลหิต <strong className="text-white">173/106 mmHg</strong> สูงกว่าเกณฑ์ปกติ ควรพักผ่อนและหลีกเลี่ยงความเครียด รับประทานอาหารรสเค็มน้อยลง และดื่มน้ำให้เพียงพอครับ
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
                {[
                  { label: 'ความเสี่ยงรวม', value: '94/100', color: 'text-red-300' },
                  { label: 'การรับประทานยา', value: '50%', color: 'text-amber-300' },
                  { label: 'คุณภาพการนอน', value: '35/100', color: 'text-orange-300' },
                  { label: 'การเคลื่อนไหว', value: '25%', color: 'text-yellow-300' },
                ].map(s => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-[9px] font-bold text-blue-200 uppercase tracking-wide mb-1">{s.label}</p>
                    <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Caregiver Contact */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Phone size={14} className="text-blue-500" /> ทีมดูแล
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👩‍⚕️</div>
                <div className="flex-1">
                  <p className="font-black text-slate-800">{p.caregiver.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-xs font-bold text-emerald-500">ออนไลน์ — พร้อมรับสาย</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-black hover:bg-blue-700 transition-colors">
                  โทร
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
