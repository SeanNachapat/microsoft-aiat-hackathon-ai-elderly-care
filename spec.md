# AI Elderly Care — Full System Specification

---

## 1. System Overview

**Product Name:** AI Elderly Care (AEC)
**Platform:** Three interconnected applications sharing a unified Azure backend
**Design System:** Geist + Sarabun, AEC brand colors (`#1B4D3E`, `#C9A84C`, `#D94040`, `#F5F5F0`)

```
┌─────────────────────────────────────────────────────┐
│                  AI Elderly Care                     │
│                  Azure Backend                       │
│  IoT Hub · Stream Analytics · ML · Cosmos DB        │
│  Notification Hubs · API Management · Power BI      │
└──────────┬──────────────┬──────────────┬────────────┘
           │              │              │
    ┌──────▼─────┐ ┌──────▼─────┐ ┌────▼────────┐
    │  Elderly   │ │ Caregiver  │ │   Admin     │
    │  Mobile    │ │  Desktop   │ │  Desktop    │
    └────────────┘ └────────────┘ └─────────────┘
```

---

## 2. Shared Design System

### Typography
```
Headings:        Geist Bold
UI Labels:       Geist Medium  
Body Text:       Geist Regular
Live Data/Time:  Geist Mono
Thai Text:       Sarabun (all weights mirroring Geist usage)
Minimum size:    16px (elderly app: 20px minimum)
```

### Color Tokens
```
--aec-green:        #1B4D3E   (primary, nav, headers)
--aec-gold:         #C9A84C   (accents, CTAs, badges)
--aec-alert:        #D94040   (emergencies, critical alerts)
--aec-amber:        #E89C2F   (warnings, medium priority)
--aec-bg:           #F5F5F0   (app background)
--aec-surface:      #FFFFFF   (cards, panels)
--aec-text:         #1A1A1A   (primary text)
--aec-text-muted:   #6B7280   (secondary text)
--aec-border:       #E5E7EB   (dividers, card borders)
--aec-success:      #16A34A   (normal status, resolved)
```

### Component Library (shared across all 3 apps)
- Status Badge (green/amber/red)
- Sensor Reading Card
- Alert Notification Panel
- Timeline / Activity Feed
- User Avatar + Role Chip
- Data Chart (Recharts)
- Modal / Drawer
- Toast Notifications

---

## 3. Azure Backend (Mock Services)

All three apps connect to the same mocked Azure layer. Each service is simulated with realistic data, timing, and behavior.

### Mock Service Map

```
AEC Azure Backend
│
├── Azure IoT Hub (Mock)
│   ├── Endpoint: /api/iot/sensors
│   ├── Streams: motion, door, temperature, fall, humidity
│   └── Polling: every 3 seconds (simulated WebSocket)
│
├── Azure Stream Analytics (Mock)
│   ├── Endpoint: /api/analytics/stream
│   ├── Output: anomaly flags, pattern scores
│   └── Latency simulation: 800ms
│
├── Azure Machine Learning (Mock)
│   ├── Endpoint: /api/ml/predict
│   ├── Models: fall_detection, inactivity_alert, 
│   │           behavior_anomaly, vital_trend
│   └── Returns: { prediction, confidence, severity }
│
├── Azure Notification Hubs (Mock)
│   ├── Endpoint: /api/notify
│   ├── Channels: push, LINE, SMS, email
│   └── Triggers: on ML severity >= "medium"
│
├── Azure Cosmos DB (Mock)
│   ├── Collections: users, events, alerts, 
│   │               sensor_logs, care_plans
│   └── REST endpoints per collection
│
├── Azure API Management (Mock)
│   ├── Base URL: https://mock.aec-azure.local/v1
│   ├── Auth: Bearer token (mocked JWT)
│   └── Rate limit simulation: 1000 req/min
│
└── Power BI Embedded (Mock)
    ├── Endpoint: /api/reports
    └── Returns: pre-built chart datasets
```

