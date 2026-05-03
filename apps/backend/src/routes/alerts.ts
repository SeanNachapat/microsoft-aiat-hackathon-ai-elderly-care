import { Router } from 'express';
import { patientsStore } from '../mock/patients';
import type { Alert } from '../models/alert';

const router = Router();

// ─── In-memory alert store (aggregated from all patients) ─────────────────────
const buildAlertStore = (): Alert[] => {
  const alerts: Alert[] = [];
  patientsStore.forEach((patient) => {
    patient.detail.alerts.forEach((a) => {
      alerts.push({
        id: a.id,
        patientId: patient.id,
        patientName: patient.name,
        title: a.title,
        description: a.desc,
        severity: a.type === 'info' ? 'info' : a.type,
        status: a.acknowledged ? 'acknowledged' : 'active',
        triggeredAt: a.time,
        source: 'iot',
      });
    });
  });
  return alerts;
};

// ─── GET /api/alerts ──────────────────────────────────────────────────────────
// ?status=active|acknowledged|resolved  ?severity=critical|warning|info
router.get('/', (req, res) => {
  let alerts = buildAlertStore();

  const { status, severity } = req.query;
  if (status) alerts = alerts.filter((a) => a.status === status);
  if (severity) alerts = alerts.filter((a) => a.severity === severity);

  // Sort newest first
  alerts.sort((a, b) => b.triggeredAt.localeCompare(a.triggeredAt));

  res.json({
    success: true,
    count: alerts.length,
    criticalCount: alerts.filter((a) => a.severity === 'critical' && a.status === 'active').length,
    data: alerts,
  });
});

// ─── GET /api/alerts/:id ──────────────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const alert = buildAlertStore().find((a) => a.id === req.params.id);
  if (!alert) {
    res.status(404).json({ success: false, error: `Alert ${req.params.id} not found` });
    return;
  }
  res.json({ success: true, data: alert });
});

// ─── POST /api/alerts/:id/acknowledge ────────────────────────────────────────
router.post('/:id/acknowledge', (req, res) => {
  const { acknowledgedBy = 'Admin' } = req.body as { acknowledgedBy?: string };

  // Find which patient owns this alert and update it
  for (const patient of patientsStore) {
    const alertIdx = patient.detail.alerts.findIndex((a) => a.id === req.params.id);
    if (alertIdx !== -1) {
      patient.detail.alerts[alertIdx].acknowledged = true;
      res.json({
        success: true,
        message: `Alert ${req.params.id} acknowledged by ${acknowledgedBy}`,
        data: {
          id: req.params.id,
          status: 'acknowledged',
          acknowledgedBy,
          acknowledgedAt: new Date().toISOString(),
        },
      });
      return;
    }
  }

  res.status(404).json({ success: false, error: `Alert ${req.params.id} not found` });
});

export default router;
