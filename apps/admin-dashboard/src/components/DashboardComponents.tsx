import React from 'react';
import { 
  Users, TriangleAlert, CircleAlert, TrendingUp, Wifi, Link2, 
  ShieldCheck, Lock, FileCheck, CloudDownload, RotateCcw, 
  HeartPulse, Activity, ChevronRight, Dot, Pill,
  ArrowLeft, Battery, Signal, CheckCircle2, XCircle, Clock, Thermometer, Moon, Move, Shield
} from 'lucide-react';

// Header Component
export const Header = () => (
  <header className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-[100] h-14">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-[#10b981] rounded-full flex items-center justify-center text-white shadow-md">
        <HeartPulse size={20} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-800 leading-tight">Healthcare 4 Elder</h1>
        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">AI-Driven Preventive Elderly Healthcare</p>
      </div>
      <div className="ml-3 px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-full flex items-center gap-2">
        <span className="text-[9px] font-semibold text-slate-500">Microsoft Azure</span>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-xs font-bold text-slate-700">15 : 53 : 29</p>
        <p className="text-[9px] text-slate-400 font-medium">3 พ.ค. 2569</p>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-[9px] font-bold uppercase">LIVE</span>
      </div>
      <p className="text-[9px] text-slate-400">อัปเดตล่าสุด: 15:53:27</p>
    </div>
  </header>
);

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subLabel: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  unit?: string;
  alert?: string;
}

export const StatCard = ({ icon, label, value, subLabel, borderColor, iconBg, iconColor, unit, alert }: StatCardProps) => (
  <div className={`bg-white p-4 rounded-xl border-l-4 ${borderColor} stat-card-shadow transition-all hover:scale-[1.02] cursor-pointer min-h-[120px] flex flex-col justify-center`}>
    <div className="flex items-start justify-between h-full">
      <div className="flex flex-col gap-3">
        <div className={`w-10 h-10 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center shadow-sm`}>
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-800">{value}</span>
            {unit && <span className="text-xs font-bold text-slate-400">{unit}</span>}
          </div>
          <p className="text-[10px] font-medium text-slate-400 mt-0.5">{subLabel}</p>
        </div>
      </div>
      {alert && (
        <div className="px-1.5 py-0.5 bg-red-50 text-red-500 rounded-md text-[9px] font-bold border border-red-100 flex items-center gap-1">
          <TriangleAlert size={10} />
          {alert}
        </div>
      )}
    </div>
  </div>
);

// Infrastructure Card Component
interface InfraCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
  iconColor: string;
}

