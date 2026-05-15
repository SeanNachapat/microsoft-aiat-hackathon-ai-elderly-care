import React from 'react';
import { Sparkles, Mic, Send } from 'lucide-react';

interface AIChatBoxProps {
  history: { role: 'user' | 'ai', text: string }[];
  msg: string;
  onMsgChange: (val: string) => void;
  onSend: () => void;
}

export const AIChatBox: React.FC<AIChatBoxProps> = ({ history, msg, onMsgChange, onSend }) => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[360px]">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
      <Sparkles size={18} className="text-amber-400" />
      <span className="font-black text-slate-800">AI Care Assistant — Asuria</span>
      <span className="ml-auto text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">LIVE</span>
    </div>
    <div className="flex-1 overflow-y-auto p-5 space-y-3">
      {history.map((m, i) => (
        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700 border border-slate-100'}`}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
    <div className="p-4 border-t border-slate-100 flex gap-3">
      <button className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 flex-shrink-0">
        <Mic size={18} />
      </button>
      <input
        value={msg}
        onChange={e => onMsgChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSend()}
        type="text"
        placeholder="Ask about patient or get advice..."
        className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 text-sm font-medium outline-none focus:border-blue-400 transition-colors"
      />
      <button onClick={onSend} className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
        <Send size={16} />
      </button>
    </div>
  </div>
);
