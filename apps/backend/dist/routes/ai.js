"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = require("../mock/patients");
const router = (0, express_1.Router)();
// ─── Mock AI Engine ───────────────────────────────────────────────────────────
// Simulates Azure OpenAI GPT-4o clinical analysis responses.
const RISK_THRESHOLDS = {
    critical: { spo2: 93, hrHigh: 110, hrLow: 50 },
    warning: { spo2: 95, hrHigh: 100, hrLow: 55 },
};
const mockAnalyzeVitals = (vitals) => {
    const findings = [];
    let riskScore = 40;
    let severity = 'normal';
    if (vitals.spo2 !== undefined) {
        if (vitals.spo2 < RISK_THRESHOLDS.critical.spo2) {
            findings.push(`SpO2 ${vitals.spo2}% — ต่ำวิกฤต ควรได้รับออกซิเจนทันที`);
            riskScore += 35;
            severity = 'critical';
        }
        else if (vitals.spo2 < RISK_THRESHOLDS.warning.spo2) {
            findings.push(`SpO2 ${vitals.spo2}% — ต่ำกว่าเกณฑ์ปกติ ควรติดตามใกล้ชิด`);
            riskScore += 20;
            if (severity !== 'critical')
                severity = 'warning';
        }
    }
    if (vitals.hr !== undefined) {
        if (vitals.hr > RISK_THRESHOLDS.critical.hrHigh) {
            findings.push(`HR ${vitals.hr} bpm — หัวใจเต้นเร็วผิดปกติ เสี่ยง Arrhythmia`);
            riskScore += 25;
            severity = 'critical';
        }
        else if (vitals.hr < RISK_THRESHOLDS.critical.hrLow) {
            findings.push(`HR ${vitals.hr} bpm — หัวใจเต้นช้าผิดปกติ เสี่ยง Bradycardia`);
            riskScore += 25;
            severity = 'critical';
        }
    }
    if (vitals.bp) {
        const [sys] = vitals.bp.split('/').map(Number);
        if (sys > 180) {
            findings.push(`BP ${vitals.bp} mmHg — ความดันโลหิตสูงวิกฤต เสี่ยง Hypertensive Crisis`);
            riskScore += 30;
            severity = 'critical';
        }
        else if (sys > 160) {
            findings.push(`BP ${vitals.bp} mmHg — ความดันโลหิตสูง ควรปรึกษาแพทย์`);
            riskScore += 15;
            if (severity !== 'critical')
                severity = 'warning';
        }
    }
    if (vitals.temp !== undefined && vitals.temp > 38.5) {
        findings.push(`อุณหภูมิ ${vitals.temp}°C — มีไข้สูง เสี่ยงติดเชื้อ`);
        riskScore += 15;
        if (severity !== 'critical')
            severity = 'warning';
    }
    const recommendation = severity === 'critical'
        ? 'แนะนำแจ้ง Caregiver และแพทย์ทันที — อาจต้องส่งห้องฉุกเฉิน'
        : severity === 'warning'
            ? 'ควรติดตามอาการภายใน 30 นาที และประเมินซ้ำ'
            : 'สัญญาณชีพอยู่ในเกณฑ์ปกติ — ติดตามตามกำหนด';
    return {
        riskScore: Math.min(100, riskScore),
        severity,
        findings: findings.length ? findings : ['สัญญาณชีพทุกค่าอยู่ในเกณฑ์ปกติ'],
        recommendation,
        analyzedAt: new Date().toISOString(),
        model: 'mock-azure-openai-gpt4o',
    };
};
// ─── POST /api/ai/analyze-vitals ─────────────────────────────────────────────
// Body: { hr, spo2, bp, temp }
router.post('/analyze-vitals', (req, res) => {
    const vitals = req.body;
    const result = mockAnalyzeVitals(vitals);
    res.json({ success: true, data: result });
});
// ─── POST /api/ai/risk-score/:patientId ──────────────────────────────────────
// Analyze a specific patient's current vitals
router.post('/risk-score/:patientId', (req, res) => {
    const patient = (0, patients_1.getPatientById)(req.params.patientId);
    if (!patient) {
        res.status(404).json({ success: false, error: `Patient ${req.params.patientId} not found` });
        return;
    }
    const result = mockAnalyzeVitals(patient.detail.vitals);
    res.json({
        success: true,
        patientId: patient.id,
        patientName: patient.name,
        data: {
            ...result,
            currentRiskScore: patient.risk,
            aiRiskScore: result.riskScore,
        },
    });
});
// ─── POST /api/ai/chat ────────────────────────────────────────────────────────
// Simple voice companion mock — responds to elderly user messages
router.post('/chat', (req, res) => {
    const { message, patientId } = req.body;
    if (!message) {
        res.status(400).json({ success: false, error: 'message is required' });
        return;
    }
    // Mock responses based on keywords
    let reply = 'ขอบคุณที่พูดคุยกับผม ฉันอยู่ที่นี่เพื่อช่วยเหลือคุณเสมอ 😊';
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('ปวด') || lowerMsg.includes('เจ็บ')) {
        reply = 'ฉันเข้าใจว่าคุณรู้สึกไม่สบาย ควรแจ้ง Caregiver ทันที ฉันกำลังส่งการแจ้งเตือนให้แล้ว';
    }
    else if (lowerMsg.includes('ยา')) {
        reply = 'ถึงเวลาทานยาแล้ว! อย่าลืมดื่มน้ำตามด้วยนะครับ';
    }
    else if (lowerMsg.includes('หกล้ม') || lowerMsg.includes('ล้ม')) {
        reply = 'ฉันได้รับสัญญาณแล้ว! กำลังแจ้งเตือนทีมดูแลทันที กรุณาอย่าขยับตัวก่อน';
    }
    else if (lowerMsg.includes('สวัสดี') || lowerMsg.includes('hello')) {
        reply = 'สวัสดีครับ! วันนี้คุณรู้สึกเป็นอย่างไรบ้าง? ฉันพร้อมช่วยเหลือเสมอ 👋';
    }
    res.json({
        success: true,
        data: {
            userMessage: message,
            aiReply: reply,
            patientId: patientId ?? null,
            timestamp: new Date().toISOString(),
            model: 'mock-azure-openai-gpt4o',
        },
    });
});
// ─── GET /api/ai/summary ──────────────────────────────────────────────────────
// System-wide AI health summary for admin dashboard
router.get('/summary', (_req, res) => {
    res.json({
        success: true,
        data: {
            totalPatients: 5,
            criticalCount: 1,
            highRiskCount: 1,
            averageRiskScore: 75,
            activeAlerts: 4,
            devicesOnline: 13,
            deviceTotal: 15,
            averageMedicationAdherence: 93,
            aiInsight: 'ผู้ป่วย PT-005 มีความเสี่ยงสูงที่สุด — ควรติดตามอย่างใกล้ชิดและพิจารณาปรับยาความดัน',
            generatedAt: new Date().toISOString(),
        },
    });
});
exports.default = router;
//# sourceMappingURL=ai.js.map