### Mock Data Simulation Rules
```
Normal state:      sensor readings within baseline ranges
Anomaly trigger:   random or manual, every 2-5 min in demo mode
Alert escalation:  Low → Medium → Critical over 30s if unacknowledged
Response logging:  all actions timestamped and stored to Cosmos mock
```

---

## 4. App 1 — Elderly Mobile App

### Overview
```
Platform:       iOS + Android (React Native or Flutter)
Primary users:  Elderly individuals aged 60+
Design goal:    Maximum simplicity, minimum cognitive load
Language:       Thai primary, English secondary
Font minimum:   20px body, 28px headings
```

### Information Architecture
```
AEC Elderly App
│
├── 🏠 Home (default screen)
├── 🆘 Emergency Button
├── 💊 Medication Reminders
├── 📋 My Health Summary
└── 👤 My Profile
```

---

### Screen Specs

#### 4.1 Home Screen
```
Layout: Single column, large touch targets (min 56px height)

┌─────────────────────────────┐
│  Good Morning, คุณยาย สมศรี │  ← Geist Bold 28px, Thai name
│  Friday, 15 May 2026        │  ← Geist Mono, muted
├─────────────────────────────┤
│  🟢 Status: All Normal      │  ← Large status badge, full width
│  Last checked: 2 min ago    │  ← Geist Mono 14px
├─────────────────────────────┤
│  ┌───────────┐ ┌──────────┐ │
│  │   Temp    │ │ Motion   │ │  ← Sensor reading cards 2-col
│  │  26.5°C   │ │ Normal   │ │
│  └───────────┘ └──────────┘ │
│  ┌───────────┐ ┌──────────┐ │
│  │  Door     │ │ Humidity │ │
│  │  Closed   │ │   55%    │ │
│  └───────────┘ └──────────┘ │
├─────────────────────────────┤
│  Today's Reminders          │
│  💊 08:00 — Morning meds ✓  │
│  💊 13:00 — Afternoon meds  │  ← upcoming highlighted gold
│  💊 20:00 — Evening meds    │
├─────────────────────────────┤
│  Family Online Now          │
│  👤 ลูกสาว (daughter) 🟢   │  ← family presence indicator
└─────────────────────────────┘
```

**Azure connections:**
- Sensor cards → `/api/iot/sensors` (3s polling)
- Status badge → `/api/ml/predict` (behavior_anomaly model)
- Reminders → `/api/cosmos/care_plans`
- Family presence → `/api/cosmos/users`

---

#### 4.2 Emergency Button Screen
```
Layout: Fullscreen — single purpose, no distractions

┌─────────────────────────────┐
│                             │
│    ขอความช่วยเหลือ          │  ← Thai: "Request Help"
│    (Request Help)           │     Geist Bold 24px
│                             │
│    ╔═════════════════╗      │
│    ║                 ║      │
│    ║   🆘  กดฉุกเฉิน  ║      │  ← Giant red button
│    ║                 ║      │     min 200px diameter
│    ╚═════════════════╝      │     haptic feedback on press
│                             │
│  Hold for 2 seconds         │  ← prevents accidental trigger
│  to confirm emergency       │
│                             │
│  ─────── or ───────         │
│                             │
│  📞 Call Family Directly    │  ← secondary action
│  📞 Call Caregiver          │
└─────────────────────────────┘

Post-confirmation screen:
┌─────────────────────────────┐
│  ✅ Help is on the way      │
│                             │
│  Notified:                  │
│  👤 ลูกสาว — Calling now   │
│  👩‍⚕️ Caregiver — Alerted  │
│  🏥 Health center — Flagged │
│                             │
│  Est. response: ~4 minutes  │
│                             │
│  [Cancel False Alarm]       │  ← 30s window to cancel
└─────────────────────────────┘
```

**Azure connections:**
- Button press → `/api/notify` (all channels simultaneously)
- Confirmation → `/api/cosmos/events` (log emergency event)
- Cancel → `/api/cosmos/events` (update event as false alarm)

---

