"use client";

import React from 'react';
import { Card, AppTypography, MOCK_DATA } from '@healthcare/core';
import { Activity, Moon, Thermometer, ShieldCheck, Pill, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HealthSummaryPage() {
  const patient = MOCK_DATA.primaryPatient;
  const nextDose = patient.medications.find(m => m.status === 'pending') || patient.medications[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      <header>
        <AppTypography variant="h1" style={{ fontSize: '40px', fontWeight: 900, lineHeight: 1.1 }}>
          Daily<br />Health
        </AppTypography>
      </header>

      {/* Main Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        <MetricCard 
          icon={<Activity size={24} />} 
          label="Activity" 
          value={patient.sensors.motion} 
          detail="Target Reached"
          variant="dark"
        />

        <MetricCard 
          icon={<Moon size={24} />} 
          label="Sleep" 
          value={patient.vitals.heartRate.toString()} 
          detail="Avg BPM"
        />

        <MetricCard 
          icon={<Thermometer size={24} />} 
          label="Indoor" 
          value={patient.sensors.roomTemp.toString()} 
          detail="Temp °C"
        />

        <MetricCard 
          icon={<ShieldCheck size={24} />} 
          label="Safety" 
          value="Safe" 
          detail="No falls today"
          color="var(--aec-success)"
        />

      </div>

      {/* Medication Quick Access */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
           <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800 }}>Medications</AppTypography>
           <Link href="/health/medicine" style={{ textDecoration: 'none', color: 'var(--aec-green)', fontWeight: 700, fontSize: '14px' }}>View All</Link>
        </div>
        
        <Link href="/health/medicine" style={{ textDecoration: 'none' }}>
          <Card style={{ padding: '24px', borderRadius: '32px', backgroundColor: 'var(--aec-text)', color: 'white', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pill size={28} color="white" />
            </div>
            <div style={{ flex: 1 }}>
               <AppTypography variant="h2" style={{ color: 'white', fontSize: '18px', fontWeight: 800 }}>Next Dose</AppTypography>
               <AppTypography variant="body" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 600 }}>{nextDose.time} · {nextDose.name}</AppTypography>
            </div>
            <ArrowUpRight color="white" opacity={0.5} />
          </Card>
        </Link>
      </section>

    </div>
  );
}

const MetricCard = ({ icon, label, value, detail, variant, color }: any) => {
  const isDark = variant === 'dark';
  return (
    <div style={{ 
      padding: '24px', borderRadius: '32px', 
      backgroundColor: isDark ? 'var(--aec-text)' : 'white',
      border: isDark ? 'none' : '1px solid var(--aec-border)',
      display: 'flex', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{ 
        width: '48px', height: '48px', borderRadius: '16px', 
        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'var(--aec-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isDark ? 'white' : 'var(--aec-green)'
      }}>
        {icon}
      </div>
      <div>
        <AppTypography variant="caps" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--aec-text-muted)', fontSize: '10px', fontWeight: 700 }}>{label}</AppTypography>
        <AppTypography variant="h1" style={{ color: color || (isDark ? 'white' : 'var(--aec-text)'), fontSize: '24px', fontWeight: 900 }}>{value}</AppTypography>
        <AppTypography variant="body" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--aec-text-muted)', fontSize: '11px', fontWeight: 600 }}>{detail}</AppTypography>
      </div>
    </div>
  );
};
