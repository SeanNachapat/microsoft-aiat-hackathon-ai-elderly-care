import { Patient } from '@healthcare/core';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PT-005', name: 'Thiem Kaewmanee', age: 90,
    location: 'Stroke · High BP', avatar: '👴',
    hr: 92, bp: '173/106', spo2: 97, risk: 94,
    riskLevel: 'Critical', statusColor: 'bg-red-500',
    tags: ['Hypertension', 'Stroke'],
    alerts: [{ type: 'critical', count: 1, label: 'Fall' }],
    lastUpdated: new Date().toISOString(),
    detail: {
      vitals: { hr: 92, spo2: 97, bp: '173/106', temp: 36.6 },
      medications: [
        { name: 'Clopidogrel 75mg', time: '08:00', taken: true },
        { name: 'Amlodipine 5mg', time: '08:00', taken: false },
      ],
      alerts: [
        { id: '1', title: 'Fall Detected!', desc: 'Sensor triggered alert', time: '07:52', type: 'critical', acknowledged: false },
      ],
      devices: [
        { id: 'd1', name: 'Health Watch Pro', battery: 40, online: true, type: 'watch', level: 40, lastSeen: '' } as any,
      ],
      riskScores: [{ label: 'Overall Risk', value: 94 }],
      events: [],
      consents: []
    }
  },
  // ... more patients could be added here
];
