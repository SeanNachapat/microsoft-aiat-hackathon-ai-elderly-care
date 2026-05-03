import React from 'react';
import { Sparkles, Mic, Send, Triangle, User, Bell, ChevronRight, Heart, Activity } from 'lucide-react';

export default function ElderlyDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header Banner */}
      <nav className="bg-[#3b5998] h-16 flex items-center justify-between px-12 text-white shadow-md">
        <div className="flex items-center gap-3">
          <Triangle className="fill-white rotate-180" size={24} />
          <span className="text-xl font-bold tracking-tight">Azure AI <span className="font-normal opacity-80">Care Center</span></span>
        </div>
        <div className="flex items-center gap-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          AI Engine Ready
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto w-full px-12 py-10 space-y-10">
        
        {/* Welcome Section */}
        <header className="flex justify-between items-start">
           <div>
              <h1 className="text-4xl font-black text-slate-800 mb-2">สวัสดีครับ คุณสมชาย 👋</h1>
              <p className="text-xl font-bold text-slate-400 italic">"วันนี้ผมพร้อมดูแลคุณและครอบครัวด้วยความใส่ใจครับ"</p>
           </div>
           <button className="summary-btn hover:bg-slate-50 transition-colors">
              <Sparkles size={18} className="text-amber-400" />
              สรุปภาพรวมรายวัน
           </button>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Chat Assistant (Left) */}
           <div className="lg:col-span-7 chat-container flex flex-col h-[650px] shadow-xl">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3 text-slate-600">
                 <MessageSquareIcon size={20} className="text-blue-500" />
                 <span className="font-bold text-lg">ผู้ช่วยพยาบาล AI อัจฉริยะ</span>
              </div>
              
              <div className="flex-1 p-10 overflow-y-auto space-y-8">
                 <div className="chat-bubble-ai max-w-[85%] shadow-lg shadow-blue-500/20">
                    สวัสดีครับ ผมคือ AI ผู้ช่วยพยาบาลส่วนตัวของคุณ วันนี้มีอาการอะไรอยากปรึกษา หรืออยากให้ผมช่วยวางแผนเมนูอาหารสุขภาพดีครับ?
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 flex flex-col gap-4">
                 <div className="flex gap-4">
                    <button className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                       <Mic size={28} />
                    </button>
                    <div className="flex-1 relative">
                       <input 
                         type="text" 
                         placeholder="พิมพ์อาการ หรือถามเรื่องอาหาร..." 
                         className="w-full h-16 bg-white border border-slate-200 px-8 rounded-full text-xl font-medium outline-none focus:border-blue-500 transition-colors shadow-inner"
                       />
                       <button className="absolute right-2 top-2 bottom-2 bg-[#3b5998] text-white px-8 rounded-full font-bold hover:bg-blue-800 transition-colors">
                          ส่ง
                       </button>
                    </div>
                 </div>
                 <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-2">
                   POWERED BY GOOGLE GEMINI 1.5 ✨
                 </p>
              </div>
           </div>

           {/* Analysis Cards (Right) */}
           <div className="lg:col-span-5 space-y-8">
              
              {/* Deep Analysis */}
              <div className="right-card border-l-[#10b981]">
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3 text-slate-800">
                       <Sparkles size={24} className="text-amber-400" />
                       <h3 className="text-2xl font-black">การวิเคราะห์เชิงลึก</h3>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded border border-emerald-100 uppercase tracking-widest">Real-time</span>
                 </div>
                 <p className="text-lg font-bold text-slate-400 leading-relaxed">
                    รอรับข้อมูลจากการพูดคุยของคุณเพื่อทำการวิเคราะห์ภาวะสุขภาพปัจจุบัน...
                 </p>
              </div>

              {/* Recommended Menu */}
              <div className="right-card border-l-[#f59e0b]">
                 <div className="flex items-center gap-3 text-slate-800 mb-6">
                    <span className="text-2xl">🍲</span>
                    <Sparkles size={24} className="text-amber-400" />
                    <h3 className="text-2xl font-black">เมนูอาหารแนะนำ</h3>
                 </div>
                 <div className="bg-[#fffbeb] p-6 rounded-2xl border border-amber-50">
                    <p className="text-lg font-bold text-amber-700/60 italic leading-relaxed">
                       ยังไม่มีเมนูแนะนำ กรุณาแจ้งอาการหรือความต้องการอาหารเพื่อให้ AI ออกแบบ
                    </p>
                 </div>
              </div>

              {/* Small Metrics Row */}
              <div className="grid grid-cols-2 gap-6">
                 <div className="tiny-metric-card">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Heart Rate</p>
                    <p className="text-4xl font-black text-red-500">72</p>
                    <p className="text-[10px] font-black text-slate-400 mt-1">BPM</p>
                 </div>
                 <div className="tiny-metric-card">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Risk Level</p>
                    <p className="text-2xl font-black text-emerald-500 uppercase tracking-tight">Low Risk</p>
                    <p className="text-[10px] font-black text-slate-400 mt-1 uppercase">Status: Stable</p>
                 </div>
              </div>

           </div>

        </div>
      </main>
    </div>
  );
}

function MessageSquareIcon({ size, className }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
