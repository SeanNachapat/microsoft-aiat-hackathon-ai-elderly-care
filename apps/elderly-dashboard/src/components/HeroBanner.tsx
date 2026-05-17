"use client";

import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div style={{
      margin: '20px 16px',
      backgroundColor: '#1A3D34',
      borderRadius: '24px',
      padding: '24px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(26,61,52,0.3)'
    }}>
      {/* Background Graphic */}
      <div style={{
        position: 'absolute',
        right: '-20px',
        bottom: '-20px',
        width: '140px',
        height: '140px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      <div style={{ flex: 1, zIndex: 1 }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          YOUR WELLNESS,<br />ONE TAP AWAY!
        </h2>
        <p style={{ fontSize: '11px', opacity: 0.8, margin: '8px 0 16px', maxWidth: '140px' }}>
          Seamless & Fast Health Monitoring at Your Fingertips.
        </p>
        <button style={{
          backgroundColor: 'white',
          color: '#1A3D34',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer'
        }}>
          Explore
        </button>
      </div>

      <div style={{ 
        width: '100px', 
        height: '100px', 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }}>
        {/* Placeholder for Illustration */}
        <Sparkles size={48} color="var(--sky)" />
      </div>
    </div>
  );
};

export const SOSHeroCard = () => {
  return (
    <div style={{
      margin: '0 16px 20px',
      background: 'linear-gradient(135deg, #C85A3A, #E07050)',
      borderRadius: '20px',
      padding: '20px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: '0 8px 24px rgba(200, 90, 58, 0.3)'
    }}>
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AlertTriangle size={30} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>ขอความช่วยเหลือด่วน</h3>
        <p style={{ fontSize: '12px', opacity: 0.9, margin: '2px 0 0' }}>Emergency Help Call</p>
      </div>
      <button style={{
        backgroundColor: 'white',
        color: '#C85A3A',
        border: 'none',
        borderRadius: '10px',
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '20px'
      }}>
        🆘
      </button>
    </div>
  );
}
