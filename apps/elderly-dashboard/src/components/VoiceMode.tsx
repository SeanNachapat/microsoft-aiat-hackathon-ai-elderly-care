"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Mic, MicOff, Loader2, X, Phone } from 'lucide-react';
import { AppTypography, Button } from '@healthcare/core';
import type { VoiceState } from '@healthcare/core';
import { S } from '@/strings';

interface VoiceScreenProps {
  onSOS?: () => void;
}

export const VoiceScreen: React.FC<VoiceScreenProps> = ({ onSOS }) => {
  const [state, setState] = useState<VoiceState>('idle');
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const audioQueue = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Session Timer ───
  useEffect(() => {
    if (state === 'listening' || state === 'speaking' || state === 'processing') {
      timerRef.current = setInterval(() => setSessionDuration(p => p + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // ─── Activation Chime ───
  const playChime = useCallback((type: 'start' | 'stop' = 'start') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      
      const freq1 = type === 'start' ? 523.25 : 659.25; // C5 or E5
      const freq2 = type === 'start' ? 659.25 : 523.25; // E5 or C5

      // First tone
      osc.frequency.setValueAtTime(freq1, ctx.currentTime);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      // Second tone
      osc.frequency.setValueAtTime(freq2, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.2);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.25);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.error('Failed to play chime:', e);
    }
  }, []);

  // ─── Start Session ───
  const startSession = useCallback(async () => {
    playChime();
    setState('connecting');

    socketRef.current = io('http://localhost:4000', {
      path: '/ws',
      transports: ['websocket']
    });

    socketRef.current.on('voice:status', (s: string) => {
      if (s === 'connected') setState('listening');
      if (s === 'disconnected') setState('idle');
    });

    socketRef.current.on('voice:audio', (base64: string) => {
      setState('speaking');
      handleIncomingAudio(base64);
    });

    socketRef.current.on('voice:interrupted', () => {
      stopPlayback();
      setState('listening');
    });

    socketRef.current.on('voice:turn_complete', () => {
      setState('listening');
    });

    socketRef.current.on('voice:text', (text: string) => {
      // Transcript received — can be used for chat history sync
    });

    socketRef.current.on('voice:error', (err: string) => {
      console.error('Voice error:', err);
      setState('idle');
    });

    // Start the Gemini/Azure session
    socketRef.current.emit('voice:start', {
      systemInstruction: S.nurseJiraPrompt
    });

    // Start mic capture
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      processorRef.current.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
        socketRef.current?.emit('voice:audio', base64);
      };

      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);
    } catch (err) {
      console.error('Mic access denied:', err);
      setState('idle');
    }
  }, []);

  // ─── Mute Handler ───
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach(track => {
          track.enabled = !nextMuted;
        });
      }
      return nextMuted;
    });
  }, []);

  // ─── Stop Session ───
  const stopSession = useCallback(() => {
    playChime('stop');
    streamRef.current?.getTracks().forEach(t => t.stop());
    processorRef.current?.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    stopPlayback();
    socketRef.current?.emit('voice:stop');
    socketRef.current?.disconnect();
    socketRef.current = null;
    setSessionDuration(0);
    setIsMuted(false);
    setState('idle');
  }, []);

  // ─── Audio Playback ───
  const handleIncomingAudio = (base64: string) => {
    try {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const pcm16 = new Int16Array(bytes.buffer);
      audioQueue.current.push(pcm16);
      if (!isPlayingRef.current) playNextInQueue();
    } catch (e) {
      console.error('Audio decode error:', e);
    }
  };

  const playNextInQueue = async () => {
    if (audioQueue.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }
    isPlayingRef.current = true;
    const pcmData = audioQueue.current.shift()!;

    const playCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const buffer = playCtx.createBuffer(1, pcmData.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < pcmData.length; i++) channelData[i] = pcmData[i] / 0x7FFF;

    const source = playCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(playCtx.destination);
    source.onended = () => {
      if (playCtx.state !== 'closed') playCtx.close();
      playNextInQueue();
    };
    source.start();
  };

  const stopPlayback = () => {
    audioQueue.current = [];
    isPlayingRef.current = false;
  };

  // ─── SOS Handler ───
  const triggerSOS = useCallback(async () => {
    setState('sos');
    // HTTP fallback — works even if WebSocket is dead
    try {
      await fetch('http://localhost:4000/api/sos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ patientId: 'AEC-001847' }) });
    } catch (e) {
      console.error('SOS fallback failed:', e);
    }
    socketRef.current?.emit('sos:trigger', { patientId: 'AEC-001847' });
    onSOS?.();
  }, [onSOS]);

  // ─── Derived state for visuals ───
  const stateConfig = S.voice[state] || S.voice.idle;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '40px 24px', gap: '24px', position: 'relative'
    }}>

      {/* SOS Full-Screen Overlay */}
      {state === 'sos' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          backgroundColor: 'rgba(217, 64, 64, 0.98)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '24px', padding: '40px'
        }}>
          <div className="sos-pulse" style={{
            width: '160px', height: '160px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Phone size={80} color="white" />
          </div>
          <AppTypography variant="h1" style={{ color: 'white', fontSize: '36px', textAlign: 'center' }}>
            {stateConfig.title}
          </AppTypography>
          <AppTypography variant="body" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '20px', textAlign: 'center' }}>
            {stateConfig.subtitle}
          </AppTypography>
          <button onClick={() => setState('idle')} style={{
            marginTop: '40px', padding: '20px 48px', borderRadius: '40px',
            backgroundColor: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)',
            color: 'white', fontSize: '18px', fontWeight: 800, cursor: 'pointer'
          }}>
            Cancel
          </button>
        </div>
      )}

      {/* Session Timer */}
      {(state !== 'idle' && state !== 'sos') && (
        <div style={{
          position: 'absolute', top: '16px', right: '24px',
          padding: '8px 16px', borderRadius: '20px',
          backgroundColor: 'rgba(27, 77, 62, 0.1)', fontSize: '14px', fontWeight: 800,
          color: 'var(--aec-green)', fontVariantNumeric: 'tabular-nums'
        }}>
          {formatDuration(sessionDuration)}
        </div>
      )}

      {/* Central Orb */}
      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '20px' }}>
        {/* Pulse Rings (Listening state) */}
        {state === 'listening' && !isMuted && (
          <>
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
          </>
        )}

        {/* Waveform Visual (Speaking state) */}
        {state === 'speaking' && (
          <div className="waveform-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}

        {/* Spinner (Connecting / Processing) */}
        {(state === 'connecting' || state === 'processing') && (
          <div className="spinner-ring" />
        )}

        {/* Core Circle */}
        <div style={{
          position: 'absolute', inset: '20px', borderRadius: '50%',
          background: state === 'listening'
            ? 'linear-gradient(135deg, var(--aec-green) 0%, #2D5A4C 100%)'
            : state === 'speaking'
            ? 'linear-gradient(135deg, #C9A84C 0%, #B8963E 100%)'
            : 'linear-gradient(135deg, #374151 0%, #1F2937 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: state === 'listening'
            ? '0 0 40px rgba(27, 77, 62, 0.4)'
            : state === 'speaking'
            ? '0 0 40px rgba(201, 168, 76, 0.4)'
            : '0 0 20px rgba(0,0,0,0.2)',
          transition: 'all 0.5s ease'
        }}>
          {(state === 'connecting' || state === 'processing') 
            ? <Loader2 size={56} color="rgba(255,255,255,0.6)" className="spin" />
            : isMuted
            ? <MicOff size={56} color="rgba(217, 64, 64, 0.8)" />
            : state === 'listening' 
            ? <Mic size={56} color="var(--aec-gold)" />
            : state === 'speaking'
            ? <Mic size={56} color="white" />
            : <MicOff size={56} color="rgba(255,255,255,0.3)" />
          }
        </div>
      </div>

      {/* Status Text */}
      <AppTypography variant="h1" style={{ fontSize: '28px', fontWeight: 900, textAlign: 'center', lineHeight: 1.2 }}>
        {stateConfig.title}
      </AppTypography>
      <AppTypography variant="body" style={{ fontSize: '18px', color: 'var(--aec-text-muted)', fontWeight: 700, textAlign: 'center' }}>
        {stateConfig.subtitle}
      </AppTypography>

      {/* Action Button */}
      <div style={{ marginTop: '32px' }}>
        {state === 'idle' && (
          <button onClick={startSession} style={{
            padding: '24px 56px', borderRadius: '40px', border: 'none',
            background: 'linear-gradient(135deg, #C9A84C, #B8963E)',
            color: 'white', fontSize: '20px', fontWeight: 900,
            boxShadow: '0 10px 30px rgba(201, 168, 76, 0.3)', cursor: 'pointer',
            minHeight: '64px'
          }}>
            {S.voice.idle.button}
          </button>
        )}
        {(state === 'listening' || state === 'speaking' || state === 'processing') && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={toggleMute} style={{
              width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--aec-border)',
              background: isMuted ? 'rgba(217, 64, 64, 0.1)' : 'white',
              color: isMuted ? '#D94040' : 'var(--aec-text)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            <button onClick={stopSession} style={{
              padding: '20px 48px', borderRadius: '40px', border: '2px solid var(--aec-border)',
              background: 'white', color: 'var(--aec-text)', fontSize: '18px', fontWeight: 800,
              cursor: 'pointer', minHeight: '64px'
            }}>
              End Conversation
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(27, 77, 62, 0.3);
          animation: pulse-ring 2.5s ease-out infinite;
        }
        .ring-1 { animation-delay: 0s; }
        .ring-2 { animation-delay: 0.5s; }
        .ring-3 { animation-delay: 1s; }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }

        .waveform-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .waveform-bar {
          width: 6px;
          height: 40px;
          background: rgba(201, 168, 76, 0.6);
          border-radius: 3px;
          animation: waveform 0.8s ease-in-out infinite alternate;
        }
        @keyframes waveform {
          0% { height: 20px; }
          100% { height: 60px; }
        }

        .spinner-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: var(--aec-green);
          animation: spin 1s linear infinite;
        }

        .spin {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .sos-pulse {
          animation: sos-pulse 1.5s ease-in-out infinite;
        }
        @keyframes sos-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
