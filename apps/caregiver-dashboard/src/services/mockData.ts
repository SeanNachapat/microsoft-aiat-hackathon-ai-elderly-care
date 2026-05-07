import { Patient } from '@healthcare/core';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'PT-005', name: 'เทียม แก้วมณี', age: 90,
    location: 'หลอดเลือดสมอง • ความดันสูง', avatar: '👴',
    hr: 92, bp: '173/106', spo2: 97, risk: 94,
    riskLevel: 'วิกฤต', statusColor: 'bg-red-500',
    tags: ['ความดันสูง', 'หลอดเลือดสมอง'],
    alerts: [{ type: 'critical', count: 1, label: 'หกล้ม' }],
    lastUpdated: new Date().toISOString(),
    detail: {
      vitals: { hr: 92, spo2: 97, bp: '173/106', temp: 36.6 },
      medications: [
        { name: 'Clopidogrel 75mg', time: '08:00', taken: true },
        { name: 'Amlodipine 5mg', time: '08:00', taken: false },
      ],
      alerts: [
        { id: '1', title: 'หกล้ม!', desc: 'Fall Detection แจ้งเตือน', time: '07:52', type: 'critical', acknowledged: false },
      ],
      devices: [
        { id: 'd1', name: 'Health Watch Pro', battery: 40, online: true, type: 'watch', level: 40, lastSeen: '' } as any,
      ],
      riskScores: [{ label: 'ความเสี่ยงรวม', value: 94 }],
      events: [],
      consents: []
    }
  },
  // ... more patients could be added here
];
