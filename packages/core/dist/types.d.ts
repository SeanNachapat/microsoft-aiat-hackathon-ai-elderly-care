export type RiskLevel = 'วิกฤต' | 'เสี่ยงสูง' | 'ปกติ' | 'ต่ำ' | 'ปานกลาง';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';
export interface Vitals {
    hr: number;
    spo2: number;
    bp: string;
    temp: number;
    sleep?: number;
    movement?: number;
    alert?: string;
}
export interface PatientAlert {
    id: string;
    title: string;
    desc: string;
    time: string;
    type: AlertSeverity;
    acknowledged: boolean;
}
export interface IoTDevice {
    id: string;
    name: string;
    type: 'watch' | 'wifi' | 'pad' | 'bed' | 'sensor';
    level: number;
    lastSeen: string;
    online: boolean;
}
export interface RiskScore {
    label: string;
    value: number;
}
export interface Medication {
    name: string;
    schedule?: string;
    time?: string;
    adherence?: number;
    taken?: boolean;
    desc?: string;
}
export interface TimelineEvent {
    time: string;
    title: string;
    type: AlertSeverity | 'normal';
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
    alerts: {
        type: AlertSeverity;
        count: number;
        label: string;
    }[];
    detail?: PatientDetail;
    lastUpdated: string;
    avatar?: string;
}
export interface Alert {
    id: string;
    patientId: string;
    patientName: string;
    title: string;
    description: string;
    severity: AlertSeverity;
    status: AlertStatus;
    triggeredAt: string;
    acknowledgedAt?: string;
    acknowledgedBy?: string;
    resolvedAt?: string;
    source: 'iot' | 'ai' | 'manual';
    metadata?: Record<string, unknown>;
}
//# sourceMappingURL=types.d.ts.map