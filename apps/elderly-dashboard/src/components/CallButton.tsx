"use client";

import React from 'react';
import { Phone } from 'lucide-react';

export const CallButton = () => {
  return (
    <button style={{
      backgroundColor: 'var(--warm-white)',
      color: 'var(--sage-dark)',
      border: '1.5px solid var(--sage-mid)',
      borderRadius: '14px',
      padding: '14px 24px',
      width: 'calc(100% - 32px)',
      margin: '0 16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontSize: '15px',
      fontWeight: 600,
      minHeight: '52px',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--sage-light)'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--warm-white)'}
    >
      <Phone size={20} color="var(--sage)" />
      <span>📞 โทรหาผู้ดูแล · Call Caregiver</span>
    </button>
  );
};
