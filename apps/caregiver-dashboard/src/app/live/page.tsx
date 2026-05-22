"use client";

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Card, AppTypography, PatientAvatar, Button } from '@healthcare/core';
import type { TurnAnalysis } from '@healthcare/core';
import { EMOTION_COLORS, EMOTION_META } from '@healthcare/core';
import { 
  Activity, AlertTriangle, MessageSquare, Phone, 
  Mail, Calendar, Shield, FileText, Mic, Send,
  ChevronDown, ChevronUp, Siren, Heart, BellRing
} from 'lucide-react';
import elderInfo from '../../../../elderly-dashboard/src/data/elderInfo.json';

// ─── Type Definitions ───
interface TranscriptEntry {
  speaker: 'elder' | 'ai';
  text: string;
  timestamp: string;
  emotion?: string;
}

interface ActionEvent {
  type: string;
  priority: string;
  trigger: string;
  message: string;
  timestamp: string;
}

interface SessionInfo {
  active: boolean;
  patientName: string;
  patientId: string;
  startTime: string;
}

// ─── Color helpers ───
const emotionColorMap: Record<string, string> = {
  green: '#22c55e',
  amber: '#F59E0B',
  red: '#DC2626',
};

const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: 'rgba(220,38,38,0.08)', text: '#DC2626', border: '#DC2626' },
  high:     { bg: 'rgba(234,88,12,0.08)', text: '#EA580C', border: '#EA580C' },
  medium:   { bg: 'rgba(245,158,11,0.08)', text: '#D97706', border: '#F59E0B' },
  low:      { bg: 'rgba(34,197,94,0.06)', text: '#16a34a', border: '#22c55e' },
};

