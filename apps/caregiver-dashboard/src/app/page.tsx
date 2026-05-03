import React from 'react';
import { Shield, ChevronDown, Mic, Send, Sparkles, Utensils, FileText, BarChart3, Activity, Heart, Thermometer, User } from 'lucide-react';

export default function CaregiverDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans p-8">
      {/* Top Header */}
      <header className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Shield fill="currentColor" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Azure AI Care <span className="text-blue-600">Pro</span></h1>
            <p className="text-[10px] font-bold text-slate-400">ระบบวิเคราะห์สุขภาพและผู้ช่วยเสียงอัจฉริยะสำหรับผู้สูงอายุ</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">API Connection: Active</span>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <div className="col-span-3 space-y-8">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">รายชื่อในการดูแล</h3>
            <div className="space-y-3">
              <PatientMiniCard name="คุณสมชาย ใจดี" condition="หัวใจ" active={true} />
              <PatientMiniCard name="อาม่าชวง แซ่ตั้ง" condition="สมอง" />
              <PatientMiniCard name="คุณป้าศรี เพ็ญสุข" condition="เบาหวาน" />
            </div>
          </section>

          <section className="insights-dark-card space-y-6">
            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <span className="text-blue-400">+</span> Gemini AI Insights
            </h3>
            <div className="space-y-2">
              <button className="insight-btn">
                <Sparkles size={14} className="text-amber-400" /> ออกแบบเมนูอาหาร
              </button>
              <button className="insight-btn">
                <FileText size={14} className="text-blue-400" /> วิเคราะห์ผลตรวจ
              </button>
              <button className="insight-btn">
                <BarChart3 size={14} className="text-emerald-400" /> สรุปรายงานสุขภาพ
              </button>
            </div>
          </section>
        </div>

        {/* Center Content */}
        <div className="col-span-6 space-y-8">
          {/* Patient Overview */}
          <div className="overview-card space-y-10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                    <User size={40} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-slate-800">คุณสมชาย ใจดี</h2>
                    <p className="text-sm font-bold text-slate-400">โรคหัวใจและความดันสูง</p>
                 </div>
              </div>
              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100">
                 Risk Level: 45%
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <MetricBox label="HEART RATE" value="82" unit="BPM" color="text-red-500" />
              <MetricBox label="BLOOD PRESSURE" value="145/95" unit="mmHg" color="text-blue-600" />
              <MetricBox label="BODY TEMP" value="36.6" unit="°C" color="text-amber-500" />
              <MetricBox label="STATUS" value="Stable" unit="" color="text-emerald-500" isStatus />
            </div>
          </div>

          {/* AI Assistant */}
          <div className="assistant-card flex flex-col h-[450px]">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3 text-slate-800 font-black">
                   <Sparkles className="text-amber-400" size={20} />
                   <span>ผู้ช่วยพยาบาล AI</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500">
                   เสียงนุ่มนวล (Kore) <ChevronDown size={14} />
                </div>
             </div>

             <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-400 font-bold italic">"สวัสดีค่ะ อาซูเรียยินดีดูแลคุณและคนที่คุณรักค่ะ"</p>
             </div>

             <div className="mt-auto space-y-4">
                <div className="flex gap-4 items-center">
                   <button className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all">
                      <Mic size={32} />
                   </button>
                   <div className="flex-1 bg-slate-50 border border-slate-100 h-16 rounded-2xl flex items-center px-8 relative">
                      <input 
                        type="text" 
                        placeholder="สอบถามอาการหรือขอคำแนะนำ..." 
                        className="bg-transparent w-full text-lg font-medium outline-none"
                      />
                      <button className="text-blue-600 font-black text-lg">ส่ง</button>
                   </div>
                </div>
                <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-widest">Ready to assist</p>
             </div>
          </div>
        </div>

        {/* Right Audit Sidebar */}
        <div className="col-span-3">
          <div className="audit-card h-full flex flex-col gap-8 shadow-xl shadow-blue-500/20">
             <h3 className="text-xl font-black">AI Real-time Audit</h3>
             
             <div className="bg-white/10 border border-white/10 rounded-3xl p-6 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-blue-100">สรุปภาวะสุขภาพ:</p>
                <p className="text-[11px] leading-relaxed text-blue-50 font-medium">
                  สวัสดีค่ะคุณสมชาย สัญญาณชีพชีพจรและอุณหภูมิปกติค่ะ แต่ค่าความดัน 145/95 mmHg ยังถือว่าสูงเกินเกณฑ์สำหรับผู้ที่มีโรคหัวใจและความดันสูงค่ะ อาซูเรียแนะนำให้คุณถุงนั่งพักผ่อนให้ผ่อนคลายและคอยสังเกตอาการผิดปกติ เช่น ปวดศีรษะหรือแน่นหน้าอกเพิ่มเติมนะคะ
                </p>
             </div>

             <div className="space-y-4 px-2">
                <AuditItem color="bg-emerald-400" text="ตรวจสอบยาประจำตัวครบถ้วน" />
                <AuditItem color="bg-emerald-400" text="วิเคราะห์ระดับความเครียด: ต่ำ" />
                <AuditItem color="bg-amber-400" text="เฝ้าระวังการดื่มน้ำ" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function PatientMiniCard({ name, condition, active }: any) {
  return (
    <div className={`patient-mini-card flex items-center gap-4 ${active ? 'ring-2 ring-blue-100 border border-blue-50 shadow-md' : 'border border-transparent'}`}>
      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="avatar" />
      </div>
      <div>
         <p className="text-sm font-black text-slate-800 leading-tight">{name}</p>
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{condition}</p>
      </div>
    </div>
  );
}

function MetricBox({ label, value, unit, color, isStatus }: any) {
  return (
    <div className="metric-box flex flex-col justify-center gap-1 min-h-[120px]">
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline justify-center gap-1">
         <span className={`text-2xl font-black tracking-tight ${color}`}>{value}</span>
         {unit && <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>}
      </div>
    </div>
  );
}

function AuditItem({ color, text }: any) {
  return (
    <div className="flex items-center gap-3">
       <div className={`w-2 h-2 rounded-full ${color}`}></div>
       <p className="text-xs font-bold text-blue-50">{text}</p>
    </div>
  );
}
