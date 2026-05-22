export interface Medication {
  name: string;
  dose: string;
  purpose: string;
  schedule: string;        // "HH:MM" 24hr format
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
  lastSessionLanguage?: 'en' | 'th';
  lastSessionSummary?: string;
  dailySchedule?: any; // Added for completeness based on earlier implementation
  personality?: any; // Added for completeness based on earlier implementation
}

export interface NurseJiraConfig {
  // Azure Speech
  speechVoice: string;
  speechLang: string;
  speechRegion: string;
  ssmlLang: string;
  prosodyRate: string;
  prosodyPitch: string;

  // Azure STT
  transcriptionLanguage: string;

  // Realtime API session
  maxResponseTokens: number;
  temperature: number;
  vadThreshold: number;
  silenceDurationMs: number;
  prefixPaddingMs: number;

  // Prompt builder
  buildPrompt: (elder: ElderProfile) => string;

  // UI strings shown on elder device
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

  // SMS/alert messages sent to family
  alerts: {
    lonelinessMessage: (elderName: string, contactName: string) => string;
    missedMedMessage: (elderName: string, medName: string, contactName: string) => string;
    emergencyMessage: (elderName: string, contactName: string) => string;
    dailyReportSubject: (elderName: string, date: string) => string;
  };

  // Nurse Jira opening lines
  greetings: {
    positive: (preferredName: string, timeOfDay: string) => string;
    lowMood: (preferredName: string) => string;
    firstSession: (preferredName: string) => string;
  };

  // Escalation spoken phrases
  escalation: {
    level4Emergency: (preferredName: string) => string;
  };
}
