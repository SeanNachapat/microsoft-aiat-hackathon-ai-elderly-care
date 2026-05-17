import { NurseJiraConfig, ElderProfile } from '../types/nurseJira.types';

export const nurseJiraConfigTH: NurseJiraConfig = {

  // ─────────────────────────────────────────
  // AZURE SPEECH — Thai voice
  // ─────────────────────────────────────────
  speechVoice: 'th-TH-PremwadeeNeural',
  speechLang: 'th-TH',
  speechRegion: process.env.AZURE_SPEECH_REGION ?? 'eastus',
  ssmlLang: 'th-TH',
  prosodyRate: '-15%',
  prosodyPitch: '-5%',

  // ─────────────────────────────────────────
  // AZURE STT — Thai transcription
  // ─────────────────────────────────────────
  transcriptionLanguage: 'th',

  // ─────────────────────────────────────────
  // REALTIME SESSION SETTINGS
  // ─────────────────────────────────────────
  maxResponseTokens: 200,
  temperature: 0.7,
  vadThreshold: 0.35,
  silenceDurationMs: 900,
  prefixPaddingMs: 400,

  // ─────────────────────────────────────────
  // UI STRINGS — shown on elder device
  // ─────────────────────────────────────────
  ui: {
    connectingText: 'กำลังเชื่อมต่อกับ Nurse Jira...',
    listeningText: 'กำลังฟัง...',
    speakingText: 'Nurse Jira กำลังพูด...',
    processingText: 'กำลังคิด...',
    sosText: 'กำลังโทรหาผู้ดูแลของคุณ',
    startButtonText: 'เริ่มการสนทนา',
    interruptHint: 'พูดได้เลยเพื่อขัดจังหวะ',
    notificationHint: 'ผู้ดูแลส่งข้อความถึงคุณ',
  },

  // ─────────────────────────────────────────
  // ALERT MESSAGES — sent via SMS to family
  // ─────────────────────────────────────────
  alerts: {
    lonelinessMessage: (elderName, contactName) =>
      `สวัสดีคุณ ${contactName} — คุณ${elderName}คิดถึงคุณมากค่ะ ` +
      `ยังไม่ได้รับสายจากคุณหลายวันแล้ว โทรหาท่านสักครู่ได้เลยนะคะ — CareCompanion`,

    missedMedMessage: (elderName, medName, contactName) =>
      `แจ้งเตือน: คุณ${elderName}ยังไม่ได้รับประทาน ${medName} ตามเวลาที่กำหนดค่ะ ` +
      `กรุณาติดต่อท่านเพื่อเตือนด้วยนะคะ — CareCompanion`,

    emergencyMessage: (elderName, contactName) =>
      `🚨 ฉุกเฉิน — คุณ${elderName}ต้องการความช่วยเหลือทันทีค่ะ ` +
      `กรุณาโทรหาท่านหรือส่งใครไปดูแลโดยด่วนค่ะ — CareCompanion`,

    dailyReportSubject: (elderName, date) =>
      `รายงานประจำวัน — คุณ${elderName} — ${date}`,
  },

  // ─────────────────────────────────────────
  // GREETING LINES
  // ─────────────────────────────────────────
  greetings: {
    positive: (preferredName, timeOfDay) =>
      `${timeOfDay}ค่ะ คุณ${preferredName}! ดีใจที่ได้คุยด้วยค่ะ วันนี้รู้สึกเป็นอย่างไรบ้างคะ?`,

    lowMood: (preferredName) =>
      `สวัสดีค่ะ คุณ${preferredName} หนูคิดถึงคุณนะคะ วันนี้เป็นอย่างไรบ้างคะ?`,

    firstSession: (preferredName) =>
      `สวัสดีค่ะ คุณ${preferredName}! หนูชื่อ Nurse Jira ค่ะ จะอยู่เป็นเพื่อนคุณทุกเมื่อที่อยากคุยนะคะ ตอนนี้รู้สึกเป็นอย่างไรบ้างคะ?`,
  },

  // ─────────────────────────────────────────
  // ESCALATION PHRASES
  // ─────────────────────────────────────────
  escalation: {
    level4Emergency: (preferredName) =>
      `คุณ${preferredName}คะ หนูกำลังส่งคนมาช่วยทันทีเลยนะคะ กรุณาอยู่ที่เดิมก่อนนะคะ ความช่วยเหลือกำลังมาค่ะ`,
  },

  // ─────────────────────────────────────────
  // SYSTEM PROMPT BUILDER — optimized for realtime model
  // ─────────────────────────────────────────
  buildPrompt: (elder: ElderProfile): string => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateString = now.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const hour = now.getHours();
    const timeOfDay = hour < 12 ? 'ตอนเช้า' : hour < 17 ? 'ตอนบ่าย' : 'ตอนเย็น';

    return `คุณคือ "Nurse Jira" ผู้ดูแลผู้สูงอายุด้วย AI ที่อบอุ่นและใส่ใจ พูดภาษาไทยเสมอ ลงท้ายด้วย "ค่ะ" หรือ "นะคะ"

กฎสำคัญที่สุด:
1. ตอบคำถามโดยตรงเสมอ ถ้าถามว่า "วันนี้วันอะไร" ให้ตอบว่าวันอะไร ถ้าถามเรื่องเวลา ให้บอกเวลา ถ้าถามเรื่องอะไรก็ตาม ให้ตอบเรื่องนั้นก่อน
2. ตอบสั้น ๆ 1-2 ประโยค ถามทีละคำถาม
3. ฟังให้ดีและตอบตรงประเด็น อย่าพูดวนซ้ำหรือให้คำปลอบใจทั่วไปถ้าไม่ได้ถูกถาม

วันนี้: ${dateString}
เวลา: ${timeString} (${timeOfDay})

ผู้สูงอายุที่คุณดูแล:
- ชื่อ: ${elder.name} (เรียก: ${elder.preferredName}), อายุ ${elder.age} ปี
- ${elder.livingSituation}
- โรค: ${elder.healthConditions.map(h => h.condition).join(', ')}
- ยา: ${elder.medications.map(m => `${m.name} ${m.dose} เวลา ${m.schedule}${m.withFood ? ' (พร้อมอาหาร)' : ''}`).join(', ')}
- งานอดิเรก: ${elder.hobbies.map(h => h.split(' — ')[0]).join(', ')}
- ผู้ติดต่อฉุกเฉิน: ${elder.emergencyContact.name} (${elder.emergencyContact.relationship})
- บันทึก: ${elder.caregiverNotes ?? 'ไม่มี'}
- ลืมกินยาสัปดาห์นี้: ${elder.missedMedicationsThisWeek ?? 0} ครั้ง
- ครอบครัวโทรมาล่าสุด: ${elder.familyCalledRecently ? 'โทรมาแล้ว' : `ยังไม่ได้โทรมา ${elder.familyLastContactHoursAgo ?? 0} ชม.`}
- อารมณ์ครั้งล่าสุด: ${elder.lastSessionMood ?? 'ไม่ทราบ'}
${elder.personality ? `- บุคลิก: ${elder.personality.temperament}` : ''}

แนวทางการดูแล:
- ถ้าใกล้เวลายา (±15 นาที) ให้ถามนุ่มนวลว่าทานยาหรือยัง
- ถ้ายาต้องทานพร้อมอาหาร ให้ถามก่อนว่าทานข้าวหรือยัง
- ถ้าแสดงอาการเหงาหรือเศร้า ให้รับฟังและแสดงความเข้าใจก่อน
- ถ้าพูดถึงงานอดิเรก ให้ร่วมพูดคุยด้วยความสนใจ
- ถ้ามีอาการฉุกเฉิน (เจ็บหน้าอก หายใจลำบาก ขอความช่วยเหลือ) ให้พูดว่ากำลังส่งคนมาช่วยทันที

สิ่งที่ห้ามทำ:
- ห้ามพูดว่ากำลังวิเคราะห์อารมณ์ หรือพูดถึงระบบ
- ห้ามใช้ความสดใสเกินจริง
- ห้ามทำให้รู้สึกว่าเป็นภาระ`;
  }
};
