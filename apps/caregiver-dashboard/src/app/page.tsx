"use client";

import React, { useState } from 'react';
import { Card, StatusBadge, AppTypography, PatientAvatar, MOCK_DATA } from '@healthcare/core';
import { Search, Bell, ChevronDown, Users, AlertTriangle, CheckCircle, Wifi, MoreHorizontal, ChevronRight } from 'lucide-react';

export default function CaregiverDashboard() {
  const patients = MOCK_DATA.allPatients;
  const alerts = MOCK_DATA.alerts;

  // Screenshot stats: Total 128, At Risk 12, Normal 98, Offline 18.
  const summaryStats = {
    total: 128,
    atRisk: 12,
    normal: 98,
    offline: 18
  };

  return (
    <div className="caregiver-dashboard" style={{ 
      display: 'flex', flexDirection: 'column', gap: '32px', 
      background: '#FFFFFF', padding: '40px', minHeight: '100vh',
      color: '#0F172A'
    }}>
      
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <AppTypography variant="h1" style={{ fontSize: '24px', fontWeight: 700 }}>
          Residents Overview
        </AppTypography>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '10px', color: '#94A3B8' }} size={20} />
            <input 
              type="text" 
              placeholder="Search resident.." 
              style={{ 
                padding: '10px 12px 10px 40px', borderRadius: '24px', 
                border: '1px solid #E2E8F0', background: 'white',
                outline: 'none', width: '280px', fontSize: '14px'
              }} 
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', cursor: 'pointer' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>All Status</span>
            <ChevronDown size={16} color="#64748B" />
          </div>

          <div style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
            <Bell size={24} color="#64748B" />
            <div style={{ 
              position: 'absolute', top: '-4px', right: '-4px', 
              background: '#EF4444', color: 'white', fontSize: '10px', 
              fontWeight: 'bold', width: '16px', height: '16px', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>3</div>
          </div>

        </div>
      </div>

      {/* Summary Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <SummaryCard title="Total Residents" value={summaryStats.total} icon={<Users size={24} color="#10B981" />} iconBg="#D1FAE5" />
        <SummaryCard title="At Risk" value={summaryStats.atRisk} icon={<AlertTriangle size={24} color="#EF4444" />} iconBg="#FEE2E2" />
        <SummaryCard title="Normal" value={summaryStats.normal} icon={<CheckCircle size={24} color="#10B981" />} iconBg="#D1FAE5" />
        <SummaryCard title="Offline" value={summaryStats.offline} icon={<Wifi size={24} color="#64748B" />} iconBg="#F1F5F9" />
      </div>

      {/* Main Grid: List (left) & Sidebar (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        
        {/* Left Column: Residents List */}
        <Card style={{ padding: '24px', background: 'white', borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Residents</h2>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: '13px', fontWeight: 600, borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '25%' }}>Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '15%' }}>Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '20%' }}>Heart Rate</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '15%' }}>Activity</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '15%' }}>Last Update</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '10%', textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => {
                const isRisk = p.status === 'critical' || p.status === 'warning';
                // Mock activity/time to match screenshot data feel
                const steps = [1245, 4256, 3842, 532, 5168, 2341][index % 6];
                const time = ['10:24 AM', '10:24 AM', '10:23 AM', '10:22 AM', '10:21 AM', '10:15 AM'][index % 6];
                
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ flexShrink: 0 }}><PatientAvatar name={p.name} size="sm" /></div>
                        <span style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ 
                        display: 'inline-flex', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                        background: isRisk ? '#FEE2E2' : '#D1FAE5',
                        color: isRisk ? '#EF4444' : '#10B981',
                        whiteSpace: 'nowrap'
                      }}>
                        {isRisk ? 'At Risk' : 'Normal'}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.hr} bpm</span>
                        <div style={{ flexShrink: 0 }}><Sparkline isRisk={isRisk} /></div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#475569', whiteSpace: 'nowrap' }}>
                      {steps} steps
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#475569', whiteSpace: 'nowrap' }}>
                      {time}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {isRisk ? (
                        <div style={{ background: '#FEE2E2', padding: '6px', borderRadius: '6px', display: 'inline-flex' }}>
                           <AlertTriangle size={18} color="#EF4444" />
                        </div>
                      ) : (
                        <MoreHorizontal size={20} color="#94A3B8" style={{ cursor: 'pointer' }} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all residents <ChevronRight size={16} />
            </span>
          </div>
        </Card>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Risk Distribution Donut Chart */}
          <Card style={{ padding: '24px', background: 'white', borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 24px 0' }}>Risk Distribution</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="40" fill="transparent" stroke="#10B981" strokeWidth="20" strokeDasharray="187 64" />
                  <circle cx="60" cy="60" r="40" fill="transparent" stroke="#EF4444" strokeWidth="20" strokeDasharray="19 232" strokeDashoffset="-191" />
                  <circle cx="60" cy="60" r="40" fill="transparent" stroke="#CBD5E1" strokeWidth="20" strokeDasharray="32 219" strokeDashoffset="-214" />
                </svg>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <LegendItem color="#10B981" label="Normal" value="76.6%" />
                <LegendItem color="#EF4444" label="At Risk" value="9.4%" />
                <LegendItem color="#CBD5E1" label="Offline" value="14.0%" />
              </div>
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card style={{ padding: '24px', background: 'white', borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Recent Alerts</h3>
              <span style={{ color: '#10B981', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>View all</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {alerts.map((a, i) => (
                <div key={a.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    background: a.severity === 'critical' ? '#FEE2E2' : '#FEF3C7', 
                    padding: '10px', borderRadius: '50%', flexShrink: 0, width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <AlertTriangle size={20} color={a.severity === 'critical' ? '#EF4444' : '#F59E0B'} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>{a.type}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                      {a.patientName} • {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

const SummaryCard = ({ title, value, icon, iconBg }: { title: string, value: number, icon: React.ReactNode, iconBg: string }) => (
  <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'white', borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
    <AppTypography variant="body" style={{ color: '#64748B', fontSize: '14px', fontWeight: 600 }}>{title}</AppTypography>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontSize: '32px', fontWeight: 700 }}>{value}</span>
    </div>
  </Card>
);

const Sparkline = ({ isRisk }: { isRisk: boolean }) => (
  <svg width="40" height="16" viewBox="0 0 40 16">
    <path 
      d={isRisk ? "M0,8 L10,8 L15,2 L20,14 L25,8 L40,8" : "M0,8 L10,8 L15,5 L20,10 L25,8 L40,8"} 
      fill="none" 
      stroke={isRisk ? "#EF4444" : "#10B981"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const LegendItem = ({ color, label, value }: { color: string, label: string, value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
    <span style={{ fontSize: '13px', color: '#475569', width: '60px' }}>{label}</span>
    <span style={{ fontSize: '13px', fontWeight: 600 }}>{value}</span>
  </div>
);
