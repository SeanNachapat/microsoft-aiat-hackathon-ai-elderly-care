import { Router } from 'express';
import { patientsStore, getPatientById } from '../mock/patients';

const router = Router();

// ─── POST /api/reports/generate ───────────────────────────────────────────────
// Mock report generation — returns a JSON "report" (would upload to Blob in prod)
router.post('/generate', (req, res) => {
  const { patientId, type = 'daily', period = '2026-05-03' } = req.body as {
    patientId?: string;
    type?: 'daily' | 'weekly' | 'monthly' | 'incident';
    period?: string;
  };

  let patients = patientsStore;
  if (patientId) {
    const p = getPatientById(patientId);
    if (!p) {
      res.status(404).json({ success: false, error: `Patient ${patientId} not found` });
      return;
    }
    patients = [p];
  }

  const reportId = `RPT-${Date.now()}`;
  const report = {
    reportId,
    type,
    period,
    generatedAt: new Date().toISOString(),
    generatedBy: 'admin',
    system: 'Healthcare 4 Elder — AI Elderly Care System',
    azureRegion: 'Southeast Asia (Singapore)',
    pdpaCompliant: true,
    patients: patients.map((p) => ({
      id: p.id,
      name: p.name,
      age: p.age,
      riskScore: p.risk,
      riskLevel: p.riskLevel,
      vitals: p.detail.vitals,
      activeAlerts: p.detail.alerts.filter((a) => !a.acknowledged).length,
      medicationAdherence:
        p.detail.medications.length > 0
          ? Math.round(
              p.detail.medications.reduce((sum, m) => sum + m.adherence, 0) /
                p.detail.medications.length
            )
          : null,
      devicesOnline: p.detail.devices.filter((d) => d.online).length,
    })),
    summary: {
      totalPatients: patients.length,
      criticalPatients: patients.filter((p) => p.riskLevel === 'วิกฤต').length,
      averageRisk: Math.round(patients.reduce((sum, p) => sum + p.risk, 0) / patients.length),
    },
    // In production: blobUrl would be the Azure Blob Storage URL
    blobUrl: `mock://reports/${reportId}.pdf`,
  };

  res.status(201).json({ success: true, data: report });
});

// ─── GET /api/reports/infrastructure ──────────────────────────────────────────
// Returns infrastructure/compliance snapshot for footer cards
router.get('/infrastructure', (_req, res) => {
  res.json({
    success: true,
    data: {
      security: {
        encryption: 'AES-256 + TLS 1.3',
        sentinel: { status: 'active', mttd: '<5 min' },
        zeroTrust: ['Azure AD', 'MFA', 'RBAC', 'Key Vault', 'Private Endpoints'],
      },
      pdpa: {
        consentCoverage: '3/5 full, 2/5 partial',
        dataClassification: 'Confidential (PHI)',
        dsrPortal: 'active',
        retentionYears: 10,
        breachNotification: '<72hr',
      },
      backup: {
        type: 'GRS',
        regions: ['Singapore (Primary)', 'Hong Kong (Secondary)'],
        rpo: '<5 min',
        rto: '<30 min',
        immutableStorage: 'WORM',
        lastDrTest: { date: 'Q1 2026', result: 'PASSED' },
      },
      aiServices: [
        'Fall Detection (Azure AI Vision)',
        'Risk Scoring (Azure ML)',
        'Emotion Analysis (Azure Face)',
        'Predictive Health (Custom Model)',
        'Voice Companion (Azure OpenAI GPT-4o)',
      ],
      generatedAt: new Date().toISOString(),
    },
  });
});

export default router;