#### 4.3 Medication Reminders Screen
```
┌─────────────────────────────┐
│  💊 My Medications          │
├─────────────────────────────┤
│  Today — Friday 15 May      │
│                             │
│  ✅ 08:00 Amlodipine 5mg   │  ← completed, green check
│     Taken at 08:03          │
│                             │
│  ⏰ 13:00 Metformin 500mg  │  ← upcoming, gold highlight
│     Due in 2h 15m           │
│     [Mark as Taken]         │  ← large button
│                             │
│  ○ 20:00 Vitamin D3         │  ← future, muted
│                             │
├─────────────────────────────┤
│  Weekly Adherence           │
│  ████████░░ 80%             │  ← simple progress bar
└─────────────────────────────┘
```

**Azure connections:**
- Medication list → `/api/cosmos/care_plans`
- Mark taken → `/api/cosmos/events` (log adherence)
- Adherence bar → `/api/analytics/stream`

---

#### 4.4 Health Summary Screen
```
┌─────────────────────────────┐
│  📋 My Health This Week     │
├─────────────────────────────┤
│  Activity Level             │
│  ████████░░ Good            │
│                             │
│  Sleep Pattern              │
│  Avg 6.8 hrs/night  ✓       │
│                             │
│  Indoor Temperature         │
│  Avg 26.2°C  ✓              │
│                             │
│  Falls Detected             │
│  0 this week  🟢            │
│                             │
│  Medication Adherence       │
│  80%  ⚠️ Improve            │
├─────────────────────────────┤
│  📤 Share with Doctor       │  ← generates PDF report
└─────────────────────────────┘
```

**Azure connections:**
- All metrics → `/api/analytics/stream`
- Share report → `/api/reports` (Power BI mock)

---

#### 4.5 Profile Screen
```
┌─────────────────────────────┐
│  👤 คุณยาย สมศรี            │
│  Age 72 · Blood Type A+     │
│  ID: AEC-001847             │
├─────────────────────────────┤
│  My Caregivers              │
│  👩‍⚕️ นางสาว จิรา (primary) │
│  👨‍⚕️ นาย สมชาย (backup)   │
├─────────────────────────────┤
│  Emergency Contacts         │
│  👤 ลูกสาว — 089-xxx-xxxx  │
│  👤 ลูกชาย — 081-xxx-xxxx  │
├─────────────────────────────┤
│  My Devices                 │
│  🟢 Motion Sensor (Kitchen) │
│  🟢 Door Sensor             │
│  🟢 Fall Detector           │
│  🟢 AEC Gateway             │
├─────────────────────────────┤
│  [Language: ภาษาไทย ▾]     │
│  [Font Size: Large ▾]       │
│  [Notification Sound: On]   │
└─────────────────────────────┘
```

---

## 5. App 2 — Caregiver Desktop App

### Overview
```
Platform:       Web (React), desktop-first, responsive to tablet
Primary users:  Community health workers, home caregivers, nurses
Design goal:    Efficient multi-patient monitoring, fast triage
Language:       Thai + English toggle
Layout:         Sidebar nav + main content area
```

### Information Architecture
```
AEC Caregiver App
│
├── 📊 Dashboard (default)
├── 👥 My Patients
├── 🔔 Alerts & Incidents
├── 📅 Visit Schedule
├── 📋 Care Plans
├── 📈 Reports
└── ⚙️ Settings
```

---

### Screen Specs