export const InfraCard = ({ icon, title, value, iconBg, iconColor }: InfraCardProps) => (
  <div className="flex items-center gap-2.5 p-3 bg-white/50 rounded-xl border border-gray-100/50 hover:bg-white transition-colors cursor-pointer group">
    <div className={`w-8 h-8 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
      {React.cloneElement(icon as React.ReactElement, { size: 16 })}
    </div>
    <div className="min-w-0">
      <h3 className="text-[11px] font-bold text-slate-800 truncate">{title}</h3>
      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter truncate">{value}</p>
    </div>
  </div>
);

// Patient Card Component
interface PatientProps {
  name: string;
  age: number;
  id: string;
  tags: string[];
  hr: number;
  spo2: number;
  bp: string;
  risk: number;
  statusColor: string;
  alerts?: { type: 'critical' | 'warning', count: number, label: string }[];
  onClick?: () => void;
}

export const PatientCard = ({ name, age, id, tags, hr, spo2, bp, risk, statusColor, alerts, onClick }: PatientProps) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-xl border border-gray-100 stat-card-shadow transition-all hover:border-emerald-200 cursor-pointer relative overflow-hidden group flex flex-col h-full"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex gap-3">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
          👴
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-black text-slate-800 truncate">{name}</h3>
            <div className={`w-2.5 h-2.5 rounded-full ${statusColor} shadow-sm flex-shrink-0`}></div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
            {name.split(' ')[0]} {name.split(' ')[1]} • อายุ {age} ปี • {id}
          </p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
    </div>

    <div className="flex flex-wrap gap-1.5 mb-4 min-h-[44px]">
      {tags.map((tag, i) => (
        <span key={i} className="px-2 py-0.5 bg-slate-50 text-[9px] font-bold text-slate-500 rounded-full border border-slate-100 h-fit">
          {tag}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-4 gap-1 border-t border-gray-50 pt-3 mt-auto">
      <div className="text-center">
        <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">HR</p>
        <p className={`text-base font-black ${hr > 100 || hr < 60 ? 'text-amber-500' : 'text-slate-700'}`}>{hr}</p>
      </div>
      <div className="text-center">
        <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">SpO2</p>
        <p className={`text-base font-black ${spo2 < 95 ? 'text-red-500' : 'text-emerald-500'}`}>{spo2}%</p>
      </div>
      <div className="text-center">
        <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">BP</p>
        <p className="text-base font-black text-slate-700 leading-tight">{bp}</p>
      </div>
      <div className="text-center">
        <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">ความเสี่ยง</p>
        <p className={`text-base font-black ${risk > 80 ? 'text-red-500' : 'text-amber-500'}`}>{risk}</p>
      </div>
    </div>

    {alerts && alerts.length > 0 && (
      <div className="mt-4 flex flex-col gap-1">
        {alerts.map((alert, i) => (
          <div key={i} className={`flex items-center gap-1.5 text-[10px] font-bold ${alert.type === 'critical' ? 'text-red-500' : 'text-amber-500'}`}>
            {alert.type === 'critical' ? <TriangleAlert size={12} /> : <CircleAlert size={12} />}
            <span>{alert.count} {alert.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Detail Header Component
export const DetailHeader = ({ onBack, name, id, age, location, riskScore, riskLevel }: any) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors font-bold text-sm"
      >
        <ArrowLeft size={18} />
        กลับ
      </button>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl shadow-inner">
          👴
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800">{name}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            {name} • {id} • อายุ {age} ปี • {location}
          </p>
        </div>
      </div>
    </div>
    <div className="px-4 py-2 bg-red-50 border border-red-100 rounded-full">
      <span className="text-xs font-black text-red-500 uppercase tracking-wide">
        ความเสี่ยง {riskLevel} ({riskScore}/100)
      </span>
    </div>
  </div>
);

// Vitals Card
export const VitalsCard = ({ data }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow h-full">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <HeartPulse size={18} className="text-red-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">สัญญาณชีพ (Real-time)</h3>
    </div>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity size={16} />
          <span className="text-xs font-bold uppercase">อัตราการเต้นหัวใจ</span>
        </div>
        <p className="text-sm font-black text-red-500">{data?.hr || '--'} bpm</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity size={16} />
          <span className="text-xs font-bold uppercase">SpO2</span>
        </div>
        <p className="text-sm font-black text-emerald-500">{data?.spo2 || '--'}%</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity size={16} />
          <span className="text-xs font-bold uppercase">ความดันโลหิต</span>
        </div>
        <p className="text-sm font-black text-red-500">{data?.bp || '--/--'} mmHg</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Thermometer size={16} />
          <span className="text-xs font-bold uppercase">อุณหภูมิ</span>
        </div>
        <p className="text-sm font-black text-emerald-500">{data?.temp || '--'}°C</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Moon size={16} />
          <span className="text-xs font-bold uppercase">คุณภาพการนอน</span>
        </div>
        <p className="text-sm font-black text-slate-700">{data?.sleep || '--'}/100</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <Move size={16} />
          <span className="text-xs font-bold uppercase">การเคลื่อนไหว</span>
        </div>
        <p className="text-sm font-black text-slate-700">{data?.movement || '--'}%</p>
      </div>
    </div>
    {data?.alert && (
      <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center gap-2 text-red-500 font-black text-xs animate-pulse">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        {data.alert}
      </div>
    )}
  </div>
);

// Alerts List
export const AlertsList = ({ alerts }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow h-full">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <TriangleAlert size={18} className="text-amber-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">การแจ้งเตือน ({alerts.length} รอวิกฤต)</h3>
    </div>
    <div className="space-y-3">
      {alerts.map((alert: any, i: number) => (
        <div key={i} className="p-3 bg-red-50/50 border border-red-100 rounded-xl space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-[8px] font-black rounded uppercase">วิกฤต</span>
            <p className="text-xs font-black text-slate-800">{alert.title}</p>
          </div>
          <p className="text-[10px] font-medium text-slate-500 leading-tight">{alert.desc}</p>
          <p className="text-[9px] font-bold text-slate-400">{alert.time}</p>
        </div>
      ))}
    </div>
  </div>
);

// IoT Cards
export const IoTCards = ({ devices }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <Wifi size={18} className="text-blue-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">อุปกรณ์ IoT ({devices.length})</h3>
    </div>
    <div className="space-y-4">
      {devices.map((device: any, i: number) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-500 rounded-md">
                {device.type === 'watch' ? <Battery size={14} /> : <Wifi size={14} />}
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800">{device.name}</p>
                <p className="text-[9px] font-medium text-slate-400">{device.lastSeen}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-24">
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${device.level < 20 ? 'bg-red-500' : 'bg-slate-800'}`} 
                  style={{ width: `${device.level}%` }}
                ></div>
              </div>
              <span className="text-[9px] font-bold text-slate-400">{device.level}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Risk Score Card
export const RiskScoreCard = ({ scores }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow h-full">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <Activity size={18} className="text-purple-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">AI Risk Score</h3>
    </div>
    <div className="space-y-4">
      {scores.map((score: any, i: number) => (
        <div key={i} className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tight">
            <span className="text-slate-500">{score.label}</span>
            <span className={score.value > 80 ? 'text-red-500' : 'text-slate-400'}>{score.value}/100</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${score.value > 80 ? 'bg-red-500' : 'bg-slate-800'}`} 
              style={{ width: `${score.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Medication Card
export const MedicationCard = ({ medications }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow h-full">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <Pill size={18} className="text-emerald-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">ยา ({medications.length} รายการ)</h3>
    </div>
    <div className="space-y-4">
      {medications.map((med: any, i: number) => (
        <div key={i} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
          <div>
            <p className="text-[11px] font-bold text-slate-800">{med.name}</p>
            <p className="text-[9px] font-medium text-slate-400">{med.schedule}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-emerald-500">{med.adherence}%</p>
            <p className="text-[8px] font-bold text-slate-300 uppercase">Adherence</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Timeline Card
export const TimelineCard = ({ events }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <Clock size={18} className="text-slate-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">Timeline</h3>
    </div>
    <div className="space-y-4 relative">
      <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-50"></div>
      {events.map((event: any, i: number) => (
        <div key={i} className="flex items-start gap-3 relative z-10">
          <div className={`w-2.5 h-2.5 rounded-full mt-1 border-2 border-white shadow-sm flex-shrink-0 ${
            event.type === 'critical' ? 'bg-red-500' : 
            event.type === 'warning' ? 'bg-amber-500' : 'bg-blue-400'
          }`}></div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-700">{event.time}</span>
              <p className="text-[11px] font-bold text-slate-800">{event.title}</p>
            </div>
            {event.desc && <p className="text-[9px] font-medium text-slate-400 leading-tight">{event.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// PDPA Consent Card
export const PDPAConsentCard = ({ consents }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 stat-card-shadow">
    <div className="flex items-center gap-2 mb-6 text-slate-700">
      <ShieldCheck size={18} className="text-emerald-500" />
      <h3 className="text-sm font-black uppercase tracking-wider">PDPA Consent</h3>
    </div>
    <div className="space-y-3">
      {consents.map((consent: any, i: number) => (
        <div key={i} className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-500">{consent.label}</span>
          {consent.status ? (
            <CheckCircle2 size={14} className="text-emerald-500" />
          ) : (
            <XCircle size={14} className="text-red-400" />
          )}
        </div>
      ))}
      <div className="pt-3 mt-3 border-t border-gray-50 flex justify-between items-center text-[8px] font-bold text-slate-300">
        <span>Consent: v2.1</span>
        <span>2026-01-05</span>
      </div>
    </div>
  </div>
);

// Footer Component
export const Footer = () => (
  <div className="bg-slate-900 text-white p-6 md:p-10 rounded-[2rem] shadow-2xl w-full mt-16 overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck size={18} />
          <h4 className="text-[11px] font-black uppercase tracking-widest">Security (Zero Trust)</h4>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
          Azure AD + MFA • RBAC • Key Vault • Private Endpoints • Sentinel SIEM
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-blue-400">
          <FileCheck size={18} />
          <h4 className="text-[11px] font-black uppercase tracking-widest">PDPA Compliance</h4>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
          Consent Management • Data Classification • DSR Portal • Retention 10 ปี • Breach &lt;72hr
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-purple-400">
          <CloudDownload size={18} />
          <h4 className="text-[11px] font-black uppercase tracking-widest">Backup & DR</h4>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
          GRS (SG+HK) • RPO &lt;5min • RTO &lt;30min • WORM Immutable • ASR Failover
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Activity size={18} />
          <h4 className="text-[11px] font-black uppercase tracking-widest">AI Services</h4>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
          Fall Detection • Risk Scoring • Emotion Analysis • Predictive Health • Voice Companion
        </p>
      </div>
    </div>
  </div>
);
