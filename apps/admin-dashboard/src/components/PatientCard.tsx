import React from 'react';
import { PatientAvatar, StatusBadge, VitalPill } from '@healthcare/core';

interface PatientCardProps {
  patient: any;
  onClick: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  const statusBg = {
    critical: 'var(--coral-light)',
    warning: 'var(--amber-light)',
    normal: 'var(--sage-light)'
  }[patient.riskLevel as 'critical' | 'warning' | 'normal'];

  const statusBorder = {
    critical: '1px solid var(--coral-mid)',
    warning: '1px solid var(--amber-mid)',
    normal: '1px solid var(--sage-mid)'
  }[patient.riskLevel as 'critical' | 'warning' | 'normal'];

  return (
    <div 
      onClick={onClick}
      style={{
        backgroundColor: 'var(--warm-white)',
        border: '1.5px solid var(--border)',
        borderRadius: '14px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#1B4D3E';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* 44px Header Strip with bleed and 14px negative margin fix */}
      <div style={{
        height: '44px',
        margin: '-16px -16px 14px -16px',
        backgroundColor: statusBg,
        borderBottom: statusBorder,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '14px 14px 0 0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Avatar bump to 36px */}
          <PatientAvatar name={patient.name} size="md" /> 
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--earth)', fontFamily: "'Playfair Display', serif" }}>{patient.name}</span>
            <span style={{ fontSize: '9px', color: 'var(--bark)', fontWeight: 600 }}>
              {patient.id} · {patient.age}y · {patient.location || patient.room}
            </span>
          </div>
        </div>
        <StatusBadge status={patient.riskLevel} />
      </div>

      {/* Card Body - Vitals with sand background */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ backgroundColor: 'var(--sand)', padding: '4px', borderRadius: '12px', display: 'flex', gap: '8px' }}>
          <VitalPill label="HR" value={patient.hr} unit="bpm" status={patient.riskLevel} />
          <VitalPill label="BP" value={patient.bp} unit="mmHg" status={patient.riskLevel} />
          <VitalPill label="SpO2" value={patient.spo2} unit="%" status="normal" />
        </div>
      </div>
    </div>
  );
};
