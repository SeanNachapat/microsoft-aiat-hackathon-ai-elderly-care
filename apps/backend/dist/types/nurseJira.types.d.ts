export interface Medication {
    name: string;
    dose: string;
    purpose: string;
    schedule: string;
    withFood: boolean;
    notes: string;
}
export interface HealthCondition {
    condition: string;
    severity: 'mild' | 'moderate' | 'severe';
    notes: string;
}
export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
    location: string;
    alertThreshold: 'low' | 'medium' | 'high';
    preferredAlertMethod: 'sms' | 'call' | 'both';
}
export interface ElderProfile {
    patientId: string;
    name: string;
    preferredName: string;
    age: number;
    gender: string;
    livingSituation: string;
    healthConditions: HealthCondition[];
    medications: Medication[];
    hobbies: string[];
    emergencyContact: EmergencyContact;
    caregiverNotes?: string;
    missedMedicationsThisWeek?: number;
    familyCalledRecently?: boolean;
    familyLastContactHoursAgo?: number;
    lastSessionMood?: 'calm' | 'content' | 'lonely' | 'anxious' | 'sad' | 'distressed' | 'unknown';
    lastSessionSummary?: string;
    dailySchedule?: any;
    personality?: any;
}
export interface NurseJiraConfig {
    speechVoice: string;
    speechLang: string;
    speechRegion: string;
    ssmlLang: string;
    prosodyRate: string;
    prosodyPitch: string;
    transcriptionLanguage: string;
    maxResponseTokens: number;
    temperature: number;
    vadThreshold: number;
    silenceDurationMs: number;
    prefixPaddingMs: number;
    buildPrompt: (elder: ElderProfile) => string;
    ui: {
        connectingText: string;
        listeningText: string;
        speakingText: string;
        processingText: string;
        sosText: string;
        startButtonText: string;
        interruptHint: string;
        notificationHint: string;
    };
    alerts: {
        lonelinessMessage: (elderName: string, contactName: string) => string;
        missedMedMessage: (elderName: string, medName: string, contactName: string) => string;
        emergencyMessage: (elderName: string, contactName: string) => string;
        dailyReportSubject: (elderName: string, date: string) => string;
    };
    greetings: {
        positive: (preferredName: string, timeOfDay: string) => string;
        lowMood: (preferredName: string) => string;
        firstSession: (preferredName: string) => string;
    };
    escalation: {
        level4Emergency: (preferredName: string) => string;
    };
}
//# sourceMappingURL=nurseJira.types.d.ts.map