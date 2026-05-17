"use client";

import React from 'react';
import { Bell } from 'lucide-react';

export const TopBar = () => {
  return (
    <div style={{ 
      position: 'absolute', top: '32px', right: '24px', zIndex: 1000 
    }}>
      <button style={{ 
        border: '1px solid var(--aec-border)', background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(10px)',
        width: '56px', height: '56px', 
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
        position: 'relative'
      }}>
        <Bell size={24} color="var(--aec-text)" />
        {/* Unread Indicator */}
        <div style={{ 
          position: 'absolute', top: '16px', right: '16px', 
          width: '10px', height: '10px', borderRadius: '50%', 
          backgroundColor: 'var(--aec-alert)', border: '2px solid white' 
        }} />
      </button>
    </div>
  );
};
