// Shared analysis contract between backend ↔ caregiver panel
export interface TurnAnalysis {
  turn_id: string;
  timestamp: string;
  transcript: string;
  needs_analysis: {
    primary_need: 'social_connection' | 'medical' | 'safety' | 'emotional' | 'daily_living';
    urgency: 'low' | 'medium' | 'high' | 'critical';
  };
  emotion: {
    detected: EmotionType;
    confidence: number;
    valence: number;
    arousal: number;
    speech_pace: 'slow' | 'normal' | 'fast';
    voice_energy: 'low' | 'normal' | 'high';
  };
  behavior_flags: {
    isolation_signal: boolean;
    pain_mentioned: boolean;
    confusion_detected: boolean;
    medication_skipped: boolean;
    fall_risk_mention: boolean;
    emergency_detected: boolean;
  };
  recommended_actions: Array<{
    type: 'notify_family' | 'call_caregiver' | 'schedule_followup' | 'sos' | 'medication_reminder';
    priority: 'low' | 'medium' | 'high' | 'critical';
    trigger: 'auto' | 'manual';
    message: string;
  }>;
}

export type VoiceState = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'sos';

// ─── Expanded Emotion Range ───
export type EmotionType =
  | 'calm'
  | 'happy'
  | 'grateful'
  | 'content'
  | 'lonely'
  | 'anxious'
  | 'sad'
  | 'frustrated'
  | 'fearful'
  | 'nostalgic'
  | 'pain'
  | 'confused'
  | 'distressed'
  | 'angry'
  | 'hopeless'
  | 'tired';

export type EmotionColor = 'green' | 'amber' | 'red';

export const EMOTION_COLORS: Record<string, EmotionColor> = {
  // ── Green: Positive / Stable ──
  calm:       'green',
  happy:      'green',
  grateful:   'green',
  content:    'green',
  // ── Amber: Needs Attention ──
  lonely:     'amber',
  anxious:    'amber',
  sad:        'amber',
  frustrated: 'amber',
  nostalgic:  'amber',
  tired:      'amber',
  // ── Red: Urgent / Distress ──
  pain:       'red',
  confused:   'red',
  distressed: 'red',
  fearful:    'red',
  angry:      'red',
  hopeless:   'red',
};

// ─── Emotion display metadata for caregiver panel ───
export const EMOTION_META: Record<string, { emoji: string; label: string; severity: number }> = {
  calm:       { emoji: '😌', label: 'Calm',       severity: 0 },
  happy:      { emoji: '😊', label: 'Happy',      severity: 0 },
  grateful:   { emoji: '🙏', label: 'Grateful',   severity: 0 },
  content:    { emoji: '☺️', label: 'Content',    severity: 0 },
  lonely:     { emoji: '😔', label: 'Lonely',     severity: 1 },
  anxious:    { emoji: '😰', label: 'Anxious',    severity: 1 },
  sad:        { emoji: '😢', label: 'Sad',        severity: 1 },
  frustrated: { emoji: '😤', label: 'Frustrated', severity: 1 },
  nostalgic:  { emoji: '🥹', label: 'Nostalgic',  severity: 1 },
  tired:      { emoji: '😴', label: 'Tired',      severity: 1 },
  pain:       { emoji: '🤕', label: 'Pain',       severity: 2 },
  confused:   { emoji: '😵', label: 'Confused',   severity: 2 },
  distressed: { emoji: '😫', label: 'Distressed', severity: 2 },
  fearful:    { emoji: '😱', label: 'Fearful',    severity: 2 },
  angry:      { emoji: '😡', label: 'Angry',      severity: 2 },
  hopeless:   { emoji: '💔', label: 'Hopeless',   severity: 2 },
};