#### 5.1 Dashboard
```
┌──────┬──────────────────────────────────────────────┐
│      │  🔔 2 Active Alerts    👤 จิรา  🟢 Online   │
│ NAV  ├──────────────────────────────────────────────┤
│      │  Good morning, คุณจิรา                       │
│ 📊   │  Friday 15 May · 10:42 AM                   │
│ 👥   ├──────────────────────────────────────────────┤
│ 🔔   │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│ 📅   │  │ Patients │ │ Active   │ │ Visits   │    │
│ 📋   │  │    12    │ │ Alerts 2 │ │ Today  3 │    │
│ 📈   │  └──────────┘ └──────────┘ └──────────┘    │
│ ⚙️   ├──────────────────────────────────────────────┤
│      │  ACTIVE ALERTS                               │
│      │  ┌──────────────────────────────────────┐   │
│      │  │ 🔴 FALL DETECTED                     │   │
│      │  │ คุณยาย สมศรี · Kitchen · 07:23 AM   │   │
│      │  │ 2m 14s ago · Unacknowledged          │   │
│      │  │ [View Details]  [Acknowledge]        │   │
│      │  └──────────────────────────────────────┘   │
│      │  ┌──────────────────────────────────────┐   │
│      │  │ ⚠️ INACTIVITY WARNING                │   │
│      │  │ คุณตา วิชัย · Bedroom · 3h 20m      │   │
│      │  │ [View Details]  [Call Patient]       │   │
│      │  └──────────────────────────────────────┘   │
│      ├──────────────────────────────────────────────┤
│      │  PATIENT OVERVIEW (live grid)               │
│      │  ┌────────┐ ┌────────┐ ┌────────┐          │
│      │  │ 🟢 001 │ │ 🔴 002 │ │ 🟢 003 │  ...    │
│      │  │ สมศรี  │ │ วิชัย  │ │ มาลี   │          │
│      │  │ Normal │ │ Alert  │ │ Normal │          │
│      │  └────────┘ └────────┘ └────────┘          │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- Alert panel → `/api/notify` (subscribe to active alerts)
- Patient grid → `/api/iot/sensors` (aggregated by patient)
- Stats counters → `/api/cosmos/users` + `/api/cosmos/events`

---

#### 5.2 Patient Detail View
```
┌──────┬──────────────────────────────────────────────┐
│      │  ← Back to Patients                         │
│ NAV  │  คุณยาย สมศรี  AEC-001847  🔴 Alert Active  │
│      ├───────────────────────┬──────────────────────┤
│      │  LIVE SENSORS         │  PATIENT INFO        │
│      │                       │  Age: 72             │
│      │  Motion   🟢 Active   │  Blood: A+           │
│      │  Door     🟢 Closed   │  Conditions:         │
│      │  Temp     26.5°C      │  Hypertension        │
│      │  Humidity 55%         │  Type 2 Diabetes     │
│      │  Fall     🔴 ALERT    │                      │
│      ├───────────────────────┤  Caregiver: จิรา     │
│      │  ACTIVITY TIMELINE    │  Family: ลูกสาว       │
│      │  10:41 ⚠️ Fall detect │  089-xxx-xxxx        │
│      │  10:38 🚶 Kitchen mvt │                      │
│      │  10:20 🚪 Door open   │  [📞 Call Patient]   │
│      │  09:45 💊 Med taken   │  [📞 Call Family]    │
│      │  08:03 🌅 Woke up     │  [📋 View Care Plan] │
│      ├───────────────────────┴──────────────────────┤
│      │  ML ANALYSIS                                 │
│      │  Fall confidence: 94% 🔴                     │
│      │  Behavior anomaly: High                      │
│      │  Last normal pattern: 07:20 AM               │
│      │                                              │
│      │  [✅ Acknowledge Alert]  [🚨 Escalate]       │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- Live sensors → `/api/iot/sensors?patientId=001847`
- Timeline → `/api/cosmos/events?patientId=001847`
- ML analysis → `/api/ml/predict`
- Acknowledge → `/api/cosmos/events` (update alert status)

---

