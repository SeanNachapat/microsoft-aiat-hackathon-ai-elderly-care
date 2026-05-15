"use client";

import React from 'react';
import { Card, AppTypography, Button } from '@healthcare/core';
import { Send, MoreVertical } from 'lucide-react';

export default function ChatPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', height: '100%' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <AppTypography variant="h1" style={{ fontSize: '40px', fontWeight: 900, lineHeight: 1.1 }}>
          Your<br />Chat
        </AppTypography>
      </header>

      {/* Conversations List / Active Chat */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
          <div style={{ 
            backgroundColor: 'white', padding: '24px', 
            borderRadius: '32px 32px 32px 8px', border: '1px solid var(--aec-border)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
          }}>
            <AppTypography variant="body" style={{ fontWeight: 600, fontSize: '16px' }}>
              Hello Grandma! How are you feeling today? Don't forget your morning pills.
            </AppTypography>
          </div>
          <AppTypography variant="caps" style={{ fontSize: '11px', fontWeight: 700, marginTop: '8px', marginLeft: '12px', color: 'var(--aec-text-muted)' }}>Nurse Jira · 08:30 AM</AppTypography>
        </div>

        <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
          <div style={{ 
            backgroundColor: 'var(--aec-text)', padding: '24px', 
            borderRadius: '32px 32px 8px 32px', color: 'white'
          }}>
            <AppTypography variant="body" style={{ color: 'white', fontWeight: 600, fontSize: '16px' }}>
              I'm doing well dear! Just finished them.
            </AppTypography>
          </div>
          <AppTypography variant="caps" style={{ fontSize: '11px', fontWeight: 700, marginTop: '8px', marginRight: '12px', textAlign: 'right', color: 'var(--aec-text-muted)' }}>You · 08:35 AM</AppTypography>
        </div>

      </div>

      {/* Modern Input Bar */}
      <div style={{ 
        display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: 'white', 
        padding: '8px', borderRadius: '40px', border: '1px solid var(--aec-border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <input 
          type="text" 
          placeholder="Type message..." 
          style={{ 
            flex: 1, padding: '16px 24px', borderRadius: '32px', 
            border: 'none', backgroundColor: 'transparent',
            fontSize: '16px', fontWeight: 600, outline: 'none'
          }} 
        />
        <Button variant="primary" style={{ width: '56px', height: '56px', borderRadius: '50%', padding: 0 }}>
          <Send size={24} />
        </Button>
      </div>

    </div>
  );
}
