"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SOSButton = () => {
  return (
    <button 
      onClick={() => alert('SOS Triggered!')}
      style={{
        background: 'linear-gradient(135deg, #C85A3A, #E07050)',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        padding: '20px 24px',
        width: 'calc(100% - 32px)',
        margin: '16px 16px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontFamily: "'Sarabun', sans-serif",
        boxShadow: '0 6px 24px rgba(200, 90, 58, 0.35)',
        minHeight: '64px',
        cursor: 'pointer',
        transition: 'transform 0.1s, box-shadow 0.1s'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.97)';
        e.currentTarget.style.boxShadow = '0 3px 12px rgba(200, 90, 58, 0.2)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(200, 90, 58, 0.35)';
      }}
    >
      <AlertTriangle size={24} color="white" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
        <span style={{ fontSize: '17px', fontWeight: 700 }}>🆘 Emergency SOS</span>
        <span style={{ fontSize: '14px', fontWeight: 400, opacity: 0.9 }}>Request immediate help</span>
      </div>
    </button>
  );
};