#### 5.3 Visit Schedule
```
┌──────┬──────────────────────────────────────────────┐
│ NAV  │  📅 My Visit Schedule                        │
│      ├──────────────────────────────────────────────┤
│      │  Today — Friday 15 May          [+ Add Visit]│
│      │                                              │
│      │  09:00 ✅ คุณยาย สมศรี          COMPLETED   │
│      │          Routine check · 45 min              │
│      │          Notes: BP normal, remind meds       │
│      │                                              │
│      │  11:30 ⏰ คุณตา วิชัย           UPCOMING    │
│      │          Post-discharge check · 60 min       │
│      │          [Start Visit]  [Reschedule]         │
│      │                                              │
│      │  14:00 ○  คุณยาย มาลี           SCHEDULED   │
│      │          Weekly wellness · 30 min            │
│      │                                              │
│      ├──────────────────────────────────────────────┤
│      │  This Week                                   │
│      │  Mon ██ Tue ███ Wed █ Thu ████ Fri ███       │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- Schedule data → `/api/cosmos/care_plans`
- Visit logging → `/api/cosmos/events`

---

## 6. App 3 — Admin Desktop App

### Overview
```
Platform:       Web (React), desktop only, min 1280px
Primary users:  System administrators, hospital managers, 
                public health supervisors
Design goal:    Full system oversight, analytics, 
                user management, configuration
Language:       Thai + English toggle
Layout:         Top nav + sidebar + main content
```

### Information Architecture
```
AEC Admin App
│
├── 📊 System Dashboard
├── 👥 User Management
│   ├── Elderly Patients
│   ├── Caregivers
│   └── Administrators
├── 🏠 Device Management
├── 🔔 Alert Center
├── 📈 Analytics & Reports
├── ⚙️ System Configuration
│   ├── Azure Services Status
│   ├── ML Model Settings
│   ├── Notification Rules
│   └── Threshold Configuration
└── 🔒 Security & Compliance
```

---

### Screen Specs

#### 6.1 System Dashboard
```
┌─────────────────────────────────────────────────────┐
│  AI Elderly Care  |  Admin Portal          👤 Admin │
├──────┬──────────────────────────────────────────────┤
│      │  System Overview — Live                      │
│ NAV  │  Friday 15 May 2026 · 10:42:33 AM  🟢 Healthy│
│      ├──────────────────────────────────────────────┤
│      │  ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐ │
│      │  │ Total  │ │ Active │ │Alerts  │ │Devices│ │
│      │  │Patients│ │Cargivr ││ Today  │ │Online │ │
│      │  │  247   │ │   18   │ │   7    │ │  891  │ │
│      │  │  +3↑   │ │  All ✓ │ │ 2 open │ │98.7% ↑│ │
│      │  └────────┘ └────────┘ └────────┘ └───────┘ │
│      ├──────────────────────────────────────────────┤
│      │  AZURE SERVICES STATUS                       │
│      │  ┌─────────────────────────────────────────┐ │
│      │  │ IoT Hub          🟢 Operational          │ │
│      │  │ Stream Analytics 🟢 Operational          │ │
│      │  │ Machine Learning 🟢 Operational          │ │
│      │  │ Cosmos DB        🟢 Operational          │ │
│      │  │ Notification Hub 🟢 Operational          │ │
│      │  │ API Management   🟢 Operational          │ │
│      │  └─────────────────────────────────────────┘ │
│      ├──────────────────────────────────────────────┤
│      │  ┌────────────────────┐ ┌───────────────────┐│
│      │  │  ALERT TREND       │ │  RESPONSE TIME    ││
│      │  │  [line chart]      │ │  Avg: 3m 42s      ││
│      │  │  7-day history     │ │  Target: < 5min ✓ ││
│      │  │  Falls/Inactivity  │ │  [bar chart]      ││
│      │  └────────────────────┘ └───────────────────┘│
│      ├──────────────────────────────────────────────┤
│      │  RECENT SYSTEM EVENTS                        │
│      │  10:41 🔴 Fall alert · AEC-001847 · Kitchen  │
│      │  10:38 🟡 Inactivity · AEC-002201 · Bedroom  │
│      │  10:15 🟢 Device online · Gateway-047        │
│      │  09:55 🟢 ML model refreshed · v2.4.1        │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- Service status → `/api/azure/health`
- System stats → `/api/cosmos/users` + `/api/cosmos/events`
- Alert trend chart → `/api/analytics/stream`
- Event log → `/api/cosmos/events?limit=50&sort=desc`

---

