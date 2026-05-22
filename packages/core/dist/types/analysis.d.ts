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
export type EmotionType = 'calm' | 'happy' | 'grateful' | 'content' | 'lonely' | 'anxious' | 'sad' | 'frustrated' | 'fearful' | 'nostalgic' | 'pain' | 'confused' | 'distressed' | 'angry' | 'hopeless' | 'tired';
export type EmotionColor = 'green' | 'amber' | 'red';
export declare const EMOTION_COLORS: Record<string, EmotionColor>;
export declare const EMOTION_META: Record<string, {
    emoji: string;
    label: string;
    severity: number;
}>;
//# sourceMappingURL=analysis.d.ts.map