"use client";

import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { ChatMessage, QuickReply } from '../models/dashboard';

interface AsuriaChatCardProps {
  messages: ChatMessage[];
  quickReplies: QuickReply[];
  onSendMessage: (text: string) => void;
}

export const AsuriaChatCard: React.FC<AsuriaChatCardProps> = ({ 
  messages, 
  quickReplies, 
  onSendMessage 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div style={{
      backgroundColor: 'var(--warm-white)',
      border: '1.5px solid var(--border)',
      borderRadius: '16px',
      margin: '0 16px 100px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1.5px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div className="pulse-dot" style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'var(--sage)',
        }} />
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Asuria AI · ผู้ช่วย AI</span>
      </div>

      {/* Chat Area */}
      <div style={{
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: '120px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            maxWidth: '85%',
            padding: '12px 16px',
            fontSize: '16px',
            lineHeight: '1.6',
            borderRadius: msg.role === 'ai' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
            backgroundColor: msg.role === 'ai' ? 'var(--sky-light)' : 'var(--sand2)',
            color: msg.role === 'ai' ? 'var(--sky)' : 'var(--text-primary)',
            alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
          }}>
            <p style={{ margin: 0 }}>{msg.th}</p>
            {msg.en && <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.8 }}>{msg.en}</p>}
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '0 16px 14px'
      }}>
        {quickReplies.map((reply, i) => (
          <button 
            key={i} 
            onClick={() => onSendMessage(reply.value)}
            style={{
              backgroundColor: 'var(--sky-light)',
              color: 'var(--sky)',
              border: '1.5px solid var(--sky-mid)',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '15px',
              fontWeight: 600,
              minHeight: '44px',
              cursor: 'pointer'
            }}
          >
            {reply.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div style={{
        borderTop: '1.5px solid var(--border-light)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--warm-white)'
      }}>
        <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--sky-light)', color: 'var(--sky)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mic size={18} />
        </button>
        
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="พูดหรือพิมพ์เพื่อคุยกับ AI..."
          style={{
            flex: 1,
            borderRadius: '20px',
            background: 'var(--sand)',
            border: 'none',
            padding: '10px 16px',
            fontSize: '16px',
            outline: 'none'
          }}
        />

        <button 
          onClick={handleSend}
          style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--sky)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={18} />
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 124, 89, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(74, 124, 89, 0); }
        }
        .pulse-dot {
          animation: pulse-green 2s infinite;
        }
      `}</style>
    </div>
  );
};
