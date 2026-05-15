export const MOCK_DATA = {
  primaryPatient: {
    id: "AEC-001847",
    name: "Somsri",
    fullName: "Grandma Somsri",
    age: 72,
    bloodType: "A+",
    weight: "58kg",
    status: "normal",
    lastActive: "Active Now",
    location: "Facility A, Room 302",
    vitals: {
      heartRate: 72,
      spo2: 98,
      temperature: 36.6,
      bloodPressure: "120/80"
    },
    sensors: {
      roomTemp: 26.5,
      motion: "Normal",
      door: "Closed",
      humidity: 55,
      activityScore: 88,
      analyzedInsights: "You have been more active than 85% of users today. Your mobility is excellent."
    },
    medications: [
      { id: 1, name: "Amlodipine 5mg", time: "08:00 AM", status: "taken", takenAt: "08:03 AM" },
      { id: 2, name: "Metformin 500mg", time: "01:00 PM", status: "pending", dueIn: "2h 15m" },
      { id: 3, name: "Vitamin D3", time: "08:00 PM", status: "upcoming" }
    ],
    careTeam: [
      { id: "c1", name: "Nurse Jira", role: "Primary Caregiver", specialty: "Primary Care", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jira" },
      { id: "c2", name: "Dr. Mortal Vyn", role: "Cardiologist", specialty: "Cardiology", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mortal" }
    ],
    emergencyContacts: [
      { name: "Daughter", phone: "089-xxx-xxxx", relation: "Child" },
      { name: "Son", phone: "081-xxx-xxxx", relation: "Child" }
    ],
    devices: [
      { id: "d1", name: "AEC Hub", status: "online" },
      { id: "d2", name: "Fall Sensor", status: "online" },
      { id: "d3", name: "Smart Bed", status: "offline" }
    ]
  },
  
  alerts: [
    { id: "a1", patientName: "Somchai J.", type: "High Heart Rate", severity: "critical", time: "2m ago" },
    { id: "a2", patientName: "Malai S.", type: "Oxygen Saturation Low", severity: "warning", time: "30m ago" }
  ],

  allPatients: [
    { id: "AEC-001847", name: "Somsri", status: "normal", hr: 72, o2: 98 },
    { id: "AEC-001848", name: "Somchai J.", status: "critical", hr: 112, o2: 94 },
    { id: "AEC-001849", name: "Suda K.", status: "warning", hr: 88, o2: 97 },
    { id: "AEC-001850", name: "Chaiyaporn T.", status: "normal", hr: 72, o2: 99 },
    { id: "AEC-001851", name: "Wirat L.", status: "normal", hr: 68, o2: 98 },
    { id: "AEC-001852", name: "Malai S.", status: "warning", hr: 95, o2: 95 }
  ],

  systemHealth: {
    network: "normal",
    aiModels: "normal",
    iotGateway: "normal"
  }
};
