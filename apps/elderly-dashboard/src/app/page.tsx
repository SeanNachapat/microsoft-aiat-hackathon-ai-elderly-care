"use client";

import React from 'react';
import { Card, AppTypography, MOCK_DATA } from '@healthcare/core';
import { Calendar, ChevronRight, Activity, Bell, Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function HomePage() {
  const patient = MOCK_DATA.primaryPatient;
  const upcomingReminders = patient.medications.filter(m => m.status === 'pending' || m.status === 'upcoming');

  return (
    <div className="elderly-home" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <AppTypography variant="h1" style={{ fontSize: '40px', fontWeight: 900, lineHeight: 1.1 }}>
            Daily<br />Insight
          </AppTypography>
        </div>
      </header>

      {/* 2. Activity Score Section - Premium Redesign */}
      <section>
        <div style={{ 
          padding: '28px', borderRadius: '40px', 
          background: 'linear-gradient(135deg, var(--aec-green) 0%, #2D5A4C 100%)', 
          color: 'white',
          display: 'flex', flexDirection: 'column', gap: '20px',
          boxShadow: '0 20px 40px rgba(27, 77, 62, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background element */}
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '44px', height: '44px', borderRadius: '14px', 
                backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Sparkles size={22} color="var(--aec-gold)" />
              </div>
              <div>
                <AppTypography variant="h2" style={{ color: 'white', fontSize: '18px', fontWeight: 800 }}>Activity Score</AppTypography>
                <AppTypography variant="body" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 700 }}>AI ANALYZED</AppTypography>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
               <AppTypography variant="h1" style={{ color: 'white', fontSize: '40px', fontWeight: 900, lineHeight: 1 }}>{patient.sensors.activityScore}</AppTypography>
               <AppTypography variant="body" style={{ color: 'var(--aec-gold)', fontSize: '12px', fontWeight: 800 }}>EXCELLENT</AppTypography>
            </div>
          </div>
          
          <div style={{ height: '10px', width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${patient.sensors.activityScore}%`, backgroundColor: 'var(--aec-gold)', borderRadius: '5px' }} />
          </div>

          <AppTypography variant="body" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', lineHeight: 1.5, fontWeight: 600 }}>
            {patient.sensors.analyzedInsights}
          </AppTypography>
        </div>
      </section>

      {/* 3. Upcoming Reminders Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
           <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800 }}>Upcoming</AppTypography>
           <AppTypography variant="body" style={{ fontSize: '14px', color: 'var(--aec-text-muted)', fontWeight: 700 }}>{upcomingReminders.length + 1} items</AppTypography>
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
          
          <ScheduleCard 
            icon={<TrendingUp size={20} />} 
            title="Weight Check" 
            date="04:00 PM" 
            variant="light"
          />
        </div>
      </section>

      {/* 4. Care Team Section */}
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
