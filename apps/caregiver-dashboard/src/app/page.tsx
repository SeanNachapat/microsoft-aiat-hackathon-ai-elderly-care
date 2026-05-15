"use client";

import React from 'react';
import { Card, Button, StatusBadge, AppTypography, PatientAvatar, MOCK_DATA } from '@healthcare/core';
import { Search, AlertCircle, TrendingUp, MoreVertical } from 'lucide-react';

export default function CaregiverDashboard() {
  const patients = MOCK_DATA.allPatients;
  const alerts = MOCK_DATA.alerts;
  const system = MOCK_DATA.systemHealth;

  return (
    <div className="caregiver-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <AppTypography variant="h1" style={{ color: 'var(--aec-green)' }}>
            Patient Monitoring
          </AppTypography>
          <AppTypography variant="body" style={{ opacity: 0.6 }}>
            Viewing {patients.length} active seniors in Facility A
          </AppTypography>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '12px', opacity: 0.4 }} size={20} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              style={{ 
                padding: '12px 12px 12px 40px', borderRadius: 'var(--radius)', 
                border: '1px solid var(--aec-border)', background: 'var(--aec-surface)',
                outline: 'none', width: '300px'
              }} 
            />
          </div>
          <Button variant="primary" size="md">
            + New Assessment
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        
        {/* Patient Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
           {patients.map((p) => (
             <PatientMonitorCard key={p.id} name={p.name} status={p.status} hr={p.hr} o2={p.o2} lastActive="5m ago" />
           ))}
        </div>

        {/* Right Sidebar: Active Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ padding: '24px' }}>
            <AppTypography variant="h2" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle color="var(--aec-alert)" /> Active Alerts
            </AppTypography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {alerts.map((a) => (
                 <AlertItem key={a.id} name={a.patientName} alert={a.type} time={a.time} />
               ))}
            </div>
          </Card>

          <Card style={{ padding: '24px' }}>
            <AppTypography variant="h2" style={{ marginBottom: '20px' }}>
              System Health
            </AppTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <AppTypography variant="caps">Network</AppTypography>
              <StatusBadge status={system.network as any} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AppTypography variant="caps">AI Models</AppTypography>
              <StatusBadge status={system.aiModels as any} />
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

const PatientMonitorCard = ({ name, status, hr, o2, lastActive }: any) => (
  <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <PatientAvatar name={name} size="md" />
        <div>
          <AppTypography variant="h2" style={{ fontSize: '18px' }}>{name}</AppTypography>
          <AppTypography variant="caps" style={{ fontSize: '10px' }}>Last: {lastActive}</AppTypography>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <div style={{ background: 'var(--aec-bg)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
        <AppTypography variant="caps" style={{ fontSize: '9px' }}>Heart Rate</AppTypography>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <AppTypography variant="h2" style={{ fontSize: '20px', color: status === 'critical' ? 'var(--aec-alert)' : 'inherit' }}>{hr}</AppTypography>
          <AppTypography variant="caps" style={{ fontSize: '10px' }}>BPM</AppTypography>
        </div>
      </div>
      <div style={{ background: 'var(--aec-bg)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
        <AppTypography variant="caps" style={{ fontSize: '9px' }}>SpO2</AppTypography>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <AppTypography variant="h2" style={{ fontSize: '20px' }}>{o2}</AppTypography>
          <AppTypography variant="caps" style={{ fontSize: '10px' }}>%</AppTypography>
        </div>
      </div>
    </div>

    <Button variant="secondary" size="sm" style={{ width: '100%', justifyContent: 'space-between' }}>
      View Full Profile <ChevronRight size={16} />
    </Button>
  </Card>
);

const AlertItem = ({ name, alert, time }: any) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(217, 64, 64, 0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--aec-alert)' }}>
    <div>
      <AppTypography variant="h2" style={{ fontSize: '14px' }}>{name}</AppTypography>
      <AppTypography variant="body" style={{ fontSize: '12px', opacity: 0.7 }}>{alert}</AppTypography>
    </div>
    <AppTypography variant="caps" style={{ fontSize: '10px' }}>{time}</AppTypography>
  </div>
);

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