#### 6.2 User Management
```
┌──────┬──────────────────────────────────────────────┐
│ NAV  │  👥 User Management              [+ Add User]│
│      ├──────────────────────────────────────────────┤
│      │  [Elderly 247] [Caregivers 18] [Admins 4]   │
│      ├──────────────────────────────────────────────┤
│      │  🔍 Search...    Filter: [All ▾] [Area ▾]   │
│      ├──────────────────────────────────────────────┤
│      │  ID        Name          Status  Caregiver  │
│      │  AEC-001   สมศรี จันทร์  🟢 OK   จิรา       │
│      │  AEC-002   วิชัย ลี      🔴 Alert สมชาย     │
│      │  AEC-003   มาลี สุข      🟢 OK   จิรา       │
│      │  AEC-004   ประทีป แดง    🟡 Warn  รัตนา     │
│      │  ...                                         │
│      ├──────────────────────────────────────────────┤
│      │  [← Prev]  Page 1 of 25  [Next →]           │
└──────┴──────────────────────────────────────────────┘
```

**User Detail Panel (slide-in drawer):**
```
┌────────────────────────────────┐
│  AEC-001847 · Edit             │
│  ────────────────────────────  │
│  Name:     สมศรี จันทร์        │
│  Age:      72                  │
│  Area:     Chon Buri Zone 3    │
│  Caregiver: จิรา [Change]      │
│  Devices:  4 linked            │
│  Plan:     Standard            │
│  ────────────────────────────  │
│  [View Full Profile]           │
│  [Reassign Caregiver]          │
│  [Deactivate Account]          │
└────────────────────────────────┘
```

**Azure connections:**
- User list → `/api/cosmos/users`
- CRUD operations → `/api/cosmos/users/{id}`

---

#### 6.3 Device Management
```
┌──────┬──────────────────────────────────────────────┐
│ NAV  │  🏠 Device Management                        │
│      ├──────────────────────────────────────────────┤
│      │  Total: 891  |  🟢 Online: 880  🔴 Offline:11│
│      ├──────────────────────────────────────────────┤
│      │  Device ID    Type          Patient   Status │
│      │  GW-001       Gateway       AEC-001   🟢 OK  │
│      │  MS-001       Motion        AEC-001   🟢 OK  │
│      │  DS-001       Door          AEC-001   🟢 OK  │
│      │  FD-001       Fall Detect   AEC-001   🟢 OK  │
│      │  GW-002       Gateway       AEC-002   🔴 Off │
│      │  ...                                         │
│      ├──────────────────────────────────────────────┤
│      │  [Export Device Report]  [Bulk Firmware Upd] │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- Device registry → `/api/iot/sensors/devices`
- Status → `/api/azure/health?scope=devices`

---

#### 6.4 System Configuration
```
┌──────┬──────────────────────────────────────────────┐
│ NAV  │  ⚙️ System Configuration                     │
│      ├──────────────────────────────────────────────┤
│      │  ML MODEL THRESHOLDS                         │
│      │  Fall confidence alert:  [85%  ▾]            │
│      │  Inactivity threshold:   [3 hours ▾]         │
│      │  Temp alert range:       [20°C — 35°C]       │
│      │                                              │
│      │  NOTIFICATION RULES                          │
│      │  Critical alert → Caregiver + Family + Admin │
│      │  Warning alert  → Caregiver only             │
│      │  Channels: [✅ App] [✅ LINE] [✅ SMS] [✅ Email]│
│      │                                              │
│      │  ESCALATION TIMING                           │
│      │  Unacknowledged after:  [5 min ▾]            │
│      │  Auto-escalate to:      Admin + Hospital     │
│      │                                              │
│      │  AZURE SERVICE CONFIG                        │
│      │  IoT Hub polling:       3 seconds            │
│      │  ML refresh cycle:      Every 6 hours        │
│      │  Data retention:        365 days             │
│      │                                              │
│      │  [💾 Save Configuration]                     │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- Config read/write → `/api/cosmos/config`
- ML settings → `/api/ml/settings`
- Notification rules → `/api/notify/rules`

