"use client";

import React from 'react';
import { Card, Button, StatusBadge, AppTypography, MOCK_DATA } from '@healthcare/core';
import { Activity, Users, ShieldCheck, Zap, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const alertsCount = MOCK_DATA.alerts.length;
  const patientsCount = MOCK_DATA.allPatients.length;
  const system = MOCK_DATA.systemHealth;

  return (
    <div className="admin-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Hero KPI Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <KPICard icon={<Users />} label="Total Monitoring" value={patientsCount.toString()} trend="+2 today" />
        <KPICard icon={<Activity />} label="Network Status" value="Online" trend="Stable" color="var(--aec-green)" />
        <KPICard icon={<AlertTriangle />} label="Active Criticals" value={`0${alertsCount}`} trend="-20%" color="var(--aec-alert)" />
        <KPICard icon={<Zap />} label="Avg Response" value="1.2m" trend="-15s" />
      </section>

      {/* Strategic Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        
        {/* Fleet Health Map / Grid */}
        <Card style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <AppTypography variant="h2">Ecosystem Connectivity</AppTypography>
            <Button variant="ghost" size="sm">Download Report</Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <FacilityRow name="Green Valley Center" patients={patientsCount} staff={5} status={system.network} />
             <FacilityRow name="Azure Heights" patients={42} staff={8} status="normal" />
             <FacilityRow name="Ocean Breeze" patients={15} staff={3} status="warning" />
          </div>
        </Card>

        {/* System Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ padding: '24px' }}>
            <AppTypography variant="h2" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck color="var(--aec-green)" /> Security Sentinel
            </AppTypography>
            <SecurityItem label="Encryption" value="AES-256-GCM" status="Active" />
            <SecurityItem label="Data Residency" value="Azure SE Asia" status="Active" />
            <SecurityItem label="AI Guardrails" value="Llama Guard 3" status="Active" />
          </Card>

          <Card style={{ padding: '24px', background: 'linear-gradient(135deg, var(--aec-surface), #f8fafc)' }}>
             <AppTypography variant="caps">AI Model Status</AppTypography>
             <AppTypography variant="h1" style={{ fontSize: '32px', margin: '12px 0' }}>GPT-4o</AppTypography>
             <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--aec-success)' }}></div>
               <AppTypography variant="body" style={{ fontSize: '12px', opacity: 0.7 }}>Latency: 450ms</AppTypography>
             </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

const KPICard = ({ icon, label, value, trend, color = 'inherit' }: any) => (
  <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ color: color === 'inherit' ? 'var(--aec-green)' : color, opacity: 0.8 }}>
      {icon}
    </div>
    <div>
      <AppTypography variant="caps" style={{ fontSize: '10px' }}>{label}</AppTypography>
      <AppTypography variant="h1" style={{ fontSize: '36px', color: color === 'inherit' ? 'var(--aec-text)' : color }}>
        {value}
      </AppTypography>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
       <TrendingUp size={14} color="var(--aec-success)" />
       <AppTypography variant="body" style={{ fontSize: '12px', color: 'var(--aec-success)' }}>{trend}</AppTypography>
    </div>
  </Card>
);

const FacilityRow = ({ name, patients, staff, status }: any) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--aec-border)' }}>
    <div>
      <AppTypography variant="h2" style={{ fontSize: '18px' }}>{name}</AppTypography>
      <AppTypography variant="body" style={{ fontSize: '12px', opacity: 0.5 }}>{patients} Patients · {staff} Caregivers</AppTypography>
    </div>
    <StatusBadge status={status} />
  </div>
);

const SecurityItem = ({ label, value, status }: any) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
    <div>
      <AppTypography variant="body" style={{ fontSize: '14px', fontWeight: 600 }}>{label}</AppTypography>
      <AppTypography variant="body" style={{ fontSize: '12px', opacity: 0.5 }}>{value}</AppTypography>
    </div>
    <AppTypography variant="caps" style={{ color: 'var(--aec-green)' }}>{status}</AppTypography>
  </div>
);
