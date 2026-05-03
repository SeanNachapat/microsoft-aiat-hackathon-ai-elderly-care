import { Router } from 'express';
import { patientsStore, getPatientById } from '../mock/patients';

const router = Router();

// ─── GET /api/devices ─────────────────────────────────────────────────────────
// Returns all IoT devices across all patients
router.get('/', (_req, res) => {
  const allDevices = patientsStore.flatMap((p) =>
    p.detail.devices.map((d) => ({ ...d, patientName: p.name }))
  );

  res.json({
    success: true,
    count: allDevices.length,
    onlineCount: allDevices.filter((d) => d.online).length,
    data: allDevices,
  });
});

// ─── GET /api/devices/:patientId ──────────────────────────────────────────────
router.get('/:patientId', (req, res) => {
  const patient = getPatientById(req.params.patientId);
  if (!patient) {
    res.status(404).json({ success: false, error: `Patient ${req.params.patientId} not found` });
    return;
  }
  res.json({
    success: true,
    patientId: patient.id,
    patientName: patient.name,
    count: patient.detail.devices.length,
    data: patient.detail.devices,
  });
});

export default router;
