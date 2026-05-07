import React from 'react';
import { ShieldCheck, FileCheck, CloudDownload, Activity } from 'lucide-react';

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
