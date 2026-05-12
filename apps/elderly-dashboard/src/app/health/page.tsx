import { Activity, Heart, Utensils, Footprints, Pill, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HealthPage() {
  const categories = [
    { id: 'vitals', th: 'ข้อมูลสุขภาพ', en: 'Vitals Monitoring', icon: <Activity size={22} />, path: '/health/vitals', color: 'bg-sky-light text-sky' },
    { id: 'meals', th: 'โภชนาการ', en: 'Nutrition Log', icon: <Utensils size={22} />, path: '/health/meals', color: 'bg-forest/10 text-forest' },
    { id: 'activity', th: 'กิจกรรม', en: 'Physical Activity', icon: <Footprints size={22} />, path: '/health/activity', color: 'bg-sage-light text-sage' },
    { id: 'medicine', th: 'รายการยา', en: 'Medication Tracker', icon: <Pill size={22} />, path: '/health/medicine', color: 'bg-amber-light text-amber' },
  ];

  return (
    <div className="flex flex-col px-5 animate-fade-in">
      {/* Overall Health Summary */}
      <div className="bg-forest rounded-[32px] p-8 text-white mt-6 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
          <Heart size={140} />
        </div>
        
        <div className="relative z-10">
          <span className="text-xs font-bold opacity-70 uppercase tracking-widest">ดัชนีสุขภาพโดยรวม</span>
          <div className="flex items-center gap-3 mt-2">
            <h2 className="text-5xl font-black tracking-tighter">ดีมาก</h2>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
              <TrendingUp size={14} className="text-sage" />
              <span className="text-xs font-bold">+5%</span>
            </div>
          </div>
          <p className="text-sm opacity-80 mt-4 max-w-[200px]">
            คุณมีสุขภาพที่ยอดเยี่ยมในวันนี้! รักษามาตรฐานนี้ไว้นะครับ
          </p>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-700 mb-5">เลือกหัวข้อที่ต้องการดู (Select Category)</h3>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((c, i) => (
          <Link href={c.path} key={c.id} className="no-underline">
            <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-95">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.color}`}>
                  {c.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[17px] font-bold text-gray-800 leading-tight">{c.th}</h4>
                  <span className="text-xs text-gray-400 mt-0.5">{c.en}</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick SOS Shortcut */}
      <div className="mt-10 bg-coral-light rounded-[24px] p-6 border border-coral/10 flex items-center justify-between">
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-coral">ต้องการความช่วยเหลือ?</h4>
          <p className="text-xs text-coral/80 mt-1">กดที่นี่เพื่อติดต่อเจ้าหน้าที่ดูแล</p>
        </div>
        <Link href="/sos" className="bg-coral text-white p-3 rounded-2xl shadow-lg shadow-coral/20">
          <Activity size={24} />
        </Link>
      </div>
    </div>
  );
}
