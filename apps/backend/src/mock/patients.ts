import type { Patient } from '../models/patient';

// ─── Mock Patient Dataset ─────────────────────────────────────────────────────
// Matches the data shape used in the Admin Dashboard frontend exactly.

const now = new Date().toISOString();

export const mockPatients: Patient[] = [
  {
    id: 'PT-005',
    name: 'เทียม แก้วมณี',
    age: 90,
    location: 'อยู่บ้านพัก',
    tags: ['หลอดเลือดสมอง (ประวัติ)', 'ความดันโลหิตสูง', 'ข้ออักเสบ'],
    hr: 92,
    spo2: 97,
    bp: '173/106',
    risk: 94,
    riskLevel: 'วิกฤต',
    statusColor: 'bg-red-500',
    alerts: [{ type: 'critical', count: 3, label: 'วิกฤต' }],
    lastUpdated: now,
    detail: {
      vitals: {
        hr: 92,
        spo2: 97,
        bp: '173/106',
        temp: 36.6,
        sleep: 35,
        movement: 25,
        alert: 'ตรวจพบการหกล้ม!',
      },
      alerts: [
        {
          id: 'ALT-001',
          title: 'หกล้ม!',
          desc: 'Fall Detection Sensor ตรวจพบการหกล้ม เวลา 07:52',
          time: '2/5/2569 07:52:00',
          type: 'critical',
          acknowledged: false,
        },
        {
          id: 'ALT-002',
          title: 'ความดันโลหิตวิกฤต',
          desc: 'BP 162/98 mmHg สูงกว่าเกณฑ์วิกฤต',
          time: '2/5/2569 07:55:00',
          type: 'critical',
          acknowledged: false,
        },
        {
          id: 'ALT-003',
          title: 'SpO2 ต่ำวิกฤต',
          desc: 'SpO2 93% ต่ำกว่าเกณฑ์วิกฤต (<95%)',
          time: '2/5/2569 07:58:00',
          type: 'critical',
          acknowledged: false,
        },
      ],
      devices: [
        {
          id: 'DEV-001',
          patientId: 'PT-005',
          name: 'Azure Health Watch Pro',
          type: 'watch',
          batteryLevel: 40,
          signalStrength: 85,
          status: 'online',
          firmware: 'v2.3.1',
          lastSeen: '30 วินาทีที่แล้ว',
          registeredAt: '2026-01-01T00:00:00Z',
          online: true,
          level: 40,
        },
        {
          id: 'DEV-002',
          patientId: 'PT-005',
          name: 'Fall Detection Pad',
          type: 'pad',
          batteryLevel: 75,
          signalStrength: 90,
          status: 'online',
          firmware: 'v1.8.0',
          lastSeen: '10 วินาทีที่แล้ว',
          registeredAt: '2026-01-01T00:00:00Z',
          online: true,
          level: 75,
        },
      ],
      riskScores: [
        { label: 'ความเสี่ยงรวม', value: 94 },
        { label: 'หกล้ม', value: 95 },
        { label: 'หัวใจ', value: 72 },
        { label: 'ความดัน', value: 88 },
      ],
      medications: [
        { name: 'Clopidogrel 75mg', schedule: '08:00', adherence: 96 },
        { name: 'Amlodipine 5mg', schedule: '08:00', adherence: 90 },
      ],
      events: [
        { time: '07:58', title: 'SpO2 ต่ำวิกฤต 93%', type: 'critical' },
        { time: '07:55', title: 'ความดันโลหิตวิกฤต 162/98', type: 'critical' },
        { time: '07:52', title: 'หกล้ม! Fall Detection แจ้งเตือน', type: 'critical' },
        { time: '07:00', title: 'ตรวจวัด vitals ตอนเช้า', type: 'normal' },
      ],
      consents: [
        { label: 'Health Monitoring', status: true, updatedAt: '2026-01-05T00:00:00Z' },
        { label: 'AI Analysis', status: true, updatedAt: '2026-01-05T00:00:00Z' },
        { label: 'Data Sharing (Caregiver)', status: true, updatedAt: '2026-01-05T00:00:00Z' },
        { label: 'Research Use', status: false, updatedAt: '2026-01-05T00:00:00Z' },
      ],
    },
  },
  {
    id: 'PT-002',
    name: 'วิมล สุขสมบูรณ์',
    age: 85,
    location: 'อยู่บ้านพัก',
    tags: ['อัลไซเมอร์ (ระยะต้น)', 'โรคหัวใจ', 'กระดูกพรุน'],
    hr: 62,
    spo2: 90,
    bp: '112/92',
    risk: 85,
    riskLevel: 'เสี่ยงสูง',
    statusColor: 'bg-red-500',
    alerts: [{ type: 'critical', count: 1, label: 'วิกฤต' }],
    lastUpdated: now,
    detail: {
      vitals: { hr: 62, spo2: 90, bp: '112/92', temp: 36.4, sleep: 45, movement: 30 },
      alerts: [
        {
          id: 'ALT-004',
          title: 'SpO2 ต่ำ',
          desc: 'SpO2 90% ต่ำกว่าเกณฑ์',
          time: '2/5/2569 08:15:00',
          type: 'critical',
          acknowledged: false,
        },
      ],
      devices: [
        {
          id: 'DEV-003',
          patientId: 'PT-002',
          name: 'Smart Bed Sensor v3',
          type: 'bed',
          batteryLevel: 90,
          signalStrength: 92,
          status: 'online',
          firmware: 'v3.0.2',
          lastSeen: '5 นาทีที่แล้ว',
          registeredAt: '2026-01-10T00:00:00Z',
          online: true,
          level: 90,
        },
      ],
      riskScores: [
        { label: 'ความเสี่ยงรวม', value: 85 },
        { label: 'หัวใจ', value: 80 },
      ],
      medications: [{ name: 'Aricept 10mg', schedule: 'ก่อนนอน', adherence: 95 }],
      events: [{ time: '08:15', title: 'SpO2 ต่ำ 90%', type: 'warning' }],
      consents: [
        { label: 'Health Monitoring', status: true, updatedAt: '2026-01-06T00:00:00Z' },
        { label: 'AI Analysis', status: false, updatedAt: '2026-01-06T00:00:00Z' },
      ],
    },
  },
  {
    id: 'PT-001',
    name: 'สมจิตร วงศ์สวัสดิ์',
    age: 78,
    location: 'อยู่บ้านพัก',
    tags: ['เบาหวาน', 'ความดันโลหิตสูง', 'ข้อเข่าเสื่อม'],
    hr: 81,
    spo2: 95,
    bp: '148/92',
    risk: 72,
    riskLevel: 'ปกติ',
    statusColor: 'bg-amber-400',
    alerts: [{ type: 'warning', count: 1, label: 'เตือน' }],
    lastUpdated: now,
    detail: {
      vitals: { hr: 81, spo2: 95, bp: '148/92', temp: 36.8, sleep: 70, movement: 60 },
      alerts: [],
      devices: [
        {
          id: 'DEV-004',
          patientId: 'PT-001',
          name: 'Azure Health Watch Pro',
          type: 'watch',
          batteryLevel: 85,
          signalStrength: 88,
          status: 'online',
          firmware: 'v2.3.1',
          lastSeen: '2 นาทีที่แล้ว',
          registeredAt: '2026-02-01T00:00:00Z',
          online: true,
          level: 85,
        },
      ],
      riskScores: [{ label: 'ความเสี่ยงรวม', value: 72 }],
      medications: [{ name: 'Metformin 500mg', schedule: 'หลังอาหาร', adherence: 98 }],
      events: [{ time: '09:00', title: 'รับประทานยาเช้า', type: 'normal' }],
      consents: [
        { label: 'Health Monitoring', status: true, updatedAt: '2026-02-01T00:00:00Z' },
        { label: 'AI Analysis', status: true, updatedAt: '2026-02-01T00:00:00Z' },
      ],
    },
  },
  {
    id: 'PT-003',
    name: 'ประสิทธิ์ มั่นคงธรรม',
    age: 72,
    location: 'อยู่บ้านพัก',
    tags: ['หัวใจเต้นผิดจังหวะ', 'ไตเรื้อรัง ระยะที่ 3'],
    hr: 90,
    spo2: 94,
    bp: '159/85',
    risk: 68,
    riskLevel: 'ปกติ',
    statusColor: 'bg-amber-400',
    alerts: [{ type: 'warning', count: 1, label: 'เตือน' }],
    lastUpdated: now,
    detail: {
      vitals: { hr: 90, spo2: 94, bp: '159/85', temp: 36.5, sleep: 65, movement: 50 },
      alerts: [],
      devices: [],
      riskScores: [{ label: 'ความเสี่ยงรวม', value: 68 }],
      medications: [{ name: 'Warfarin 3mg', schedule: '18:00', adherence: 92 }],
      events: [],
      consents: [
        { label: 'Health Monitoring', status: true, updatedAt: '2026-02-15T00:00:00Z' },
      ],
    },
  },
  {
    id: 'PT-004',
    name: 'บุญรอด ศรีสุวรรณ',
    age: 81,
    location: 'อยู่บ้านพัก',
    tags: ['มะเร็งลำไส้ (ระยะพื้นตัว)', 'เบาหวาน', 'ซึมเศร้า'],
    hr: 88,
    spo2: 97,
    bp: '144/80',
    risk: 58,
    riskLevel: 'ปกติ',
    statusColor: 'bg-amber-400',
    alerts: [{ type: 'warning', count: 1, label: 'เตือน' }],
    lastUpdated: now,
    detail: {
      vitals: { hr: 88, spo2: 97, bp: '144/80', temp: 36.7, sleep: 80, movement: 70 },
      alerts: [],
      devices: [],
      riskScores: [{ label: 'ความเสี่ยงรวม', value: 58 }],
      medications: [
        { name: 'Sertraline 50mg', schedule: 'เช้า', adherence: 88 },
        { name: 'Metformin 500mg', schedule: 'หลังอาหาร', adherence: 91 },
      ],
      events: [],
      consents: [
        { label: 'Health Monitoring', status: true, updatedAt: '2026-03-01T00:00:00Z' },
        { label: 'AI Analysis', status: true, updatedAt: '2026-03-01T00:00:00Z' },
      ],
    },
  },
];

// In-memory mutable state (simulates DB)
export let patientsStore: Patient[] = JSON.parse(JSON.stringify(mockPatients));

export const getPatientById = (id: string): Patient | undefined =>
  patientsStore.find((p) => p.id === id);

export const updatePatientVitals = (id: string, vitals: Partial<Patient['detail']['vitals']>): Patient | undefined => {
  const patient = patientsStore.find((p) => p.id === id);
  if (!patient) return undefined;
  patient.detail.vitals = { ...patient.detail.vitals, ...vitals };
  patient.hr = vitals.hr ?? patient.hr;
  patient.spo2 = vitals.spo2 ?? patient.spo2;
  if (vitals.bp) patient.bp = vitals.bp;
  patient.lastUpdated = new Date().toISOString();
  return patient;
};
