"use client";

import React from 'react';
import { Card, AppTypography, PatientAvatar, MOCK_DATA } from '@healthcare/core';
import { Phone, Shield, Cpu, Settings, ChevronRight, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const patient = MOCK_DATA.primaryPatient;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* 1. Profile Header */}
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center', paddingTop: '20px' }}>
        <div style={{ position: 'relative' }}>
          <PatientAvatar name={patient.name} size="lg" />
          <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--aec-success)', border: '4px solid var(--aec-bg)' }} />
        </div>
        <div>
          <AppTypography variant="h1" style={{ fontSize: '32px', fontWeight: 900 }}>{patient.fullName}</AppTypography>
          <AppTypography variant="body" style={{ color: 'var(--aec-text-muted)', fontWeight: 700 }}>AEC Member ID: {patient.id}</AppTypography>
        </div>
      </header>

      {/* 2. Personal Info Stats */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <InfoBadge label="Age" value={patient.age.toString()} />
        <InfoBadge label="Blood" value={patient.bloodType} />
        <InfoBadge label="Weight" value={patient.weight} />
      </div>

      {/* 3. Care Team Section */}
      <section>
        <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>Your Care Team</AppTypography>
        <Card style={{ padding: '8px', borderRadius: '32px', border: '1px solid var(--aec-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {patient.careTeam.map((member, index) => (
              <React.Fragment key={member.id}>
                <ProfileRow icon={<Shield size={20} />} label={member.role} value={member.name} />
                {index < patient.careTeam.length - 1 && <div style={{ height: '1px', backgroundColor: 'var(--aec-border)', margin: '0 16px' }} />}
              </React.Fragment>
            ))}
            <div style={{ height: '1px', backgroundColor: 'var(--aec-border)', margin: '0 16px' }} />
            <ProfileRow icon={<Phone size={20} />} label="Emergency Contact" value={patient.emergencyContacts[0].name} />
          </div>
        </Card>
      </section>

      {/* 4. Connected Devices */}
      <section>
        <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>My Devices</AppTypography>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -24px', paddingLeft: '24px' }}>
          {patient.devices.map((device) => (
            <DeviceChip key={device.id} label={device.name} status={device.status} />
          ))}
        </div>
      </section>

      {/* 5. App Settings */}
      <section style={{ paddingBottom: '40px' }}>
        <AppTypography variant="h2" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>Settings</AppTypography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SettingsItem icon={<Settings size={20} />} label="Preferences" />
          <SettingsItem icon={<LogOut size={20} />} label="Sign Out" color="var(--aec-alert)" />
        </div>
      </section>

    </div>
  );
}

const InfoBadge = ({ label, value }: any) => (
  <div style={{ flex: 1, backgroundColor: 'white', padding: '16px', borderRadius: '24px', border: '1px solid var(--aec-border)', textAlign: 'center' }}>
    <AppTypography variant="caps" style={{ fontSize: '10px', fontWeight: 800, color: 'var(--aec-text-muted)', marginBottom: '4px' }}>{label}</AppTypography>
    <AppTypography variant="h2" style={{ fontSize: '18px', fontWeight: 900 }}>{value}</AppTypography>
  </div>
);

const ProfileRow = ({ icon, label, value }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--aec-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--aec-green)' }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <AppTypography variant="body" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--aec-text-muted)' }}>{label}</AppTypography>
      <AppTypography variant="h2" style={{ fontSize: '16px', fontWeight: 800 }}>{value}</AppTypography>
    </div>
    <ChevronRight size={20} color="var(--aec-text-muted)" />
  </div>
);

const DeviceChip = ({ label, status }: any) => (
  <div style={{ 
    padding: '16px 24px', borderRadius: '24px', 
    backgroundColor: 'white', border: '1px solid var(--aec-border)',
    display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap'
  }}>
    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status === 'online' ? 'var(--aec-success)' : 'var(--aec-text-muted)' }} />
    <AppTypography variant="body" style={{ fontWeight: 800, fontSize: '14px' }}>{label}</AppTypography>
  </div>
);

const SettingsItem = ({ icon, label, color }: any) => (
  <Card style={{ padding: '20px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--aec-border)' }}>
    <div style={{ color: color || 'var(--aec-text)' }}>{icon}</div>
    <AppTypography variant="body" style={{ flex: 1, fontWeight: 700, color: color || 'inherit' }}>{label}</AppTypography>
    <ChevronRight size={20} color="var(--aec-text-muted)" />
  </Card>
);