export default function LiveMonitorPage() {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [analyses, setAnalyses] = useState<TurnAnalysis[]>([]);
  const [actions, setActions] = useState<ActionEvent[]>([]);
  const [duration, setDuration] = useState(0);
  const [expandedTurn, setExpandedTurn] = useState<string | null>(null);
  const [caregiverMessage, setCaregiverMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll conversation log to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  useEffect(() => {
    const socket = io('http://localhost:4000', { path: '/ws', transports: ['websocket'] });
    socketRef.current = socket;
    socket.emit('caregiver:join');

    socket.on('session:started', (data) => {
      setSession({ active: true, patientName: data.patientName, patientId: data.patientId, startTime: data.timestamp });
      setTranscripts([]); setAnalyses([]); setActions([]); setDuration(0);
    });
    socket.on('session:ended', () => setSession(prev => prev ? { ...prev, active: false } : null));

    // Append to END so chronological order is preserved (oldest first, newest last)
    socket.on('transcript:new', (data: TranscriptEntry) => {
      setTranscripts(prev => [...prev, data]);
    });
    socket.on('analysis:new', (data: TurnAnalysis) => {
      setAnalyses(prev => [data, ...prev]);
    });

    const actionEvents = ['action:sos', 'action:notify_family', 'action:call_caregiver', 'action:schedule_followup', 'action:medication_reminder'];
    actionEvents.forEach(evt => {
      socket.on(evt, (data: ActionEvent) => setActions(prev => [data, ...prev]));
    });

    return () => { socket.disconnect(); };
  }, []);

  // Session timer
  useEffect(() => {
    if (session?.active) {
      timerRef.current = setInterval(() => setDuration(p => p + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [session?.active]);

  const formatDuration = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const latestEmotion = analyses.length > 0 ? analyses[0].emotion.detected : 'calm';
  const latestEmotionMeta = EMOTION_META[latestEmotion] || { emoji: '😌', label: 'Calm', severity: 0 };
  const emotionColor = emotionColorMap[EMOTION_COLORS[latestEmotion] || 'green'];

  // Derive urgent actions (critical/high priority) for the top emergency banner
  const urgentActions = actions.filter(a => a.priority === 'critical' || a.priority === 'high');
  const hasEmergency = actions.some(a => a.type === 'sos' || a.priority === 'critical');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ══════ EMERGENCY BANNER (always on top) ══════ */}
      {hasEmergency && (
        <div style={{
          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
          borderRadius: '16px', padding: '20px 28px',
          display: 'flex', alignItems: 'center', gap: '20px',
          boxShadow: '0 4px 24px rgba(220,38,38,0.35)',
          animation: 'emergency-pulse 2s ease-in-out infinite'
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'sos-icon 1s ease-in-out infinite'
          }}>
            <Siren size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 900, letterSpacing: '0.5px' }}>
              🚨 EMERGENCY ALERT — IMMEDIATE ACTION REQUIRED
            </div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', marginTop: '4px' }}>
              {actions.find(a => a.priority === 'critical')?.message || 'Distress signal detected from elder'}
            </div>
          </div>
          <button onClick={() => socketRef.current?.emit('action:call_caregiver', { trigger: 'manual' })} style={{
            padding: '12px 24px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '14px', fontWeight: 800,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap'
          }}>
            <Phone size={16} /> Call Now
          </button>
        </div>
      )}

      {/* ══════ IMMEDIATE NEEDS PANEL (shows whenever urgent actions exist) ══════ */}
      {urgentActions.length > 0 && (
        <Card style={{ padding: '20px', borderLeft: '5px solid #DC2626' }}>
          <AppTypography variant="h2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
            <BellRing color="#DC2626" size={20} /> Immediate Needs & Actions
            <span style={{
              marginLeft: '8px', padding: '2px 10px', borderRadius: '12px',
              backgroundColor: 'rgba(220,38,38,0.1)', color: '#DC2626',
              fontSize: '11px', fontWeight: 800
            }}>{urgentActions.length}</span>
          </AppTypography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {urgentActions.map((a, i) => {
              const pColor = priorityColors[a.priority] || priorityColors.medium;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                  borderRadius: '10px', backgroundColor: pColor.bg,
                  borderLeft: `4px solid ${pColor.border}`
                }}>
                  <div style={{
                    padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 900,
                    backgroundColor: pColor.border, color: 'white', textTransform: 'uppercase'
                  }}>{a.priority}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--aec-text)' }}>{a.message}</div>
                    <div style={{ fontSize: '10px', color: 'var(--aec-text-muted)', marginTop: '2px' }}>
                      {a.type.replace(/_/g, ' ').toUpperCase()} • {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                  </div>
                  {a.type === 'sos' && <Shield size={18} color={pColor.text} />}
                  {a.type === 'call_caregiver' && <Phone size={18} color={pColor.text} />}
                  {a.type === 'notify_family' && <Mail size={18} color={pColor.text} />}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ══════ HEADER ══════ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <AppTypography variant="h1" style={{ color: 'var(--aec-green)' }}>Live Monitoring</AppTypography>
          <AppTypography variant="body" style={{ opacity: 0.6 }}>Real-time elder voice session analytics</AppTypography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: session?.active ? '#22c55e' : 'var(--aec-text-muted)', animation: session?.active ? 'blink 1.5s infinite' : 'none' }} />
          <AppTypography variant="caps" style={{ color: session?.active ? '#22c55e' : 'var(--aec-text-muted)' }}>
            {session?.active ? 'LIVE' : 'NO SESSION'}
          </AppTypography>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '28px' }}>
        
        {/* ══════ LEFT COLUMN ══════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 1. Live Session Card */}
          <Card style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <PatientAvatar name={session?.patientName || elderInfo.preferredName || elderInfo.name} size="lg" />
                <div>
                  <AppTypography variant="h2" style={{ fontSize: '20px' }}>{session?.patientName || elderInfo.preferredName || elderInfo.name}</AppTypography>
                  <AppTypography variant="caps" style={{ fontSize: '11px' }}>ID: {session?.patientId || elderInfo.patientId}</AppTypography>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '8px 16px', borderRadius: '12px', backgroundColor: 'var(--aec-bg)' }}>
                  <AppTypography variant="caps" style={{ fontSize: '9px' }}>DURATION</AppTypography>
                  <AppTypography variant="h2" style={{ fontSize: '20px', fontVariantNumeric: 'tabular-nums' }}>{formatDuration(duration)}</AppTypography>
                </div>
                <div style={{ 
                  padding: '8px 16px', borderRadius: '20px', 
                  backgroundColor: emotionColor, color: 'white',
                  fontSize: '13px', fontWeight: 800, textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <span>{latestEmotionMeta.emoji}</span> {latestEmotionMeta.label}
                </div>
              </div>
            </div>
            
            {/* Send message to Nurse Jira */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={caregiverMessage}
                onChange={e => setCaregiverMessage(e.target.value)}
                placeholder="Send message to Nurse Jira..."
                onKeyDown={e => { if (e.key === 'Enter' && caregiverMessage.trim()) { socketRef.current?.emit('caregiver:message', { text: caregiverMessage }); setCaregiverMessage(''); } }}
                style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--aec-border)', outline: 'none', fontSize: '14px' }}
              />
              <Button variant="primary" size="sm" onClick={() => {
                if (caregiverMessage.trim()) {
                  socketRef.current?.emit('caregiver:message', { text: caregiverMessage });
                  setCaregiverMessage('');
                }
              }}>
                <Send size={16} />
              </Button>
            </div>
          </Card>

          {/* 2. Live Emotion Analysis Feed */}
          <Card style={{ padding: '24px' }}>
            <AppTypography variant="h2" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity color="var(--aec-green)" size={20} /> Emotion Analysis Feed
            </AppTypography>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
              {analyses.length === 0 && (
                <AppTypography variant="body" style={{ opacity: 0.5, textAlign: 'center', padding: '20px' }}>
                  Waiting for conversation data...
                </AppTypography>
              )}
              {analyses.map((a, i) => {
                const eMeta = EMOTION_META[a.emotion.detected] || { emoji: '❓', label: a.emotion.detected, severity: 0 };
                const eColor = emotionColorMap[EMOTION_COLORS[a.emotion.detected] || 'green'];
                return (
                  <div key={a.turn_id || i} style={{ 
                    border: '1px solid var(--aec-border)', borderRadius: '12px',
                    borderLeft: `4px solid ${eColor}`
                  }}>
                    <div 
                      onClick={() => setExpandedTurn(expandedTurn === a.turn_id ? null : a.turn_id)}
                      style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div>
                        <AppTypography variant="body" style={{ fontSize: '14px', fontWeight: 700 }}>
                          &quot;{a.transcript.slice(0, 60)}{a.transcript.length > 60 ? '...' : ''}&quot;
                        </AppTypography>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '4px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: eColor }}>
                            {eMeta.emoji} {eMeta.label.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--aec-text-muted)' }}>
                            Confidence: {(a.emotion.confidence * 100).toFixed(0)}%
                          </span>
                          <span style={{
                            fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px',
                            backgroundColor: (priorityColors[a.needs_analysis.urgency] || priorityColors.low).bg,
                            color: (priorityColors[a.needs_analysis.urgency] || priorityColors.low).text,
                          }}>
                            {a.needs_analysis.urgency.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      {expandedTurn === a.turn_id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {expandedTurn === a.turn_id && (
                      <div style={{ padding: '0 16px 12px', fontSize: '12px' }}>
                        <pre style={{ 
                          backgroundColor: 'var(--aec-bg)', padding: '12px', borderRadius: '8px',
                          fontSize: '11px', overflow: 'auto', maxHeight: '200px', whiteSpace: 'pre-wrap'
                        }}>
                          {JSON.stringify(a, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ══════ RIGHT COLUMN ══════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 3. Action Triggers Panel */}
          <Card style={{ padding: '24px' }}>
            <AppTypography variant="h2" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle color="var(--aec-alert)" size={20} /> Action Triggers
            </AppTypography>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ActionCard icon={<Mail size={16} />} label="Alert Family (SMS)" trigger="auto" condition="Loneliness > 0.75" fired={actions.some(a => a.type === 'notify_family')} />
              <ActionCard icon={<Calendar size={16} />} label="Schedule Callback" trigger="auto" condition="Isolation signal" fired={actions.some(a => a.type === 'schedule_followup')} />
              <ActionCard icon={<Phone size={16} />} label="Call Caregiver" trigger="manual" condition="Button click" fired={false} onClick={() => socketRef.current?.emit('action:call_caregiver', { trigger: 'manual' })} />
              <ActionCard icon={<Mic size={16} />} label="Medication Reminder" trigger="auto" condition="Time-based" fired={actions.some(a => a.type === 'medication_reminder')} />
              <ActionCard icon={<Shield size={16} />} label="Emergency SOS" trigger="auto+manual" condition="Emergency detected" fired={actions.some(a => a.type === 'sos')} critical />
              <ActionCard icon={<FileText size={16} />} label="Daily PDF Report" trigger="auto" condition="Daily at 20:00" fired={false} />
            </div>
          </Card>

          {/* 4. Conversation Log — FIXED: chronological order, newest at bottom */}
          <Card style={{ padding: '24px' }}>
            <AppTypography variant="h2" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} /> Conversation Log
            </AppTypography>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '350px', overflowY: 'auto' }}>
              {transcripts.length === 0 && (
                <AppTypography variant="body" style={{ opacity: 0.5, textAlign: 'center', padding: '20px' }}>
                  No conversation yet...
                </AppTypography>
              )}
              {transcripts.map((t, i) => (
                <div key={i} style={{ 
                  padding: '12px', borderRadius: '8px',
                  backgroundColor: t.speaker === 'elder' ? 'rgba(27, 77, 62, 0.05)' : 'var(--aec-bg)',
                  borderLeft: `3px solid ${t.speaker === 'elder' ? 'var(--aec-green)' : 'var(--aec-text-muted)'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <AppTypography variant="caps" style={{ fontSize: '10px', fontWeight: 800, color: t.speaker === 'elder' ? 'var(--aec-green)' : 'var(--aec-text-muted)' }}>
                      {t.speaker === 'elder' ? 'ELDER' : 'NURSE JIRA'}
                    </AppTypography>
                    <AppTypography variant="caps" style={{ fontSize: '9px' }}>
                      {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </AppTypography>
                  </div>
                  <AppTypography variant="body" style={{ fontSize: '13px' }}>{t.text}</AppTypography>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes emergency-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(220,38,38,0.35); }
          50% { box-shadow: 0 4px 40px rgba(220,38,38,0.6); }
        }
        @keyframes sos-icon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

// ─── Action Card Sub-Component ───
const ActionCard = ({ icon, label, trigger, condition, fired, critical, onClick }: any) => (
  <div 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
      borderRadius: '8px', border: 'none',
      backgroundColor: fired ? (critical ? 'rgba(217, 64, 64, 0.08)' : 'rgba(27, 77, 62, 0.08)') : 'var(--aec-bg)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.2s ease'
    }}
  >
    <div style={{ color: fired ? (critical ? 'var(--aec-alert)' : 'var(--aec-green)') : 'var(--aec-text-muted)' }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <AppTypography variant="body" style={{ fontSize: '13px', fontWeight: 700 }}>{label}</AppTypography>
      <AppTypography variant="caps" style={{ fontSize: '9px' }}>{condition}</AppTypography>
    </div>
    <div style={{ 
      padding: '4px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 800,
      backgroundColor: trigger === 'auto' ? 'rgba(27, 77, 62, 0.1)' : 'rgba(201, 168, 76, 0.1)',
      color: trigger === 'auto' ? 'var(--aec-green)' : '#B8963E'
    }}>
      {trigger.toUpperCase()}
    </div>
    {fired && (
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: critical ? 'var(--aec-alert)' : 'var(--aec-success)' }} />
    )}
  </div>
);
