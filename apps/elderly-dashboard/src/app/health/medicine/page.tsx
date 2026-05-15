"use client";

import React from 'react';
import { Card, AppTypography, Button } from '@healthcare/core';
import { Pill, CheckCircle, Clock, Plus } from 'lucide-react';

export default function MedicinePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <AppTypography variant="h1" style={{ fontSize: '40px', fontWeight: 900, lineHeight: 1.1 }}>
          Your<br />Meds
        </AppTypography>
        <button style={{ 
          width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--aec-green)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: 'white'
        }}>
           <Plus size={24} />
        </button>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <MedicationCard 
          time="08:00 AM" 
          name="Amlodipine 5mg" 
          status="Taken" 
          takenAt="08:03 AM"
          completed
        />

        <MedicationCard 
          time="01:00 PM" 
          name="Metformin 500mg" 
          status="Next Dose" 
          active
        />

        <MedicationCard 
          time="08:00 PM" 
          name="Vitamin D3" 
          status="Upcoming" 
        />

      </div>

      {/* Adherence Card */}
      <section>
        <Card style={{ padding: '24px', borderRadius: '32px', backgroundColor: 'var(--aec-bg)', border: 'none' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
             <AppTypography variant="h2" style={{ fontSize: '18px', fontWeight: 800 }}>Weekly Progress</AppTypography>
             <AppTypography variant="h1" style={{ fontSize: '24px', fontWeight: 900, color: 'var(--aec-green)' }}>80%</AppTypography>
           </div>
           <div style={{ height: '12px', width: '100%', backgroundColor: 'white', borderRadius: '6px', overflow: 'hidden' }}>
             <div style={{ height: '100%', width: '80%', backgroundColor: 'var(--aec-green)', borderRadius: '6px' }} />
           </div>
        </Card>
      </section>

    </div>
  );
}

const MedicationCard = ({ time, name, status, takenAt, completed, active }: any) => (
  <Card style={{ 
    padding: '24px', borderRadius: '32px', 
    backgroundColor: active ? 'var(--aec-text)' : 'white',
    color: active ? 'white' : 'var(--aec-text)',
    display: 'flex', alignItems: 'center', gap: '20px',
    border: active ? 'none' : '1px solid var(--aec-border)'
  }}>
    <div style={{ 
      width: '56px', height: '56px', borderRadius: '16px', 
      backgroundColor: active ? 'rgba(255,255,255,0.1)' : (completed ? 'rgba(22, 163, 74, 0.1)' : 'var(--aec-bg)'),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: active ? 'white' : (completed ? 'var(--aec-success)' : 'var(--aec-text-muted)')
    }}>
      {completed ? <CheckCircle size={28} /> : <Clock size={28} />}
    </div>
    <div style={{ flex: 1 }}>
      <AppTypography variant="h2" style={{ color: 'inherit', fontSize: '18px', fontWeight: 800 }}>{name}</AppTypography>
      <AppTypography variant="body" style={{ color: active ? 'rgba(255,255,255,0.6)' : 'var(--aec-text-muted)', fontSize: '14px', fontWeight: 700 }}>
        {time} {takenAt && `· ${takenAt}`}
      </AppTypography>
    </div>
    {active && <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--aec-alert)' }} />}
  </Card>
);
