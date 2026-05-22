"use client";

import React from 'react';
import { AppTypography, MOCK_DATA } from '@healthcare/core';
import { Calendar, ChevronRight, Activity, Bell, TrendingUp, Thermometer, Moon, Footprints } from 'lucide-react';
import elderInfo from '../data/elderInfo.json';

export default function HomePage() {
  const patient = MOCK_DATA.primaryPatient;
  const elderName = elderInfo.preferredName || elderInfo.name;
  
  const upcomingReminders = elderInfo.medications.map(m => ({
    id: m.name,
    name: m.name,
    time: m.time,
    status: 'pending'
  }));

  return (
    <div className="elderly-home" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. Header Section */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            overflow: 'hidden', border: '2px solid white', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
            flexShrink: 0 
          }}>
            <img 
              src="/avatar-elderly.png" 
              alt="Elderly Thai Man Avatar" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Hello,</span>
            <AppTypography variant="h1" style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
              {elderName}
            </AppTypography>
          </div>
        </div>
        
        <div style={{ 
          position: 'relative', 
          cursor: 'pointer', 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          backgroundColor: 'white', 
          border: '1px solid var(--aec-border)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
        }}>
          <Bell size={22} color="#475569" />
          <div style={{ 
            position: 'absolute', top: '12px', right: '12px', 
            background: 'var(--aec-gold)', width: '8px', height: '8px', 
            borderRadius: '50%'
          }}></div>
        </div>
      </header>

      {/* 2. Overall Status Banner */}
      <section>
        <div style={{ 
          padding: '28px', borderRadius: '32px', 
          background: 'linear-gradient(135deg, var(--aec-green) 0%, #2D5A4C 100%)', 
          color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 20px 40px rgba(27, 77, 62, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.02em' }}>Overall Status</span>
            <AppTypography variant="h1" style={{ color: 'white', fontSize: '38px', fontWeight: 900, lineHeight: 1.1, margin: 0 }}>
              All Good
            </AppTypography>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>
              Last updated: 9:41 AM
            </span>
          </div>
          
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            flexShrink: 0
          }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '50%', 
              backgroundColor: 'white', display: 'flex', 
              alignItems: 'center', justifyContent: 'center' 
            }}>
              <Activity size={28} color="var(--aec-green)" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Health Overview Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800 }}>Health Overview</AppTypography>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <VitalCard 
            title="Activity Today" 
            value="4,256 steps" 
            icon={<Footprints size={20} color="#10B981" />} 
            bg="#E6F4EA" 
          />
          <VitalCard 
            title="Heart Rate" 
            value={`${patient.vitals.heartRate} bpm`} 
            icon={<Activity size={20} color="#EF4444" />} 
            bg="#FCE8E6" 
          />
          <VitalCard 
            title="Sleep" 
            value="7h 30m" 
            icon={<Moon size={20} color="#8AB4F8" />} 
            bg="#E8F0FE" 
          />
          <VitalCard 
            title="Temperature" 
            value={`${patient.vitals.temperature} °C`} 
            icon={<Thermometer size={20} color="#10B981" />} 
            bg="#E6F4EA" 
          />
        </div>
      </section>

      {/* 4. Upcoming Reminders Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
           <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800 }}>Upcoming Reminders</AppTypography>
           <AppTypography variant="body" style={{ fontSize: '14px', color: 'var(--aec-text-muted)', fontWeight: 700 }}>{upcomingReminders.length} items</AppTypography>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none', margin: '0 -24px', paddingLeft: '24px' }}>
          {upcomingReminders.map((med) => (
            <ScheduleCard 
              key={med.id}
              icon={<Calendar size={20} />} 
              title={med.name} 
              date={med.time} 
              variant={med.status === 'pending' ? 'dark' : 'light'}
            />
          ))}
          
          {upcomingReminders.length === 0 && (
            <div style={{ padding: '24px 0', color: 'var(--aec-text-muted)', fontSize: '14px', fontWeight: 600 }}>
              All done for today!
            </div>
          )}
        </div>
      </section>

      {/* 5. Care Team Section */}
      <section style={{ paddingBottom: '40px' }}>
        <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>On-Call Support</AppTypography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {patient.careTeam.slice(0, 1).map((member) => (
            <CareTeamCard 
              key={member.id}
              name={member.name} 
              specialty="Available Now" 
              image={member.image}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

const VitalCard = ({ title, value, icon, bg }: any) => (
  <div style={{ 
    padding: '20px', 
    borderRadius: '24px', 
    backgroundColor: 'white', 
    border: '1px solid var(--aec-border)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.01)'
  }}>
    <div style={{ 
      width: '48px', height: '48px', borderRadius: '50%', 
      backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0
    }}>
      {icon}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>{title}</span>
      <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{value}</span>
    </div>
  </div>
);

const ScheduleCard = ({ icon, title, date, variant }: any) => {
  const isDark = variant === 'dark';
  return (
    <div style={{ 
      minWidth: '220px', height: '240px', borderRadius: '32px', 
      backgroundColor: isDark ? 'var(--aec-text)' : 'white',
      padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      border: isDark ? 'none' : '1px solid var(--aec-border)',
      boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.02)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '16px', 
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'var(--aec-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isDark ? 'white' : 'var(--aec-text)'
        }}>
          {icon}
        </div>
        <div style={{ textAlign: 'right' }}>
           <AppTypography variant="body" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--aec-text-muted)', fontSize: '12px', fontWeight: 700 }}>TODAY</AppTypography>
           <AppTypography variant="h1" style={{ color: isDark ? 'white' : 'var(--aec-text)', fontSize: '22px', fontWeight: 900 }}>{date}</AppTypography>
        </div>
      </div>
      
      <AppTypography variant="h2" style={{ color: isDark ? 'white' : 'var(--aec-text)', fontSize: '20px', fontWeight: 800, lineHeight: 1.2 }}>
        {title}
      </AppTypography>
    </div>
  );
};

const CareTeamCard = ({ name, specialty, image }: any) => (
  <div style={{ padding: '20px', borderRadius: '32px', backgroundColor: 'white', border: '1px solid var(--aec-border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#F0F9FF', overflow: 'hidden' }}>
      <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ flex: 1 }}>
      <AppTypography variant="h2" style={{ fontSize: '18px', fontWeight: 800 }}>{name}</AppTypography>
      <AppTypography variant="body" style={{ fontSize: '14px', color: 'var(--aec-success)', fontWeight: 700 }}>{specialty}</AppTypography>
    </div>
    <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--aec-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ChevronRight size={20} color="var(--aec-text-muted)" />
    </div>
  </div>
);
