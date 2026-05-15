"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppTypography, Button, Card } from '@healthcare/core';
import { Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EmergencyPage() {
  const searchParams = useSearchParams();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (searchParams.get('triggered') === 'true') {
      setTriggered(true);
    }
  }, [searchParams]);

  if (triggered) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', textAlign: 'center', gap: '24px' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--aec-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <CheckCircle2 size={64} />
        </div>
        <AppTypography variant="h1">Help is on the way</AppTypography>
        <AppTypography variant="body" style={{ opacity: 0.8 }}>
          We have notified your family and caregivers.
        </AppTypography>
        
        <Card style={{ padding: '24px', width: '100%', marginTop: '20px', textAlign: 'left' }}>
          <AppTypography variant="caps">Notification Status</AppTypography>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AppTypography variant="body" style={{ fontWeight: 700 }}>Daughter</AppTypography>
              <AppTypography variant="mono" style={{ color: 'var(--aec-success)' }}>Calling...</AppTypography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AppTypography variant="body" style={{ fontWeight: 700 }}>Nurse Jira</AppTypography>
              <AppTypography variant="mono" style={{ color: 'var(--aec-success)' }}>Alerted</AppTypography>
            </div>
          </div>
        </Card>

        <Button variant="ghost" style={{ marginTop: '32px' }} onClick={() => setTriggered(false)}>
          Cancel False Alarm
        </Button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', textAlign: 'center', gap: '40px' }}>
      
      <div>
        <AppTypography variant="h1" style={{ fontSize: '32px' }}>Emergency Center</AppTypography>
        <AppTypography variant="body" style={{ opacity: 0.6 }}>Hold the red button at the bottom to request help</AppTypography>
      </div>

      <div style={{ 
        width: '140px', height: '140px', borderRadius: '50%', 
        backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--aec-alert)'
      }}>
        <AlertCircle size={64} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
         <Button variant="secondary" style={{ width: '100%', justifyContent: 'flex-start', gap: '12px', height: '64px' }}>
           <Phone size={24} /> 📞 Call Family Directly
         </Button>
         <Button variant="secondary" style={{ width: '100%', justifyContent: 'flex-start', gap: '12px', height: '64px' }}>
           <Phone size={24} /> 📞 Call Care Center
         </Button>
      </div>

    </div>
  );
}