---

#### 6.5 Analytics & Reports
```
┌──────┬──────────────────────────────────────────────┐
│ NAV  │  📈 Analytics & Reports                      │
│      ├──────────────────────────────────────────────┤
│      │  Period: [This Month ▾]  Area: [All ▾]       │
│      ├───────────────────────┬──────────────────────┤
│      │  INCIDENT BREAKDOWN   │  RESPONSE TIMES      │
│      │  [pie chart]          │  [bar chart]         │
│      │  Falls      42%       │  Avg    3m 42s       │
│      │  Inactivity 31%       │  Best   1m 10s       │
│      │  Med missed 18%       │  Worst  8m 55s       │
│      │  Other       9%       │  Target <5min: 87%✓  │
│      ├───────────────────────┴──────────────────────┤
│      │  SYSTEM KPIs THIS MONTH                      │
│      │  Alerts sent:      1,247                     │
│      │  Avg response:     3m 42s  (↓12% vs last mo) │
│      │  False alarm rate: 4.2%   (↓0.8%)            │
│      │  Medication adher: 78%    (↑3%)              │
│      ├──────────────────────────────────────────────┤
│      │  [📥 Export PDF]  [📊 Open in Power BI]      │
└──────┴──────────────────────────────────────────────┘
```

**Azure connections:**
- All charts → `/api/reports` (Power BI mock datasets)
- KPI calculations → `/api/analytics/stream`

---

## 7. Cross-App Alert Flow

```
[Fall Detected by Sensor]
        ↓
[Edge Gateway] → [Azure IoT Hub]
        ↓
[Stream Analytics] → anomaly flagged
        ↓
[ML Model] → fall_confidence: 94%
        ↓
[Notification Hub] ──────────────────────────────┐
        ↓                    ↓                    ↓
[Elderly App]        [Caregiver App]        [Admin App]
 Shows "Help         Alert card appears    Alert logged
 is coming"          Dashboard badge +3    Event feed
 Calm UI             Patient detail flags  Escalation timer
        ↓
[LINE / SMS / Email] → Family notified
        ↓
[Caregiver acknowledges] → all apps update to "Acknowledged"
        ↓
[Resolved] → all apps return to green status
        ↓
[Cosmos DB] → full event logged with timeline
```

---

## 8. API Endpoint Summary

```
BASE: https://mock.aec-azure.local/v1

AUTH
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout

IOT
GET    /iot/sensors                    (all sensor readings)
GET    /iot/sensors?patientId={id}     (per patient)
GET    /iot/sensors/devices            (device registry)

ANALYTICS
GET    /analytics/stream               (real-time stream)
GET    /analytics/stream?patientId={id}

ML
POST   /ml/predict                     (run inference)
GET    /ml/settings                    (current thresholds)
PUT    /ml/settings                    (update thresholds)

NOTIFICATIONS
POST   /notify                         (trigger alert)
GET    /notify/rules                   (notification rules)
PUT    /notify/rules                   (update rules)

DATABASE (Cosmos)
GET    /cosmos/users
POST   /cosmos/users
GET    /cosmos/users/{id}
PUT    /cosmos/users/{id}
GET    /cosmos/events?patientId={id}
POST   /cosmos/events
GET    /cosmos/care_plans?patientId={id}
PUT    /cosmos/care_plans/{id}
GET    /cosmos/config
PUT    /cosmos/config

REPORTS
GET    /reports                        (Power BI datasets)
GET    /reports/export?format=pdf

HEALTH
GET    /azure/health                   (all services status)
GET    /azure/health?scope=devices
```

---

## 9. Role-Based Access Control

```
Role          Elderly   Caregiver   Admin
─────────────────────────────────────────
Own data        R/W        R           R
All patients     -         R*          R/W
User mgmt        -          -          R/W
Device mgmt      -         R           R/W
System config    -          -          R/W
Analytics        -         R (own)     R/W
Alert rules      -          -          R/W
Billing          -          -          R/W

* Caregiver sees only assigned patients
```