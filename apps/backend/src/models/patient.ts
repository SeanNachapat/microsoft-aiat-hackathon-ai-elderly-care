// ─── Patient Model ────────────────────────────────────────────────────────────

export type RiskLevel = 'วิกฤต' | 'เสี่ยงสูง' | 'ปกติ';
export type AlertType = 'critical' | 'warning' | 'info';

export interface Vitals {
  hr: number;           // Heart rate (bpm)
  spo2: number;         // Blood oxygen saturation (%)
  bp: string;           // Blood pressure "systolic/diastolic"
  temp: number;         // Body temperature (°C)
  sleep: number;        // Sleep quality score (0-100)
  movement: number;     // Movement activity (%)
  alert?: string;       // Active clinical alert message
}

export interface PatientAlert {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: AlertType;
  acknowledged: boolean;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'watch' | 'wifi' | 'pad' | 'bed';
  level: number;        // Battery / signal level (%)
  lastSeen: string;
  online: boolean;
}

export interface RiskScore {
  label: string;
  value: number;        // 0-100
}

export interface Medication {
  name: string;
  schedule: string;
  adherence: number;    // % adherence
}

export interface TimelineEvent {
  time: string;
  title: string;
  type: AlertType | 'normal';
  desc?: string;
}

export interface PDPAConsent {
  label: string;
  status: boolean;
  updatedAt: string;
}

export interface PatientDetail {
  vitals: Vitals;
  alerts: PatientAlert[];
  devices: IoTDevice[];
  riskScores: RiskScore[];
  medications: Medication[];
  events: TimelineEvent[];
  consents: PDPAConsent[];
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  location: string;
  tags: string[];
  hr: number;
  spo2: number;
  bp: string;
  risk: number;
  riskLevel: RiskLevel;
  statusColor: string;
  alerts: { type: AlertType; count: number; label: string }[];
  detail: PatientDetail;
  lastUpdated: string;
}
